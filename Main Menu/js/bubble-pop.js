DoMi.bubblePop = function (game) {};

var width = 1366;
var height = 768;
var homeBtn, freeplayBtn, playlistBtn, musicBtn, continueBtn, homeBtn2, noteFriend;
var levelFinished;
var volume;
var shark;
var bubbles = [];
var targetLetter = '';
var numRight = 0;
var yayOptions = ['amazing', 'fantastic', 'great-job', 'incredible', 'very-good'];
var oopsOptions = ['oops', 'try-again', 'uh-oh'];

//def move this to a csv that reads in the lessons
//but for now, here are the lessons lol yay
var instructions = ['find-big-a', 'find-high', 'find-little-a', 'find-long-a', 'find-low', 'find-short-a'];

DoMi.bubblePop.prototype = {

        preload: function () {

            game.load.image('homeBtn', 'icons/home.png');
            game.load.image('freeplayBtn', 'icons/freeplay.png');
            game.load.image('playlistBtn', 'icons/playlist.png');
            game.load.image('musicOn', 'icons/toggle-on.png');
            game.load.image('musicOff', 'icons/toggle-off.png');
            game.load.image('continueBtn', 'icons/continue.png');
            game.load.image('freeplayBG', 'images/bubble-pop/freeplay-BG.png');
            game.load.image('shark', 'images/bubble-pop/nice-shark.png');
            game.load.image('La', 'images/bubble-pop/long-a.png');
            game.load.image('Sa', 'images/bubble-pop/short-a.png');
            game.load.image('A', 'images/bubble-pop/A.png');
            game.load.image('B', 'images/bubble-pop/B.png');
            game.load.image('C', 'images/bubble-pop/C.png');
            game.load.image('D', 'images/bubble-pop/D.png');
            game.load.image('E', 'images/bubble-pop/E.png');
            game.load.image('f', 'images/bubble-pop/f.png');
            game.load.image('c', 'images/bubble-pop/c-lowercase.png');
            game.load.image('n', 'images/bubble-pop/n.png');
            game.load.image('s', 'images/bubble-pop/s.png');
            game.load.image('h', 'images/bubble-pop/h.png');
            game.load.image('i', 'images/bubble-pop/i.png');
            game.load.image('v', 'images/bubble-pop/v.png');
            game.load.image('x', 'images/bubble-pop/x.png');
            game.load.image('k', 'images/bubble-pop/k.png');
            game.load.image('e', 'images/bubble-pop/e-lowercase.png');
            game.load.image('great-job-title', 'images/bubble-pop/great-job.png');
            game.load.image('continue', 'images/bubble-pop/continue.png');
            game.load.image('note-friend', 'images/bubble-pop/notefriend.png');
            game.load.image('homeBtn2', 'icons/home-bigger.png');

            game.load.spritesheet('bubblePop', 'images/bubble-pop/short-pop-sheet.png', 394, 380);
            
            game.load.audio('longTone1', 'audio/bubble-pop/long-tone1.mp3'); //low
            game.load.audio('longTone2', 'audio/bubble-pop/long-tone2.mp3');
            game.load.audio('longTone3', 'audio/bubble-pop/long-tone3.mp3');
            game.load.audio('longTone4', 'audio/bubble-pop/long-tone4.mp3');
            game.load.audio('longTone5', 'audio/bubble-pop/long-tone5.mp3'); //high
            game.load.audio('shortTone1', 'audio/bubble-pop/short-tone1.mp3'); //low
            game.load.audio('shortTone2', 'audio/bubble-pop/short-tone2.mp3');
            game.load.audio('shortTone3', 'audio/bubble-pop/short-tone3.mp3');
            game.load.audio('shortTone4', 'audio/bubble-pop/short-tone4.mp3');
            game.load.audio('shortTone5', 'audio/bubble-pop/short-tone5.mp3'); //high
            game.load.audio('find-big-a', 'audio/bubble-pop/prompt/find-big-a.mp3');
            game.load.audio('find-high', 'audio/bubble-pop/prompt/find-high.mp3');
            game.load.audio('find-little-a', 'audio/bubble-pop/prompt/find-little-a.mp3');
            game.load.audio('find-long-a', 'audio/bubble-pop/prompt/find-long-a.mp3');
            game.load.audio('find-low', 'audio/bubble-pop/prompt/find-low.mp3');
            game.load.audio('find-short-a', 'audio/bubble-pop/prompt/find-short-a.mp3');
            game.load.audio('amazing', 'audio/bubble-pop/support/amazing.mp3');
            game.load.audio('fantastic', 'audio/bubble-pop/support/fantastic.mp3');
            game.load.audio('great-job', 'audio/bubble-pop/support/great-job.mp3');
            game.load.audio('incredible', 'audio/bubble-pop/support/incredible.mp3');
            game.load.audio('very-good', 'audio/bubble-pop/support/very-good.mp3');
            game.load.audio('oops', 'audio/bubble-pop/support/oops.mp3');
            game.load.audio('try-again', 'audio/bubble-pop/support/try-again.mp3');
            game.load.audio('uh-oh', 'audio/bubble-pop/support/uh-oh.mp3');

        },


        create: function () {
            //Set background
            game.add.image(0, -1, 'freeplayBG');

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

            if (musicSetting === true) {
                BGM.play();
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

            noteFriend = game.add.button(49, 380, 'note-friend', actionClickFriend, this);

            //Set shark and make draggable
            shark = game.add.sprite(100, 200, 'shark');
            shark.inputEnabled = 'true';
            shark.input.enableDrag(true);

            game.physics.enable(shark, Phaser.Physics.ARCADE);
            //change the collision box to not be so weird
            //only the head of the shark will pop bubbles
            shark.body.setSize(66, 55, 162, 3);

            loadNextLesson();
            //showExitScreen();

        },

        update: function () {

            for (let i in bubbles) {
                game.physics.arcade.collide(shark, bubbles[i], popHandler, null, this);
            }

        }
}

        function getBubbleScale(yPos) {
            return yPos / 768;
        }

        function getLetterScale(yPos) {
            return yPos / 300;
        }

        function popHandler(shark, bubble) {
            //only pop the bubble if it's the right letter
            if (bubble.letter === targetLetter) {
                //play a sound for correct bubble
                levelFinished = true;
                playBubbleSound(bubble.y, bubble.letter);
                numRight++;
                resetShark();
                clearBubbles(2000);
                loadNextLesson(3500);
                playPraise(2250);
                bubble.animations.play('pop', 10, false, true);
                for (let i in bubbles) {
                    if (bubbles[i] === bubble) {
                        bubbles.splice(i, 1);
                    }
                }
            } else if (!levelFinished) {
                playOops(0);
                bubble.animations.play('pop', 10, false, true);
                for (let i in bubbles) {
                    if (bubbles[i] === bubble) {
                        bubbles.splice(i, 1);
                    }
                }
            }

        }

        //generates 5 bubbles with the specified letters.
        //the FIRST letter in the array is the TARGET letter
        //the last parameter is the optional height of the target ("high" or "low")
        //useful for if the target bubble needs to be high or low
        //don't place bubbles above y = 400 with x > 940
        function generate5Bubbles(letterArray, yHeight = "none") {
            //min y = 100
            //max y = 500
            //max x = 1100
            //min x = 450
            if (!letterArray || letterArray.length < 5) {
                throw "Error: Array length under 5 given to generate5Bubbles!";
                return;
            }
            targetLetter = letterArray[0];
            let targY = -1;
            let ys = [];
            if (yHeight === "none") {
                ys = [100, 200, 300, 400, 500];
            } else if (yHeight === "high") {
                //make the target the only high bubble
                targY = 100;
                ys = [100, 300, 350, 400, 500];
            } else {
                //make the target the only low bubble
                targY = 500;
                ys = [500, 100, 150, 200, 250];
            }
            if (targY === -1) {
                targY = rand(1, 6) * 100;
            }
            //shuffles the array and makes sure the target Y is the 0th index
            ys = swapToFront(targY, shuffle(ys));
            let xs = [];
            for (let i = 0; i < 5; i++) {
                xs.push(rand(450, 1100));
            }
            for (let i = 0; i < 5; i++) {
                bubbles.push(makeBubble(xs[i], ys[i], letterArray[i]));
            }

        }

        function makeBubble(x, y, letterPicName) {
            let cScale = getLetterScale(y);
            let bScale = getBubbleScale(y);
            let bubble = game.add.sprite(x, y, 'bubblePop');
            bubble.inputEnabled = 'true';
            bubble.animations.add('pop');
            bubble.scale.setTo(bScale);
            bubble.myX = x;
            bubble.myY = y;
            bubble.letter = letterPicName;
            //need to change to work with dynamically sized character
            let child = bubble.addChild(game.make.sprite(197 - 70, 190 - 80, letterPicName));
            child.scale.setTo(1 / bScale * cScale);
            game.physics.enable(bubble, Phaser.Physics.ARCADE);
            return bubble;
        }

        function playBubbleSound(y, letter) {
            let music;
            let isLong = true;
            if (letter === 'Sa') {
                isLong = false;
            }
            if (y <= 100) {
                if (isLong) {
                    music = game.add.audio('longTone5');
                } else {
                    music = game.add.audio('shortTone5');
                }
            } else if (y > 100 && y <= 200) {
                if (isLong) {
                    music = game.add.audio('longTone4');
                } else {
                    music = game.add.audio('shortTone4');
                }
            } else if (y > 200 && y <= 300) {
                if (isLong) {
                    music = game.add.audio('longTone3');
                } else {
                    music = game.add.audio('shortTone3');
                }
            } else if (y > 300 && y <= 400) {
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

        function playPraise(delay) {
            setTimeout(function () {
                let i = rand(0, 5);
                let music = game.add.audio(yayOptions[i]);
                music.volume = (volume == undefined) ? 0.5 : volume;
                music.play();
            }, delay);
        }

        function playOops(delay) {
            setTimeout(function () {
                let i = rand(0, 3);
                let music = game.add.audio(oopsOptions[i]);
                music.volume = (volume == undefined) ? 0.5 : volume;
                music.play();
            }, delay);
        }

        function playLessonAudio(i) {
            if (i === 6) {
                return;
            }
            let music = game.add.audio(instructions[i]);
            music.volume = (volume == undefined) ? 0.5 : volume;
            music.play();
        }

        function clearBubbles(delay) {
            setTimeout(function () {
                for (i in bubbles) {
                    bubbles[i].animations.play('pop', 10, false, true);
                }
                bubbles = [];
            }, delay)
        }

        function resetShark() {
            shark.input.disableDrag();
            game.physics.arcade.moveToXY(shark, 100, 300, 2, 1000);
            setTimeout(function () {
                shark.body.velocity.x = 0;
                shark.body.velocity.y = 0;
                shark.input.enableDrag();
            }, 1000);
        }

        //should populate the params for these function calls via csv in the future
        function loadNextLesson(delay) {
            setTimeout(function () {
                if (game.state.current !== 'bubblePop') {
                    return;
                }
                if (numRight === 0) {
                    generate5Bubbles(['A', 'B', 'C', 'D', 'E']);
                } else if (numRight === 1) {
                    generate5Bubbles(['La', 'f', 'c', 'n', 's'], "high");
                } else if (numRight === 2) {
                    generate5Bubbles(['Sa', 'h', 'i', 'v', 'x']);
                } else if (numRight === 3) {
                    generate5Bubbles(['La', 'k', 'n', 'i', 'e']);
                } else if (numRight === 4) {
                    generate5Bubbles(['La', 'x', 'E', 'i', 'e'], "low");
                } else if (numRight === 5) {
                    generate5Bubbles(['Sa', 'k', 'f', 'n', 'e']);
                } else if (numRight === 6) {
                    showExitScreen();
                }
                playLessonAudio(numRight);
                levelFinished = false;
            }, delay);
        }

        function showExitScreen() {
            let victory = game.add.sprite(1366 / 2 - 639 / 2, 768 / 2 - 100, 'great-job-title');
            let big = game.add.sprite(1366 / 2 - 540 / 2, 768 / 2 + 150, 'continue');
            homeBtn2 = game.add.button(width/2 - 100, height/2, 'homeBtn2', actionOnClick1, this);
            homeBtn2.alpha = 0.85;
            homeBtn2.onInputOver.add(over, this);
            homeBtn2.onInputOut.add(out, this);
        }
 
        //buttons navigation
        function actionOnClick1() {
            game.state.start('mainMenu');
        }

        function actionOnClick2() {

            game.state.start('freePlay');
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
            console.log("To Be Continued...")
        }

        function actionClickFriend() {
            playLessonAudio(numRight);
        }

        //Set button hover and click actions
        function over(event) {
            console.log(event);
            console.log(window);
            window[event.key].alpha = 1;
            document.body.style.cursor = "pointer";
        }

        function out(event) {
            window[event.key].alpha = 0.85;
            document.body.style.cursor = "default";
        }

        //exclusive random number [num1, num2)
        function rand(num1, num2) {
            return Math.floor(Math.random() * (num2 - num1)) + num1;
        }

        function shuffle(array) {
            var currentIndex = array.length,
                temporaryValue, randomIndex;

            // While there remain elements to shuffle...
            while (0 !== currentIndex) {

                // Pick a remaining element...
                randomIndex = Math.floor(Math.random() * currentIndex);
                currentIndex -= 1;

                // And swap it with the current element.
                temporaryValue = array[currentIndex];
                array[currentIndex] = array[randomIndex];
                array[randomIndex] = temporaryValue;
            }

            return array;
        }
        //swaps the input number to the front of the array
        function swapToFront(num, array) {
            for (let i in array) {
                if (array[i] === num) {
                    let temp = array[0];
                    array[0] = array[i];
                    array[i] = temp;
                }
            }
            return array;
        }
