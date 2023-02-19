<template>
	<!-- 搜索组件最外层容器 -->
	<view class="my-search-container" :style="{'background-color': bgcolor}" @click="searchBoxHandler">
		<!-- 使用 view 组件模拟 input 输入框的样式 -->
		<view class="my-search-box" :style="{'border-radius': radius + 'px'}">
			<!-- 使用uni-ui提供的图标组件(搜索图标) -->
			<uni-icons type="search" size="17"></uni-icons>
			<!-- 搜索文本 -->
			<text class="placeholder">搜索</text>
		</view>
	</view>
</template>

<script>
	export default {
		name: "my-search",
		props: {
			// 背景颜色
			bgcolor: {
				// 指定数据类型
				type: String,
				// 指定默认值
				default: '#C00000'
			},
			// 圆角尺寸
			radius: {
				// 指定数据类型
				type: Number,
				// 指定默认值，单位是 px
				default: 18
			}
		},
		data() {
			return {

			};
		},
		methods: {
			// 点击了模拟的 input 输入框
			searchBoxHandler() {
				// 触发外界通过 @click 绑定的 click 事件处理函数
				this.$emit('click')
			}
		}
	}
</script>

<style lang="scss">
	.my-search-container {
		//外层包裹性质容器
		// 移除背景颜色，改由 props 属性控制
		// background-color: #c00000;
		height: 50px;
		padding: 0 10px;
		// 弹性布局
		display: flex;
		// 纵向居中
		align-items: center;
	}

	.my-search-box {
		//搜索盒子容器
		height: 36px;
		background-color: #ffffff;
		// 圆角效果
		// 移除圆角尺寸，改由 props 属性控制
		// border-radius: 18px;
		width: 100%;
		// 弹性布局
		display: flex;
		// 横向居中
		align-items: center;
		// 纵向居中
		justify-content: center;

		.placeholder {
			// 搜索框文字样式
			font-size: 15px;
			margin-left: 5px;
		}
	}
</style>
