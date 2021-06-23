
# JsHook

## 设计理念：
   - 让JSHOOK更方便。

## 目标：
   - [x] Hook function
   - [x] Hook 参数
   - [ ] 直接Hook对象，比如直接Hook WebSocket对象

## 例子：
   - 引用了JsHook.js文件后，初始化JsHook只需下面的代码：
   ```javascript
   var myalert1= new JsHook;
   ```
   - Hook函数可参考下面的例子：
   ```javascript
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
   ```

   - Hook某个参数可参考代码：

```javascript
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
```