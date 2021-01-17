"use strict";

// @ts-ignore
var expect=require('expect.js')
var discrepances = require('discrepances');

// @ts-ignore
var json4all=require('json4all')

var LikeAr = require('../like-ar.js').strict;

describe("strict array",function(){
    /** @type {string[]} */ 
    var algo;
    beforeEach(function(){
        algo=['7', '8', '9']
    })
    it("filter with modifies", function(){
        var res = algo.filter(function(valor, indice, contenedor){
            if(indice==1){
                contenedor[indice]='z';
            }
            return valor!='9';
        });
        discrepances.showAndThrow(res,[
            '7',
            '8',
        ]);
        discrepances.showAndThrow(algo,['7', 'z', '9']);
    });
    it("creates from array of array", function(){
        var two={alfa:'beta'};
        /** @type {[string, number|typeof two][]} */
        var pairs=[['one', 1], ['two', two]];
        /** @type {{[key:string]:number|typeof two}} */
        var obtained=LikeAr.toPlainObject(pairs);
        expect(obtained).to.eql({one:1, two:two});
        expect(obtained.two).to.be(two);
    });
    it("creates from array of pairs with value", function(){
        var one=new Date("2019-11-16");
        var two={alfa:'beta'};
        //** TODO quitar el elemento three para que deduzca sin 'three' */
        /** @type {{column:string, value:string|Date|typeof two}[]} */
        var pairs=[{column:'one', value:one}, {column:'two', value:two}, {column:'three', value:'three'}];
        /** @type {{[key:string]:string|Date|typeof two}} */
        var obtained=LikeAr.toPlainObject(pairs,"column");
        expect(obtained).to.eql({one:one, two:two, three:'three'});
        expect(obtained.two).to.be(two);
    });
    it("creates from array of pairs with value2", function(){
        var one=new Date("2019-11-16");
        var two={alfa:'beta'};
        //** TODO quitar el elemento three para que deduzca sin 'three' */
        /** @type {{column:string, value2:string|Date|typeof two}[]} */
        var pairs=[{column:'one', value2:one}, {column:'two', value2:two}, {column:'three', value2:'three'}];
        /** @type {{[key:string]:string|Date|typeof two}} */
        var obtained=LikeAr.toPlainObject(pairs,"column","value2");
        expect(obtained).to.eql({one:one, two:two, three:'three'});
        expect(obtained.two).to.be(two);
    });
    it("creates an index object from array", function(){
        var two={alfa:'beta'};
        var pairs=[{column:'one', value:1}, {column:'two', value:two}];
        var obtained=LikeAr.createIndex(pairs,"column");
        expect(obtained).to.eql({one:{column:'one', value:1}, two:{column:'two', value:two}});
        expect(obtained.two).to.eql(pairs[1]);
    });
    it("creates from array of pairs", function(){
        var two={alfa:'beta'};
        var pairs=[{c:'one', v:1}, {c:'two', v:two}];
        var obtained=LikeAr.toPlainObject(pairs,"c","v");
        expect(obtained).to.eql({one:1, two:two});
        expect(obtained.two).to.eql(two);
    })
    it("creates from pair of arrays", function(){
        var two={alfa:'beta'};
        var keys=['one', 'two', 'three'];
        var values=[1, two, 33]
        var obtained=LikeAr.toPlainObject(keys, values);
        expect(obtained).to.eql({one:1, two:two, three:33});
        expect(obtained.two).to.be(two);
    })
    it("error creating from pair of arrays", function(){
        expect(function(){
            var keys=['one', 'two'];
            var values=[1, 2, 33];
            LikeAr.toPlainObject(keys, values);
        }).to.throwError(/different length/)
    })
});

