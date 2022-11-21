<template>
	<router-view v-slot="{ Component }">
		<transition name="fade-transform" mode="out-in">
			<!-- <keep-alive max="5"> -->
				<component :is="Component" />
			<!-- </keep-alive> -->
		</transition>
	</router-view>
</template>

<script>
	export default {
		name: 'AppMain',
		data() {
			return {
				
			}
		}
	}
</script>

<style scoped>
.app-main {
	min-height: calc(100vh - 50px);
	width: 100%;
	position: relative;
	overflow: hidden;
}
.fixed-header+.app-main {
	padding-top: 50px;
}
</style>
