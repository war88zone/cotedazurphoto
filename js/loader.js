var galleryCategories = ["portrait", "weddingAndLoveStory", "family", "littleRiviera", "artProject", "blackAndWhite"];
var numberOfBackgrounds = 0;
var backgroundImages = [];

// Includers
let deferred_menu = $.Deferred();
$("#js_menuContainer").load("view/menu.html", function() {
  console.log("menu.html loaded");
  deferred_menu.resolve();
}); 

let deferred_socials = $.Deferred();
$("#js_socialsContainer").load("view/socials.html", function() {
  console.log("socials.html loaded");
  deferred_socials.resolve();
}); 

let deferred_galleries = $.Deferred();
$("#js_galleries").load("view/galleries.html", function() {
  console.log("galleries.html loaded");
  deferred_galleries.resolve();
});

let deferred_slideshow = $.Deferred();
$("#js_slideshow").load("view/slideshow.html", function() {
  console.log("slideshow.html loaded");
  deferred_slideshow.resolve();
});

let deferred_contact = $.Deferred();
$("#js_contact").load("view/contact.html", function() {
  console.log("contact.html loaded");
  deferred_contact.resolve();
});

let deferred_collaboration = $.Deferred();
$("#js_collaboration").load("view/collaboration.html", function() {
  console.log("collaboration.html loaded");
  deferred_collaboration.resolve();
});

let deferred_aboutMe = $.Deferred();
$("#js_aboutMe").load("view/aboutMe.html", function() {
  console.log("aboutMe.html loaded");
  deferred_aboutMe.resolve();
});

var deferred_backgroundImages = $.Deferred();
var folder = "../image/backgrounds";

$.ajax({
  url : folder,
  success: function(data) {
    $(data).find("a").attr("href", function (i, val) {
      if(val.match(/\.(jpe?g|JPG|png|gif)$/)) { 
        backgroundImages[numberOfBackgrounds] = new Image();
        backgroundImages[numberOfBackgrounds].src = folder+'/'+val; // PROD
        //backgroundImages[numberOfBackgrounds].src = './'+val; // LOCAL
        numberOfBackgrounds++;
      }
    });

    console.log(numberOfBackgrounds+" background(s) loaded");
    deferred_backgroundImages.resolve();
  },
  error: function(error) {    
    console.log("error during loading backgrounds");
    console.log(error);
  }
});

// Load galleries's pages
let deferred_allGalleries = $.Deferred();
let deferredArray = [];
for(let i=0; i<galleryCategories.length; i++){
  let deferred = $.Deferred();
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
  let folder = "../image/"+path;
  let i = 0;

  $.ajax({
    url : folder,
    success: function(data) {
      $(data).find("a").attr("href", function (i, val) {
          if(val.match(/\.(jpe?g|JPG|png|gif)$/)) { 
            $("#content_gallery_"+path).append('<img alt="" src="'+folder+'/'+val+'" class="galleryImage"/>'); // PROD
            //$("#content_gallery_"+path).append('<img alt="" src="./'+val+'" class="galleryImage"/>'); // LOCAL
          } 
      });

      let apiUnitegallery = $("#content_gallery_"+path).unitegallery({
        gallery_theme:"tiles"
      });

      $("#js_gallery_"+path).addClass("content_gallery_hidden");

      console.log(path + " loaded");
      deferred.resolve();
    },
    error: function(error) {
      console.log("error during loading"+ path);
      console.log(error);
    }
  });
}
