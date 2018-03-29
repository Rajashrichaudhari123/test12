 /**
 * youtubeFrame.js
 * @author CloudPact Technologies
 * @description : Library for you tube link display
 **/
 var tag = document.createElement('script');
var firstScriptTag = document.getElementsByTagName('script')[0];
$m.onReady(function(){
	tag.src = "https://www.youtube.com/iframe_api";
	firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
	var titleName = "Life Planner" ;
	utils.headerTitle(titleName);
});
     

      // 3. This function creates an <iframe> (and YouTube player)
      //    after the API code downloads.
      var player;
      function onYouTubeIframeAPIReady(VideoID) {
        player = new YT.Player('player', {
          height: '100%',
          width: '100%',
          videoId: 'rCYLG_2ZT8g',
          playerVars: { 'controls': 0,'rel':0,'showinfo':0,'enablejsapi':1 },
          
          events: {
            'onReady': onPlayerReady,
            'onStateChange': onPlayerStateChange
          }
        });
      }
       // 4. The API will call this function when the video player is ready.
      function onPlayerReady(event) {      
      document.getElementById("player").onclick = function() {
        if (document.getElementsByClassName("loading_text")) {
            document.getElementsByClassName("loading_text")[0].style.zIndex = "-1";
        }
        player.playVideo();
//        videoPlayer.loadVideoById("bHQqvYy5KYo", 5, "large")
    };
    //event.target.playVideo();
}
//$(".next").click(function(videoId){player.loadVideoById(videoId);});
// 5. The API calls this function when the player's state changes.
//    The function indicates that when playing a video (state=1),
//    the player should play for six seconds and then stop.
var done = false;

function onPlayerStateChange(event) {
    if (event.data == YT.PlayerState.PLAYING && !done) {
        //setTimeout(stopVideo, 6000);
        done = true;
    }
}

function stopVideo() {
    try{
        player.stopVideo();
    }catch(e){

    }
}
