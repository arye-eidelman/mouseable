package data

import (
	"encoding/json"
	"os"

	"github.com/pkg/errors"

	"github.com/wirekang/mouseable/internal/def"
)

var DI struct {
	SetConfig  func(config def.Config)
	AlertError func(string)
}

type jsonHolder struct {
	FunctionNameMap map[string]uint32
	DataNameMap     map[string]float64
	ActivateKey     def.HotKey
	DeactivateKey   def.HotKey
}

func Init() {
	config := LoadConfig()
	DI.SetConfig(config)
	return
}

func SaveConfig(config def.Config) {
	err := saveData(config)
	if err != nil {
		DI.AlertError(err.Error())
	}
}

func saveData(config def.Config) (err error) {
	DI.SetConfig(config)
	_ = os.MkdirAll(configDir, os.ModeDir)
	jh := jsonHolder{
		FunctionNameMap: functionMapToNameMap(config.FunctionKeyCodeMap),
		DataNameMap:     dataMapToNameMap(config.DataValueMap),
		ActivateKey:     config.ActivateKey,
		DeactivateKey:   config.DeactivateKey,
	}
	bytes, err := json.Marshal(jh)
	if err != nil {
		err = errors.WithStack(err)
		return
	}

	err = os.WriteFile(configFile, bytes, 0755)
	if err != nil {
		err = errors.WithStack(err)
		return
	}

	return
}

func LoadConfig() (config def.Config) {
	config, err := loadConfig()
	if err != nil {
		DI.AlertError("config file not exists. use default.")
		config = makeDefaultConfig()
	}
	return
}

func loadConfig() (config def.Config, err error) {
	bytes, err := os.ReadFile(configFile)
	if err != nil {
		err = errors.WithStack(err)
		return
	}

	var jh jsonHolder
	err = json.Unmarshal(bytes, &jh)
	if err != nil {
		err = errors.WithStack(err)
		return
	}

	config = def.Config{
		FunctionKeyCodeMap: nameMapToFunctionMap(jh.FunctionNameMap),
		DataValueMap:       nameMapToDataMap(jh.DataNameMap),
		ActivateKey:        jh.ActivateKey,
		DeactivateKey:      jh.DeactivateKey,
	}

	return
}

func functionMapToNameMap(m map[*def.Function]uint32) (rst map[string]uint32) {
	rst = make(map[string]uint32, len(m))
	for fnc := range m {
		rst[fnc.Name] = m[fnc]
	}
	return
}

func dataMapToNameMap(m map[*def.Data]float64) (rst map[string]float64) {
	rst = make(map[string]float64, len(m))
	for data := range m {
		rst[data.Name] = m[data]
	}
	return
}

func nameMapToFunctionMap(m map[string]uint32) (rst map[*def.Function]uint32) {
	rst = make(map[*def.Function]uint32, len(m))
	for name, keyCode := range m {
		rst[def.FunctionNameMap[name]] = keyCode
	}
	return
}

func nameMapToDataMap(m map[string]float64) (rst map[*def.Data]float64) {
	rst = make(map[*def.Data]float64, len(m))
	for name, value := range m {
		rst[def.DataNameMap[name]] = value
	}
	return
}

var configDir = os.Getenv("APPDATA") + "\\mouseable"
var configFile = configDir + "\\config.json"
