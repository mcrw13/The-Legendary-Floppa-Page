// List of YouTube video IDs (no extra parameters)
const VIDEO_IDS = [
  "g6aia0GQMRw",
    "puwOdeKHAKY",
    "R0uNPIa-I9c"
];

let currentIndex = 0;
let player;

// Show a click instruction (required for Safari)
const notice = document.createElement("div");
notice.innerText = "Click anywhere to start the legendary Floppa music!";
notice.style.position = "fixed";
notice.style.top = "50%";
notice.style.left = "50%";
notice.style.transform = "translate(-50%, -50%)";
notice.style.fontSize = "24px";
notice.style.backgroundColor = "rgba(0,0,0,0.7)";
notice.style.color = "white";
notice.style.padding = "20px";
notice.style.borderRadius = "10px";
notice.style.cursor = "pointer";
document.body.appendChild(notice);

// Wait for first click
document.addEventListener("click", startMusic, { once: true });

function startMusic() {
  notice.remove(); // Remove instruction

  // Load YouTube IFrame API
  const tag = document.createElement("script");
  tag.src = "https://www.youtube.com/iframe_api";
  document.head.appendChild(tag);
}

// YouTube API callback
window.onYouTubeIframeAPIReady = function() {
  const playerDiv = document.createElement("div");
  playerDiv.style.width = "1px";
  playerDiv.style.height = "1px";
  playerDiv.style.opacity = "0";
  document.body.appendChild(playerDiv);

  player = new YT.Player(playerDiv, {
    videoId: VIDEO_IDS[currentIndex],
    playerVars: { autoplay: 1, controls: 0, modestbranding: 1, rel: 0 },
    events: {
      onReady: e => e.target.playVideo(),
      onStateChange: e => {
        if (e.data === YT.PlayerState.ENDED) {
          currentIndex = (currentIndex + 1) % VIDEO_IDS.length;
          player.loadVideoById(VIDEO_IDS[currentIndex]);
        }
      }
    }
  });
};
