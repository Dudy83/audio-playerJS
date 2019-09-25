songs = [
    { 
      beat: "10550.mp3",
      author: "test",
      img: "Elvis.jpg",
    },
    { 
        beat: "10564.mp3",
        author: "test1",
        img: "zzTop.jpg",
    },
];


var songTitle = document.getElementById('songTitle');
var songAuthor = document.getElementById('songAuthor');
var songImage = document.getElementById('song-image');
var songSlider = document.getElementById('songSlider');
var currentTime = document.getElementById('currentTime');
var duration = document.getElementById('duration');
var volumeSlider = document.getElementById('songVolume');
var playPause = document.getElementById('play-pause');
var speaker = document.getElementById('speaker-volume');

var song = new Audio();
var currentSong = 0;

function loadSong()
{
    if(currentSong >= songs.length)
        currentSong = 0;
    song.src = "beats/" + songs[currentSong].beat;
    songTitle.textContent =  songs[currentSong].beat;
    songAuthor.textContent = songs[currentSong].author;
    songImage.src = "images/" + songs[currentSong].img;
    song.volume = volumeSlider.value;
    song.play();
    setTimeout(showDuration, 1000);
}

setInterval(updateSongSlider, 1000);

function updateSongSlider()
{
    var c = Math.round(song.currentTime);
    songSlider.value = c;
    currentTime.textContent = convertTime(c);
}

function convertTime(secs)
{
    var min = Math.floor(secs/60);
    var sec = secs % 60;
    min = (min < 10) ? "0" + min : min;
    sec = (sec < 10) ? "0" + sec : sec;

    return (min + ":" + sec);
}

function showDuration()
{
    var d = Math.floor(song.duration);
    songSlider.setAttribute("max", d);
    duration.textContent = convertTime(d);
}

function playOrPauseSong(img)
{
    if(song.paused){
        song.play();
        img.src = "images/pause.png"; 
    }else{
        song.pause();
        img.src="images/play.png";
    }
}

function next()
{
    currentSong++;
    currentSong = (currentSong < 0) ? songs.length +1 : currentSong;
    playPause.src = "images/pause.png";
    loadSong();    
}

function previous()
{
    currentSong--;
    currentSong = (currentSong < 0) ? songs.length -1 : currentSong;
    playPause.src = "images/pause.png";
    loadSong();
}

function seekSong()
{
    song.currentTime = songSlider.value;
    currentTime.textContent = convertTime(song.currentTime);
}

function adjustVolume()
{
    song.volume = volumeSlider.value;
    if(volumeSlider.value === volumeSlider.min)
        speaker.src = "images/muted.png";
    else
        speaker.src = "images/volume.png";
}