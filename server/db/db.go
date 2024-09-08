package db

import (
	"time"
)

// Enum 타입 정의
type Enum string

const (
	PUBLIC  Enum = "public"
	FRIEND  Enum = "friend"
	PRIVATE Enum = "private"
)

// DocumentDB 구조체
type DocumentDB struct {
	ID        string    `bson:"_id"`       // MongoDB의 _id 필드와 매핑
	UserID    string    `bson:"user_id"`   // 사용자 ID
	Title     string    `bson:"title"`     // 제목
	Content   string    `bson:"content"`   // 내용
	CreatedAt time.Time `bson:"createdAt"` // 생성 날짜
	IsPublic  Enum      `bson:"isPublic"`  // 공개 여부
}

// UserDB 구조체
type UserDB struct {
	ID        string    `bson:"_id"`       // MongoDB의 _id 필드와 매핑
	Username  string    `bson:"username"`  // 사용자 이름
	Useremail string    `bson:"useremail"` // 사용자 이메일
	Password  string    `bson:"password"`  // 해싱된 비밀번호
	CreatedAt time.Time `bson:"createdAt"` // 생성 날짜
	Friends   []string  `bson:"friends"`   // 친구 목록 (사용자 ID 배열)
	Documents []string  `bson:"documents"` // 문서 목록 (DocumentCollection의 _id 배열)
}
