import { Inject, Injectable } from '@nestjs/common';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache, } from 'cache-manager';
import { RedisCache } from 'cache-manager-redis-yet';
import { RedisClientType } from 'redis';
type RedisCommand = {
  command: 'set' | 'get' | 'hSet' | 'hGet' | 'del' | 'expire' | 'keys' | 'scan'; // и другие команды
  args: any[];
};
@Injectable()
export class RedisService {
  constructor(@Inject('REDIS_CLIENT')
  private readonly redis: RedisClientType) { }

  /**
 * Сохраняет значение в Redis по указанному ключу с возможностью установки времени жизни (TTL)
 * 
 * @param {string} key - Ключ для сохранения значения. Может содержать пространство имен через двоеточие (например: "users:123")
 * @param {any} value - Значение для сохранения. Если значение не является строкой, оно будет автоматически преобразовано в JSON
 * @param {number} [ttl] - Опциональное время жизни ключа в секундах. Если не указано, ключ сохраняется бессрочно
 * @returns {Promise<void>} Promise, который разрешается после сохранения значения
 * 
 * @example
 * // Сохранить строку без TTL
 * await redisService.set('simple_key', 'string_value');
 * 
 * @example
 * // Сохранить объект с TTL 60 секунд
 * await redisService.set('user:1', { id: 1, name: 'Alice' }, 60);
 * 
 * @description Алгоритм работы:
 * 1. Проверяет тип переданного значения
 * 2. Если значение не является строкой - сериализует его в JSON
 * 3. Если указан TTL - использует команду SETEX для сохранения с временем жизни
 * 4. Если TTL не указан - использует обычную команду SET
 * 
 * @note Важные особенности:
 * - При передаче объекта/массива происходит глубокая сериализация в JSON
 * - Для хранения бинарных данных нужно предварительно конвертировать их в base64
 * - Максимальный размер значения - 512 МБ (ограничение Redis)
 * - TTL задается в секундах. Для миллисекунд используйте отдельный метод pSetEx
 */
  async set(key: string, value: any, ttl?: number) {
    const serialized = typeof value === 'string' ? value : JSON.stringify(value);
    if (ttl) {
      return await this.redis.setEx(key, ttl, serialized);
    } else {
      return await this.redis.set(key, serialized);
    }
  }

  /**
 * Получает значение из Redis по ключу с автоматической десериализацией JSON
 * 
 * @template T - Ожидаемый тип возвращаемого значения. Если не указан, возвращается исходный тип.
 * @param {string} key - Ключ, по которому хранится значение
 * @returns {Promise<T | null>} - Promise с результатом:
 *   - Если ключ существует и содержит JSON: возвращает распарсенное значение типа T
 *   - Если ключ существует и содержит строку: возвращает строку как T
 *   - Если ключ не существует: возвращает null
 * 
 * @example
 * // Получение строки
 * const str = await redisService.get<string>('string_key');
 * 
 * @example
 * // Получение объекта
 * const user = await redisService.get<User>('user:123');
 * 
 * @example
 * // Проверка существования ключа
 * const exists = await redisService.get('some_key') !== null;
 * 
 * @description Алгоритм работы:
 * 1. Получает данные по ключу командой GET
 * 2. Если данные отсутствуют - возвращает null
 * 3. Пытается распарсить данные как JSON
 * 4. Если парсинг не удался - возвращает данные "как есть"
 * 
 * @note Важные особенности:
 * - Для числовых значений нужно явно указывать тип: get<number>('key')
 * - Метод безопасен - никогда не выбрасывает исключения при парсинге
 * - Возвращает null как при отсутствии ключа, так и при значении "null"
 * - Для проверки существования ключа используйте метод exists()
 */
  async get<T>(key: string, isStringResult: boolean = false): Promise<T | null> {
    const data = await this.redis.get(key);
    if (!data) return null;
    if (isStringResult) return data as T
    try {
      return JSON.parse(data) as T;
    } catch {
      return data as T;
    }
  }

