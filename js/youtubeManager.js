var youtubeAPIReady = false;
var youtubeVideos = [
                      {"url": "https://www.youtube.com/embed/S1HxKXlAIvI?enablejsapi=1", "state": 0},
                      {"url": "https://www.youtube.com/embed/AmsbuCtikys?enablejsapi=1", "state": 0},
                      {"url": "https://www.youtube.com/embed/vD7onH8epy0?enablejsapi=1", "state": 0},
                      {"url": "https://www.youtube.com/embed/Zt6eEWt4eRE?enablejsapi=1", "state": 0},
                      {"url": "https://www.youtube.com/embed/SLrfxqAEJvo?enablejsapi=1", "state": 0},
                      {"url": "https://www.youtube.com/embed/JrszalgcORI?enablejsapi=1", "state": 0}
                    ];
var videosLoaded = false;

// When YouTube APi is ready
function onYouTubeIframeAPIReady() {
  youtubeAPIReady = true;
}

function loadYoutubeVideos() {
  if(youtubeAPIReady && !videosLoaded) {
    let i = 0;
    var self = this;

    for(let i=0; i<youtubeVideos.length; i++){
      let identifier = "slideshow"+i;

      $("#content_slideshow").append(`
        <div class="slideshowContent">
          <iframe id="`+identifier+`" width="100%" height="100%" src="`+youtubeVideos[i].url+`" frameborder="0" allowfullscreen></iframe>
        </div>`
      );    

      player = new YT.Player(identifier, {
        events: {
          'onReady': onPlayerReady,
          'onStateChange': onPlayerStateChange
        }
      });
      self.players.push(player);
    }
  }
}

function onPlayerReady(event) {
  let currentIndex = event.target.a.id.split("slideshow")[1];
  youtubeVideos[currentIndex].state = 1;

  let allVideoLoaded = true;
  for(let i=0; i<youtubeVideos.length; i++){
    if(youtubeVideos[i].state === 0){
      allVideoLoaded = false;
    }
  }

  videosLoaded = allVideoLoaded;
  if(videosLoaded){
    console.log("Videos are loaded");
  }
}

function onPlayerStateChange(event) {
  let currentIndex = event.target.a.id.split("slideshow")[1];
  if(currentIndex && players.length ==  $(".slideshowContent").length){
    console.log(players[currentIndex].getPlayerState());
    if(players[currentIndex].getPlayerState() == 1) {
      for (let i=0; i<players.length; i++){
        if(players[i] != players[currentIndex]){
          players[i].pauseVideo();
        }
      }
    }
  }
}

function stopSlideshowPlaying(){
  if(videosLoaded){
    for (let i=0; i<players.length; i++){
      if(players[i].getPlayerState() == 1){
        players[i].pauseVideo();
      }
    }
  }
}