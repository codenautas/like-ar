"use strict";

var expect=require('expect.js')

var json4all=require('json4all')

var LikeAr = require('../like-ar.js');

describe("array",function(){
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
        expect(res).to.eql([
            '7',
            '8',
        ])
        expect(algo).to.eql(['7', 'z', '9'])
    });
    it("creates from array of array", function(){
        var two={alfa:'beta'};
        var pairs=[['one', 1], ['two', two]];
        var obtained=LikeAr.toPlainObject(pairs);
        expect(obtained).to.eql({one:1, two:two});
        expect(obtained.two).to.be(two);
    });
    it("creates from array of pairs with value", function(){
        var two={alfa:'beta'};
        var pairs=[{column:'one', value:1}, {column:'two', value:two}];
        var obtained=LikeAr.toPlainObject(pairs,"column");
        expect(obtained).to.eql({one:1, two:two});
        expect(obtained.two).to.be(two);
    });
    it("creates from array of pairs", function(){
        var two={alfa:'beta'};
        var pairs=[{c:'one', v:1}, {c:'two', v:two}];
        var obtained=LikeAr.toPlainObject(pairs,"c","v");
        expect(obtained).to.eql({one:1, two:two});
        expect(obtained.two).to.be(two);
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


[
    {style:'Optimized',fun:LikeAr},
    {style:'nonOptimized'},
].forEach(function(style){
  describe(style.style, function(){
    var likear=style.fun||LikeAr[style.style];
    describe("object2Array", function(){
        var algo;
        beforeEach(function(){
            algo={a:'7', b:'8', c:'9'};
        })
        it("array", function(){
            var res = likear(algo).array();
            expect(res).to.eql(['7','8','9']);
        });
        it("array like old JS", function(){
            LikeAr.testingLikeOldJs=true;
            var res = likear(algo).array();
            expect(res).to.eql(['7','8','9']);
            LikeAr.testingLikeOldJs=false;
        });
        it("keys", function(){
            var res = likear(algo).keys();
            expect(res).to.eql(['a','b','c']);
        });
        it("forEach", function(){
            var res=[];
            likear(algo).forEach(function(valor, indice, contenedor){
                res.push([valor, indice, contenedor]);
                if(indice=='b'){
                    contenedor[indice]='x';
                }
            });
            expect(res).to.eql([
                ['7', 'a', algo],
                ['8', 'b', algo],
                ['9', 'c', algo],
            ]);
            expect(algo).to.eql({a:'7', b:'x', c:'9'})
        });
        it("map", function(){
            var res = likear(algo).map(function(valor, indice, contenedor){
                if(indice=='b'){
                    contenedor[indice]='y';
                }
                return [valor, indice, contenedor];
            });
            expect(res).to.eql({
                a:['7', 'a', algo],
                b:['8', 'b', algo],
                c:['9', 'c', algo],
            })
            expect(algo).to.eql({a:'7', b:'y', c:'9'})
        });
        it("filter and plain", function(){
            var res = likear(algo).filter(function(valor, indice, contenedor){
                if(indice=='b'){
                    contenedor[indice]='z';
                }
                return indice!='c';
            });
            expect(res).to.eql({
                a:'7',
                b:'8',
            })
            expect(algo).to.eql({a:'7', b:'z', c:'9'})
            var plain = res.plain();
            expect(plain).to.eql({
                a:'7',
                b:'8',
            });
            expect(plain.constructor).to.eql(Object);
        });
        it("join", function(){
            var res = likear(algo).join('<>');
            expect(res).to.eql('7<>8<>9');
            expect(algo).to.eql({a:'7', b:'8', c:'9'});
        });
        it("chaining map filter map", function(){
            var res = likear(algo)
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
            expect(res).to.eql({
                a:'7!?',
                c:'9!?',
            })
            expect(JSON.stringify(res)).to.eql('{"a":"7!?","c":"9!?"}');
            expect(json4all.stringify(res)).to.eql('{"a":"7!?","c":"9!?"}');
            expect(algo).to.eql({a:'7', b:'8', c:'w'});
            expect(res.array()).to.eql(['7!?', '9!?']);
            expect(res.keys()).to.eql(['a', 'c']);
            expect(res.join()).to.eql('7!?,9!?');
        });
        it("map array", function(){
            var result = LikeAr([{a:11}, {a:12}, {a:14}]).map(function(value){ return value.a*10; });
            expect(result).to.eql({0:110, 1:120, 2:140});
        });
        it("build object", function(){
            var result = LikeAr(algo).build(function(value, key){ return {['_'+key]:'"'+value+'"'}; });
            expect(result).to.eql({_a:'"7"', _b:'"8"', _c:'"9"'});
        });
        it("build object from array", function(){
            var result = LikeAr([{a:11}, {b:12}, {c:14}]).build(function(value){ return value; });
            expect(result).to.eql({a:11, b:12, c:14});
        });
    });
  });
});
