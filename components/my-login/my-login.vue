<template>
	<view class="login-container">
		<!-- 提示登录的图标 -->
		<uni-icons type="contact-filled" size="100" color="#AFAFAF"></uni-icons>
		
		<!-- 登录按钮 -->
		<!-- 可以从 @getuserinfo 事件处理函数的形参中，获取到用户的基本信息 -->
		<button type="primary" class="btn-login" open-type="getUserInfo" @getuserinfo="getUserInfo">一键登录</button>
		
		<!-- 登录提示 -->
		<view class="tips-text">
			登录后尽享更多权益
		</view>
	</view>
</template>

<script>
	// 1. 按需导入 mapMutations 辅助函数
	import { mapMutations } from "vuex"
	export default {
		name:"my-login",
		data() {
			return {
				
			};
		},
		methods: {
			// 2. 调用 mapMutations 辅助方法，把 m_user 模块中的 updateUserInfo 映射到当前组件中使用
			// 1. 调用 mapMutations 辅助方法，把 m_user 模块中的 updateToken 映射到当前组件中使用
			...mapMutations('m_user', ['updateUserInfo'], ['updateToken']),
			
			// 获取微信用户授权之后的基本信息
			getUserInfo(e){
				// 判断是否获取用户信息成功
				if (e.detail.errMsg === 'getUserInfo:fail auth deny') return uni.$showMsg('您取消了登录授权！')
				
				// 获取用户信息成功， e.detail.userInfo 就是用户的基本信息
				// 3. 将用户的基本信息存储到 vuex 中
				this.updateUserInfo(e.detail.userInfo)
				
				// 获取登录成功后的 Token 字符串
				this.getToken(e.detail)
			},
			
			// 调用登录接口，换取永久的token
			async getToken(info){
				// 调用微信登录接口，获取code对应的值	catch捕获错误
				const [err, res] = await uni.login().catch(err => err)
				
				// 判断是否 uni.login() 调用失败
				if(err || res.errMsg !=='login:ok') return uni.$showMsg('登录失败！')
				// console.log(res)
				// 准备参数对象
				const query = {
					code: res.code,
					encryptedData: info.encryptedData,
					iv: info.iv,
					rawData: info.rawData,
					signature: info.signature
				}
				
				// 换取 token
				const { data: loginResult } = await uni.$http.post('/api/public/v1/users/wxlogin', query)
				// 判断登录情况，失败调用showMsg提示
				if (loginResult.meta.status !== 200) return uni.$showMsg('登录失败！')
				// 登录成功  提示信息
				uni.$showMsg('登录成功')
				console.log(loginResult.meta.status)
				// 2. 更新 vuex 中的 token
				this.updateToken('fade-token')
			}
		}
	}
</script>

<style lang="scss">
	.login-container{
		// 登录盒子的样式
		height: 400px;
		background-color: #f8f8f8;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		position: relative;
		overflow: hidden;
		
		// 绘制登录盒子底部的半椭圆造型（伪元素）
		&::after{
			content: ' ';
			display: block;
			width: 100%;
			height: 40px;
			background-color: white;
			position: absolute;
			bottom: 0;
			left: 0;
			border-radius: 100%;
			transform: translateY(50%);
		}
		
		.btn-login{
			// 登录按钮的样式
			width: 90%;
			border-radius: 100px;
			margin: 15px 0;
			background-color: #C00000;
		}
		.tips-text{
			// 按钮下方提示消息的样式
			font-size: 12px;
			color: gray;
		}
	}
</style>