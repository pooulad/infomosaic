package main

import (
	"context"
	"encoding/json"
	"fmt"
	"log"
	"net/http"
	"os"
	"sync"
	"time"

	"github.com/joho/godotenv"
	"github.com/pooulad/infomosaic/internal/systeminfo"
	"golang.org/x/net/websocket"
)

type Server struct {
	bufferSize       int
	mux              http.ServeMux
	subscribersMutex sync.Mutex
	subscribers      map[*Subscriber]struct{}
}

type SystemInfo struct {
	System    interface{} `json:"system"`
	Disk      interface{} `json:"disk"`
	CPU       interface{} `json:"cpu"`
	TimeStamp string      `json:"timestamp"`
}

func (s *Server) subscribeHandler(w http.ResponseWriter, r *http.Request) {
	err := s.subscribe(r.Context(), w, r)
	if err != nil {
		fmt.Println(err)
		return
	}
}

func (s *Server) subscribe(ctx context.Context, w http.ResponseWriter, r *http.Request) error {
	subscriber := &Subscriber{
		messages: make(chan []byte, s.bufferSize),
	}
	s.addSubscriber(subscriber)

	wsHandler := func(ws *websocket.Conn) {
		defer ws.Close()

		for {
			select {
			case message := <-subscriber.messages:
				writeCtx, cancel := context.WithTimeout(ctx, time.Second*5)
				defer cancel()

				if err := websocket.Message.Send(ws, string(message)); err != nil {
					if writeCtx.Err() == context.DeadlineExceeded {
						log.Printf("Timeout: message sending exceeded 5 seconds")
					} else {
						log.Printf("Error sending message: %v", err)
					}
					return
				}
			case <-ctx.Done():
				fmt.Println("Websocket connection closed")
				return
			}
		}
	}

	wsServer := websocket.Server{Handler: websocket.Handler(wsHandler)}
	wsServer.ServeHTTP(w, r)

	return nil
}

func (s *Server) addSubscriber(subscriber *Subscriber) {
	s.subscribersMutex.Lock()
	s.subscribers[subscriber] = struct{}{}
	s.subscribersMutex.Unlock()
	fmt.Println("New subscriber added successfuly: ", subscriber)
}

func (s *Server) broadcastMessage(message []byte) {
	s.subscribersMutex.Lock()
	defer s.subscribersMutex.Unlock()

	for subscribe := range s.subscribers {
		subscribe.messages <- message
	}
}

type Subscriber struct {
	messages chan []byte
}

func NewServer() *Server {
	s := &Server{
		bufferSize:  10,
		subscribers: make(map[*Subscriber]struct{}),
	}
	s.mux.HandleFunc("/ws", s.subscribeHandler)
	return s
}

func main() {
	err := godotenv.Load()
	if err != nil {
		log.Fatal("Error loading .env file")
	}

	// add your env variables in .env file to load it
	var (
		// host = os.Getenv("INFOMOSAIC_HOST")
		port = os.Getenv("INFOMOSAIC_PORT")
	)

	server := NewServer()
	go func(s *Server) {
		for {
			systemData, err := systeminfo.GetSystemSection()
			if err != nil {
				fmt.Println(err)
				continue
			}
			diskData, err := systeminfo.GetDiskSection()
			if err != nil {
				fmt.Println(err)
				continue
			}
			cpuData, err := systeminfo.GetCpuSection()
			if err != nil {
				fmt.Println(err)
				continue
			}
			timeStamp := time.Now().Format("2006-01-02 15:04:05")

			msg := SystemInfo{
				System:    systemData,
				Disk:      diskData,
				CPU:       cpuData,
				TimeStamp: timeStamp,
			}

			msgJSON, err := json.Marshal(msg)
			if err != nil {
				fmt.Println("Error marshaling JSON:", err)
				return
			}
			s.broadcastMessage(msgJSON)

			time.Sleep(2 * time.Second)
		}
	}(server)

	fmt.Printf("Starting Infomosaic🧩 server on port:%v \n", port)
	err = http.ListenAndServe(fmt.Sprintf(":%v", port), &server.mux)
	if err != nil {
		fmt.Println(err)
		os.Exit(1)
	}
}
