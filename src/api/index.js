import request from '@/utils/request'
// 用户的soulink列表
export function GET_MY_SOULINK(params) {
    return request({
        url: '/soulink/get_my_soulinks',
        method: 'GET',
        params
    })
}

// 单个soulink的信息
export function SOULINK_DETAIL(params) {
	return request({
	    url: '/soulink/get_soulink/' + params.soulink_id,
	    method: 'GET'
	})
}

// 获取一个 collection
export function GET_COLLECTION(params) {
	return request({
	    url: '/soulink/get_collection',
	    method: 'GET',
		params
	})
}

// 获得该collection下的所有soulinks，需要分页
export function GET_SOULINK_IN_COLLECTION(params) {
	return request({
	    url: '/soulink/get_soulinks_in_collection',
	    method: 'GET',
		params
	})
}

// 创建一个新的soulink
export function CREATE_SOULINK(data) {
	return request({
	    url: '/soulink/new_soulink',
	    method: 'POST',
		data
	})
}

// 获取一个collection下的所有模板
export function GET_TAMPLATES(params) {
	return request({
	    url: '/soulink/get_templates/' + params.collection,
	    method: 'GET',
	})
}

// 用户上传一张图，返回的url用以在 canvas 中展示
export function UPLOAD_IMAGE(data) {
	return request({
	    url: '/soulink/upload_image',
	    method: 'POST',
		data
	})
}

// 登出
export function LOGOUT(data) {
	return request({
	    url: '/auth/logout',
	    method: 'POST',
		data
	})
}

// 下拉框 ENS
export function GET_ENS(params) {
	return request({
	    url: '/soulink/get_ens',
	    method: 'GET',
		params
	})
}

// 下拉框 PFP
export function GET_PFP(params) {
	return request({
	    url: '/soulink/get_pfp',
	    method: 'GET',
		params
	})
}

// 下拉框 PFP
export function UPLOAD_IPFS(data) {
	return request({
	    url: '/soulink/upload_ipfs',
	    method: 'POST',
		data
	})
}