/*
分页
ps:已写好的页面不建议改用此方法,因为已经很乱了再改浪费时间!!!
pps:仅供参考,主要是方便cya用...

1.获取分页条目(默认位于全局作用域)
原型:getData(Object,callback);
getData({
    url:'/system/get_warehouses',//接口url
    app:app1,//所需操纵的Vue对象
    refresh:[items,],//每次获取数据需要清空的数组
    pageNum:1,//你想获取第几页
    pageSize:6,//每页条目数(后台默认为6,最好不改)
    itemName:'warehouses',//接口回参的Map对象中,你所想获取的数据的属性名
    total:(totalNum)=>{
        //回调,totalNum是所有条目的数量
    },
},(allPages,data)=>{
    //回调,allPages是所有条目的总页数,data是本页所有条目的数据(List)
    }
});

2.清除数据(默认位于全局作用域)
原型:clearData(List);
clearData([items,maxPageRefs,totalRefs]);
*/
var post=require('./backend');

function totalCompute(url,callback,searchKey,attrName){
    post(url,searchKey?searchKey:{pageNum:1},(data)=>{
        var maxPage=data.allPages;
        if(searchKey){
            searchKey['pageNum']=maxPage;
        }
        post(url,searchKey?searchKey:{pageNum:maxPage},(data)=>{
            var arr=[];
            var items=attrName?data[attrName]:data;
            for(var key in items){
                arr.push(items[key]);
            }
            var total=6*(maxPage-1)+arr.length;
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
    if(params.pageNum!==undefined){
        if(params.searchKey){
            params.searchKey['pageNum']=params.pageNum;
            params.searchKey['pageSize']=params.pageSize;
        }
        post(params.url,params.searchKey?params.searchKey:{pageNum:params.pageNum,pageSize:params.pageSize},(data,err)=>{
            if(err){
                params.app.$message.error(err.msg);
                return;
            }
            totalCompute(params.url,params.total,params.searchKey,params.itemName);
            dataCallback(data.allPages,data[params.itemName]);
        });
    }else{
        post(params.url,params.searchKey?params.searchKey:{},(data,err)=>{
            if(err){
                params.app.$message.error(err.msg);
                return;
            }
            dataCallback(data);
        });
    }
    
}

export {clearData,getData};