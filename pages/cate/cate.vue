<template>
	<view>
		<view class="scroll-view-container">
			<!-- 左侧的滚动视图区域 包裹性质容器-->
			<!-- 左侧的滚动视图区域 -->
			<scroll-view class="left-scroll-view" scroll-y :style="{height: wh + 'px'}">
				<block v-for="(item, i) in cateList" :key="i">
					<view :class="['left-scroll-view-item', i === active ? 'active' : '']" @click="activeChanged(i)">
						{{item.cat_name}}
					</view>
				</block>
			</scroll-view>

			<!-- 右侧的滚动视图区域 包裹性质容器-->
			<scroll-view class="right-scroll-view" scroll-y :style="{height: wh + 'px'}" :scroll-top="scrollTop">
				<view class="cate-lv2" v-for="(item2, i2) in cateLevel2" :key="i2">
					<!-- 耳机分类标题 -->
					<view class="cate-lv2-title">/ {{item2.cat_name}} /</view>

					<!-- 动态渲染三级分类的列表数据 当前二级分类下下的三级分类列表-->
					<view class="cate-lv3-list">
						<!-- 三级分类 Item 项 -->
						<view class="cate-lv3-item" v-for="(item3, i3) in item2.children" :key="i3"
							@click="gotoGoodsList(item3)">
							<!-- 三级分类图片 -->
							<image :src="item3.cat_icon.replace('dev','web')"></image>
							<!-- 三级分类文本 -->
							<text>{{item3.cat_name}}</text>
						</view>
					</view>

				</view>
			</scroll-view>

		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				// 1.窗口的可用高度 = 屏幕高度 - navigationBar高度 - tabBar 高度
				wh: 0,
				// 1.分类数据列表
				cateList: [],
				// 1.当前选中项的索引，默认让第一项被选中
				active: 0,
				// 1.二级分类列表
				cateLevel2: [],
				// 滚动条距离顶部的距离
				scrollTop: 0
			};
		},
		onLoad() {
			// 2.获取当前系统(设备)的信息
			const sysInfo = uni.getSystemInfoSync()
			// 3.为 wh 窗口可用高度动态赋值
			this.wh = sysInfo.windowHeight
			// 2.调用获取分类列表数据的方法
			this.getCateList()
		},
		methods: {
			//获取分类列表的数据方法
			async getCateList() {
				// 发起请求
				const {
					data: res
				} = await uni.$http.get('/api/public/v1/categories')
				// 判断是否获取失败，调用提示请求失败消息方法
				if (res.meta.status !== 200) return uni.$showMsg()
				// 获取成功，转存数据
				this.cateList = res.message

				// 为二级分类赋值
				this.cateLevel2 = res.message[0].children
			},
			// 选中项改变的事件处理函数
			activeChanged(i) {
				this.active = i
				// 为二级分类列表重新赋值
				this.cateLevel2 = this.cateList[i].children

				// 让 scrollTop 的值在 0 与 1 之间切换
				this.scrollTop = this.scrollTop === 0 ? 1 : 0

				// 可以简化为如下的代码：
				// this.scrollTop = this.scrollTop ? 0 : 1
			},
			// 点击三级分类项跳转到商品列表页面
			gotoGoodsList(item3) {
				uni.navigateTo({
					url: '/subpkg/goods_list/goods_list?cid=' + item3.cat_id
				})
			}

		},
	}
</script>

<style lang="scss">
	.scroll-view-container {
		//外层包裹性质容器
		display: flex;

		.left-scroll-view {
			//左侧滑动区域容器
			width: 120px;

			.left-scroll-view-item {
				//左侧滑动item项
				//行高
				line-height: 60px;
				//背景颜色
				background-color: #f7f7f7;
				//文字居中
				text-align: center;
				//文字大小
				font-size: 12px;

				// 激活项的样式(左侧滑动区域选中样式)
				&.active {
					background-color: #ffffff;
					//相对定位
					position: relative;

					// 渲染激活项左侧的红色指示边线
					&::before {
						content: ' ';
						display: block;
						width: 3px;
						height: 30px;
						background-color: #c00000;
						//绝对定位
						position: absolute;
						left: 0;
						top: 50%;
						//往回撤50%（Y）
						transform: translateY(-50%);
					}
				}
			}
		}
	}

	.cate-lv2-title {
		//右侧滑动区域标题样式
		font-size: 12px;
		font-weight: bold;
		text-align: center;
		padding: 15px 0;
	}

	.cate-lv3-list {
		//三级分类图片列表样式
		//弹性布局
		display: flex;
		//自动换行
		flex-wrap: wrap;

		.cate-lv3-item {
			//三级分类item图片样式
			width: 33.33%;
			margin-bottom: 10px;
			//弹性布局
			display: flex;
			//纵向布局
			flex-direction: column;
			//纵向居中
			justify-content: center;
			//横向居中
			align-items: center;

			image {
				width: 60px;
				height: 60px;
			}

			text {
				font-size: 12px;
			}
		}
	}
</style>
