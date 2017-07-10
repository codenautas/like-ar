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

The function `likeAr` wraps an object. The wraped object can be used like an array
with some array functions: `forEach`, `map`, `filter` y `join`.

These functions receive a callback in the same way that the array version does.

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

# API
The callback functions receive these parameters: `value`, `key` and the original object.
The functions that in the Array case returns Arrays returns a chainable object.

function            | returned value
--------------------|--------------------
`forEach(cb, this)` | `undefined`
`map(cb, this)`     | chainable object with the same keys and the value mapeds
`filter(db, this)`  | chainable object with the same keys and values for only that key/value that returns true in the callback function
`join(separator)`   | string with the join of the values
`array()`           | array of values
`keys()`            | array of keys

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