  /**
 * Удаляет один или несколько ключей из Redis
 * 
 * @param {string | string[]} key - Ключ(и) для удаления. Может быть строкой или массивом строк.
 * @returns {Promise<number>} - Promise с количеством фактически удаленных ключей.
 *   - 0 если ключи не существовали
 *   - 1+ если ключи были удалены
 * 
 * @example
 * // Удаление одного ключа
 * await redisService.del('user:1');
 * 
 * @example
 * // Удаление нескольких ключей
 * await redisService.del(['user:1', 'user:2', 'session:123']);
 * 
 * @example
 * // Проверка количества удаленных ключей
 * const deletedCount = await redisService.del('nonexistent_key');
 * console.log(deletedCount); // 0
 * 
 * @description Алгоритм работы:
 * 1. Принимает ключ или массив ключей
 * 2. Выполняет команду DEL в Redis
 * 3. Возвращает количество удаленных ключей
 * 
 * @note Важные особенности:
 * - Метод идемпотентен - не вызывает ошибок если ключи не существуют
 * - Для удаления по шаблону сначала используйте метод keys()
 * - Удаление происходит атомарно (все или ничего при массовом удалении)
 * - Производительность O(N) где N - количество удаляемых ключей
 */
  async del(key: string | string[]): Promise<number> {
    if (Array.isArray(key)) {
      return this.redis.del(key);
    }
    return this.redis.del([key]);
  }

  /**
   * Проверяет существование ключа в Redis
   * 
   * @param {string} key - Ключ, наличие которого нужно проверить
   * @returns {Promise<boolean>} - Promise, который разрешается в:
   *   - `true` - если ключ существует
   *   - `false` - если ключ не существует
   * 
   * @example
   * // Проверка существования ключа
   * const userExists = await redisService.exists('user:123');
   * if (userExists) {
   *   // Действия если ключ существует
   * }
   * 
   * @example
   * // Использование в условных выражениях
   * if (await redisService.exists('cache:feature_flag')) {
   *   // Код выполняемый если флаг существует
   * }
   * 
   * @description Алгоритм работы:
   * 1. Выполняет команду EXISTS для указанного ключа
   * 2. Возвращает true если ключ существует (EXISTS вернул 1)
   * 3. Возвращает false если ключ не существует (EXISTS вернул 0)
   * 
   * @note Важные особенности:
   * - Метод не делает различий между ключами с NULL значением и отсутствующими ключами
   * - Время выполнения O(1) - постоянное время независимо от размера базы
   * - Для проверки нескольких ключей используйте метод exists() с массивом ключей
   * - Не путайте с методом get(), который возвращает само значение
   */
  async exists(key: string): Promise<boolean> {
    const count = await this.redis.exists(key);
    return count === 1;
  }

  /**
   * Находит все ключи в Redis, соответствующие указанному шаблону
   * 
   * @param {string} pattern - Шаблон поиска ключей с поддержкой wildcards:
   *   - * соответствует любой последовательности символов
   *   - ? соответствует одному любому символу
   *   - [abc] соответствует одному из указанных символов
   * @returns {Promise<string[]>} - Promise с массивом найденных ключей
   * 
   * @example
   * // Найти все ключи начинающиеся с 'user:'
   * const userKeys = await redisService.keys('user:*');
   * 
   * @example
   * // Найти ключи с определенным шаблоном
   * const tempKeys = await redisService.keys('temp:*:2023');
   * 
   * @example
   * // Использование для массовых операций
   * const keysToDelete = await redisService.keys('cache:*');
   * await redisService.del(keysToDelete);
   * 
   * @description Алгоритм работы:
   * 1. Выполняет команду KEYS в Redis с указанным шаблоном
   * 2. Возвращает все ключи, соответствующие шаблону
   * 3. Если ключи не найдены - возвращает пустой массив
   * 
   * @warning Важные предупреждения:
   * - Метод блокирует Redis на время выполнения (не используйте в production на больших БД)
   * - Для production-среды используйте scan() с итеративным поиском
   * - Время выполнения O(N) где N - общее количество ключей в БД
   * - Может вызвать проблемы с производительностью при большом количестве ключей
   * 
   * @recommendation Рекомендации:
   * - Для реальных проектов всегда используйте метод scan() вместо keys()
   * - Ограничивайте шаблоны конкретными префиксами (напр. 'user:session:*')
   * - Не вызывайте метод слишком часто
   */
  async keys(pattern: string): Promise<string[]> {
    return this.redis.keys(pattern);
  }

