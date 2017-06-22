function ajax_tool(option){
    function XHR(){
        if(window.XMLHttpRequest){
            return new XMLHttpRequest();
        }else {
            return new ActiveObject();
        }
    }
        var xhr=XHR();
        //判断是get 还是post方式提交
        if(option.method=="get"){
            if(option.data){
                option.url+="?";
                option.url+=option.data;
            }
            xhr.open(option.method,option.url);
            xhr.send(null);
        }else if(option.method=="post"){
            xhr.open(option.method,option.url);
            xhr.setRequestHeader("Content-type","application/x-www-form-urlencoded")
            if(option.data){
                xhr.send(option.data);
            }else {
                xhr.send();
            }
        }
        xhr.onreadystatechange=function(){
            if(xhr.readyState==4&&xhr.status==200){
                option.success(xhr.responseText)
            }
        }
    }
