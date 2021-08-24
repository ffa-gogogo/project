// $.ajax({
//     type:'GET',
//     url:'https://v2.alapi.cn/api/music/search', 
//     dataType:'json',
//     data:'keyword=天下&token=aYrSYBvUgUrsHstl',  //接口文档中标明的
//     success:function(data){
//         // console.log(1);
//         console.log(data);
//     },
// })
(function () {
    // var input = $('.input');
    // console.log($('.input'));
    // $('.input').on('input', function () {

    //     var value = $(this).val()
    //     // console.log(value);
    //     getData(value, 7)
    // })
    $('.input').on('input', debounce(function () {
        var value = $(this).val()
        // console.log(value);
        getData(value, 7)

    }, 1000, false))

    function getData(value, num) {
        if (value.length == 0) {
            $('.result').css('display', 'none')
            return false
        } else {
        
            $.ajax({
                type: 'GET',
                url: 'https://v2.alapi.cn/api/music/search',
                dataType: 'json',
                data: 'keyword=' + value + '&token=aYrSYBvUgUrsHstl&limit=' + num,  //接口文档中标明的 limit=7接口文档中定义的
                success: addItem
            })
            $('.result').css('display', 'block')
        }
       


    }
    function addItem(data) {
        // console.log(data);
        var list = data.data.songs  //
        console.log(list);
        var str = ''
        var artists = []
        list.forEach(function (ele, index) {
            // console.log(ele);
            // console.log(ele.artists);
            // // console.log(ele.artists.name);
            // artists = (ele.artists)
            // console.log(artists);
            ele.artists.forEach(function (e, i) {
                console.log(e.name);
                str += '<li><a href="https://music.163.com/"><img src="' + e.img1v1Url + '" alt=""><span class="song">' + ele.name + '</span> <span class="artist">' + e.name + '</span></a></li>'

            })

        });
        $('.result').html($(str))
    }

    $('.input').on('blur', function () {
        $('.result').css('display', 'none')
    })
    $('.input').on('focus', function () {
        $('.result').css('display', 'block')
    })








    // 从防抖那里抄的函数
    function debounce(func, time, flag) {
        var timer = null;
        // clearTimeout(timer);  //这样写timer在函数内部每次运行都会触发一个新的timer浪费性能
        // timer=setTimeout(function(){
        //     console.log('抬起');
        // },1000)
        // console.log(this);  //window

        var debounced = function () {   //把它装在一个函数里面然后返回出去

            var argu = arguments
            // console.log(this);  //input
            var that = this;
            clearTimeout(timer);

            if (flag) {
                if (!timer) func.apply(that, argu);  //如果timer是空的那就先执行一遍
                timer = setTimeout(function () {  //然后设置定时器1秒后把定时器清空在次进入这个循环
                    timer = null
                }, time)
            }
            else {
                timer = setTimeout(function () {
                    // console.log('抬起');
                    //自己传一个函数来说明要执行什么操作  
                    // console.log(that);
                    func.apply(that, argu)   //需要把这个函数的this改为input   argu接受整个返回函数的参数就可以接受到e事件
                }, time)
            }

        }


        // 清除功能
        debounced.cancel = function () {
            clearTimeout(timer)
            timer = null
        }


        return debounced;
    }
})()