  // ==================== Хэши ====================
  /**
   * Устанавливает значение поля в хэше Redis с автоматической сериализацией
   * 
   * @param {string} key - Ключ хэша
   * @param {string} field - Название поля в хэше
   * @param {any} value - Значение для сохранения:
   *   - Строки сохраняются как есть
   *   - Объекты/массивы автоматически сериализуются в JSON
   *   - Числа преобразуются в строки
   * @returns {Promise<void>} - Promise, который разрешается после выполнения операции
   * 
   * @example
   * // Сохранение строки
   * await redisService.hSet('user:1', 'name', 'Алексей');
   * 
   * @example
   * // Сохранение объекта
   * await redisService.hSet('user:1', 'profile', { age: 30, city: 'Москва' });
   * 
   * @example
   * // Сохранение числа
   * await redisService.hSet('stats', 'visits', 1500);
   * 
   * @description Алгоритм работы:
   * 1. Проверяет тип переданного значения
   * 2. Если значение не строка - сериализует его в JSON
   * 3. Выполняет команду HSET для сохранения пары поле-значение
   * 4. Если хэш не существовал - создает новый
   * 
   * @note Важные особенности:
   * - Для числовых значений рекомендуется явное преобразование в строку
   * - Вложенные объекты сохраняются как JSON-строка
   * - Максимальный размер одного хэша - 2^32-1 пар поле-значение
   * - Команда атомарна - либо все поля сохраняются, либо ни одного
   * 
   * @see Для массового сохранения полей используйте hSet с объектом
   */
  async hSet(key: string, field: string, value: any): Promise<void> {
    const serialized = typeof value === 'string' ? value : JSON.stringify(value);
    await this.redis.hSet(key, field, serialized);
  }

  /**
   * Получает значение поля из хэша Redis с автоматической десериализацией JSON
   * 
   * @template T - Ожидаемый тип возвращаемого значения. Если не указан, возвращается исходный тип.
   * @param {string} key - Ключ хэша
   * @param {string} field - Название поля в хэше
   * @returns {Promise<T | null>} - Promise с результатом:
   *   - Если поле содержит JSON: возвращает распарсенное значение типа T
   *   - Если поле содержит строку: возвращает строку как T
   *   - Если поле не существует: возвращает null
   * 
   * @example
   * // Получение строки из хэша
   * const name = await redisService.hGet<string>('user:1', 'name');
   * 
   * @example
   * // Получение объекта из хэша
   * const profile = await redisService.hGet<Profile>('user:1', 'profile');
   * 
   * @example
   * // Проверка существования поля
   * if (await redisService.hGet('user:1', 'email') !== null) {
   *   // Поле существует
   * }
   * 
   * @description Алгоритм работы:
   * 1. Выполняет команду HGET для получения значения поля
   * 2. Если поле не существует - возвращает null
   * 3. Пытается распарсить значение как JSON
   * 4. Если парсинг не удался - возвращает значение "как есть"
   * 
   * @note Важные особенности:
   * - Для числовых значений нужно явно указывать тип: hGet<number>('hash', 'field')
   * - Метод безопасен - не выбрасывает исключения при парсинге
   * - Возвращает null как при отсутствии поля, так и при значении "null"
   * - Для проверки существования поля используйте hExists()
   */
  async hGet<T>(key: string, field: string): Promise<T | null> {
    const data = await this.redis.hGet(key, field);
    if (!data) return null;
    try {
      return JSON.parse(data) as T;
    } catch {
      return data as T;
    }
  }


  /**
   * Получает все поля и значения хэша из Redis и возвращает их в виде объекта.
   * Автоматически пытается парсить значения как JSON, при неудаче возвращает строку.
   * 
   * @template T - Ожидаемый тип значений (по умолчанию - any)
   * @param {string} key - Ключ хэша в Redis
   * @returns {Promise<Record<string, T>>} - Объект с полями хэша, где:
   *   - ключи - названия полей хэша
   *   - значения - распарсенные JSON-данные или оригинальные строки
   * 
   * @example
   * // Для хэша: HSET user:123 name "Alice" profile '{"age":30}'
   * const result = await redisService.hGetAll<number | string>('user:123');
   * // Вернет: { name: "Alice", profile: { age: 30 } }
   * 
   * @description Алгоритм работы:
   * 1. Получает все поля хэша командой HGETALL
   * 2. Для каждого значения пытается выполнить JSON.parse()
   * 3. Если парсинг успешен - использует результат
   * 4. Если парсинг fails - оставляет оригинальную строку
   * 5. Возвращает итоговый объект с сохраненной структурой полей
   * 
   * @note Важные особенности:
   * - Пустой хэш вернет {} (пустой объект)
   * - Все числовые значения возвращаются как строки (особенность Redis)
   * - Вложенные JSON-объекты будут правильно распарсены
   * - Метод универсален и подходит для любых структур данных
   */
  async hGetAll<T>(key: string): Promise<Record<string, T>> {
    const data = await this.redis.hGetAll(key);
    const result: Record<string, T> = {};

    for (const [field, value] of Object.entries(data)) {
      try {
        result[field] = JSON.parse(value) as T;
      } catch {
        result[field] = value as T;
      }
    }

    return result;
  }

