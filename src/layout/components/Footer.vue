<template>
	<div class="footer flexwrap flex-cc">
		<router-link to="/" class="logo">
			<img :src="static_media.img01">
		</router-link>
		<div class="friends-link flexwrap flex-cc">
			<div class="item text">
				FAQ
			</div>
			<div class="item text">
				doc
			</div>
			<div class="item">
				<img :src="static_media.img02">
			</div>
			<div class="item">
				<img :src="static_media.img03">
			</div>
			<div class="item">
				<img :src="static_media.img04">
			</div>
			<div class="item">
				<img :src="static_media.img05">
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		computed: {
			static_media() {
				return {
					img01: this.$img('logo.png'),
					img02: this.$img('11.png'),
					img03: this.$img('22.png'),
					img04: this.$img('33.png'),
					img05: this.$img('44.png')
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	.footer {
		padding: .75rem 7.85rem 1.92rem;
		background-color: #14121E;
		justify-content: space-between;
		
		.logo {
			padding-left: 1.44rem;
			
			img {
				width: 1.87rem;
				height: .73rem;
			}
		}
		
		.friends-link {
			.item {
				img {
					width: .91rem;
					height: .91rem;
				}
				
				&.text {
					font-size: .31rem;
					color: #5D6E94;
					width: 1.5rem;
					border-radius: .12rem;
					text-align: center;
					cursor: pointer;
					margin-right: .2rem;
					height: .91rem;
					line-height: .91rem;
					font-family: $GBK;
					
					&:hover {
						background-color: #95E8FF;
						color: #14121E;
					}
				}
			}
		}
	}
</style>