// 获取角色列表
import {
  getRole
} from "@/request/role"
export default {
  namespaced: true,
  state: {
    rolelist: []
  },
  getters: {
    rolelist: state => state.rolelist,
    // getrolenamebyid(state){
    //     return function (roleid) {
    //         let rolename = ""
    //         let rolelist = state.rolelist
    //         for (let item in rolelist) {
    //             if (rolelist[item].id == roleid) {
    //                 rolename = rolelist[item].rolename
    //             }
    //         }
    //         return rolename
    //     }
    // }
  },
  mutations: {
    SET_LIST(state, data) {
      state.rolelist = data
    }
  },
  actions: {
    async get_role_list({
      commit
    }) {
      let res = await getRole();
      commit('SET_LIST', res)
    }
  }
}
