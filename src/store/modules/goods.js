// 获取管理员列表
import { getGoods,getTotal } from "@/request/goods"
export default {
    namespaced:true,
    state: {
        goodslist: [],
        page:1, // 页码数
        size:10, // 每页数量
        total:0, // 总条数
    },
    getters: {
        goodslist: state => state.goodslist,
        page: state => state.page,
        size: state => state.size,
        total: state => state.total,
    },
    mutations: {
        SET_LIST(state,data){
            state.goodslist = data
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
    },
    actions: {
        // 获取商品列表
        async get_goods_list({commit,state,dispatch}){
            let res = await getGoods(state.page,state.size);
            commit('SET_LIST',res)
            // 请求数量
            dispatch('get_total')
        },
        // 获取商品总数
        async get_total({commit}) {
            let res = await getTotal();
            commit('SET_TOTAL',res)
        },
        set_page({commit,dispatch},data){
            commit('SET_PAGE',data)
            dispatch('get_goods_list')
        },
        set_size({commit,dispatch},data){
            commit('SET_SIZE',data)
            // commit('SET_PAGE',1)
            dispatch('get_goods_list')
        },
    }
}