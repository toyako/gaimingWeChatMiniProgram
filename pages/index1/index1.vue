<template>
	<view class="index">
		<view class="nav_tab flex_x_around">
			<view :class="['nav_btn',tabIndex===index?'active':'']" v-for="(item,index) in navList" :key="index"
				@click="changeTab(index)">{{item}}</view>
		</view>
		<view class="tips_text">
			<text>{{utils.filter(tipsList[tabIndex])}}</text>
		</view>
		<view v-if="tabIndex===0">
			<!-- <view clsaa="content">
				<input class="content1 input1" placeholder="随机生成，中文自行修改" placeholder-style="color:#A9A9A9;" :value="input1"
					@longpress="longFun" />
				<button class="content1 button1" type="primary" @tap.stop.prevent="catch1tap">随机生成</button>
			</view> -->
			<view class="repeat">
				<input placeholder="请输入重复的昵称" placeholder-style="color:#A9A9A9;" :value="shuruNu"
					@input="chongfuInput" />
				<!-- <buttonopen-type="share">分享获取重复名</button> -->
				<button @click="catch2tap">重复名生成</button>
				<button @click="chongfuList">重复名生成1</button>
			</view>
		</view>
		<view v-if="tabIndex===1">
			<view clsaa="content">
				<view @click="clickCopyKongbai1" class="btn-kb button">
					<text>王者荣耀空白名 • 点击复制</text>
				</view>
				<view @click="clickCopyKongbai2" class="btn-kb button">
					<text>贵族居中空白名 • 点击复制</text>
				</view>
				<view @click="clickCopyKongbai3" class="btn-kb button">
					<text>QQ微信空白名 • 点击复制</text>
				</view>
				<view class="view_show_magin20">
					<image class="image_demo" mode="widthFix" src="/images/img_kongbai_tip.jpg"></image>
				</view>
			</view>
		</view>
		<view v-if="tabIndex===2">
			<view class="input flex_x_around">
				<input placeholder="请输入重复的昵称" placeholder-style="color:#A9A9A9;" :value="inputmuban"
					v-model="inputmuban" />
				<view @click="characterBtn" class="btn-output">生成</view>
			</view>
			<view @click="clickFuhaoCopy" class="flex_x_between" style="flex-direction:row;"
				v-for="(item,index) in list_muban" :key="index">
				<view class="item-text">
					<text decode>{{item.message}}</text>
				</view>
				<view class="item-textsize">
					<text decode>字数：{{item.size}}{{item.remarks}}</text>
				</view>
			</view>
		</view>
		<view v-if="tabIndex===3">
			<view class="flex_x_around">
				<input v-model="inputlol" class="input-search" name="inputlol" placeholder="请输入网名"
					placeholderStyle="color:#939393" style="color:#383838"></input>
				<view @click="clickOutLOL" class="btn-output">生成</view>
			</view>
			<view @click="clickLOLCopy" class="item-muban flex_x_between" style="flex-direction:row;"
				v-for="(item,index) in list_lol" :key="index">
				<view class="item-text">
					<text decode>{{item.message}}</text>
				</view>
				<view class="item-copy">复制</view>
			</view>
		</view>
	</view>
</template>

<script module="utils" lang="wxs">
	var myFilter = (function(text) {
		if (text) {
			var pattern = "\\\\n";
			var target = "\n";
			var reg = getRegExp(pattern, "g");
			return (text.replace(reg, target))
		}
	});
	module.exports = ({
		filter: myFilter,
	});
</script>

