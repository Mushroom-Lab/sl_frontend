<template>
	<view class="container">
		<module-1 />
		<module-2 />
		<module-3 />
		<module-4 />
	</view>
</template>

<script>
	import module_1 from './components/module_1.vue'
	import module_2 from './components/module_2.vue'
	import module_3 from './components/module_3.vue'
	import module_4 from './components/module_4.vue'
	
	export default {
		components: {
			module1: module_1,
			module2: module_2,
			module3: module_3,
			module4: module_4
		}
	}
</script>

<style lang="scss">
	body {
		background: url(/src/assets/img/index-bg-00.png), url(/src/assets/img/index-bg-01.png)
			, url(/src/assets/img/index-bg-02.png), url(/src/assets/img/index-bg-03.png);
		background-position: 10.11rem 0, 0 5.6rem, 0 calc(22.89rem + .6rem + .53rem), 0 calc(35rem + .6rem + .3rem);
		background-size: 17.8rem 10.41rem, 38.4rem 8.83rem, 38.4rem 11.74rem, 38.4rem 11.8rem;
		background-repeat: no-repeat;
		background-color: #14121E;
	}
	
</style>