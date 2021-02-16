const packAnimation = lottie.loadAnimation({
    container: document.getElementById('pack'),
    renderer: 'svg',
    loop: true,
    autoplay: true,
    //path: 'content/json/pack.json'
    path: 'https://assets10.lottiefiles.com/packages/lf20_utbxmit0.json'
});

packAnimation.addEventListener('data_ready', function () {
    setTimeout(() => {
        var previewPacks = $(".previewPack");
        $(previewPacks).each(function (index) {
            $(this).css("opacity", "0")
        });
    }, 100);
    console.log('pack_ready')
})

const jarAnimation = lottie.loadAnimation({
    container: document.getElementById('jar'),
    renderer: 'svg',
    loop: false,
    autoplay: false,
    path: 'https://assets4.lottiefiles.com/packages/lf20_edtxpuzu.json'
});

function animateJar(duration, animObject) {
    var scrollPosition = $(window).scrollTop() - currentOffsetTop(jarAnimation.wrapper)[0] + duration - jarAnimation.wrapper.offsetHeight * 0.6;
    var maxFrames = animObject.totalFrames;
    var frame = (maxFrames / 100) * (scrollPosition / (duration / 100));
    if (frame < 0) {
        frame = 0;
    }
    if (frame >= maxFrames) {
        frame = maxFrames - 1;
    }
    animObject.goToAndStop(frame, true);
}

jarAnimation.addEventListener("enterFrame", function (animation) {
    if (animation.currentTime > (jarAnimation.totalFrames - 1)) {
        jarAnimation.pause();
    }
});

jarAnimation.addEventListener('data_ready', function () {
    setTimeout(() => {
        var previewPacks = $(".previewJar");
        $(previewPacks).each(function (index) {
            $(this).css("opacity", "0")
        });
        window.scrollTo(0, $(window).scrollTop() - 1);
    }, 100);
    console.log('jar_ready')
})




function currentOffsetTop(element) {
    var offsetTop = 0;
    do {
        offsetTop += element.offsetTop;
    } while (element = element.offsetParent);
    return [offsetTop];
}




$(document).ready(function () {
    console.log(currentOffsetTop(jarAnimation.wrapper)[0] + "  " + $(window).scrollTop());
    console.log();
    $('.fixedLogo_wrapper').midnight();

    var vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);

    var windowWidth = document.documentElement.clientWidth;
    var windowHeight = window.innerHeight;

    var animDuration = vh * 100;

    var bar = $("#gradientBar");

    adaptСontent(windowWidth, windowHeight);
    $(bar).closest(".bar_wrapper").height($(bar).closest(".section-content").height() + 2);

    fixLogo(vh * 100)
    fillVerticalBar(bar, windowWidth, vh * 100);

    window.onzoom = function (e) {
        vh = window.innerHeight * 0.01;
        animDuration = vh * 100;
        document.documentElement.style.setProperty('--vh', `${vh}px`);

        adaptСontent(windowWidth, windowHeight);
        $(bar).closest(".bar_wrapper").height($(bar).closest(".section-content").height() + 2);

        fixLogo(vh * 100)
        fillVerticalBar(bar, windowWidth, vh * 100);
        animateJar(animDuration, jarAnimation);
    }

    $(window).scroll(function () {
        fixLogo(vh * 100)
        fillVerticalBar(bar, windowWidth, vh * 100);
        animateJar(animDuration, jarAnimation);
    });
});

function fillVerticalBar(e, wW, wH) {
    if (($(window).scrollTop() + wH - e.offset().top - 80) <= $(e).closest(".bar_wrapper").height()) {
        $(e).css("align-self", "flex-start");
        $(e).height($(window).scrollTop() + wH - e.offset().top - 80);
    } else if (($(window).scrollTop() + wH - e.offset().top - 80) > $(e).closest(".bar_wrapper").height()) {
        if ($(e).closest("section").height() - 2 <= wH) {
            setTimeout(() => {
                $(e).css("align-self", "flex-end");
                $(e).height($(e).closest(".bar_wrapper").height() + wH - $(window).scrollTop());
            }, 10);
        } else {
            $(e).height($(e).closest(".bar_wrapper").height());
        }
    }
}

function fixLogo(wH) {
    if ($(window).scrollTop() > wH) {
        $(".fixedLogo_wrapper").show();
        $(".previewLogo_wrapper").hide();
    } else {
        $(".fixedLogo_wrapper").hide();
        $(".previewLogo_wrapper").show();
    }
}

function adaptСontent(wW, wH) {
    var isPackHit = (wW / wH) < 1.3 ? true : false;
    if (/*!isPackHit*/ wW > 960) {

        /*if (!(wW >= 1439 && wW <= 1441)) {*/
        //adjustContentSize();
        /*}*/
    } else {

    }
}

function adjustContentSize() {
    var zoomLevel = ((screen.width) / (window.innerWidth));
    var inverseZoom = ((window.innerWidth) / (screen.width));
    var elements = document.getElementsByClassName("zoomableContent");
    for (i = 0; i < elements.length; i++) {
        elements[i].style.top = (((window.pageYOffset) + 0) * zoomLevel).toString() + "px";
        elements[i].style.paddingLeft = ((((window.pageXOffset) + 0) * zoomLevel).toString()) + "px";
        elements[i].style.zoom = inverseZoom;
    }
}

(function () {
    var oldresize = window.onresize;
    window.onresize = function (e) {
        var event = window.event || e;
        if (typeof (oldresize) === 'function' && !oldresize.call(window, event)) {
            return false;
        }
        if (typeof (window.onzoom) === 'function') {
            return window.onzoom.call(window, event);
        }
    }
})();
