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
        if(prod){
          backgroundImages[numberOfBackgrounds].src = './'+folder+'/'+val;
        }
        else{
          backgroundImages[numberOfBackgrounds].src = './'+val;
        }
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
