const sendMessage = function(event, data) {
	return JSON.stringify({type: event, ...data})
}

import Cookie from 'js-cookie'
import Utils from '@/utils/utils.js'
import Login from '@/utils/login.js'
import {
		UPLOAD_IPFS
	} from '@/api/index.js'

export default {
	data() {
		return {
			appData: {},
			// 协作完成done
			doneWalltes: [],
			// 签名获取done
			signDoneWalltes: [],
			// txHash
			txHash: null,
			// 广播事件
			timeInterval: null,
			// 手动关闭ws 标识
			closeSocket: false,
			linkCount: 0
		}
	},
	// 页面卸载关闭socket
	onBeforeUnmount() {
		console.log(1)
		this.socket && this.socket.close()
	},
	beforeDestroy() {
		console.log(2)
		this.socket && this.socket.close()
	},
	destroyed() {
		console.log(3)
	},
	methods: {
		makeCloseSocket() {
			this.closeSocket = true
			if (this.socket) {
				this.socket.close()
			}
		},
		reconnet(isFlush = false) {
			if (this.linkCount >= 20) {
				this.makeCloseSocket()
				
				return this.$confirm('link error!', 'tips', {})
					.then(res => {
						this.$router.replace({name: 'mySoulink'})
					})
			}
			this.linkCount ++
			
			this.makeCloseSocket()
			this.socket = null
			
			this.initWebsocket()
		},
		initWebsocket(isFlush = false) {
			// let soulink = 'ff567519-1580-4b79-8575-22ef3bcc2a33',
			let soulink = this.soulink_id,
				sessionid = Cookie.get('sessionid'),
				_this = this
			
			this.closeSocket = false
			this.socket = new WebSocket(`ws://34.173.147.138:8000/ws/soulink/${ soulink }/sessionid/${ sessionid }`)
			
			this.socket.onopen = function(res) {
				if (_this.soulinkDetail.status <= 3) {
					setTimeout(() => {
						_this.loadingInstance.close()
					}, 2000)
				}
				
				console.log('连接成功', res)
			}
			
			this.socket.onerror = function(res) {
				console.log('连接失败', res)
				setTimeout(function() {
					!_this.closeSocket && _this.reconnet()
				}, 5000)
			}
			
			this.socket.onclose = function(res) {
				console.log('连接断开', res)
				setTimeout(function() {
					!_this.closeSocket && _this.reconnet()
				}, 5000)
			}
			
			this.socket.onmessage = function (res) {
				let data = JSON.parse(res.data),
					event = data.type
					
					switch (event) {
						// 建立连接后会自动获得init_soulink事件，包含页面加载所需要的数据
						case 'init_soulink': _this.onInitSoulink(data, isFlush);break;
						// 有钱包进入到soulink的协作。每个页面在界面上增加一个新的钱包地址
						case 'sync_wallet_join': _this.onSyncWalletJoin(data);break;
						// 有钱包点击了done按钮。用来更新每个用户页面上地址前的加载状态。
						case 'sync_click_done': _this.onSyncClickDone(data);break;
						// 内容创作完大家都点了Done。页面进入下一个阶段：status 为1 uploading_ipfs
						case 'sync_status_uploading_ipfs': _this.onSyncStatusUploadingIpfs(data);break;
						// 这个消息是对前端之前发送的 check_upload_ipfs 的回应，如果收到该消息，则该前端负责导出图片并上传 ipfs，并在成功后发送 upload_ipfs_done 消息。
						case 'check_upload_ipfs': _this.onCheckUploadIpfs(data);break;
						// 该消息是对前端发送的 upload_ipfs_done 消息的广播。如果 status = 2 则页面进入下一个阶段。如果 error 则表示 ipfs 上传失败了。
						case 'sync_upload_ipfs_done': _this.onSyncUploadIpfsDone(data);break;
						// 有钱包点击Sign Message后，先向后端获得要签名的内容
						case 'get_message': _this.onSyncGetMessage(data);break;
						// 有钱包点击并完成了签名。更新每个页面中地址前面的加载状态
						case 'sync_click_sign_message': _this.onSyncClickSignMessage(data);break;
						// 用户签名收集完成，通知前端将状态切换为MINTING
						case 'sync_status_sig_done': _this.onSyncStatusSigDone(data);break;
						// 页面在 MINTING 状态，从后端获取到的tx信息，用来作为metamask的发送交易的内容。收到内容后拼接和发送交易的代码参考这一行(见下)， 此时会弹出 metamask 插件提示用户签名并发送交易到区块链上；发送完后监听交易成功或失败，然后将结果通过 mint_done 事件发送给后端
						case 'check_mint': _this.onSyncCheckMint(data);break;
						// 一个用户提交完交易并拿到 tx_hash 之后，会向每个前端广播 tx_hash
						case 'sync_tx_sent': _this.onSyncTxtSend(data);break;
						// 用户完成NFT的铸造（或者失败了）
						case 'sync_mint_done': _this.onSyncMintDone(data);break;
						// 有用户在页面上点击删除一个地址。
						case 'sync_click_remove': _this.onSyncClickRemove(data);break;
						// 有用户修改了图片的内容。
						case 'sync_image_update': _this.onSyncImageUpdate(data);break;
						// 有用户修改了name字段的内容。其它页面收到事件后，加载最新name字段的内容。
						case 'sync_name_update': _this.onSyncNameUpdate(data);break;
						// 有用户对description字段的内容做了修改。
						case 'sync_description_update': _this.onSyncDescriptionUpdate(data);break;
						// 有用户对description字段的内容做了修改。
						case 'sync_external_link_update': _this.onSyncExternalLinkUpdate(data);break;
					}
			}
		},
		// ------------ 通知事件 ----------------
		// soulink初始化，页面数据
		onInitSoulink(data, isFlush = false) {
			this.appData = data
			if (data.wallets) {
				this.wallets = data.wallets
			}
			if (data.ens) {
				this.checkedEns = data.ens
			}
			if (data.pfp && data.pfp.name) {
				this.checkedPfp = data.pfp
			}
			// 此处添加已经done的wallets
			if (data.wallets_done) {
				this.doneWalltes = data.wallets_done
			}
			// 已经获取签名的wallets
			if (data.signed_wallets) {
				this.signDoneWalltes = data.signed_wallets
			}
			// 自己是否已经done
			this.isDone = data.if_clicked_done
			
			console.log('---ws:init_soulink初始化---', this.appData)
			
			!isFlush && setTimeout(() => {
				switch(data.status) {
					case 0: 
						// 图片加载到canvas
						this.initAppCanvas()
						break
					case 1:
						this.onCustomCheckUploadIpfs()
						// 图片加载到canvas
						this.initAppCanvas()
						break
				}	
			}, 700)
					
		},
		// 有人删除了钱包
		onSyncClickRemove(data) {
			let address = this.token
			
			if (data.data == address) {
				// 删除的是我自己就退出
				this.$router.replace({name: 'mySoulink'})
				this.makeCloseSocket()
			} else {
				// 同步删除钱包
				let array = [...this.wallets],	
					index = array.indexOf(data.data)
					
				if (data >= 0) {
					array.splice(index, 1)
				}
			}
		},
		// 有人加入了当前协作
		onSyncWalletJoin(data) {
			let wallet = data.data,
				wallets = this.wallets
				
			if (wallets.indexOf(wallet) == '-1') {
				this.wallets.push(wallet)
			}
		},
		// 有人修改了图片
		onSyncImageUpdate(data) {
			let value = data.data
			this.appData.image = value
			
			_this.fromSVGImage(this.appData.image)
		},
		// 同步名称
		onSyncNameUpdate(data) {
			let value = data.data
			this.appData.name = value
		},
		// 同步desc
		onSyncDescriptionUpdate(data) {
			let value = data.data
			this.appData.description = value
		},
		// 同步link
		onSyncExternalLinkUpdate(data) {
			let value = data.data
			this.appData.external_link = value
		},
		// 同步其他人done
		onSyncClickDone(data) {
			let wallet = data.data,
				wallets = this.doneWalltes
				
			if (wallets.indexOf(wallet) == '-1') {
				this.doneWalltes.push(wallet)
			}
		},
		// 签名done的用户
		onSyncClickSignMessage(data) {
			let wallet = data.data,
				wallets = this.signDoneWalltes
				
			if (wallets.indexOf(wallet) == '-1') {
				this.signDoneWalltes.push(wallet)
			}
		},
		// 所有人都done了
		onSyncStatusUploadingIpfs(data) {
			console.log(data, 'sync_status_uploading_ipfs: 执行完毕')
			
			this.soulinkDetail.status = data.data
			this.onCheckUploadIpfs()
		},
		// 前端之前发送的 check_upload_ipfs 的回应，如果收到该消息，则该前端负责导出图片并上传 ipfs，并在成功后发送 upload_ipfs_done 消息。
		onCheckUploadIpfs(data) {
			// return
			setTimeout(() => {
				let loading = this.myloading('上传中...')
				let appData = this.appData
				// base64转文件
				var dataURL = this.canvas.toDataURL({
					format: 'png',
				});
				
				var formData = new FormData()
				formData.append('image', Utils.dataURLtoFile(dataURL, 'ceshi'))
				formData.append('name', appData.name)
				formData.append('description', appData.description)
				formData.append('external_link', appData.external_link)
				
				UPLOAD_IPFS(formData)
					.then(res => {
						loading.close()
						this.onUploadIpfsDone(res)
					})
					.then(res => {
						loading.close()
						// this.$message('上传失败')
					})
			}, 3000)
		},
		// ipfs上传完毕
		onSyncUploadIpfsDone(data) {
			console.log(data, 'sync_upload_ipfs_done: 执行完毕')
			
			this.soulinkDetail.status = data.status
			this.soulinkDetail.cid = data.cid
			this.soulinkDetail.meta_image_export_url = data.image_url
		},
		onSyncGetMessage(data) {
			this.getMetamaskSign(data.data)
		},
		// 用户签名收集完成，通知前端将状态切换为MINTING
		onSyncStatusSigDone(data) {
			console.log(data, 'sync_status_sig_done: 执行完毕')
			
			this.soulinkDetail.status = data.data
		},
		// 页面在 MINTING 状态，从后端获取到的tx信息
		async onSyncCheckMint(data) {
			let loading = this.myloading('正在获取数据...')
			try {
				let result = await Login.sendTransaction(data.to, data.data)
				
				// 拿到tx_hash后停止点击
				this.txHash = result.hash
				this.onTxSend(result.hash);
			} catch (e) {
				console.log('---mint授权失败---', e)
			} finally {
				loading.close()
			}
			
		},
		onSyncTxtSend(data) {
			// timeInterval
			this.txHash = data.data
			
			this.timeInterval = setInterval(() => {
					this.onCheckTx(data.data)
				}, 5000)
		},
		onSyncMintDone(data) {
			if (data.error) {
				// 失败
				this.txHash = null
				this.timeInterval && clearInterval(this.timeInterval)
				
				this.$message(data.error)
			} else {
				// 成功
				let {tokenid, collection, status} = data
				this.soulinkDetail.tokenid = tokenid
				this.soulinkDetail.collection = collection
				this.soulinkDetail.status = status
			}
		},
		// ------------ 发送事件 ------------
		// status 0 删除协作人
		onWalletsRemove(data) {
			this.$confirm('确认删除该协作者吗', '温馨提示')
				.then(res => {
					res == 'confirm' && this.socket.send(sendMessage('click_remove', {data}))
				})
		},
		// status 0 名称更新
		onNameUpdate() {
			let data = this.appData.name
			
			this.socket.send(sendMessage('name_update', {data}))
		},
		// status 0 介绍更新
		onDescUpdate() {
			let data = this.appData.description
			
			this.socket.send(sendMessage('description_update', {data}))
		},
		// status 0 外链更新
		onLinkUpdate() {
			let data = this.appData.external_link
			
			this.socket.send(sendMessage('external_link_update', {data}))
		},
		// status 0 ens更新
		onEnsUpdate(data) {
			this.socket.send(sendMessage('ens_update', {data}))
			
			setTimeout(() => this.onImageUpdate(), 2000)
		},
		// status 0 pfp更新
		onPfpUpdate(value) {
			let data = {
					image: value.image,
					name: value.name,
					tokenid: value.tokenid
				}
			this.socket.send(sendMessage('pfp_update', {...data}))
			
			setTimeout(() => this.onImageUpdate(), 2000)
		},
		// status 0
		onImageUpdate() {
			let image = this.canvas.toSVG()
			
			this.socket.send(sendMessage('image_update', {data: image}))
		},
		// status 0
		onAppDone() {
			if (this.isDone) return
			
			let address = this.token
			this.socket.send(sendMessage('click_done', {data: address}))
		},
		// status 1，判断是否需要上传ipfs
		onCustomCheckUploadIpfs() {
			this.socket.send(sendMessage('check_upload_ipfs', {}))
		},
		// status 1 ipfs上传成功
		onUploadIpfsDone(data) {
			console.log(data)
			if (!data.error) {
				let data2 = {
					cid: data.cid,
					image_url: data.image_url
				}
				
				this.socket.send(sendMessage('upload_ipfs_done', {...data2}))
			} else {
				this.$message('上传失败')
			}
		},
		// status 2 获取需要签名的信息
		onGetMessage() {
			this.socket.send(sendMessage('get_message', {}))
		},
		// status 2 将getmessage获取的str向metamask获取签名 发送给后端
		onClickSignMessage(signature) {
			this.socket.send(sendMessage('click_sign_message', {data: signature}))
		},
		// status 3 checkmint
		onCheckMint() {
			console.log(this.txHash)
			if (this.txHash) return
			
			this.socket.send(sendMessage('check_mint', {}))
		},
		// status 3 
		onTxSend(tx_hash) {
			console.log(tx_hash)
			this.socket.send(sendMessage('tx_sent', {data: tx_hash}))
		},
		// status 3
		onCheckTx(tx_hash) {
			this.socket.send(sendMessage('check_tx', {data: tx_hash}))
		}
	}
}