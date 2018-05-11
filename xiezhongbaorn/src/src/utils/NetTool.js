import React, {Component} from 'react';

/**
 * 使用Promise封装Fetch，具有网络超时、请求终止的功能
 */
export default class NetTool extends Component {

    static baseUrl = "http://app.xiezhongbao.cn:81/api/";
    static token = '';

    /**
     * post请求
     * url : 请求地址
     * data : 参数(Json对象)
     * callback : 回调函数
     * */
    static fetch_request(url, method, params = '') {
        let header = {
            'Accept': 'application/json',
            'Content-Type': 'application/json;charset=UTF-8',
            // 'accesstoken': NetTool.token,
        }
        let promise = null;
        if (params == '') {
            promise = new Promise((resolve, reject) => {
                fetch(NetTool.baseUrl + url, {method: method, headers: header})
                    .then(response => response.json())
                    .then(responseData => resolve(responseData))
                    .then(err => reject(err))
            })
        } else {
            promise = new Promise((resolve, reject) => {
                fetch(NetTool.baseUrl + url, {method: method, headers: header, body: JSON.stringify(params)})
                    .then(response => response.json())
                    .then(responseData => resolve(responseData))
                    .then(err => reject(err))
            })
        }
        return NetTool.warp_fetch(promise);
    }

    /**
     * 创建两个promise对象，一个负责网络请求，另一个负责计时，如果超过指定时间，就会先回调计时的promise，代表网络超时。
     * @param {Promise} fetch_promise    fetch请求返回的Promise
     * @param {number} [timeout=10000]   单位：毫秒，这里设置默认超时时间为10秒
     * @return 返回Promise
     */
    static warp_fetch(fetch_promise, timeout = 10000) {
        let timeout_fn = null;
        let abort = null;
        //创建一个超时promise
        let timeout_promise = new Promise(function (resolve, reject) {
            timeout_fn = function () {
                reject('网络请求超时');
            };
        });
        //创建一个终止promise
        let abort_promise = new Promise(function (resolve, reject) {
            abort = function () {
                reject('请求终止');
            };
        });
        //竞赛
        let abortable_promise = Promise.race([
            fetch_promise,
            timeout_promise,
            abort_promise,
        ]);
        //计时
        setTimeout(timeout_fn, timeout);
        //终止
        abortable_promise.abort = abort;
        return abortable_promise;
    }
}
