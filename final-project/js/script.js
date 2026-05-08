const music = document.getElementById("studyMusic");
const musicButton = document.getElementById("musicButton");

if (music && musicButton) {

  musicButton.addEventListener("click", function () {

    if (music.paused) {
      music.play();
      musicButton.textContent = "Pause Study Music";
    } else {
      music.pause();
      musicButton.textContent = "Play Study Music";
    }

  });

}