window.onload=function(){
    headerScroll();
    bannerSlide();
    seckill();
    timerDown(3);
    slide1();
    slide2();
    sli   de3();
    getMore();

}

// part1: scroll to change the header's opacity
function headerS   croll(){
    var header=document.querySelector(".jd_header");
    var banner=document.querySelector(".jd_banner");
    window.onscroll=function(){
        var bannerHeight=banner.offsetHeight;
        var height=document.body.scrollTop;
        var percent=height/bannerHeight;
        if(height>=bannerHeight){
            percent=0.9;
        }
        header.style.backgroundColor="rgba(215,24,29,"+percent+")";
    }
}

// part2: (easy)-finish the timeDown
function timerDown(total){
    // get elemtents limit to time;
    var timeCount=document.querySelector(".jd_seckill");
    var timeBox=tim  eCount.querySelectorAll(".seckill_time");
    var totalSec=total*3600;
    var timer=setInterval(function(){
        var second=totalSec%60;
        var hour=Math.floor(totalSec/60/60);
        var mintue=Math.floor(totalSec/60%60);
        hour=hour<10?("0"+hour):hour;
        mintue=mintue<10?("0"+mintue):mintue;
        second=second<10?("0"+second):second;
        totalSec--;
        timeBox[0].innerHTML=hour;
        timeBox[1].innerHTML=mintue;
        timeBox[2].innerHTML=second;
        if(totalSec==0){
            clearInterval(timer);
        }
    },1000)
}

// part3:seckill_bottom
function seckill(){
    var secEle=document.querySelector(".jd_seckill .seckill_bottom .seckill_news_list");
    var width=document.body.offsetWidth;
    var ulWidt   h=secEle.offsetWidth;
    var maxDistance=0;
    var minDistance=width-ulWidth;
    var startX=0,moveX=0,distanceX=0;
    secEle.addEventListener("touchstart",function(event){
        start  X=event.touches[0].clientX+moveX;
    });
    secEle.addEventListener("touchmove",function(event){
        moveX=event.touches[0].clientX-startX;
        if((moveX+distanceX)>maxDistance){
            moveX=0;
            distanceX=maxDistance;
        }else if((moveX+distanceX)<minDistance){
            moveX=0;
            distanceX=minDistance;
        }
        secEle.style.transform="translateX("+(moveX+distanceX)+"px)"
    });
    secEle.addEventListener("touchend",function(){
        distanceX+=moveX;
    })
}

// part4: finish the bannerSlide use the touchs event(touchstart/touchmove/touchend) and the transitionEnd event;
function bannerSlide(){
    var ul=document.querySelector(".jd_banner .jd_images");
    var width=document.body.offsetWidth;
    var jd_index=document.querySelector(".jd_banner .jd_index");
    var indexArr=jd_index.querySelectorAll("li");
    var index=1;
    var timer=null;
    var maxIndex=8;
    slide(ul,width,indexArr,index,timer,maxIndex);
}

// slide1
function slide1(){
    var ul=document.querySelector(".jd_content .floor:nth-child(3) ul");
    var width=document.querySelector(".jd_content .floor:nth-child(3) .floor_item").offsetWidth;
    var indexArr=document.querySelectorAll(".jd_content .floor:nth-child(3) .slideIndex span");
    var index=1;
    var timer=null;
    var maxIndex=2;
    slide(ul,width,indexArr,index,timer,maxIndex);
}

// slide2
function slide2(){
    var ul=document.querySelector(".jd_content .floor:nth-child(5) ul");
    var width=document.querySelector(".jd_content .floor:nth-child(5) .floor_item").offsetWidth;
    var indexArr=document.querySelectorAll(".jd_content .floor:nth-child(5) .slideIndex span");
    var index=1;
    var timer=null;
    var maxIndex=2;
    slide(ul,width,indexArr,index,timer,maxIndex);
}

// slide3
function slide3(){
    var ul=document.querySelector(".jd_content .floor:nth-child(7) ul");
    var width=document.querySelector(".jd_content .floor:nth-child(7) .floor_item").offsetWidth;
    var indexArr=document.querySelectorAll(".jd_content .floor:nth-child(7) .slideIndex span");
    var index=1;
    var timer=null;
    var maxIndex=2;
    slide(ul,width,indexArr,index,timer,maxIndex);
}

// slide公共代码
function slide(ul,width,indexArr,index,timer,maxIndex){
    timer=setInterval(function(){
        index++;
        ul.style.transition="all 0.3s";
        ul.style.transform="translateX("+width*index*-1+"px)";
        },1500)
        ul.addEventListener("webkitTransitionEnd",function(){
            if(index<1){
                index=maxIndex;
                ul.style.transition="";
                ul.style.transform="translateX("+index*width*-1+"px)";
            }
            else if(index>maxIndex){
                index=1;
                ul.style.transition="";
                ul.style.transform="translateX("+index*width*-1+"px)";
            }
            // indexArr
             for(var i=0,len=indexArr.length; i<len; i++){
                indexArr[i].className="";
        }
                indexArr[index-1].className="current";
        })

        // touch事件
        var startX=0,moveX=0;
        ul.addEventListener("touchstart",function(event){
            // 触摸开始，关闭定时器
            clearInterval(timer);
            ul.style.transition="";
            startX=event.touches[0].clientX;
        });
        ul.addEventListener("touchmove",function(event){
            timer=clearInterval(timer);
            moveX=event.touches[0].clientX-startX;
            ul.style.transform="translateX("+(moveX+index*width*-1)+"px)";
        });
        ul.addEventListener("touchend",function(event){
            if(Math.abs(moveX)>width/3){
                if(moveX>0){
                    index--;
                }else {
                    index++;
                }
                ul.style.transition="all 0.3s";
                ul.style.transform="translateX("+index*width*-1+"px)";
            }
            else {
                ul.style.transition="all 0.3s";
                ul.style.transform="translateX("+index*width*-1+"px)";
            }
        timer=setInterval(function(){
            index++;
            ul.style.transition="all 0.3s";
            ul.style.transform="translateX("+width*index*-1+"px)";
            },1800)
        })
}


// geMore
function getMore(){
    var Mbtn=document.querySelector(".jd_recommend .jd_recommend_body .Mbtn");
    var similarList=document.querySelector(".jd_recommend .jd_recommend_body .similer_list_more")
    Mbtn.onclick=function(){
        ajax_tool({
            url:'./api/index.php',
            method:'get',
            data:undefined,
            success:function(data){
                var getData=JSON.parse(data);
                console.log(getData);
                var obj={
                    list:getData
                }
                var result=template("template",obj);
                similarList.innerHTML+=result;
            }
        })
    }
}


