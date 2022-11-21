export function dataURLtoFile(dataurl, filename) {
	//将base64转换为文件
	var arr = dataurl.split(","),
		mime = arr[0].match(/:(.*?);/)[1],
		bstr = atob(arr[1]),
		n = bstr.length,
		u8arr = new Uint8Array(n);
	while (n--) {
		u8arr[n] = bstr.charCodeAt(n);
	}
	return new File([u8arr], filename, {
		type: mime,
	});
}

export function getBase64(imgUrl) {
	window.URL = window.URL || window.webkitURL;
	var xhr = new XMLHttpRequest();
	xhr.open("get", imgUrl, true);
	// 至关重要
	xhr.responseType = "blob";
	xhr.onload = function () {
		if (this.status == 200) {
			//得到一个blob对象
			var blob = this.response;
			console.log("blob", blob)
			// 至关重要
			let oFileReader = new FileReader();
			oFileReader.onloadend = function (e) {
				// 此处拿到的已经是 base64的图片了
				let base64 = e.target.result;
				console.log("方式一》》》》》》》》》", base64)
			};
			oFileReader.readAsDataURL(blob);
		}
	}
	xhr.send();
}

export default {
	dataURLtoFile,
	getBase64
}