  /**
   * Проверяет существование указанного поля в хэше Redis.
   * 
   * @param {string} key - Ключ хэша в Redis. Формат обычно соответствует `type:id` (например: "user:123").
   * @param {string} field - Название поля, существование которого нужно проверить.
   * 
   * @returns {Promise<boolean>} 
   *   - `true` - если поле существует в хэше
   *   - `false` - если поле отсутствует или хэш не существует
   * 
   * @example
   * // Проверка существования поля 'email' у пользователя 123
   * const exists = await hExists('user:123', 'email');
   * if (exists) {
   *   console.log('Поле существует');
   * }
   * 
   * @see https://redis.io/commands/hexists/ Документация Redis HEXISTS
   */
  async hExists(key: string, field: string) {
    return await this.redis.hExists(key, field)
  }
  /**
   * Удаляет одно или несколько полей из хэша в Redis.
   * 
   * @param {string} key - Ключ хэша в Redis.
   * @param {string|string[]} field - Поле или массив полей для удаления.
   * 
   * @returns {Promise<number>} Количество фактически удаленных полей.
   *   - 0, если ни одно поле не было удалено (поля не существовали)
   *   - 1-N, в зависимости от количества удаленных полей
   * 
   * @example
   * // Удаление одного поля
   * await hDel('user:123', 'temp_data');
   * 
   * @example
   * // Удаление нескольких полей
   * await hDel('user:123', ['cache', 'preferences']);
   * 
   * @note
   * - Метод безопасен: не генерирует ошибки при попытке удалить несуществующие поля
   * - Для максимальной производительности рекомендуется передавать массив полей,
   *   а не вызывать метод несколько раз для отдельных полей
   * 
   * @see https://redis.io/commands/hdel/ Документация Redis HDEL
   */
  async hDel(key: string, field: string | string[]) {
    return await this.redis.hDel(key, field)
  }

