/* Layout */
import Layout from '@/layout/index.vue'

const indexRouter = [
    {
        path: '/',
        component: Layout,
        redirect: '/index',
        admin: false,
        children: [
			{
				path: 'index',
				name: 'index',
				component: () => import('@/views/index/index.vue'),
				meta: { title: 'soulink' }
			},
			{
				path: 'mySoulink',
				name: 'mySoulink',
				component:() => import('@/views/my_soulink.vue'),
				meta: {title: '我的soulink'}
			},
			{
				path: 'list',
				name: 'list',
				component:() => import('@/views/list.vue'),
				meta: {title: '集合'}
			},
			{
				path: 'app',
				name: 'app',
				component:() => import('@/views/app.vue'),
				meta: {title: 'App'}
			}
		]
    },
	{
		path: '/canvas',
		name: 'canvas',
		component:() => import('@/views/canvas.vue'),
		meta: {title: '画板'}
	}
]

export default indexRouter
