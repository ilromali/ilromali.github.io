AOS.init({
    // Global settings:
    disable: false, // accepts following values: 'phone', 'tablet', 'mobile', boolean, expression or function
    startEvent: 'DOMContentLoaded', // name of the event dispatched on the document, that AOS should initialize on
    initClassName: 'aos-init', // class applied after initialization
    animatedClassName: 'aos-animate', // class applied on animation
    useClassNames: false, // if true, will add content of `data-aos` as classes on scroll
    disableMutationObserver: false, // disables automatic mutations' detections (advanced)
    debounceDelay: 50, // the delay on debounce used while resizing window (advanced)
    throttleDelay: 99, // the delay on throttle used while scrolling the page (advanced)


    // Settings that can be overridden on per-element basis, by `data-aos-*` attributes:
    offset: 120, // offset (in px) from the original trigger point
    delay: 0, // values from 0 to 3000, with step 50ms
    duration: 400, // values from 0 to 3000, with step 50ms
    easing: 'ease', // default easing for AOS animations
    once: false, // whether animation should happen only once - while scrolling down
    mirror: false, // whether elements should animate out while scrolling past them
    anchorPlacement: 'top-bottom', // defines which position of the element regarding to window should trigger the animation
});

const packAnimation = lottie.loadAnimation({
    container: document.getElementById('pack'),
    renderer: 'svg',
    loop: true,
    autoplay: true,
    //path: 'content/json/pack.json'
    path: 'https://assets10.lottiefiles.com/packages/lf20_utbxmit0.json'
});

