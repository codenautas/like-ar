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

likeAr.testingLikeOldJs=false;

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

function LikeArStrict(o){
    Object.defineProperty(this, '_object', { value: o})
}

likeAr.strict=function likeAr(o){
    return new LikeArStrict(o);
}
likeAr.LikeAr=likeAr.strict;
likeAr.beingArray = likeAr.strict;

likeAr.nonOptimized = function object2Array(o){
    return new ObjectWithArrayMethodsNonOptimized(o);
};

ObjectWithArrayMethodsOptimized.prototype.keys = function keys(){
    return Object.keys(this._object);
};

LikeArStrict.prototype.keys=ObjectWithArrayMethodsOptimized.prototype.keys;

ObjectWithArrayMethodsOptimized.prototype.array = function array(){
    var oThis=this._object;
    if(typeof Object.values === 'function' && !likeAr.testingLikeOldJs){
        return Object.values(oThis);
    }
    var arr = [];
    for(var attr in oThis){ if(oThis.hasOwnProperty(attr)){
        arr.push(oThis[attr]);
    }}
    return arr;
};
LikeArStrict.prototype.array=ObjectWithArrayMethodsOptimized.prototype.array;

/** @param {string|null|undefined} separator */
ObjectWithArrayMethodsOptimized.prototype.join = function join(separator){
    return this.array().join(separator);
};
LikeArStrict.prototype.join=ObjectWithArrayMethodsOptimized.prototype.join;

/*
function ArrayAndKeys2Object(result, keys){ 
    var adapted = {};
    keys.forEach(function(arrayKey, arrayIndex){
        adapted[arrayKey]=result[arrayIndex];
    });
    return adapted;
} 
*/

ObjectWithArrayMethodsOptimized.prototype.plain = function plain(){
    var o = {};
    likeAr(this).forEach(function(value, key){
        o[key]=value;
    });
    return o;
}
LikeArStrict.prototype.plain = function plain(){
    return this._object;
}

ObjectWithArrayMethodsOptimized.prototype.build = function build(f, fThis){
    var oThis=this._object;
    var acumulator = likeAr();
    var i=0;
    for(var attr in oThis){ if(oThis.hasOwnProperty(attr)){
        var result = f.call(fThis, oThis[attr], attr, oThis, i++);
        // eslint-disable-next-line guard-for-in
        for(var attrResult in result){
            acumulator[attrResult]=result[attrResult];
        }
    }}
    return acumulator;
};
LikeArStrict.prototype.buildPlain = function buildPlain(f, fThis){
    var oThis=this._object;
    var acumulator = {};
    var i=0;
    for(var attr in oThis){ if(oThis.hasOwnProperty(attr)){
        var result = f.call(fThis, oThis[attr], attr, oThis, i++);
        // eslint-disable-next-line guard-for-in
        for(var attrResult in result){
            acumulator[attrResult]=result[attrResult];
        }
    }}
    return acumulator;
};
LikeArStrict.prototype.build = function build(f, fThis){
    return likeAr.strict(this.buildPlain(f, fThis));
};

ObjectWithArrayMethodsOptimized.prototype.keyCount = function keyCount(){
    var oThis=this._object;
    var i=0;
    for(var attr in oThis){ if(oThis.hasOwnProperty(attr)){
        i++;
    }}
    return i;
};
LikeArStrict.prototype.keyCount = ObjectWithArrayMethodsOptimized.prototype.keyCount;

function Argument3Adapt(__,___,x){ return x; }

[
    {name:'forEach'},
    {name:'map'     , resultAdapt: Argument3Adapt, stepAdapt:function(x, v, n, a){ a[n]=x;        }},
    {name:'filter'  , resultAdapt: Argument3Adapt, stepAdapt:function(x, v, n, a){ if(x){a[n]=v;} }},
    {name:'join'    , useOptimized: true },
    {name:'array'   , useOptimized: true },
    {name:'keys'    , useOptimized: true },
    {name:'plain'   , useOptimized: true },
    {name:'build'   , useOptimized: true },
    {name:'keyCount', useOptimized: true },
].forEach(function(method){
    ObjectWithArrayMethodsNonOptimized.prototype[method.name] = method.useOptimized ?
    ObjectWithArrayMethodsOptimized.prototype[method.name] :
    function (f, fThis){
        var oThis=this._object;
        var keys=Object.keys(oThis);
        var acumulator=likeAr.nonOptimized();
        var result=keys[method.name](function(arrayKey, arrayIndex){
            var arrayValue=oThis[arrayKey];
            return (method.stepAdapt||id)(f.call(fThis, arrayValue, arrayKey, oThis, arrayIndex), arrayValue, arrayKey, acumulator);
        }, fThis);
        return (method.resultAdapt||id)(result, keys, acumulator);
    };
});

