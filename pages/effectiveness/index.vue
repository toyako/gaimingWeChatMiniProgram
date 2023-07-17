<template>
	<view>
		<view class="nav_tab flex_row_wrap">
			<view :class="['nav_btn',tabIndex===index?'active':'']" v-for="(item,index) in navList" :key="index"
				@click="changeTab(index,item.type,item.typeId)">{{item.text}}</view>
		</view>
		<view>
			
		</view>
		<scroll-view scroll-y="true" class="scroll-Y" style="height: 60vh;">
			<view class="flex_row_wrap item-list">
				<view class="item" @click="handelHero(item.cname)"  v-for="(item,index) in heroList" :key="index">
					<view class="flex_y_center">
						<image :src="item.iconUrl" lazy-load :draggable="false"></image>
						<text class="text-view">{{item.cname}}</text>
					</view>
				</view>
			</view>
		</scroll-view>
		
		<!-- <button @click="getHero" type="primary">获取</button> -->
		<heroPop v-if="showHeroPop" :list="heroInfo" :name="heroName" @handelClose="close"></heroPop>
	</view>
</template>

<script>
	import hero from "@/common/heroList.js";
	import heroPop from "@/components/hero-pop/index.vue";
	export default {
		components:{
			heroPop
		},
		data() {
			return {
				navList: [{
					text:'全部',
					type:'all',
				},{
					text:'坦克',
					typeId:3
				},{
					text:'战士',
					typeId:1
				},{
					text:'刺客',
					typeId:4
				},{
					text:'法师',
					typeId:2
				},{
					text:'射手',
					typeId:5
				},{
					text:'辅助',
					typeId:6
				}],
				checkType:'all',
				tabIndex:0,
				showList: [],
				checkList:[],
				heroList:[],
				heroListData:[],
				heroInfo:[],
				heroTypeList:['aqq','awx','iqq','iwx'],
				showHeroPop:false,
				heroName:"",
				HeroTypeIndex:0
			}
		},
		onLoad() {
			this.heroListData=hero.heroList
			this.heroList=hero.heroList
		},
		methods:{
			close(){
				this.showHeroPop=false;
			},
			pushCloud(datas){
				console.log(datas)
				uniCloud.callFunction({
					name:"heroData",
					data:{datas:datas}
				}).then(res=>{
					console.log(res)
				})
			},
			getHeroList(){
				let that = this;
				uni.request({
					url:"https://www.somekey.cn/mini/hero/getHeroList.php",
					success(res) {
						that.pushCloud(res.data.data)
					}
				})
			},
			handelHero(name){
				let that = this;
				that.heroInfo=[];
				that.heroName=name;
				that.HeroTypeIndex=0;
				that.getCloudHeroInfo()
			},
			addHeroInfo(){
				let that = this;
				uniCloud.callFunction({
					name:"addHeroInfo",
					data:{
						hero:that.heroName,
						data:that.heroInfo,
						update_time:parseInt(new Date().getTime()/1000)
					}
				}).then(res=>{
					console.log(res)
				})
			},
			getCloudHeroInfo(){
				let that = this;
				uniCloud.callFunction({
					name:"getHeroInfo",
					data:{name:that.heroName}
				}).then(res=>{
					console.log(res)
					if(res.result.code){
						that.heroInfo=res.result.data.data;
						that.showHeroPop=true;
					}else{
						console.log(res.result)
						that.getHeroInfo()
					}
				})
			},
			getHeroInfo(){
				// ['aqq''awx','iqq','iwx']
				let that = this;
				let i = that.HeroTypeIndex;
				uni.showLoading({
					title:'加载中...',
					mask:true
				})
				if (i >= that.heroTypeList.length) {
					return;
				}
				uni.request({
					// url:"/api/mini/hero/getHeroInfo.php",
					url:"https://www.sapi.run/hero/select.php",
					data:{
						hero:that.heroName,
						type:that.heroTypeList[that.HeroTypeIndex]
					},
					success(res) {
						that.heroInfo.push(res.data.data);
						if (that.heroInfo.length >= that.heroTypeList.length) {
							uni.hideLoading();
							that.showHeroPop=true;
							that.addHeroInfo()
						}
					}
				})
				that.HeroTypeIndex=that.HeroTypeIndex+1;
				that.getHeroInfo();
			},
			changeTab(index,type,id) {
				this.tabIndex = index;
				this.checkType=type
				this.showList=this.type
				if(id){
					this.heroList=this.heroListData.filter(item => item.hero_type===id||item.hero_type2===id );
				}else{
					this.heroList=this.heroListData
				}
				
			},
		}
	}
</script>

<style lang="scss" scoped>
	.nav_tab {
		margin: 20rpx 28rpx;
	}

	.nav_btn {
		border-radius: 10rpx;
		background-color: #ddd;
		padding: 10rpx 25rpx;
		font-size: 30rpx;
		// text-shadow: 0 3rpx 7rpx rgba(228, 188, 153, 0.55);
		box-shadow: 0px 8rpx 20rpx 0px rgba(0, 0, 0, 0.05);
		margin: 16rpx 15rpx;
		&.active {
			background-color: rgb(7, 193, 96);
			color: #fff;
		}
	}
	.item-list{
		justify-content: start;
		.item{
			flex: 0 0 20%;
			image{
				width:100rpx;
				height:100rpx;
			}
		}
	}
</style>
