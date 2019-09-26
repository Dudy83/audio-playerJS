songs = [
    { 
      beat: "10550.mp3",
      author: "test",
      img: "Elvis.jpg",
    },
    { 
        beat: "13748.mp3",
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
let progress = document.getElementById('progress');
let volumeProgress = document.getElementById('progressVolume');

var song = new Audio();
var currentSong = 0;


function loadSong()
{
    if(currentSong >= songs.length)
        currentSong = 0;
    song.src = "beats/" + songs[currentSong].beat;
    songTitle.textContent =  songs[currentSong].beat.replace(".mp3", "");
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
    var percent = (100 * ( song.currentTime / song.duration )) + "%";
    progress.style.width = percent;
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
    else if(volumeSlider > 0.1 || volumeSlider.value < 0.49)
        speaker.src = "images/low-volume.png";
    else
        speaker.src = "images/volume.png";

    volumeProgress.style.width = song.volume * 100 + "%";
}

speaker.addEventListener('click', clickMuted);
speaker.addEventListener('scroll', adjustVolume);

var a = volumeSlider.value;

function clickMuted()
{
    
    if(volumeSlider.value >= 0.01)
    {
        volumeSlider.value = 0;
        song.volume = 0;
        speaker.src = "images/muted.png";
        volumeProgress.style.width = song.volume * 100 + "%";
    }

    else if(volumeSlider.value <= 0)
    {
        volumeSlider.value = a;
        song.volume = a;
        speaker.src = "images/volume.png";
        volumeProgress.style.width = song.volume * 100 + "%";    
    }
}

// Progress Bar function

$("#songVolume").mousemove(function (e) {
    var val = ($(this).val() - $(this).attr('min')) / ($(this).attr('max') - $(this).attr('min'));
    var percent = val * 100;

    $(this).css('background-image',
        '-webkit-gradient(linear, left top, right top, ' +
        'color-stop(' + percent + '%, #df7164), ' +
        'color-stop(' + percent + '%, #F5D0CC)' +
        ')');

    $(this).css('background-image',
        '-moz-linear-gradient(left center, #DF7164 0%, #DF7164 ' + percent + '%, #F5D0CC ' + percent + '%, #F5D0CC 100%)');
});