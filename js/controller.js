var apiUnitegalleryArray = [];
var lastBackgroundIndex = 1;
var isMobile = false;

if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
 isMobile = true;
}

// Events
$.when(deferred_menu, deferred_socials, deferred_galleries, deferred_slideshow, deferred_contact, deferred_collaboration, deferred_aboutMe, deferred_allGalleries, deferred_backgroundImages).done(function() {
  var backgroundInterval = null;
  runCarroussel();

  ko.applyBindings(new viewModel());

  $(window).resize(function(){
    calc();
  });

  $("#js_openCloseButton").click(function(){
    openMenu();
  });

  function runCarroussel () {
    if(!isMobile){
      backgroundInterval = setInterval(function(){
        let backgroundIndex = Math.floor(Math.random() * (10 - 1 +1)) + 1;
        while (backgroundIndex == lastBackgroundIndex) {
          backgroundIndex = Math.floor(Math.random() * (10 - 1 +1)) + 1;
        }
        lastBackgroundIndex = backgroundIndex;

        $("body").css("background-image", "url(../image/backgrounds/background" + backgroundIndex + ".jpg)");
      }, 4000);
    }
  }

  function openMenu(){
    clearInterval(backgroundInterval);

    $("#js_openCloseButton").removeClass("openCloseButton--pulsed");

    $("#js_title").fadeOut("slow", function(){
      $("#js_globalContent").fadeIn("slow");
    });
    $(".menuContainer").toggleClass("menuContainer--opened");
    $("#js_globalContent").toggleClass("globalContent--reduced");
    calc();
  }

  function closeMenu(){
    $("#js_globalContent").fadeOut("slow", function(){
      $("#js_title").fadeIn("slow");
    });
    $(".menuContainer").toggleClass("menuContainer--opened");
    $("#js_globalContent").toggleClass("globalContent--reduced");
  }

  function calc(){
    var contentContainerWidth = $(window).width() * 0.8;
    if($("#js_globalContent").hasClass("globalContent--reduced")){
      $("#js_globalContent").width(contentContainerWidth-$(".menuContainer").width());
    }
    else{
      $("#js_globalContent").width(contentContainerWidth);
    }

    setTimeout(function(){
      for(var i=0; i<apiUnitegalleryArray.length;i++){
        apiUnitegalleryArray[i].resize($("#js_globalContent").width());
      }
    }, 750);
  }

  // Click on menu category
  $(".category").click(function(){
    // Hide gallery pages
    $(".content_gallery").hide();
    $("#js_backToGalleries").hide();
    // Update menu categories
    $(".category").removeClass("category--active");
    $(this).addClass("category--active");
    $(".category_icon").removeClass("icon--active");
    $(this).find(".category_icon").addClass("icon--active");
    // Update the content view
    $(".content").removeClass("content--active");
    $("#content_"+this.id).addClass("content--active");
  });

  // Click on a gallery
  $(".galleriesContainer").click(function(){
    // Hide the galleries page
    $(".content").removeClass("content--active");
    // Display the selected gallery page
    $("#content_"+this.id).parent().find(".content_gallery").show();
    $("#js_backToGalleries").show();
    // Resize galleries
    for(var i=0; i<apiUnitegalleryArray.length;i++){
      apiUnitegalleryArray[i].resize($("#js_globalContent").width());
    }
  });

  // Click on back to galleries
  $("#js_backToGalleries").click(function(){
    // Hide gallery pages
    $(".content_gallery").hide();
    $("#js_backToGalleries").hide();
    // Display the galleries page
    $("#content_galleries").addClass("content--active");
  });

  $(".contact").hover(      
   function () {
      $(this).find(".contact_icon").addClass("icon--active")
   }, 
   function () {
      $(this).find(".contact_icon").removeClass("icon--active")
   }
  );

  $(".buttonSendContainer").click(function(){
    clickOnSendEmail();
  });

  $("#js_iconMenu").click(function(){
    closeMenu();
    runCarroussel();
  });
});