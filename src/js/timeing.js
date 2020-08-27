// 秒杀功能
var time = new Date();
time.setHours( time.getHours() + 3 );
function countDown(){
    var reduce_ms = time.getTime() - Date.now();
    return {
        hours : parseInt( reduce_ms / 1000 / 3600 ),
        min : parseInt( reduce_ms / 1000 / 60 % 60 ),
        sec : parseInt( reduce_ms / 1000 % 60 )
    }
}
setInterval(function(){
    renderCountDown()
},800)
var hour_ele = document.getElementById("hour");
var min_ele = document.getElementById("min");
var sec_ele = document.getElementById("sec");
function renderCountDown(){
    var res = countDown();  
    hour_ele.innerHTML = addZ(res.hours);
    min_ele.innerHTML  = addZ(res.min);
    sec_ele.innerHTML  = addZ(res.sec);
}
function addZ( num ){
    if( num >= 10 ){
        return num;
    }
    return "0"+ num;
}
renderCountDown();
