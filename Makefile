all : node_modules
	npm run dev

clean :
	rm -rf .next node_modules package-lock.json tsconfig.tsbuildinfo

node_modules : package.json
	npm install

.PHONY : all clean
