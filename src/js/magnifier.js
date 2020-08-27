var box = document.querySelector('.show_box_left');
var small = box.children[0];
var mask = box.children[0].children[1];
var big = box.children[1];
var bigImg = box.children[1].children[0];
 small.onmouseenter = function(){
     mask.style.display = "block";
     big.style.display = "block";
 }
 small.onmouseleave = function(){
     mask.style.display = "none";
     big.style.display = "none";
 }
 small.onmousemove = function( evt ){
     var e = evt || event;
     var maskWidth = mask.offsetWidth; //200
     var maskHeight = mask.offsetHeight; //200
     var boxWidth = box.offsetWidth; //360
     var boxHeight = box.offsetHeight; //360
     var x = e.clientX + scroll().left - box.offsetLeft;
     var y = e.clientY + scroll().top - box.offsetTop;
     x = x - maskWidth / 2;
     y = y - maskHeight / 2;
     if( x < 0){
         x = 0;
     }
     if( x > boxWidth - maskWidth ){
         x = boxWidth - maskWidth;
     }
     if( y < 0){
         y = 0;
     }
     if( y > boxHeight - maskHeight){
         y = boxHeight - maskHeight;
     }
     mask.style.left = x + "px";
     mask.style.top = y + "px";
     var left = -x / box.offsetWidth*bigImg.offsetWidth;
     var top = -y  /box.offsetHeight*bigImg.offsetHeight;
     bigImg.style.left = left + "px";
     bigImg.style.top = top + "px";
 }
 function scroll(){
     return{
         "left" : document.documentElement.scrollLeft || document.body.scrollLeft,
         "top" : document.documentElement.scrollTop || document.body.scrollTop
     }
 }

//  放大镜下面的轮播图
$('.moveleft_on').click(function(){
    $(".box_bottom ul").animate(
        {left: '-280px'}, "slow");
    $(this).hide().siblings('.moveright_on').show();
});
  
$('.moveright_on').click(function(){
    $(".box_bottom ul").animate(
        {left: '0px'}, "slow");
    $(this).hide().siblings('.moveleft_on').show();
});

$(".box_bottom ul li").mouseover(function(){
    $(this).addClass('on').siblings('li').removeClass('on');
    var index = $(this).index();
    var imgSrc = $(this).find('img').attr('src');
    var bigSrc = imgSrc.slice(0,-4) + "big.jpg";
    var smallSrc = imgSrc.slice(0,-4) + "small.jpg";
     if(index < 3){
            $('.small_box').find('img').attr('src',smallSrc)
            .siblings('.mask').css({
                opacity:0.4
            });
            $('.big_box').find('img').attr('src',bigSrc);
            $(".big_box img").css({
                display:"block",
            }).parents('.big_box').css({
                border:"1px solid #000"
            })
        }else{
         $('.small_box').find('img')
         .attr('src',smallSrc).siblings('.mask')
         .css({
             opacity:0
         });
         $(".big_box img").css({
             display:"none",
         }).parents('.big_box').css({
            border:"1px solid transparent"
        })
     }
})

// 选择其他同款现货
$('#more_clk').mouseover(function(){
    $(this).addClass('on')
})
$('#more_clk').mouseleave(function(){
    $(this).removeClass('on')
})

// 实现商品列表页跳到购物车的功能
// console.log(location.href)
// console.log(location.href.split("=")[1])
var goodsId = location.href.split("=")[1];  //拿到商品的Id
// var goods_list = []; //存放商品的数组
// console.log(goodsId);
$.ajax({
    url:"http://localhost/project/php/data.php",
    dataType:"json",
    success:function(res){
        var goods = "";
         res.forEach((item,index)=>{
            //  console.log(res);
        //console.log(item.id);
           if(item.id == goodsId){
               goods =`
                <h3>${item.title}</h3>
                <em class="u_psys_pri">
                     <span class="coupon_tips cou_bg_th">价格</span><i class="con_i">￥</i><b>${item.price}</b>
                </em>
                <span class="u_psys_sale">
                    <i>售出</i>
                    <b>${item.sale}</b>
                    <i>评论</i>
                    <b>599</b>
                </span>`
            }
             $('.f_psys_pri').html(goods);
        })
        // 点击购物车，把商品存入到localstorage
        $('#buyNowPopBtn').click(function(){
            var car_data = JSON.parse(localStorage.getItem("car_data")) || [];
            // 如果数据不存在，值为空null，此时就创建数组结构
            // var list = [];
            //  若数据存在，就直接向数组的后面添加数据
            res.forEach( item => {
                if( goodsId == item.id ){
                    // console.log(item);
                    var carGoods = {
                        goods:item,
                        num : 1
                    }
                    for(var i = 0; i < car_data.length; i ++ ){
                        if( car_data[i].goods.id == carGoods.goods.id){
                            car_data[i].num =1;
                            // car_data.push(carGoods);
                            // console.log(carGoods.num );
                            localStorage.setItem("car_data", JSON.stringify(car_data));
                            return false;
                        }
                    }
                  car_data.push(carGoods);
                localStorage.setItem("car_data", JSON.stringify(car_data));

                // 1.先判定localStorage里面是否有数据
                //   ==> 如果是第一次购物，localStorage是空的，没有数据，那么就直接把商品 对应的id和数量 追加到数组的后面
                //   ==> 如果不是第一次购物的话，直接把获得到的 商品id和数量添加到localStorage里面
                //   ==> 如果要添加的商品id， 在localStorage里面已经存在的话，就让list数组里面的num自加

                // console.log(list);
                // list.push(item)
                // // console.log(list);
                // var carData = JSON.stringify(list);
                // // console.log(carData);
                // localStorage.setItem("car_data", carData);
                }
            })
                
        })


    }
});





