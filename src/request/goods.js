import $axios from "@/common/http"

/**
 * 获取商品列表
 */
export async function getGoods(page=1,size=10) {
    let res =  await $axios.get("/goodslist",{
        params: {
            page,
            size
        }
    })
    if (res.code==200&&res.list) {
        return res.list;
    } else {
        return [];
    }
}
/**
 * 添加商品
 * @param {*} data 添加的数据
 */
export function addGoods(data) {
    console.log(data)
    return $axios.post("/goodsadd", data)
}
/**
 * 修改商品
 * @param {*} data 修改的数据
 */
export function editGoods(data) {
    return $axios.post("/goodsedit", data)
}
/**
 * 删除商品
 * @param {*} id 删除的数据id
 */
export function delGoods(id) {
    return $axios.post("/goodsdelete",{id})
}

// 获取商品总数
export async function getTotal(){
    let res = await $axios.get("/goodscount")
    return res.list[0].total
}