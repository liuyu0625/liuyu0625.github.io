var user_name = cookie("user");
    if(cookie("user")){
        // 把localStorage的数据取出来，渲染到页面上
        var shop_data = JSON.parse(localStorage.getItem("car_data"));
        // 数据渲染到页面上
        if(shop_data){
            shop_data.forEach(item=>{
                var goodsStr = "";
                    goodsStr +=`
                        <div class="shopcar_content_shop_list">
                        <div class="shopcar_content_shop_list_1">
                            <div class="p-checkbox">
                                <input type="checkbox"  class="j-checkbox">
                            </div>
                            <div class="shopcar_show_menu">
                                <div class="shopcar_show_menu_text">确定要删除吗？</div>
                                <div class="shopcar_show_menu_btn_1">确定</div>
                                <div class="shopcar_show_menu_btn_2">取消</div>
                            </div>
                            <a target="_blank" href="http://www.zbird.com/weddings/rdt30-7657128.html">                
                                <img class="shopcar_content_pic" src="${item.goods.img}" height="60" width="60/">
                            </a>
                            <div class="shopcar_content_shop_list_text vert_wrap">
                                <div class="vert_subwrap">
                                    <div class="vert_cont">
                                        <a target="_blank" href="http://www.zbird.com/weddings/rdt30-7657128.html">                                                                  
                                            ${item.goods.title}<br>
                                        </a>                     
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="add_row_02 vert_wrap" id="add_row_02">
                            <div class="vert_subwrap">
                                <div class="vert_cont">
                                <i>${item.goods.id}</i>
                                <!-- 内圈刻字 -->
                                </div>
                            </div>
                        </div>
                        <div class="add_row_02 vert_wrap" id="goods_num">
                            <div class="subwrap">
                                <div class="p-num">
                                    <div class="quantity-form clearfix">
                                        <a href="javascript:;" class="decrement">-</a>
                                                <input class="itxt" value="${item.num}"/>
                                        <a href="javascript:;" class="increment">+</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="add_row_01 vert_wrap">
                            <div class="vert_subwrap">
                            <div class="vert_cont">
                                    <!-- 尺寸 -->
                                    13.0
                                </div>
                            </div>
                        </div>
                        <!-- 价格 -->
                        <div class="shopcar_content_shop_list_2 vert_wrap">
                            <div class="vert_subwrap">
                                <div class="vert_cont">
                                    ￥${item.goods.price}
                                </div>
                            </div>
                        </div>
                        <div class="shopcar_content_shop_list_4 vert_wrap">
                            <div class="vert_subwrap">
                                <div class="vert_cont">      
                                    <!-- 会员价 -->
                                    ￥${item.goods.price}
                                </div>
                            </div>
                        </div>
                        <div class="shopcar_content_shop_list_3 vert_wrap">
                            <div class="vert_subwrap">
                                <div class="vert_cont">
                                    <div class="shopcar_content_shop_border_close">删除</div>
                                </div>
                            </div>
                        </div>
                    </div>`;
                $('.g_list').append(goodsStr);
            });
        // 购物车的功能
            $(function(){
            // 1. 全选和全不选功能
            $('.checkall').change(function(){
                // console.log($(this).prop('checked'));
                if($(this).prop('checked')){
                    $('.j-checkbox').prop('checked',true)
                }else{
                    $('.j-checkbox').prop('checked',false)
                }
            });                                          
            // 2. 有一个没有选中，就取消全选按钮
            $('.j-checkbox').change(function(){
                if($(".j-checkbox:checked").length === $('.j-checkbox').length){
                    $('.checkall').prop("checked",true);
                }else{
                    $('.checkall').prop("checked",false);
                }
            });
            // 3. 点击每一行后面的删除按钮，删除本行的商品，同时让localStorage对应的数据删除
            $('.shopcar_content_shop_border_close').click(function(){
            var goodsId = $(this).parents('.shopcar_content_shop_list_3').siblings('#add_row_02').find('i').html();
                shop_data.forEach( ( item, index )=>{
                    if( goodsId == item.goods.id ){
                        shop_data.splice(index,1);
                        localStorage.setItem("car_data", JSON.stringify(shop_data));
                    }
                })
                $(this).parents('.shopcar_content_shop_list').remove();
                if(shop_data.length === 0){
                    localStorage.removeItem('car_data');
                    location.href = location.href;
                 };
            });
            // 4. 点击删除选中的商品，同时让localStorage里面的商品删除
                $('.remove-batch').click(function(){
                    var index_arr = [];
                    $('.j-checkbox').each(function(index,item){
                        if($(item).prop('checked')){
                            index_arr.push(index);
                        }
                    })
                    var rever_indexArr = index_arr.reverse();
                    $.each(rever_indexArr,function(index,item ){
                        shop_data.splice(item,1);
                    });
                    localStorage.setItem("car_data", JSON.stringify(shop_data));
                    location.href = location.href;
                     $(this).parents('.shopcar_content_shop_list').remove();

                    if(shop_data.length === 0){
                        localStorage.removeItem('car_data');
                        location.href = location.href;
                         location.href = './index.html';
                     };
                });                                                                     
            //   5. 点击清空购物车，让所有的商品全部删除，同时清空localStorage
                $('.clear-all').click(function(){
                    $('.shopcar_content_shop_list').remove();
                    localStorage.removeItem('car_data');
                    location.href = location.href;
                }); 
            //  6. 点击 +或者- 的时候，让localStorage里面的对应的商品的数量也改变
                //  ++
                $('.increment').click(function(){
                var num = Number($(this).siblings('input').val());
                var tips = $.trim($(this).parents('#goods_num').siblings('.shopcar_content_shop_list_2').find('.vert_cont').text());
                    tips = Number($.trim(tips.substr(1)));
                    num ++;
                    $(this).siblings('input').val(num);
                    //当数量改变的时候，把数据存储到localStorage里面
                    var goodsId = $(this).parents('#goods_num').siblings('#add_row_02').find('i').html();  //当前元素的id
                    changeNum( goodsId,$(this).siblings('input').val());
                    // // console.log(goodsId);
                    // shop_data.forEach( ( item,index )=>{
                    //     if( goodsId == item.goods.id ){
                    //         item.num = $(this).siblings('input').val();
                    //         localStorage.setItem("car_data", JSON.stringify(shop_data));
                    //     }
                    // })
                    var tips_sum = num*tips;
                    $(this).parents('#goods_num').siblings('.shopcar_content_shop_list_4').find('.vert_cont').html("￥"+tips_sum);
                    getSum();
                });

                // --
                $('.decrement').click(function(){
                    // var num = $(this).siblings('.itxt').val();
                    var num = Number($(this).siblings('input').val());
                    var tips = $.trim($(this).parents('#goods_num').siblings('.shopcar_content_shop_list_2').find('.vert_cont').text());
                    tips = Number($.trim(tips.substr(1)));
                    if( num <= 1 ){
                        return false;
                    }
                    num --;
                    $(this).siblings('.itxt').val(num);

                    var goodsId = $(this).parents('#goods_num').siblings('#add_row_02').find('i').html();  //当前元素的id
                    changeNum( goodsId,$(this).siblings('input').val());
                    // // console.log(goodsId);
                    // shop_data.forEach( ( item,index )=>{
                    //     if( goodsId == item.goods.id ){
                    //         item.num = $(this).siblings('input').val();
                    //         localStorage.setItem("car_data", JSON.stringify(shop_data));
                    //     }
                    // })
                    var tips_sum = num*tips;
                    $(this).parents('#goods_num').siblings('.shopcar_content_shop_list_4').find('.vert_cont').html("￥"+tips_sum);
                    getSum();
                });
                // 修改文本框的值的时候，让小计对应变化,用表单的change事件
                $('.itxt').keyup(function(){
                    var num = $(this).val();
                    var tips = $.trim($(this).parents('#goods_num').siblings('.shopcar_content_shop_list_2').find('.vert_cont').text());
                    tips = Number($.trim(tips.substr(1)));
                    var tips_sum = num*tips;
                    $(this).parents('#goods_num').siblings('.shopcar_content_shop_list_4').find('.vert_cont').html("￥"+tips_sum);
                    getSum();
                });

                var input_value = $('.itxt').val();
                // 判断输入框中的是否是数字
                $('.itxt').on('keyup',function(e){
                    // 输入的是数字
                    if(e.which>=48&&e.which<=57){
                        input_value = $('.itxt').val();
                        var goodsId = $(this).parents('#goods_num').siblings('#add_row_02').find('i').html();  //当前元素的id
                        changeNum( goodsId , $(this).val())
                        // shop_data.forEach( ( item,index )=>{
                        //     if( goodsId == item.goods.id ){
                        //         item.num = $(this).val();
                        //         console.log(item.num);
                        //         localStorage.setItem("car_data", JSON.stringify(shop_data));
                        //     }
                        // })
                    }else{
                        // 输入的不是数字
                        $('.itxt').val(input_value);
                    }
                })
                //7. 总计和总额模块
                getSum();
                function getSum(){
                    var count =0;
                    var sum = 0;
                    $('.itxt').each(function( index, ele){
                        count += parseInt($(ele).val());
                    });
                    $('.amount-sum em').text(count);
                    $('.shopcar_content_shop_list_4  .vert_cont').each(function( index, ele){
                        sum +=parseFloat($.trim($.trim($(ele).text()).substr(1)));
                    });
                $('.price-sum em').text("￥" + sum);
                }
                // 结算功能
                $('.btn-area').click(function(){
                    var money = $('.price-sum em').text().substr(1);
                    alert("您本次支付金额为"+money+"元");
                });
                //  函数功能: 改变localStorage里面的num的数值
                function changeNum( id, num){
                    // var goodsId = $(this).parents('#goods_num').siblings('#add_row_02').find('i').html();  //当前元素的id
                    // console.log(goodsId);
                    shop_data.forEach( ( item,index )=>{
                        if( id == item.goods.id ){
                            item.num = num;
                            localStorage.setItem("car_data", JSON.stringify(shop_data));
                        }
                    })
                }

            });

        }else{
            var str_car = "";
            str_car = `
            <div class="goodsCar_null center">
                <img src="../img/shopcarbgpic.jpg" alt="">
                <p>你的购物车内暂时没有商品，去首页挑选喜欢的商品</p>
                <a href="../html/index.html">去首页</a>
            </div>    
            `;
            $('.shopcar_bg').html(str_car).css({
                marginTop:60
            });
        }

    }else{
        location.href="./login.html";
      
    }
