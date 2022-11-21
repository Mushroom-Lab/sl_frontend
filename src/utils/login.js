import axios from 'axios' 
import '@/assets/js/ethers-5.2.umd.min.js'
import { setToken } from '@/utils/auth.js'
import Store from '@/store/index.js'
import Router from '@/router/index.js'
import { ElLoading } from 'element-plus'

var loadingInstance

const apiRequest = (dataConfig) => {
	const service = axios.create({
	    baseURL: import.meta.env.VITE_BASE_API, // url = base url + request url
	    timeout: 30000 // request timeout
	})
	
	service.interceptors.request.use(
	    config => {
	        return config
	    },
	    error => {
	        console.log(error) 
	        return Promise.reject(error)
	    }
	)
	
	service.interceptors.response.use(
	    response => {
	        return response.data
	    },
	    error => {
	        return Promise.reject(error)
	    }
	)
	
	return service(dataConfig)
}

const requestMessage = (account, chain) =>
	apiRequest({
        url: '/web3_auth/request_message',
        method: 'POST',
        data: {
			address: account,
			chain: chain,
			network: 'evm'
		}
    })

const verifyMessage = (message, signature) =>
	apiRequest({
        url: '/web3_auth/verify_message',
        method: 'POST',
        data: {
			message,
			signature,
			network: 'evm',
		}
    })
	

export const connectToMetamask = async () => {
	const provider = new ethers.providers.Web3Provider(window.ethereum, 'any');

	const [accounts, chainId] = await Promise.all([
		provider.send('eth_requestAccounts', []),
		provider.send('eth_chainId', []),
	]);

	const signer = provider.getSigner();
	return { signer, chain: chainId, account: accounts[0], provider };
};

const handleAuth = async () => {
	// Connect to Metamask
	const { signer, chain, account } = await connectToMetamask();
	// console.log("account:", account, "chain:", chain)

	if (!account) {
		throw new Error('No account found');
	}	
	if (!chain) {
		throw new Error('No chain found');
	}
	const res = await requestMessage(account, chain);
	
	const { message } = await requestMessage(account, chain);
	
	loadingInstance = ElLoading.service({
		text: '登录中...',
		background: 'rgba(0, 0, 0, .7)',
		// spinner: 'svg'
	})
	const signature = await signer.signMessage(message);
	const { user } = await verifyMessage(message, signature);
	loadingInstance.close()
	
	if (user) {
		Store.dispatch('user/login', user)
			.then(() => {
				Router.push('/mySoulink')
			})
	}
	else{
		alert("authentication error")
	}
};


export function init(loginBtnEleId) {
	const elBtnMetamask = document.getElementById(loginBtnEleId);
	if (elBtnMetamask)
		elBtnMetamask.addEventListener('click', async () => {
			handleAuth().catch((error) => {
				if (loadingInstance) loadingInstance.close()
				
				console.log(error)
			});
		});
}

export const getSignature = async message => {
	// message = '0x99ebda58f8ef152465c234c70f518377eed9c2b5e60c0e9f5d1d67879187d421'
	const messageBytes = ethers.utils.arrayify(message);
	const { signer } = await connectToMetamask();
	const signature = await signer.signMessage(messageBytes);
	console.log('message: ', message, 'bytes: ',messageBytes)
	console.log('signature: ', signature)
	return signature
}

export const sendTransaction = async (to, data) => {
	const { provider, signer, chain, account } = await connectToMetamask();
	// console.log(provider, signer, chain, account)
	// console.log('to:', to)
	// console.log('data:', data)
	if (!account) {
		throw new Error('No account found');
	}
	if (!chain) {
		throw new Error('No chain found');
	}
	console.log('sendTransaction 1')
	const txn = await signer.sendTransaction({
		from: account,
		to: to,
		data,
		nonce: await provider.getTransactionCount(account, "latest"),
		gasLimit: 5000000,
	})
	console.log('sendTransaction 2')
	return txn
}

export default {
	init,
	getSignature,
	sendTransaction
}
