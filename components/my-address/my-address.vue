<template>
	<view>
		<!-- 选择收货地址的盒子 v-f判断收货地址转成字符串是否为空，为空显示button -->
		<view class="address-choose-box" v-if="JSON.stringify(address) === '{}'">
			<button type="primary" size="mini" class="btnChooseAddress" @click="chooseAddress">请选择收货地址+</button>
		</view>
		
		<!-- 渲染收货信息的盒子 (最外层容器) -->
		<view class="address-info-box" v-else>
			<!-- 收货人 && 电话  外层盒子 -->
			<view class="row1">
				<!-- 收货人 -->
				<view class="row1-left">
					<view class="username">
						收货人：<text>{{address.userName}}</text>
					</view>
				</view>
				<!-- 电话 -->
				<view class="row1-right">
					<view class="phone">
						电话：<text>{{address.telNumber}}</text>
					</view>
					<uni-icons type="arrowright" size="16"></uni-icons>
				</view>
			</view>
			<!-- 收货地址  外层盒子 -->
			<view class="row2">
				<!-- 收货地址 -->
			    <view class="row2-left">收货地址：</view>
				<!-- 地址 -->
			    <view class="row2-right"></view>
			</view>
		</view>

		<!-- 底部的边框线 -->
		<image src="@/static/bg.jpg" class="address-border"></image>

	</view>
</template>

<script>
	export default {
		name: "my-address",
		data() {
			return {
				// 收货地址
				address: {}
			};
		},
		methods: {
			// 选择收货地址
			chooseAddress(){
				// 1. 调用小程序提供的 chooseAddress() 方法，即可使用选择收货地址的功能
				uni.chooseAddress({
					success(res) {
						this.address = res
					}
				})
			}
		},
		computed: {
			// 收货详细地址的计算属性
			addstr(){
				// 判断是否为空
				if (!this.address.provinceName) return ''
				
				// 拼接 省，市，区，详细地址 的字符串并返回给用户
				return this.address.provinceName + this.address.cityName + this.address.countyName + this.address.detailInfo
			}
		}
	}
</script>

<style lang="scss">
	// 底部边框线的样式
	.address-border {
		// 转成块元素
		display: block;
		width: 100%;
		height: 5px;
	}
	
	// 选择收货地址的盒子
	.address-choose-box{
		height: 90px;
		display: flex;
		justify-content: center;
		align-items: center;
	}
	
	// 收货信息最外层盒子
	.address-info-box{
		font-size: 12px;
		he: 90px;
		display: flex;
		// 纵向布局
		flex-direction: column;
		// 纵向居中
		justify-content: center;
		padding: 0 5px;
		// 收货人，电话  盒子
		.row1{
			display: flex;
			// 左右贴边对齐
			justify-content: space-between;
			
			// 收货人名字 盒子
			.row1-left{
				display: flex;
				align-items: center;
				// 收货名字
				.username{
					
				}
			}
			// 收货电话  盒子
			.row1-right{
				display: flex;
				align-items: center;
				// 手机号码
				.phone{
					
				}
			}
		}
		// 收货地址外层盒子
		.row2{
			display: flex;
			// 两端贴边对齐
			justify-content: space-between;
			// 行高居中
			align-items: center;
			margin-top: 10px;
			// 收货地址
			.row2-left{
				// 文本不换行
				white-space: nowrap;
			}
			// 地址
			.row2-right{
				
			}
		}
	}
</style>
