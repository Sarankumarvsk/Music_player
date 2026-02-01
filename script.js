//audio element
let audio = document.createElement("audio");

// Track list
let track_list = [
    {
        name: "Naan Un",
        path: "./songs/NaanUn.flac",
        image: "./images/naanun.jpg"
    },
    {
        name: "Matta",
        path: "./songs/Matta.mp3",
        image: "./images/matta.jpg"
    },
    {
        name: "Adi-Penne",
        path: "./songs/Adi-Penne.mp3",
        image: "./images/adipenne.jpg"
    },
    {
        name: "Fear Song",
        path: "./songs/Fear Song.mp3",
        image: "./images/fear.jpg"
    },
    {
        name: "Heartukulla",
        path: "./songs/Heartukulla.mp3",
        image: "./images/heartkulla.jpg"
    }
];

let now_playing = document.querySelector(".nowplaying");
let seek_slider = document.querySelector(".seek_slider");
let current_time = document.querySelector(".current-time");
let total_duration = document.querySelector(".total-duration");
let play_btn = document.querySelector(".play-track i");
let track_art = document.querySelector(".outline");


let track_index = 0;
let isPlaying = false;
let isRandom = false;
let isRepeat = false;
let updateTimer;

// Load track
function loadTrack(index) {
    clearInterval(updateTimer);
    resetValues();

    audio.src = track_list[index].path;
    audio.load();

    track_art.style.backgroundImage =
        "url(" + track_list[index].image + ")";

    now_playing.textContent = track_list[index].name;

    updateTimer = setInterval(seekUpdate, 1000);
    audio.addEventListener("ended", nextLogic);
}

// Reset time
function resetValues() {
    current_time.textContent = "00:00";
    total_duration.textContent = "00:00";
    seek_slider.value = 0;
}

// Play 
function palytrack() {
    if (!isPlaying) {
        playTrack();
    } else {
        pauseTrack();
    }
}

function playTrack() {
    audio.play();
    isPlaying = true;
    play_btn.classList.replace("fa-play-circle", "fa-pause-circle");
}
// Pause
function pauseTrack() {
    audio.pause();
    isPlaying = false;
    play_btn.classList.replace("fa-pause-circle", "fa-play-circle");
}

// Next 
function nexttrack() {
    if (isRandom) {
        track_index = Math.floor(Math.random() * track_list.length);
    } else {
        track_index = (track_index + 1) % track_list.length;
    }
    loadTrack(track_index);
    playTrack();
}
// Previous
function prevtrack() {
    track_index =
        (track_index - 1 + track_list.length) % track_list.length;
    loadTrack(track_index);
    playTrack();
}

// Random
function randomtrack() {
    isRandom = !isRandom;
    alert(isRandom ? "Random ON" : "Random OFF");
}

// Repeat
function repeattrack() {
    isRepeat = !isRepeat;
    alert(isRepeat ? "Repeat ON" : "Repeat OFF");
}

// Seek
function seekTo() {
    let seekto =
        audio.duration * (seek_slider.value / 100);
    audio.currentTime = seekto;
}

// Update slider & time
function seekUpdate() {
    if (!isNaN(audio.duration)) {
        let seekPosition =
            (audio.currentTime / audio.duration) * 100;
        seek_slider.value = seekPosition;

        let currentMinutes =
            Math.floor(audio.currentTime / 60);
        let currentSeconds =
            Math.floor(audio.currentTime % 60);
        let durationMinutes =
            Math.floor(audio.duration / 60);
        let durationSeconds =
            Math.floor(audio.duration % 60);

        if (currentSeconds < 10)
            currentSeconds = "0" + currentSeconds;
        if (durationSeconds < 10)
            durationSeconds = "0" + durationSeconds;

        current_time.textContent =
            currentMinutes + ":" + currentSeconds;
        total_duration.textContent =
            durationMinutes + ":" + durationSeconds;
    }
}

// Track end logic
function nextLogic() {
    if (isRepeat) {
        audio.currentTime = 0;
        playTrack();
    } else {
        nexttrack();
    }
}

// Load first song
loadTrack(track_index);
