# Select .env from project or created by args
FROM alpine as env
WORKDIR /autoexpert-frontend
COPY *.env .env

# Prepare build image
FROM alpine AS builder
WORKDIR /autoexpert-frontend
COPY . .
RUN apk add --update npm
RUN npm install -g pnpm
COPY --from=env /autoexpert-frontend/.env .env
RUN pnpm install
RUN pnpm run build

# Build production image
FROM nginx:alpine AS runner
EXPOSE 80
COPY /public/nginx.conf /etc/nginx/nginx.conf
COPY --from=builder /autoexpert-frontend/dist /usr/share/nginx/html
CMD ["nginx", "-g", "daemon off;"]
