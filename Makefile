build:
	@go build -o ./bin/infomosaic

run: build
	@./bin/infomosaic

test:
	go test -v ./...