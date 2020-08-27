function isObject( data ){
    return (typeof data === "object" && data !== null && data.constructor && data.constructor === Object)
}
// 对象合并;
function assign(){
    var target = arguments[0];
    for(var i = 1 ; i < arguments.length ; i ++){
        // console.log(arguments[i]);
        for(var attr in arguments[i]){
            target[attr] = arguments[i][attr];
        }
    }
    return target;
}
function removeCookie( name , options ){
    cookie( name ,"" ,  isObject( options ) ? assign( options , { expires : -1 }) : { path : options, expires : -1  })
}
// 合并 : 找不同 
// 1. 参数的不同 : setCookie 有三个参数; getCookie 至多只有一个参数;
function cookie( name , value , options  ){
    // 此时参数大于一个，value 是一个字符串。 那么我们认为此时我们在设置cookie;
    if( arguments.length > 1 && typeof value === "string"){
        if(!isObject( options )){
            options = {};
        }
        if( typeof options.expires === "number"){
            var d = new Date();
            d.setDate( d.getDate() + options.expires );
        }
        return (document.cookie = [
                name + "=" + value,
                typeof options.expires === "number" ? ";expires=" + d : "",
                typeof options.domain === "string" ? ";domain=" + options.domain : "",
                typeof options.path === "string" ? ";path=" + options.path : "",
        ].join(""));
    }
    //获取cookie
    var cookie_string = document.cookie;
    var cookie_array  = cookie_string.split("; ");
    for(var i = 0 ; i < cookie_array.length ; i ++){
        if( cookie_array[i].split("=")[0] === name ){
            return cookie_array[i].split("=")[1]
        }
    }
    return "";
}