describe("strict object", function(){
    var likear=LikeAr;
    describe("object2Array", function(){
        /** @type {{[key in 'a'|'b'|'c']:string}} */
        var algo;
        beforeEach(function(){
            algo={a:'7', b:'8', c:'9'};
        })
        it("array", function(){
            /** @type {string[]} */
            var res = likear(algo).array();
            discrepances.showAndThrow(res,['7','8','9']);
        });
        it("array like old JS", function(){
            LikeAr.testingLikeOldJs=true;
            /** @type {string[]} */
            var res = likear(algo).array();
            discrepances.showAndThrow(res,['7','8','9']);
            LikeAr.testingLikeOldJs=false;
        });
        it("keys", function(){
            /** @type {('a'|'b'|'c')[]} */
            var res = likear(algo).keys();
            expect(res).to.eql(['a','b','c']);
        });
        it("forEach", function(){
            /** @type {[string,'a'|'b'|'c',typeof algo, number][]} */
            var res=[];
            /** @type {(valor:string, indice:'a'|'b'|'c', contenedor:typeof algo, posicion:number)=>void} */
            var callback=function(valor, indice, contenedor, posicion){
                expect(contenedor==algo).to.be.ok("contenedor==algo");
                res.push([valor, indice, contenedor, posicion]);
                if(indice=='b'){
                    contenedor[indice]='x';
                }
            }
            likear(algo).forEach(callback);
            expect(res).to.eql([
                ['7', 'a', algo, 0],
                ['8', 'b', algo, 1],
                ['9', 'c', algo, 2],
            ]);
            expect(algo).to.eql({a:'7', b:'x', c:'9'})
        });
        it("map", function(){
            /** @typedef {'a'|'b'|'c'} AorBorC */
            /** @type {(valor:string, indice:AorBorC, contenedor:typeof algo, posicion:number)=>[string,AorBorC,typeof algo, number]} */
            var callback=function(valor, indice, contenedor, posicion){
                expect(contenedor==algo).to.be.ok("contenedor==algo");
                if(indice=='b'){
                    contenedor[indice]='y';
                }
                return [valor, indice, contenedor, posicion];
            }                
            /** @type {LikeAr.ObjectWithArrayFunctions<{[key in AorBorC]:[string,AorBorC,typeof algo, number]}>} */
            /**TODO poder cambiar a: @type {LikeAr.ObjectWithArrayFunctions<{[key in AorBorC]:[string,key,typeof algo, number]}>} */
            var prevRes = likear(algo).map(callback);
            expect(prevRes).to.eql({});
            var res = prevRes.plain();
            expect(res).to.eql({
                a:['7', 'a', algo, 0],
                b:['8', 'b', algo, 1],
                c:['9', 'c', algo, 2],
            })
            expect(algo).to.eql({a:'7', b:'y', c:'9'})
        });
        it("map of mixed-types", function(){
            var theDay=new Date("2019-11-19");
            /** @typedef {'a'|'b'|'c'} AorBorC */
            /** @typedef {{data:number}|{number:number,text:string}|Date} Combo */
            /** @type {{[key in AorBorC]:Combo}} */
            var otro={
                a:{data:7},
                b:{number:5, text:'text'},
                c:theDay
            }
            /**TODO: tratar @type {((valor:{data:number}, indice:'a', contenedor:typeof otro, posicion:number)=>[{data:number},'a',typeof algo, number]) | ((valor:{number:number, text:string}, indice:'b', contenedor:typeof otro, posicion:number)=>[{number:number, text:string},'b',typeof algo, number]) | ((valor:Date, indice:'c', contenedor:typeof otro, posicion:number)=>[Date,'c',typeof algo, number])}  */
            /** @type {(valor:Combo, indice:AorBorC, contenedor:typeof otro, posicion:number)=>[[Combo],AorBorC,typeof otro, number]}  */
            var callback=function(valor, indice, contenedor, posicion){
                return [[valor], indice, contenedor, posicion];
            }                
            /** @type {LikeAr.ObjectWithArrayFunctions<{[key in AorBorC]:[[Combo],AorBorC,typeof otro, number]}>} */
            var prevRes = likear(otro).map(callback);
            expect(prevRes).to.eql({});
            var res = prevRes.plain();
            expect(res).to.eql({
                a:[[{data:7}]               , 'a', otro, 0],
                b:[[{number:5, text:'text'}], 'b', otro, 1],
                c:[[theDay]                 , 'c', otro, 2],
            })
            expect(algo).to.eql({a:'7', b:'8', c:'9'})
        });
        it("filter and plain", function(){
            /** @type {'a'|'b'|'c'|null} */
            var porPosicion=null;
            /** @type {(_valor:string, indice:'a'|'b'|'c', contenedor:typeof algo, posicion:number)=>boolean} */
            var callback=function(_valor, indice, contenedor, posicion){
                if(indice=='b'){
                    contenedor[indice]='z';
                }
                if(posicion==1){
                    porPosicion=indice;
                }
                return indice!='c';
            }
            /** @type {likeAr.ObjectWithArrayFunctions<{[key in 'a'|'b'|'c']:string}>} */
            var res = likear(algo).filter(callback);
            expect(res).to.eql({})
            expect(algo).to.eql({a:'7', b:'z', c:'9'})
            expect(porPosicion).to.eql('b');
            /** @type {{[key in 'a'|'b'|'c']:string}} */
            var plain = res.plain();
            expect(plain).to.eql({
                a:'7',
                b:'8',
            });
            expect(plain.constructor).to.eql(Object);
        });
        it("join", function(){
            /** @type {string} */
            var res = likear(algo).join('<>');
            expect(res).to.eql('7<>8<>9');
            expect(algo).to.eql({a:'7', b:'8', c:'9'});
        });
        it("keyCount", function(){
            /** @type {number} */
            var res = likear(algo).keyCount();
            expect(res).to.eql(3);
        });
        it("chaining map filter map", function(){
            /** @type {likeAr.ObjectWithArrayFunctions<typeof algo>} */
            var prevRes = likear(algo)
            .map(function(valor, indice, contenedor){
                if(indice=='c'){
                    contenedor[indice]='w';
                }
                return valor+'!';
            }).filter(function(valor, _indice, _contenedor){
                return valor!='8!';
            }).map(function(valor, _indice, _contenedor){
                return valor+'?';
            });
            expect(prevRes).to.eql({});
            var res = prevRes.plain();
            expect(res).to.eql({
                a:'7!?',
                c:'9!?',
            })
            expect(JSON.stringify(res)).to.eql('{"a":"7!?","c":"9!?"}');
            expect(json4all.stringify(res)).to.eql('{"a":"7!?","c":"9!?"}');
            expect(algo).to.eql({a:'7', b:'8', c:'w'});
            expect(prevRes.array()).to.eql(['7!?', '9!?']);
            expect(prevRes.keys()).to.eql(['a', 'c']);
            expect(prevRes.join()).to.eql('7!?,9!?');
        });
        it("map array into object", function(){
            /** @type {likeAr.ObjectWithArrayFunctions<{[key in number]:{a:number}}>} */
            var _testType = LikeAr([{a:11}, {a:12}, {a:14}]);
            /** @type {likeAr.ObjectWithArrayFunctions<{[key in number]:number}>} */
            var result = LikeAr([{a:11}, {a:12}, {a:14}]).map(function(value){ return value.a*10; }).plain();
            // @ts-ignores Solo estoy comprobando tipos de like-ar
            discrepances.showAndThrow(result, {0:110, 1:120, 2:140});
        });
        it("map array get pure array", function(){
            /** @type {number[]} */
            var result = LikeAr([{a:11}, {a:12}, {a:14}]).map(function(value){ return value.a*10; }).array();
            discrepances.showAndThrow(result, [110, 120, 140]);
        });
        it("map array get pure array like OldJs", function(){
            LikeAr.testingLikeOldJs=true;
            /** @type {number[]} */
            var result = LikeAr([{a:11}, {a:12}, {a:14}]).map(function(value){ return value.a*10; }).array();
            discrepances.showAndThrow(result, [110, 120, 140]);
            LikeAr.testingLikeOldJs=false;
        });
        it("build object", function(){
            /** @type {likeAr.ObjectWithArrayFunctions<{[key:string]:string}>} */
            var result = LikeAr(algo).build(function(value, key){ return {['_'+key]:'"'+value+'"'}; }).plain();
            expect(result).to.eql({_a:'"7"', _b:'"8"', _c:'"9"'});
        });
        it("chained build object", function(){
            /** @type {likeAr.ObjectWithArrayFunctions<{[key:string]:string}>} */
            var result = LikeAr(algo).filter(
                /** @type {(value:string|number)=>boolean} */
                function(value){ 
                    return value != 7 
                }
            ).build(
                /** @type {(value:string|number, key:string)=>{[key:string]:string}} */
                function(value, key){ 
                    return {['_'+key]:'"'+value+'"'}; 
                }
            ).plain();
            expect(result).to.eql({_b:'"8"', _c:'"9"'});
        });
        it("build object from array", function(){
            /** @type {{a?:number, b?:number, c?:number}[]} */
            var array=[{a:11}, {b:12}, {c:14}];
            /** @type {<T extends {}>(value:T)=>T} */
            var callback=function(value){ return value; }
            /** @type {likeAr.ObjectWithArrayFunctions<{a?:number, b?:number, c?:number}>} */
            var result = LikeAr(array).build(callback).plain();
            expect(result).to.eql({a:11, b:12, c:14});
        });
        it("find and found", function(){
            var x1=1;
            var x3=11;
            var algo = {
                x1:{get a(){ x1++; return 'no'}},
                x2:{a:'yes'},
                x3:{get a(){ x3++; return 'no'}},
            };
            var res = likear(algo).find(function(value, key, object){
                expect(object==algo).to.be.ok();
                return value.a=='yes';
            })
            expect(res==algo.x2).to.be.ok();
            expect(x1).to.eql(2);
            expect(x3).to.eql(11);
        })
        it("find and not found", function(){
            var algo = {
                x1:{a:'no' },
                x2:{a:'yes'},
                x3:{a:'no'}
            };
            var res = likear(algo).find(function(value, key, object){
                expect(object==algo).to.be.ok();
                return value.a=='may be'
            })
            expect(res==null).to.be.ok();
        })
    });
});
