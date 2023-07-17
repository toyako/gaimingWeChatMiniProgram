<template>
    <view>
        <view>
            <button class="konbai konbaibutton" type="primary" @tap.stop.prevent="konbaibut">生成空白名</button>
            <!-- <button class='konbai konbaibutton' type='primary' open-type="contact" session-from="weapp" show-message-card="ture" send-message-title='免费获取密钥' send-message-img='/pages/img/kefushou.jpg'>联系客服获取密钥</button> -->
            <button class="konbai konbaibutton" type="primary" open-type="contact">联系客服获取密钥</button>
        </view>
        <view class="gaimingbuju">
            <view v-for="(item, index) in arrayjc" :key="index">
                <view class="gaiming">{{ item }}</view>
            </view>
        </view>
        <view class="remenFuhao">
            <view>热门符号和昵称（长按复制）</view>
            <view class="pailie">
                <view class="gezi" @longpress.stop.prevent="hotText" :data-text="item" v-for="(item, index) in arrayFuhao" :key="index">
                    {{ item }}
                </view>
            </view>
        </view>
        <!-- 弹出输入框 -->
        <view class="toast-box" v-if="ifName" @touchmove.stop.prevent="ture">
            <view class="toastbg"></view>
            <view class="showToast">
                <view class="toast-title">
                    <text>输入密钥解锁空白名</text>
                </view>
                <view class="toast-main">
                    <view class="toast-input">
                        <input placeholder="请输入密钥" @input="setKey" data-name="stuEidtName" />
                    </view>
                </view>
                <view class="toast-button">
                    <button class="button1" hover-class="btn-hover" @tap.stop.prevent="cancel">取消</button>
                    <button class="button2" hover-class="btn-hover" @tap.stop.prevent="matchKey">提交</button>
                </view>
            </view>
        </view>
    </view>
</template>

<script>
// pages/index2/index2.js
var app = getApp();
export default {
    data() {
        return {
            arrayjc: [
                '改名教程(必读)：',
                '①改名需自备改名卡，新开号可直接使用',
                '②进入游戏粘贴出现不相干符号，请重新生成',
                '③进入游戏粘贴提示重复，请重新生成',
                '④重复名、空白名每次生成都不一样',
                '⑤永久解锁空白名功能：请联系客服',
                '⑥好程序乐分享，听说分享的人都已经上荣耀王者了^.^'
            ],
            ifName: false,
            arrayFuhao: [],
            inputKey: ''
        };
    }
    /**
     * 生命周期函数--监听页面加载
     */,
    onLoad: function (options) {
        console.log('index2 onLoad');
        if (!app.globalData.login) {
            console.log('还没登录');
            this.getFuHao(1);
        } else {
            console.log('已经登录');
            this.setData({
                arrayFuhao: app.globalData.arrayFuhao
            });
        }
    },
    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {},
    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {
        console.log('index2 onshow');
        var that = this;
        var timeOut = setTimeout(function () {
            console.log('延迟调用');
            if (that.arrayFuhao.length == 0) {
                console.log('arrayFuhao.length == 0');
                that.setData({
                    arrayFuhao: app.globalData.arrayFuhao
                });
            }
        }, 1000);
    },
    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function () {},
    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function () {},
    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function () {},
    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {},
    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {},
    methods: {
        // 点击空白按钮弹出输入框
        konbaibut: function () {
            var that = this;
            console.log('生成空白名');
            if (app.globalData.hadPermit) {
                console.log('直接进来');
                console.log('有权限，直接复制空白名');
                that.getKongBaiMing();
            } else {
                // uniCloud.callFunction({
                //     name: 'checkUser',
                //     complete: (res) => {
                //         console.log('请求云函数checkUser, res.result.hadPermit=', res.result.hadPermit);
                //         console.log(res.result);
                //         if (res.result.hadPermit) {
                //             app.globalData.hadPermit = true;
                //             console.log('有权限，直接复制空白名');
                //             that.getKongBaiMing();
                //         } else {
                //             // 没有权限
                //             this.setData({
                //                 ifName: true
                //             });
                //         }
                //     }
                // });
            }
        },

        getKongBaiMing: function () {
            var cfm = app.globalData.cfm;
            var abcUnicode = '';
            for (var i = 0; i < 6; i++) {
                abcUnicode = abcUnicode + cfm[Math.floor(Math.random() * cfm.length)];
            }
            console.log(abcUnicode);
            uni.setClipboardData({
                data: abcUnicode,
                success: function (res) {
                    uni.showToast({
                        title: '内容已复制'
                    });
                }
            });
        },

        matchKey: function () {
            const that = this;
            console.log(this.inputKey);
            // uniCloud.callFunction({
            //     data: {
            //         key: that.inputKey
            //     },
            //     name: 'matchKey',
            //     complete: (res) => {
            //         console.log(res.result);
            //         if (res.result.keyMatch) {
            //             //key匹配，设置权限
            //             that.hadPermit = true;
            //             that.setData({
            //                 ifName: false
            //             });
            //         } else {
            //             uni.showToast({
            //                 icon: 'none',
            //                 title: '您输入的密钥有误'
            //             });
            //         }
            //     }
            // });
        },

        setKey: function (e) {
            var val = e.detail.value;
            this.setData({
                inputKey: val
            });
        },

        // 点击取消按钮缩回输入框
        cancel: function () {
            this.setData({
                ifName: false
            });
        },

        hotText: function (e) {
            console.log('点击', e.currentTarget.dataset.text);
            uni.setClipboardData({
                data: e.currentTarget.dataset.text,
                success: function (t) {
                    // wx.showModal({
                    //   title: '昵称已复制',
                    //   content: '请前往游戏内粘贴改名',
                    //   showCancel: false
                    // })
                }
            });
        },

        //获取fuHao
        getFuHao: function (time) {
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
            //             arrayFuhao: app.globalData.arrayFuhao
            //         });
            //     },
            //     fail: (err) => {
            //         if (time < 10) {
            //             that.getFuHao(++time);
            //         } else {
            //             uni.showModal({
            //                 title: '请检查你的网络',
            //                 showCancel: false
            //             });
            //         }
            //     }
            // });
        },

        ture() {
            console.log('占位：函数 ture 未声明');
        }
    }
};
</script>
<style>
/* pages/index2/index2.wxss */

