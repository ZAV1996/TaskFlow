# 🛠️ TaskFlow — Система управления проектами

TaskFlow — это современное веб-приложение для управления проектами, задачами и рабочими процессами (workflow), вдохновлённое функциональностью Jira и Linear. Реализовано с использованием **NestJS**, **React**, **GraphQL**, **TypeORM** и других современных технологий.


## 🚀 Функциональность

- 📁 Создание и управление проектами
- 🧩 Доски задач (Kanban)
- 🧑‍🤝‍🧑 Пользователи, роли и права доступа
- 🔄 Workflow и статусы задач
- 📨 Уведомления (email, in-app, web-push)
- 🔐 Авторизация на основе сессий (Redis + Guard + bcrypt)
- 📊 GraphQL API (code-first, типизированный)
- 🧠 Кэширование, защита от N+1, DataLoader (в процессе)
- 📦 Интеграция с Redis и PostgreSQL

## 🧱 Технологии

### Клиент (React)
- React 18 + TypeScript
- Apollo Client (GraphQL)
- React Hook Form + Zod
- Tailwind CSS + Radix UI
- React Router
- Date-fns / Luxon
- Vite

### Сервер (NestJS)
- NestJS + GraphQL (code-first)
- TypeORM + PostgreSQL / опционально
- Redis (cache-manager)
- bcryptjs (хеширование паролей)
- Jest (тестирование)
- ESLint + Prettier

## ⚙️ Установка и запуск

### 1. Клонирование репозитория
```bash
git clone https://github.com/ZAV1996/Agile.git
cd Agile
```

### 2. Установка зависимостей
```bash
# Установи зависимости для фронтенда
cd client
npm install

# Установи зависимости для бэкенда
cd ../server
npm install
```

### 3. Переменные окружения

Создай `.env` файлы в `client/` и `server/`, скопировав `.env.example`.

Пример `.env` для сервера:
```env
PORT=4000
DATABASE_URL=postgres://user:password@localhost:5432/projectflow
JWT_SECRET=your-secret-key
REDIS_URL=redis://localhost:6379
```

### 4. Запуск разработки
```bash
# Запуск клиентской части
cd client
npm run dev

# Запуск серверной части
cd ../server
npm run start:dev
```

## 🧪 Тестирование
```bash
cd server
npm run test
```

## 📌 Планы на будущее
- [ ] Виртуализация списков
- [ ] Полноценные уведомления (web-push)
- [ ] Поддержка команд и организаций
- [ ] Улучшенное логирование и мониторинг
- [ ] CI/CD пайплайн
- [ ] Доработка UI/UX
- [ ] Спринты
- [ ] Много еще чего ....

## 👨‍💻 Автор
Александр Зайцев  
✉️ Telegram: [@zav20570]  
🔗 GitHub: [github.com/ZAV1996](https://github.com/ZAV1996)

## 📝 Лицензия
Проект распространяется под лицензией MIT.
