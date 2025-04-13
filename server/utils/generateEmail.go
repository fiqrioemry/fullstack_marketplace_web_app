package utils

import (
	"fmt"
	"os"
	"server/config"

	"gopkg.in/gomail.v2"
)

func SendEmailOTP(email string, otpcode string) error {
	m := gomail.NewMessage()

	from := os.Getenv("USER_EMAIL")
	subject := "One-Time Password (OTP) for Login"

	m.SetHeader("From", fmt.Sprintf("Marketplace <%s>", from))
	m.SetHeader("To", email)
	m.SetHeader("Subject", subject)
	m.SetBody("text/plain", fmt.Sprintf("Your OTP Code is %s", otpcode))
	m.AddAlternative("text/html", fmt.Sprintf("Your OTP Code is <b>%s</b>", otpcode))

	if err := config.MailDialer.DialAndSend(m); err != nil {
		return fmt.Errorf("failed to send email: %w", err)
	}

	return nil
}
