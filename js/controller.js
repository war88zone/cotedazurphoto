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
  deferred_gallery_weddingAndLoveStory.resolve();
});

// Events
$.when(deferred_menu, deferred_socials, deferred_galleries, deferred_contact, deferred_aboutMe, deferred_gallery_weddingAndLoveStory).done(function() {
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
    $("#content_"+this.id).addClass("content--active");
  });

  $("#js_backToGalleries").click(function(){
    $(this).parent().removeClass("content--active");
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

  $(".galleryImage").click(function(){
    $(this).toggleClass("galleryImage--large");
  })

  $(window).resize(function(){
    calc();
  });
});