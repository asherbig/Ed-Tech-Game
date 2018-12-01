DoMi.intro = function (game) {};

var homeBtn, freeplayBtn, playlistBtn, continueBtn, BtnBGM, noteFriend, shark, letterA, bubble, lessonAudio;
var timedEvent = 0;

DoMi.intro.prototype = {

    preload: function () {
        // Background
        game.load.image('introBG', 'images/intro/intro-BG.png');

        // Button images
        game.load.image('homeBtn', 'icons/home.png');
        game.load.image('freeplayBtn', 'icons/freeplay.png');
        game.load.image('playlistBtn', 'icons/playlist.png');
        game.load.image('musicOn', 'icons/toggle-on.png');
        game.load.image('musicOff', 'icons/toggle-off.png');
        game.load.image('continueBtn', 'icons/continue.png');

        // Character images
        game.load.image('sharkA', 'images/intro/shark-a.png');
        game.load.image('sharkB', 'images/intro/shark-b.png');
        game.load.image('sharkC', 'images/intro/shark-c.png');
        game.load.image('bubble1', 'images/intro/bubble1.png');
        game.load.image('bubble2', 'images/intro/bubble2.png');
        game.load.image('bubble3', 'images/intro/bubble3.png');
        game.load.image('wholenote-friend', 'images/intro/wholenote-friend.png');

        // Letter images
        game.load.image('bigA', 'images/intro/big-a.png');
        game.load.image('littleA', 'images/intro/little-a.png');
        game.load.image('shortA', 'images/intro/short-a.png');
        game.load.image('longA', 'images/intro/long-a.png');
        game.load.image('movingA', 'images/intro/moving-a.png');
        
        // Lesson ending image
        game.load.image('lessonEnd', 'images/intro/lesson-ending.png');

        // Introduction Audio
        game.load.audio('lesson1LetterA', 'audio/intro/This is the letter A.mp3');
        game.load.audio('lesson1BigA', 'audio/intro/This is a Big A.mp3');
        game.load.audio('lesson1LittleA', 'audio/intro/This is Little A.mp3');
        game.load.audio('lesson1TwoSounds', 'audio/intro/A can_2 sounds.mp3');
        game.load.audio('lesson1LetterALong', 'audio/intro/Long A sound lesson.mp3');
        game.load.audio('lesson1LetterALongEx', 'audio/intro/Long A Lesson_Ape.mp3');
        game.load.audio('lesson1LetterAShort', 'audio/intro/Short a sound lesson.mp3');
        game.load.audio('lesson1LetterAShortEx', 'audio/intro/Short a Lesson_apple.mp3');
        game.load.audio('lesson1LetterAlistenLow', 'audio/intro/Lesson_Getting Lower.mp3');
        game.load.audio('lesson1LetterAGoingLow', 'audio/intro/Lets Listen Lower.mp3');
        game.load.audio('lesson1LetterAListenHigh', 'audio/intro/Lesson_Getting Higher.mp3');
        game.load.audio('lesson1LetterAGoingHigh', 'audio/intro/Lets Listen Higher.mp3');
    },

    create: function () {
        // Background of level
        game.add.image(0, 0, 'introBG');

        // Instantiate buttons
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

        continueBtn = game.add.button(1179, 587, 'continueBtn', actionOnClick4, this);
        continueBtn.alpha = 0.85;
        continueBtn.onInputOver.add(over, this);
        continueBtn.onInputOut.add(out, this);

        if (BGM.isPlaying === true) {
            BtnBGM = game.add.button(1250, 40, 'musicOn', actionOnClick5, this);
        } else {
            BtnBGM = game.add.button(1250, 40, 'musicOff', actionOnClick5, this);
        }

        newBtnBGM();

        //Instantiate whole note friend
        noteFriend = game.add.sprite(100, 200, 'wholenote-friend');

        // Set button hover and click actions
        function over(event) {
            window[event.key].alpha = 1;
            document.body.style.cursor = "pointer";
        }

        function out(event) {
            window[event.key].alpha = 0.85;
            document.body.style.cursor = "default";
        }

        function actionOnClick1() {
            document.body.style.cursor = "default";
            for (i = 0; i < lessonAudio.length; i++) {
                lessonAudio[i].stop();
            }
            game.state.start('mainMenu')
        }

        function actionOnClick2() {
            document.body.style.cursor = "default";
            for (i = 0; i < lessonAudio.length; i++) {
                lessonAudio[i].stop();
            }
            game.state.start('freePlay');
        }

        function actionOnClick3() {
            document.body.style.cursor = "default";
        }

        function actionOnClick4() {
            document.body.style.cursor = "default";
            for (i = 0; i < lessonAudio.length; i++) {
                lessonAudio[i].stop();
            }
            game.state.start("story-mode-freePlay");
        }

        function newBtnBGM() {
            BtnBGM.alpha = .85
            BtnBGM.onInputOver.add(over1, this);
            BtnBGM.onInputOut.add(out1, this);
        }

        function over1() {
            BtnBGM.alpha = 1;
            document.body.style.cursor = "pointer";
        }

        function out1() {
            BtnBGM.alpha = 0.85;
            document.body.style.cursor = "default";
        }

        function actionOnClick5() {
            document.body.style.cursor = "default";
            if (BGM.isPlaying === true) {
                BtnBGM.destroy();
                BtnBGM = game.add.button(1250, 40, 'musicOff', actionOnClick5, this);
                newBtnBGM();
                BGM.pause();
            } else {
                BtnBGM.destroy();
                BtnBGM = game.add.button(1250, 40, 'musicOn', actionOnClick5, this);
                newBtnBGM();
                BGM.resume();
            }
        }

        // need to time things for the bubble pop

        lessonAudio = [game.add.audio('lesson1LetterA'),
            game.add.audio('lesson1BigA'),
            game.add.audio('lesson1LittleA'),
            game.add.audio('lesson1TwoSounds'),
            game.add.audio('lesson1LetterALong'),
            game.add.audio('lesson1LetterALongEx'),
            game.add.audio('lesson1LetterAShort'),
            game.add.audio('lesson1LetterAShortEx'),
            game.add.audio('lesson1LetterAlistenLow'),
            game.add.audio('lesson1LetterAGoingLow'),
            game.add.audio('lesson1LetterAListenHigh'),
            game.add.audio('lesson1LetterAGoingHigh')
            ];

        // Sequentially play lesson clips
        lessonAudio[0].onStop.addOnce(function () {
            lessonAudio[1].play();
        }, this);
        lessonAudio[1].onStop.addOnce(function () {
            lessonAudio[2].play();
        }, this);
        lessonAudio[2].onStop.addOnce(function () {
            lessonAudio[3].play();
        }, this);
        lessonAudio[3].onStop.addOnce(function () {
            lessonAudio[4].play();
        }, this);
        lessonAudio[4].onStop.addOnce(function () {
            lessonAudio[5].play();
        }, this);
        lessonAudio[5].onStop.addOnce(function () {
            lessonAudio[6].play();
        }, this);
        lessonAudio[6].onStop.addOnce(function () {
            lessonAudio[7].play();
        }, this);
        lessonAudio[7].onStop.addOnce(function () {
            lessonAudio[8].play();
        }, this);
        lessonAudio[8].onStop.addOnce(function () {
            lessonAudio[9].play();
        }, this);
        lessonAudio[9].onStop.addOnce(function () {
            lessonAudio[10].play();
        }, this);
        lessonAudio[10].onStop.addOnce(function () {
            lessonAudio[11].play();
        }, this);


        lessonAudio[0].play(); 

        // Initialize Letter A
        letterA = [game.add.sprite(700, 230, 'bigA'),
        game.add.sprite(700, 230, 'littleA'),
        game.add.sprite(700, 230, 'longA'),
        game.add.sprite(700, 230, 'shortA'),
        game.add.sprite(780, 150, 'movingA')];
        letterA[1].visible = false;
        letterA[2].visible = false;
        letterA[3].visible = false;
        letterA[4].visible = false;
        game.physics.enable(letterA[4], Phaser.Physics.ARCADE);

        // start timed sequences
        game.time.events.add(16600, updateLetter, this);
        game.time.events.add(28500, updateLetter, this);
        game.time.events.add(69000, updateLetter, this);
        game.time.events.add(110500, updateLetter, this);
        game.time.events.add(130000, updateLetter, this);
        game.time.events.add(146000, updateLetter, this);
        game.time.events.add(168000, updateLetter, this);
        game.time.events.add(184000, updateLetter, this);
        game.time.events.add(186000, updateLetter, this)

        function updateLetter(eventNum) {
            console.log(timedEvent);
            switch (timedEvent) {
                case 0:
                    letterA[0].visible = false;
                    letterA[1].visible = true;
                    break;
                case 1:
                    letterA[1].visible = false;
                    letterA[2].visible = true;
                    break;
                case 2:
                    letterA[2].visible = false;
                    letterA[3].visible = true;
                    break;
                case 3:
                    letterA[3].visible = false;
                    letterA[4].visible = true;
                    break;
                case 4:
                    letterA[4].body.velocity.y = 22;
                    break;
                case 5:
                    letterA[4].body.velocity.y = 0;
                    break;
                case 6:
                    letterA[4].body.velocity.y = -22;
                    break;
                case 7:
                    letterA[4].body.velocity.y = 0;
                    break;
                case 8:
                    letterA[4].visible = false;
                    game.add.image(350, 120, 'lessonEnd');  
            }

            timedEvent = timedEvent + 1;

        }
    }
}
