<!--multilang v0 es:LEEME.md en:README.md -->
  # like-ar
<!--lang:es-->
Using objects like arrays with map, filter, forEach and others coming soon.
<!--lang:en--]
Using objects like arrays with map, filter, forEach and others coming soon.

[!--lang:*-->

<!-- cucardas -->
![extending](https://img.shields.io/badge/stability-extending-orange.svg)
[![npm-version](https://img.shields.io/npm/v/like-ar.svg)](https://npmjs.org/package/like-ar)
[![downloads](https://img.shields.io/npm/dm/like-ar.svg)](https://npmjs.org/package/like-ar)
[![build](https://img.shields.io/travis/codenautas/like-ar/master.svg)](https://travis-ci.org/codenautas/like-ar)
[![coverage](https://img.shields.io/coveralls/codenautas/like-ar/master.svg)](https://coveralls.io/r/codenautas/like-ar)
[![climate](https://img.shields.io/codeclimate/github/codenautas/like-ar.svg)](https://codeclimate.com/github/codenautas/like-ar)
[![dependencies](https://img.shields.io/david/codenautas/like-ar.svg)](https://david-dm.org/codenautas/like-ar)
[![qa-control](http://codenautas.com/github/codenautas/like-ar.svg)](http://codenautas.com/github/codenautas/like-ar)


<!--multilang buttons-->

idioma: ![castellano](https://raw.githubusercontent.com/codenautas/multilang/master/img/lang-es.png)
también disponible en:
[![inglés](https://raw.githubusercontent.com/codenautas/multilang/master/img/lang-en.png)](README.md)

<!--lang:es-->
# Instalación
<!--lang:en--]
# Install
[!--lang:*-->
```sh
$ npm install like-ar
```

<!--lang:es-->
# Uso

La función `likeAr` envuelve un objeto de modo que puedan usarse un
conjunto conocido de funciones diseñadas para correr sobre arreglos: 
`forEach`, `map`, `filter` y `join`. Similarmente a lo que ocurre con arreglos 
estas funciones reciben una función que se ejecuta para cada elemento del objeto,
esa función recibe el valor, la clave y el objeto original.

<!--lang:en--]
# Usage

The function `likeAr` wraps an object. The wraped object can be used like an array 
with some array functions: `forEach`, `map`, `filter` y `join`. 

These functions receive a callback in the same way that the array version does. 

[!--lang:*-->
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

<!--lang:*-->
# API
<!--lang:es-->
Todas las funciones callback reciben como parámetro: valor, clave y objeto original. 
Las funciones que en el caso de arrays devuelven un array en estas devuelven un objeto encadenable. 

función             | valor devuelto
--------------------|--------------------
`forEach(cb, this)` | `undefined`
`map(cb, this)`     | objeto encadenable con las mismas claves y los valores mapeados


<!--lang:en--]
# Usage
<!--lang:es-->
forEach
-------

<!--lang:en--]
# Usage
[!--lang:*-->
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

<!--lang:es-->
## Licencia
<!--lang:en--]
## License
   [!--lang:*-->
  
[MIT](LICENSE)

