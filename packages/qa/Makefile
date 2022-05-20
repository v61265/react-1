P := "\\033[32m[+]\\033[0m"

help:
	@echo "$(P) make dev - Start webpack dev server and watch any changes"
	@echo "$(P) make build - Transpile jsx, es6 and above to es5 files, and build webpack bundles"

dev: 
	@echo "$(P) Start webpack dev server"
	NODE_ENV=development npx webpack serve -c dev/webpack.config.js

build-dist: 
	@echo "$(P) Build webpack chunks, bundles and webpack-assets.json"
	NODE_ENV=production npx webpack --config webpack.config.js

build-lib:
	@echo "$(P) Transpile es6, jsx and (typescript) to es5"
	NODE_ENV=production npx babel src --out-dir lib --copy-files --root-mode upward

build: clean build-dist build-lib

clean:
	@echo "$(P) Clean lib/ dist/"
	rm -rf lib/ dist/

.PHONY: build clean dev build-dist build-lib
