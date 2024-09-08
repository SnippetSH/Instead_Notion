package app

import (
	"context"
	"encoding/json"
	"fmt"
	"net/http"

	"go.mongodb.org/mongo-driver/bson"

	"server/db"
)

func (database *DB) LoginHandler(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodPost {
		http.Error(w, "Invalid request method", http.StatusMethodNotAllowed)
		return
	}

	var user User
	err := json.NewDecoder(r.Body).Decode(&user)
	if err != nil {
		http.Error(w, "Invalid request payload", http.StatusBadRequest)
		return
	}

	filter := bson.M{"useremail": user.Email}

	result := database.userCollection.FindOne(context.Background(), filter)
	if result.Err() != nil {
		http.Error(w, "User not found", http.StatusNotFound)
		return
	}

	var resultUser db.UserDB
	err = result.Decode(&resultUser)
	if err != nil {
		http.Error(w, "Error decoding user", http.StatusInternalServerError)
		return
	}

	if !comparePassword(user.Password, resultUser.Password) {
		http.Error(w, "Invalid password", http.StatusUnauthorized)
		return
	}

	fmt.Println(resultUser)
	w.WriteHeader(http.StatusOK)
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(map[string]string{
		"success":    "true",
		"message":    "User logged in",
		"user":       resultUser.Username,
		"session_id": resultUser.ID,
	})
}

func (database *DB) ValidSessionIDHandler(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodGet {
		http.Error(w, "Invalid request method", http.StatusMethodNotAllowed)
		return
	}

	sessionID := r.Header.Get("session_id")
	if sessionID == "" {
		http.Error(w, "Session ID not found", http.StatusUnauthorized)
		return
	}

	filter := bson.M{"_id": sessionID}
	result := database.userCollection.FindOne(context.Background(), filter)
	if result.Err() != nil {
		http.Error(w, "User not found", http.StatusNotFound)
		return
	}

	var resultUser db.UserDB
	err := result.Decode(&resultUser)
	if err != nil {
		http.Error(w, "Error decoding user", http.StatusInternalServerError)
		return
	}

	w.WriteHeader(http.StatusOK)
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(map[string]string{
		"success":    "true",
		"message":    "Session ID is valid",
		"user":       resultUser.Username,
		"session_id": resultUser.ID,
	})
}
