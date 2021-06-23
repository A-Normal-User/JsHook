/*
  Copyright (c) 2021 A-Normal-User
  Released under Apache License
*/
"use strict";
class JsHook {
    constructor() {
        let func_initData = () => {
            this.Hooktype = "null"; //定义Hook的类型
            this.m_HookObj = new Object;
            this.m_Hookname = "";
            this.Hookfunction = function () { }; //定义Hook的函数
            this.HookDealfunction = function () { }; //定义Hook跳转的函数
        }
        func_initData();
        //下面写dealfunctionHook的声明。
        let func_dealfunctionHook = (...p_list) => {
            if (p_list[3] == false || typeof p_list[3] == "undefined") {
                //下面处理可以修改数据的Hook
                this.m_HookObj = p_list[0];
                this.m_Hookname = p_list[1];
                this.Hookfunction = p_list[0][p_list[1]];
                this.HookDealfunction = p_list[2];
                p_list[0][p_list[1]] = p_list[2];
            } else {
                //直接使用addEventListener监听
                p_list[0].addEventListener(p_list[1], p_list[2]);
            }
        };
        //initHook是初始化Hook的函数
        this.initHook = (HookObj, Hookname, newfunction, ...p_list) => {
            this.Hooktype = typeof HookObj[Hookname];
            switch (this.Hooktype) {
                case "function":
                    //如果是编写函数请注意：initHook时需要提供该函数是否为只监听，如果提供true，则为只监听，代码中不能对数据进行修改，如果是false，则是可以修改数据，默认为false
                    func_dealfunctionHook(HookObj, Hookname, newfunction, p_list[3]); //抛出给dealfunctionHook处理函数的Hook。
                    break;
                case "object":
                    break;
                case "null":
                    throw new Error('JsHook错误，不能Hook类型为null的变量。');
                case "undefined":
                    throw new Error('JsHook错误，不能Hook类型为undefined的变量。');
                default:
                    break;
            }
        };
        this.CallOrigin = (...p_list) => {
            switch (this.Hooktype){
                case "function":
                    //调用原来的函数
                    this.Hookfunction.apply(this.m_HookObj, p_list);
                    break;
                default:
                    break;
        }
        };
        this.SuspendedHook = ()=>{
            //暂停Hook
            switch (this.Hooktype){
                case "function":
                    this.m_HookObj[this.m_Hookname]=this.Hookfunction;
                    break;
                default:
                    break;
            }
        }
        this.RestoreHook = ()=>{
            //恢复Hook
            switch (this.Hooktype){
                case "function":
                    this.m_HookObj[this.m_Hookname]=this.HookDealfunction;
                    break;
                default:
                    break;
            }
        }
        this.DeleteHook = ()=>{
            //删除Hook
            switch (this.Hooktype){
                case "function":
                    this.m_HookObj[this.m_Hookname]=this.Hookfunction;
                    break;
                default:
                    break;
            }
            func_initData();
        }
    }
}