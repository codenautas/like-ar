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
        it("values", function(){
            var res = likear(algo).values();
            expect(res).to.eql(['7','8','9']);
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
        it("filter", function(){
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
            }).filter(function(valor, indice, contenedor){
                return valor!='8!';
            }).map(function(valor, indice, contenedor){
                return valor+'?';
            });
            expect(res).to.eql({
                a:'7!?',
                c:'9!?',
            })
            expect(JSON.stringify(res)).to.eql('{"a":"7!?","c":"9!?"}');
            expect(json4all.stringify(res)).to.eql('{"a":"7!?","c":"9!?"}');
            expect(algo).to.eql({a:'7', b:'8', c:'w'});
            expect(res.values()).to.eql(['7!?', '9!?']);
            expect(res.keys()).to.eql(['a', 'c']);
            expect(res.join()).to.eql('7!?,9!?');
        });
    });
  });
});
