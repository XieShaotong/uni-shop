<template>
	<view>
		<!-- 搜索组件区域 -->
		<view class="search-box">
			<!-- 使用 uni-ui 提供的搜索组件 -->
			<uni-search-bar @input="input" :radius="100" cancelButton="none"></uni-search-bar>
		</view>

		<!-- 搜索建议列表区域 -->
		<!--  实现搜索建议和搜索历史的按需展示 v-if -->
		<!-- searchResults.length !== 0 展示搜索建议区域，隐藏搜索历史区域 -->
		<!-- searchResults.length === 0 隐藏搜索建议区域，展示搜索历史区域 -->
		<view class="sugg-list" v-if="searchResults.length !== 0">
			<view class="sugg-item" v-for="(item, i) in searchResults" :key="i" @click="gotoDetail(item.goods_id)">
				<view class="goods-name">{{item.goods_name}}</view>
				<uni-icons type="arrowright" size="16"></uni-icons>
			</view>
		</view>

		<!-- 搜索历史区域 -->
		<!--  实现搜索建议和搜索历史的按需展示 v-else -->
		<view class="history-box" v-else>
			<!-- 标题区域 -->
			<view class="history-title">
				<text>搜索历史</text>
				<uni-icons type="trash" size="17" @click="cleanHistory"></uni-icons>
			</view>
			<!-- 列表区域 -->
			<view class="history-list">
				<uni-tag :text="item" v-for="(item, i) in historys" :key="i" @click="gotoGoodsList(item)" @longpress="onLongPress(historyList,item)"></uni-tag>
			</view>
		</view>

	</view>
</template>

<script>
	export default {
		data() {
			return {
				// 实现搜索框的防抖处理，延时器的 timerId
				timer: null,
				// 搜索关键词
				kw: '',
				// 搜索结果列表
				searchResults: [],
				// 搜索关键词的历史记录
				historyList: []
			};
		},
		onLoad() {
			// 加载本地存储的搜索历史记录
			this.historyList = JSON.parse(uni.getStorageSync('kw') || '[]')
		},
		methods: {
			// input输入事件的处理函数
			input(e) {
				// 实现搜索框的防抖处理，清除 timer 对应的延时器
				clearTimeout(this.timer)
				// 实现搜索框的防抖处理，重新启动一个延时器，并把 timerId 赋值给 this.timer
				this.timer = setTimeout(() => {
					// 如果 500 毫秒内，没有触发新的输入事件，则为搜索关键词赋值
					this.kw = e
					// 根据关键词，查询搜索建议列表
					this.getSearchList()
				}, 500)
			},
			// 根据搜索关键词，搜索商品建议列表
			async getSearchList() {
				// 判断关键词是否为空
				if (this.kw === '') {
					this.searchResults = []
					return
				}
				// 发起请求，获取搜索建议列表
				const {
					data: res
				} = await uni.$http.get('/api/public/v1/goods/qsearch', {
					query: this.kw
				})
				if (res.meta.status !== 200) return uni.$showMsg()
				this.searchResults = res.message

				// 1. 查询到搜索建议之后，调用 saveSearchHistory() 方法保存搜索关键词
				this.saveSearchHistory()
			},
			// 搜索建议列表item项 点击跳转 商品详情页处理函数
			gotoDetail(goods_id) {
				uni.navigateTo({
					// 指定详情页面的 URL 地址，并传递 goods_id 参数
					url: '/subpkg/goods_detail/goods_detail?goods_id=' + goods_id
				})
			},
			// 2. 保存搜索关键词的方法
			saveSearchHistory() {
				// 2.1 直接把搜索关键词 push 到 historyList 数组中
				// this.historyList.push(this.kw)

				// 1. 将 Array 数组转化为 Set 对象
				const set = new Set(this.historyList)
				// 2. 调用 Set 对象的 delete 方法，移除对应的元素
				set.delete(this.kw)
				// 3. 调用 Set 对象的 add 方法，向 Set 中添加元素
				set.add(this.kw)
				// 4. 将 Set 对象转化为 Array 数组
				this.historyList = Array.from(set)

				// 调用 uni.setStorageSync(key, value) 将搜索历史记录持久化存储到本地
				uni.setStorageSync('kw', JSON.stringify(this.historyList))
			},
			// 清空搜索历史记录
			cleanHistory() {
				// 清空 data 中保存的搜索历史
				this.historyList = []
				// 清空本地存储中记录的搜索历史
				uni.setStorageSync('kw', '[]')
			},
			// 点击搜索记录跳转到商品列表页面
			gotoGoodsList(kw) {
				uni.navigateTo({
					url: '/subpkg/goods_list/goods_list?query=' + kw
				})
			},
			// 长按关键词删除(传参：数组historyList和索引i)
			onLongPress(historyList,i){
				// 拿到数组下标
				var index = historyList.indexOf(i)
				uni.showModal({
					title:'提示',
					confirmText: '删除',
					cancelText: '取消',
					content:'是否删除此记录？',
					success:function(res){
						// 判断点击删除还是取消
						if(res.confirm){
							// 点击删除，删除数组中对应元素
							historyList.splice(index,1)
							// 调用 uni.setStorageSync(key, value) 将搜索历史记录持久化存储到本地
							uni.setStorageSync('kw', JSON.stringify(historyList))
							uni.$showMsg('删除成功！')
						}else if(res.cancel){
							uni.$showMsg('已取消！')
						}
					}
				})
			}
		},
		// 关键词前后顺序的问题（可以调用数组的 reverse() 方法对数组进行反转）
		computed: {
			historys() {
				// 注意：由于数组是引用类型，所以不要直接基于原数组调用 reverse 方法，以免修改原数组中元素的顺序
				// 而是应该新建一个内存无关的数组，再进行 reverse 反转
				return [...this.historyList].reverse()
			}
		}
	}
</script>

<style lang="scss">
	.search-box {
		// 搜索框的吸顶效果
		position: sticky;
		top: 0;
		z-index: 999;
	}

	.sugg-list {
		//搜索建议列表（容器）样式
		// 内边距
		padding: 0 5px;

		.sugg-item {
			// 搜索建议item项样式
			font-size: 12px;
			// 内边距
			padding: 13px 0;
			// 边框
			border-bottom: 1px solid #efefef;
			// 弹性布局
			display: flex;
			// 纵向居中
			align-items: center;
			// 两端贴边对齐
			justify-content: space-between;

			.goods-name {
				// 搜索建议名称样式
				// 文字不允许换行（单行文本）
				white-space: nowrap;
				// 溢出部分隐藏
				overflow: hidden;
				// 文本溢出后，使用 ... 代替
				text-overflow: ellipsis;
				margin-right: 3px;
			}
		}
	}

	.history-box {
		// 搜索历史盒子样式
		// 内边距
		padding: 0 5px;

		.history-title {
			// 搜索历史标题样式
			// 弹性布局
			display: flex;
			// 两端贴边对齐
			justify-content: space-between;
			// 纵向居中
			align-items: center;
			height: 40px;
			font-size: 13px;
			// 下边框
			border-bottom: 1px solid #efefef;
		}

		.history-list {
			// 搜索历史列表样式
			// 弹性布局
			display: flex;
			// 双行显示，允许换行
			flex-wrap: wrap;

			.uni-tag {
				// 搜索历史item项样式
				// 上外边距
				margin-top: 5px;
				// 右外边距
				margin-right: 5px;
			}
		}
	}
</style>
