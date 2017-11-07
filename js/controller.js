var lastBackgroundIndex = 0;
var isMobile = false;
var currentGalleryId = "";
var youtubeAPIReady = false;
var players = [];
var playersIsReady = [];
var player;
var target = false;
var emptyCells = [];

function onYouTubeIframeAPIReady() {
  youtubeAPIReady = true;
}

if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
 isMobile = true;
}

// Events
$.when(deferred_menu, deferred_socials, deferred_galleries, deferred_slideshow, deferred_contact, deferred_collaboration, deferred_aboutMe, deferred_backgroundImages, deferred_allGalleries).done(function() {
  var backgroundInterval = null;
  runCarroussel();
  alignGalleriesIcons();

  if(youtubeAPIReady) {
    manageSlideshows();
  }

  ko.applyBindings(new viewModel());

  $(".menuContainer").on("touchstart touchmove click", function(event){
    target = true;
    setTimeout(()=>{
      target = false;
    }, 100);
  });


  $("#js_globalContent").bind('touchstart touchmove click', function(event){
    if(!target && $(".menuContainer").hasClass("menuContainer--opened")){
      return false;
    }
  });


  $("#js_openCloseButton").click(function(){
    openMenu();
  });

  function runCarroussel () {
    if(!isMobile){
      backgroundInterval = setInterval(function(){
        let backgroundIndex = Math.floor(Math.random() * (numberOfBackgrounds - 1 +1)) + 1;
        while (backgroundIndex == lastBackgroundIndex) {
          backgroundIndex = Math.floor(Math.random() * (numberOfBackgrounds - 1 +1)) + 1;
        }
        // Number of background -> index
        backgroundIndex--;
        lastBackgroundIndex = backgroundIndex;

        $("body").css("background-image", "url(" + backgroundImages[backgroundIndex].src + ")");
      }, 5000);
    }
  }

  function manageSlideshows () {
    var self = this;
    $(".slideshowContent").each(function(){
      var identifier = this.firstElementChild.id;
      player = new YT.Player(identifier, {
        events: {
          'onReady': onPlayerReady,
          'onStateChange': onPlayerStateChange
        }
      });
      self.players.push(player);
    });
  }


  function onPlayerReady(event) {
    currentIndex = event.target.a.id.split("slideshow")[1];
    console.log(currentIndex + " is ready");
  }

  function onPlayerStateChange(event) {
    currentIndex = event.target.a.id.split("slideshow")[1];
    if(currentIndex && players.length ==  $(".slideshowContent").length){
      console.log(players[currentIndex].getPlayerState());
      if(players[currentIndex].getPlayerState() == 1) {
        for (let i=0; i<players.length; i++){
          if(players[i] != players[currentIndex]){
            players[i].pauseVideo();
          }
        }
      }
    }
  }

  function stopSlideshowPlaying(){
    for (let i=0; i<players.length; i++){
      if(players[i].getPlayerState() == 1){
        players[i].pauseVideo();
      }
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
    
    if(isMobile){
      $("#js_globalContainer").toggleClass("globalContainer--noScroll");
      $(".maskContent").delay(750).fadeToggle();
    }
  }

  function backToTitle(){
    $("#js_globalContent").fadeOut("slow", function(){
      $("#js_title").fadeIn("slow");
    });
    $(".menuContainer").removeClass("menuContainer--opened");
    $("#js_globalContent").removeClass("globalContent--reduced");

    if(isMobile){
      $("#js_globalContainer").removeClass("globalContainer--noScroll");
      $("#js_globalContent").removeClass("maskContent");
      $(".maskContent").delay(750).fadeOut();
    }
  }

  function closeMenu(){
    $(".menuContainer").removeClass("menuContainer--opened");
    $("#js_globalContent").removeClass("globalContent--reduced");
    $("#js_globalContainer").removeClass("globalContainer--noScroll");
    $(".maskContent").delay(750).fadeOut();
  }

  function alignGalleriesIcons(){
    for (i = 0; i < $("#content_galleries").find('.galleriesContainer').length; i++) {
      emptyCells.push($('<div>', {
        class: 'galleriesContainer galleriesContainer--empty'
      }));
    }
    $("#content_galleries").append(emptyCells);
  }

  $("#js_title").click(function(){
    openMenu();
  });

  // Click on menu category
  $(".category").click(function(){
    // Stop videos playing
    stopSlideshowPlaying();
    // Hide gallery pages
    if(currentGalleryId != ""){
      $("#js_"+currentGalleryId).addClass("content_gallery_hidden");
    }
    $("#js_backToGalleries").hide();
    // Update menu categories
    $(".category").removeClass("category--active");
    $(this).addClass("category--active");
    $(".category_icon").removeClass("icon--active");
    $(this).find(".category_icon").addClass("icon--active");
    // Update the content view
    $(".content").removeClass("content--active");
    $("#content_"+this.id).addClass("content--active");

    if(isMobile){
      closeMenu();
    }
  });

  // Click on a gallery
  $(".galleriesContainer").click(function(){
    // Hide the galleries page
    $(".content").removeClass("content--active");
    // Display the selected gallery page
    $("#js_"+this.id).removeClass("content_gallery_hidden");
    currentGalleryId = this.id;
    $("#js_backToGalleries").show();
  });

  // Click on back to galleries
  $("#js_backToGalleries").click(function(){
    // Hide gallery pages
    $("#js_"+currentGalleryId).addClass("content_gallery_hidden");
    currentGalleryId = "";
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
    backToTitle();
    runCarroussel();
  });
});