<script>
	//index.js
	//获取应用实例
	var app = getApp();
	export default {
		data() {
			return {
				navList: ['重复名', '空白名', '符号名', '吃鸡lol'],
				tipsList: [
					"①兼容安卓和苹果系统，均可完美显示\n热门五字名容易重复，可尝试安卓专属和备用方案\n②最多5个字符或10个字母数字，如:梦之泪伤66\n③生成的名字各不相同，可搜索ID验证\n④如果提示重复了，请逐个复制多尝试\n⑤粘贴不了等常见问题，请看使用帮助",
					"①每次点击，都会复制不一样的空白名\n②兼容安卓和苹果系统，均可完美显示\n③王者荣耀空白名，是含有空格的名字\n④贵族居中无空格，大部分已被人使用\n数量少易重复，多尝试运气好可以捡漏\n⑤粘贴不了等常见问题，请看使用帮助"
				],
				tabIndex: 0,
				input1: '',
				shuruNu: '',
				suiji: [],
				cfm: [],
				share: false,
				arrayFuhao: '',
				chongfu: ["⁠", "⁡", "⁢", "⁣"],
				gai_type: 0,
				chongfu_android: ["⁤", "⁥", "⁦", "⁨", "⁩", "⁪", "⁫", "⁬", "⁭", "⁮", "⁯"],
				kbList: [],
				kongge: ["ㅤ", " ", " ", " ", " ", " ", " ", " ", " "],
				list_muban: [],
				inputmuban: "",
				isFilter: true,
				minganStr: "毛泽东-习近平-江泽民-胡锦涛-杨尚昆-李先念-刘少奇-李克强-温家宝-朱镕基-李鹏-赵紫阳-华国锋-周恩来-邓小平-中央-共产党--台独-藏独",
				isShowAdPop: true,
				isShowAllFuhao: true,
				list_lol: [],
				inputlol: "",
			};
		},
		onLoad(options) {
			console.log('index1 onLoad');
			// if (!app.globalData.login) {
			//     console.log('还没登录');
			//     this.getFuHao(1);
			// } else {
			//     console.log('已经登录');
			//     this.setData({
			//         suiji: app.globalData.suiji,
			//         cfm: app.globalData.cfm
			//     });
			// }
		},

		onShareAppMessage(ops) {
			console.log('转发');
			try {
				uni.setStorageSync('share', true);
			} catch (e) {
				console.log('出错了');
			}
		},
		methods: {

			initLOL(t) {
				var a;
				let that = this;
				this.setData({
						isShowAdPop: !1
					}), a = "" == that.inputlol || null == that.inputlol ? "模板" : that.inputlol,
					that.list_lol = [];
				var s = "",
					e = {
						message: s = a + ".",
						size: s.length,
						remarks: ""
					};
				that.list_lol.push(e);
				e = {
					message: s = a + "°",
					size: s.length,
					remarks: ""
				};
				that.list_lol.push(e);
				e = {
					message: s = a + "¨",
					size: s.length,
					remarks: ""
				};
				that.list_lol.push(e);
				e = {
					message: s = a + "⁰",
					size: s.length,
					remarks: ""
				};
				that.list_lol.push(e);
				e = {
					message: s = a + "¹",
					size: s.length,
					remarks: ""
				};
				that.list_lol.push(e);
				e = {
					message: s = a + "²",
					size: s.length,
					remarks: ""
				};
				that.list_lol.push(e);
				e = {
					message: s = a + "³",
					size: s.length,
					remarks: ""
				};
				that.list_lol.push(e);
				e = {
					message: s = a + "`",
					size: s.length,
					remarks: ""
				};
				that.list_lol.push(e);
				e = {
					message: s = a + "'",
					size: s.length,
					remarks: ""
				};
				that.list_lol.push(e);
				e = {
					message: s = a + '"',
					size: s.length,
					remarks: ""
				};
				that.list_lol.push(e);
				e = {
					message: s = a + "·",
					size: s.length,
					remarks: ""
				};
				that.list_lol.push(e);
				e = {
					message: s = a + "º",
					size: s.length,
					remarks: ""
				};
				that.list_lol.push(e);
				e = {
					message: s = a + "。",
					size: s.length,
					remarks: ""
				};
				that.list_lol.push(e);
				e = {
					message: s = a + "、",
					size: s.length,
					remarks: ""
				};
				that.list_lol.push(e);
				e = {
					message: s = a + "_",
					size: s.length,
					remarks: ""
				};
				that.list_lol.push(e);
				e = {
					message: s = a + "⁻",
					size: s.length,
					remarks: ""
				};
				that.list_lol.push(e);
				e = {
					message: s = a + "·",
					size: s.length,
					remarks: ""
				};
				that.list_lol.push(e);
				e = {
					message: s = a + "゛",
					size: s.length,
					remarks: ""
				};
				that.list_lol.push(e);
				e = {
					message: s = "¨" + a + "¨",
					size: s.length,
					remarks: ""
				};
				that.list_lol.push(e);
				e = {
					message: s = "." + a + ".",
					size: s.length,
					remarks: ""
				};
				that.list_lol.push(e);
				e = {
					message: s = "·" + a + "·",
					size: s.length,
					remarks: ""
				};
				that.list_lol.push(e);
				e = {
					message: s = "°" + a + "°",
					size: s.length,
					remarks: ""
				};
				that.list_lol.push(e);
				e = {
					message: s = "º" + a + "º",
					size: s.length,
					remarks: ""
				};
				that.list_lol.push(e);
				e = {
					message: s = "⁰" + a + "⁰",
					size: s.length,
					remarks: ""
				};
				that.list_lol.push(e);
				e = {
					message: s = "¹" + a + "¹",
					size: s.length,
					remarks: ""
				};
				that.list_lol.push(e);
				e = {
					message: s = "_" + a + "_",
					size: s.length,
					remarks: ""
				};
				that.list_lol.push(e);
				e = {
					message: s = "^" + a + "^",
					size: s.length,
					remarks: ""
				};
				that.list_lol.push(e);
				e = {
					message: s = a + "¹²³",
					size: s.length,
					remarks: ""
				};
				that.list_lol.push(e);
				e = {
					message: s = a + "°⁰",
					size: s.length,
					remarks: ""
				};
				that.list_lol.push(e);
				e = {
					message: s = a + "°º⁰",
					size: s.length,
					remarks: ""
				};
				that.list_lol.push(e);
				e = {
					message: s = a + "¨°",
					size: s.length,
					remarks: ""
				};
				that.list_lol.push(e);
				e = {
					message: s = a + "^",
					size: s.length,
					remarks: ""
				};
				that.list_lol.push(e);
				e = {
					message: s = a + "~",
					size: s.length,
					remarks: ""
				};
				that.list_lol.push(e);
				e = {
					message: s = a + ":",
					size: s.length,
					remarks: ""
				};
				that.list_lol.push(e);
				e = {
					message: s = a + ";",
					size: s.length,
					remarks: ""
				};
				that.list_lol.push(e);
				e = {
					message: s = a + "：",
					size: s.length,
					remarks: ""
				};
				that.list_lol.push(e);
				e = {
					message: s = a + "’",
					size: s.length,
					remarks: ""
				};
				that.list_lol.push(e);
				e = {
					message: s = a + "”",
					size: s.length,
					remarks: ""
				};
				that.list_lol.push(e);
				e = {
					message: s = a + "^_^",
					size: s.length,
					remarks: ""
				};
				that.list_lol.push(e), this.setData({
					list_lol: that.list_lol
				});
			},
			clickOutLOL(t) {
				var a = this;
				let that = this;
				if ("" != that.inputlol && null != that.inputlol)
					if (that.isFilter) wx.showToast({
						title: "正在生成，请稍等..",
						icon: "none"
					}), a.initLOL()
				else {
					for (var s = that.minganStr.split("-"), e = that.inputlol, i = 0; i < s
						.length; i++) {
						var n = s[i];
						if (e.indexOf(n) >= 0 && "" != n) return void wx.showToast({
							title: "内容含有敏感信息，请重新输入",
							icon: "none"
						});
					}
					this.initLOL();
				} else this.initLOL();
			},
			clickFuhaoCopy(t) {
				let that = this;
				var a = t.currentTarget.dataset.index;
				wx.setClipboardData({
					data: that.list_muban[a].message,
					success(t) {
						wx.showToast({
							title: "复制成功"
						});
					}
				})
			},
			characterBtn() {
				let that = this;
				var t = this;
				console.log(that.inputmuban)
				if ("" != that.inputmuban && null != that.inputmuban)
					if (that.isFilter) wx.showToast({
						title: "正在生成，请稍等..",
						icon: "none"
					}), t.initMuban();
					else {
						for (var a = that.minganStr.split("-"), s = that.inputmuban, e = 0; e < a
							.length; e++) {
							var i = a[e];
							if (s.indexOf(i) >= 0 && "" != i) return void wx.showToast({
								title: "内容含有敏感信息，请重新输入",
								icon: "none"
							});
						}
						this.initMuban();
					}
				else this.initMuban();
			},

			initMuban(t) {
				var a;
				let that = this;
				console.log(that.inputmuban)
				this.setData({
						isShowAdPop: !1
					}), a = "" == that.inputmuban || null == that.inputmuban ? "模板" : that
					.inputmuban,
					that.list_muban = [];
				var s = "",
					e = {
						message: s = a + "໌້ᮨ",
						size: s.length,
						remarks: ""
					};
				that.list_muban.push(e), s = "";
				console.log(a)
				console.log(e)
				for (var i = 0; i < a.length; i++) s = s + a.charAt(i) + "໌້ᮨ";
				if (e = {
						message: s,
						size: s.length,
						remarks: ""
					}, that.list_muban.push(e), e = {
						message: s = a + "⃨࿚໌້ᮨ",
						size: s.length,
						remarks: ""
					}, that.list_muban.push(e), e = {
						message: s = "ฅ՞" + a + "՞ต",
						size: s.length,
						remarks: ""
					}, that.list_muban.push(e), e = {
						message: s = "ঞ ໌້ᮨ" + a + "꧔ꦿ᭄",
						size: s.length,
						remarks: ""
					}, that.list_muban.push(e), that.isShowAllFuhao) {
					e = {
						message: s = "ৡৢﺴﻬ" + a + "ﺴﻬৡৢ♡",
						size: s.length,
						remarks: ""
					}, that.list_muban.push(e), e = {
						message: s = "এ᭄ꦿ꯭" + a + "এ᭄ꦿ",
						size: s.length,
						remarks: ""
					}, that.list_muban.push(e), e = {
						message: s = "⁵²⁰" + a + "¹³¹⁴",
						size: s.length,
						remarks: ""
					}, that.list_muban.push(e), e = {
						message: s = "⁵²⁰" + a + "₁₃₁₄",
						size: s.length,
						remarks: ""
					}, that.list_muban.push(e), e = {
						message: s = "⁵₂⁰" + a + "¹₃¹₄",
						size: s.length,
						remarks: ""
					}, that.list_muban.push(e), e = {
						message: s = "⁵²º᭄꧁" + a + "꧂¹₃¹₄",
						size: s.length,
						remarks: ""
					}, that.list_muban.push(e), e = {
						message: s = "ঞꕥ᭄" + a + "⁵²⁰ꕥ💕",
						size: s.length,
						remarks: ""
					}, that.list_muban.push(e), e = {
						message: s = "ღ᭄ꦿ °" + a + "এ⁵²º᭄এ💕",
						size: s.length,
						remarks: ""
					}, that.list_muban.push(e), e = {
						message: s = "✎﹏ℳ๓㎕" + a + "ꕥ᭄ 💕",
						size: s.length,
						remarks: ""
					}, that.list_muban.push(e), e = {
						message: s = "̶♡̶ᶠ̶ᶸ̶ᶜ̶ᵏ̶̶" + a + "ᵧ̶ₒ̶ᵤ̶",
						size: s.length,
						remarks: ""
					}, that.list_muban.push(e), e = {
						message: s = "̶♡̶ˡ̶ᵒ̶ᵛ̶ᵉ̶" + a + "ᵧ̶ₒ̶ᵤ̶",
						size: s.length,
						remarks: ""
					}, that.list_muban.push(e), e = {
						message: s = a + "̶₁̶5̶₃̶2̶₁̶0̶₄̶",
						size: s.length,
						remarks: ""
					}, that.list_muban.push(e), e = {
						message: s = "ঞ ໌" + a + "꧔ꦿ᭄²º²¹",
						size: s.length,
						remarks: ""
					}, that.list_muban.push(e), s = "꯭";
					for (var n = 0; n < a.length; n++) s = s + a.charAt(n) + "꯭";
					e = {
						message: s,
						size: s.length,
						remarks: ""
					}, that.list_muban.push(e), s = "꯭";
					for (var h = 0; h < a.length; h++) s = s + a.charAt(h) + "꯭";
					e = {
						message: s += "⸙",
						size: s.length,
						remarks: ""
					}, that.list_muban.push(e), s = "";
					for (var l = 0; l < a.length; l++) s = s + a.charAt(l) + "⃝";
					e = {
						message: s,
						size: s.length,
						remarks: ""
					}, that.list_muban.push(e), s = "";
					for (var o = 0; o < a.length; o++) s = s + a.charAt(o) + "⃞";
					e = {
						message: s,
						size: s.length,
						remarks: ""
					}, that.list_muban.push(e), s = "";
					for (var r = 0; r < a.length; r++) s = s + a.charAt(r) + "꙰";
					e = {
						message: s,
						size: s.length,
						remarks: ""
					}, that.list_muban.push(e), s = "";
					for (var u = 0; u < a.length; u++) s = s + a.charAt(u) + "҈";
					e = {
						message: s,
						size: s.length,
						remarks: ""
					}, that.list_muban.push(e), s = "";
					for (var m = 0; m < a.length; m++) s = s + a.charAt(m) + "̶";
					e = {
						message: s,
						size: s.length,
						remarks: "\n-横杆名\n复制查看"
					}, that.list_muban.push(e), e = {
						message: s = "͡ꦿ໌້۵" + a,
						size: s.length,
						remarks: ""
					}, that.list_muban.push(e), e = {
						message: s = "ℳ₯㎕" + a,
						size: s.length,
						remarks: ""
					}, that.list_muban.push(e), e = {
						message: s = "ღ" + a + "᭄ꦿ°",
						size: s.length,
						remarks: ""
					}, that.list_muban.push(e), e = {
						message: s = "এ゛" + a + "ﻬ",
						size: s.length,
						remarks: ""
					}, that.list_muban.push(e), e = {
						message: s = "☂゛" + a,
						size: s.length,
						remarks: ""
					}, that.list_muban.push(e), e = {
						message: s = "꧁" + a + "꧂",
						size: s.length,
						remarks: ""
					}, that.list_muban.push(e), e = {
						message: s = "ʚ" + a + "ɞ",
						size: s.length,
						remarks: ""
					}, that.list_muban.push(e), e = {
						message: s = "⁰ʚ" + a + "⁰ʚ",
						size: s.length,
						remarks: ""
					}, that.list_muban.push(e), e = {
						message: s = "༺" + a + "༻",
						size: s.length,
						remarks: ""
					}, that.list_muban.push(e), e = {
						message: s = "╰☆" + a + "☆╮",
						size: s.length,
						remarks: ""
					}, that.list_muban.push(e), e = {
						message: s = "╰★" + a + "★╮",
						size: s.length,
						remarks: ""
					}, that.list_muban.push(e), e = {
						message: s = "ㅤ҉" + a + "ㅤ҉",
						size: s.length,
						remarks: ""
					}, that.list_muban.push(e), e = {
						message: s = "★彡" + a + "彡★",
						size: s.length,
						remarks: ""
					}, that.list_muban.push(e), e = {
						message: s = "ꦿ࿙" + a,
						size: s.length,
						remarks: ""
					}, that.list_muban.push(e), e = {
						message: s = "LᎭₑ" + a,
						size: s.length,
						remarks: ""
					}, that.list_muban.push(e), e = {
						message: s = "ℒℴѵℯ" + a,
						size: s.length,
						remarks: ""
					}, that.list_muban.push(e), e = {
						message: s = "______" + a,
						size: s.length,
						remarks: ""
					}, that.list_muban.push(e), e = {
						message: s = a + "ꦿﻬ゛",
						size: s.length,
						remarks: ""
					}, that.list_muban.push(e), e = {
						message: s = a + "ꦿེ๑҉",
						size: s.length,
						remarks: ""
					}, that.list_muban.push(e), e = {
						message: s = a + "ꦿ໊ོﻬ",
						size: s.length,
						remarks: ""
					}, that.list_muban.push(e), e = {
						message: s = a + "ꦿﻬ",
						size: s.length,
						remarks: ""
					}, that.list_muban.push(e), e = {
						message: s = a + "ꦿེᎧ҉",
						size: s.length,
						remarks: ""
					}, that.list_muban.push(e), e = {
						message: s = a + "ꦿེ〄҉",
						size: s.length,
						remarks: ""
					}, that.list_muban.push(e), e = {
						message: s = a + "ꦿེ✇҉",
						size: s.length,
						remarks: ""
					}, that.list_muban.push(e), e = {
						message: s = a + "ꦿེ࿌҉",
						size: s.length,
						remarks: ""
					}, that.list_muban.push(e), e = {
						message: s = a + "ꦿེ๖҉",
						size: s.length,
						remarks: ""
					}, that.list_muban.push(e), e = {
						message: s = a + "ꦿེ๛҉",
						size: s.length,
						remarks: ""
					}, that.list_muban.push(e), e = {
						message: s = a + "ꦿེ໑҉",
						size: s.length,
						remarks: ""
					}, that.list_muban.push(e), e = {
						message: s = a + "ꦿེﻬ҉",
						size: s.length,
						remarks: ""
					}, that.list_muban.push(e), e = {
						message: s = a + "ꦿེۑ҉",
						size: s.length,
						remarks: ""
					}, that.list_muban.push(e), e = {
						message: s = a + "ꦿེ࿐",
						size: s.length,
						remarks: ""
					}, that.list_muban.push(e), e = {
						message: s = "⚡⚡" + a + "⚡⚡",
						size: s.length,
						remarks: ""
					}, that.list_muban.push(e), e = {
						message: s = "᭄ꦿ" + a + "ꦿﻬ",
						size: s.length,
						remarks: ""
					}, that.list_muban.push(e), e = {
						message: s = "橘ꦿ" + a + "ꦿ",
						size: s.length,
						remarks: ""
					}, that.list_muban.push(e), e = {
						message: s = a + "๑҉",
						size: s.length,
						remarks: ""
					}, that.list_muban.push(e), e = {
						message: s = "✎" + a + "๑҉ ",
						size: s.length,
						remarks: ""
					}, that.list_muban.push(e), e = {
						message: s = "এ᭄゛" + a,
						size: s.length,
						remarks: ""
					}, that.list_muban.push(e), e = {
						message: s = "ძ᭄" + a,
						size: s.length,
						remarks: ""
					}, that.list_muban.push(e), e = {
						message: s = "᭄ꦿ" + a,
						size: s.length,
						remarks: ""
					}, that.list_muban.push(e), e = {
						message: s = "এꦿ" + a,
						size: s.length,
						remarks: ""
					}, that.list_muban.push(e), e = {
						message: s = a + "̶͜★⁎",
						size: s.length,
						remarks: ""
					}, that.list_muban.push(e), e = {
						message: s = a + "ﻬق",
						size: s.length,
						remarks: ""
					}, that.list_muban.push(e), e = {
						message: s = "╰⋛" + a + "⋚╯",
						size: s.length,
						remarks: ""
					}, that.list_muban.push(e), e = {
						message: s = "এ᭄ꦿ" + a,
						size: s.length,
						remarks: ""
					}, that.list_muban.push(e), e = {
						message: s = "♛…" + a,
						size: s.length,
						remarks: ""
					}, that.list_muban.push(e), e = {
						message: s = "゛͜✿҉" + a,
						size: s.length,
						remarks: ""
					}, that.list_muban.push(e), e = {
						message: s = "﹎♥" + a,
						size: s.length,
						remarks: ""
					}, that.list_muban.push(e), e = {
						message: s = "✿ོꦿ" + a,
						size: s.length,
						remarks: ""
					}, that.list_muban.push(e), e = {
						message: s = "ॢꦿ᭄" + a,
						size: s.length,
						remarks: ""
					}, that.list_muban.push(e), e = {
						message: s = ".♥" + a,
						size: s.length,
						remarks: ""
					}, that.list_muban.push(e), e = {
						message: s = "™" + a,
						size: s.length,
						remarks: ""
					}, that.list_muban.push(e), e = {
						message: s = "ꦿ᭄" + a,
						size: s.length,
						remarks: ""
					}, that.list_muban.push(e), e = {
						message: s = "ꦿེ๑҉" + a,
						size: s.length,
						remarks: ""
					}, that.list_muban.push(e), e = {
						message: s = "(●—●)" + a,
						size: s.length,
						remarks: ""
					}, that.list_muban.push(e), e = {
						message: s = ".♥.♥." + a,
						size: s.length,
						remarks: ""
					}, that.list_muban.push(e), e = {
						message: s = "ꦿ໊ོﻬ" + a,
						size: s.length,
						remarks: ""
					}, that.list_muban.push(e), s = "ძ";
					for (var d = 0; d < a.length; d++) s = s + a.charAt(d) + "ꦿ";
					e = {
						message: s += "៚",
						size: s.length,
						remarks: ""
					}, that.list_muban.push(e), s = "";
					for (var g = 0; g < a.length; g++) s = s + a.charAt(g) + "ꦿ";
					e = {
						message: s += "゛♥",
						size: s.length,
						remarks: ""
					}, that.list_muban.push(e), e = {
						message: s = "༺·" + a + "·༻",
						size: s.length,
						remarks: ""
					}, that.list_muban.push(e), e = {
						message: s = ".·" + a + ".·",
						size: s.length,
						remarks: ""
					}, that.list_muban.push(e), e = {
						message: s = "◢◤" + a + "◢◤",
						size: s.length,
						remarks: ""
					}, that.list_muban.push(e), e = {
						message: s = "o." + a + ".o",
						size: s.length,
						remarks: ""
					}, that.list_muban.push(e), s = "♡";
					for (var c = 0; c < a.length; c++) s = s + a.charAt(c) + "⇔";
					e = {
						message: s += "♡",
						size: s.length,
						remarks: ""
					}, that.list_muban.push(e), e = {
						message: s = "❤" + a + "❤",
						size: s.length,
						remarks: ""
					}, that.list_muban.push(e), e = {
						message: s = "︻" + a + "▅▆▇◤",
						size: s.length,
						remarks: ""
					}, that.list_muban.push(e), e = {
						message: s = "꧅꧅" + a + "꧅꧅",
						size: s.length,
						remarks: ""
					}, that.list_muban.push(e), e = {
						message: s = "——" + a + "°↘",
						size: s.length,
						remarks: ""
					}, that.list_muban.push(e), e = {
						message: s = "ཊ" + a + "ཊ",
						size: s.length,
						remarks: ""
					}, that.list_muban.push(e), e = {
						message: s = "ㅤ" + a + "ㅤ",
						size: s.length,
						remarks: ""
					}, that.list_muban.push(e), e = {
						message: s = "ㅤㅤㅤ" + a,
						size: s.length,
						remarks: ""
					}, that.list_muban.push(e), e = {
						message: s = a + "ۣۖิ",
						size: s.length,
						remarks: ""
					}, that.list_muban.push(e), e = {
						message: s = "ㅤิۣۖ" + a,
						size: s.length,
						remarks: ""
					}, that.list_muban.push(e), e = {
						message: s = a + "⃕࿙࿚ཻ",
						size: s.length,
						remarks: ""
					}, that.list_muban.push(e), this.setData({
						list_muban: that.list_muban
					});
					console.log(that.list_muban)
				} else this.setData({
					list_muban: that.list_muban
				});
			},
			clickCopyKongbai1(t) {
				let that = this;
				for (var a = 0; a < 1e3; a++) {
					for (var s = "", e = 0; e < 6; e++) {
						var i = 1 + Math.floor(4 * Math.random());
						if (0 == e || 5 == e) {
							var n = Math.floor(4 * Math.random());
							s += that.chongfu[n];
						} else if (e == i) {
							n = Math.floor(4 * Math.random());
							s += that.chongfu[n];
						} else {
							n = Math.floor(9 * Math.random());
							s += that.kongge[n];
						}
					}
					for (var h = !1, l = 0; l < that.kbList.length; l++) console.log("kbList-item:", that
							.kbList[l]),
						s == that.kbList[l] && (h = !0);
					if (!h) return wx.setClipboardData({
						data: s,
						success(t) {
							wx.showToast({
								title: "复制成功"
							});
						}
					})
				}
			},
			clickCopyKongbai2(t) {
				let that = this;
				for (var a = 0; a < 1e3; a++) {
					var s = "",
						e = 6,
						i = Math.floor(5 * Math.random());
					e = 0 == i ? 4 : 1 == i ? 5 : 6, console.log("nameSize:", e);
					for (var n = 0; n < e; n++) {
						var h = Math.floor(4 * Math.random());
						s += that.chongfu[h];
					}
					for (var l = !1, o = 0; o < that.kbList.length; o++) s == that.kbList[o] && (l = !0);
					if (!l) return wx.setClipboardData({
						data: s,
						success(t) {
							wx.showToast({
								title: "复制成功"
							});
						}
					})
				}
			},
			clickCopyKongbai3(t) {
				wx.setClipboardData({
					data: "ㅤ",
					success(t) {
						wx.showToast({
							title: "复制成功"
						});
					}
				})
			},
			changeTab(index) {
				this.tabIndex = index;
			},
			chongfuList(t) {
				let that = this;
				console.log(that.chongfu)
				console.log(that.gai_type)
				that.nameList = [];
				for (var a = 0; a < 20; a++) {
					for (var s, e = that.shuruNu, i = -1, n = -1, h = -1, l = -1, o =
							"0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz", r = 0, u = 0; u < e
						.length; u++) {
						for (var m = e.charAt(u), d = !1, g = 0; g < o.length; g++) m == o.charAt(g) && (d = !0);
						r += d ? 1 : 2;
					}
					switch (r) {
						case 1:
						case 2:
							l = Math.floor(Math.random() * e.length), h = Math.floor(Math.random() * e.length),
								n = Math.floor(Math.random() * e.length), i = Math.floor(Math.random() * e.length);
							break;

						case 3:
						case 4:
							h = Math.floor(Math.random() * e.length), n = Math.floor(Math.random() * e.length),
								i = Math.floor(Math.random() * e.length);
							break;

						case 5:
						case 6:
							n = Math.floor(Math.random() * e.length), i = Math.floor(Math.random() * e.length);
							break;

						case 7:
						case 8:
							i = Math.floor(Math.random() * e.length);
					}
					s = Math.floor(Math.random() * e.length);
					for (var c = "", _ = 0; _ < e.length; _++) {
						var p = 0;
						for (_ == s && p++, _ == i && p++, _ == n && p++, _ == h && p++, _ == l && p++; p > 0;)
							if (p--,
								1 == that.gai_type) {
								var b = Math.floor(11 * Math.random());
								c += that.chongfu_android[b];
							} else if (2 == that.gai_type) c += "̵";
						else {
							b = Math.floor(4 * Math.random());
							c += that.chongfu[b];
						}
						0 == _ && 2 == that.gai_type ? c = e.charAt(_) + c : c += e.charAt(_);
					}
					for (var k = !1, f = 0; f < that.nameList.length; f++)
						if (c == that.nameList[f].message) {
							k = !0;
							break;
						}
					if (!k) {
						var w = {
							status: 0,
							tip: "",
							message: c
						};
						that.nameList.push(w);
					}
				}
				var z = Math.floor(Math.random() * that.nameList.length),
					v = that.nameList[z].message;
				console.log(v)
				wx.setClipboardData({
					data: v,
					success(t) {}
				})
			},
			// suiji点击事件
			catch1tap() {
				var n = Math.round(Math.random() * (this.suiji.length - 1));
				this.setData({
					input1: this.suiji[n]
				});
			},

			//长按事件，实现复制
			longFun() {
				uni.setClipboardData({
					data: this.input1,
					success(res) {
						uni.showToast({
							title: '内容已复制'
						});
					}
				});
			},

			chongfuInput(e) {
				this.setData({
					shuruNu: e.detail.value
				});
			},

			// cfm点击事件
			catch2tap(t) {
				var shuruNUdata = this.shuruNu;
				var cfm = this.cfm;
				if (shuruNUdata == '') {
					uni.showModal({
						content: '请输入昵称',
						showCancel: false
					});
				} else if (shuruNUdata.length > 5) {
					//输入名字大于等于6，不合法
					uni.showModal({
						content: '输入昵称最长长度不能大于5',
						showCancel: false
					});
				} else {
					var cf = '';
					if (shuruNUdata.length == 1) {
						for (var u = 0; u < 5; u++) {
							cf = cfm[Math.round(Math.random() * (cfm.length - 1))] + cf;
						}
						console.log(cf);
					} else if (shuruNUdata.length == 2) {
						for (var w = 0; w < 4; w++) {
							cf = cfm[Math.round(Math.random() * (cfm.length - 1))] + cf;
						}
						console.log(cf);
					} else if (shuruNUdata.length == 3) {
						for (var x = 0; x < 3; x++) {
							cf = cfm[Math.round(Math.random() * (cfm.length - 1))] + cf;
						}
						console.log(cf);
					} else if (shuruNUdata.length == 4) {
						for (var y = 0; y < 2; y++) {
							cf = cfm[Math.round(Math.random() * (cfm.length - 1))] + cf;
						}
						console.log(cf);
					} else {
						cf = cfm[Math.round(Math.random() * (cfm.length - 1))];
						console.log(cf);
					}

					// var cf = Math.round(Math.random() * (cfm.length - 1))
					//存最终生成的名字
					var chongFuMingInput = '';
					console.log(chongFuMingInput);
					//临时数据，存储shuruNu分割后的字符数组
					var tempInput = this.shuruNu.split('');
					//随机插入点
					var randomInsert = Math.round(Math.random() * (tempInput.length - 1));
					for (var i = 0; i < tempInput.length; i++) {
						if (randomInsert == i) {
							//随机插入点等于当前数组下标，添加随机插入点
							chongFuMingInput = chongFuMingInput + tempInput[i] + cf;
						} else {
							chongFuMingInput = chongFuMingInput + tempInput[i];
						}
					}
					console.log(chongFuMingInput);
					uni.setClipboardData({
						data: chongFuMingInput,
						success(t) {
							uni.showModal({
								title: '重复名已复制',
								content: '请前往游戏内粘贴改名',
								showCancel: false
							});
						}
					});
				}
			},

			//获取fuHao
			getFuHao(time) {
				console.log('调用getFuhao函数, time=', time);
				var that = this;
				// uniCloud.callFunction({
				//     name: 'newUser',
				//     success: (res) => {
				//         app.globalData.login = true;
				//         app.globalData.arrayFuhao = res.result.fuHao.arrayFuhao;
				//         app.globalData.suiji = res.result.fuHao.suiji;
				//         app.globalData.cfm = res.result.fuHao.cfm;
				//         that.setData({
				//             arrayFuhao: app.globalData.arrayFuhao,
				//             suiji: app.globalData.suiji,
				//             cfm: app.globalData.cfm
				//         });
				//     },
				//     fail: (err) => {
				//         if (time < 10) {
				//             that.getFuHao(++time);
				//         } else {
				//             uni.showModal({
				//                 title: '您的网络出了点问题',
				//                 content: '请检查您的网络',
				//                 showCancel: false
				//             });
				//         }
				//     }
				// });
			}
		}
	};
