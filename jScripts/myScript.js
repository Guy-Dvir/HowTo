$(document).ready(function (e) {

    //removes focus outline only from mouse clicks
    $("body").on("mousedown", "*", function (e) {
        if (($(this).is(":focus") || $(this).is(e.target)) && $(this).css("outline-style", "none")) {
            $(this).css("outline", "none !important").on("blur", function () {
                $(this).off("blur").css("outline", "");
            });
        }
    });

    /////////NAV JUMP-TO-CONTENT BUTTON////////
    //cache DOM
    var $jumpLink = $('#nav .jumpTocontent button');
    //go to nearest "a" on the main content area
    $jumpLink.click(function () {
        $jumpLink.trigger("blur")
        $('#main_content').find("a").first().trigger("focus");
    });



    ///////////////NAV SUBMENUS HOVER///////////
    $('li#menu2').hover(function () {
        $('#sub2').fadeIn(400);
    }, function () {
        $('#sub2').fadeOut(400);
    });


    $('li#menu4').hover(function () {
        $('#sub4').fadeIn(400);
    }, function () {
        $('#sub4').fadeOut(400);
    });

    ///////////////NAV SUBMENUS TAB///////////
    $("ul li>a").focus(function () {
        $(this).parents("li").find("ul").show();
    });
    $("ul li ul li:last-child>a").focusout(function () {
        $(this).parents("li").find("ul").css("display", "");
    });

    $("ul li ul").focusout(function () {
        $(this).css("display", "");
    });


    //////////////////////////////////ACCORDION//////////////////////////////////////
    // hide all div containers  
    $('#accordion section > div').hide();
    // append click event to the a element  
    $('#accordion a').click(function (e) {
        // slide down the corresponding div if hidden, or slide up if shown  
        $(this).parent().next('#accordion div').slideToggle('slow');
        // set the current item as active  
        $(this).parent().parent().toggleClass('activeAccord');
        e.preventDefault();
        changes_symbol();
    });

    ////////function to set the right icon for each row//////////
    $("img.icon").each(function () {
        $(this).css('margin-top', $(this).closest("section").index() * -56.7);
    });


    ////////NAVASSIST MENU///////
    //toggle symbol function
    function changes_symbol() {
        if ($('#accordion section').hasClass('activeAccord')) {
            $('span#expend_collapse').addClass('fa-minus');
            $('span#expend_collapse').removeClass('fa-plus');
        }
        else {
            $('span#expend_collapse').addClass('fa-plus');
            $('span#expend_collapse').removeClass('fa-minus');
        }
    };

    //////makes sticky behavior//////
    $('#assistNav').fixedsticky();

    //accordion rules for multi expention/collapse
    $('#toggleAll').click(function (e) {
        if ($('#accordion section').hasClass('activeAccord')) {
            $('#accordion section > div').slideUp('slow');
            $('#accordion section > div').parent().removeClass('activeAccord');
            changes_symbol();
        }
        else {
            $('#accordion section > div').slideDown('slow');
            $('#accordion section > div').parent().addClass('activeAccord');
            changes_symbol();
        }
    });


    //////////////////////////////////////SLIDER////////////////////////////////////////

    //settings for slider
    var width = 808
    var animationSpeed = 1000;
    var pause = 5000;
    var currentSlide = 1;

    //cache DOM
    var $slider = $('#slider');
    var $slideContainer = $('.slides', $slider);
    var $slides = $('.slide', $slider);
    var $nextSlide = $('#Rarrow', $slider);
    var $previousSlide = $('#Larrow', $slider);
    var $pause = $('#pauseBtn', $slider);

    var interval;

    //////////Functions for slider arrow//////////
    function moveRight() {
        $slideContainer.animate({ 'margin-right': '-=' + width }, function () {
            currentSlide++;
            if (currentSlide === $slides.length) {
                currentSlide = 1;
                $slideContainer.css('margin-right', 0);
            }
        });
    }

    function moveLeft() {
        if (currentSlide == 1) {
            $slideContainer.css('margin-right', -2424);
            currentSlide = $slides.length;
        }
        $slideContainer.animate({ 'margin-right': '+=' + width }, function () {
        });
        currentSlide--;
    }


    ////////function to set the right pic for each slide//////////
    var img = $('img.slidePic');

    $(img).each(function () {
        $(this).css('margin-top', $(this).closest("section").index() * -159);
    });

    ////////Function to move slides automatically//////////
    function startSlider() {
        interval = setInterval(function () {
            $slideContainer.animate({ 'margin-right': '-=' + width }, animationSpeed, function () {
                currentSlide++;
                if (currentSlide === $slides.length) {
                    currentSlide = 1;
                    $slideContainer.css('margin-right', 0);
                }
            });
        }, pause);
    }

    //Pausing function
    function pauseSlider() {
        clearInterval(interval);
    }

    //change pause icon and execute pause/release 
    function changePause() {
        $pause.toggleClass('fa-pause');
        $pause.toggleClass('fa-play');
        checkPause();
    }

    //check if pause buttton was pressed
    function checkPause() {
        if ($pause.hasClass('fa-play')) {
            pauseSlider()
        }
        else {
            startSlider()
        }
    }

    //right arrow operation
    $previousSlide
        .on('click', moveRight)
        .on('mouseenter', pauseSlider)
        .on('mouseleave', startSlider);

    //left arrow operation
    $nextSlide
        .on('click', moveLeft)
        .on('mouseenter', pauseSlider)
        .on('mouseleave', startSlider)
        .on('focus', pauseSlider);

    //pause button operation
    $pause
    .on('click', changePause)

    //pause slide on hover

    $slideContainer
        .on('mouseenter', pauseSlider)
        .on('mouseleave', checkPause)


    startSlider();

    ////////////////////////////STORYTABS PAGE 4.1////////////////////////////////

    ////////function to set the right pic for each tab//////////
    var img = $('img.tabPic');

    $(img).each(function () {
        $(this).css('margin-top', $(this).closest("li").index() * -135 - 1);
    });

    ////////////////////TAB MENU///////////////////

    // hide all articles
    $('#stryWrapper > article').each(function () {
        if ($(this).attr('class') != 'strypanel activeStry') {
            $(this).hide()
        }
    });

    //click event
    $('a.stryBtn').click(function (e) {
        var pressedTab = $(this);
        var panelToShow = $(this).attr('rel');

        //change tab to look active
        $('#tabWrapper div ul li a.stryBtn.activeTab').removeClass('activeTab', function () {
            $(pressedTab).addClass('activeTab');
        });

        //change panels
        $('article.strypanel.activeStry').slideUp('fast', function () {
            $(this).removeClass('activeStry');
            $('#' + panelToShow).slideDown('fast', function () {
                $(this).addClass('activeStry');
            });
        });
    });

    //function to activate story according to the link that was clicked
    function tabControl() {
        //find what link was pressed
        var pressedLink = document.location.hash
        //clear all active tabs
        $('#tabWrapper ul li a.stryBtn.activeTab').removeClass('activeTab');
        //change the associated tab to active
        $('#tabWrapper ul li a.stryBtn').each(function (index) {
            if ('#' + $(this).attr('rel') == String(pressedLink)) {
                $(this).addClass('activeTab');
            }
        });
        //close active panel
        $('article.strypanel.activeStry').slideUp('fast', function () {
            $(this).removeClass('activeStry');
            //change new panel to active
            $(pressedLink).slideDown('fast', function () {
                $(this).addClass('activeStry');
            });
        });
    };

    tabControl()
});