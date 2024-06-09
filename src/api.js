import request from "@/utils/request";


export default {
    dashboard(){
        return request({
            url: "/dashboard",
            method: "get",
        })
    },
    // 港口
    portList(params) {
        return request({
            url: "/port",
            method: "get",
            params
        })
    },
    portInfo(id) {
        return request({
            url: "/port/" + id,
            method: "get",
        })
    },
    portAdd(data) {
        return request({
            url: "/port",
            method: "post",
            data
        })
    },
    portUpdate(data) {
        return request({
            url: "/port",
            method: "put",
            data
        })
    },
    portDelete(id) {
        return request({
            url: "/port/" + id,
            method: "delete",
        })
    },
    portDeleteBatch(ids) {
        return request({
            url: "/port",
            method: "delete",
            params: {
                "ids": ids.join(",")
            }
        })
    },
    // 生物
   biologyList(params) {
        return request({
            url: "/biology",
            method: "get",
            params
        })
    },
    biologyInfo(id) {
        return request({
            url: "/biology/" + id,
            method: "get",
        })
    },
    biologyAdd(data) {
        return request({
            url: "/biology",
            method: "post",
            data
        })
    },
    biologyUpdate(data) {
        return request({
            url: "/biology",
            method: "put",
            data
        })
    },
    biologyDelete(id) {
        return request({
            url: "/biology/" + id,
            method: "delete",
        })
    },
    biologyDeleteBatch(ids) {
        return request({
            url: "/biology",
            method: "delete",
            params: {
                "ids": ids.join(",")
            }
        })
    },
    // 国家
    countryList(params) {
        return request({
            url: "/country",
            method: "get",
            params
        })
    },
    countryInfo(id) {
        return request({
            url: "/country/" + id,
            method: "get",
        })
    },
    countryAdd(data) {
        return request({
            url: "/country",
            method: "post",
            data
        })
    },
    countryUpdate(data) {
        return request({
            url: "/country",
            method: "put",
            data
        })
    },
    countryDelete(id) {
        return request({
            url: "/country/" + id,
            method: "delete",
        })
    },
    countryDeleteBatch(ids) {
        return request({
            url: "/country",
            method: "delete",
            params: {
                "ids": ids.join(",")
            }
        })
    },
    // 国家发现
    countryFindList(params) {
        return request({
            url: "/country-find",
            method: "get",
            params
        })
    },
    countryFindInfo(id) {
        return request({
            url: "/country-find/" + id,
            method: "get",
        })
    },
    countryFindAdd(data) {
        return request({
            url: "/country-find",
            method: "post",
            data
        })
    },
    countryFindUpdate(data) {
        return request({
            url: "/country-find",
            method: "put",
            data
        })
    },
    countryFindDelete(id) {
        return request({
            url: "/country-find/" + id,
            method: "delete",
        })
    },
    countryFindDeleteBatch(ids) {
        return request({
            url: "/country-find",
            method: "delete",
            params: {
                "ids": ids.join(",")
            }
        })
    },
    // 港口发现
    portFindList(params) {
        return request({
            url: "/port-find",
            method: "get",
            params
        })
    },
    portFindInfo(id) {
        return request({
            url: "/port-find/" + id,
            method: "get",
        })
    },
    portFindAdd(data) {
        return request({
            url: "/port-find",
            method: "post",
            data
        })
    },
    portFindUpdate(data) {
        return request({
            url: "/port-find",
            method: "put",
            data
        })
    },
    portFindDelete(id) {
        return request({
            url: "/port-find/" + id,
            method: "delete",
        })
    },
    portFindDeleteBatch(ids) {
        return request({
            url: "/port-find",
            method: "delete",
            params: {
                "ids": ids.join(",")
            }
        })
    },
    // 港口检查
    portCheckList(params) {
        return request({
            url: "/port-check",
            method: "get",
            params
        })
    },
    portCheckInfo(id) {
        return request({
            url: "/port-check/" + id,
            method: "get",
        })
    },
    portCheckAdd(data) {
        return request({
            url: "/port-check",
            method: "post",
            data
        })
    },
    portCheckUpdate(data) {
        return request({
            url: "/port-check",
            method: "put",
            data
        })
    },
    portCheckDelete(id) {
        return request({
            url: "/port-check/" + id,
            method: "delete",
        })
    },
    portCheckDeleteBatch(ids) {
        return request({
            url: "/port-check",
            method: "delete",
            params: {
                "ids": ids.join(",")
            }
        })
    },
    // 用户
    userList(params) {
        return request({
            url: "/user",
            method: "get",
            params
        })
    },
    userInfo(id) {
        return request({
            url: "/user/" + id,
            method: "get",
        })
    },
    userAdd(data) {
        return request({
            url: "/user",
            method: "post",
            data
        })
    },
    userUpdate(data) {
        return request({
            url: "/user",
            method: "put",
            data
        })
    },
    userDelete(id) {
        return request({
            url: "/user/" + id,
            method: "delete",
        })
    },
    userDeleteBatch(ids) {
        return request({
            url: "/user",
            method: "delete",
            params: {
                "ids": ids.join(",")
            }
        })
    }
}






