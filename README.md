# like-ar
Using objects like arrays with map, filter, forEach and others coming soon.


![extending](https://img.shields.io/badge/stability-extending-orange.svg)
[![npm-version](https://img.shields.io/npm/v/like-ar.svg)](https://npmjs.org/package/like-ar)
[![downloads](https://img.shields.io/npm/dm/like-ar.svg)](https://npmjs.org/package/like-ar)
[![build](https://img.shields.io/travis/codenautas/like-ar/master.svg)](https://travis-ci.org/codenautas/like-ar)
[![coverage](https://img.shields.io/coveralls/codenautas/like-ar/master.svg)](https://coveralls.io/r/codenautas/like-ar)
[![climate](https://img.shields.io/codeclimate/github/codenautas/like-ar.svg)](https://codeclimate.com/github/codenautas/like-ar)
[![dependencies](https://img.shields.io/david/codenautas/like-ar.svg)](https://david-dm.org/codenautas/like-ar)
[![qa-control](http://codenautas.com/github/codenautas/like-ar.svg)](http://codenautas.com/github/codenautas/like-ar)



language: ![English](https://raw.githubusercontent.com/codenautas/multilang/master/img/lang-en.png)
also available in:
[![Spanish](https://raw.githubusercontent.com/codenautas/multilang/master/img/lang-es.png)](LEEME.md)

# Install
```sh
$ npm install like-ar
```

# Usage
```sh
var likeAr = require('like-ar');

var object={
    lastName:'Perez',
    firstName:'Diego'
}

likeAr(object).forEach(function(value, attrName, object){
    console.log(attrName,':',value);
});
```

## License

[MIT](LICENSE)

