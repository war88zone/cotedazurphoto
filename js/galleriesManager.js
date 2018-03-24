var globalViewModel = new viewModel();
var galleryCategories = [
                        /*{ "name": "wedding",        "observable": globalViewModel.galleries_wedding(), "apiUniteGallery": null},*/
                        { "name": "loveStory",      "observable": globalViewModel.galleries_loveStory(), "apiUniteGallery": null},
                        { "name": "frenchRiviera",  "observable": globalViewModel.galleries_frenchRiviera(), "apiUniteGallery": null},
                        { "name": "familyAndKids",  "observable": globalViewModel.galleries_familyAndKids(), "apiUniteGallery": null},
                        { "name": "blackAndWhite",  "observable": globalViewModel.galleries_blackAndWhite(), "apiUniteGallery": null},
                        { "name": "portrait",       "observable": globalViewModel.galleries_portrait(), "apiUniteGallery": null},
                        { "name": "lavenderMagic",  "observable": globalViewModel.galleries_lavenderMagic(), "apiUniteGallery": null},
                        { "name": "artProjects",    "observable": globalViewModel.galleries_artProjects(), "apiUniteGallery": null},
                        { "name": "events",         "observable": globalViewModel.galleries_events(), "apiUniteGallery": null}
                      ];

// Load galleries's pages
function loadGalleries () {
  for(let i=0; i<galleryCategories.length; i++){
    $("#js_gallery_"+galleryCategories[i].name).load("view/gallery_"+galleryCategories[i].name+".html", (function (x) {
      loadImages(galleryCategories[x].name, i);
    })(i));
  };

  // Load images
  function loadImages(path, currentCategory){
    let folder = "../image/"+path;
    let i = 0;

    $.ajax({
      url : folder+"/thumb",
      success: function(data) {
        $(data).find("a").attr("href", function (i, val) {
          val = val.split("/");
          val = val[val.length-1];
          if(val.match(/\.(jpe?g|JPG|png|gif)$/)) { 
            $("#content_gallery_"+path).append('<img alt="" src="'+folder+'/thumb/'+val+'" data-image="'+folder+'/big/'+val+'" class="galleryImage"/>');
          } 
        });

        galleryCategories[currentCategory] = $("#content_gallery_"+path).unitegallery({
          gallery_theme:"tiles",
        });

        $("#js_gallery_"+path).addClass("content_gallery_hidden").addClass("galleryIndex_"+currentCategory);
      },
      error: function(error) {
        console.log("error during loading"+ path);
        console.log(error);
      }
    });
  }
}