<template>
	<div class="wrap">
		<div class="flexwrap ">
			<div class="left">
				<div class="left-row-1">
					What is Soulink?
				</div>
				<div class="left-row-2">
					Soulink creates a brand new experience of collabrative SBT (non-transferabe NFT) 
					minting. By minting a shared experience into SBTs, souls (addresses) demonstrate 
					a two-way relationship of trust. This relationship usually requires a meeting, 
					collaboration or a shared commitment to establish.
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
					img01: this.$img('index-img-02.png')
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	.wrap {
		margin-top: 3.3rem;
		padding-left: calc(7.75rem - 6.3rem);
		padding-right: calc(6.55rem - 6.3rem);
		
		.flexwrap {
			width: 100%;
			justify-content: space-between;
		}
	}
	.left {
		width: 13.67rem;
		padding-top: .78rem;
		
		.left-row-1 {
			font-size: .97rem;
			color: white;
			line-height: .97rem;
			font-family: $GBK;
			padding-bottom: .31rem;
			border-bottom: .03rem solid #291E62;
			width: 8.12rem;
		}
		
		.left-row-2 {
			margin-top: .33rem;
			padding-left: .12rem;
			color: #5D6E94;
			font-size: .31rem;
			line-height: .5rem;
			font-family: $GBK;
		}
		
	}
	
	.right {
		width: 9.39rem;
		
		img {
			width: 100%;
		}
	}
</style>