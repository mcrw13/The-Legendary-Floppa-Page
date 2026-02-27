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

// Start playing immediately
playNext();

function playNext() {
  audio.src = getRandomSong();
  audio.play().catch(() => {
    // If autoplay blocked, show notice
    console.log("Autoplay blocked — click anywhere to start music.");
    document.addEventListener("click", () => audio.play(), { once: true });
  });

  audio.onended = () => {
    setTimeout(() => {
      playNext();
    }, 3000); // 3-second wait between songs
  };
}
