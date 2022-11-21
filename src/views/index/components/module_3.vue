<template>
	<div class="wrap">
		<div class="flexwrap ">
			<div class="left">
				<img :src="static_media.img01">
			</div>
			<div class="right">
				<div class="right-row-1">
					What is Soulink?
				</div>
				<div class="right-row-2">
					Soulink creates a brand new experience of collabrative SBT (non-transferabe NFT) 
					minting. By minting a shared experience into SBTs, souls (addresses) demonstrate 
					a two-way relationship of trust. This relationship usually requires a meeting, 
					collaboration or a shared commitment to establish.
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		computed: {
			static_media() {
				return {
					img01: this.$img('index-img-03.png')
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	.wrap {
		margin-top: 2.65rem;
		padding-left: calc(7.5rem - 6.3rem);
		padding-right: calc(8rem - 6.3rem);
		
		.flexwrap {
			width: 100%;
			justify-content: space-between;
		}
	}
	.right {
		width: 12.83rem;
		
		.right-row-1 {
			font-size: .93rem;
			color: white;
			line-height: .93rem;
			font-family: $GBK;
			padding-bottom: .26rem;
			border-bottom: .03rem solid #291E62;
			width: 8.77rem;
		}
		
		.right-row-2 {
			margin-top: .34rem;
			color: #5D6E94;
			font-size: .31rem;
			line-height: .5rem;
			font-family: $GBK;
		}
		
	}
	
	.left {
		padding-top: .95rem;
		width: 9.23rem;
		
		img {
			width: 100%;
		}
	}
</style>