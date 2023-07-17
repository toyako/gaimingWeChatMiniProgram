'use strict';
const db = uniCloud.database();
exports.main = async (event, context) => {
	//event为客户端上传的参数
	let {datas,method} = event;
	method=method||"GET";
	let res
	console.log('event : ', event)
	if(method==='GET'){
		res= await db.collection("hero").get();
	}else{
		res= db.collection("hero").add(datas)
	}
	//返回数据给客户端
	return res
};
