<template>
	<view>
		<!-- 使用收货地址组件 -->
		<my-address></my-address>
		
		<!-- 这是商品列表的标题区域 -->
		<view class="cart-title">
			<!-- 左侧图标 -->
			<uni-icons type="shop" size="18"></uni-icons>
			<!-- 右侧文本 -->
			<text class="cart-title-text">购物车</text>
		</view>
		
		<!-- 商品列表区域 -->
		<!-- uni-swipe-action 是最外层包裹性质的容器(滑动删除) -->
		<uni-swipe-action>
			<!-- 循环渲染购物车中的商品item项 -->
			<block v-for="(goods,i) in cart" :key="i">
			<!-- uni-swipe-action-item 可以为其子节点提供滑动操作的效果。需要通过 options 属性来指定操作按钮的配置信息 -->
			<uni-swipe-action-item :right-options="options" @click="swipeActionClickHandler(goods)">
				<!-- goods	绑定商品信息对象 :showRadio赋值显示复选框-->
				<!-- 在 radioChangeHandler 事件处理函数中，通过事件对象 e，得到商品的 goods_id 和 goods_state -->
				<my-goods :goods="goods" :showRadio="true" @radio-change="radioChangeHandler" :showNum="true" @num-change="numberChangeHandler"></my-goods>
			</uni-swipe-action-item>
			</block>
		</uni-swipe-action>
		
	</view>
</template>

<script>
	// 导入自己封装的 mixin 模块
	import badgeMix from "@/mixins/tabbar-badge.js"
	// 从 vuex 中按需导出 mapState 辅助方法
	import {mapState} from "vuex"
	// 导入 mapMutations 这个辅助函数，
	import {mapMutations} from "vuex"

	export default {
		// 将 badgeMix 混入到当前的页面中进行使用
		mixins: [badgeMix],
		computed: {
			// 将 m_cart 模块中的 cart 数组映射到当前页面中使用
			...mapState('m_cart',['cart'])
		},

		data() {
			return {
				// 滑动删除的options配置项
				options: [{
					text: '删除',// 显示的文本内容
					style: {
						backgroundColor: '#C00000' // 按钮的背景颜色
					}
				}]
			};
		},
		methods: {
			// 将需要的 mutations 方法映射到当前页面中使用
			...mapMutations('m_cart',['updateGoodsState','updateGoodsCount','removeGoodsById']),
			// 商品的勾选状态发生了变化
			radioChangeHandler(e){
				// 调用updateGoodsState方法，将商品state传入，改变状态
				this.updateGoodsState(e)// 输出得到的数据 -> {goods_id: 395, goods_state: false}
			},
			// 商品的数量发生了变化
			numberChangeHandler(e){
				// 调用updateGoodsCount方法，将商品count传入，改变
				this.updateGoodsCount(e)
			},
			// 点击了滑动操作按钮（滑动删除）
			swipeActionClickHandler(e){
				// 调用removeGoodsById方法，将商品id传入，删除
				this.removeGoodsById(e)
				// 实现左滑删除商品，tabbar的数字徽标跟着变化
				this.setBadge()
			}
		}
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
