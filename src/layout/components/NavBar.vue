<template>
	<div>
		<div class="navbar">
			<div class="wrap flexwrap flex-cc">
				<router-link class="logo" to="/">
					<img :src="static_media.img01">
				</router-link>
				
				<div class="nav-list flexwrap flex-cc" v-if="!token">
					<div class="nav-item">
						FAQ
					</div>
					<div class="nav-item">
						docs
					</div>
					<div class="nav-item" id="login-btn-nav">
						Start App
					</div>
				</div>
				<div class="nav-list flexwrap flex-cc" v-if="token">
					<router-link replace class="nav-item" :to="{name: 'list'}">
						Chainlink Hackathon
					</router-link>
					<router-link replace class="nav-item" :to="{name: 'mySoulink'}">
						My Soulinks
					</router-link>
					<div class="nav-item">
						<el-popover placement="bottom" style="width: 100%;" trigger="click">
						    <template #reference>
						        <span>{{ getToken(token) }}</span>
						    </template>
						    <button @click="logout" class="logout">Disconnect</button>
						</el-popover>
					</div>
				</div>
			</div>
		</div>
		<!-- <div class="placeholder"></div> -->
	</div>
	
</template>

<script>
	import LoginUtils from '@/utils/login.js'
	import {mapGetters} from 'vuex'
	
	export default {
		data() {
			return {
			}
		},
		computed: {
			static_media() {
				return {
					img01: this.$img('logo.png')
				}
			},
			...mapGetters(['token'])
		},
		mounted() {
			// 初始化登录按钮
			LoginUtils.init('login-btn-nav')
		},
		methods: {
			logout() {
				this.$store.dispatch('user/logout')
					.then(res => {
						// console.log(res)
						this.$router.replace({name: 'index'})
						
						setTimeout(() => {
							LoginUtils.init('login-btn-nav')
						}, 2000)
					})
			},
			getToken(token) {
				let str = '',
					str2 = ''
				for (let i in token) {
					if (i < 6) {
						str += token[i]
					} else if (i >= 38) {
						str2 += token[i]
					}
				}
				
				return str + '....' + str2
			}
		}
	}
</script>

<style lang="scss" scoped>
	.placeholder {
		height: 2rem;
	}
	.navbar {
		padding: .6rem 0;
		
		.wrap {
			justify-content: space-between;
			flex-wrap: wrap;
		}
		
		.logo {
			padding-left: calc(9.29rem - 6.3rem);
			width: 1.87rem;
			height: .73rem;
			font-size: 0;
			text-decoration: unset;
			border-width: 0;
			display: block;
			box-sizing: unset;
			
			img {
				width: 100%;
				height: 100%;
			}
		}
		
		.nav-list {
			padding-right: calc(7.92rem - 6.3rem);
			
			.nav-item {
				color: #5D6E94;
				font-size: .31rem;
				padding: .17rem .21rem;
				margin-left: .3rem;
				transition: all .3s ease;
				border-radius: .12rem;
				cursor: pointer;
				text-decoration: unset;
				font-family: $GBK;
				
				&:hover {
					background-color: #95E8FF;
					color: #14121E;
				}
			}
		}
	}
	
	.logout {
		width: 100%;
		font-size: .31rem;
		padding: .17rem .21rem;
		transition: all .3s ease;
		background-color: #14121E;
		color: white;
		border-width: 0;
		outline: none;
		border-radius: .12rem;
		border: 1px solid #14121E;
		transition: all .3s ease;
		cursor: pointer;
		
		&:hover {
			background-color: white;
			color: #14121E;
		}
	}
</style>

<style lang="scss">
	.nav-item {
		span {
			font-family: $GBK;
		}
	}
</style>