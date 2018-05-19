/*
数据获取模块
ps:已写好的页面不建议改用此方法,因为已经很乱了再改浪费时间!!!

1.获取分页条目

getData({
    url:'/system/get_warehouses',//接口
    app:app1,//Vue对象
    refresh:[items,],//每次获取数据需要清空的数组
    pageNum:1,
    pageSize:10,
    itemName:'warehouses',//接口回参的data中,条目的属性名
    total:(totalNum)=>{
        //回调,totalNum是条目总数
    },
},(allPages,allItems)=>{
    //回调,allPages是总页数,allItems是本页所有条目
}
});

2.获取非分页条目

getData({
    url:'/system/get_warehouses',//接口
    app:app1,//Vue对象
    refresh:[items,],//每次获取数据需要清空的数组
},(data)=>{
    //回调,data即回参data
}
});

3.清除数据
clearData([items,maxPageRefs,totalRefs]);
*/
var post=require('./backend');

function totalCompute(url,callback,searchKey,attrName){
    post(url,searchKey?searchKey:{pageNum:1},(data)=>{
        maxPage=data.allPages;
        if(searchKey){
            searchKey['pageNum']=maxPage;
        }
        post(url,searchKey?searchKey:{pageNum:maxPage},(data)=>{
            var arr=[];
            var items=attrName?data[attrName]:data;
            for(var key in items){
                arr.push(items[key]);
            }
            total=6*(maxPage-1)+arr.length;
            callback(total);
        })
    })
}

function clearData(listsToPop){
    for(var i in listsToPop){
        while(listsToPop[i][0]!==undefined){
            listsToPop[i].pop();
        }
    }
}

function getData(params,dataCallback){
    clearData(params.refresh);
    if(params.app.initializing!==undefined){
        params.app.initializing=true;
    }
    if(params.pageNum!==undefined){
        if(params.searchKey){
            params.searchKey['pageNum']=params.pageNum;
            params.searchKey['pageSize']=params.pageSize;
        }
        post(params.url,params.searchKey?params.searchKey:{pageNum:params.pageNum,pageSize:params.pageSize},(data,err)=>{
            if(params.app.initializing!==undefined){
                params.app.initializing=false;
            }
            if(err){
                params.app.$message.error(err.msg);
                return;
            }
            totalCompute(params.url,params.total,params.searchKey,params.itemName);
            dataCallback(data.allPages,data[params.itemName]);
        });
    }else{
        post(params.url,params.searchKey?params.searchKey:{},(data,err)=>{
            if(params.app.initializing!==undefined){
                params.app.initializing=false;
            }
            if(err){
                params.app.$message.error(err.msg);
                return;
            }
            dataCallback(data);
        });
    }
    
}

export {clearData,getData};