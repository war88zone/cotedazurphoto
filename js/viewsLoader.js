var numberOfBackgrounds = 0;
var backgroundImages = [];

// Includers HTML
$("#js_menuContainer").load("view/menu.html"); 
$("#js_socialsContainer").load("view/socials.html"); 
$("#js_galleries").load("view/galleries.html");
$("#js_slideshow").load("view/slideshow.html");
$("#js_contact").load("view/contact.html");
$("#js_collaboration").load("view/collaboration.html");
$("#js_aboutMe").load("view/aboutMe.html");

if(!isMobile){
  var folder = "../image/backgrounds";
  $.ajax({
    url : folder,
    success: function(data) {
      $(data).find("a").attr("href", function (i, val) {
        val = val.split("/");
        val = val[val.length-1];
        if(val.match(/\.(jpe?g|JPG|png|gif)$/) && val.indexOf("Mobile") === -1) { 
          backgroundImages[numberOfBackgrounds] = new Image();
          backgroundImages[numberOfBackgrounds].src = folder+'/'+val;
          numberOfBackgrounds++;
        }
      });
    },
    error: function(error) {    
      console.log("error during loading backgrounds");
      console.log(error);
    }
  });
}
