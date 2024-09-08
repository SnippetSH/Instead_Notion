package app

import (
	"time"

	"go.mongodb.org/mongo-driver/mongo"

	"server/db"
)

type TempUser struct {
	Email    string `json:"email"`
	Code     string `json:"code"`
	Verified bool   `json:"verified"`
}

type User struct {
	ID        string
	Name      string `json:"name"`
	Email     string `json:"email"`
	Password  string `json:"password"`
	CreatedAt time.Time
}

type Document struct {
	ID        string
	UserID    string `json:"user_id"`
	Title     string `json:"title"`
	Content   string `json:"content"`
	CreatedAt time.Time
	IsPublic  db.Enum `json:"isPublic"`
}

type DB struct {
	client             *mongo.Client
	userCollection     *mongo.Collection
	documentCollection *mongo.Collection
}
