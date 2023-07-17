<template>
	<view class="container">
		<view class="content">
			<view class="title">
				{{name}}
			</view>
			<view class="item flex_x_around" v-for="(item,index) in list" :key="index" v-if="list.length">
				<view class="platform">{{item.platform}}</view>
				<view class="info">
					<view class="info-title">
						<view>区域</view>
						<view>战力</view>
					</view>
					<view>
						<view>{{item.province}}</view>
						<view>{{item.provincePower}}</view>
					</view>
					<view>
						<view>{{item.city}}</view>
						<view>{{item.cityPower}}</view>
					</view>
					<view>
						<view>{{item.area}}</view>
						<view>{{item.areaPower}}</view>
					</view>
				</view>
			</view>
			<view class="close" @click="close">关闭</view>
		</view>
	</view>
</template>

<script>
	export default{
		data(){
			return{
				
			}
		},
		
		props: {
			list: {
			  type: Array,
			  default: null,
			},
			name:{
				type:String,
				default:""
			},
		},
		methods:{
			close(){
				this.$emit("handelClose");
			},
		}
		
	}
</script>

<style lang="scss" scoped>
.container{
	position: fixed;
	left: 0;
	right: 0;
	top: 0;
	height: 100vh;
	background-color: rgba(0,0,0,0.6);
	z-index: 9998;
	.content{
		position: fixed;
		width: 85%;
		top: 50%;
		left: 50%;
		transform: translate(-50%,-50%);
		border-radius: 10rpx;
		overflow: hidden;
		z-index: 9999;
		background:rgb(236, 249, 255);
		.title{
			text-align: center;
			padding:20rpx;
			// background:#fffbe8;
			// color:#ed6a0c;
			color:rgb(25, 137, 250);
			background:rgb(236, 249, 255);
			font-size: 32rpx;
		}
		.item{
			background:#becbe7;
			margin-bottom:10rpx;
			&:last-child{
				margin:0;
			}
			.platform{
				flex:0 0 25%;
				text-align: center;
				font-size: 26rpx;
			}
			.info{
				flex:0 0 75%;
				>view:nth-child(odd){
					background: #ffe0b2;
				}
				>view:nth-child(even){
					background: #dff0d8;
				}
				>view{
					display: flex;
					flex-flow: row nowrap;
					justify-content: space-around;
					align-items: center;
					view{
						flex:0 0 50%;
					}
				}
				
				.info-title{
					background: #e1bee7 !important;
				}
			}
		}
		.close{
			background: #ff976a;
			padding:18rpx;
			color:#fff;
			text-align: center;
			font-size:29rpx;
		}
	}
}
</style>