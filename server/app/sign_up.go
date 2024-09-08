package app

import (
	"context"
	"encoding/json"
	"fmt"
	"net/http"
	"regexp"

	"go.mongodb.org/mongo-driver/bson"

	"server/db"
)

func (database *DB) SendVerificationCodeHandler(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodPost {
		http.Error(w, "Invalid request method", http.StatusMethodNotAllowed)
		return
	}

	var userEmail struct {
		Email string `json:"email"`
	}
	err := json.NewDecoder(r.Body).Decode(&userEmail)
	if err != nil {
		http.Error(w, "Invalid request payload", http.StatusBadRequest)
		return
	}

	// 이메일 형식 검증
	match, _ := regexp.MatchString("^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$", userEmail.Email)
	if !match {
		http.Error(w, "Invalid email", http.StatusBadRequest)
		return
	}

	// 이메일 중복 검증
	email := bson.M{"useremail": userEmail.Email}
	isFind := database.userCollection.FindOne(context.Background(), email)
	if isFind.Err() == nil {
		http.Error(w, "User already exists", http.StatusBadRequest)
		return
	}

	code := generateVerificationCode()
	user := TempUser{
		Email:    userEmail.Email,
		Code:     code,
		Verified: false,
	}

	tempUsers, err := ReadTempUserJSON("data/TempUserData.json")
	if err != nil {
		http.Error(w, "Error reading file", http.StatusInternalServerError)
		return
	}

	var updatedTempUsers []TempUser
	flag := false
	for _, tempUser := range tempUsers {
		if tempUser.Email == userEmail.Email {
			if tempUser.Verified {
				w.WriteHeader(http.StatusOK)
				w.Header().Set("Content-Type", "application/json")
				json.NewEncoder(w).Encode(map[string]string{
					"success":  "true",
					"message":  "User already exists",
					"verified": "true",
				})
				return
			}
			flag = true
			tempUser.Code = code
		}
		updatedTempUsers = append(updatedTempUsers, tempUser)
	}
	tempUsers = updatedTempUsers
	if !flag {
		tempUsers = append(tempUsers, user)
	}

	// dev environment
	// sendEmail(userEmail.Email, "Welcome to KKUEJEOK\n", code)

	err = WriteTempUserJSON("data/TempUserData.json", tempUsers)
	if err != nil {
		http.Error(w, "Error writing file", http.StatusInternalServerError)
		return
	}

	fmt.Println(code)
	w.WriteHeader(http.StatusOK)
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(map[string]string{
		"success": "true",
		"message": "Verification code sent",
	})
}

func (database *DB) VerifyCodeHandler(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodPost {
		http.Error(w, "Invalid request method", http.StatusMethodNotAllowed)
		return
	}

	var requestBody struct {
		Email string `json:"email"`
		Code  string `json:"code"`
	}

	err := json.NewDecoder(r.Body).Decode(&requestBody)
	if err != nil {
		http.Error(w, "Invalid request payload", http.StatusBadRequest)
		return
	}

	tempUsers, err := ReadTempUserJSON("data/TempUserData.json")
	if err != nil {
		http.Error(w, "Error reading file", http.StatusInternalServerError)
		return
	}

	flag := false
	var updatedTempUsers []TempUser
	for _, tempUser := range tempUsers {
		if tempUser.Email == requestBody.Email {
			if tempUser.Code == requestBody.Code {
				tempUser.Verified = true
				flag = true
				updatedTempUsers = append(updatedTempUsers, tempUser)
			}
		}
	}

	if !flag {
		http.Error(w, "Invalid verification code", http.StatusBadRequest)
		return
	}

	err = WriteTempUserJSON("data/TempUserData.json", updatedTempUsers)
	if err != nil {
		http.Error(w, "Error writing file", http.StatusInternalServerError)
		return
	}

	w.WriteHeader(http.StatusOK)
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(map[string]string{
		"success": "true",
		"message": "Verification code verified",
	})
}

func (database *DB) SignUpHandler(w http.ResponseWriter, r *http.Request) {
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
	fmt.Println(user.Email)

	match, _ := regexp.MatchString("^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$", user.Email)
	if !match {
		http.Error(w, "Invalid email", http.StatusBadRequest)
		return
	}

	tempUsers, err := ReadTempUserJSON("data/TempUserData.json")
	if err != nil {
		http.Error(w, "Error reading file", http.StatusInternalServerError)
		return
	}

	flag := false
	var updatedTempUsers []TempUser
	for _, tempUser := range tempUsers {
		if tempUser.Email == user.Email {
			if tempUser.Verified {
				flag = true
				continue // 이 요소를 건너뜁니다.
			}
		}
		updatedTempUsers = append(updatedTempUsers, tempUser)
	}
	// tempUsers를 updatedTempUsers로 교체합니다.
	tempUsers = updatedTempUsers

	if !flag {
		http.Error(w, "User not verified", http.StatusBadRequest)
		return
	}

	err = WriteTempUserJSON("data/TempUserData.json", tempUsers)
	if err != nil {
		http.Error(w, "Error writing file", http.StatusInternalServerError)
		return
	}

	email := bson.M{"useremail": user.Email}
	isFind := database.userCollection.FindOne(context.Background(), email)
	if isFind.Err() == nil {
		http.Error(w, "User already exists", http.StatusBadRequest)
		return
	}

	hash, err := hashPassword(user.Password)
	if err != nil {
		http.Error(w, "Error hashing password", http.StatusInternalServerError)
		return
	}

	user.Create()
	user.Password = hash

	// Save user to Database (MongoDB)
	userDB := db.UserDB{
		ID:        user.ID,
		Username:  user.Name,
		Useremail: user.Email,
		Password:  user.Password,
		CreatedAt: user.CreatedAt,
		Friends:   []string{},
		Documents: []string{},
	}
	result, err := database.userCollection.InsertOne(context.Background(), userDB)
	if err != nil {
		http.Error(w, "Error inserting user", http.StatusInternalServerError)
		return
	}
	fmt.Println(result)

	w.WriteHeader(http.StatusOK)
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(map[string]string{
		"success":    "true",
		"message":    "User created",
		"user":       user.Name,
		"session_id": user.ID,
	})
}
