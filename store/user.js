export default {
	// 开启命名空间
	namespaced: true,

	// state 数据
	state: () => ({
		// 收货地址
		// address: {}
		// 调用uni.getStorageSync进行读取
		// JSON.parse() ：转成真正的对象
		// 3. 读取本地的收货地址数据，初始化 address 对象
		address: JSON.parse(uni.getStorageSync('address') || '{}'),
		
		// 登录成功之后的 token 字符串(读取赋值，读到赋token，没有读到赋空字符串'')
		token: uni.getStorageSync('token') || '',
		
		// 用户的基本信息对象
		userinfo: JSON.parse(uni.getStorageSync('userinfo') || '{}')
	}),

	// 方法
	mutations: {
		// 更新收货地址
		updateAddress(state, address) {
			state.address = address

			// 2. 通过 this.commit() 方法，调用 m_user 模块下的 saveAddressToStorage 方法将 address 对象持久化存储到本地
			this.commit('m_user/saveAddressToStorage')
		},

		// 1. 定义将 address 持久化存储到本地 mutations 方法
		saveAddressToStorage(state) {
			// 将address的state.address转化为字符串存储
			uni.setStorageSync('address', JSON.stringify(state.address))
		},
		
		// 更新用户的基本信息
		updateUserInfo(state, userinfo){
			// 外界传过来的userinfo赋给state的userinfo
			state.userinfo = userinfo
			
			// 通过 this.commit() 方法，调用 m_user 模块下的 saveUserInfoToStorage 方法，将 userinfo 对象持久化存储到本地
			this.commit('m_user/saveUserInfoToStorage')
		},
		
		// 将 userinfo 持久化存储到本地
		saveUserInfoToStorage(state){
			uni.setStorageSync('userinfo', JSON.stringify(state.userinfo))
		},
		
		// 更新 token 字符串
		updateToken(state, token){
			// 外界传过来的userinfo赋给state的userinfo
			state.token = token
			
			// 通过 this.commit() 方法，调用 m_user 模块下的 saveTokenToStorage 方法，将 token 字符串持久化存储到本地
			this.commit('m_user/saveTokenToStorage')
		},
		
		// 将 token 字符串持久化存储到本地
		saveTokenToStorage(state){
			uni.setStorageSync('token', state.token)
		}
	},

	// 数据包装器
	getters: {
		// 收货详细地址的计算属性
		addstr(state) {
			// 判断是否为空
			if (!state.address.provinceName) return ''
		
			// 拼接 省，市，区，详细地址 的字符串并返回给用户
			return state.address.provinceName + state.address.cityName + state.address.countyName + state.address.detailInfo
		},
	}
}
