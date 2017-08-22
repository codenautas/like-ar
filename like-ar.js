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

function AdaptWithArrayMethods(objectData, objectBase){
    Object.defineProperty(objectData, '_object', { value: objectBase||objectData});
}

var ObjectWithArrayMethodsNonOptimized = function anonymous(o){
    AdaptWithArrayMethods(this, o);
};

var ObjectWithArrayMethodsOptimized = function anonymous(o){
    AdaptWithArrayMethods(this, o);
};

function id(x){ return x; }

likeAr = function object2Array(o){
    return new ObjectWithArrayMethodsOptimized(o);
};

likeAr.nonOptimized = function object2Array(o){
    return new ObjectWithArrayMethodsNonOptimized(o);
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
    for(var attr in oThis){ if(oThis.hasOwnProperty(attr)){
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
    for(var attr in oThis){ if(oThis.hasOwnProperty(attr)){
        f.call(fThis, oThis[attr], attr, oThis);
    }}
};

ObjectWithArrayMethodsOptimized.prototype.map = function map(f, fThis){
    var oThis=this._object;
    var acumulator = likeAr();
    for(var attr in oThis){ if(oThis.hasOwnProperty(attr)){
        acumulator[attr] = f.call(fThis, oThis[attr], attr, oThis);
    }}
    return acumulator;
};

ObjectWithArrayMethodsOptimized.prototype.filter = function filter(f, fThis){
    var oThis=this._object;
    var acumulator = likeAr();
    for(var attr in oThis){ if(oThis.hasOwnProperty(attr)){
        var value = oThis[attr];
        if(f.call(fThis, value, attr, oThis)){
            acumulator[attr] = value;
        }
    }}
    return acumulator;
};

return likeAr;

});