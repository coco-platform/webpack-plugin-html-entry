# nodejs

![Build Status](https://img.shields.io/travis/coco-template/nodejs/master.svg?style=flat)
[![Coverage Status](https://coveralls.io/repos/github/coco-template/nodejs/badge.svg?branch=master)](https://coveralls.io/github/coco-template/nodejs?branch=master)
![Package Dependency](https://img.shields.io/david/coco-template/nodejs.svg)
![Package DevDependency](https://img.shields.io/david/dev/coco-template/nodejs.svg)
[![Greenkeeper badge](https://badges.greenkeeper.io/coco-template/nodejs.svg)](https://greenkeeper.io/)
[![Known Vulnerabilities](https://snyk.io//test/github/coco-template/nodejs/badge.svg?targetFile=package.json)](https://snyk.io//test/github/coco-template/nodejs?targetFile=package.json)

create creative nodejs package basement.

## Usage

```shell
# compile in watch mode
npm run compile:watch;

# unit test with coverage
npm run test;
```

## Attention

- tsc compiler compile without `polyfill`, mainly provide declare files
- babel compiler compile `commonjs` style code
- remember to change meta field in the `package.json`
- compile script automatically run before publish, no need for manual compile

# Licence

MIT
