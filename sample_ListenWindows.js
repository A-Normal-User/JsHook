window.a=1024;
(function () {
    "use strict";
    if (typeof JsHook == "undefined"){
        //先判断JsHook是否定义
        console.log("JsHook类没有定义！");
        return 0;
    }
    var dealfunction = (...p_list)=>{
        console.log(`${ p_list[0] }.${ p_list[1] }的数据被设置，数据是：${ p_list[2] }`)
        return 100;
    }
    var mywindow = new JsHook;
    mywindow.initHook(window,"a",dealfunction);
    console.log("下面尝试Hook数据修改！")
    window.a=1024;
    console.log(window.a);
    mywindow.DeleteHook();
    console.log("下面尝试删除Hook！")
    window.a=1024;
    console.log(window.a);
})();