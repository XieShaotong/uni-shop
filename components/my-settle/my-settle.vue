<template>
	<!-- 最外层的容器 -->
	<view class="my-settle-container">
		<!-- 全选区域 -->
		<label class="radio" @click="changeAllState">
			<radio color="#C00000" :checked="isFullCheck" /><text>全选</text>
		</label>
		<!-- 合计区域 -->
		<view class="amount-box">
			合计:<text class="amount">￥1234.00</text>
		</view>
		<!-- 结算按钮 -->
		<view class="btn-settle">结算({{checkedCount}})</view>
	</view>
</template>

<script>
	// 按需导入cart.js中的mapGetters辅助函数
	// 按需导入cart.js中的mapMutations 辅助函数
	import { mapGetters, mapMutations } from "vuex"
	
	export default {
		name: "my-settle",
		// 声明计算属性
		computed: {
			// 2. 使用 mapGetters 辅助函数，把 m_cart 模块提供的 checkedCount 方法映射到当前组件中使用
			// 2. 使用 mapGetters 辅助函数，把 m_cart 模块提供的 total 方法映射到当前组件中使用
			...mapGetters('m_cart', ['checkedCount', 'total']),
			
			// 2. 是否全选（判断当前选中总数 == 全部总数）
			isFullCheck(){
				return this.total === this.checkedCount
			}
		},
		data() {
			return {

			};
		},
		methods: {
			// 2. 使用 mapMutations 辅助函数，把 m_cart 模块提供的 updateAllGoodsState 方法映射到当前组件中使用
			...mapMutations('m_cart', ['updateAllGoodsState']),
			// label 的点击事件处理函数
			changeAllState(){
				// 修改购物车中所有商品的选中状态
				// !this.isFullCheck 表示：当前全选按钮的状态取反之后，就是最新的勾选状态
				this.updateAllGoodsState(!this.isFullCheck)
			}
		}
	}
</script>

<style lang="scss">
	// 最外层容器
	.my-settle-container {
		// 底部固定定位
		position: fixed;
		bottom: 0;
		left: 0;
		// 设置宽高和背景色
		width: 100%;
		height: 50px;
		background-color: white;
		// 弹性布局
		display: flex;
		// 两端贴边对齐
		justify-content: space-between;
		// 行高居中
		align-items: center;
		font-size: 14px;
		padding-left: 5px;

		// “全选”复选框
		.radio {
			display: flex;
			// 行高居中
			align-items: center;
		}

		// 合计区域
		.amount-box {

			// 合计金额
			.amount {
				color: #c00000;
				// 字体加粗
				font-weight: bold;
			}
		}

		// 结算按钮
		.btn-settle {
			background-color: #c00000;
			height: 50px;
			color: white;
			// 行高
			line-height: 50px;
			padding: 0 10px;
			// 设置最小宽度
			min-width: 100px;
			text-align: center;
		}
	}
</style>
