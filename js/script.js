// Selectors
const musicContainer = document.querySelector("#music-container")
const playBtn = document.querySelector("#play")
const prevBtn = document.querySelector("#prev")
const nextBtn = document.querySelector("#next")
const reverse = document.querySelector("#reverse")
const dowload = document.querySelector("#download")


const audio = document.querySelector("#music")
const progress = document.querySelector("#progress")
const progressContainer = document.querySelector("#progress-container")
const startTime = document.querySelector("#start-time")
const endTime = document.querySelector("#end-time")

const title = document.querySelector("#title")
const cover = document.querySelector("#cover")
const bigImg = document.querySelector("#big-img")

// Songs titles
const songs = ["50 Cent - P.I.M.P", "Pitbull - Hotel Room Service", "Rauf Faik - вечера"]

let songIndex = 1;


// functions

// Load songs details
loadSong(songs[songIndex])


// Update song Details
function loadSong(song) {
    title.innerHTML = song;
    audio.src = `music/${song}.mp3`
    dowload.href = `music/${song}.mp3`
    cover.src = `img/${song}.jpg`
    bigImg.src = `img/${song}.jpg`
    bigImg.src = `img/${song}.jpg`

}


// Play event
playBtn.addEventListener("click",() => {
    const isPlaying = musicContainer.classList.contains("play")
    if(isPlaying) {
        pauseSong()
    } else {
        playSong()
    }
})

// Play Song function
function playSong() {
    musicContainer.classList.add("play")
    playBtn.querySelector("i.fa-solid").classList.remove("fa-play")
    playBtn.querySelector("i.fa-solid").classList.add("fa-pause")
    bigImg.classList.add("opacityImg")
    audio.play()
}

// Pause Song function
function pauseSong() {
    musicContainer.classList.remove("play")
    playBtn.querySelector("i.fa-solid").classList.add("fa-play")
    playBtn.querySelector("i.fa-solid").classList.remove("fa-pause")
    bigImg.classList.remove("opacityImg")
    audio.pause()
}

// Change song

prevBtn.addEventListener("click", prevSong)
nextBtn.addEventListener("click", nextSong)
reverse.addEventListener("click", reverseMusic)

// prev song
function prevSong() {
    songIndex--
    if(songIndex < 0) {
        songIndex = songs.length-1
    }
    loadSong(songs[songIndex])
    playSong()
}

// next song
function nextSong() {
    songIndex++
    if(songIndex > songs.length - 1) {
        songIndex = 0
    }
    loadSong(songs[songIndex])
    playSong()
}

// reverse song
function reverseMusic() {
    reverse.classList.toggle("btn-active")
    playSong()
}

dowload.addEventListener("click", down)
function down() {
    console.log(dowload);
}

// time song update
audio.addEventListener("timeupdate", updateProgress)
function updateProgress(e) {
    const {duration, currentTime} = e.srcElement
    const progressPercent = (currentTime / duration) * 100
    progress.style.width = `${progressPercent}%`
    
    const roundTime = Math.floor(currentTime / 60) 
    const lastRoundTime = Math.floor(currentTime % 60)
    
    startTime.innerHTML = `${roundTime}:${lastRoundTime < 10 ? "0" + lastRoundTime : lastRoundTime}`
    endTime.innerHTML = `${Math.floor(duration / 60)}:${Math.floor(duration % 60)}`
    
    
    if(currentTime == duration){
        pauseSong()
    }
    if(currentTime == duration && reverse.classList.contains("btn-active")) {
        reverseMusic()
    }
}

// click on progress bar
progressContainer.addEventListener("click", setProgress)
function setProgress(e) {
    const width = this.clientWidth
    const clickX = e.offsetX;
    const duration = audio.duration
    audio.currentTime = (clickX / width) * duration
}

