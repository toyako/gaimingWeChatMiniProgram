'use strict';

const db = uniCloud.database();

const heroTypeList = ['aqq', 'awx', 'iqq', 'iwx'];
let HeroTypeIndex = 0;
let timeEnd = 0;
let heroInfo = [];
let heroList = [];
let heroListFirstIndex = 0;
let heroListLastIndex = 5;
let timer;
let heroIndex = 0;
//获取英雄列表
function getHeroList() {
	let res = uniCloud.httpclient.request(`https://www.somekey.cn/mini/hero/getHeroList.php`)
	return new Promise(function(resolve) {
		res.then(ress => {
			let arrayBuffer = ress.res.data
			let unit8Arr = new Uint8Array(arrayBuffer)
			let encodedString = String.fromCharCode.apply(null, unit8Arr)
			let decodedString = decodeURIComponent(escape(encodedString))
			let data = JSON.parse(JSON.stringify(decodedString))
			resolve(data)
		})
	})
};

//请求英雄战力
function getHeroInfo(hero, type) {
	let res = uniCloud.httpclient.request(
		`https://www.sapi.run/hero/select.php?hero=${hero}&type=${type}&msg=见谅每周更新一次全部数据`)
	return new Promise(function(resolve) {
		res.then(ress => {
			let arrayBuffer = ress.res.data
			let unit8Arr = new Uint8Array(arrayBuffer)
			let encodedString = String.fromCharCode.apply(null, unit8Arr)
			let decodedString = decodeURIComponent(escape(encodedString))
			let data = JSON.parse(JSON.stringify(decodedString))
			resolve(JSON.parse(data))
		})
	})
};

//获取英雄战力组
async function getHeroTime(name) {
	let i = HeroTypeIndex;
	if (i >= heroTypeList.length) {
		let heroData = await db.collection("heroInfo").where({
			hero: name
		}).get();
		if (heroData.data.length > 0) {
			// 数据库中存在相关数据
			console.log("存在相关数据");
			console.log(heroData.data[0]);
			let updateResult = await db.collection("heroInfo").doc(heroData.data[0]._id).update({
				data: heroInfo,
				update_time: parseInt(new Date().getTime() / 1000)
			});
		} else {
			// 数据库中不存在相关数据
			console.log("不存在相关数据");
			let heroDatas = {
				hero: name,
				data: heroInfo,
				update_time: parseInt(new Date().getTime() / 1000)
			}
			let res = await db.collection("heroInfo").add(heroDatas)
		}
		HeroTypeIndex = 0;
		heroInfo = [];
		return true;
	}

	HeroTypeIndex = HeroTypeIndex + 1;
	let res = await getHeroInfo(name, heroTypeList[HeroTypeIndex-1]);
	heroInfo.push(res.data);
	return await getHeroTime(name);
}

let start = 0; // 起始下标
const count = 5; // 数量
let loopCount = 0; // 循环计数器

async function myFunction(length, list) {
	for (let i = start; i < start + count; i++) {
		console.log(i);

		let heroInfo = await getHeroTime(list[73+loopCount].cname);
		console.log(heroInfo);
		loopCount++;

		if (loopCount >= length) {
			return;
		}
	}

	if (loopCount % count === 0 && loopCount !== 0) {
		console.log('waiting for 5 seconds...');
		await new Promise(resolve => setTimeout(resolve, 5000));
		start += count;
		await myFunction(length, list);
	}
}

exports.main = async (event, context) => {
	let res = await getHeroList().then(async ress => {
		let data = JSON.parse(ress)
		await myFunction(data.data.length, data.data).then(() => {
			console.log('all done');
		}).catch((err) => {
			console.error(err);
		});
	})
	console.log('event : ', event);
	return event;
};