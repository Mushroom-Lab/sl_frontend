import { createRouter, createWebHashHistory } from "vue-router";
import indexRouter from './moudle'
import store from '../store/index.js'

const routes = [
    ...indexRouter,
	{ path: '/:pathMatch(.*)', redirect: '/' }
];

export function resetRouter() {
    const newRouter = createRouter()
    router.matcher = newRouter.matcher // reset router
    router.options = newRouter.options
}

const router = createRouter({
    history: createWebHashHistory(),
    routes
});

const whitePath = ['/index']

router.beforeEach((to, from, next) => {
	// throw new Exce
	if (store.getters.token) {
		next()
	} else {
		if (whitePath.indexOf(to.path) !== -1) {
		    next()
		} else {
		    next('/index')
		}
	}
})

export default router;