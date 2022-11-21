<template>
	<div class="container">
		<div class="table">
			<div class="t-row t-th">
				<div class="t-td">Soulink ID</div>
				<div class="t-td">Status</div>
			</div>
			<div class="t-body">
				<div class="t-row" v-for="(item, index) in soulinkList" :key="index">
					<div class="t-td"><span class="soulink" @click="checkSoulink(item)">{{ item.soulink_id }}</span></div>
					<div class="t-td" :class="`style_${ item.status }`">{{ statusEnum[item.status] }}</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	const statusEnum = {
		'0': 'CREATING_CONTENTS',
		'1': 'UPLOADING_IPFS',
		'2': 'COLLECTING_SIGS',
		'3': 'MINTING',
		'4': 'SUCCESS'
	};
	
	import {mapGetters} from 'vuex'
	import {
			GET_MY_SOULINK,
			SOULINK_DETAIL
		} from '@/api/index.js'
	
	export default {
		data() {
			return {
				soulinkList: [],
				statusEnum
			}
		},
		computed: {
			...mapGetters(['token']),
			static_media() {
				return {
				}
			}
		},
		mounted() {
			this.getMySoulink()
		},
		methods: {
			// 获取 用户 soulink列表
			getMySoulink() {
				let loading = this.$loading({
					text: '加载中',
					background: 'rgba(0, 0, 0, .7)'
				})
				let address = this.token
				GET_MY_SOULINK({address})
					.then(res => {
						
						this.soulinkList = res
						// console.log(this.soulinkList)
						loading.close()
					})
			},
			// 获取当前点击的soulink基本信息
			checkSoulink(value) {
				let soulink_id = value.soulink_id
				
				// SOULINK_DETAIL({soulink_id})
				// 	.then(res => {
				// 		console.log(res)
				// 	})
				this.$router.push({name: 'app', query: {soulink_id: value.soulink_id}})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.container {
		padding-bottom: 10rem;
	}
	
	div {
		font-family: $GBK;
	}
	
	.soulink {
		cursor: pointer;
	}
	
	.table {
		margin: 10rem 7.28rem 0;
		min-height: 9rem;
		
		.t-row {
			display: flex;
			align-items: center;
			
			&.t-th {
				padding-bottom: .88rem;
				border-bottom: 2px solid;
				border-image-source: linear-gradient(to right, transparent, white, transparent);
				border-image-slice: 1;
			}
			
			.t-td {
				text-align: center;
				color: white;
				font-size: .5rem;
				
				&:first-child {
					width: 14rem;
				}
				&:last-child {
					width: 6rem;
				}
				
				&.style_1 {
					color: #2AFF80;
				}
				
				&.style_2 {
					color: #7EB1FF;
				}
			}
		}
		
		.t-body {
			.t-row {
				padding: .58rem 0;
				border-bottom: 2px solid;
				border-image-source: linear-gradient(to right, transparent, white, transparent);
				border-image-slice: 1;
				
				&:last-child {
					border: none;
				}
			}
		}
	}
	
	.paginate {
		justify-content: center;
		
		.page-btn {
			font-size: 0;
			margin: 0 1.08rem;
			
			img {
				width: 1.7rem;
				height: .9rem;
			}
		}
		.page-item {
			width: .32rem;
			height: .32rem;
			font-size: 0;
			margin: 0 .27rem;
			
			img {
				width: 100%;
				height: 100%;
			}
		}
	}
</style>

<style>
	body {
		background: url(/src/assets/img/index-bg-00.png), url(/src/assets/img/my_soulink/bg-01.png);
		background-position: 10.11rem 0, 0 4.28rem;
		background-size: 17.8rem 10.41rem, 38.4rem 9.73rem;
		background-repeat: no-repeat;
		background-color: #14121E;
	}
</style>