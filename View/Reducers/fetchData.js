import {
    AJAX_DATA,
    AJAX_SUCCEED,
    AJAX_FAILED,
    AJAX_RELOAD,
    UPDATE_TODO
} from '../Config/actionType'

import defaultData from '../Config/defaultData'
import Api from '../Api'
import tipper from './tipper.js'

function FetchData(state = defaultData, action) {
    switch (action.type) {

        case AJAX_DATA:
            var getParas = '',
                postParas = {};
            if (action.data.method.toLowerCase() == 'get') {
                getParas = '?' + action.data.body;
            } else {
                postParas = {
                    method: 'post',
                    headers: {
                        "Content-Type": "application/json", //"text/plain",//"application/json" //"application/x-www-form-urlencoded"
                    },
                    body: action.data.body,
                    credentials: "include" //默认不带cookie，增加此参数带cookie
                }
            }
            action.data.beforeCallback && action.data.beforeCallback();
            fetch(Api[action.data.url] + getParas, postParas).then(response => {
                return response.json();
            }).then(json => {

                //按ret约定显示错误提示
                if ( ('ret' in json) && json.ret != 1) {
                    //alert(json.msg);
                    tipper.emitMsg('ServerError', json.msg);

                    action.data.finalCallback && action.data.finalCallback(json);

                    console.log('Request:' , action.data.url , ' Error：' , json );
                    return;
                }

                //处理返回的正常的数据
                action.data.succeed({
                    json: json,
                    name: action.data.url,
                    callback: action.data.afterCallback ? action.data.afterCallback : false,
                    finalCall: action.data.finalCallback,
                })

            }).catch(err => {

                action.data.afterCallback && action.data.afterCallback();
                // console.log('请求 ' + action.data.url + ' error');
            })
            return [...state]

        case AJAX_SUCCEED:
            var actionJson = {};
            actionJson[action.data.name] = action.data.json;
            // actionJson[action.data.name][action.data.name] = true;
            var obj = Object.assign(...state, actionJson);
            // console.log(action.data.name);
            if (action.data.callback) {
                setTimeout(action.data.callback, 100);
            }
            if (action.data.finalCall) {
                setTimeout(action.data.finalCall, 100);
            }
            return [obj]
        case AJAX_RELOAD:
            var newObj = state[0];
            newObj.focusInfo.focus = false;
            newObj.navInfo.nav = false;
            newObj.productInfo.product = false;
            newObj.swiperInfo.swiper = false;
            var obj = Object.assign(...state, newObj);
            return [obj]

        case AJAX_FAILED:
            return [...state]

        case UPDATE_TODO:
            var obj = Object.assign(...state, action.data);
            return [obj]

        default:

            return [...state]
    }
}


module.exports = FetchData
