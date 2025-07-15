import { Injectable, NotFoundException } from '@nestjs/common';
import { RedisService } from 'src/redis/redis.service';
import { User } from 'src/users/entities/user.entity';
import { v4 as uuidv4 } from 'uuid';

export type TDevice = {
  userAgent: string,
  ip: string
}
export type TSession = {
  user: User,
  session_uuid: string,
  deviceId: string,
  device: TDevice,
  expireIn: number
}
@Injectable()
export class SessionService {
  constructor(
    private readonly redisService: RedisService,
  ) { }
  /////////////////////////////////////////////////////////////////////////////////////
  /**
   * Получает email, связанный с указанным UUID сессии из Redis.
   * 
   * @param {string} session_uuid - UUID сессии, по которому ищется связанный email.
   * @returns {Promise<string | null>} Promise, который возвращает email как строку, или null, если связь не найдена.
   */
  async getEmailSessionFromHash(session_uuid: string): Promise<string | null> {
    return await this.redisService.hGet<string>(`map`, `session:${session_uuid}`)
  }
  /**
   * Устанавливает связь между UUID сессии и email в Redis-хеше.
   * 
   * @param {string} session_uuid - UUID сессии, для которой нужно сохранить email.
   * @param {string} email - Email, который связывается с данным UUID.
   * @returns {Promise<void>} Promise, который разрешается после выполнения операции
   */
  async setEmailSessionInHash(session_uuid: string, email: string): Promise<void> {
    await this.redisService.hSet(`map`, `session:${session_uuid}`, email)
  }

  /**
   * Удаляет связь между UUID сессии и email из Redis-хеша.
   * 
   * @param {string } session_uuid - UUID сессии, для которых нужно удалить связь.
   * @returns {Promise<number>} Promise, который возвращает количество удаленных полей.
   */
  async delEmailSessionFromHash(session_uuid: string): Promise<number> {
    return await this.redisService.hDel('map', `session:${session_uuid}`)
  }
  /////////////////////////////////////////////////////////////////////////////////////
  /**
   * Добавляет сессию в Redis-хеш и сохраняет связь между UUID сессии и email пользователя.
   * 
   * @param {TSession} data - Объект с данными сессии, содержащий информацию о пользователе.
   * @param {string} session_uuid - UUID сессии, которая добавляется.
   * @returns {Promise<void>} Promise, который завершится, когда операции будут выполнены.
   */
  async addSessionInHash(data: TSession, session_uuid: string): Promise<void> {
    await this.redisService.hSet(
      `email:${data.user.email}`,
      `session:${session_uuid}`,
      data
    )
    await this.setEmailSessionInHash(session_uuid, data.user.email)
  }
  /**
   * Удаляет сессию из Redis и удаляет связь между email и UUID сессии.
   * 
   * @param {string} email - Электронная почта пользователя.
   * @param {string} session_uuid - UUID сессии, которые нужно удалить.
   * @returns {Promise<number>} Promise, который возвращает количество удаленных полей из хеша.
   */
  async deleteSessionFromHash(email: string, session_uuid: string): Promise<number> {
    await this.delEmailSessionFromHash(session_uuid)
    return await this.redisService.hDel(`email:${email}`, `session:${session_uuid}`)
  }
  /////////////////////////////////////////////////////////////////////////////////////
  /**
   * Создает новую сессию, сохраняет ее в Redis и связывает с пользователем.
   * 
   * @param {TSession} data - Объект с данными сессии, содержащий информацию о пользователе.
   * @returns {Promise<string>} Promise, который разрешается в UUID созданной сессии.
   */
  async create_session(data: TSession): Promise<string> {
    await this.redisService.set(`session:${data.session_uuid}`, data, data.expireIn);
    await this.addSessionInHash(data, data.session_uuid);
    return data.session_uuid
  }

  /**
   * Удаляет одну или несколько сессий из Redis по UUID.
   * 
   * @param {string} session_uuid - UUID сессии, которые нужно удалить.
   * @returns {Promise<number>} - Promise, который разрешается количеством удаленных ключей.
   */
  async kill_session(session_uuid: string): Promise<number> {
    return await this.redisService.del(`session:${session_uuid}`)
  }
  /**
   * Удаляет все сессии пользователя, кроме текущей.
   * 
   * @param {string} session_uuid - UUID текущей сессии, которую оставить.
   * @returns {Promise<boolean>} - Обещание, которое разрешается `true` при успешном завершении.
   * @throws {NotFoundException} - Если сессия с указанным UUID не найдена.
   */
  async kill_sessions_without_current(session_uuid: string): Promise<boolean> {

    const email = await this.getEmailSessionFromHash(session_uuid)
    if (!email) throw new NotFoundException("Сессия не найдена")
    const sessions = await this.getAllSessionsByEmail(email);
    const uuids = sessions.filter(session => session.session_uuid !== session_uuid).map(session => session.session_uuid);
    await Promise.all([
      ...uuids.map(uuid => this.kill_session(uuid)),
      ...uuids.map(uuid => this.deleteSessionFromHash(email, uuid))
    ])
    return true
  }
  /**
   * Получает все сессии, связанные с указанным email, из Redis.
   *
   * @param {string} email - Email пользователя, по которому ищутся сессии.
   * @returns {Promise<TSession[]>} Promise, который разрешается в массив объектов сессий типа TSession.
   */
  async getAllSessionsByEmail(email: string): Promise<TSession[]> {
    return Object.values(await this.redisService.hGetAll<TSession>(`email:${email}`))
  }

  /**
   * Получает данные сессии по её UUID из Redis.
   *
   * @param {string} session_uuid - UUID сессии, которую нужно получить.
   * @returns {Promise<TSession | null>} - Promise, который разрешается в объект сессии типа TSession или null, если сессия не найдена.
   */
  async getSessionBySessionUUID(session_uuid: string): Promise<TSession | null> {
    return await this.redisService.get<TSession>(`session:${session_uuid}`)
  }

  /**
 * Проверяет существование сессии по её UUID в Redis.
 *
 * @param {string} session_uuid - UUID сессии, которую нужно проверить.
 * @returns {Promise<boolean>} - Promise, который разрешается в true, если сессия существует, или в false, если нет.
 */
  async existsSession(session_uuid: string): Promise<boolean> {
    return await this.redisService.exists(`session:${session_uuid}`)
  }
  /**
   * Удаляет из хеша все сессии пользователя по email, которые уже не существуют.
   * Проходит по всем сессиям, связанным с email, и удаляет те, которые отсутствуют в Redis.
   *
   * @param {string} email - Электронная почта пользователя, для которого нужно очистить просроченные сессии.
   * @returns {Promise<void>} - Promise, который выполняется после завершения операции.
   */
  async delExpiredSessionsFromHash(email: string): Promise<void> {
    const sessions = await this.getAllSessionsByEmail(email);
    const uuids = sessions.map(session => session.session_uuid);
    for (const uuid of uuids) {
      if (!await this.existsSession(uuid)) {
        await this.deleteSessionFromHash(email, uuid)
      }
    }
  }
}
