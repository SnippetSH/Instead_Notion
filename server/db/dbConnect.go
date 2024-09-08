package db

import (
	"context"
	"fmt"
	"log"
	"os"

	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

// const URL = "mongodb://username:password@localhost:27017/kkuejeok"

func ConnectDB() (*mongo.Client, *mongo.Collection, *mongo.Collection) {
	URL := os.Getenv("MONGO_URL")
	serverAPI := options.ServerAPI(options.ServerAPIVersion1)
	opts := options.Client().ApplyURI(URL).SetServerAPIOptions(serverAPI)
	client, err := mongo.Connect(context.TODO(), opts)

	if err != nil {
		log.Fatal(err)
	}

	err = client.Ping(context.TODO(), nil)
	if err != nil {
		log.Fatal(err)
	}

	fmt.Println("Connected to MongoDB")
	userCollection := client.Database("kkuejeok").Collection("userCollection")
	documnetCollection := client.Database("kkuejeok").Collection("documnetCollection")
	return client, userCollection, documnetCollection
}
