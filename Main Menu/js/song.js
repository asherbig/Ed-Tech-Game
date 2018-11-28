DoMi.song = function(game) {};

var homeBtn, freeplayBtn, playlistBtn, musicOn, musicOff, continueBtn, playBtn, pauseBtn, music;

DoMi.song.prototype = {

    preload: function () {
        game.load.image('homeBtn', 'icons/home.png');
        game.load.image('freeplayBtn', 'icons/freeplay.png');
        game.load.image('playlistBtn', 'icons/playlist.png');
        game.load.image('musicOn', 'icons/toggle-on.png');
        game.load.image('musicOff', 'icons/toggle-off.png');
        game.load.image('playBtn', 'icons/play.png');
        game.load.image('pauseBtn', 'icons/pause.png');
        game.load.image('continueBtn', 'icons/continue.png');
        game.load.image('freeplayBG', 'images/free-play/freeplay-BG.png');
        game.load.image('asongTitle', 'images/song/a-song.png');
        game.load.audio('a-song', 'audio/song/a-song.mp3');
    },

    create: function () {
        //Add background and slider base
        game.add.image(0, -1, 'freeplayBG');
        game.add.image(275, 220, 'asongTitle');
        
        //Add The A Song
        music = game.add.audio('a-song');

        //Instantiate buttons
        homeBtn = game.add.button(48, 30, 'homeBtn', actionOnClick1, this);
        homeBtn.alpha = 0.85;
        homeBtn.onInputOver.add(over, this);
        homeBtn.onInputOut.add(out, this);

        freeplayBtn = game.add.button(123, 30, 'freeplayBtn', actionOnClick2, this);
        freeplayBtn.alpha = 0.85;
        freeplayBtn.onInputOver.add(over, this);
        freeplayBtn.onInputOut.add(out, this);

        playlistBtn = game.add.button(198, 30, 'playlistBtn', actionOnClick3, this);
        playlistBtn.alpha = 0.85;
        playlistBtn.onInputOver.add(over, this);
        playlistBtn.onInputOut.add(out, this);

        if (BGM.isPlaying === true) {
            musicOn = game.add.button(1250, 40, 'musicOn', actionOnClick4, this);
            musicOn.alpha = 0.85;
            musicOn.onInputOver.add(over, this);
            musicOn.onInputOut.add(out, this);
        } else {
            musicOff = game.add.button(1250, 40, 'musicOff', actionOnClick4, this);
            musicOff.alpha = 0.85;
            musicOff.onInputOver.add(over, this);
            musicOff.onInputOut.add(out, this); 
        }

        if (music.isPlaying === false) {
            playBtn = game.add.button(540, 330, 'playBtn', actionOnClick5, this);
            playBtn.alpha = 0.85;
            playBtn.onInputOver.add(over, this);
            playBtn.onInputOut.add(out, this);
        } else {
            pauseBtn = game.add.button(540, 330, 'playBtn', actionOnClick5, this);
            pauseBtn.alpha = 0.85;
            pauseBtn.onInputOver.add(over, this);
            pauseBtn.onInputOut.add(out, this);
        }

        continueBtn = game.add.button(1179, 587, 'continueBtn', actionOnClick6, this);
        continueBtn.alpha = 0.85;
        continueBtn.onInputOver.add(over, this);
        continueBtn.onInputOut.add(out, this);

        //Set button hover and click actions
        function over(event) {
            window[event.key].alpha = 1;
            document.body.style.cursor = "pointer";
        }

        function out(event) {
            window[event.key].alpha = 0.85;
            document.body.style.cursor = "default";
        }

        function actionOnClick1() {
            game.state.start('mainMenu')
        }

        function actionOnClick2() {
            game.state.start("freePlay");
        }

        function actionOnClick3() {

        }

        function actionOnClick4(event) {
            if (event.key == 'musicOn') {
                musicOn.destroy();
                musicOff = game.add.button(1250, 40, 'musicOff', actionOnClick4, this);
                musicOff.alpha = 0.85;
                musicOff.onInputOver.add(over, this);
                musicOff.onInputOut.add(out, this);
                BGM.pause();
            } else if (event.key == 'musicOff') {
                musicOff.destroy();
                musicOn = game.add.button(1250, 40, 'musicOn', actionOnClick4, this);
                musicOn.alpha = 0.85;
                musicOn.onInputOver.add(over, this);
                musicOn.onInputOut.add(out, this);
                BGM.resume();
            } else if (event.key == 'selectorRight' || event.key == 'selectorLeft') {
                if (isLong) {
                    phoneme.destroy()
                    phoneme = game.add.image(530, 518, 'shortA');
                    isLong = false;
                } else {
                    phoneme.destroy();
                    phoneme = game.add.image(530, 518, 'longA');
                    isLong = true;
                }
            }
        }

        function actionOnClick5(event) {
            if (event.key == 'playBtn') {
                playBtn.destroy();
                pauseBtn = game.add.button(540, 330, 'playBtn', actionOnClick5, this);
                pauseBtn.alpha = 0.85;
                pauseBtn.onInputOver.add(over, this);
                pauseBtn.onInputOut.add(out, this);
                BGM.pause();
                if (music.isPlaying === true) {
                    music.resume();
                } else {
                    music.play()
                }
            } else if (event.key == 'pauseBtn') {
                pauseBtn.destroy();
                playBtn = game.add.button(540, 330, 'playBtn', actionOnClick5, this);
                playBtn.alpha = 0.85;
                playBtn.onInputOver.add(over, this);
                playBtn.onInputOut.add(out, this);
                BGM.resume();
                music.pause();
            }
            music.onStop.addOnce(function() {
                BGM.resume();
            });
        }

        function actionOnClick6(event) {
            music.stop();
            game.state.start("bubblePop");
        }
    }
}