  // ==================== Списки ====================
  /**
   * Добавляет элементы в начало списка Redis с автоматической сериализацией
   * 
   * @param {string} key - Ключ списка
   * @param {...any[]} elements - Элементы для добавления (один или несколько):
   *   - Строки добавляются как есть
   *   - Объекты/массивы автоматически сериализуются в JSON
   *   - Числа преобразуются в строки
   * @returns {Promise<number>} - Promise с новой длиной списка после добавления
   * 
   * @example
   * // Добавление строки
   * await redisService.lPush('messages', 'Новое сообщение');
   * 
   * @example
   * // Добавление нескольких элементов
   * await redisService.lPush('tasks', 'задача1', 'задача2');
   * 
   * @example
   * // Добавление объекта
   * await redisService.lPush('events', { type: 'login', userId: 123 });
   * 
   * @description Алгоритм работы:
   * 1. Принимает ключ и элементы для добавления
   * 2. Сериализует каждый элемент (кроме строк) в JSON
   * 3. Выполняет команду LPUSH для добавления в начало списка
   * 4. Возвращает новую длину списка
   * 
   * @note Важные особенности:
   * - Элементы добавляются в обратном порядке (последний элемент станет первым в списке)
   * - Если список не существует - создается новый
   * - Максимальный размер списка - 2^32-1 элементов
   * - Время выполнения O(1) для каждого добавляемого элемента
   * 
   * @see Для добавления в конец списка используйте rPush()
   * @see Для атомарного добавления нескольких элементов предпочтительнее передавать массив
   */
  async lPush(key: string, ...elements: any[]): Promise<number> {
    const serialized = elements.map(el =>
      typeof el === 'string' ? el : JSON.stringify(el)
    );
    return this.redis.lPush(key, serialized);
  }
  /**
   * Получает диапазон элементов из списка Redis с автоматической десериализацией JSON
   * 
   * @template T - Ожидаемый тип элементов списка. Если не указан, возвращаются строки.
   * @param {string} key - Ключ списка
   * @param {number} start - Начальный индекс (0 - первый элемент, -1 - последний)
   * @param {number} stop - Конечный индекс (включительно, -1 - последний элемент)
   * @returns {Promise<T[]>} - Promise с массивом элементов:
   *   - Если элементы содержат JSON - автоматически парсятся в тип T
   *   - Если элементы содержат строки - возвращаются как есть
   *   - Если список не существует - возвращает пустой массив
   * 
   * @example
   * // Получить первые 10 элементов
   * const items = await redisService.lRange<string>('messages', 0, 9);
   * 
   * @example
   * // Получить последние 5 элементов
   * const lastItems = await redisService.lRange<Event>('events', -5, -1);
   * 
   * @example
   * // Получить все элементы списка
   * const allItems = await redisService.lRange<User>('users', 0, -1);
   * 
   * @description Алгоритм работы:
   * 1. Выполняет команду LRANGE с указанными индексами
   * 2. Для каждого элемента пытается выполнить JSON.parse()
   * 3. Если парсинг не удался - возвращает элемент как строку
   * 4. Возвращает массив с преобразованными элементами
   * 
   * @note Важные особенности:
   * - Отрицательные индексы отсчитываются с конца списка
   * - Если start > stop - возвращается пустой массив
   * - Если stop превышает длину списка - возвращаются элементы до конца списка
   * - Время выполнения O(S+N) где S - смещение (start), N - количество элементов
   * 
   * @see Для получения длины списка используйте lLen()
   * @see Для работы с большими списками используйте итеративный подход
   */
  async lRange<T>(key: string, start: number, stop: number): Promise<T[]> {
    const data = await this.redis.lRange(key, start, stop);
    return data.map(item => {
      try {
        return JSON.parse(item) as T;
      } catch {
        return item as T;
      }
    });
  }

