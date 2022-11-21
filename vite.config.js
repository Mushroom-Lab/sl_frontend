import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

const px2rem = require('postcss-px2rem')
const postcss = px2rem({
	// 基准大小 baseSize，需要和rem.js中相同
	remUnit: 16
})

const path = require('path')
import { resolve } from 'path' // 主要用于alias文件路径别名

export default defineConfig({
	plugins: [vue()],
	// 是否开启 https
	https: false,
	// 服务端渲染
	ssr: false,
	base: './',
	publicPath: './',
	outDir: 'dist',
    resolve: {
		alias: {
			'@': resolve(__dirname, 'src'),
		},
		extensions: ['.mjs', '.js', '.ts', '.jsx', '.tsx', '.json', '.vue', '.png']
    },
	// 反向代理
	server: {
		// 热更新
		hmr: true,
	    port: 8080,
	    host: "0.0.0.0",
	    // 是否自动在浏览器打开
	    open: true,
	    // 是否开启 https
		https: false,
	    proxy: {
			'/api': {
				target: 'http://34.173.147.138:8000',
				changeOrigin: true,
				rewrite: (path) => path.replace(/^\/api/, ''),
			},
			'/socket.io': {
				target: 'ws://34.173.147.138:8000',
				changeOrigin: true,
				ws: true,
				// rewrite: (path) => path.replace(/^\/socket.io/, ''),
			}
	    },
		fs: {
		    strict: true
		}
	},
	define: {
	    'process.env': {}
	},
	css: {
	    loaderOptions: {
			postcss: {
				plugins: [
					postcss
				]
			}
	    },
		preprocessorOptions: {
			// 全局样式引入
			scss: {
					additionalData: '@import "./src/assets/css/variable.scss";',
					javascriptEnabled: true
			}
		}
	}
})
