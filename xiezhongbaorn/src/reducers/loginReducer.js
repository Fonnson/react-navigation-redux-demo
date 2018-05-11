import * as type from '../actions/actionType'

const initialAuthState = {
    status: "未登录",
    isLoggedIn: false,
    user: {},
};

export const login = function (state = initialAuthState, action) {
    switch (action.type) {
        case type.LOGINING:
            return {
                ...state,
                status: "登录中",
                isLoggedIn: false,
            };
        case type.LOGIN_SUCCESS:
            return {
                ...state,
                status: "登陆成功",
                isLoggedIn: true,
                user: {name: "张三", age: 24}
            };
        case type.LOGIN_ERROR:
            return {
                ...state,
                status: "登录失败",
                isLoggedIn: false
            };
        case type.LOGOUT:
            return {
                ...state,
                status: "未登录",
                isLoggedIn: false
            };
        default:
            return state;
    }
}