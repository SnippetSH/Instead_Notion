package app

import (
	"fmt"
	"math/rand"
	"net/smtp"
	"os"
	"time"

	"github.com/google/uuid"

	"golang.org/x/crypto/bcrypt"
)

func (u *User) Create() {
	u.ID = uuid.New().String()
	u.CreatedAt = time.Now()
}

func hashPassword(password string) (string, error) {
	bytes, err := bcrypt.GenerateFromPassword([]byte(password), 14)

	return string(bytes), err
}

func comparePassword(password, hash string) bool {
	err := bcrypt.CompareHashAndPassword([]byte(hash), []byte(password))
	return err == nil
}

func sendEmail(to, subject, body string) error {
	// Mailtrap에서 제공된 인증 정보
	user := os.Getenv("SMTP_USER")
	password := os.Getenv("SMTP_PASSWORD")
	smtpHost := os.Getenv("SMTP_HOST")
	smtpPort := os.Getenv("SMTP_PORT")

	// 발신자 이메일 주소
	from := os.Getenv("SMTP_FROM")

	// SMTP 인증 정보
	auth := smtp.PlainAuth("", user, password, smtpHost)

	// 이메일 메시지 작성
	msg := "MIME-version: 1.0;\nContent-Type: text/html; charset=\"UTF-8\";\n" +
		"From: " + from + "\n" +
		"To: " + to + "\n" +
		"Subject: " + subject + "\n\n" +
		"<html><body>" +
		"<p>Please enter the verification code below to complete the registration.</p>" +
		"<p><b>Verification Code: " + body + "</b></p>" +
		"</body></html>"

	// 메일 전송
	err := smtp.SendMail(smtpHost+":"+smtpPort, auth, from, []string{to}, []byte(msg))
	if err != nil {
		fmt.Println("Error sending email:", err)
		return err
	}
	fmt.Println("Email sent successfully!")
	return nil
}

func generateVerificationCode() string {
	rand.Seed(time.Now().UnixNano())
	code := fmt.Sprintf("%06d", rand.Intn(1000000))
	return code
}
