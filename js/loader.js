var galleryCategories = ["portrait", "weddingAndLoveStory", "family", "littleRiviera", "artProject", "blackAndWhite"];

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

var deferred_collaboration = $.Deferred();
$("#js_collaboration").load("view/collaboration.html", function() {
  deferred_collaboration.resolve();
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
      deferred.resolve();
    },
    error: function(error) {
      console.log("error during loading"+ path);
      console.log(error);
    }
  });
}

var deferred_backgroundImages = $.Deferred();
var folder = "../image/backgrounds";

$.ajax({
  url : folder,
  success: function(data) {
    deferred_backgroundImages.resolve();
  },
  error: function(error) {    
    console.log("error during loading backgrounds");
    console.log(error);
  }
});