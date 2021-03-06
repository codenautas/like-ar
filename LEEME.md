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
[![dependencies](https://img.shields.io/david/codenautas/like-ar.svg)](https://david-dm.org/codenautas/like-ar)


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
    firstName:'Diego',
    phone:'+45-11-2222-3333'
}

likeAr(object).forEach(function(value, attrName, object, position){
    console.log(position+'.',attrName,':',value);
});

console.log(
    likeAr(object).filter(function(value, attrName){
        return attrName.contains('Name');
    }).map(function(value,attrName){
        return attrName+':'+value
    }).join(', ')
);

```

<!--lang:*-->
# API

## likeAr(object)
<!--lang:es-->
Devuelve el objeto encadenable. Ese objeto tiene los siguientes métodos:

función             | valor devuelto
--------------------|--------------------
`forEach(cb, this)` | `undefined`
`map(cb, this)`     | objeto encadenable con las mismas claves y los valores mapeados
`filter(cb, this)`  | objeto encadenable con los mismas claves y valores para los que la función callback retornó true
`join(separator)`   | texto con los valores unidos por el separador
`array()`           | arreglo conteniendo solo los valores
`keys()`            | arreglo conteniendo solo las claves
`plain()`           | devuelve un objeto plano (donde ya no se puede llamar a `forEach`, `map`, `filter`, etc)

Todas las funciones callback (`cb`) reciben como parámetro: valor, clave, objeto original y posición (numérica comenzando con 0). 

<!--lang:en--]
The callback functions receive these parameters: `value`, `key`, the `original` object and the `position` (starting by 0).
The functions that in the Array case returns Arrays returns a chainable object.

function            | returned value
--------------------|--------------------
`forEach(cb, this)` | `undefined`
`map(cb, this)`     | chainable object with the same keys and the value mapeds
`filter(db, this)`  | chainable object with the same keys and values for only that key/value that returns true in the callback function
`join(separator)`   | string with the join of the values
`array()`           | array of values
`keys()`            | array of keys
`plain()`           | plain object without likeAr functions


[!--lang:*-->

## likeAr(object).build(cb(value, key))
<!--lang:es-->
Construye un objeto nuevo con las claves cambiadas. 
La función `cb` debe devolver el elemento como un objeto de un solo campo `{k: v}` que se usará para componer el resultado final. 

<!--lang:en--]
Builds a new object with new keys. 

The callback function must return a `{key: value}` object to compose the final result. 
[!--lang:*-->

```ts
var pairs=[{field:'lastName', value:'Perez'}, {field:'firstName', value:'Diego'}];

console.log(likeAr(pairs).build(funciton(pair){ return {[pair.field]: pair.value}; ));
// {lastName: "Perez", firstName: "Diego"}

var toJoin=[{lastName:'Perez'}, {firstName:'Diego'}];

console.log(likeAr(toJoin).build(funciton(objectWithOneKey){ return objectWithOneKey; ));
// {lastName: "Perez", firstName: "Diego"}

```

## likeAr.toPlainObject(array [,keyName [,valueName]])
## likeAr.toPlainObject(arrayOfKeys, arrayOfValues)

<!--lang:es-->
Construye un objeto común (no encadenable) a partir de un arreglo de pares (o de un par de arreglos) de claves y valores. 

Parámetros predeterminados: si no se especifica `keyName` se usan 0 y 1 y se supone que los pares vienen en un arreglo. 
Si se especifica `keyName` el valor predeterminado de `valueName` es `"value"`.


<!--lang:en--]
Returns a plain object from an array of pairs (or a pair of arrays) of key/values. 

Default values: `0` and `1` if `keyName` is not set. `"value"` for `valueName` if `keyName` is set.

[!--lang:*-->
# Usage

```sh
var likeAr = require('like-ar');

var pairs=[['lastName', 'Perez'], ['firstName', 'Diego']];

console.log(likeAr.toPlainObject(pairs));

var pairs=[{field:'lastName', value:'Perez'}, {field:'firstName', value:'Diego'}];

console.log(likeAr.toPlainObject(pairs, 'field'));
```

## likeAr.createIndex(array:T[],keyName:string):{[k:string]: T}

<!--lang:es-->
Construye un objeto común que será índice de los elementos de un arreglo existente. 
Cada valor del objeto apunta a un elemento del arreglo existente.

<!--lang:en--]
Returns a plain object containing the same element indexed by keyName

[!--lang:*-->
# Usage

```sh
var likeAr = require('like-ar');

var persons=[{name:'Diego', lastName:'Rivera', age:30}, {name:'Frida', lastName:'Kahlo'}];

var idxPersons=likeAr.createIndex(persons, 'lastName');

idxPersons.Kahlo.age=20;

console.log(persons[1].age); // 20
```

<!--lang:es-->
## Licencia
<!--lang:en--]
## License
[!--lang:*-->
  
[MIT](LICENSE)

