const player = document.getElementById("player");
const play = document.getElementById("play");
const volume = document.getElementById("volume");
const duration = document.querySelector(".full__time");
const currentTime = document.querySelector(".current__time");
let interval;
let durationValue;

player.volume = volume.value / 100;
player.addEventListener("loadedmetadata", () => {
  durationValue = Math.floor(player.duration);
  duration.innerHTML = durationValue;
});
play.addEventListener("click", () => {
  player.paused ? onPlay() : onPause();
});

volume.addEventListener("change", (e) => {
  player.volume = e.target.value / 100;
});

const onPlay = () => {
  player.play();
  play.innerHTML = "pause";
  interval = !interval
    ? setInterval(() => {
        const currentValue = player.currentTime;
        currentTime.innerHTML = Math.floor(currentValue);
        if(currentValue >= durationValue){
            clearInterval(interval);
        }
      }, 1000)
    : interval;
};

const onPause = () => {
  player.pause();
  play.innerHTML = "play";
  interval = interval ? clearInterval(interval) : null;
};