</script>
<style lang="scss" scoped>
	.nav_tab {
		margin: 20rpx 0;
	}

	.nav_btn {
		border-radius: 10rpx;
		background-color: #ddd;
		padding: 10rpx 25rpx;
		font-size: 30rpx;
		// text-shadow: 0 3rpx 7rpx rgba(228, 188, 153, 0.55);
		box-shadow: 0px 8rpx 20rpx 0px rgba(0, 0, 0, 0.05);

		&.active {
			background-color: rgb(7, 193, 96);
			color: #fff;
		}
	}

	.tips_text {
		background: #fff;
		padding: 10rpx;
		border-radius: 10rpx;
		font-size: 28rpx;
		margin: 0 26rpx;
	}

	.btn-kb {
		background-color: rgb(136, 190, 250);
		margin: 20rpx 40rpx;
		height: 90rpx;
		font-size: 35rpx;
		text-align: center;
		line-height: 90rpx;
	}

	.repeat {

		input {
			background-color: rgb(255, 255, 255);
			margin: 20rpx 26rpx;
			height: 95rpx;
			font-size: 32rpx;
			padding: 0 20rpx;
			border: 1rpx solid #eee;
			border-radius: 10rpx;
		}

		button {
			margin: 20rpx 26rpx;
		}
	}

	.input1 {
		background-color: rgb(255, 255, 255);
		height: 70rpx;
		font-size: 11pt;
		text-align: center;
	}

	.text1 {
		font-size: 35rpx;
	}
</style>
