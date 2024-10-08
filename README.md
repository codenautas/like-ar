# like-ar
Using objects like arrays with map, filter, forEach and others coming soon.


![extending](https://img.shields.io/badge/stability-extending-orange.svg)
[![npm-version](https://img.shields.io/npm/v/like-ar.svg)](https://npmjs.org/package/like-ar)
[![downloads](https://img.shields.io/npm/dm/like-ar.svg)](https://npmjs.org/package/like-ar)
[![build](https://img.shields.io/travis/codenautas/like-ar/master.svg)](https://travis-ci.org/codenautas/like-ar)
[![coverage](https://img.shields.io/coveralls/codenautas/like-ar/master.svg)](https://coveralls.io/r/codenautas/like-ar)
[![dependencies](https://img.shields.io/david/codenautas/like-ar.svg)](https://david-dm.org/codenautas/like-ar)



language: ![English](https://raw.githubusercontent.com/codenautas/multilang/master/img/lang-en.png)
also available in:
[![Spanish](https://raw.githubusercontent.com/codenautas/multilang/master/img/lang-es.png)](LEEME.md)

# Install
```sh
$ npm install like-ar
```

# Usage

The function `LikeAr` wraps an object. The wraped object can be used like an array
with some array functions: `forEach`, `map`, `filter` y `join`.

These functions receive a callback in the same way that the array version does.

```js
var {LikeAr} = require('like-ar');

var object={
    lastName:'Perez',
    firstName:'Diego',
    phone:'+45-11-2222-3333'
}

LikeAr(object).forEach(function(value, attrName, object, position){
    console.log(position+'.',attrName,':',value);
});

console.log(
    LikeAr(object).filter(function(value, attrName){
        return attrName.contains('Name');
    }).map(function(value,attrName){
        return attrName+':'+value
    }).join(', ')
);

var objectUpperCase=LikeAr(object).map(v=>v.toUpperCase());

/* objectUpperCase =
var object={
    lastName:'PEREZ',
    firstName:'DIEGO',
    phone:'+45-11-2222-3333'
}
*/

```

# API

### `likeAr(object)`
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
`plain()`           | plain object without LikeAr functions



### `LikeAr(object).build(cb(value, key))`
Builds a new object with new keys.

The callback function must return a `{key: value}` object to compose the final result.

```ts
var pairs=[{field:'lastName', value:'Perez'}, {field:'firstName', value:'Diego'}];

console.log(LikeAr(pairs).build(funciton(pair){ return {[pair.field]: pair.value}; ));
// {lastName: "Perez", firstName: "Diego"}

var toJoin=[{lastName:'Perez'}, {firstName:'Diego'}];

console.log(LikeAr(toJoin).build(funciton(objectWithOneKey){ return objectWithOneKey; ));
// {lastName: "Perez", firstName: "Diego"}

```

### `LikeAr.toPlainObject(array [,keyName [,valueName]])`
### `LikeAr.toPlainObject(arrayOfKeys, arrayOfValues)`

Returns a plain object from an array of pairs (or a pair of arrays) of key/values.

Default values: `0` and `1` if `keyName` is not set. `"value"` for `valueName` if `keyName` is set.


```ts
var {LikeAr} = require('like-ar');

var pairs=[['lastName', 'Perez'], ['firstName', 'Diego']];

console.log(LikeAr.toPlainObject(pairs));

var pairs=[{field:'lastName', value:'Perez'}, {field:'firstName', value:'Diego'}];

console.log(LikeAr.toPlainObject(pairs, 'field'));
```

### `LikeAr.createIndex(array:T[], keyName:string): Record<string, T>`

Returns a plain object containing the same element indexed by keyName


```ts
var {LikeAr} = require('like-ar');

var persons=[{name:'Diego', lastName:'Rivera', age:30}, {name:'Frida', lastName:'Kahlo'}];

var idxPersons=LikeAr.createIndex(persons, 'lastName');

idxPersons.Kahlo.age=20;

console.log(persons[1].age); // 20
```
### `LikeAr.createIndex(array:T[], getKey:T => string): Record<string, T>`

Returns a plain object containing the same element indexed by `getKey(item)`


```ts
var {LikeAr} = require('like-ar');

var persons=[{name:'Diego', lastName:'Rivera', age:30}, {name:'Frida', lastName:'Kahlo'}];

var idxPersons=LikeAr.createIndex(persons, (p) => p.name + p.lastName);

idxPersons.FridaKahlo.age=20;

console.log(persons[1].age); // 20
```

### `LikeAr.iterator(arrayOrObject: T[] | Record<K,T>): Iterator<T>`

Returns an Iterator<T> from an `Array<T>` or a `Record<K,T>`.
If the parameter is an array the same array is returned.
Otherwise it returns an iterator to the values of the object.


```ts
var {iterator} = require('like-ar');

function showValues(arrayOrObject: any[] | Record<any, any>){
    for (var value of iterator(arrayOrObject)) {
        console.log(value)
    }
}
```

### `LikeAr<K,T>(object:Record<K,Promise<T>>).awaitAll(): Promise<Record<K,T>>`

It runs all promises in parallel. When all finished it retunrs
an object with the same keys and the resolution of each promise.
If some of the promises fails it will fail immediately.


```ts
var likear = require('like-ar').strict;

var sqls = {
    persons: 'select * from person',
    mascots: 'select * from mascot'
}

var data = await likear(sqls).map(async sql => db.query(sql)).awaitAll();

console.log(data);
```

### `LikeAr.empty(arrayOrObject: T[] | Record<K,T> | null): boolean`

Returns `false` if the arreglo or object has at least one value.
Returns `true` if it is empty (i.e. if the array is `[]` or the object is  `{}` or `null`)


```ts
var {iterator, emtpy} = require('like-ar');

function showValues(arrayOrObject: any[] | Record<any, any> | null){
    if (empty(arrayOrObject)) {
        Console.log('EMPTY!')
    }
    for (var value of iterator(arrayOrObject)) {
        console.log(value)
    }
}
```


## License

[MIT](LICENSE)

