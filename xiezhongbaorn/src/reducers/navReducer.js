import {NavigationActions} from 'react-navigation';
import {AppNavigator} from '../navigators/AppNavigator';
import * as type from '../actions/actionType'

// Start with two routes: The Main screen, with the Login screen on top.
const firstAction = AppNavigator.router.getActionForPathAndParams('Main');//根据节点名获取行动
const tempNavState = AppNavigator.router.getStateForAction(firstAction);//根据行动获取state

const secondAction = AppNavigator.router.getActionForPathAndParams('Login');//根据节点名获取行动
const initialNavState = AppNavigator.router.getStateForAction(//设置初始state
    secondAction,//打开第二个页面
    tempNavState//缓存state? 登陆页面按返回键，跳回主界面
);

/**
 * 如何操作页面由返回的state决定
 * @param state 决定对页面的操作，如打开制定页面，或返回上一层
 * @param action 用来取出行动类型
 * @returns {*|{changed}|{}|{isDrawerOpen}|{isTransitioning, index, routes}|{isTransitioning}}
 */

export const nav = function (state = initialNavState, action) {
    let nextState;
    switch (action.type) {
        case type.LOGIN_SUCCESS:
            nextState = AppNavigator.router.getStateForAction(
                NavigationActions.back(),
                state
            );
            break;
        case type.LOGOUT:
            nextState = AppNavigator.router.getStateForAction(
                NavigationActions.navigate({routeName: 'Login'}),
                state
            );
            break;
        default:
            nextState = AppNavigator.router.getStateForAction(action, state);
            break;
    }

    // Simply return the original `state` if `nextState` is null or undefined.
    return nextState || state;
}