  // ==================== Множества ====================
  /**
   * Добавляет уникальные элементы в множество (Set) Redis с автоматической сериализацией
   * 
   * @param {string} key - Ключ множества
   * @param {...any[]} members - Элементы для добавления (один или несколько):
   *   - Строки добавляются как есть
   *   - Объекты/массивы автоматически сериализуются в JSON
   *   - Числа преобразуются в строки
   * @returns {Promise<number>} - Promise с количеством действительно добавленных элементов:
   *   - 0 если все элементы уже существовали в множестве
   *   - 1+ если были добавлены новые уникальные элементы
   * 
   * @example
   * // Добавление строки
   * const added = await redisService.sAdd('unique_tags', 'новый_тег');
   * 
   * @example
   * // Добавление нескольких элементов
   * const count = await redisService.sAdd('users:active', 'user1', 'user2');
   * 
   * @example
   * // Добавление объекта (будет сериализован)
   * await redisService.sAdd('devices', { id: 'd1', type: 'mobile' });
   * 
   * @description Алгоритм работы:
   * 1. Принимает ключ и элементы для добавления
   * 2. Сериализует каждый нестроковый элемент в JSON
   * 3. Выполняет команду SADD для добавления элементов
   * 4. Возвращает количество новых уникальных элементов
   * 
   * @note Важные особенности:
   * - Множество автоматически удаляет дубликаты
   * - Максимальный размер множества - 2^32-1 элементов
   * - Время выполнения O(1) для каждого элемента
   * - Для больших множеств (>10k элементов) производительность может снижаться
   * 
   * @see Для проверки существования элемента используйте sIsMember()
   * @see Для получения всех элементов множества используйте sMembers()
   */
  async sAdd<T extends string | object>(
    key: string,
    ...members: T[]
  ): Promise<number> {
    const serialized = members.map(m =>
      typeof m === 'string' ? m : JSON.stringify(m)
    );

    return this.redis.sAdd(key, serialized);
  }
  /**
   * Получает все элементы множества (Set) из Redis с автоматической десериализацией JSON
   * 
   * @template T - Ожидаемый тип элементов множества. Если не указан, возвращаются строки.
   * @param {string} key - Ключ множества
   * @returns {Promise<T[]>} - Promise с массивом элементов:
   *   - Если элементы содержат JSON - автоматически парсятся в тип T
   *   - Если элементы содержат строки - возвращаются как есть
   *   - Если множество не существует - возвращает пустой массив
   * 
   * @example
   * // Получить все элементы как строки
   * const tags = await redisService.sMembers<string>('unique_tags');
   * 
   * @example
   * // Получить и десериализовать объекты
   * const devices = await redisService.sMembers<Device>('devices');
   * 
   * @example
   * // Проверить наличие элементов
   * const members = await redisService.sMembers('users:active');
   * if (members.length > 0) {
   *   // Множество не пустое
   * }
   * 
   * @description Алгоритм работы:
   * 1. Выполняет команду SMEMBERS для получения всех элементов множества
   * 2. Для каждого элемента пытается выполнить JSON.parse()
   * 3. Если парсинг не удался - возвращает элемент как строку
   * 4. Возвращает массив с преобразованными элементами
   * 
   * @note Важные особенности:
   * - Порядок элементов не гарантируется (множество неупорядоченно)
   * - Время выполнения O(N) где N - размер множества
   * - Для больших множеств (>10k элементов) возможны проблемы с памятью
   * - Метод не подходит для очень больших множеств (используйте SSCAN)
   * 
   * @see Для итеративного обхода больших множеств используйте sScan()
   * @see Для проверки принадлежности элемента используйте sIsMember()
   */
  async sMembers<T = string>(key: string): Promise<T[]> {

    // 2. Получение данных с обработкой ошибок парсинга
    const data = await this.redis.sMembers(key);

    return data.map(item => {
      if (typeof item === 'string' && item.trim().startsWith('{')) {
        try {
          return JSON.parse(item) as T;
        } catch (e) {
          console.warn(`Failed to parse JSON for key ${key}:`, item);
          return item as unknown as T;
        }
      }
      return item as unknown as T;
    });
  }
  /**
   * Проверяет, содержит ли множество указанный элемент
   * 
   * @param {string} key - Ключ множества
   * @param {any} member - Элемент для проверки (будет автоматически сериализован если не строка)
   * @returns {Promise<boolean>} - Promise с результатом:
   *   - true если элемент существует в множестве
   *   - false если элемента нет или множество не существует
   * 
   * @example
   * // Проверка строкового элемента
   * const isActive = await redisService.sIsMember('users:active', 'user123');
   * 
   * @example
   * // Проверка объекта
   * const exists = await redisService.sIsMember('devices', { id: 'd1', type: 'mobile' });
   * 
   * @description Алгоритм работы:
   * 1. Сериализует элемент в строку (если он не является строкой)
   * 2. Выполняет команду SISMEMBER в Redis
   * 3. Возвращает булево значение результата проверки
   * 
   * @note Важные особенности:
   * - Для объектов используется JSON-сериализация
   * - Время выполнения O(1)
   * - Не создает множество, если оно не существует
   * - Чувствителен к формату сериализации (должен совпадать с форматом при добавлении)
   */
  async sIsMember(key: string, member: any): Promise<boolean> {
    const serialized = typeof member === 'string' ? member : JSON.stringify(member);
    return await this.redis.sIsMember(key, serialized);
  }

  /**
   * Удаляет указанные элементы из множества Redis.
   * 
   * @param {string} key - Ключ множества
   * @param {...any[]} members - Элементы для удаления:
   *   - Строки удаляются как есть
   *   - Объекты/массивы сериализуются в JSON перед удалением
   * @returns {Promise<number>} - Количество удалённых элементов
   * 
   * @example
   * // Удаление строки
   * const removedCount = await redisService.sRem('tags', 'старый_тег');
   * 
   * @example
   * // Удаление объекта
   * await redisService.sRem('devices', { id: 'd1', type: 'mobile' });
   */
  async sRem<T extends string | object>(
    key: string,
    ...members: T[]
  ): Promise<number> {
    // Сериализуем элементы для удаления
    const serializedMembers = members.map(member =>
      typeof member === 'string' ? member : JSON.stringify(member)
    );

    // Удаляем элементы из множества
    const removedCount = await this.redis.sRem(key, serializedMembers);

    return removedCount;
  }



