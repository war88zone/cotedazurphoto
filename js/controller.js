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

var deferred_contact = $.Deferred();
$("#js_contact").load("view/contact.html", function() {
  deferred_contact.resolve();
});

var deferred_aboutMe = $.Deferred();
$("#js_aboutMe").load("view/aboutMe.html", function() {
  deferred_aboutMe.resolve();
});

var deferred_gallery_weddingAndLoveStory = $.Deferred();
$("#js_gallery_weddingAndLoveStory").load("view/gallery_weddingAndLoveStory.html", function() {
  loadImages("weddingAndLoveStory", deferred_gallery_weddingAndLoveStory);
});

function loadImages(path, deferred){
  console.log("loading "+path+"...");
  var folder = "../image/"+path;
  var i = 0;

  $.ajax({
    url : folder,
    success: function(data) {
      $(data).find("a").attr("href", function (i, val) {
          if(val.match(/\.(jpe?g|png|gif)$/)) { 
            //$("#content_gallery_"+path).append('<div class="galleryImageContainer" id="galleryImageContainer__'+i+'"><img src="'+val+'" class="galleryImage"/></div>');
            $("#content_gallery_"+path).append('<img alt="coucou" src="'+val+'" class="galleryImage"/>');
            /*var currentGalleryImage = $("#galleryImageContainer__"+i).find(".galleryImage");
            if(currentGalleryImage[0] && currentGalleryImage[0].naturalWidth < currentGalleryImage[0].naturalHeight){
              $("#galleryImageContainer__"+i).addClass("galleryImageContainer--portrait");
            }
            else{
              $("#galleryImageContainer__"+i).addClass("galleryImageContainer--landscape"); 
            }*/
          } 
      });
      console.log(path+" loaded");
      deferred.resolve();
    },
    error: function(data) {
      console.log("error during loading"+ path);
    }
  });
}

// Events
$.when(deferred_menu, deferred_socials, deferred_galleries, deferred_contact, deferred_aboutMe, deferred_gallery_weddingAndLoveStory).done(function() {
  
  $(".content_gallery").unitegallery({
    gallery_theme:"tiles"
  });


  $(window).resize(function(){
    calc();
  });

  $(".openCloseButton").click(function(){
    $(".title").fadeOut("slow", function(){
      $(".globalContent").fadeIn("slow");
    });
    $(".menuContainer").toggleClass("menuContainer--opened");
    $(".globalContent").toggleClass("globalContent--reduced");
    calc();
  });

  function calc(){
    var contentContainerWidth = $(window).width() * 0.8;
    if($(".globalContent").hasClass("globalContent--reduced")){
      $(".globalContent").width(contentContainerWidth-300);
    }
    else{
      $(".globalContent").width(contentContainerWidth);
    }
  }

  $(".category").click(function(){
    $(".category").removeClass("category--active");
    $(this).addClass("category--active");
    $(".icon").removeClass("icon--active");
    $(this).find(".icon").addClass("icon--active");
    $(".content").removeClass("content--active");
    $("#content_"+this.id).addClass("content--active");
  });

  $(".galleriesContainer").click(function(){
    $(".content").removeClass("content--active");
    $("#content_"+this.id).addClass("content_gallery--active");
  });

  $("#js_backToGalleries").click(function(){
    $(this).parent().removeClass("content_gallery--active");
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