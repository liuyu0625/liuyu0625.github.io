// 商品列表点击框
$('.jiezhi_list_aside ul>li span').click(function(){
    $(this).toggleClass("active").siblings("ol").slideToggle();
});
// 列表渲染
$.ajax({
    url : "http://localhost/project/php/data.php",
    dataType: "json",
    success:function( res ){
        var html = "";
        res.forEach(item =>{
        html += `<div class="page_bg">
            <a alt="花冠(女戒) 白18K金钻石女戒0.10ct" title="花冠(女戒) 白18K金钻石女戒0.10ct" href="#" target="_blank" class="page_img_bg"></a>
            <a class="page_img_bg_p" href="../html/magnifier.html?id=${item.id}"><img src="${item.img}" alt=""></a>
            <a href="#" target="_blank" class="page_text_1"><span class="page_text_1_span">${item.title}</span></a>
            <div class="page_text_2">
                <span>￥</span><span class="page_price">${item.price}</span>
            </div>
            <div class="page_text_3">售出<span>${item.sale}</span></div>
            <a href="#" target="_blank"><div class="page_text_3 comment">评论<span>140</span></div></a>
        </div>`;
        })
        $(".page_list").html(html);
    }
})
// getSend("http://localhost/project/php/data.php",function( data ){
//     var html = "";
//     var json_data = JSON.parse(data);
//     // console.log(json_data);
//     json_data.forEach(item=>{
//         html += ` <div class="page_bg">
//         <a alt="花冠(女戒) 白18K金钻石女戒0.10ct" title="花冠(女戒) 白18K金钻石女戒0.10ct" href="#" target="_blank" class="page_img_bg"></a>
//         <a class="page_img_bg_p" href="../html/magnifier.html"><img src="${item.img}" alt=""></a>
//         <a href="#" target="_blank" class="page_text_1"><span class="page_text_1_span">${item.title}</span></a>
//         <div class="page_text_2">
//             <span>￥</span><span class="page_price">${item.price}</span>
//         </div>
//         <div class="page_text_3">售出<span>${item.sale}</span></div>
//         <a href="#" target="_blank"><div class="page_text_3 comment">评论<span>140</span></div></a>
//      </div>`;
//     })
//     $(".page_list").html(html);
// })


