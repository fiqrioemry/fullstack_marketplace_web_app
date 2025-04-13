package utils

import (
	"fmt"
	"math/rand"
	"time"
)

func RandomUserAvatar() string {
	avatars := []string{
		"Shopia", "Jameson", "Emery", "Sawyer", "Maria",
		"Chase", "Jocelyn", "Liliana", "Robert", "Christian", "Nolan",
	}

	rand.Seed(time.Now().UnixNano())
	avatar := avatars[rand.Intn(len(avatars))]

	return fmt.Sprintf("https://api.dicebear.com/9.x/fun-emoji/svg?seed=%s", avatar)
}
