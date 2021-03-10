/*function startLetterAnim(e) {
    anime.timeline({
            loop: false
        })
        .add({
            targets: e.children,
            translateX: [40, 0],
            translateZ: 0,
            opacity: [0, 1],
            easing: "easeOutExpo",
            duration: 1200,
            delay: (el, i) => 30 * i
        });
}

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

var rellax = new Rellax('.rellax');

const packAnimation = lottie.loadAnimation({
    container: document.getElementById('pack'),
    renderer: 'svg',
    loop: true,
    autoplay: true,
    //100% pack local
    //path: 'content/json/pack.json'

    //100% pack cloud
    path: 'https://assets10.lottiefiles.com/packages/lf20_utbxmit0.json'
});

packAnimation.addEventListener('data_ready', function() {
    var firstGrid = document.querySelector('.firstScreen .section-grid');
    var firstPack = document.querySelector('.firstScreen .lottie');
    firstPack.style.opacity = "1";
    setTimeout(() => {
        var previewPacks = $(".previewPack");
        firstGrid.style.opacity = "0.3";
        $(previewPacks).each(function(index) {
            $(this).css("opacity", "0")
        });
    }, 100);
    console.log('pack_ready')

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
    }, 850);
    window.setTimeout(() => {
        startLetterAnim(elem3);
    }, 1150);
    window.setTimeout(() => {
        startLetterAnim(elem4);
    }, 1450);

    var elemFirstHed = document.querySelector(".firstScreen h1");
    elemFirstHed.classList.add("animate");
    var elemFirstPar = document.querySelector(".firstScreen p");
    elemFirstPar.classList.add("animate");
    var elemFirstBut = document.querySelector(".firstScreen .linkButton");
    elemFirstBut.classList.add("animate");

    window.setTimeout(() => {
        elemFirstBut.style.transitionDelay = "0s";;
    }, 1400);
})

const jarAnimation = lottie.loadAnimation({
    container: document.getElementById('jar'),
    renderer: 'svg',
    loop: false,
    autoplay: false,
    //60% jar cloud
    path: 'https://assets1.lottiefiles.com/packages/lf20_jlvnqo9x.json'

    //60% jar local
    //path: 'content/json/jar-100to60.json'
});

function animateJar(duration, animObject) {
    var scrollPosition = $(window).scrollTop() - currentOffsetTop(jarAnimation.wrapper)[0] + duration + jarAnimation.wrapper.offsetHeight * 0.1;
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
*/
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


$(document).ready(function() {
    $('.fixedLogo_wrapper').midnight();

    var vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);

    var windowWidth = document.documentElement.clientWidth;
    var windowHeight = window.innerHeight;

    var animDuration = vh * 100;

    var bar = document.getElementById("gradientBar");

    var currBarPadding = 160;
    if (windowWidth >= 576 && windowWidth < 768) {
        currBarPadding = 96;
    } else if (windowWidth < 576) {
        currBarPadding = 32;
    }

    bar.closest(".bar_wrapper").style.height = bar.closest(".section-content").clientHeight - currBarPadding + "px";

    fixLogo(vh * 100, windowWidth)
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

    /* window.onzoom = function(e) {
             vh = window.innerHeight * 0.01;
             animDuration = vh * 100;
             document.documentElement.style.setProperty('--vh', `${vh}px`);

             if (windowWidth >= 576 && windowWidth < 768) {
                 currBarPadding = 96;
             } else if (windowWidth < 576) {
                 currBarPadding = 32;
             }
             bar.closest(".bar_wrapper").style.height = bar.closest(".section-content").clientHeight - currBarPadding + "px";

             fixLogo(vh * 100, windowWidth)
             fillVerticalBar(bar, windowWidth, vh * 100);
             animateJar(animDuration / 2, jarAnimation);
         }*/
    /*window.addEventListener('scroll', function(e) {
        fixLogo(vh * 100, windowWidth)
        fillVerticalBar(bar, windowWidth, vh * 100);
        animateJar(animDuration / 2, jarAnimation);
    });*/
});

function fillVerticalBar(e, wW, wH) {
    var currBarPadding = 160;
    if (wW >= 576 && wW < 768) {
        currBarPadding = 96;
    } else if (wW < 576) {
        currBarPadding = 32;
    }
    var scrollFromTop = window.pageYOffset;
    var newHeightBar = scrollFromTop - currBarPadding;
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

function fixLogo(wH, wW) {
    var scrollTop = $(window).scrollTop();
    if (scrollTop > wH) {
        $(".fixedLogo_wrapper").css("opacity", "1");
        $(".previewLogo_wrapper").css("opacity", "0");
    } else {
        $(".fixedLogo_wrapper").css("opacity", "0");
        $(".previewLogo_wrapper").css("opacity", "1");
    }

    if (wW >= 576) {
        var marginsTopBottom = 80;
        var heightContentSecondScr = $(".secondScreen .section-content_leftPart").height();
        var heightH1SecondScr = $(".secondScreen h1").height();
        console.log(heightH1SecondScr);

        if (scrollTop <= wH + marginsTopBottom) {
            $(".secondScreen h1").css("position", "static");
            $(".secondScreen h1").css("top", "0");
        } else if (scrollTop > wH + marginsTopBottom && scrollTop <= wH + heightContentSecondScr - heightH1SecondScr) {
            $(".secondScreen h1").css("position", "fixed");
            $(".secondScreen h1").css("top", "0");
        } else if (scrollTop > wH + heightContentSecondScr - heightH1SecondScr) {
            $(".secondScreen h1").css("position", "absolute");
            $(".secondScreen h1").css("top", heightContentSecondScr - heightH1SecondScr);
        }
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