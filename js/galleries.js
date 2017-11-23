var prod = true;
var globalViewModel = new viewModel();
var galleryCategories = [
                        { "name": "wedding",        "observable": globalViewModel.galleries_wedding() },
                        { "name": "loveStory",      "observable": globalViewModel.galleries_loveStory() },
                        { "name": "frenchRiviera",  "observable": globalViewModel.galleries_frenchRiviera() },
                        { "name": "familyAndKids",  "observable": globalViewModel.galleries_familyAndKids() },
                        { "name": "blackAndWhite",  "observable": globalViewModel.galleries_blackAndWhite() },
                        { "name": "portrait",       "observable": globalViewModel.galleries_portrait() },
                        { "name": "lavenderMagic",  "observable": globalViewModel.galleries_lavenderMagic() },
                        { "name": "artProjects",    "observable": globalViewModel.galleries_artProjects() },
                        { "name": "events",         "observable": globalViewModel.galleries_events() },
                      ];

// Load galleries's pages
function loadGalleries () {
  for(let i=0; i<galleryCategories.length; i++){
    $("#js_gallery_"+galleryCategories[i].name).load("view/gallery_"+galleryCategories[i].name+".html", (function (x) {
      loadImages(galleryCategories[x].name);
    })(i));
  };

  // Load images
  function loadImages(path){
    let folder = "../image/"+path;
    let i = 0;

    $.ajax({
      url : folder,
      success: function(data) {
        $(data).find("a").attr("href", function (i, val) {
            if(val.match(/\.(jpe?g|JPG|png|gif)$/)) { 
              if(prod){
                $("#content_gallery_"+path).append('<img alt="" src="'+folder+'/'+val+'" class="galleryImage"/>');
              }
              else{
                $("#content_gallery_"+path).append('<img alt="" src="./'+val+'" class="galleryImage"/>');
              }
            } 
        });

        let apiUnitegallery = $("#content_gallery_"+path).unitegallery({
          gallery_theme:"tiles"
        });

        $("#js_gallery_"+path).addClass("content_gallery_hidden");

        console.log(path + " loaded");
      },
      error: function(error) {
        console.log("error during loading"+ path);
        console.log(error);
      }
    });
  }
}