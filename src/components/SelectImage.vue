<template>
	<div class="container">
		<div class="shadow" :class="{act: show}" @click="$emit('close')" />
		<div class="tips select-image" :class="{act: show}">
			<div class="name flexwrap flex-cc">
				<div>select an image module</div>
				<div class="create-btn" @click="doCreate">
					<img :src="static_media.img01">
				</div>
			</div>
			<div class="list">
				<div class="item" :class="{act: checkedTamplate && checkedTamplate.id == item.id}" @click="setTamplate(item)" v-for="(item, index) in list" :key="index">
					<img :src="item.image">
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import {CREATE_SOULINK} from '@/api/index.js'
	
	export default {
		props: {
			show: {
				type: Boolean,
				default: false
			},
			list: {
				type: [Array, Object],
				default: function () {
					return []
				}
			},
			collection: {
				type: String,
				default: ''
			}
		},
		data() {
			return {
				checkedTamplate: null
			}
		},
		computed: {
			static_media() {
				return {
					img01: this.$img('list/select-image.png')
				}
			}
		},
		methods: {
			// 设置当前模板
			setTamplate(value) {
				this.checkedTamplate = value
			},
			// 去创建
			doCreate() {
				if (!this.checkedTamplate) return alert('请选择模板')
				
				let data = {
						collection: this.collection,
						template_id: this.checkedTamplate.id
					},
					_this = this
				
				CREATE_SOULINK(data)
					.then(res => {
						let soulink_id = res
						_this.$router.push({name: 'app', query: {soulink_id: soulink_id}})
					})
				// 
			}
		}
	}
</script>

<style lang="scss" scoped>
	.tips {
		position: fixed;
		left: 50%;
		top: 55%;
		transform: translate(-50%, -50%);
		visibility: hidden;
		transition: all .2s ease;
		overflow: hidden;
		opacity: 0;
		z-index: 20;
		
		&.act {
			visibility: visible;
			opacity: 1;
			top: 50%;
		}
	}
	
	.select-image {
		width: 23rem;
		box-sizing: border-box;
		background-color: #14121E;
		border-radius: .24rem;
		box-shadow: 0 0 .5rem #3D64E5;
		padding: 1.2rem;
		
		.name {
			color: white;
			font-size: .6rem;
			justify-content: space-between;
			font-family: $GBK
		}
		
		.create-btn {
			cursor: pointer;
			
			img {
				width: 3.41rem;
				height: .66rem;
			}
		}
		
		.list {
			margin-top: 1.9rem;
			display: flex;
			align-items: center;
			justify-content: space-between;
			flex-wrap: wrap;
			
			.item {
				margin: 0 .35rem 1.3rem;
				width: 5.6rem;
				height: 4.8rem;
				background-color: #f1f1f1;
				border-radius: .12rem;
				overflow: hidden;
				
				img {
					width: 100%;
					height: 100%;
					object-fit: cover;
				}
				
				&.act {
					box-shadow: 0 0 .5rem #3D64E5;
				}
			}
		}
	}
</style>