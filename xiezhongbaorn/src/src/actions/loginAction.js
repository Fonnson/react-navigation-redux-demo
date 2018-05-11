import * as type from './actionType';

export function login(name, psw) {
    var loginUrl = 'auth/GetUserValidate' + name + psw;
    return dispatch => {
        //登录中
        dispatch(isLogining());
        //开始登陆
        fetch("https://www.baidu.com/", "get")
            .then(res => {
                let user = {
                    name: "老阳叔",
                    age: 24,
                }
                dispatch(loginSuccess(user));
            })
            .catch(e => {
                dispatch(loginError())
            })
    };
}

export function logout() {
    return {type: type.LOGOUT}
}

function isLogining() {
    return {
        type: type.LOGINING,
    }
}

function loginSuccess(user) {
    return {
        type: type.LOGIN_SUCCESS,
        user: user,
    }
}

function loginError() {
    return {
        type: type.LOGIN_ERROR,
    }
}