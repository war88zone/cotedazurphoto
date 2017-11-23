var youtubeAPIReady = false;

function onYouTubeIframeAPIReady() {
  youtubeAPIReady = true;
}

if(youtubeAPIReady) {
  var self = this;
  $(".slideshowContent").each(function(){
    var identifier = this.firstElementChild.id;
    player = new YT.Player(identifier, {
      events: {
        'onReady': onPlayerReady,
        'onStateChange': onPlayerStateChange
      }
    });
    self.players.push(player);
  });
}


function onPlayerReady(event) {
  currentIndex = event.target.a.id.split("slideshow")[1];
  console.log(currentIndex + " is ready");
}

function onPlayerStateChange(event) {
  currentIndex = event.target.a.id.split("slideshow")[1];
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
  for (let i=0; i<players.length; i++){
    if(players[i].getPlayerState() == 1){
      players[i].pauseVideo();
    }
  }
}