import request from "@/utils/request";

export default {
     portList(params){
        return request({
            url:"/port",
            method:"get",
            params
        })
    },
    portInfo(id){
        return request({
            url:"/port/"+id,
            method:"get",
        })
    },
    portAdd(data){
        return request({
            url:"/port",
            method:"post",
            data
        })
    },
    portUpdate(data){
        return request({
            url:"/port",
            method:"put",
            data
        })
    },
    portDelete(id){
        return request({
            url:"/port/"+id,
            method:"delete",
            data
        })
    }

    , countryList(){
        return request({
            url:"/country/list",
            method:"get",
        })
    }
    
    , countryDelete(){
        return request({
            url:"/country/delete",
            method:"get",
        })
    }
    
    
    , biologySave(){
        return request({
            url:"/country/delete",
            method:"get",
        })
    }
    
    , biologyList(){
        return request({
            url:"/country/list",
            method:"get",
        })
    }
    
    , biologyDelete(){
        return request({
            url:"/country/delete",
            method:"get",
        })
    }
    
    
    , countryFindSave(){
        return request({
            url:"/country/delete",
            method:"get",
        })
    }
    
    , countryFindList(){
        return request({
            url:"/country/list",
            method:"get",
        })
    }
    
    , countryFindDelete(){
        return request({
            url:"/country/delete",
            method:"get",
        })
    }
    
    
    , portFindSave(){
        return request({
            url:"/country/delete",
            method:"get",
        })
    }
    
    , portFindList(){
        return request({
            url:"/country/list",
            method:"get",
        })
    }
    
    , portFindDelete(){
        return request({
            url:"/country/delete",
            method:"get",
        })
    }
    
    
    , portCheckSave(){
        return request({
            url:"/country/delete",
            method:"get",
        })
    } ,
     portCheckList(){
        return request({
            url:"/country/list",
            method:"get",
        })
    },
     portCheckDelete(){
        return request({
            url:"/country/delete",
            method:"get",
        })
    }    
}






