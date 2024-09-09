![infomosaic_logo](https://github.com/pooulad/infomosaic/blob/main/images/infomosaic.png)<br/>

See your system information side by side like mosaics🧩<br/>

Minimal project written with Golang and Reactjs


![infomosaic_screen_dark](https://github.com/pooulad/infomosaic/blob/main/images/screen-dark.png)
![infomosaic_screen_light](https://github.com/pooulad/infomosaic/blob/main/images/screen-light.png)<br/>

# How to use: <br/>


⚠️ Before use: do not forget to add .env file .it is necessary for docker compose file and golang main file. best sample:<br/>

.env file.<br/>
```env
INFOMOSAIC_PORT=8080
INFOMOSAIC_CLIENT_PORT=3000
```

## Run with Docker🐳:<br/>

1.<br/>
```bash
git clone https://github.com/pooulad/infomosaic.git
```
2.<br/>
```bash
cd ./infomosaic
```

3.<br/>
```bash
docker compose up -d --build
```

### These commands create 2 separate services for front-end and back-end, both of which are ready to work with each other

✅client container : infomosaic-client-container<br/>
✅server container : infomosaic-server-container<br/>

### You can check logs with this command:

```bash
docker compose logs
```

## Run manually:<br/>

1.<br/>
```bash
git clone https://github.com/pooulad/infomosaic.git
```
2.<br/>
```bash
cd ./infomosaic
```

3.<br/>
```bash
go mod tidy
go run ./cmd/main.go
```

### You should see this log in terminal:<br/>
Starting Infomosaic🧩 server on port YOUR_PORT

### Open another terminal and run:<br/>
4.<br/>
```bash
cd ./frontend
yarn install
yarn dev
```

### Now your client is runnig too. enjoy it🤠<br/>