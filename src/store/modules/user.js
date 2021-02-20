// 获取管理员列表
import { getUser,getTotal,login } from "@/request/user"
import { Message } from "element-ui"
import router from "@/router"
let userinfo = localStorage.getItem("userinfo") ? JSON.parse(localStorage.getItem("userinfo")) : {}
export default {
    namespaced:true,
    state: {
        userlist: [],
        page:1, // 页码数
        size:10, // 每页数量
        total:0, // 总条数
        userinfo:userinfo
    },
    getters: {
        userlist: state => state.userlist,
        page: state => state.page,
        size: state => state.size,
        total: state => state.total,
        menus: state => state.userinfo.menus,
        menus_url: state => state.userinfo.menus_url,
        username: state => state.userinfo.username,
    },
    mutations: {
        SET_LIST(state,data){
            state.userlist = data
        },
        SET_PAGE(state,data){
            state.page = data
        },
        SET_SIZE(state,data){
            state.size = data
        },
        SET_TOTAL(state,data){
            state.total = data
        },
        SET_USERINFO(state,data){
            // 存入本地存储是为了实现持久化
            localStorage.setItem("userinfo",JSON.stringify(data))
            // 存入vuex是为了各个组件方便拿取数据
            state.userinfo = data
        },
        QUIT(state){
            localStorage.removeItem("userinfo")
            state.userinfo = {}
            router.push("/login")
        }
    },
    actions: {
        // 获取管理员列表
        async get_user_list({commit,state,dispatch}){
            let res = await getUser(state.page,state.size);
            commit('SET_LIST',res)
            // 请求数量
            dispatch('get_total')
        },
        // 获取管理员总数
        async get_total({commit}) {
            let res = await getTotal();
            commit('SET_TOTAL',res)
        },
        set_page({commit,dispatch},data){
            commit('SET_PAGE',data)
            dispatch('get_user_list')
        },
        set_size({commit,dispatch},data){
            commit('SET_SIZE',data)
            // commit('SET_PAGE',1)
            dispatch('get_user_list')
        },
        async login({commit},data){
            let res = await login(data);
            if (res.code == 200) {
                commit('SET_USERINFO',res.list)
                Message.success(res.msg)
                router.push("/")  //跳转到后台首页
            } else {
                Message.error(res.msg)
            }
        }
    }
}