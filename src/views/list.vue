<template>
	<div class="container">
		<div class="banner">
			<img :src="collection.banner">
		</div>
		<div class="user">
			<div class="user-avatar">
				<img :src="collection.avatar">
			</div>
			<div class="user-info">
				<div class="nickname">{{ collection.name || '--' }}</div>
				<div class="desc">
					{{ collection.description || '--' }}
				</div>
				<div class="user-tags flexwrap flex-cc">
					<div class="user-tags-item">
						#soulinks:{{ collection.num_soulinks || 0 }}
					</div>
					<div class="user-tags-item">
						#collaborators:{{ collection.num_collaborators || 0 }}
					</div>
				</div>
			</div>
		</div>
		<div class="list">
			<div class="item add" @click="selectImage">
				<img :src="static_media.img01">
			</div>
			<div class="item" :class="{act: checkedSoulink && checkedSoulink.soulink_id == item.soulink_id}" v-for="(item, index) in collectionSoulinks" :key="index" @click="setSoulink(item)">
				<img :src="item.meta_image_export_url">
			</div>
		</div>
		<!-- <div class="more">
			继续看更多
			<div>
				<img :src="static_media.img02">
			</div>
		</div> -->
		
		<SelectImage :collection="collectionStr" :list="tamplatesList" :show="showTips" @close="closeTips" />
	</div>
</template>

<script>
	import SelectImageCpt from '@/components/SelectImage.vue'
	import {mapGetters} from 'vuex'
	import {
			GET_COLLECTION,
			GET_SOULINK_IN_COLLECTION,
			GET_TAMPLATES
		} from '@/api/index.js'
	
	export default {
		components: {
			SelectImage: SelectImageCpt
		},
		data() {
			return {
				list: [],
				collectionStr: '0x94D00E30021379939C263f16caEaC6f535688204',
				showTips: false,
				// 当前collection
				collection: {},
				// 当前collection下的soulink
				collectionSoulinks: [],
				// 当前collection下可用的模板
				tamplatesList: []
			}
		},
		computed: {
			...mapGetters(['token']),
			static_media() {
				return {
					img01: this.$img('list/add.png'),
					img02: this.$img('list/more.png')
				}
			}
		},
		mounted() {
		
			this.getCollection()
			this.getSoulinkByCollection()
			this.getTamplateByCollection()
		},
		methods: {
			// 获取collection信息
			getCollection() {
				let collection = this.collectionStr
				
				GET_COLLECTION({collection})
					.then(res => {
						this.collection = res
					})
			},
			// 获取collection下的soilink uuid
			getSoulinkByCollection() {
				let collection = this.collectionStr
				
				GET_SOULINK_IN_COLLECTION({collection})
					.then(res => {
						this.collectionSoulinks = res
						
					})
			},
			// 获得一个collection下所有的模板
			getTamplateByCollection() {
				let collection = this.collectionStr
				
				let loading = this.$loading({
					text: '加载中...',
					background: 'rgba(0, 0, 0, .7)',
				})
				GET_TAMPLATES({collection})
					.then(res => {
						this.tamplatesList = res
						
						loading.close()
					})
			},
			selectImage() {
				this.showTips = true
			},
			closeTips() {
				this.showTips = false
			},
			setSoulink(value) {
				this.$router.push({name: 'app', query: {soulink_id: value.soulink_id}})
			}
		}
	}
</script>

<style lang="scss" scoped>
	div {
		font-family: $GBK;
	}
	.banner {
		height: 8.76rem;
		width: 100%;
		background-color: #f1f1f1;
		
		img {
			width: 100%;
			height: 100%;
		}
	}
	
	.user {
		margin: -1.37rem 8rem 0;
		position: relative;
		z-index: 3;
		
		.user-avatar {
			width: 2.74rem;
			height: 2.74rem;
			border-radius: .12rem;
			box-shadow: 0 0 .2rem #3D64E5;
			overflow: hidden;
			
			img {
				width: 100%;
				height: 100%;
				object-fit: cover;
			}
		}
		
		.user-info {
			padding-left: .3rem;
			
			.nickname {
				margin-top: .15rem;
				font-size: .4rem;
				color: #86B3FF;
				font-family: $GBK;
			}
			
			.desc {
				margin-top: .3rem;
				font-size: .31rem;
				color: white;
				font-family: $GBK;
			}
			
			.user-tags {
				flex-wrap: wrap;
				margin-top: .3rem;
				
				.user-tags-item {
					font-size: .33rem;
					color: white;
					margin-right: .9rem;
					font-family: $GBK;
				}
			}
		}
		
	}

	.list {
		margin: 4.8rem 8rem 0;
		display: flex;
		align-items: center;
		// justify-content: space-between;
		flex-wrap: wrap;
		
		.item {
			width: 6.25rem;
			height: 5.78rem;
			margin-bottom: 2.5rem;
			margin-right: 1.8rem;
			cursor: pointer;
			
			&:nth-child(3n) {
				margin-right: 0;
			}
			
			img {
				width: 100%;
				height: 100%;
			}
			
			&.act {
				
			}
		}
	}

	.more {
		margin-top: 2rem;
		text-align: center;
		background-image: linear-gradient(to bottom, #3D64E5, #86B3FF);
		-webkit-background-clip: text;
		color: transparent;
		font-size: .55rem;
		font-family: $GBK;
		
		div {
			margin-top: .3rem;
			padding-bottom: .5rem;
			font-size: 0;
			cursor: pointer;
			
			img {
				width: .4rem;
				height: .23rem;
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