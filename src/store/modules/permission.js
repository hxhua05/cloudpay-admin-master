import { constantRoutes } from '@/router'
import { getNavigationBar } from '@/api/user'
import { getRouters } from '@/router'

import Layout from '@/layout'

const _import = require('@/router/_import_' + process.env.NODE_ENV)//获取组件的方法

export function filterAsyncRouter (asyncRouterMap) {
    //先去除null的字段，否则侧边栏会报错
    removeNull(asyncRouterMap)
    //注意这里的 asyncRouterMap 是一个数组
    const accessedRouters = asyncRouterMap.filter(route => {
        if (route.path && !route.IsButton) {
            if (route.path === '/' || route.path === '-') {//Layout组件特殊处理
                route.component = Layout
            } else {
                try {
                    route.component = _import(route.path.replace('/:id', ''))
                } catch (e) {
                    try {
                        route.component = () => import('@/views' + route.path.replace('/:id', '') + '.vue');
                    } catch (error) {
                        console.info('%c 当前路由 ' + route.path.replace('/:id', '') + '.vue 不存在，因此如法导入组件，请检查接口数据和组件是否匹配，并重新登录，清空缓存!', "color:red")
                    }
                }
            }
        }
        if (route.children && route.children.length && !route.IsButton) {
            route.children = filterAsyncRouter(route.children)
        }
        return true
    })

    return accessedRouters
}

function removeNull (option) {
    if (!option) {
        return;
    }
    for (var attr in option) {
        if (option[attr] === null && attr !== 'teacherId') {
            delete option[attr];
            continue;
        }
        if (typeof (option[attr]) == "object") {
            removeNull(option[attr]);
        }
    }
}

var buttonList = [];
export const getButtonList = (routePath, routers) => {
    routers.forEach(element => {
        if (routePath && element.path) {
            let path = routePath.toLowerCase();
            if (element.path && element.path.toLowerCase() === path) {
                buttonList = element.children;
                return;
            } else if (element.children) {
                getButtonList(path, element.children);
            }
        }
    });
    return buttonList;
};

const state = {
    routes: [],
    addRoutes: []
}
// 为什么要写这里呢，因为后面的Sidebar组件与这个环环相扣
const mutations = {
    SET_ROUTES: (state, routes) => {
        // 添加的路由
        state.addRoutes = routes
        // 将vuex中的路由进行更新
        state.routes = constantRoutes.concat(routes)
    }
}

const actions = {
    generateRoutes ({ commit }, params) {
        // return new Promise(resolve => {
        //   let accessedRoutes
        //   // 如果roles包含 'admin' 直接可以全部访问
        //   if (roles.includes('admin')) {
        //     accessedRoutes = asyncRoutes || []
        //   } else {
        //     // 利用 filterAsyncRoutes 过滤出可访问的路由
        //     accessedRoutes = filterAsyncRoutes(asyncRoutes, roles)
        //   }
        //   // 保存可访问的路由到store中
        //   commit('SET_ROUTES', accessedRoutes)
        //   resolve(accessedRoutes)
        // })
        return new Promise((resolve, reject) => {
            getNavigationBar(params).then(res => {
                //console.log(JSON.stringify(res.response))
                const { children } = res.response
                let accessedRoutes = filterAsyncRouter(children) //过滤路由
                // 保存可访问的路由到store中
                accessedRoutes = getRouters(accessedRoutes)

                commit('SET_ROUTES', accessedRoutes)
                resolve(accessedRoutes)
            }).catch(error => {
                reject(error)
            })
        })
    }
}

export default {
    namespaced: true,
    state,
    mutations,
    actions
}