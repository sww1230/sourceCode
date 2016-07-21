/*
 * 集中处理错误和报警消息
 *
 * 只是为了让fetchData中不直接操作UI，通过这个中间模块连接消息和UI展示
 *
 * 因为目前工程内目录结构不完善，暂且先把这个不知道该属于谁的功能放在这里
 */

module.exports = {
    
    handlers: {},  //业务程序指定的各种消息处理函数

    //设置handlers
    setHandler: function(type, handler){
        this.handlers[type] = handler;
    },

    //发一条消息 
    //type: warning error tip
    emitMsg:function(type, msg) {
        this.handlers[type] = this.handlers[type] || function() {};
        this.handlers[type](msg);
    }
};
