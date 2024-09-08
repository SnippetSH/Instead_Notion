package app

import (
	"encoding/json"
	"net/http"
)

// TODO: 문서 저장 로직(handler)
func (database *DB) SaveDocumentHandler(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodPost {
		http.Error(w, "Invalid request method", http.StatusMethodNotAllowed)
		return
	}

	var document Document
	err := json.NewDecoder(r.Body).Decode(&document)
	if err != nil {
		http.Error(w, "Invalid request payload", http.StatusBadRequest)
		return
	}
}
