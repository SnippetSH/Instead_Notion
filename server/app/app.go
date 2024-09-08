package app

import (
	"fmt"
	"net/http"
	"os"

	"github.com/gorilla/mux"

	"server/db"
)

func EnableCors(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set("Access-Control-Allow-Origin", os.Getenv("WEBAPP_URL"))
		w.Header().Set("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS")
		w.Header().Set("Access-Control-Allow-Headers", "Content-Type, Authorization, session_id")

		if r.Method == "OPTIONS" {
			w.WriteHeader(http.StatusOK)
			return
		}

		next.ServeHTTP(w, r)
	})
}

func ServeHTTP(w http.ResponseWriter, r *http.Request) {
	fmt.Fprint(w, "Hello, index")
}

// main HTTP Serve
func StartHTTPServer() http.Handler {
	client, userCollection, documentCollection := db.ConnectDB()
	// fmt.Println(client, userCollection, "test")
	mux := mux.NewRouter()
	api := mux.PathPrefix("/api").Subrouter()

	db := &DB{
		client:             client,
		userCollection:     userCollection,
		documentCollection: documentCollection,
	}

	mux.HandleFunc("/", ServeHTTP).Methods("GET")
	api.HandleFunc("/send-verification-code", db.SendVerificationCodeHandler).Methods("POST")
	api.HandleFunc("/verify-code", db.VerifyCodeHandler).Methods("POST")
	api.HandleFunc("/signup", db.SignUpHandler).Methods("POST")
	api.HandleFunc("/login", db.LoginHandler).Methods("POST")
	api.HandleFunc("/valid-session-id", db.ValidSessionIDHandler).Methods("GET")
	return mux
}
