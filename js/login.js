window.onload=function(){
    loginTest();
}
// loginTest
function loginTest(){
    var userName=document.querySelector(".input_userName #username");
    var password=document.querySelector(".jd_login section #password");
    var inpCode=document.querySelector(".jd_login section #code");
    var showNews=docum   ent.querySelector(".jd_login section .showNews")
    var nameReg=/^[a-zA-Z_]{3,16}$/;/*用户名以字母或者下划线开头，3-16位长。*/
    var passReg=/([a-zA-Z0-9!@#$%^&*()_?<>{}]){8,18}/;/*密码由8-18位的数字字母或者下划线。特殊字符构成*/
    // 1.username test
    userName.onblur=function(){
        if(nameReg.test(this.value)){
            showNews.innerHTML="用户名正确";
            showNews.style.color="green";
        }else {
            showNews.innerHTML="用户名必须以不少于3位的字母构成，下划线开头";
            showNews.style.color="red";
        }
    }
    // 2.passwordTest
    password.onblur=function(){
        if(passReg.test(password.value)){
            showNews.innerHTML="密码输入正确";
            showNews.style.color="green";
        }else {
            showNews.innerHTML="密码由不少于8位的数字、字母或者特殊字符组成";
            showNews.style.color="red";
        }
    }
}