// 地区切换
var site_list = document.getElementsByClassName('site-list')[0];
site_list.onclick = function (e) {
    var target = e.target || e.srcElement;
    if (target.tagName.toLowerCase() == 'a') {
        var str = target.innerText;
        var site_name = document.getElementsByClassName('site_name')[0];
        var selected = document.getElementById('selected');
        selected.id = '';
        target.setAttribute('id', 'selected');
        site_name.innerText = str;

    }
}
// 取消所有a标签的指向
var a = document.getElementsByTagName('a');
for (var i = 0; i < a.length; i++) {
    a[i].onclick = function () {
        return false;
    }
}

// jd-logo 在hover时重新加载
function setGifRefresh() {
    var logo = document.getElementsByClassName('jd-logo')[0];
    var gif = document.getElementById('jd-logo-gif');
    var shade_bg = document.getElementsByClassName('shade-bg')[0];
    logo.addEventListener('mouseenter', function () {
        gif.src = gif.src;
        var logoTimer = setTimeout(function () {
            shade_bg.style.visibility = 'visible';
            shade_bg.style.opacity = '1';
        }, 2500);
        logo.addEventListener('mouseleave', function () {
            clearTimeout(logoTimer);
            shade_bg.style.visibility = 'hidden';
            shade_bg.style.opacity = '0';
        })

    })
}
setGifRefresh();
// 搜索框的placeholder定时更改
function setPlaceholder() {
    var search_box = document.getElementById('search-box');
    var search_value = ['厨房置物架', 'dell显示器', '格力变频空调', '榨汁机家用', '中秋发福季', '儿童运动鞋', '电动自行车', '触摸屏笔记本', '电脑数码', '派克钢笔'];
    var i = 0;
    setInterval(() => {
        search_box.setAttribute('placeholder', search_value[i]);
        if (++i == search_value.length) i = 0;
    }, 2000);

}
setPlaceholder();
// 热搜的关键字
function setKeyword() {
    var keyword = document.getElementById('keyword');
    var keywords_value = ['工业博览会', '电脑学生价'];
    var i = 0;
    setInterval(() => {
        keyword.innerText = keywords_value[i];
        if (++i == keywords_value.length) i = 0;
    }, 3000);
}
setKeyword();


// 轮播图中的公共方法
var index = 0;
var wrapper = document.getElementsByClassName('pic-wrapper')[0];
var pic_item = document.getElementsByClassName('pic-item');
var imgWidth = pic_item[0].offsetWidth;
var dots = document.getElementsByClassName('dot');
var timer;
pic_item[0].style.opacity = 1; //不设置的话第一张图片看不到

function nextPic() {
    var leftLen = parseInt(getComputedStyle(wrapper).left);
    pic_item[index].style.opacity = 0; //当前图片消失
    leftLen = leftLen - imgWidth;
    if (index < 7) index++;
    else {
        leftLen = 0;
        index = 0;
    }
    wrapper.style.left = leftLen + 'px'; //切换图片
    pic_item[index].style.opacity = 1;  //新图片显示
}
function lastPic() {
    var leftLen = parseInt(getComputedStyle(wrapper).left);
    pic_item[index].style.opacity = 0;
    leftLen = leftLen + imgWidth;
    if (index == 0) {
        index = 7;
        leftLen = -(pic_item.length - 1) * imgWidth;
    }
    else index--;

    wrapper.style.left = leftLen + 'px';
    pic_item[index].style.opacity = 1;
}
// 导航栏中的dots
function setDotLight() {
    for (var i = 0; i < dots.length; i++) {
        dots[i].classList.remove('on');
    }
    dots[index].classList.add('on');
}

// 轮播图
function setRotatePic() {
    timer = setInterval(() => {
        nextPic();
        setDotLight();
    }, 3000);
}

setRotatePic();
// 左右箭头的点击
function setPicChange() {
    var left_btn = document.getElementsByClassName('left-arrow')[0];
    var right_btn = document.getElementsByClassName('right-arrow')[0];

    left_btn.onclick = function () {

        clearInterval(timer); //防止点击时定时器仍运行,造成某一时刻图片重复
        lastPic();
        setDotLight();
        setRotatePic(); //重新运行定时器
    }
    right_btn.onclick = function () {
        clearInterval(timer); //防止点击时定时器仍运行,造成某一时刻图片重复
        nextPic();
        setDotLight();
        setRotatePic(); //重新运行定时器
    }
}
setPicChange();

function hoverDot() {
    var dots_box = document.getElementsByClassName('dots-container')[0];
    dots_box.onmouseover = function (e) {
        var target = e.target || e.srcElement;
        if (target.tagName.toLowerCase() == 'li') {
            var hover_index = Number(target.className.match(/\d+/)) - 1;
            if (index == hover_index) return;
            clearInterval(timer);
            pic_item[index].style.opacity = 0; //当前图片消失
            index = hover_index;

            var leftLen = parseInt(getComputedStyle(wrapper).left);
            leftLen = - index * imgWidth;

            wrapper.style.left = leftLen + 'px'; //切换图片
            pic_item[index].style.opacity = 1;  //新图片显示

            setDotLight();
            setRotatePic();
        }
    }
}
hoverDot();
