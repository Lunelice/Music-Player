document.addEventListener('DOMContentLoaded', () => {
    const btnPlay =document.querySelector(".play")
    const btnNext = document.querySelector(".next")
    const btnPrevious = document.querySelector(".previous")
    const progressBar = document.querySelector(".progress-bar")
    const progressFill = document.querySelector(".progress-fill")
    const audio = document.querySelector(".audio")
    const timePassed = document.querySelector(".time-passed")
    const songEnd = document.querySelector(".song-end")
    const song = document.querySelector(".song")
    const artist = document.querySelector(".artist")
    const cover = document.querySelector(".cover")
    const soundBar = document.querySelector('.sound-bar')
    const soundFill = document.querySelector('.sound-fill')
    
    

    const playlist = [
        {
            name: "Lost in the City Lights",
            artist: "Cosmo Sheldrake",
            audio: "lost-in-city-lights-145038.mp3",
            cover: "cover-1.png"
        },
        {
            name: "Forest Lullaby",
            artist: "Lesfm",
            audio: "forest-lullaby-110624.mp3",
            cover: "cover-2.png"
        }
    ];

    let currentTrack = 0;
    let isPlaying = false;
    audio.volume = 0.2;

    function loadTrack(trackIndex) {
        const track = playlist[trackIndex];
        audio.src = `./assets/sound/${track.audio}`;
        cover.src = `assets/images/${track.cover}`;
        song.textContent = track.name;
        artist.textContent = track.artist;
        
        audio.load();
        updateTotalTime();
    }

    

    function playPause() {
        if (isPlaying) {
            audio.pause();
            btnPlay.src = "assets/images/Play_fill.svg";
        } else {
            audio.play();
            btnPlay.src = "assets/images/pause.svg";
        }
        isPlaying = !isPlaying;
    }

    function nextTrack() {
        currentTrack = (currentTrack + 1) % playlist.length;
        loadTrack(currentTrack);
        if (isPlaying) audio.play();
    }

    function previousTrack() {
        currentTrack = (currentTrack - 1 + playlist.length) % playlist.length;
        loadTrack(currentTrack);
        if (isPlaying) audio.play();
    }

    function updateProgress() {
        const { currentTime, duration } = audio;
        const progressPercent = (currentTime / duration) * 100;
        progressFill.style.width = `${progressPercent}%`;
        timePassed.textContent = formatTime(currentTime);
    }

    function setProgress(e) {
        const width = this.clientWidth;
        const clickX = e.offsetX;
        const duration = audio.duration;
        audio.currentTime = (clickX / width) * duration;
    }

    function updateTotalTime() {
        audio.addEventListener('loadedmetadata', () => {
            songEnd.textContent = formatTime(audio.duration);
        });
    }

    function formatTime(time) {
        const minutes = Math.floor(time / 60);
        const seconds = Math.floor(time % 60);
        return `${minutes}:${seconds.toString().padStart(2, '0')}`;
    }

    audio.volume = 0.5;

    function adjustVolume(e) {
        const barWidth = soundBar.clientWidth;
        const clickX = e.offsetX;
        const volume = clickX / barWidth;
        audio.volume = volume;  
        soundFill.style.width = `${volume * 100}%`;
    }


    // Event Listeners
    btnPlay.addEventListener('click', playPause);
    btnNext.addEventListener('click', nextTrack);
    btnPrevious.addEventListener('click', previousTrack);
    audio.addEventListener('timeupdate', updateProgress);
    audio.addEventListener('ended', nextTrack);
    progressBar.addEventListener('click', setProgress);
    soundBar.addEventListener('click', adjustVolume);

    // Initialize
    loadTrack(currentTrack);
});