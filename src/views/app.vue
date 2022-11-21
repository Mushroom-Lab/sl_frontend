<template>
	<div class="container" style="padding-bottom: 5rem;">
		<div class="title">
			Collaborate a New Soulink
		</div>
		<div class="sub-title flexwrap flex-cc">
			Share and Invite Link: <input id="share-content" disabled value="https://soulink.app/link/847ac9ae-4df6-11ed-bdc3-0242ac120002" /> <img :src="static_media.img01" @click="copy">
		</div>
		<div class="flow">
			<div class="flow-item" :class="{act: false}" v-for="(item, index) in statusEnum" :key="index">
				<div v-if="soulinkDetail && index <= soulinkDetail.status">
					<div class="flow-image">
						<img :src="static_media.img03" class="flow-image-icon"><img :src="static_media.img05" class="flow-image-checked">
					</div>
				</div>
				<div v-else>
					<div class="flow-image">
						<img :src="static_media.img02" class="flow-image-icon"><img :src="static_media.img06" class="flow-image-checked">
					</div>
				</div>
				<div class="flow-text">
					{{ item }}
				</div>
			</div>
		</div>
		<!-- 0、1 canvas操作 -->
		<div class="upload-main" v-if="soulinkDetail && [0, 1].indexOf(soulinkDetail.status) >= 0">
			<div class="upload-box" id="canvas-box" @focus="onFocus">
				<canvas id="canvas"></canvas>
			</div>
			<label class="upload-cue">
				Click to upload on image
				<input type="file" @change="onUpload" ref="file" accept="image/x-png" style="width: 0; height: 0; display: none;">
			</label>
		</div>
		<div class="upload-main" v-if="soulinkDetail && [2, 3, 4].indexOf(soulinkDetail.status) >= 0">
			<div class="upload-box" >
				<img :src="soulinkDetail.meta_image_export_url" v-if="soulinkDetail && soulinkDetail.meta_image_export_url" />
			</div>
			<div class="upload-cue" style="font-size: .5rem;">
				Matadata Link: https://ipfs.io/ipfs/{{ soulinkDetail.cid }}/metadata.json
			</div>
		</div>
		<div v-if="soulinkDetail">
			<div class="form flexwrap">
				
				<div class="form-desc">
					<!-- title -->
					<!-- 0、1 状态下协作未done的状态 -->
					<div class="form-desc-title" v-if="[0, 1].indexOf(soulinkDetail.status) >= 0">Waiting for Content Confirmation</div>
					<div class="form-desc-title" v-if="[2].indexOf(soulinkDetail.status) >= 0">Waiting for Mutil-Signatures</div>
					<div class="form-desc-title" v-if="[3].indexOf(soulinkDetail.status) >= 0">Minting</div>
					<div class="form-desc-title" v-if="[4].indexOf(soulinkDetail.status) >= 0">Successfully Soulinked!</div>
					<!-- title -->
					<div class="form-desc-list">
						<div class="form-desc-row" v-for="(item, index) in wallets" :key="index">
							<div v-if="([0, 1].indexOf(soulinkDetail.status) >= 0 && doneWalltes.indexOf(item) >= 0) || ([2].indexOf(soulinkDetail.status) >= 0 && signDoneWalltes.indexOf(item) >= 0) || [3].indexOf(soulinkDetail.status) >= 0">
								<va-progress-circle indeterminate style="width: .6rem; height: .6rem; margin-right: .2rem; color: red;" color="red" />
							</div>
							<div v-if="([0, 1].indexOf(soulinkDetail.status) >= 0 && doneWalltes.indexOf(item) == '-1') || ([2].indexOf(soulinkDetail.status) >= 0 && signDoneWalltes.indexOf(item) == '-1') || soulinkDetail.status == 4">
								<img :src="static_media.img08" class="form-desc-radio">
							</div>
							{{ item }}
							<!-- 只有大家都未done的时候可以删除协作 -->
							<img :src="static_media.img07" class="form-desc-remove" v-if="soulinkDetail.status == 0" @click="onWalletsRemove(item)">
						</div>
					</div>
				</div>
				
				<!-- 0、1 状态下协作未done的状态 -->
				<div class="form-main" v-if="[0, 1].indexOf(soulinkDetail.status) >= 0">
					<div class="form-row">
						<div class="form-label">Name *</div>
						<div class="form-group">
							<div class="form-input">
								<input type="text" name="name" @blur="onNameUpdate" v-model="appData.name">
							</div>
						</div>
					</div>
					<div class="form-row">
						<div class="form-label">Description</div>
						<div class="form-group">
							<div class="form-textarea">
								<textarea name="description" @blur="onDescUpdate" v-model="appData.description"></textarea>
							</div>
						</div>
					</div>
					<div class="form-row">
						<div class="form-label">Extelnal Link</div>
						<div class="form-group">
							<div class="form-input">
								<input type="text" name="extelnal_link" @blur="onLinkUpdate" v-model="appData.external_link">
							</div>
						</div>
					</div>
					<div class="form-row">
						<div class="form-label">ENS</div>
						<div class="form-group">
							<div class="form-select" @click="openSelect_1">
								<span class="form-select-value">{{ checkedEns || '' }}</span><img :src="static_media.img09" class="form-select-icon">
								<div class="form-options" :class="{act: select_1}">
									<div class="form-options-item" 
										v-for="(item, index) in ensList"
										:key="index"
										@click.stop="setSelect_1(item)"
									>
										{{ item }}
									</div>
								</div>
							</div>
						</div>
					</div>
					<div class="form-row">
						<div class="form-label">PFP</div>
						<div class="form-group">
							<div class="form-select" @click="openSelect_2">
								<span class="form-select-value flexwrap flex-cc" v-if="checkedPfp">
									<img :src="checkedPfp.image" style="width: .6rem; height: .6rem; margin-right: .2rem;">{{ checkedPfp.name }}
								</span>
								<span class="form-select-value" v-else></span>
								<img :src="static_media.img09" class="form-select-icon">
								<div class="form-options" :class="{act: select_2}">
									<div class="form-options-item" 
										v-for="(item, index) in pfpList"
										:key="index"
										@click.stop="setSelect_2(item)"
									>
										<img :src="item.image"><span>{{ item.name }}</span>
									</div>
								</div>
							</div>
						</div>
					</div>
					<button class="form-submit-btn" @click="onAppDone" :class="{act: isDone}">
						Done!
					</button>
				</div>
				<div class="sign-message" v-if="soulinkDetail.status == 2">
					<button type="button" class="sign-message-btn" @click="onSignMessage">Sign Message</button>
				</div>
				<div class="sign-message" v-if="soulinkDetail.status == 3">
					<button type="button" class="sign-message-btn" @click="onCheckMint" :disabled="txHash">Mint for Everyone</button>
				</div>
				<div class="sign-message" v-if="soulinkDetail.status == 4" style="flex-wrap: wrap;">
					<div class="share-text">Check on: <img :src="static_media.img11" @click="boadTo" /></div>
					<div class="share-text">Share on: <img :src="static_media.img12" /></div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import Login from '@/utils/login.js'
	import {toRaw} from 'vue'
	import {fabric} from 'fabric'
	import AppMixin from './components/app.js'
	import {mapGetters} from 'vuex'
	import Utils from '@/utils/utils.js'
	import {
			GET_ENS,
			GET_PFP,
			SOULINK_DETAIL,
			UPLOAD_IMAGE
		} from '@/api/index.js'
	
	const statusEnum = {
			'0': 'CREATING_CONTENTS',
			'1': 'UPLOADING_IPFS',
			'2': 'COLLECTING_SIGS',
			'3': 'MINTING',
			// '4': 'SUCCESS'
		}
	
	const defaultBorderStyle = {
		// 操作控件样式
		transparentCorners: false,
		cornerColor: '#86B3FF',
		cornerStrokeColor: 'black',
		borderColor: 'black',
		cornerSize: 12,
		cornerStyle: 'circle',
		borderDashArray: [10, 2, 6],
		selectable: true,
	}
	
	export default {
		components: {
		},
		data() {
			return {
				socket: null,
				// 状态
				statusEnum,
				// select
				select_1: false,
				select_2: false,
				// query参数
				soulink_id: null,
				// soulink信息
				soulinkDetail: null,
				// ens
				ensList: [],
				// pfp
				pfpList: [],
				// 选中的ens
				checkedEns: null,
				// 选中的pfp
				checkedPfp: null,
				// 内容
				wallets: [],
				// canvas
				canvas: null,
				loadingInstance: null,
				// 是否已经done
				isDone: true,
			}
		},
		mixins: [AppMixin],
		computed: {
			...mapGetters(['token']),
			static_media() {
				return {
					img01: this.$img('app/copy.png'),
					img02: this.$img('app/flow-normal.png'),
					img03: this.$img('app/flow-active.png'),
					img05: this.$img('app/flow-success-active.png'),
					img06: this.$img('app/flow-success-normal.png'),
					img07: this.$img('app/remove.png'),
					img08: this.$img('app/selected.png'),
					img09: this.$img('app/select-icon.png'),
					img10: this.$img('app/upload-image.png'),
					img11: this.$img('app/opensea.svg'),
					img12: this.$img('app/bird.svg'),
				}
			}
		},
		mounted() {
			let query = this.$route.query
			if (query.soulink_id) {
				this.soulink_id = query.soulink_id
				this.loadingInstance = this.myloading('加载中...')
				// soulink信息
				this.getSoulinkDetail()
				// 下拉选项ens
				this.getSelectEns()
				// 下拉选项pfp
				this.getSelectPfp()
			}
		},
		
		methods: {
			boadTo() {
				if (this.soulinkDetail) {
					window.open(`https://testnet.rarible.com/token/polygon/${this.soulinkDetail.collection}:${this.soulinkDetail.tokenid}`, '_blank')
				}
			},
			copy() {
				let ele = document.getElementById('share-content')
				ele.select()
				document.execCommand('Copy')
				this.$message('copy success!')
			},
			myloading(text) {
				return this.$loading({
					text,
					background: 'rgba(0, 0, 0, .7)'
				})
			},
			getSoulinkDetail() {
				let soulink_id = this.soulink_id
				
				SOULINK_DETAIL({soulink_id})
					.then(res => {
						this.soulinkDetail = res
						
						this.initAppEvent()
						
						if (this.soulinkDetail.status > 3) {
							this.loadingInstance.close()
						}
					})
			},
			getSelectEns() {
				let address = this.token
				
				GET_ENS({address})
					.then(res => {
						this.ensList = res
					})
			},
			getSelectPfp() {
				let address = this.token
				
				GET_PFP({address})
					.then(res => {
						this.pfpList = res
					})
			},
			initAppEvent() {
				let detail = this.soulinkDetail,
					wsEventStatus = [0, 1, 2, 3]
				
				// soulink状态 0-3时，则建立socket链接
				if (wsEventStatus.indexOf(detail.status) != -1) {
					this.initWebsocket()
				} else {
					// soulink 状态为 4 时 直接展示
					this.wallets = detail.wallets
				}
			},
			// 签名
			onSignMessage() {
				// 需要签名的信息
				this.onGetMessage()
			},
			// 初始化canvas
			initAppCanvas() {
				let _this = this,
					image = _this.appData.template_image,
					boxEle = document.getElementById('canvas-box')
				
				console.log(boxEle)
				_this.canvas = new fabric.Canvas('canvas', {
					selection: false,
					centeredRotation: true,
					centeredScaling: true,
					selectable: true,
					width: boxEle.clientWidth,
					height: boxEle.clientHeight,
					uniScaleTransform: true,
					controlsAboveOverlay: true,
					preserveObjectStacking:  true
				})
				
				console.log('---协作canvas初始化---', this.appData)
				// 全局绑定del删除事件
				this.bindGlobalCanvasDel()
				// 设置背景图片
				_this.setBackgroundImage(image)
				if (this.appData.image) {
					_this.fromSVGImage(this.appData.image)
				}
				
				// canvas元素拖拽、缩放、宣传事件
				_this.handleCanvasElementEvent()
			},
			// canvas 元素变化
			handleCanvasElementEvent() {
				let removeTag = document.getElementById('remove-tag'),
					_this = this
				
				this.canvas.on('object:modified', function(e) {
					console.log(e, '任意转换')
					_this.onImageUpdate()
				})
				
				this.canvas.on('selection:cleared', function(e) {
					console.log(e, '选中清空')
					!e.deselected && _this.onImageUpdate()
				})
			},
			// 设置背景图片
			setBackgroundImage(imageUrl) {
				// imageUrl = 'http://test.falsehood.top/img/UPS-%E6%AD%A3%E5%B8%B8.svg'
				let imageObj = new Image()
				imageObj.src = imageUrl + '?t=' + (new Date()).getTime()
				imageObj.onload = () => {
					this.canvas.setBackgroundImage(imageUrl, this.canvas.renderAll.bind(this.canvas), {
						scaleX: this.canvas.width / imageObj.width,
						scaleY: this.canvas.height / imageObj.height,
						left: 0,
						top: 0,
						excludeFromExport: true,
						crossOrigin: 'anonymous'
					})
					
					imageObj.crossOrigin = 'anonymous'
				}
			},
			// 初始化图片
			fromSVGImage(svgImage) {
				let _this = this,
					canvas = toRaw(_this.canvas)
				
				fabric.loadSVGFromString(svgImage, function(obj, opt) {
					if (obj.length) {
						for (let i in obj) {
							let item = obj[i]
							
							if (item.id == 'pfp-text' || item.id == 'ens') {
								item.left = item.left - 100
								item.top = item.top + 7
								item.width = 200
							}
							
							item.set({
								...defaultBorderStyle
							})
							
							canvas.add(item)
						}
					}
					
					// _this.canvas.add(obj)
					canvas.renderAll()
				})
			},
			// canvas 添加图片 
			canvasAddImage(imageUrl, options = {}) {
				// Utils.getBase64(imageUrl)
				// let imageObj = new Image()
				// imageObj.setAttribute('crossOrigin', 'anonymous')
				// imageObj.src = imageUrl
				
				// imageObj.onload = () => {
				// 	// 设置缩放
				// 	let scaleX =  this.canvas.width / drawImage.width,
				// 		scaleY = this.canvas.height / drawImage.height
					
				// 	let scale = 1
				// 	if (scaleX < 1 || scaleY < 1) {
				// 		if (scaleX < scaleX) {
				// 			scale = scaleX
				// 		} else {
				// 			scale = scaleY
				// 		}
				// 	}
					
				// 	var imageInstance = new fabric.Image(imageUrl, {
				// 		top: 0,
				// 		left: 0,
				// 		scaleX: scale,
				// 		scaleY: scale,
				// 		crossOrigin: 'anonymous',
				// 		// 操作控件样式
				// 		...defaultBorderStyle,
				// 		...options
				// 	})
					
				// 	// 不加toraw貌似就是不给缩放和旋转, toRaw貌似是vue自带的获取canvas的原型方法
				// 	toRaw(this.canvas).add(imageInstance).setActiveObject(imageInstance)
				// 	imageObj.setAttribute('crossOrigin', 'anonymous')
				// 	this.canvas.renderAll()
					
				// 	// 通知ws，image发生修改
				// 	this.onImageUpdate()
				// }
				// imageUrl = 'http://test.falsehood.top/img/UPS-%E6%AD%A3%E5%B8%B8.svg'
				fabric.Image.fromURL(imageUrl, (drawImage) => {
						// 设置缩放
						let scaleX =  this.canvas.width / drawImage.width,
							scaleY = this.canvas.height / drawImage.height
						
						let scale = 1
						if (scaleX < 1 || scaleY < 1) {
							if (scaleX < scaleX) {
								scale = scaleX
							} else {
								scale = scaleY
							}
						}
						
						drawImage.set({
							top: 0,
							left: 0,
							scaleX: scale,
							scaleY: scale,
							crossOrigin: 'anonymous',
							// 操作控件样式
							...defaultBorderStyle
						})
						
						// 不加toraw貌似就是不给缩放和旋转, toRaw貌似是vue自带的获取canvas的原型方法
						toRaw(this.canvas).add(drawImage).setActiveObject(drawImage)
						
						this.canvas.renderAll()
						
						// 通知ws，image发生修改
						this.onImageUpdate()
					}, {
						crossOrigin: 'anonymous'
					})
			},
			// 删除指定id元素
			removeCanvasElement(id) {
				const object = this.canvas.getObjects().find((i) => i.id == id);
				console.log('删除id指定元素', object)
				if (object) {
					this.canvas.remove(object)
				}
			},
			// 删除选中元素
			bindGlobalCanvasDel(e) {
				let _this = this
				
				document.addEventListener('keydown', e => {
					const object = _this.canvas.getActiveObject()
					if (e.key == 'Delete' && object) {
						// ens \ pfp 删除
						let id = object.id
						switch(id) {
							case 'ens':
								return
								break
							case 'pfp-text':
								return
								break
							case 'pfp-image':
								return
								break
							default: 
								_this.$confirm('确认删除吗？', '温馨提示', {type: 'warning'})
									.then(res => {
										if (res == 'confirm') {
											_this.canvas.remove(object)
										}
									})
								break
						}
					}
				})
			},
			// 设置ens
			setSelect_1(value) {
				this.checkedEns = value
				
				// 删除之前选择
				this.removeCanvasElement('ens')
				
				// 把值印上去
				var textObj = new fabric.Textbox(value, {
					id: 'ens',
					editable: false,
					width: 200,
					height: 30,
					originY: 'center',
					left: 60,
					top: 35,
					fontFamily: 'GBK',
					fontSize: 20,
					...defaultBorderStyle
				})
				
				toRaw(this.canvas).add(textObj).setActiveObject(textObj)
				this.canvas.renderAll()
				
				this.onEnsUpdate(value)
				this.select_1 = false
			},
			// 设置pfp
			setSelect_2(value) {
				let canvas = toRaw(this.canvas)
				
				this.checkedPfp = value
				// 删除之前选择
				this.removeCanvasElement('pfp-image')
				this.removeCanvasElement('pfp-text')
				
				let {name, image} = value
				
				// 把值印上去
				var textObj = new fabric.Textbox(name, {
					id: 'pfp-text',
					editable: false,
					width: 200,
					// height: 30,
					left: 55,
					top: 24,
					fontFamily: 'GBK',
					fontSize: 20,
					...defaultBorderStyle
				})
				canvas.add(textObj)
				
				let imageObj = new Image()
				imageObj.src = image
				imageObj.onload = () => {
					let scaleX = 30 / imageObj.width,
						scaleY = 30 / imageObj.height
					this.canvasAddImage(image, {id: 'pfp-image', scaleX, scaleY})
				}
				
				this.onPfpUpdate(value)
				this.select_2 = false
			},
			// 打开ens options
			openSelect_1() {
				this.select_1 = !this.select_1
				this.select_2 = false
			},
			// 打开pfp options
			openSelect_2() {
				this.select_2 = !this.select_2
				this.select_1 = false
			},
			// 上传图片 http
			onUpload(e) {
				let image = e.target.files[0],
					formData = new FormData(),
					fileRef = this.$refs['file']
					
				formData.append('image', image)
				fileRef.value = null
				
				let loading = this.myloading('上传中...')
				
				UPLOAD_IMAGE(formData)
					.then(res => {
						let imageUrl = res
						this.canvasAddImage(imageUrl)
						
						setTimeout(function() {
							loading.close()
						}, 500)
					})
					.catch(res => {
						loading.close()
						// this.$message('上传失败')
					})
			},
			// meta mask 携带message获取签名
			async getMetamaskSign(message) {
				let signature = await Login.getSignature(message)
				this.onClickSignMessage(signature)
			}
		}
	}
