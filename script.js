const songs = [
  "music/dating_start.mp3",
  "music/enemy_aproaching.mp3",
  "music/hotel.mp3",
  "music/shop.mp3",
  "music/uwa_so_temperate.mp3"
];

let audio = new Audio();
let lastIndex = -1;

// Get a random song without repeating the last one
function getRandomSong() {
  let index;
  do {
    index = Math.floor(Math.random() * songs.length);
  } while (index === lastIndex);
  lastIndex = index;
  return songs[index];
}

// Start music on first click (Safari requirement)
document.addEventListener("click", startMusic, { once: true });

function startMusic() {
  playNext();
}

function playNext() {
  audio.src = getRandomSong();
  audio.play();

  audio.onended = () => {
    // Wait 3 seconds before playing next song
    setTimeout(() => {
      playNext();
    }, 3000); // 3000ms = 3 seconds
  };
}
