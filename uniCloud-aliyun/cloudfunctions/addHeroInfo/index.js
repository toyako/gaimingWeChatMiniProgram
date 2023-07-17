'use strict';
const db = uniCloud.database();

const heroTypeList = ['aqq','awx','iqq','iwx'];
let HeroTypeIndex = 0;
let heroInfo=[];
exports.main = async (event, context) => {
	//event为客户端上传的参数
	// let {heroInfo} = event;
	
	let heroList = await db.collection("hero").limit(300).get();
	let res= await db.collection("heroInfo").add(event)
	//返回
	//返回数据给客户端
	return res
};
