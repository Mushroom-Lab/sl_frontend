<template>
	<div class="wrap">
		<div class="flexwrap ">
			<div class="left">
				<div class="left-row-1">
					Start a Link, Swap Trust
				</div>
				<div class="left-row-2">
					A dapp for souls to make proof of shared 
					experiences into mutually held SBTs.
				</div>
				<div class="left-btn" id="login-btn-index" v-if="!token">
					Enter Sushi >
				</div>
			</div>
			<div class="right">
				<img :src="static_media.img01">
			</div>
		</div>
	</div>
</template>

<script>
	import LoginUtil from '@/utils/login.js'
	import {mapGetters} from 'vuex'
	
	export default {
		computed: {
			...mapGetters(['token']),
			static_media() {
				return {
					img01: this.$img('index-img-01.png')
				}
			}
		},					
		mounted() {
			// 初始化登录按钮
			LoginUtil.init('login-btn-index')
		}
	}
</script>

<style lang="scss" scoped>
	.wrap {
		padding-left: calc(7.75rem - 6.3rem);
		padding-right: calc(7.92rem - 6.3rem);
		
		.flexwrap {
			width: 100%;
			justify-content: space-between;
		}
	}
	.left {
		width: 9.17rem;
		padding-top: 1.31rem;
		
		.left-row-1 {
			font-size: .9rem;
			color: white;
			line-height: .9rem;
			font-family: $GBK;
		}
		
		.left-row-2 {
			margin-top: .25rem;
			padding-left: .18rem;
			color: #97E8FC;
			font-size: .47rem;
			line-height: .8rem;
			font-family: $GBK;
		}
		
		.left-btn {
			width: 5.35rem;
			height: 1.39rem;
			text-align: center;
			line-height: 1.39rem;
			font-size: .6rem;
			color: #14121E;
			font-family: $GBK;
			background-image: url(/src/assets/img/main-btn.png);
			background-color: transparent;
			background-size: 100% 100%;
			margin-top: .9rem;
			cursor: pointer;
		}
	}
	
	.right {
		width: 10.9rem;
		
		img {
			width: 100%;
		}
	}
</style>