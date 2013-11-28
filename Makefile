REPORTER = spec

test-user:
	@./node_modules/.bin/mocha \
	--reporter $(REPORTER) \
	--ui bdd \
	-t 5000 \
	tests/test-user-l*.js

test-forum:
	@./node_modules/.bin/mocha \
	--reporter $(REPORTER) \
	--ui bdd \
	-t 5000 \
	tests/test-For*.js

test-friend:
	@./node_modules/.bin/mocha \
	--reporter $(REPORTER) \
	--ui bdd \
	-t 5000 \
	tests/test-user-addf*.js

test-all: test-user test-forum test-friend
test: test-all

.PHONY: test-all
	