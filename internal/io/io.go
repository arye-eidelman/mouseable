package io

import (
	"encoding/json"
	"fmt"
	"io"
	"io/fs"
	"io/ioutil"
	"os"
	"path/filepath"
	"runtime"

	"github.com/juju/fslock"
	"github.com/pkg/errors"

	"github.com/wirekang/mouseable/internal/cfg"
	"github.com/wirekang/mouseable/internal/cnst"
	"github.com/wirekang/mouseable/internal/lg"
	"github.com/wirekang/mouseable/internal/typ"
)

var defaultConfigName typ.ConfigName = "default.json"

func New() typ.IOManager {
	rd, cd := initDirs()
	return &manager{
		rootDir:   rd,
		configDir: cd,
		metaPath:  filepath.Join(rd, "meta.json"),
	}
}

type manager struct {
	rootDir                 string
	configDir               string
	metaPath                string
	lock                    *fslock.Lock
	onConfigChangedListener func(typ.Config)
}

func (im *manager) LoadAppliedConfigName() (rst typ.ConfigName, err error) {
	var m metaHolder
	m, err = im.loadMeta()
	if err != nil {
		err = errors.WithStack(err)
		return
	}

	rst = m.AppliedConfigName
	return
}

func (im *manager) ApplyConfig(name typ.ConfigName) (err error) {
	var m metaHolder
	m, err = im.loadMeta()
	if err != nil {
		err = errors.WithStack(err)
		return
	}

	m.AppliedConfigName = name
	err = im.saveMeta(m)
	if err != nil {
		err = errors.WithStack(err)
		return
	}

	json, err := im.LoadConfig(name)
	if err != nil {
		err = errors.WithStack(err)
		return
	}

	cfg, err := cfg.New(json)
	if err != nil {
		err = errors.WithStack(err)
		return
	}

	go im.onConfigChangedListener(cfg)
	return
}

func (im *manager) SetOnConfigChangeListener(f func(typ.Config)) {
	im.onConfigChangedListener = f
}

func (im *manager) LoadConfigNames() (rst []typ.ConfigName, err error) {
	rst = make([]typ.ConfigName, 0)
	infos, err := ioutil.ReadDir(im.configDir)
	if err != nil {
		return
	}

	for _, info := range infos {
		if info.IsDir() {
			continue
		}
		rst = append(rst, typ.ConfigName(info.Name()))
	}
	return
}

func (im *manager) SaveConfig(name typ.ConfigName, data typ.ConfigJSON) (err error) {
	err = ioutil.WriteFile(filepath.Join(im.configDir, string(name)), []byte(data), fs.ModePerm)
	if err != nil {
		err = errors.WithStack(err)
	}
	return
}

func (im *manager) LoadConfig(name typ.ConfigName) (data typ.ConfigJSON, err error) {
	if name == "" {
		name = defaultConfigName
	}
	bytes, err := ioutil.ReadFile(filepath.Join(im.configDir, string(name)))

	if err != nil {
		err = errors.WithStack(err)
		return
	}

	data = typ.ConfigJSON(bytes)
	return
}

func (im *manager) Lock() {
	lockFile := im.rootDir + "\\lockfile"
	im.lock = fslock.New(lockFile)
	err := im.lock.TryLock()
	if err != nil {
		if errors.Is(err, fslock.ErrLocked) {
			panic("Mouseable is already running. Please check tray icon.")
		}

		panic(err)
	}

	return
}

func (im *manager) Unlock() {
	_ = im.lock.Unlock()
}

func (im *manager) loadMeta() (m metaHolder, err error) {
	var bytes []byte
	if isNotExists(im.metaPath) {
		m = metaHolder{AppliedConfigName: defaultConfigName}
		err = im.saveMeta(m)
		if err != nil {
			err = errors.WithStack(err)
			return
		}
	}

	bytes, err = ioutil.ReadFile(im.metaPath)
	if err != nil {
		err = errors.WithStack(err)
		return
	}

	err = json.Unmarshal(bytes, &m)
	if err != nil {
		err = errors.WithStack(err)
		return
	}

	return
}

func (im *manager) saveMeta(m metaHolder) (err error) {
	var bytes []byte
	bytes, err = json.Marshal(m)
	if err != nil {
		err = errors.WithStack(err)
		return
	}

	err = ioutil.WriteFile(im.metaPath, bytes, os.ModePerm)
	if err != nil {
		err = errors.WithStack(err)
		return
	}

	return
}

func initDirs() (rootDir string, configDir string) {
	if runtime.GOOS == "windows" {
		rootDir = filepath.Join(os.Getenv("APPDATA"), "mouseable")
		if cnst.IsDev {
			rootDir += "_dev"
		}
		configDir = filepath.Join(rootDir, "configs")

		if isNotExists(configDir) {
			_ = os.MkdirAll(configDir, os.ModeDir)
			initDefaultConfigs(configDir)
		}
		return
	}
	panic(fmt.Sprintf("%s not supported.", runtime.GOOS))
}

func isNotExists(path string) bool {
	_, err := os.Stat(path)
	return os.IsNotExist(err)
}

func initDefaultConfigs(configDir string) {
	lg.Printf("Init default configs")

	entries, err := fs.ReadDir(cnst.DefaultConfigsFS, ".")
	if err != nil {
		panic(err)
	}

	for _, entry := range entries {
		if entry.IsDir() {
			lg.Errorf("%s is directory", entry.Name())
			continue
		}

		src, err := cnst.DefaultConfigsFS.Open(entry.Name())
		if err != nil {
			lg.Errorf("DefaultConfigsFS.Open: %v", err)
			continue
		}

		dst, err := os.Create(filepath.Join(configDir, entry.Name()))
		if err != nil {
			lg.Errorf("os.Open: %v", err)
			continue
		}
		_, err = io.Copy(dst, src)
		if err != nil {
			lg.Errorf("dst.Write: %v", err)
			continue
		}

		src.Close()
		dst.Close()
	}
}
