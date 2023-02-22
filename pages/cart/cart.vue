<template>
	<view>
		<!-- 这是商品列表的标题区域 -->
		<view class="cart-title">
			<!-- 左侧图标 -->
			<uni-icons type="shop" size="18"></uni-icons>
			<!-- 右侧文本 -->
			<text class="cart-title-text">购物车</text>
		</view>
		
		<!-- 循环渲染购物车中的商品信息 -->
		<block v-for="(goods,i) in cart" :key="i">
			<!-- goods	绑定商品信息对象 :showRadio赋值显示复选框-->
			<my-goods :goods="goods" :showRadio="true"></my-goods>
		</block>
	</view>
</template>

<script>
	// 导入自己封装的 mixin 模块
	import badgeMix from "@/mixins/tabbar-badge.js"
	// 从 vuex 中按需导出 mapState 辅助方法
	import {mapState} from "vuex"

	export default {
		// 将 badgeMix 混入到当前的页面中进行使用
		mixins: [badgeMix],
		computed: {
			// 将 m_cart 模块中的 cart 数组映射到当前页面中使用
			...mapState('m_cart',['cart'])
		},

		data() {
			return {

			};
		},

	}
</script>

<style lang="scss">
	.cart-title{//购物车标题
		height: 40px;
		display: flex;
		// 纵向居中对齐
		align-items: center;
		padding-left: 5px;
		border-bottom: 1px solid #efefef;
		.cart-title-text{//购物车文本
			font-size: 14px;
			margin-left: 10px;
			
		}
	}
</style>
