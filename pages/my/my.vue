<template>
	<view>
		<!-- 用户未登录时，显示登录组件 (!token值不存在，显示登录组件) -->
		<my-login v-if="!token"></my-login>
		
		<!-- 用户登录后，显示用户信息组件 (token值存在，显示用户信息组件) -->
		<my-userinfo v-else></my-userinfo>
	</view>
</template>

<script>
	// 导入自己封装的 mixin 模块
	import badgeMix from "@/mixins/tabbar-badge.js"
	// 按需从 vuex(user.js) 中导入 mapState 辅助函数
	import {mapState} from "vuex"
	export default {
		// 将 badgeMix 混入到当前的页面中进行使用(挂载badgeMix)
		mixins: [badgeMix],
		
		data() {
			return {
				
			}
		},
		// 计算属性节点
		computed: {
			// token 是用户登录成功之后的 token 字符串
			// 使用 mapState 辅助函数，把 m_user 模块提供的 token 方法映射到当前组件中使用
			...mapState('m_user', ['token'])
		},
		methods: {
			
		}
	}
</script>

<style>

</style>
