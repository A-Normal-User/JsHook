/*
  Copyright (c) 2021 A-Normal-User
  Released under Apache License
*/
class JsHook {
    "use strict";
    constructor() {
        var func_initData = () => {
            this.Hooktype = "null"; //定义Hook的类型
            this.m_HookObj = new Object;
            this.m_Hookname = "";
            this.IsSuspended=false;
            this.Hookfunction = function () { }; //定义Hook的函数
            this.HookDealfunction = function () { }; //定义Hook跳转的函数
        }
        var m_data;
        func_initData();
        //下面写dealfunctionHook的声明。
        var func_dealfunctionHook = (...p_list) => {
                //下面处理可以修改数据的Hook
                this.m_HookObj = p_list[0];//保存Hook的对象
                this.m_Hookname = p_list[1];//保存Hook的函数名
                this.Hookfunction = p_list[0][p_list[1]];//保存Hook的函数原来的function
                this.HookDealfunction = p_list[2];//保存Hook的function
                p_list[0][p_list[1]] = p_list[2];//覆写原函数
        };
        var func_Datatype = (...p_list) =>{
            this.m_HookObj = p_list[0];//保存Hook的对象
            this.m_Hookname = p_list[1];//保存Hook的函数名
            this.HookDealfunction = p_list[2];//保存Hook的function
            this.Hookfunction =p_list[0][p_list[1]]//保存被Hook的属性
            let self=this;
            Object.defineProperty(p_list[0],p_list[1],{
                get(){
                    return m_data;
                },
                set(val){
                    if (self.IsSuspended==false){
                        m_data=self.HookDealfunction(self.m_HookObj,self.m_Hookname,val);//调用监听函数
                        console.log(m_data);
                    }
                }
            })
        }
        //initHook是初始化Hook的函数
        this.initHook = (HookObj, Hookname, newfunction, ...p_list) => {
            this.Hooktype = typeof HookObj[Hookname];
            if(p_list[0]){
                //如果是编写函数请注意：initHook时第4个参数表明该函数是否为只监听，如果提供true，则为只监听，监听函数的变化，如果是false，则是可以直接用替换的方式直接处理函数，默认为false
                this.Hooktype="default";//即本处将会被抛到func_Datatype处理
            }
            switch (this.Hooktype) {
                case "function":
                    func_dealfunctionHook(HookObj, Hookname, newfunction); //抛出给dealfunctionHook处理函数的Hook。
                    break;
                case "object":
                    throw new Error('JsHook错误，不能直接Hook类型为object的变量，请使用类：JsHookObject');
                    break;
                case "null":
                    throw new Error('JsHook错误，不能Hook类型为null的变量。');
                case "undefined":
                    throw new Error('JsHook错误，不能Hook类型为undefined的变量。');
                default:
                    func_Datatype(HookObj, Hookname, newfunction);
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
            this.IsSuspended=true;
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
            this.IsSuspended=false;
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
                    func_initData();
                    break;
                default:
                    this.IsSuspended=false;
                    Object.defineProperty(this.m_HookObj,this.m_Hookname,{
                        get(){
                            return m_data;
                        },
                        set(val){
                            m_data=val;
                        }
                        })//重写属性，不再监听
                    break;
            }
        }
    }
}