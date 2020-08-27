    var wrap_rot = document.querySelector(".wrap_rot");//轮播图的容器
    var btn = document.querySelector(".btn");//小圆点的容器
    var span = btn.children;//所有的小圆点
    var content = document.querySelector(".content");//图片的大容器
    var box = content.children;//图片盒子
    var prev = document.querySelector(".prev");//左箭头
    var next = document.querySelector(".next");//右箭头
    var index = 0;//初始下标为0
    var timer = null;
    // 鼠标滑到wrap_rot上面的时候，让箭头显示,离开的时候，让箭头消失
    wrap_rot.addEventListener("mouseenter",function(){
        prev.style.display = "block";
        next.style.display = "block";
        clearInterval(timer);
    })
    wrap_rot.addEventListener("mouseleave",function(){
        prev.style.display = "none";
        next.style.display = "none";
        timer = setInterval(function(){
            next.onclick();
        },5000)
    })

    //点击小圆点，切换对应的图片
    for(var i = 0; i < span.length; i ++ ){
       span[i].index = i ; 
       span[i].addEventListener("mouseenter",function(){
           for(var k = 0; k < span.length; k ++ ){
               if( this === span[k] ){
                   break;
               }
           }
           index = k;
           light()
       })
    }
    //点击左右两侧的按钮，切换对应的图片
    prev.addEventListener("click",function(){
       if( index === 0 ){
           index = box.length - 1;
       }else{
           index --;
       }
       light();
    })
    next.onclick = function(){
        if( index === box.length - 1){
            index = 0;
        }else{
            index ++;
        }
        light();
    }
    // next.addEventListener("click",function(){
    //     if( index === box.length - 1){
    //         index = 0;
    //     }else{
    //         index ++;
    //     }
    //     light();
    // })
    function light(){
        for( var k = 0; k < box.length; k ++ ){
            span[k].className = span[k].className.replace(/\s?wrap_on/g,"");
            box[k].className = box[k].className.replace(/\s?current/g,"");
        }
        span[index].className +=" wrap_on";
        box[index].className +=" current";
    }
    timer = setInterval(function(){
        next.onclick();
    },3000)

