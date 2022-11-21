<template>
	<div class="wrap">
		<div class="flexwrap">
			<div class="left">
				<div class="left-row-1">
					Why use Soulink?
				</div>
				<div class="left-row-2">
					A soul’s reputation can be accumulated through trust over time. Soulink offers a 
					way to swap trust between souls by co-creating Soulink SBTs. Once you hold these 
					tokens, you can be re-engaged with by other souls in many ways. It will help you open 
					up limitless possibilities in the future.
					<br><br>
					We believe that social network is not all about following someone and reading feed. 
					We should get more meaning out of social engagement: whether with a real-life friend, a 
					teammate for a game, a stranger in the metaverse, or a cat (if it comes with an address).
				</div>
			</div>
			<div class="right">
				<img :src="static_media.img01">
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		computed: {
			static_media() {
				return {
					img01: this.$img('index-img-04.png')
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	.wrap {
		margin-top: 3.3rem;
		padding-left: calc(7.77rem - 6.3rem);
		
		.flexwrap {
			width: 100%;
			justify-content: space-between;
		}
	}
	.left {
		width: 14.47rem;
		
		.left-row-1 {
			font-size: .86rem;
			color: white;
			line-height: .86rem;
			font-family: $GBK;
			padding-bottom: .31rem;
			border-bottom: .03rem solid #291E62;
			width: 7.5rem;
		}
		
		.left-row-2 {
			margin-top: .12rem;
			padding-left: .12rem;
			color: #5D6E94;
			font-size: .31rem;
			line-height: .5rem;
			font-family: $GBK;
		}
		
	}
	
	.right {
		width: 10.56rem;
		padding-top: .58rem;
		font-size: 0;
		
		img {
			width: 100%;
		}
	}
</style>