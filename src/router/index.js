import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

//解决报错：Error: Redirected when going from “/login“ to “/home“ via a navigation guard.
const originalPush = Router.prototype.push;
Router.prototype.push = function push (location, onResolve, onReject) {
    if (onResolve || onReject)
        return originalPush.call(this, location, onResolve, onReject);
    return originalPush.call(this, location).catch((err) => err);
};

export const constantRoutes = [
    {
        path: '/home',
        name: '首页111',
        //iconCls: 'fa-qq',//图标样式class
        //redirect: '/home',
        // hidden: true,
        component: Layout,
        meta: { title: '首页111', requireAuth: true },
        children: [
            {
                path: 'home',
                component: () => import('@/views/home/index'),
                name: 'myhome',
                meta: { title: '首页222', requireAuth: true }
            },
            {
                path: 'home2',
                component: () => import('@/views/home/index'),
                name: 'myhome2',
                meta: { title: '首页333', requireAuth: true }
            }
        ]

    },
    {
        path: '/login',
        name: 'login',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "about" */ '../views/Login/Index.vue')
    }
]

const createRouter = () => new Router({
    //mode: 'history', // require service support
    scrollBehavior: () => ({ y: 0 }),
    routes: constantRoutes
})

const router = createRouter()

export function getRouters (params) {
    var f = item => {

        if (item['children']) {
            item['children'] = item['children'].filter(f);
            return true;
        } else if (item['IsButton']) {
            return item['IsButton'] === false;
        } else {
            return true;
        }

    }

    params = params.filter(f);
    return params;
}

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter () {
    const newRouter = createRouter()
    router.matcher = newRouter.matcher // reset router
}

export default router
