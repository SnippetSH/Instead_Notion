package main

import (
	"log"
	"net/http"

	"server/app"

	"github.com/joho/godotenv"
)

func main() {
	err := godotenv.Load()
	if err != nil {
		log.Fatal("Error loading .env file")
	}
	http.ListenAndServe(":7575", app.EnableCors(app.StartHTTPServer()))
}
