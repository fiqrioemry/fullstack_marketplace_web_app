FROM golang:1.24-alpine3.21

RUN apk add --no-cache git gcc g++ libc-dev

WORKDIR /app

COPY go.mod go.sum ./
RUN go mod download

COPY . .

# Copy ulang .env agar pasti tersedia di container
COPY .env .env

WORKDIR /app/cmd

RUN go build -o /usr/bin/main .

EXPOSE 5001

CMD ["/usr/bin/main"]
