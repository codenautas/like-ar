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
    namespace likeAr{}
    export = likeAr
}
