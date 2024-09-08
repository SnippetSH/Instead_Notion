package app

import (
	"encoding/json"
	"io/ioutil"
	"os"
)

func ReadTempUserJSON(path string) ([]TempUser, error) {
	file, err := os.Open(path)
	if err != nil {
		return nil, err
	}
	defer file.Close()

	bytes, err := ioutil.ReadAll(file)
	if err != nil {
		return nil, err
	}

	var tempUsers []TempUser
	err = json.Unmarshal(bytes, &tempUsers)
	if err != nil {
		return nil, err
	}

	return tempUsers, nil
}

func WriteTempUserJSON(path string, tempUsers []TempUser) error {
	bytes, err := json.Marshal(tempUsers)
	if err != nil {
		return err
	}

	err = os.WriteFile(path, bytes, 0644)
	if err != nil {
		return err
	}

	return nil
}
