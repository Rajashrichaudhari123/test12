var tag = document.createElement('script');
var firstScriptTag = document.getElementsByTagName('script')[0];
$m.onReady(function() {
	$m.juci.dataset("headerName","Super Express");
    if(!$m.isIOS()){
        tag.src = "https://www.youtube.com/iframe_api";
        firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
    }else{
        var loading_element = $m.juci.findByClass("loading_text");
        loading_element = loading_element[0];
        loading_element.el.onclick = function(){
            $m.open("Super Express Hindi Training Video", "https://www.youtube.com/watch?v=EiAnMZ4kebY&feature=youtu.be");
        }
    }
});


// 3. This function creates an <iframe> (and YouTube player)
//    after the API code downloads.
var player;

function onYouTubeIframeAPIReady() {
    player = new YT.Player('player', {
        height: '450px',
        width: '100%',
        videoId: 'EiAnMZ4kebY',
        playerVars: {
            'controls': 0,
            'rel': 0,
            'showinfo': 0,
            'enablejsapi': 1
        },

        events: {
            'onReady': onPlayerReady,
            'onStateChange': onPlayerStateChange
        }
    });
}

// 4. The API will call this function when the video player is ready.
function onPlayerReady(event) {
    document.getElementById("yt_img").onclick = function() {
        if (document.getElementsByClassName("loading_text")) {
            document.getElementsByClassName("loading_text")[0].style.zIndex = "-1";
        }
        player.playVideo();
    };
    //event.target.playVideo();
}

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

$m.onClose(function() {
    stopVideo();
});