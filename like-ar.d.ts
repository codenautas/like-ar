declare module "like-ar"{
    type ObjectWithArrayFunctions<T, K extends keyof any>={
        forEach:   ( callback:(value:T, key:K)=>void   ) => ObjectWithArrayFunctions<T,K>
        map    :<U>( callback:(value:T, key:K)=>U      ) => ObjectWithArrayFunctions<U,K>
        filter :   ( callback:(value:T, key:K)=>boolean) => ObjectWithArrayFunctions<T,K>
        build  :<U,K2 extends keyof {}>(callback:(value:T,key:K)=>{[key in K2]:U}) => ObjectWithArrayFunctions<U,K2>
        keys   :() => K[]
        array  :() => T[]
        plain  :() => {[key in K]:T}
        join   :(separator:string) => string
    }
    function likeAr<T, K extends keyof any>(o:{[key in K]: T}):ObjectWithArrayFunctions<T, K>
    namespace likeAr{
        function toPlainObject<T>(array:[string, T][]):{[key:string]:T}
        function toPlainObject<T, K extends keyof T>(array:T, keyName:K, valueName:K):{[key:string]:T}
        function toPlainObject<T, K extends keyof any>(arrayKeys:K[], arrayValues:T[]):{[key in K]:T}
    }
    export = likeAr
}
