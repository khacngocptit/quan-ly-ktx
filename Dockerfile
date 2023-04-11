FROM node:12-alpine as builder

WORKDIR /app

COPY ["package.json", "package-lock.json", "tsconfig.*", "nest-cli.json", "./"]
COPY ["src", "./src"]

RUN npm install
RUN npm run build

FROM node:12-alpine

WORKDIR /app

RUN npm install -g pm2
RUN pm2 set pm2-logrotate:max_size 1024K
RUN pm2 set pm2-logrotate:retain 8

COPY ecosystem.config.js ./
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/package.json /app/package-lock.json ./
RUN npm install -only=prod

CMD ["pm2-runtime", "ecosystem.config.js"]