declare module "like-ar"{
    type ObjectWithArrayFunctions<T, K extends keyof any>={
        forEach:   ( callback:(value:T, key:K, original:{[key in K]:T}, pos:number)=>void   ) => ObjectWithArrayFunctions<T,K>
        map    :<U>( callback:(value:T, key:K, original:{[key in K]:T}, pos:number)=>U      ) => ObjectWithArrayFunctions<U,K>
        filter :   ( callback:(value:T, key:K, original:{[key in K]:T}, pos:number)=>boolean) => ObjectWithArrayFunctions<T,K>
        build  :<U,K2 extends keyof {}>(callback:(value:T,key:K,original:{[key in K]:T},pos:number)=>{[key in K2]:U}) => ObjectWithArrayFunctions<U,K2>
        keys   :() => K[]
        array  :() => T[]
        plain  :() => {[key in K]:T}
        join   :(separator:string) => string
        keyCount:()=>number        
    }
    function likeAr<T, K extends keyof any>(o:{[key in K]: T}):ObjectWithArrayFunctions<T, K>
    namespace likeAr{
        function toPlainObject<T>(array:[string, T][]):{[key:string]:T}
        function toPlainObject<T, K extends keyof T>(array:T, keyName:K, valueName:K):{[key:string]:T[K]}
        function toPlainObject<T, K extends keyof any>(arrayKeys:K[], arrayValues:T[]):{[key in K]:T}
        function createIndex<T, K extends keyof T>(array:T[], keyName:K):{[key:string]:T}
    }
    export = likeAr
}
