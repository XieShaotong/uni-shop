// 按需导入 mapGetters 这个辅助方法
import { mapGetters } from 'vuex'

// 导出一个 mixin 对象
export default {
  computed: {
	  // 将 m_cart 模块中的 total 映射为当前页面的计算属性
    ...mapGetters('m_cart', ['total']),
  },
  watch: {
	  // 监听total值的变化
	  total(){
		  // 调用methods中的setBadge方法，重新为tabbar的数字徽章赋值
		  this.setBadge()
	  }
  },
  // 在页面刚显示出来的时候，立即调用 setBadge 方法，为 tabBar 设置数字徽标
  onShow() {
    // 在页面刚展示的时候，设置数字徽标
    this.setBadge()
  },
  methods: {
    setBadge() {
      // 调用 uni.setTabBarBadge() 方法，为购物车设置右上角的徽标
      uni.setTabBarBadge({
        index: 2,
        text: this.total + '', // 注意：text 的值必须是字符串，不能是数字
      })
	  // 判断购物车数量
	  if(this.total == 0){
		  // 如果购物车数量为 0 则隐藏tabBar右上角数字徽标(红点)
		  uni.hideTabBarRedDot({
		  	index: 2
		  })
	  }
    },
  },
}