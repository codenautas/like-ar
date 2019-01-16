declare module "like-ar"{
    type ObjectWithArrayFunctions<T>={
        forEach:( callback:(value:T  , key:string)=>void   ) => ObjectWithArrayFunctions<T>
        map    :<U>( callback:(value:T, key:string)=>U     ) => ObjectWithArrayFunctions<U>
        filter :( callback:(value:T  , key:string)=>boolean) => ObjectWithArrayFunctions<T>
        keys   :() => string[]
        array  :() => T[]
        plain  :() => {[key:string]:T}
        join   :(separator:string) => string
    }
    function likeAr<T>(o:{[key:string]:T}):ObjectWithArrayFunctions<T>
    namespace likeAr{
        function toPlainObject<T>(array:[string, T][]):{[key:string]:T}
        function toPlainObject<T, K extends keyof T>(array:T, keyName:K, valueName:K):{[key:string]:T}
        function toPlainObject<T>(arrayKeys:[string], arrayValues:[T]):{[key:string]:T}
    }
    export = likeAr
}
