<template>
	<div class="main-container">
		<div>
			<nav-bar />
		</div>
		<app-main class="app-main" />
		<div>
			<diy-footer />
		</div>
	</div>
</template>

<script>
	import AppMain from './components/AppMain.vue'
	import NavBar from './components/NavBar.vue'
	import Footer from './components/Footer.vue'
	
	export default {
	    name: 'Layout',
	    components: {
			AppMain,
			NavBar,
			DiyFooter: Footer
		},
	    computed: {},
	    methods: {}
	}
</script>

<style scoped>
	.app-main {
		background-image: url(/src/assets/img/index-bg-04.png);
		background-size: 38.4rem 3.65rem;
		background-repeat: no-repeat;
		background-position: 0 bottom;
	}
</style>