REPORTER = spec

test-user:
	@./node_modules/.bin/mocha \
	--reporter $(REPORTER) \
	--ui bdd \
	tests/test-user*.js

test-all: test-user
test: test-all

.PHONY: test-all
	