</script>

<style lang="scss" scoped>
	#remove-tag {
		font-size: 30px;
		color: black;
		position: absolute;
		left: 0;
		top: 0;
		display: none;
	}
	div {
		font-family: $GBK;
	}
	.title {
		font-size: 1.10rem;
		color: white;
		text-align: center;
		margin-top: 2.4rem;
		font-family: $GBK;
	}
	
	.sub-title {
		margin-top: .72rem;
		font-size: .4rem;
		color: white;
		justify-content: center;
		font-family: $GBK;
		
		input {
			font-size: .4rem;
			color: white;
			justify-content: center;
			font-family: $GBK;
			border-width: 0;
			outline: none;
			background-color: transparent;
			width: 12rem;
			margin-left: .12rem;
		}
		
		img {
			margin-left: .12rem;
			cursor: pointer;
		}
	}
	
	.flow {
		display: flex;
		align-items: center;
		justify-content: center;
		margin-top: 1.8rem;
		
		.flow-item {
			margin: 0 .8rem;
			
			.flow-image {
				display: flex;
				align-items: center;
				justify-content: center;
				position: relative;
				
				.flow-image-icon {
					width: 2.32rem;
					height: 2.48rem;
				}
				
				.flow-image-checked {
					width: .8rem;
					height: .8rem;
					position: absolute;
					top: 50%;
					right: -.6rem;
					margin-top: -.4rem;
				}
			}
			
			.flow-text {
				text-align: center;
				color: white;
				font-size: .3rem;
				margin-top: .1rem;
			}
			
			&.act {
				.flow-text {
					color: #5F89E2;
				}
			}
		}
	}
	
	.upload-main {
		width: 32rem;
		height: 21.2rem;
		background: url(/src/assets/img/app/upload-image.png);
		background-repeat: no-repeat;
		background-size: 100% 100%;
		background-position: center center;
		flex-flow: column;
		align-items: center;
		justify-content: center;
		display: flex;
		margin: -1.75rem auto 0;
		
		.upload-box {
			width: 12.36rem;
			height: 12.36rem;
			background-color: #f1f1f1;
			margin-top: -.4rem;
			margin-left: -.8rem;
			position: relative;
			
			img {
				width: 100%;
				height: 100%;
			}
			
			
		}
		
		.upload-cue {
			font-size: .6rem;
			color: #5F89E2;
			text-align: center;
			margin-top: .5rem;
			cursor: pointer;
			font-family: $GBK;
		}
	}

	.form {
		display: flex;
		align-items: flex-start;
		margin-top: -2rem;
		margin: -2rem 5.24rem 0;
		
		.form-desc {
			width: 16rem;
			
			.form-desc-title {
				font-size: .77rem;
				color: #86B3FF;
				text-align: center;
			}
			
			.form-desc-list {
				margin-top: .8rem;
				
				.form-desc-row {
					padding: .43rem 0;
					display: flex;
					justify-content: center;
					align-items: center;
					font-size: .42rem;
					color: white;
					border-bottom: 2px solid;
					border-image-source: linear-gradient(to right, transparent, white, transparent);
					border-image-slice: 1;
					
					.form-desc-radio {
						width: .58rem;
						height: .58rem;
						margin-right: .24rem;
					}
					
					.form-desc-remove {
						width: .19rem;
						height: .23rem;
						margin-left: .72rem;
						cursor: pointer;
					}
				}
			}
		}
		.sign-message {
			width: 10.08rem;
			display: flex;
			justify-content: center;
			padding-top: 3rem;
			
			button {
				width: 100%;
				height: 1.09rem;
				box-sizing: border-box;
				border: 1px solid #BCD5FF;
				border-radius: .12rem;
				display: flex;
				align-items: center;
				justify-content: center;
				font-family: $GBK;
				color: #BCD5FF;
				background-color: transparent;
				font-size: .42rem;
				margin-top: 1.3rem;
				cursor: pointer;
				
				&.act {
					filter: grayscale(100%);
					-webkit-filter: grayscale(100%);
				}
			}
			
			.share-text {
				box-sizing: border-box;
				padding-left: 1rem;
				width: 100%;
				font-size: .6rem;
				color: #BCD5FF;
				margin-bottom: .8rem;
				display: flex;
				align-items: center;
				
				img {
					width: .8rem;
					margin-left: .3rem;
					cursor: pointer;
				}
			}
		}
		.form-main {
			width: calc(100% - 16rem - 30px);
			
			.form-row {
				margin-bottom: .2rem;
				
				.form-label {
					font-size: .47rem;
					color: white;
					text-indent: .05rem;
				}
				
				.form-group {
					margin-top: .2rem;
					width: 10.08rem;
					
					.form-input {
						width: 100%;
						height: 1.07rem;
						background-color: white;
						border-radius: .12rem;
						overflow: hidden;
						
						input {
							width: 100%;
							height: 100%;
							border-width: 0;
							font-size: .4rem;
							box-sizing: border-box;
							padding: 0 .2rem;
							color: #14121E;
							font-family: $GBK;
						}
					}
					
					.form-textarea {
						width: 100%;
						height: 2rem;
						background-color: white;
						border-radius: .12rem;
						overflow: hidden;
						
						textarea {
							width: 100%;
							height: 100%;
							border-width: 0;
							font-size: .4rem;
							box-sizing: border-box;
							padding: .2rem;
							color: #14121E;
							font-family: $GBK;
						}
					}
				
					.form-select {
						width: 100%;
						height: 1.07rem;
						background-color: white;
						border-radius: .12rem;
						position: relative;
						cursor: pointer;
						display: flex;
						align-items: center;
						box-sizing: border-box;
						padding: .2rem;
						padding-right: 1rem;
						
						.form-select-value {
							color: #14121E;
							font-size: .4rem;
							font-family: $GBK
						}
						
						img {
							&.form-select-icon {
								position: absolute;
								top: 50%;
								width: .62rem;
								height: .4rem;
								margin-top: -.2rem;
								right: .24rem;
							}
						}
						
						.form-options {
							position: absolute;
							top: 1.07rem;
							left: 0;
							width: 100%;
							background-color: white;
							border-radius: .12rem;
							overflow: hidden;
							visibility: hidden;
							opacity: 0;
							transition: all .2s ease;
							z-index: 10;
							box-shadow: 0 0 .3rem rgba(0, 0, 0, .5);
							
							&.act {
								visibility: visible;
								opacity: 1;
								top: 1.17rem;
							}
							
							.form-options-item {
								width: 100%;
								padding: 0 .2rem;
								box-sizing: border-box;
								height: 1.07rem;
								display: flex;
								align-items: center;
								justify-content: center;
								font-size: .4rem;
								color: #14121E;
								transition: all .3s ease;
								
								&:hover {
									background-color: #f1f1f1;
								}
								
								img {
									width: .6rem;
									height: .6rem;
									margin-right: .2rem;
								}
							}
						}
					}
				}
			}
		}
	
		.form-submit-btn {
			width: 10.08rem;
			height: 1.09rem;
			box-sizing: border-box;
			border: 1px solid #BCD5FF;
			border-radius: .12rem;
			display: flex;
			align-items: center;
			justify-content: center;
			font-family: $GBK;
			color: #BCD5FF;
			background-color: transparent;
			font-size: .42rem;
			margin-top: 1.3rem;
			cursor: pointer;
			
			&.act {
				filter: grayscale(100%);
				-webkit-filter: grayscale(100%);
			}
		}
	}
	
</style>

<style>
	body {
		background: url(/src/assets/img/index-bg-00.png);
		background-position: 10.11rem 0;
		background-size: 17.8rem 10.41rem;
		background-repeat: no-repeat;
		background-color: #14121E;
	}
</style>