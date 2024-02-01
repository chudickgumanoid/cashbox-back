# Используем базовый образ Node.js
FROM node:20

# Устанавливаем рабочую директорию в контейнере
WORKDIR /usr/src/app

# Копируем файлы package.json и package-lock.json
COPY package*.json ./

# Устанавливаем зависимости
RUN npm install pnpm -g
RUN pnpm install
RUN pnpm install npx

# Копируем остальные файлы проекта в контейнер
COPY . .

# Генерируем Prisma Client
RUN npx prisma generate

RUN pnpm run build

# Открываем порт, на котором будет работать приложение
EXPOSE 3000

# Устанавливаем переменную окружения
ENV DATABASE_URL=postgresql://postgres:postgres@192.168.0.122:5432/test-docker-nest?schema=public

# Команда для запуска приложения
CMD ["npm", "run", "start:prod"]
