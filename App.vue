<script>
//app.js
export default {
    data() {
        return {};
    },
    onLaunch: function () {
        //云开发初始化
		// const cloud = require('wx-server-sdk')
  //       cloud.init({
  //           env: 'cloud1-0g35tno1d8eeffaa',
  //           traceUser: true
  //       });
		// const openapi = require('mp-cloud-openapi')
		// const openapiWeixin = openapi.initWeixin({
		//   appId: 'cloud1-0g35tno1d8eeffaa',
		//   secret: 'secret'
		// })
    },
    globalData: {
        login: false,
        hadPermit: false,
        cfm: [],
        arrayFuhao: [],
        suiji: []
    }
};
</script>
<style>
page{
	background-color: #f8f8f8;
}
uni-page-head .uni-page-head__title{font-weight: normal;}
image{
	width: 100%;
	height: 100%;
}
.button{
	border-radius: 10rpx;
}
/* flex css */
.flex_x_around {
	display: flex;
	flex-flow: row nowrap;
	justify-content: space-around;
	align-items: center;
}
.flex_x_center {
	display: flex;
	flex-flow: row nowrap;
	justify-content: center;
	align-items: center;
}
.flex_x_start{
	display: flex;
	flex-flow: row nowrap;
	justify-content: flex-start;
	align-items: center;
}
.flex_x_end{
	display: flex;
	flex-flow: row nowrap;
	justify-content: flex-end;
	align-items: center;
}
.flex_y_between {
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	align-items: flex-start;
}
.flex_x_between {
	display: flex;
	flex-flow: row nowrap;
	justify-content: space-between;
	align-items: center;
}
.flex_y_center {
	display: flex;
	flex-flow: column nowrap;
	justify-content: center;
	align-items: center;
}
.flex_row_wrap {
	display: flex;
	flex-direction: row;
	justify-content: flex-start;
	flex-wrap: wrap;
}
</style>

