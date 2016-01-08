// vars
var windowWidth;
var windowHeight;
var footerHeight = 94;
var support_history;
var frontRightBottom = 0;

var move_ctxt = 0.5;
var move_cimg = 0.8;
var move_middle_heart = 0.2;
var move_heart1 = 0.7;
var move_heart2 = 1.5;
var move_heart3 = 0.5;
var move_heart4 = 1;
var move_heart5 = 0.7;
var current_middle_heart = 0;
var current_heart1 = 0;
var current_heart2 = 0;
var current_heart3 = 0;
var current_heart4 = 0;
var current_heart5 = 0;

var lastPosition = 0;
var scrollingDirection = 'down';
var current_ctxt = new Array();
var current_cimg = new Array();



jQuery(document).ready(function($) {
    support_history = supports_history_api();
    window.odometerOptions = {
        auto: false, // Don't automatically initialize everything with class 'odometer'
        //selector: '#page3-counting', // Change the selector used to automatically find things to be animated
        format: '(ddd)', // Change how digit groups are formatted, and how many digits are shown after the decimal point
        duration: 2000 // Change how long the javascript expects the CSS animation to take
        //theme: 'car', // Specify the theme (if you have more than one theme css file on the page)
        //animation: 'count' // Count is a simpler animation method which just increments the value,             // use it when you're looking for something more subtle.
    };

    // Detect request animation frame
    var scroll = window.requestAnimationFrame ||
         window.webkitRequestAnimationFrame ||
         window.mozRequestAnimationFrame ||
         window.msRequestAnimationFrame ||
         window.oRequestAnimationFrame ||
         // IE Fallback, you can even fallback to onscroll
         function(callback){ window.setTimeout(callback, 1000/60) };


    lastPosition = -1;
    function loop(){
        var st = window.pageYOffset;
        if (lastPosition == st) {
            scroll(loop);
            return false;
        }

        if (st > lastPosition) {
            scrollingDirection = 'down';
        } else {
            scrollingDirection = 'up';
        }
        lastPosition = st;
        checkPortfoliosViewPort();

        scroll( loop )
    }
    // prepare phones for fancy animation thing
    current_cimg = 35;
    current_ctxt = 35;

    $(window).load(function(){
        frontRightBottom = $('.frontRightFill').css('bottom');
        $('#homepage2').css('display', 'none');

        homepage_screen();

        // counting box recalculate right
        var right = windowWidth - 1252;
        right = (parseInt(right / 2) + 200);
        $('#page3-counting').css('right', ("-" + right + "px"));

        // parallax
        $('#homepage').parallax("50%", 0.12);

        menuScrollOnClick();
        doWaypoints();

        bigScreenAdjustment();

        // Call the loop for the first time
        loop();

    });

    $(window).resize(function() {
        homepage_screen();
        bigScreenAdjustment();
    });

});

function supports_history_api() {
    return !!(window.history && history.pushState);
}

function homepage_screen() {
    calculate_sizes();
    $('#homepage').css({width: windowWidth, height: windowHeight});
    $('.fullHeight').css('min-height', windowHeight - footerHeight);
}

function calculate_sizes() {
    windowWidth = $(window).width();
    windowHeight = $(window).height();
}

function menuScrollOnClick() {
    $("#frontArrowDown, nav ul li a").click(function(e) {
        var href = $(this).attr('href');
        var elemPos = $(href).offset().top;
        if(support_history) {
            window.history.replaceState({}, '#page2', href);
        }
        $(this).css({'text-decoration': 'none'}); //'border-bottom':'none'
        $('html,body').animate({
            scrollTop: elemPos
        }, 700, 'easeInOutQuart');
        e.preventDefault();
    });
}

function doWaypoints() {
    // odometer
    $('#page3-counting').waypoint(function (direction) {
            var c = this.element;
            setTimeout(function () {
                $(c).addClass('in');
            }, 1800);


            setTimeout(function () {
                var el = document.getElementById('page3-nr');
                od = new Odometer({
                    el: el,
                    value: 128,
                    // Any option (other than auto and selector) can be passed in here
                    format: '',
                    theme: 'default'
                });
                el.innerHTML = 500;
            }, 2090);

        },
        {
            offset: '100%'
        }
    );

    $('#page2-2-left, .page2-1-left-opacity-wrapper, .quote h2, .quote h3, #quote2 .row, #page4-1 > div, #page5-insp, #comingSoonWrap, #page6-fade, #page6-lv, #page6-zi, #page7-fade').css({ y: "20px"});
    $('#page2-2-left').waypoint(function (direction) {
            $(this.element).transition({opacity : 1, y: 0, delay: 200}, 600);
        },
        {
            offset: '100%'
        }
    );

    $('.page2-1-left-opacity-wrapper').waypoint(function (direction) {
            $(this.element).transition({opacity : 1, y: 0, delay: 200}, 600);
        },
        {
            offset: '100%'
        }
    );

    $('.quote h2, .quote h3, #quote2 .row, #page4-1 > div, #page5-insp').waypoint(function (direction) {
            $(this.element).transition({opacity : 1, y: 0, delay: 200}, 600);
        },
        {
            offset: '100%'
        }
    );

    $('#comingSoonWrap').waypoint(function (direction) {
        $(this.element).transition({opacity : 1, y: 0, delay: 500}, 600);
    },
    {
        offset: '95%'
    }
    );



    $('#page3-q1').waypoint({
        handler: function (direction) {
            setTimeout(function() {
                $('#page3-q1, #page3-q2, #page3-q3, #page3-q4').removeClass('startPosition');
            }, 250);
        }
    });

    $('#page5').waypoint(function(){
        $('#page5-img3').removeClass('startPosition');
            setTimeout(function() {
                $('#page5-img2').removeClass('startPosition');
            }, 500);
            setTimeout(function() {
                $('#page5-img1').removeClass('startPosition');
            }, 750);
            /*
            setTimeout(function() {
                // fade right side
            }, 1000);*/
    },
    {
        offset: '50%'
    });

    $('#dv').waypoint(function() {
        $('#page6-1-app.start').removeClass('start');
        setTimeout(function() {
            $('#page6-lv').transition({opacity : 1, y: 0, delay: 200}, 600);
        }, 500);
        setTimeout(function() {
            $('#page6-fade').transition({opacity : 1, y: 0, delay: 200}, 600);
        }, 750);
    },
    {
        offset: '50%'
    });

     $('#zi').waypoint(function() {
        $('#page7-2-app.start').removeClass('start');
        setTimeout(function() {
            $('#page6-zi').transition({opacity : 1, y: 0, delay: 200}, 600);
        }, 500);
        setTimeout(function() {
            $('#page7-fade').transition({opacity : 1, y: 0, delay: 200}, 600);
        }, 750);
    },
    {
        offset: '50%'
    });
}

