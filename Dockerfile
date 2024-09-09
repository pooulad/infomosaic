FROM golang:1.22.6-alpine AS build

WORKDIR /app

COPY go.mod go.sum ./

COPY .env /app/.env

RUN go mod download

COPY . .

RUN go build -o /app/infomosaic ./cmd/main.go

FROM alpine:latest

WORKDIR /root/

COPY --from=build /app/* .

EXPOSE 8080

CMD ["./infomosaic"]
