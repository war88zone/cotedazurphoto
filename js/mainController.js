// When document is loaded
$(document).ready(function() {
  var lastBackgroundIndex = 0;
  var currentGalleryId = "";
  var target = false;
  var emptyCells = [];
  var titleIsVisible = true;

  // Apply bindings
  ko.applyBindings(globalViewModel);

  // Run background transitions
  var backgroundInterval = null;
  runCarroussel();

  // Load galleries
  loadGalleries();

  // Open menu management
  function openMenu() {
    if(!isMobile) {
      clearInterval(backgroundInterval);
    }

    if(titleIsVisible){
      $("#js_title").fadeOut("slow", function(){
        // Display the content
        $("#js_globalContent").removeClass("globalContent--hidden");
      });
    }
    else{
      // Display the content
      $("#js_globalContent").removeClass("globalContent--hidden");
    }

    // Remove pulse effect on the menu button
    $("#js_openCloseButton").removeClass("openCloseButton--pulsed");    

    // Display the menu
    $(".menuContainer").toggleClass("menuContainer--opened");

    // Display mask on mobile
    if(isMobile){
      $(".maskContent").toggleClass("maskContent--visible");
      $("html").toggleClass("scrollLocked");
    }
    else{
      $("#js_globalContent").toggleClass("globalContent--reduced");
    }
  }

  // Close menu
  function closeMenu(){
    // Hide the menu
    $(".menuContainer").removeClass("menuContainer--opened");

    if(isMobile){
      $(".maskContent").toggleClass("maskContent--visible");
      $("html").toggleClass("scrollLocked");
    }
    else{
      $("#js_globalContent").removeClass("globalContent--reduced");
    }
  }

  // Back to the title page
  function backToTitle(){
    $("#js_title").fadeIn("slow");
    $("#js_globalContent").css("opacity", 0);

    // Hide the menu
    $(".menuContainer").removeClass("menuContainer--opened");

    // Hide the content
    $("#js_globalContent").removeClass("globalContent--hidden");

    if(isMobile){
      $(".maskContent").toggleClass("maskContent--visible");
      $("html").toggleClass("scrollLocked");
    }
    else{
      $("#js_globalContent").removeClass("globalContent--reduced");
    }
  }

  // Avoid click on content behind mask
  $(".global_mask").click((event)=>{
    return false;
  });

  // Background rotation
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

  // Click on menu category
  $(".category").click(function(){
    if(this.id === "slideshow"){
      loadYoutubeVideos();
    }
      
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
    $('html, body').animate( { scrollTop: 0 }, 500 );
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

  // We need to keep the hover by JS because the icon--active class isn't appliable on the element hovered
  $(".contact").hover(      
    function () {
      $(this).find(".contact_icon").addClass("icon--active")
    }, 
    function () {
      $(this).find(".contact_icon").removeClass("icon--active")
    }
  );

  // Open menu
  $("#js_openCloseButton").click(function(){
    openMenu();
  });

  // Click on title
  $("#js_title").click(function(){
    $("#js_title").fadeOut("slow", function(){
      $("#js_globalContent").removeClass("globalContent--hidden");
      titleIsVisible = false;
    });

    // Remove pulse effect on the menu button
    $("#js_openCloseButton").removeClass("openCloseButton--pulsed"); 
  });

  // Send email
  $(".buttonSendContainer").click(function(){
    clickOnSendEmail();
  });

  // Back to title
  $("#js_iconMenu").click(function(){
    backToTitle();
    runCarroussel();
  });

  // Hack the lib to get key events to nav
  $(document).keydown(function(event){               
    if(currentGalleryId !== ""){
      let currentGalleryIndex = $("#js_"+currentGalleryId).attr('class').split("galleryIndex_")[1];
      let keyCode = (event.charCode) ? event.charCode :((event.keyCode) ? event.keyCode :((event.which) ? event.which : 0));  

      switch(keyCode){
        case 39: //right key
          galleryCategories[currentGalleryIndex].nextItem();
          break;
        case 37: //left key
          galleryCategories[currentGalleryIndex].prevItem();
          break;
      }
    }  
  });
});