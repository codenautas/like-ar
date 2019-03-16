"use strict";

(function codenautasModuleDefinition(root, name, factory) {
    /* global define */
    /* istanbul ignore next */
    if(typeof root.globalModuleName !== 'string'){
        root.globalModuleName = name;
    }
    /* istanbul ignore next */
    if(typeof exports === 'object' && typeof module === 'object'){
        module.exports = factory();
    }else if(typeof define === 'function' && define.amd){
        define(factory);
    }else if(typeof exports === 'object'){
        exports[root.globalModuleName] = factory();
    }else{
        root[root.globalModuleName] = factory();
    }
    root.globalModuleName = null;
})(/*jshint -W040 */this, 'likeAr', function() {
/*jshint +W040 */

/*jshint -W004 */
var likeAr = {};
/*jshint +W004 */

function AdaptWithArrayMethods(objectData, objectBase, opts){
    Object.defineProperty(objectData, '_object', { value: objectBase||objectData});
    Object.defineProperty(objectData, '_opts', { value: opts||likeAr.defaultOpts});
}

var ObjectWithArrayMethodsNonOptimized = function anonymous(o,  opts){
    AdaptWithArrayMethods(this, o, opts);
};

var ObjectWithArrayMethodsOptimized = function anonymous(o, opts){
    AdaptWithArrayMethods(this, o, opts);
};

function id(x){ return x; }

likeAr = function likeAr(o, opts){
    return new ObjectWithArrayMethodsOptimized(o, opts);
};

likeAr.defaultOpts={
    all:false
}

likeAr.nonOptimized = function likeAr(o, opts){
    return new ObjectWithArrayMethodsNonOptimized(o, opts);
};

ObjectWithArrayMethodsOptimized.prototype.keys = function keys(){
    return Object.keys(this._object);
};

ObjectWithArrayMethodsOptimized.prototype.array = function array(){
    var oThis=this._object;
    if(typeof Object.values === 'function'){
        return Object.values(oThis);
    }
    var arr = [];
    for(var attr in oThis){ if(this._opts.all || oThis.hasOwnProperty(attr)){
        arr.push(oThis[attr]);
    }}
    return arr;
};

ObjectWithArrayMethodsOptimized.prototype.join = function join(separator){
    return this.array().join(separator);
};

function ArrayAndKeys2Object(result, keys){ 
    var adapted = {};
    keys.forEach(function(arrayKey, arrayIndex){
        adapted[arrayKey]=result[arrayIndex];
    });
    return adapted;
} 

ObjectWithArrayMethodsOptimized.prototype.plain = function plain(){
    var o = {};
    likeAr(this).forEach(function(value, key){
        o[key]=value;
    });
    return o;
}

function Argument3Adapt(__,___,x){ return x; }

[
    {name:'forEach'},
    {name:'map'     , resultAdapt: Argument3Adapt, stepAdapt:function(x, v, n, a){ a[n]=x;        }},
    {name:'filter'  , resultAdapt: Argument3Adapt, stepAdapt:function(x, v, n, a){ if(x){a[n]=v;} }},
    {name:'join'    , useOptimized: true },
    {name:'array'   , useOptimized: true },
    {name:'keys'    , useOptimized: true },
    {name:'plain'   , useOptimized: true },
].forEach(function(method){
    ObjectWithArrayMethodsNonOptimized.prototype[method.name] = method.useOptimized ?
    ObjectWithArrayMethodsOptimized.prototype[method.name] :
    function (f, fThis){
        var oThis=this._object;
        var keys=Object.keys(oThis);
        var acumulator=likeAr.nonOptimized();
        var result=keys[method.name](function(arrayKey, arrayIndex){
            var arrayValue=oThis[arrayKey];
            return (method.stepAdapt||id)(
                typeof f === "function" ? f.call(fThis, arrayValue, arrayKey, oThis) : f, 
                arrayValue, arrayKey, acumulator
            );
        }, fThis);
        return (method.resultAdapt||id)(result, keys, acumulator);
    };
});

ObjectWithArrayMethodsOptimized.prototype.forEach = function forEach(f, fThis){
    var oThis=this._object;
    for(var attr in oThis){ if(this._opts.all || oThis.hasOwnProperty(attr)){
        f.call(fThis, oThis[attr], attr, oThis);
    }}
};

const util = require('util');

ObjectWithArrayMethodsOptimized.prototype.map = function map(f, fThis){
    var oThis=this._object;
    console.log('xxxx')
    util.inspect(this,true,2);
    var acumulator = likeAr();
    for(var attr in oThis){ 
        if(this._opts.all || oThis.hasOwnProperty(attr)){
            acumulator[attr] = f.call(fThis, oThis[attr], attr, oThis);
        }
    }
    return acumulator;
};

ObjectWithArrayMethodsOptimized.prototype.filter = function filter(f, fThis){
    var oThis=this._object;
    var acumulator = likeAr();
    for(var attr in oThis){ if(this._opts.all || oThis.hasOwnProperty(attr)){
        var value = oThis[attr];
        if(f.call(fThis, value, attr, oThis)){
            acumulator[attr] = value;
        }
    }}
    return acumulator;
};

likeAr.toPlainObject = function toPlainObject(pairs, keyName, valueName){
    var o={};
    pairs.forEach(function(pair, i){
        if(keyName==null){
            keyName=0;
            valueName=valueName||1;
        }else if(valueName==null){
            valueName='value';
        }
        o[pair[keyName]]=pair[valueName];
    });
    return o;
};

return likeAr;

});