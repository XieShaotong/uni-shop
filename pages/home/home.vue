<template>
	<view>
		<!-- 轮播图区域 -->
		<swiper :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000" :circular="true">
			<!-- 循环渲染轮播图的 item 项 -->
			<swiper-item v-for="(item, i) in swiperList" :key="i">
				<!-- 点击轮播图跳转商品详情页 -->
				<navigator class="swiper-item" :url="'/subpkg/goods_detail/goods_detail?goods_id=' + item.goods_id">
					<!-- 动态绑定图片的 src 属性 -->
					<image :src="item.image_src"></image>
				</navigator>
			</swiper-item>
		</swiper>

		<!-- 分类导航区域 外层容器-->
		<view class="nav-list">
			<!-- 分类导航item项 -->
			<view class="nav-item" v-for="(item, i) in navList" :key="i" @click="navClickHandler(item)">
				<!-- 分类导航图片 -->
				<image :src="item.image_src" class="nav-img"></image>
			</view>
		</view>

		<!-- 楼层区域 楼层容器-->
		<view class="floor-list">
			<!-- 楼层 item 项 -->
			<view class="floor-item" v-for="(item, i) in floorList" :key="i">
				<!-- 楼层标题 -->
				<image :src="item.floor_title.image_src" class="floor-title"></image>

				<!-- 楼层图片区域 楼层图片区域容器-->
				<view class="floor-img-box">
					<!-- 左侧大图片的盒子 -->
					<navigator class="left-img-box" :url="item.product_list[0].url">
						<image :src="item.product_list[0].image_src" :style="{width: item.product_list[0].image_width + 'rpx'}" mode="widthFix"></image>
					</navigator>
					<!-- 右侧 4 个小图片的盒子 -->
					<view class="right-img-box">
						<navigator class="right-img-item" v-for="(item2, i2) in item.product_list" :key="i2" v-if="i2 !== 0" :url="item2.url">
							<image :src="item2.image_src" mode="widthFix" :style="{width: item2.image_width + 'rpx'}">
							</image>
						</navigator>
					</view>
				</view>

			</view>
		</view>

	</view>
</template>

<script>
	export default {
		data() {
			return {
				// 1. 轮播图的数据列表，默认为空数组
				swiperList: [],
				// 1. 分类导航的数据列表
				navList: [],
				// 1. 楼层的数据列表
				floorList: [],
			};
		},
		onLoad() {
			// 2. 在小程序页面刚加载的时候，调用获取轮播图数据的方法
			this.getSwiperList()
			// 2. 在 onLoad 中调用获取数据的方法，调用获取分类导航列表的方法
			this.getNavList()
			// 2. 在 onLoad 中调用获取楼层数据的方法
			this.getFloorList()
		},
		methods: {
			// 3. 获取轮播图数据的方法
			async getSwiperList() {
				// 3.1 发起请求
				const {data: res} = await uni.$http.get('/api/public/v1/home/swiperdata')
				// 3.2 请求失败		调用封装的展示消息提示的方法
				if (res.meta.status !== 200) return uni.$showMsg()
				// 3.3 请求成功，为 data 中的数据赋值
				this.swiperList = res.message
			},
			// 3. 在 methods 中定义获取数据的方法
			async getNavList() {
				// 3.1 发起请求
				const {data: res} = await uni.$http.get('/api/public/v1/home/catitems')
				// 3.2 请求失败		调用封装的展示消息提示的方法
				if (res.meta.status !== 200) return uni.$showMsg()
				// 3.3 请求成功，为 data 中的数据赋值
				this.navList = res.message
			},
			// nav-item 项被点击时候的事件处理函数
			navClickHandler(item) {
				// 判断点击的是哪个 nav
				if (item.name === '分类') {
					uni.switchTab({ //调用跳转tabbar页面API
						url: '/pages/cate/cate'
					})
				}
			},
			// 3. 定义获取楼层列表数据的方法
			async getFloorList() {
				// 3.1 发起请求
				const {data: res} = await uni.$http.get('/api/public/v1/home/floordata')
				// 3.2 请求失败		调用封装的展示消息提示的方法
				if (res.meta.status !== 200) return uni.$showMsg()
				// 通过双层 forEach 循环，处理 URL 地址
				// 拿到楼层数据
				res.message.forEach(floor => {
					//拿到商品信息
					floor.product_list.forEach(prod => {
						//给prod挂载自定义url属性
						prod.url = '/subpkg/goods_list/goods_list?' + prod.navigator_url.split('?')[1]
					})
				})
				// 3.3 请求成功，为 data 中的数据赋值
				this.floorList = res.message
			},
		},

	}
</script>

<style lang="scss">
	swiper {
		//轮播图样式
		height: 330rpx;

		.swiper-item,
		image {
			width: 100%;
			height: 100%;
		}
	}

	.nav-list {
		//分类导航样式，弹性布局
		display: flex;
		// 均匀排列每个元素
		justify-content: space-around;
		// 外边距属性
		margin: 15px 0;

		.nav-img {
			width: 128rpx;
			height: 140rpx;
		}
	}

	.floor-title {
		//楼层标题样式
		height: 60rpx;
		width: 100%;
		// 弹性布局
		display: flex;
	}

	.right-img-box {
		//楼层右侧小图片样式，弹性布局
		display: flex;
		// 规定灵活的项目在必要的时候拆行或拆列
		flex-wrap: wrap;
		// 均匀排列每个元素
		justify-content: space-around;
	}

	.floor-img-box {
		//楼层图片区域样式，弹性布局
		display: flex;
		// 内边距属性
		padding-left: 10rpx;
	}
</style>
