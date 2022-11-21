命令行为win下的
在linux和macos下的命令都可自行加上sudo

1、vue无法直接在服务器运行，需在项目根目录（package.json同级）运行npm run build打包项目文件。打包后会在项目根目录出现一个dist文件夹，内为可以运行在服务器上的项目源码
2、项目根目录下 npm run dev 为运行调试模式
3、项目根目录下npm run serve 为运行生产环境，在build后可执行。
4、为防止跨域，需在nginx或apache自行设置跨域proxy，本项目使用的是nginx，跨域规则为location /api { rewrite ^.+api/?(.*)$ /$1 break; proxy_pass http://34.173.147.138:8000; }
5、/src下为项目代码和资源目录
(1)Api 为接口目录
(2)Assets为静态资源
(3)Components为组件插件
(4)Layout为全局挂载组件 如 header 和 footer
(5)Router 为路由文件
(6)Store 为全局状态管理，如 auth 等
(7)Utils 为工具方法
(8)Views为h5页面