ObjectWithArrayMethodsOptimized.prototype.forEach = function forEach(f, fThis){
    var oThis=this._object;
    var i=0;
    for(var attr in oThis){ if(oThis.hasOwnProperty(attr)){
        f.call(fThis, oThis[attr], attr, oThis, i++);
    }}
};
LikeArStrict.prototype.forEach = ObjectWithArrayMethodsOptimized.prototype.forEach;

ObjectWithArrayMethodsOptimized.prototype.map = function map(f, fThis){
    var oThis=this._object;
    var acumulator = likeAr();
    var i=0;
    for(var attr in oThis){ if(oThis.hasOwnProperty(attr)){
        acumulator[attr] = f.call(fThis, oThis[attr], attr, oThis, i++);
    }}
    return acumulator;
};
LikeArStrict.prototype.map = function map(f, fThis){
    var oThis=this._object;
    var acumulator = {};
    var i=0;
    for(var attr in oThis){ if(oThis.hasOwnProperty(attr)){
        acumulator[attr] = f.call(fThis, oThis[attr], attr, oThis, i++);
    }}
    return likeAr.strict(acumulator);
};

ObjectWithArrayMethodsOptimized.prototype.filter = function filter(f, fThis){
    var oThis=this._object;
    var acumulator = likeAr();
    var i=0;
    for(var attr in oThis){ if(oThis.hasOwnProperty(attr)){
        var value = oThis[attr];
        if(f.call(fThis, value, attr, oThis, i++)){
            acumulator[attr] = value;
        }
    }}
    return acumulator;
};
LikeArStrict.prototype.filter = function filter(f, fThis){
    var oThis=this._object;
    var acumulator = {};
    var i=0;
    for(var attr in oThis){ if(oThis.hasOwnProperty(attr)){
        var value = oThis[attr];
        if(f.call(fThis, value, attr, oThis, i++)){
            acumulator[attr] = value;
        }
    }}
    return likeAr.strict(acumulator);
};
LikeArStrict.prototype.find = function find(f, fThis){
    var oThis=this._object;
    var i=0;
    for(var attr in oThis){ if(oThis.hasOwnProperty(attr)){
        var value = oThis[attr];
        if(f.call(fThis, value, attr, oThis, i++)){
            return oThis[attr];
        }
    }}
    return undefined;
};
LikeArStrict.prototype.findKey = function findKey(f, fThis){
    var oThis=this._object;
    var i=0;
    for(var attr in oThis){ if(oThis.hasOwnProperty(attr)){
        var value = oThis[attr];
        if(f.call(fThis, value, attr, oThis, i++)){
            return attr;
        }
    }}
    return undefined;
};

likeAr.toPlainObject = function toPlainObject(pairsOrArrayOfKeys, keyNameOrArrayOfValues, valueName){
    var o={};
    if(keyNameOrArrayOfValues && keyNameOrArrayOfValues instanceof Array){
        if(keyNameOrArrayOfValues.length!=pairsOrArrayOfKeys.length){
            throw new Error('ERROR like-ar.toPlainObject arrays of different length');
        }
        keyNameOrArrayOfValues.forEach(function(value, i){
            o[pairsOrArrayOfKeys[i]]=value;
        });
    }else{
        var keyName=keyNameOrArrayOfValues;
        var pairs=pairsOrArrayOfKeys;
        if(keyName==null){
            keyName=0;
            valueName=valueName||1;
        }else if(valueName==null){
            valueName='value';
        }
        pairs.forEach(function(pair, i){
            o[pair[keyName]]=pair[valueName];
        });
    }
    return o;
};
likeAr.strict.toPlainObject = likeAr.toPlainObject;

/** @type {<T, K extends keyof T>(array:T[], keyName:K|K[])=>{[key:string]:T}} */
likeAr.createIndex = function createIndex(array, keyname){
    /** @type {{[key:string]:any}} */
    var o={};
    if (keyname instanceof Array) {
        var pairs=array;
        pairs.forEach(function(pair, i){
            var key = []
            for (var keyName of keyname) {
                key.push(pair[keyName])
            }
            o[JSON.stringify(key)] = pair;
        });
    } else {
        var pairs=array;
        pairs.forEach(function(pair, i){
            // @ts-expect-error pair[keyname] may be not a string, number or Symbol
            o[pair[keyname]]=pair;
        });
    }
    return o;
};
likeAr.strict.createIndex = likeAr.createIndex;

return likeAr;

});