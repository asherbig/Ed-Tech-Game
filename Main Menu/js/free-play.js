DoMi.storyMode = function(game) {};
DoMi.freePlay = function (game) {};

var homeBtn, freeplayBtn, playlistBtn, musicOn, musicOff, continueBtn, wholeNote, panel, slider, volume, longA, shortA, frontLayer, backLayer;

DoMi.storyMode.prototype = {

    preload: function () {
        game.load.image('homeBtn', 'icons/home.png');
        game.load.image('storyBtn', 'icons/story.png');
        game.load.image('playlistBtn', 'icons/playlist.png');
        game.load.image('musicOn', 'icons/toggle-on.png');
        game.load.image('musicOff', 'icons/toggle-off.png');
        game.load.image('continueBtn', 'icons/continue.png');
        game.load.image('freeplayBG', 'images/free-play/freeplay-BG.png');
        game.load.image('slider', 'images/free-play/slider-base.png');
        game.load.image('wholeNote', 'images/free-play/wholenote-friend.png');
        game.load.image('halfNote', 'images/free-play/halfnote-friend.png');
        game.load.image('quarterNote', 'images/free-play/quarternote-friend.png');
        game.load.image('shortA', 'images/free-play/short-a.png');
        game.load.image('longA', 'images/free-play/long-a.png');
        game.load.image('selectorLeft', 'images/free-play/selector-left.png');
        game.load.image('selectorRight', 'images/free-play/selector-right.png');
        game.load.audio('longTone1', 'audio/free-play/long-tone1.mp3');
        game.load.audio('longTone2', 'audio/free-play/long-tone2.mp3');
        game.load.audio('longTone3', 'audio/free-play/long-tone3.mp3');
        game.load.audio('longTone4', 'audio/free-play/long-tone4.mp3');
        game.load.audio('longTone5', 'audio/free-play/long-tone5.mp3');
        game.load.audio('shortTone1', 'audio/free-play/short-tone1.mp3');
        game.load.audio('shortTone2', 'audio/free-play/short-tone2.mp3');
        game.load.audio('shortTone3', 'audio/free-play/short-tone3.mp3');
        game.load.audio('shortTone4', 'audio/free-play/short-tone4.mp3');
        game.load.audio('shortTone5', 'audio/free-play/short-tone5.mp3');

        slickUI = game.plugins.add(Phaser.Plugin.SlickUI);
        slickUI.load('assets/slick-ui-master/themes/custom-theme/custom.json');
    },



    create: function () {
        //Add background and slider base
        game.add.image(0, -1, 'freeplayBG');

        //Instantiate buttons
        homeBtn = game.add.button(48, 30, 'homeBtn', actionOnClick1, this);
        homeBtn.alpha = 0.85;
        homeBtn.onInputOver.add(over, this);
        homeBtn.onInputOut.add(out, this);

        storyBtn = game.add.button(123, 30, 'storyBtn', actionOnClick2, this);
        storyBtn.alpha = 0.85;
        storyBtn.onInputOver.add(over, this);
        storyBtn.onInputOut.add(out, this);

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

        continueBtn = game.add.button(1179, 587, 'continueBtn', actionOnClick5, this);
        continueBtn.alpha = 0.85;
        continueBtn.onInputOver.add(over, this);
        continueBtn.onInputOut.add(out, this);

        //Add phoneme selector
        var isLong = true;
        phoneme = game.add.image(530, 518, 'longA');
        selectorLeft = game.add.button(480, 550, 'selectorLeft', actionOnClick4, this);
        selectorLeft.alpha = 0.85;
        selectorLeft.onInputOver.add(over, this);
        selectorLeft.onInputOut.add(out, this);

        selectorRight = game.add.button(615, 550, 'selectorRight', actionOnClick4, this);
        selectorRight.alpha = 0.85;
        selectorRight.onInputOver.add(over, this);
        selectorRight.onInputOut.add(out, this);


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

        function actionOnClick5() {
            game.state.start("song");
        }

        // Set notes as draggable
        wholeNote = game.add.sprite(57, 132, 'wholeNote');
        wholeNote.inputEnabled = 'true';
        wholeNote.input.enableDrag(true);
        wholeNote.events.onInputDown.add(inputDown);
        wholeNote.events.onInputUp.add(inputUp);

        halfNote = game.add.sprite(38, 233, 'halfNote');
        halfNote.inputEnabled = 'true';
        halfNote.input.enableDrag(true);
        halfNote.events.onInputDown.add(inputDown);
        halfNote.events.onInputUp.add(inputUp);

        quarterNote = game.add.sprite(38, 386, 'quarterNote');
        quarterNote.inputEnabled = 'true';
        quarterNote.input.enableDrag(true);
        quarterNote.events.onInputDown.add(inputDown);
        quarterNote.events.onInputUp.add(inputUp);

        //Populate new note on click
        var wholeCount = 0;
        var halfCount = 0;
        var quarterCount = 0;

        function inputDown(event) {
            if (event.previousPosition.x == 57 && event.previousPosition.y == 132) {
                var string = event.key.replace(/[0-9]/g, '');
                window[string + wholeCount] = game.add.sprite(57, 132, "wholeNote");
                if (volume != undefined) {
                    window[string + wholeCount].scale.setTo(volume + 0.5);
                }
                window[string + wholeCount].inputEnabled = 'true';
                window[string + wholeCount].input.enableDrag(true);
                window[string + wholeCount].events.onInputDown.add(inputDown);
                window[string + wholeCount].events.onInputUp.add(inputUp);
                wholeCount++;
            } else if (event.previousPosition.x == 38 && event.previousPosition.y == 233) {
                var string = event.key.replace(/[0-9]/g, '');
                window[string + halfCount] = game.add.sprite(38, 233, 'halfNote');
                if (volume != undefined) {
                    window[string + halfCount].scale.setTo(volume + 0.5);
                }
                window[string + halfCount].inputEnabled = 'true';
                window[string + halfCount].input.enableDrag(true);
                window[string + halfCount].events.onInputDown.add(inputDown);
                window[string + halfCount].events.onInputUp.add(inputUp);
                halfCount++;
            } else if (event.previousPosition.x == 38 && event.previousPosition.y == 386) {
                var string = event.key.replace(/[0-9]/g, '');
                window[string + quarterCount] = game.add.sprite(38, 386, 'quarterNote');
                if (volume != undefined) {
                    window[string + quarterCount].scale.setTo(volume + 0.5);
                }
                window[string + quarterCount].inputEnabled = 'true';
                window[string + quarterCount].input.enableDrag(true);
                window[string + quarterCount].events.onInputDown.add(inputDown);
                window[string + quarterCount].events.onInputUp.add(inputUp);      
                quarterCount++;
            }
        }

        function inputUp(event) {
            if (event.position.y < 100) {
                if (isLong) {
                    music = game.add.audio('longTone5');
                } else {
                    music = game.add.audio('shortTone5');
                }
            } else if (event.position.y > 100 && event.position.y < 200) {
                if (isLong) {
                    music = game.add.audio('longTone4');
                } else {
                    music = game.add.audio('shortTone4');
                }
            } else if (event.position.y > 200 && event.position.y < 300) {
                if (isLong) {
                    music = game.add.audio('longTone3');
                } else {
                    music = game.add.audio('shortTone3');
                }
            } else if (event.position.y > 300 && event.position.y < 400) {
                if (isLong) {
                    music = game.add.audio('longTone2');
                } else {
                    music = game.add.audio('shortTone2');
                }
            } else {
                if (isLong) {
                    music = game.add.audio('longTone1');
                } else {
                    music = game.add.audio('shortTone1');
                }
            }
            music.volume = (volume == undefined) ? 0.5 : volume;
            music.play();
        }

        //Instantiate slider
        game.add.image(370, 646, 'slider');
        slickUI.add(panel = new SlickUI.Element.Panel(370, 570, 722, 70));
        panel.add(slider = new SlickUI.Element.Slider(33, 90, panel.width - 68));

        //Set slider actions
        slider.onDrag.add(function (value) {
            if (wholeCount > 0) {
                eval('wholeNote' + (wholeCount - 1)).scale.setTo(value + 0.5);
            } else {
                wholeNote.scale.setTo(value + 0.5);
            }
            if (halfCount > 0) {
                eval('halfNote' + (halfCount - 1)).scale.setTo(value + 0.5);
            } else {
                halfNote.scale.setTo(value + 0.5);
            }
            if (quarterCount > 0) {
                eval('quarterNote' + (quarterCount - 1)).scale.setTo(value + 0.5);
            } else {
                quarterNote.scale.setTo(value + 0.5);
            }
        });

        slider.onDragStop.add(function (value) {
            if (value == 0) {
                value += 0.01;
            }
            volume = value;
        });

        //Bring elements aside from music notes to top
        game.world.bringToTop(selectorLeft);
        game.world.bringToTop(selectorRight);
        game.world.bringToTop(phoneme);
        game.world.bringToTop(homeBtn);
        game.world.bringToTop(storyBtn);
        game.world.bringToTop(playlistBtn);
        game.world.bringToTop(musicOn);
        game.world.bringToTop(musicOff);
    }
}

