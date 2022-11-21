<template>
	<div class="container" style="padding-bottom: 5rem;">
		<div class="main-box">
			
		</div>
		<div class="loading">
			<!-- <img :src="static_media.img01"> -->
		</div>
		<div class="content">
			<input type="text">
		</div>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		computed: {
			static_media() {
				return {
					// img01: '/src/assets/img/canvas/loading.png'
				}
			}
		}
	}
</script>

<style scoped lang="scss">
	.main-box {
		margin: 3.3rem 3.05rem 0;
		background-color: white;
		border-radius: .12rem;
		height: 17.5rem;
	}
	
	.loading {
		margin-top: 3.25rem;
		display: flex;
		justify-content: center;
		
		img {
			width: 1.91rem;
			// height: 1.81rem;
		}
	}
	
	.content {
		margin: 4.05rem 3.05rem 0;
		height: 2.85rem;
		background-color: white;
		padding: 0 .9rem;
		
		input {
			width: 100%;
			height: 100%;
			border-width: 0;
			outline: none;
			font-size: .9rem;
			font-family: $GBK;
		}
	}
</style>