packAnimation.addEventListener('data_ready', function() {
    setTimeout(() => {
        var previewPacks = $(".previewPack");
        $(previewPacks).each(function(index) {
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

jarAnimation.addEventListener("enterFrame", function(animation) {
    if (animation.currentTime > (jarAnimation.totalFrames - 1)) {
        jarAnimation.pause();
    }
});

jarAnimation.addEventListener('data_ready', function() {
    setTimeout(() => {
        var previewPacks = $(".previewJar");
        $(previewPacks).each(function(index) {
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

function debounce(func, wait, immediate) {
    var timeout;
    return function() {
        var context = this,
            args = arguments;
        var later = function() {
            timeout = null;
            if (!immediate) func.apply(context, args);
        };
        var callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func.apply(context, args);
    };
};

function startLetterAnim(e) {
    anime.timeline({ loop: false })
        .add({
            targets: e.children,
            translateX: [40, 0],
            translateZ: 0,
            opacity: [0, 1],
            easing: "easeOutExpo",
            duration: 1500,
            delay: (el, i) => 30 * i
        });
}

$(document).ready(function() {
    var elems = document.querySelectorAll('.ml12');
    var textWrapper = elems;
    for (let j = 0; j < textWrapper.length; j++) {
        textWrapper[j].innerHTML = textWrapper[j].textContent.replace(/\S/g, "<span class='letter'>$&</span>");
    }
    var elem1 = document.querySelector(".byLetter1");
    var elem2 = document.querySelector(".byLetter2");
    var elem3 = document.querySelector(".byLetter3");
    var elem4 = document.querySelector(".byLetter4");
    window.setTimeout(() => {
        startLetterAnim(elem1);
    }, 150);
    window.setTimeout(() => {
        startLetterAnim(elem2);
    }, 650);
    window.setTimeout(() => {
        startLetterAnim(elem3);
    }, 1150);
    window.setTimeout(() => {
        startLetterAnim(elem4);
    }, 1650);

    $('.fixedLogo_wrapper').midnight();

    var vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);

    var windowWidth = document.documentElement.clientWidth;
    var windowHeight = window.innerHeight;

    var animDuration = vh * 100;

    var bar = document.getElementById("gradientBar");

    adaptСontent(windowWidth, windowHeight);

    var currBarPadding = 160;
    if (windowWidth >= 768 && windowWidth < 992) {
        currBarPadding = 96;
    }

    bar.closest(".bar_wrapper").style.height = bar.closest(".section-content").clientHeight - currBarPadding + "px";

    fixLogo(vh * 100)
    fillVerticalBar(bar, windowWidth, vh * 100);

    const form = document.querySelector('form');
    const userName = document.querySelector('#user_name');
    const userEmail = document.querySelector('#user_email');
    const accessCode = document.querySelector('#access_code');
    const userMessage = document.querySelector('#user_message');
    form.addEventListener('submit', function(evt) {
        evt.preventDefault();

        var messages = document.querySelectorAll(".requiredMessage");
        messages.forEach(function(item) {
            item.innerHTML = "";
        });

        var fields = document.querySelectorAll(".requiredField");
        fields.forEach(function(item) {
            item.classList.remove("requiredField");
        });

        if (!userName.value || !userEmail.value || !accessCode.value || !userMessage.value) {
            if (!userName.value) {
                userName.parentElement.querySelector('.requiredMessage').innerHTML = "required";
                userName.classList.add("requiredField");
            }
            if (!userEmail.value) {
                userEmail.parentElement.querySelector('.requiredMessage').innerHTML = "required";
                userEmail.classList.add("requiredField");
            }
            if (!accessCode.value) {
                accessCode.parentElement.querySelector('.requiredMessage').innerHTML = "required";
                accessCode.classList.add("requiredField");
            }
            if (!userMessage.value) {
                userMessage.parentElement.querySelector('.requiredMessage').innerHTML = "required";
                userMessage.classList.add("requiredField");
            }
            return;
        }

        form.submit();
    });

    window.onzoom = function(e) {
        vh = window.innerHeight * 0.01;
        animDuration = vh * 100;
        document.documentElement.style.setProperty('--vh', `${vh}px`);

        adaptСontent(windowWidth, windowHeight);

        if (windowWidth >= 768 && windowWidth < 992) {
            currBarPadding = 96;
        }
        bar.closest(".bar_wrapper").style.height = bar.closest(".section-content").clientHeight - currBarPadding + "px";

        fixLogo(vh * 100)
        fillVerticalBar(bar, windowWidth, vh * 100);
        animateJar(animDuration, jarAnimation);
    }
    window.addEventListener('scroll', function(e) {
        fixLogo(vh * 100)
        fillVerticalBar(bar, windowWidth, vh * 100);
        animateJar(animDuration, jarAnimation);
    });
});

function fillVerticalBar(e, wW, wH) {
    var scrollFromTop = window.pageYOffset;
    var newHeightBar = scrollFromTop - 160;
    var heightBarWrapper = e.closest(".bar_wrapper").clientHeight;
    var newReturnHeightBar = heightBarWrapper + wH - scrollFromTop;
    var parentSectionHeight = e.closest("section").clientHeight;
    if (newHeightBar <= 0) {
        newHeightBar = 0;
    }
    if (newReturnHeightBar <= 0) {
        newReturnHeightBar = 0;
    }
    if (newHeightBar <= heightBarWrapper) {
        e.style.alignSelf = "flex-start";
        e.style.height = newHeightBar + "px";
    } else if (newHeightBar > heightBarWrapper) {
        if (parentSectionHeight <= wH) {
            e.style.alignSelf = "flex-end";
            e.style.height = newReturnHeightBar + "px";
        } else {
            e.style.height = heightBarWrapper + "px";
        }
    }
}

function fixLogo(wH) {
    if ($(window).scrollTop() > wH) {
        $(".fixedLogo_wrapper").css("opacity", "1");
        $(".previewLogo_wrapper").css("opacity", "0");
    } else {
        $(".fixedLogo_wrapper").css("opacity", "0");
        $(".previewLogo_wrapper").css("opacity", "1");
    }
}

function adaptСontent(wW, wH) {
    var isPackHit = (wW / wH) < 1.3 ? true : false;
    if ( /*!isPackHit*/ wW > 960) {

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

(function() {
    var oldresize = window.onresize;
    window.onresize = function(e) {
        var event = window.event || e;
        if (typeof(oldresize) === 'function' && !oldresize.call(window, event)) {
            return false;
        }
        if (typeof(window.onzoom) === 'function') {
            return window.onzoom.call(window, event);
        }
    }
})();