DoMi.freePlay.prototype = {

    preload: function () {
        game.load.image('homeBtn', 'icons/home.png');
        game.load.image('storyBtn', 'icons/story.png');
        game.load.image('playlistBtn', 'icons/playlist.png');
        game.load.image('musicOn', 'icons/toggle-on.png');
        game.load.image('musicOff', 'icons/toggle-off.png');
        game.load.image('freeplayBG', 'images/free-play/freeplay-BG.png');
        game.load.image('slider', 'images/free-play/slider-base.png');
        game.load.image('wholeNote', 'images/free-play/wholenote-friend.png');
        game.load.image('halfNote', 'images/free-play/halfnote-friend.png');
        game.load.image('quarterNote', 'images/free-play/quarternote-friend.png');
        game.load.image('shortA', 'images/free-play/short-a.png');
        game.load.image('longA', 'images/free-play/long-a.png');
        game.load.image('selectorLeft', 'images/free-play/selector-left.png');
        game.load.image('selectorRight', 'images/free-play/selector-right.png');
        game.load.audio('longTone1', 'audio/free-play/long-tone1.mp3');
        game.load.audio('longTone2', 'audio/free-play/long-tone2.mp3');
        game.load.audio('longTone3', 'audio/free-play/long-tone3.mp3');
        game.load.audio('longTone4', 'audio/free-play/long-tone4.mp3');
        game.load.audio('longTone5', 'audio/free-play/long-tone5.mp3');
        game.load.audio('shortTone1', 'audio/free-play/short-tone1.mp3');
        game.load.audio('shortTone2', 'audio/free-play/short-tone2.mp3');
        game.load.audio('shortTone3', 'audio/free-play/short-tone3.mp3');
        game.load.audio('shortTone4', 'audio/free-play/short-tone4.mp3');
        game.load.audio('shortTone5', 'audio/free-play/short-tone5.mp3');

        slickUI = game.plugins.add(Phaser.Plugin.SlickUI);
        slickUI.load('assets/slick-ui-master/themes/custom-theme/custom.json');
    },



    create: function () {
        //Add background and slider base
        game.add.image(0, -1, 'freeplayBG');

        //Instantiate buttons
        homeBtn = game.add.button(48, 30, 'homeBtn', actionOnClick1, this);
        homeBtn.alpha = 0.85;
        homeBtn.onInputOver.add(over, this);
        homeBtn.onInputOut.add(out, this);

        storyBtn = game.add.button(123, 30, 'storyBtn', actionOnClick2, this);
        storyBtn.alpha = 0.85;
        storyBtn.onInputOver.add(over, this);
        storyBtn.onInputOut.add(out, this);

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

        //Add phoneme selector
        var isLong = true;
        phoneme = game.add.image(530, 518, 'longA');
        selectorLeft = game.add.button(480, 550, 'selectorLeft', actionOnClick4, this);
        selectorLeft.alpha = 0.85;
        selectorLeft.onInputOver.add(over, this);
        selectorLeft.onInputOut.add(out, this);

        selectorRight = game.add.button(615, 550, 'selectorRight', actionOnClick4, this);
        selectorRight.alpha = 0.85;
        selectorRight.onInputOver.add(over, this);
        selectorRight.onInputOut.add(out, this);


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

        // Set notes as draggable
        wholeNote = game.add.sprite(57, 132, 'wholeNote');
        wholeNote.inputEnabled = 'true';
        wholeNote.input.enableDrag(true);
        wholeNote.events.onInputDown.add(inputDown);
        wholeNote.events.onInputUp.add(inputUp);

        halfNote = game.add.sprite(38, 233, 'halfNote');
        halfNote.inputEnabled = 'true';
        halfNote.input.enableDrag(true);
        halfNote.events.onInputDown.add(inputDown);
        halfNote.events.onInputUp.add(inputUp);

        quarterNote = game.add.sprite(38, 386, 'quarterNote');
        quarterNote.inputEnabled = 'true';
        quarterNote.input.enableDrag(true);
        quarterNote.events.onInputDown.add(inputDown);
        quarterNote.events.onInputUp.add(inputUp);

        //Populate new note on click
        var wholeCount = 0;
        var halfCount = 0;
        var quarterCount = 0;

        function inputDown(event) {
            if (event.previousPosition.x == 57 && event.previousPosition.y == 132) {
                var string = event.key.replace(/[0-9]/g, '');
                window[string + wholeCount] = game.add.sprite(57, 132, "wholeNote");
                if (volume != undefined) {
                    window[string + wholeCount].scale.setTo(volume + 0.5);
                }
                window[string + wholeCount].inputEnabled = 'true';
                window[string + wholeCount].input.enableDrag(true);
                window[string + wholeCount].events.onInputDown.add(inputDown);
                window[string + wholeCount].events.onInputUp.add(inputUp);
                wholeCount++;
            } else if (event.previousPosition.x == 38 && event.previousPosition.y == 233) {
                var string = event.key.replace(/[0-9]/g, '');
                window[string + halfCount] = game.add.sprite(38, 233, 'halfNote');
                if (volume != undefined) {
                    window[string + halfCount].scale.setTo(volume + 0.5);
                }
                window[string + halfCount].inputEnabled = 'true';
                window[string + halfCount].input.enableDrag(true);
                window[string + halfCount].events.onInputDown.add(inputDown);
                window[string + halfCount].events.onInputUp.add(inputUp);
                halfCount++;
            } else if (event.previousPosition.x == 38 && event.previousPosition.y == 386) {
                var string = event.key.replace(/[0-9]/g, '');
                window[string + quarterCount] = game.add.sprite(38, 386, 'quarterNote');
                if (volume != undefined) {
                    window[string + quarterCount].scale.setTo(volume + 0.5);
                }
                window[string + quarterCount].inputEnabled = 'true';
                window[string + quarterCount].input.enableDrag(true);
                window[string + quarterCount].events.onInputDown.add(inputDown);
                window[string + quarterCount].events.onInputUp.add(inputUp);      
                quarterCount++;
            }
        }

        function inputUp(event) {
            if (event.position.y < 100) {
                if (isLong) {
                    music = game.add.audio('longTone5');
                } else {
                    music = game.add.audio('shortTone5');
                }
            } else if (event.position.y > 100 && event.position.y < 200) {
                if (isLong) {
                    music = game.add.audio('longTone4');
                } else {
                    music = game.add.audio('shortTone4');
                }
            } else if (event.position.y > 200 && event.position.y < 300) {
                if (isLong) {
                    music = game.add.audio('longTone3');
                } else {
                    music = game.add.audio('shortTone3');
                }
            } else if (event.position.y > 300 && event.position.y < 400) {
                if (isLong) {
                    music = game.add.audio('longTone2');
                } else {
                    music = game.add.audio('shortTone2');
                }
            } else {
                if (isLong) {
                    music = game.add.audio('longTone1');
                } else {
                    music = game.add.audio('shortTone1');
                }
            }
            music.volume = (volume == undefined) ? 0.5 : volume;
            music.play();
        }

        //Instantiate slider
        game.add.image(370, 646, 'slider');
        slickUI.add(panel = new SlickUI.Element.Panel(370, 570, 722, 70));
        panel.add(slider = new SlickUI.Element.Slider(33, 90, panel.width - 68));

        //Set slider actions
        slider.onDrag.add(function (value) {
            if (wholeCount > 0) {
                eval('wholeNote' + (wholeCount - 1)).scale.setTo(value + 0.5);
            } else {
                wholeNote.scale.setTo(value + 0.5);
            }
            if (halfCount > 0) {
                eval('halfNote' + (halfCount - 1)).scale.setTo(value + 0.5);
            } else {
                halfNote.scale.setTo(value + 0.5);
            }
            if (quarterCount > 0) {
                eval('quarterNote' + (quarterCount - 1)).scale.setTo(value + 0.5);
            } else {
                quarterNote.scale.setTo(value + 0.5);
            }
        });

        slider.onDragStop.add(function (value) {
            if (value == 0) {
                value += 0.01;
            }
            volume = value;
        });

        //Bring elements aside from music notes to top
        game.world.bringToTop(selectorLeft);
        game.world.bringToTop(selectorRight);
        game.world.bringToTop(phoneme);
        game.world.bringToTop(homeBtn);
        game.world.bringToTop(storyBtn);
        game.world.bringToTop(playlistBtn);
        game.world.bringToTop(musicOn);
        game.world.bringToTop(musicOff);
    }
}
