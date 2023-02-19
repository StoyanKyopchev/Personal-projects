var sourcesArr = [{
                    songSrc: "../Songs/24kGoldn-mood.mp3", 
                    imgSrc: "../Images/24kGoldn-mood.jpeg", 
                    songName: "Mood", 
                    artistName: "24kGoldn"
                },
                {
                    songSrc: "../Songs/CJ-whoopty.mp3", 
                    imgSrc: "../Images/CJ-whoopty.jpeg", 
                    songName: "Whoopty", 
                    artistName: "CJ"
                },
                {
                    songSrc: "../Songs/Gayle-abcdefu.mp3", 
                    imgSrc: "../Images/Gayle-abcdefu.jpeg", 
                    songName: "Abcdefu", 
                    artistName: "Gayle"
                },
                {
                    songSrc: "../Songs/Glass\ Animals-heat\ waves.mp3", 
                    imgSrc: "../Images/GlassAnimals-heatWaves.jpeg", 
                    songName: "Heat Waves", 
                    artistName: "Glass Animals"
                },
                {
                    songSrc: "../Songs/Imanbek-belly\ dancer.mp3", 
                    imgSrc: "../Images/Imanbek-bellyDancer.jpeg", 
                    songName: "Belly Dancer", 
                    artistName: "Imanbek"
                },
                {
                    songSrc: "../Songs/James\ Hype-Ferrari.mp3", 
                    imgSrc: "../Images/JamesHype-Ferrari.jpeg", 
                    songName: "Ferrari", 
                    artistName: "James Hype"
                },
                {
                    songSrc: "../Songs/Lil\ Nas-industry\ baby.mp3", 
                    imgSrc: "../Images/LilNas-industryBaby.jpeg", 
                    songName: "Industry Baby", 
                    artistName: "Lil Nas X"
                },
                {
                    songSrc: "../Songs/Meduza-bad\ memories.mp3", 
                    imgSrc: "../Images/Meduza-badMemories.jpeg", 
                    songName: "Bad Memories", 
                    artistName: "Meduza"
                },
                {
                    songSrc: "../Songs/Meduza-paradise.mp3", 
                    imgSrc: "../Images/Meduza-paradise.jpeg", 
                    songName: "Paradise", 
                    artistName: "Meduza"
                },
                {
                    songSrc: "../Songs/Meduza-piece\ of\ your\ heart.mp3", 
                    imgSrc: "../Images/Meduza-pieceOfYourHeart.jpeg", 
                    songName: "Piece of Your Heart", 
                    artistName: "Meduza"
                },
                {
                    songSrc: "../Songs/Tiesto-the\ business.mp3", 
                    imgSrc: "../Images/Tiesto-theBusiness.jpeg", 
                    songName: "The Business", 
                    artistName: "Tiesto"
                },
                {
                    songSrc: "../Songs/Tiesto-the\ motto.mp3", 
                    imgSrc: "../Images/Tiesto-theMotto.jpeg", 
                    songName: "The Motto", 
                    artistName: "Tiesto"
                },
                {
                    songSrc: "../Songs/Travis\ Scott-goosebumps.mp3", 
                    imgSrc: "../Images/TravisScott-goosebumps.jpeg", 
                    songName: "Goosebumps", 
                    artistName: "Travis Scott"
                }],

    mainContainer = document.querySelector(".mainContainer"),
    audioSource = document.querySelector(".audioSource"),
    playerImage = document.querySelector(".playerTop > img"),
    seekerWrapper = document.querySelector(".seekerWrapper"),
    seeker = document.querySelector(".seeker"),
    songName = document.querySelector(".songName"),
    artistName = document.querySelector(".artistName"),
    backwardButton = document.querySelector(".backwardButton"),
    playButton = document.querySelector(".playButton"),
    forwardButton = document.querySelector(".forwardButton"),
    shuffleButton = document.querySelector(".shuffleButton"),
    muteButton = document.querySelector(".muteButton"),
    volumeWrapper = document.querySelector(".volumeWrapper"),
    volume = document.querySelector(".volume"),
    playlistExpandButton = document.querySelector(".playlistExpandButton"),
    playlist = document.querySelector(".playlist"),
    isShuffleClicked = false,
    actualSongIndex = "",
    shuffledSourcesArr = [].concat(sourcesArr),
    currentSongIndex = "0";
    
   
buildPlaylist();
loadSong(currentSongIndex);
bindEventsToPlayer();
bindEventsToPlaylist();

function buildPlaylist() {
    var html = '';

    if(isShuffleClicked) {
        shuffledSourcesArr.forEach(function(sources, songIndex) {

            html += '<div class="playlistInnerWrapper" songIndex=' + songIndex + '>' +
                        '<img src=' + sources.imgSrc + '>' +
                        '<span class="playlistNumber">' + (songIndex+1) + '.</span>' +
                        '<span class="playListArtist">' + sources.artistName + '&nbsp-&nbsp</span>' +
                        '<span class="playListTitle">' + sources.songName + '</span>' +
                    '</div>';           
    })}
    else {
        sourcesArr.forEach(function(sources, songIndex) {
        
            html += '<div class="playlistInnerWrapper" songIndex=' + songIndex + '>' +
                        '<img src=' + sources.imgSrc + '>' +
                        '<span class="playlistNumber">' + (songIndex+1) + '.</span>' +
                        '<span class="playListArtist">' + sources.artistName + '&nbsp-&nbsp</span>' +
                        '<span class="playListTitle">' + sources.songName + '</span>' +
                    '</div>';           
        });
    }

    playlist.innerHTML = html;
}

