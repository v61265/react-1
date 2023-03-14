P := "\\033[32m[+]\\033[0m"

help:
	@echo "$(P) make dev - Start webpack dev server and watch any changes"
	@echo "$(P) make build - Transpile jsx, es6 and above to es5 files, create type declaration files, and build pacakge bundle"

dev: 
	@echo "$(P) Start webpack dev server"
	NODE_ENV=development yarn webpack serve -c dev/webpack.config.js

build-lib:
	@echo "$(P) Transpile es6, jsx and (typescript) to es5"
	NODE_ENV=production yarn babel src --out-dir lib --copy-files --root-mode upward
	@echo "$(P) Create type declaration file"
	yarn run build-type

build: clean build-lib

clean:
	@echo "$(P) Clean build artifacts"
	rm -rf lib/ dist/

.PHONY: build clean dev build-lib
