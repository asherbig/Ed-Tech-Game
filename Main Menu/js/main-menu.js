var DoMi = {};

var Btn1, Btn2, Btn3, BtnBGM, BGM, bootMusic = true;

DoMi.mainMenu = function (game) {};

DoMi.mainMenu.prototype = {

    preload: function () {
        game.load.image('logo', "images/main-menu/Title.png");
        game.load.image('storyMode', 'images/main-menu/button1.png');
        game.load.image('freePlay', 'images/main-menu/button2.png');
        game.load.image('playlist', 'images/main-menu/button3.png');
        game.load.image('musicOn', 'images/main-menu/toggle-on.png');
        game.load.image('musicOff', 'images/main-menu/toggle-off.png');
        game.load.image('menuBG', 'images/main-menu/Menu-BG.jpg');
        game.load.audio('BGM', 'audio/main-menu/BGM.mp3')
    },


    create: function () {
        game.add.image(0, -100, 'menuBG');
        game.add.image(250, 60, "logo");
        

        Btn1 = game.add.button(66, 360, 'storyMode', actionOnClick1, this);

        Btn1.alpha = .85
        Btn1.onInputOver.add(over1, this);
        Btn1.onInputOut.add(out1, this);

        function over1() {
            Btn1.alpha = 1;
            document.body.style.cursor = "pointer";
        }

        function out1() {
            Btn1.alpha = 0.85;
            document.body.style.cursor = "default";
        }

        function actionOnClick1() {
            console.log("click")
        }

        Btn2 = game.add.button(466, 360, 'freePlay', actionOnClick2, this);

        Btn2.alpha = .85
        Btn2.onInputOver.add(over2, this);
        Btn2.onInputOut.add(out2, this);

        function over2() {
            Btn2.alpha = 1;
            document.body.style.cursor = "pointer";
        }

        function out2() {
            Btn2.alpha = 0.85;
            document.body.style.cursor = "default";
        }

        function actionOnClick2() {
            game.state.start('freePlay')
        }

        Btn3 = game.add.button(866, 360, 'playlist', actionOnClick3, this);

        Btn3.alpha = .85
        Btn3.onInputOver.add(over3, this);
        Btn3.onInputOut.add(out3, this);

        function over3() {
            Btn3.alpha = 1;
            document.body.style.cursor = "pointer";
        }

        function out3() {
            Btn3.alpha = 0.85;
            document.body.style.cursor = "default";
        }

        function actionOnClick3() {
            console.log("click")
        }

        if (bootMusic === true) {
        BGM = game.add.audio("BGM");
        BGM.loop = true;
        BGM.play();
        BGM.volume = 0.6;
        bootMusic = false;
        BtnBGM = game.add.button(1250, 40, 'musicOn', actionOnClick4, this);   
        } else if (BGM.isPlaying === true ) {
            BtnBGM = game.add.button(1250, 40, 'musicOn', actionOnClick4, this);
            
        } else {
            BtnBGM = game.add.button(1250, 40, 'musicOff', actionOnClick4, this);
        }
        
        
        

        function newBtnBGM() {
            BtnBGM.alpha = .85
            BtnBGM.onInputOver.add(over4, this);
            BtnBGM.onInputOut.add(out4, this);
        }

        function over4() {
            BtnBGM.alpha = 1;
            document.body.style.cursor = "pointer";
        }

        function out4() {
            BtnBGM.alpha = 0.85;
            document.body.style.cursor = "default";
        }

        newBtnBGM();

        function actionOnClick4() {
            if (BGM.isPlaying === true) {
                BtnBGM.destroy();
                BtnBGM = game.add.button(1250, 40, 'musicOff', actionOnClick4, this);
                newBtnBGM();
                BGM.pause();
                playing = false;
            } else {
                BtnBGM.destroy();
                BtnBGM = game.add.button(1250, 40, 'musicOn', actionOnClick4, this);
                newBtnBGM();
                BGM.resume();
            }



        }

    }

}
