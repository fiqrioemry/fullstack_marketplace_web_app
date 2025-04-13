package utils

import (
	"fmt"
	"regexp"
	"strings"
	"time"
)

func CreateSlug(input string) string {

	slug := strings.ToLower(strings.TrimSpace(input))

	slug = regexp.MustCompile(`\s+`).ReplaceAllString(slug, "-")

	slug = regexp.MustCompile(`[^\w-]+`).ReplaceAllString(slug, "")

	timestamp := fmt.Sprintf("%d", time.Now().Unix())
	slug = fmt.Sprintf("%s-%s", slug, timestamp[len(timestamp)-4:])

	return slug
}