  // ==================== TTL ====================
  /**
   * Устанавливает время жизни (TTL) для ключа в секундах
   * 
   * @param {string} key - Ключ, для которого устанавливается TTL
   * @param {number} ttl - Время жизни в секундах:
   *   - Положительное число: установит указанное время жизни
   *   - 0: немедленно удалит ключ (аналогично команде DEL)
   * @returns {Promise<boolean>} - Promise с результатом операции:
   *   - true: если TTL успешно установлен
   *   - false: если ключ не существует или не удалось установить TTL
   * 
   * @example
   * // Установить TTL 60 секунд
   * const success = await redisService.expire('user:session:123', 60);
   * 
   * @example
   * // Немедленно удалить ключ
   * await redisService.expire('temp:data', 0);
   * 
   * @example
   * // Проверка перед установкой
   * if (await redisService.exists('important:data')) {
   *   await redisService.expire('important:data', 3600);
   * }
   * 
   * @description Алгоритм работы:
   * 1. Проверяет существование ключа
   * 2. Устанавливает указанное время жизни в секундах
   * 3. Возвращает результат операции
   * 
   * @note Важные особенности:
   * - Для установки TTL в миллисекундах используйте метод pExpire()
   * - Изменить TTL можно в любой момент (перезаписывает предыдущее значение)
   * - Чтобы удалить TTL (сделать ключ персистентным), используйте persist()
   * - Команда атомарна и потокобезопасна
   * 
   * @see Для получения оставшегося времени жизни используйте getTtl()
   * @see Для установки TTL только если ключ существует используйте expireNX()
   */
  async expire(key: string, ttl: number): Promise<boolean> {
    return this.redis.expire(key, ttl);
  }

  async getTtl(key: string): Promise<number> {
    return this.redis.ttl(key);
  }

  /**
 * @warn (Только для Redis 7.0+) Нативная установка TTL с NX-флагом
 * 
 * Устанавливает время жизни (TTL) для ключа только если ключ уже существует
 * (Аналог команды EXPIRE с NX-флагом в Redis 7.0+)
 * 
 * @param {string} key - Ключ, для которого устанавливается TTL
 * @param {number} ttl - Время жизни в секундах
 * @returns {Promise<boolean>} - Promise с результатом:
 *   - true: если ключ существовал и TTL успешно установлен
 *   - false: если ключ не существует или TTL не установлен
 * 
 * @example
 * // Установить TTL только если ключ существует
 * const result = await redisService.expireNX('user:session:123', 60);
 * 
 * @description Алгоритм работы:
 * 1. Проверяет существование ключа
 * 2. Если ключ существует - устанавливает TTL
 * 3. Возвращает true только если ключ существовал И TTL установлен
 * 
 * @note Важные особенности:
 * - Работает атомарно (в отличие от отдельного вызова exists + expire)
 * - Требует Redis 7.0+ для нативной реализации
 * - В более ранних версиях эмулируется через Lua-скрипт
 * - Время выполнения O(1)
 */
  async expireNX(key: string, ttl: number): Promise<boolean> {
    // EXPIRE с NX-флагом доступен в Redis 7.0+
    return await this.redis.expire(key, ttl, 'NX');
  }
  // ==================== Пайплайны ====================
  /**
   * Выполняет несколько Redis-команд в одной транзакции (пайплайне)
   * 
   * @param {Array<{command: string, args: any[]}>} commands - Массив команд для выполнения:
   *   - command: Название Redis-команды (например, 'set', 'hGet', 'expire')
   *   - args: Аргументы команды в виде массива
   * @returns {Promise<Array<[Error | null, any]>>} - Promise с массивом результатов:
   *   - Каждый элемент массива соответствует команде из входного массива
   *   - Формат элемента: [ошибка, результат]
   *     - [Error, null] если команда завершилась ошибкой
   *     - [null, результат] при успешном выполнении
   * 
   * @example
   * // Пример выполнения нескольких команд
   * const results = await redisService.pipeline([
   *   { command: 'set', args: ['key1', 'value1'] },
   *   { command: 'hSet', args: ['hash1', 'field1', 'value1'] },
   *   { command: 'get', args: ['key1'] }
   * ]);
   * 
   * @example
   * // Обработка результатов
   * for (const [error, result] of results) {
   *   if (error) console.error('Ошибка:', error);
   *   else console.log('Результат:', result);
   * }
   * 
   * @description Алгоритм работы:
   * 1. Создает транзакцию (MULTI)
   * 2. Добавляет все команды в транзакцию
   * 3. Выполняет все команды атомарно (EXEC)
   * 4. Преобразует результаты в унифицированный формат
   * 
   * @note Важные особенности:
   * - Все команды выполняются атомарно (либо все, либо ничего)
   * - Порядок результатов соответствует порядку команд
   * - При ошибке в одной команде последующие всё равно выполняются
   * - Для отмены пайплайна используйте DISCARD
   * 
   * @warning Внимание:
   * - Не все Redis-команды можно использовать в пайплайне
   * - Команды, изменяющие данные, блокируют Redis на время выполнения
   * 
   * @see Для простых сценариев используйте отдельные методы (set, get и т.д.)
   * @see Для итеративной обработки больших данных используйте scan
   */
  async pipeline(
    commands: Array<{ command: string; args: any[] }>
  ): Promise<Array<[Error | null, any]>> {
    const pipeline = this.redis.multi();

    commands.forEach(({ command, args }) => {
      if (typeof (pipeline as any)[command] === 'function') {
        (pipeline as any)[command](...args);
      } else {
        throw new Error(`Invalid Redis command: ${command}`);
      }
    });

    try {
      const results = await pipeline.exec();
      // Преобразуем результаты в ожидаемый формат
      return results.map(result => {
        if (result instanceof Error) {
          return [result, null];
        }
        return [null, result];
      });
    } catch (error) {
      // Если вся пайплайн-операция провалилась
      return commands.map(() => [error as Error, null]);
    }
  }

