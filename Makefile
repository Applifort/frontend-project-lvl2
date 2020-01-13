install: 
	npm install --save-dev
publish:
	npm publish --dry-run
start:
	npx babel-node src/bin/gendiff.js
lint:
	npx eslint .
test:
	npm test
test-cov:
	npm test --coverage