.konbai {
    margin: 25rpx 40rpx;
}

.konbaibutton {
    height: 90rpx;
    font-size: 35rpx;
}

.gaimingbuju {
    margin-top: 70rpx;
}

.gaiming {
    margin: 17rpx 40rpx;
    font-size: 33rpx;
}

.remenFuhao {
    font-size: 37rpx;
    padding: 45rpx 40rpx;
    color: white;
    margin-top: 50rpx;
    height: 1400rpx;
    background-color: #352b50;
}

.pailie {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
}

.gezi {
    height: 40rpx;
    line-height: 40rpx;
    text-align: center;
    overflow: hidden;
    background-color: #374768;
    margin: 10rpx 10rpx 10rpx 0rpx;
    padding: 10rpx 30rpx;
    border-radius: 5px;
    font-size: 30rpx;
}

/* 弹出框 */

.toast-box {
    width: 100%;
    height: 100%;
    opacity: 1;
    position: fixed;
    top: 0rpx;
}

.toastbg {
    opacity: 0.5;
    background-color: black;
    position: absolute;
    width: 100%;
    min-height: 100vh;
}

.showToast {
    position: absolute;
    opacity: 1;
    width: 70%;
    margin-left: 15%;
    margin-top: 50%;
    margin-bottom: 10%;
}

.toast-title {
    padding-left: 5%;
    background-color: #352b50;
    color: white;
    padding-top: 2vh;
    padding-bottom: 2vh;
    border-top-right-radius: 16rpx;
    border-top-left-radius: 16rpx;
    height: 50rpx;
    font-size: 39rpx;
}

.toast-main {
    padding-top: 2vh;
    padding-bottom: 2vh;
    background-color: white;
    text-align: center;
    height: 90rpx;
}

.toast-input {
    margin-left: 5%;
    margin-right: 5%;
    border: 1rpx solid #ddd;
    padding-left: 1vh;
    padding-right: 1vh;
    padding-top: 1vh;
    padding-bottom: 1vh;
    height: 70rpx;
    line-height: 70rpx;
    font-size: 37rpx;
    border-radius: 16rpx;
}

.toast-input input {
    width: 100%;
    height: 100%;
    border-radius: 16rpx;
}

.toast-button {
    display: flex;
    background: white;
    padding-right: 25rpx;
    padding-left: 25rpx;
    padding-bottom: 15rpx;
    border-bottom-left-radius: 16rpx;
    border-bottom-right-radius: 16rpx;
}

.button1 {
    width: 100%;
    font-size: 38rpx;
    background-color: white;
    color: #352b50;
    margin-right: 25rpx;
    border-radius: 16rpx;
    border: 1rpx solid #ddd;
}

.button2 {
    width: 100%;
    font-size: 38rpx;
    background-color: white;
    color: #000;
    margin-left: 25rpx;
    border-radius: 16rpx;
    border: 1rpx solid #ddd;
}

.btn-hover {
    position: relative;
    top: 3rpx;
    box-shadow: 0px 0px 8px #352b50 inset;
}

.picker {
    padding-top: 1vh;
    padding-bottom: 1vh;
}
</style>
