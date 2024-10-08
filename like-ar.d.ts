export as namespace likeAr;
export = likeAr

declare function likeAr<T>(o:T):T extends (infer U)[] ? likeAr.ObjectWithArrayFunctions<{[key in number]:U}> : likeAr.ObjectWithArrayFunctions<T>

declare namespace likeAr{
    export type Mapper<T, U> = U extends {[K in keyof T]: infer W} ? 
        ( callback:(value:T[keyof T], key?:keyof T, original?:{[K in keyof T]:T[K]}, pos?:number)=>U) => ObjectWithArrayFunctions<U>
    : never;
    export type ObjectWithArrayFunctions<T>={
        forEach:   ( callback:(value:T[keyof T], key:keyof T, original:{[K in keyof T]:T[K]}, pos:number)=>void   ) => ObjectWithArrayFunctions<T>
        map    :<U>( callback:(value:T[keyof T], key:keyof T, original:{[K in keyof T]:T[K]}, pos:number)=>U) => ObjectWithArrayFunctions<{[K in keyof T]:U}>
        filter :   ( callback:(value:T[keyof T], key:keyof T, original:{[K in keyof T]:T[K]}, pos:number)=>boolean) => ObjectWithArrayFunctions<T>
        find   :   ( callback:(value:T[keyof T], key:keyof T, original:{[K in keyof T]:T[K]}, pos:number)=>boolean) => T[keyof T]|undefined
        findKey:   ( callback:(value:T[keyof T], key:keyof T, original:{[K in keyof T]:T[K]}, pos:number)=>boolean) => keyof T|undefined
        build  :<U>( callback:(value:T[keyof T], key:keyof T, original:{[K in keyof T]:T[K]}, pos:number)=>{[K2 in keyof U]:U[K2]}) => ObjectWithArrayFunctions<{[K2 in keyof U]:U[K2]}>
        keys   :() => (keyof T)[]
        array  :() => T[keyof T][]
        plain  :() => T
        join   :(separator?:string) => string
        keyCount:()=>number
        awaitAll:() => Promise<{[K in keyof T]:Awaited<T[K]>}>
    }
    export function toPlainObject<T>(array:[string, T][]):{[key:string]:T}
    export function toPlainObject<T, K extends keyof T>(array:T[], keyName:K, valueName?:K):{[key:string]:T[K]}
    export function toPlainObject<T, K extends string, FutureKeys extends string>(array:({[key in K]:FutureKeys}&{value:T})[], keyName:K):{[key3 in FutureKeys]:T}
    export function toPlainObject<T, K extends string, KV extends string|number>(array:({[key in K]:string}&{[key2 in KV]:T})[], keyName:K, valueName:KV):{[key3:string]:T}
    export function toPlainObject<T, K extends keyof any>(arrayKeys:K[], arrayValues:T[]):{[key in K]:T}
    export function createIndex<T, K extends keyof T>(array:T[], keyName:K|K[]|((i:T)=>string)):{[key:string]:T}
    export var testingLikeOldJs:boolean
    export const Optimized:typeof likeAr
    export const nonOptimized:typeof likeAr
    export function strict<T>(o:T):likeAr.ObjectWithArrayFunctions<T>
    export function beingArray<T>(o:T[]):likeAr.ObjectWithArrayFunctions<{[key in number]:T}>
    export function iterator<T>(o:T[]):T[]
    export function iterator<T>(o:Record<any,T>):T[]    
    export function empty(o:null|undefined|{}):true
    export function empty(o:any[]|Record<any,any>):boolean
    export const LikeAr:typeof strict & typeof likeAr
}

