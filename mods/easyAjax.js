import '../BR-MS/lib/jquery.min.js'

var urlPrefix=require('/mods/backend').url;
export default function easyAjax(params){
    $.ajax({
        type:'post',
        url:urlPrefix+params.url,
        headers:{
            'Content-Type':'application/json',
            'token':localStorage.getItem('token')
        },
        data:JSON.stringify(params.data),
        beforeSend:params.beforeSend|null,
        success:params.success|null,
        complete:params.complete|null,
        error:params.error|null
    });
}