function loadSong(songIndex) {
    var song = sourcesArr[songIndex];

    if(isShuffleClicked) {
        song = shuffledSourcesArr[songIndex];
    } 

    audioSource.setAttribute("src", song.songSrc);
    playerImage.setAttribute("src", song.imgSrc);
    songName.innerText = song.songName;
    artistName.innerText = song.artistName;
    document.title = song.songName;
    mainContainer.style.background = "url(" + song.imgSrc + ') center no-repeat, linear-gradient(#bdc3c7, #2c3e50)';
    mainContainer.style.backgroundSize = "contain";
}

function bindEventsToPlayer() {
    playButton.addEventListener("click", togglePlay);
    playlistExpandButton.addEventListener("click", togglePlaylist);
    forwardButton.addEventListener("click", nextSong);
    backwardButton.addEventListener("click", previousSong);
    shuffleButton.addEventListener("click", shuffleFlag);
    muteButton.addEventListener("click", toggleMute);
    volumeWrapper.addEventListener("click", seekAudioVolume);
    seekerWrapper.addEventListener("click", onSeekerClick);
    audioSource.addEventListener("timeupdate", syncSeekerAndDuration);
}

function bindEventsToPlaylist() {
    var playListItems = playlist.querySelectorAll(".playlistInnerWrapper");

    for(var i = 0; i < playListItems.length; i++) {
        playListItems[i].addEventListener("click", playSelectedSong);
    }
}

function togglePlay() {
    if(audioSource.paused) {
        audioSource.play();
        playButton.innerHTML = "<i class='fa fa-pause'></i>";
    } 
    else {
        audioSource.pause();
        playButton.innerHTML = "<i class='fa fa-play'></i>";
    }
}

function togglePlaylist() {
    playlistExpandButton.classList.toggle("playlistExpandButton--expanded");
    playlist.classList.toggle("hidden");

    if(playlistExpandButton.classList.contains("playlistExpandButton--expanded")) {
        playlistExpandButton.innerHTML = "<i class='fa fa-chevron-down'></i>";
    }
    else {
        playlistExpandButton.innerHTML = "<i class='fa fa-chevron-up'></i>";
    }
}

function playSelectedSong(event) {
    currentSongIndex = event.currentTarget.getAttribute("songIndex");

    loadSong(currentSongIndex);
    togglePlaylist();
    togglePlay();    
}

function nextSong() {
    currentSongIndex++;
    currentSongIndex = currentSongIndex.toString();

    if(currentSongIndex == (sourcesArr.length)) {
        currentSongIndex = "0";
    }

    loadSong(currentSongIndex);
    togglePlay();
}

function previousSong() {
    currentSongIndex--;
    currentSongIndex = currentSongIndex.toString();

    if(Number(currentSongIndex) < 0) {
        currentSongIndex = sourcesArr.length-1;
        currentSongIndex = currentSongIndex.toString();
    }

    loadSong(currentSongIndex);
    togglePlay();
}

function shuffleSongs() {
    shuffledSourcesArr.sort(function() {
        return Math.random() - 0.5;
    });

    return shuffledSourcesArr;
}

function shuffleFlag() {
    if(isShuffleClicked) {
        isShuffleClicked = false;
        shuffleButton.classList.remove("playerControlsActive");
        currentSongIndex = actualSongIndex;
        buildPlaylist();
        bindEventsToPlaylist();
    }
    else {
        isShuffleClicked = true;
        shuffleButton.classList.add("playerControlsActive");
        actualSongIndex = currentSongIndex;
        shuffleSongs();
        buildPlaylist();
        bindEventsToPlaylist();
    }
}

function toggleMute() {
    if(audioSource.muted) {
        audioSource.muted = false;
        muteButton.innerHTML = "<i class='fa fa-volume-up'></i>";
    }
    else {
        audioSource.muted = true;
        muteButton.innerHTML = "<i class='fa fa-volume-off'></i>";
    }
}

function newSeekerPercentage(event) {
    var elementClientRect = event.target.getBoundingClientRect(),
        mouseX = event.clientX,
        elementX = elementClientRect.left,
        elementWidth = event.target.offsetWidth,
        mouseOffsetX = mouseX - elementX,
        seekerPercentage = (mouseOffsetX / elementWidth) * 100,

        seekerPercentage = Math.round(seekerPercentage);

    return seekerPercentage;
}

function seekAudioVolume(event) {
    var seekerPercentage = newSeekerPercentage(event);

    if(audioSource.muted) {
        audioSource.muted = false;
        muteButton.innerHTML = "<i class='fa fa-volume-up'></i>";
    }
    
    volume.setAttribute("style", "width: " + seekerPercentage + "%");
    audioSource.volume = seekerPercentage / 100;
}

function onSeekerClick(event) {
    var seekerPercentage = newSeekerPercentage(event);

    seeker.setAttribute("style", "width: " + seekerPercentage + "%");
    moveAudioToPercentage(seekerPercentage);
}

function moveAudioToPercentage(seekerPercentage) {
    var totalDuration = audioSource.duration,
        newTime = totalDuration * (seekerPercentage / 100);

    audioSource.currentTime = newTime;
}

function syncSeekerAndDuration() {
    var totalDuration = audioSource.duration,
        elapsedDuration = audioSource.currentTime,
        percentage = (elapsedDuration / totalDuration) * 100;

    seeker.setAttribute("style", "width: " + percentage + "%");

    if(elapsedDuration == totalDuration) {
        nextSong();
    }
}