function bigScreenAdjustment() {
    if (window.innerWidth > 1440) {
        $('#page2-1-left').appendTo('#page2-1-container');
        $('#page2-2-left').appendTo('#page2-2-container');
    } else {
        $('#page2-2-left').prependTo('#page2-2');
        $('#page2-1-left').prependTo('#page2-1');
    }

    if (window.innerHeight > 901 && window.innerWidth > 1024 && window.innerWidth < 1681) {
        var newBottom = parseInt(window.innerHeight / 2) - 200;
        $('.frontRightFill').css('bottom', newBottom);
    }
    else if (window.innerHeight > 901 && window.innerWidth > 1680 && window.innerWidth < 2049) {
        var newBottom = parseInt(window.innerHeight / 2) - 300;
        $('.frontRightFill').css('bottom', newBottom);
    }
    else {
        //$('.frontRightFill').css('bottom', frontRightBottom);
    }
}


function checkPortfoliosViewPort() {
    var row = $('#phones');
    var heart1 = $('#heart-1');
    var heart2 = $('#heart-2');
    var heart3 = $('#heart-3');
    var heart4 = $('#heart-4');
    var heart5 = $('#heart-5');
    var middle_heart = $('#middle-heart');

    var ctxt = row.find('.ctxt');
    var cimg = row.find('.cimg');

    if (isScrolledIntoView(row)) {
        /* PHONES */
        if (scrollingDirection == 'down') {
            current_ctxt -= move_ctxt;
            current_cimg -= move_cimg;
        }
        else {
            current_ctxt += move_ctxt;
            current_cimg += move_cimg;
        }

        // force maximum
        if (current_ctxt > 70) {
            current_ctxt = 70;
        }
        if (current_ctxt < -20) {
            current_ctxt = -20;
        }
        if (current_cimg > 70) {
            current_cimg = 70;
        }
        if (current_cimg < -20) {
            current_cimg = -20;
        }

        ctxt.css('transform', 'translate3d(0,' + current_ctxt + 'px,0)');
        cimg.css('transform', 'translate3d(0,' + current_cimg + 'px,0)');
    }

    if (isScrolledIntoView($('#page4-point-5'), 400)) {
        var limit1 = 200;
        var limit2 = -200;
        if (scrollingDirection == 'down') {
            current_middle_heart -= move_middle_heart;
            current_heart1 -= move_heart1;
            current_heart2 -= move_heart2;
            current_heart3 -= move_heart3;
            current_heart4 -= move_heart4;
            current_heart5 -= move_heart5;
        }
        else {
            current_middle_heart += move_middle_heart;
            current_heart1 += move_heart1;
            current_heart2 += move_heart2;
            current_heart3 += move_heart3;
            current_heart4 += move_heart4;
            current_heart5 += move_heart5;
        }

        // force maximum
        if (current_heart1 > limit1) {
            current_heart1 = limit1;
        }
        if (current_heart1 < limit2) {
            current_heart1 = limit2;
        }

        if (current_heart2 > limit1) {
            current_heart2 = limit1;
        }
        if (current_heart2 < limit2) {
            current_heart2 = limit2;
        }

        if (current_heart3 > limit1) {
            current_heart3 = limit1;
        }
        if (current_heart3 < limit2) {
            current_heart3 = limit2;
        }

        if (current_heart4 > limit1) {
            current_heart4 = limit1;
        }
        if (current_heart4 < limit2) {
            current_heart4 = limit2;
        }

        if (current_heart5 > limit1) {
            current_heart5 = limit1;
        }
        if (current_heart5 < limit2) {
            current_heart5 = limit2;
        }

        /* HEARTS */
        middle_heart.css('transform', 'translate3d(0,' + current_middle_heart + 'px,0)');
        heart1.css('transform', 'translate3d(0,' + current_heart1 + 'px,0)');
        heart2.css('transform', 'translate3d(0,' + current_heart2 + 'px,0)');
        heart3.css('transform', 'translate3d(0,' + current_heart3 + 'px,0)');
        heart4.css('transform', 'translate3d(0,' + current_heart4 + 'px,0)');
        heart5.css('transform', 'translate3d(0,' + current_heart5 + 'px,0)');
    }
}

function isScrolledIntoView(elem, topOffset) {
    if (typeof topOffset === 'undefined') { topOffset = 0; }
    var docViewTop = $(window).scrollTop();
    var docViewBottom = docViewTop + $(window).height();

    var elemTop = elem.offset().top;
    var elemBottom = elemTop + elem.height();

    if ((elemTop + topOffset) <= docViewBottom && elemBottom > docViewTop) {
        return true;
    }
    return false;
}
