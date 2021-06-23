(function  () {
    "use strict";
    if (typeof JsHook == "undefined"){
        //先判断JsHook是否定义
        console.log("JsHook类没有定义！");
        return 0;
    }
    var myalert1= new JsHook;
    myalert1.initHook(window,"alert",function (msg) {
        console.log("我是myalert1,alert已经被HooK，消息是："+msg);
        myalert1.CallOrigin("这是myalert1放行的数据!");
        return 0;
    });
    var myalert2= new JsHook;
    myalert2.initHook(window,"alert",function (msg) {
        console.log("我是myalert2，alert已经被HooK，消息是："+msg);
        myalert2.CallOrigin("我是myalert2!");
        return 0;
    });
    alert("测试2层Hook");
    console.log("2层Hook测试完毕，下面测试Hook的暂停。");
    myalert2.SuspendedHook();
    alert("测试SuspendedHook");
    myalert2.RestoreHook();
    console.log("2层Hook测试完毕，下面测试Hook的恢复。");
    alert("测试RestoreHook");
    //请按顺序
    myalert2.DeleteHook();
    myalert1.DeleteHook();
    console.log("Hook测试完毕。");
    alert("Hook测试完毕。")
})();