  // ==================== Утилиты ====================
  /**
   * Проверяет доступность и работоспособность подключения к Redis
   * 
   * @returns {Promise<boolean>} - Promise с результатом проверки:
   *   - true: подключение активно и Redis доступен
   *   - false: нет соединения с Redis или сервер не отвечает
   * 
   * @example
   * // Простая проверка подключения
   * const isConnected = await redisService.checkConnection();
   * if (!isConnected) {
   *   alert('Сервер Redis недоступен!');
   * }
   * 
   * @example
   * // Периодическая проверка с интервалом
   * setInterval(async () => {
   *   console.log('Redis доступен:', await redisService.checkConnection());
   * }, 5000);
   * 
   * @description Алгоритм работы:
   * 1. Отправляет команду PING к серверу Redis
   * 2. Если получает ответ - возвращает true
   * 3. Если возникает ошибка или таймаут - возвращает false
   * 
   * @note Важные особенности:
   * - Метод не проверяет права доступа или состояние базы данных
   * - Время выполнения зависит от сетевой задержки
   * - Для точного мониторинга используйте Redis HEALTHCHECK
   * - При ложных срабатываниях проверьте настройки таймаутов
   * 
   * @see Для проверки конкретных возможностей используйте команду INFO
   * @see Для мониторинга состояния кластера используйте CLUSTER INFO
   */
  async checkConnection(): Promise<boolean> {
    try {
      await this.redis.ping();
      return true;
    } catch {
      return false;
    }
  }

  async flushAll(): Promise<void> {
    await this.redis.flushAll();
  }

  async scan(pattern: string, count = 100): Promise<string[]> {
    let cursor = 0;
    const keys = [];

    do {
      const reply = await this.redis.scan(cursor, {
        MATCH: pattern,
        COUNT: count
      });

      cursor = reply.cursor;
      keys.push(...reply.keys);
    } while (cursor !== 0);

    return keys;
  }

  // ==================== Продвинутые методы ====================

  async acquireLock(
    lockKey: string,
    value: string,
    ttl: number
  ): Promise<boolean> {
    const result = await this.redis.set(lockKey, value, {
      NX: true,
      EX: ttl
    });
    return result === 'OK';
  }

  async releaseLock(lockKey: string, value: string): Promise<void> {
    const script = `
      if redis.call("GET", KEYS[1]) == ARGV[1] then
        return redis.call("DEL", KEYS[1])
      else
        return 0
      end
    `;

    await this.redis.eval(script, {
      keys: [lockKey],
      arguments: [value]
    });
  }
}
class RedisTypeError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'RedisTypeError';
  }
}