'use strict';
const db = uniCloud.database();

exports.main = async (event, context) => {
	//event为客户端上传的参数
	let {name} = event;
	
	let res= await db.collection("heroInfo").where({
		hero:name
	}).get();
	//返回
	//返回数据给客户端
	if(res.data.length){
		return {
			code:200,
			data:res.data[0]
		}
	}else{
		return res
	}
};
