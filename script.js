// ===== CONFIG: list your YouTube video IDs here =====
const VIDEO_IDS = [
  ""g6aia0GQMRw",
    "puwOdeKHAKY"

];
// ====================================================

let currentIndex = 0;
let player;

// Wait for any click to start music
document.addEventListener("click", startMusic, { once: true });

function startMusic() {
  // Load YouTube IFrame API
  const tag = document.createElement("script");
  tag.src = "https://www.youtube.com/iframe_api";
  document.head.appendChild(tag);
}

// Required YouTube API callback
window.onYouTubeIframeAPIReady = function() {
  // Create invisible player container
  const playerDiv = document.createElement("div");
  playerDiv.style.width = "1px";
  playerDiv.style.height = "1px";
  playerDiv.style.opacity = "0";
  document.body.appendChild(playerDiv);

  // Create YouTube player
  player = new YT.Player(playerDiv, {
    videoId: VIDEO_IDS[currentIndex],
    playerVars: {
      autoplay: 1,
      controls: 0,
      modestbranding: 1,
      rel: 0
    },
    events: {
      onReady: e => e.target.playVideo(),
      onStateChange: e => {
        if (e.data === YT.PlayerState.ENDED) {
          // Play next video in the list
          currentIndex = (currentIndex + 1) % VIDEO_IDS.length;
          player.loadVideoById(VIDEO_IDS[currentIndex]);
        }
      }
    }
  });
};
