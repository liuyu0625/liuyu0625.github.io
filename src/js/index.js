// 右侧小轮播图
// var animateT2 = document.getElementById("animateT2");
// var     ul   = animateT2.children[0];
// var     li   = ul.children; //图片的容器
// var disc_border = animateT2.children[1];
// var   disc   = disc_border.children; //小圆点
// var index = 0;//初始下标为0
// for(var i = 0; i < disc.length; i ++ ){
//     disc[i].index = i ; 
//     disc[i].addEventListener("mousemove",function(){
//         for(var k = 0; k < disc.length; k ++ ){
//             disc[k].className = disc[k].className.replace(/\s?disc_hover/g,"");
//             li[k].className = li[k].className.replace(/\s?show/g,"");
//         }
//         this.className +=" disc_hover";
//         li[this.index].className +=" show";
//     })
// } 

    // 把用户名渲染到页面上
    var user_name = cookie("user");
    var str_html = "";
    if(user_name){
        str_html  = `
            <h1>欢迎您<span  class="user">${user_name}</span>用户来到钻石小鸟</h1>
            <a href="./index.html" id="exit">退出登录</a>
        `;
    }else{
        str_html = `
            <h1>欢迎进入钻石小鸟官网</h1>
            <a href="./login.html">登录</a>
            <a href="./register.html">注册</a>
        `;
    }
    $('.top_l').html(str_html);

    // 点击退出登录的时候，让cookie删除
    $('.top_l').on('click','#exit',function(){
        removeCookie("user");
        str_html = `
        <h1>欢迎进入钻石小鸟官网</h1>
        <a href="./login.html">登录</a>
        <a href="./register.html">注册</a>
    `;
        $('.top_l').html(str_html);

    })
    // 购物车导航
    $('#myCar').mouseover(function(){
        $(this).children('.car_goods').show().siblings('.myCar').css({
            backgroundColor:"#fff"
        });
        $(this).children('.myCar').addClass('mycar_border');
    })
    $('#myCar').mouseleave(function(){
        $(this).children('.car_goods').hide().siblings('.myCar').css({
            backgroundColor:"#f8e3df"
        });
        $(this).children('.myCar').removeClass('mycar_border');
    })
    // 我的鸟巢
    $('#my_nest').mouseover(function(){
        $(this).children('ol').css({
            display:"block"
        });
        $(this).addClass('nest_border');
    })
    $('#my_nest').mouseleave(function(){
        $(this).children('ol').css({
            display:"none"
        });
        $(this).removeClass('nest_border');
    })
    // 手机官网
    $('.mobile_net').mouseover(function(){
        $(this).children('.mobile').show().parents('.mobile_net').css({
            backgroundColor:"#fff"
        });
        $(this).children('.first_net').addClass('mycar_border');
    })
    $('.mobile_net').mouseleave(function(){
        $(this).children('.mobile').hide().parents('.mobile_net').css({
            backgroundColor:"#f8e3df"
        });
        $(this).children('.first_net').removeClass('mycar_border');
    })
    // 导航栏菜单
    $('.nav_li').mouseover(function(){
        $(this).css({
            backgroundColor:'#fdb2a4'
        }).children('.down_select').stop().fadeIn().show();
    })
    $('.nav_li').mouseleave(function(){
        $(this).css({
            backgroundColor:'#909090'
        }).children('.down_select').stop().fadeOut();
    })
    // 商品悬浮
    $('.gs_wht_wp .u_pnk_btn').mouseover(function(){
        $(this).fadeTo("normal",0.6);
    })
    $('.gs_wht_wp .u_pnk_btn').mouseleave(function(){
        $(this).fadeTo("normal",1);
    })
    // 系列产品的tab切换
    $('.g_tab_wp em').mouseover(function(){
        var indx=$(this).index();
        $(".g_tab_cnt").eq(indx).stop().fadeIn(15).siblings(".g_tab_cnt").stop().fadeOut(15);
        $(this).css({
            color:"#000"
        });
    })
    $('.g_tab_wp em').mouseleave(function(){
        $(this).css({
            color:"#fff"
        })
    })

    // 右侧小轮播图
    $('#animateT2 .disc').mouseover(function(){
        var index = $(this).index();
        $('.ani_li').eq(index).fadeIn().siblings('.ani_li').fadeOut();
        $(this).addClass('disc_hover').siblings('.disc').removeClass('disc_hover');
    })

    // 婚戒推荐&&全球美钻 点击切换
    $(".f_rng_focus li").mouseover(function(){
        $(this).find('img').css({
            top:"-30px"
        }).siblings('img').css({
            top:0
        })
    });
    $(".f_rng_focus li").mouseleave(function(){
        $(this).find('img').css({
            top:"0px"
        })
    });
    $('#u_rngs_next').click(function(){
        var ulLeft = $('.f_rng_focus ul').css("left");
        if(parseInt(ulLeft) == -1096 ){
            return false;
        }else{
            $('.f_rng_focus ul').css({
                left:"-=274px"
            })
        }
    })
    $('#u_rngs_prev').click(function(){
        var ulLeft = $('.f_rng_focus ul').css("left");
        if(parseInt(ulLeft) == 0 ){
            return false;
        }else{
            $('.f_rng_focus ul').css({
                left:"+=274px"
            })
        }
    })

