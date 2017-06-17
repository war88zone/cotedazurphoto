// Reference to the library
var apiUnitegalleryArray = [];
var galleryCategories = ["weddingAndLoveStory", "blackAndWhite"];
//var galleryCategories = ["weddingAndLoveStory", "family", "littleRiviera", "artProject", "blackAndWhite"];

// Includers
var deferred_menu = $.Deferred();
$("#js_menuContainer").load("view/menu.html", function() {
  deferred_menu.resolve();
}); 

var deferred_socials = $.Deferred();
$("#js_socialsContainer").load("view/socials.html", function() {
  deferred_socials.resolve();
}); 

var deferred_galleries = $.Deferred();
$("#js_galleries").load("view/galleries.html", function() {
  deferred_galleries.resolve();
});

var deferred_slideshow = $.Deferred();
$("#js_slideshow").load("view/slideshow.html", function() {
  deferred_slideshow.resolve();
});

var deferred_contact = $.Deferred();
$("#js_contact").load("view/contact.html", function() {
  deferred_contact.resolve();
});

var deferred_aboutMe = $.Deferred();
$("#js_aboutMe").load("view/aboutMe.html", function() {
  deferred_aboutMe.resolve();
});

// Load galleries's pages
var deferred_allGalleries = $.Deferred();
var deferredArray = [];
for(var i=0; i<galleryCategories.length; i++){
  var deferred = $.Deferred();
  deferredArray.push(deferred);
  $("#js_gallery_"+galleryCategories[i]).load("view/gallery_"+galleryCategories[i]+".html", (function (x) {
    loadImages(galleryCategories[x], deferred);
  })(i));
};

$.when.apply($, deferredArray).done(function() {
  deferred_allGalleries.resolve();
});

// Load images
function loadImages(path, deferred){
  console.log("loading "+path+"...");
  var folder = "../image/"+path;
  var i = 0;

  $.ajax({
    url : folder,
    success: function(data) {
      $(data).find("a").attr("href", function (i, val) {
          if(val.match(/\.(jpe?g|png|gif)$/)) { 
            $("#content_gallery_"+path).append('<img alt="" src="'+val+'" class="galleryImage"/>');
          } 
      });

      var apiUnitegallery = $("#content_gallery_"+path).unitegallery({
        gallery_theme:"tiles"
      });

      apiUnitegalleryArray.push(apiUnitegallery);

      $("#content_gallery_"+path).hide();

      console.log(path+" loaded");
      deferred.resolve();
    },
    error: function(data) {
      console.log("error during loading"+ path);
    }
  });
}

// Events
$.when(deferred_menu, deferred_socials, deferred_galleries, deferred_contact, deferred_aboutMe, deferred_allGalleries, deferred_slideshow).done(function() {

  $(window).resize(function(){
    calc();
  });

  $("#js_title_button").click(function(){
    openCloseMenu();
  });

  $("#js_openCloseButton").click(function(){
    openCloseMenu();
  });

  function openCloseMenu(){
    $("#js_title").fadeOut("slow", function(){
      $("#js_globalContent").fadeIn("slow");
    });
    $(".menuContainer").toggleClass("menuContainer--opened");
      $("#js_globalContent").toggleClass("globalContent--reduced");
    calc();
  }

  function calc(){
    var contentContainerWidth = $(window).width() * 0.8;
    if($("#js_globalContent").hasClass("globalContent--reduced")){
      $("#js_globalContent").width(contentContainerWidth-300);
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

  function validateEmail(email, id) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if(re.test($(email).val())){
      return true;
    }
    else{
      $(id).fadeIn();
      return false;
    }
  }

  function displayFeedbackMessage(value, id){
    if($(value).val() == ""){
      $(id).fadeIn();
      return false;
    }
    else{
      return true;
    }
  }

  function hideFeedbackMessage(){
    $("#js_errorName_empty").fadeOut();
    $("#js_errorEmail_empty").fadeOut();
    $("#js_errorEmail_format").fadeOut();
    $("#js_errorMessage_empty").fadeOut();
    $("#js_successMessage_sent").fadeOut();
  }

  $(".buttonSendContainer").click(function(){
    if(!$(".buttonSend").addClass("buttonSend--disabled")){
      hideFeedbackMessage();

      var name = displayFeedbackMessage("#js_inputName", "#js_errorName_empty");
      var email = displayFeedbackMessage("#js_inputEmail", "#js_errorEmail_empty");
      var emailValidated = false;
      if(email){
        emailValidated = validateEmail("#js_inputEmail", "#js_errorEmail_format");
      }
      var message = displayFeedbackMessage("#js_inputMessage", "#js_errorMessage_empty");

      if(name && email && emailValidated && message){
        $("#js_successMessage_sent").fadeIn();
      }
    }
  });
});