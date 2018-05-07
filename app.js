var game = new Phaser.Game(window.innerWidth, window.innerHeight, Phaser.CANVAS, 'phaser-example', {
    preload: preload,
    create: create,
    update: update,
    render: render
});

var joystick = new VirtualJoystick({
    mouseSupport	: true,
    stationaryBase	: true,
    baseX		: 280,
    baseY		: 550
});

function preload() {
    game.load.image('background', './assets/1920x1080_Grid.png');
    game.load.spritesheet('player_walk', './assets/Dog Walk Sprite Sheet547x481.png', 547, 481, 10);
    game.load.spritesheet('player_idle', './assets/Dog Idle Sprite Sheet547x481.png', 547, 481, 10);
    game.load.tilemap('map', './waterFight2_Grass.csv', null, Phaser.Tilemap.CSV);
    game.load.tilemap('map2', './waterFight2_Water and Stone.csv', null, Phaser.Tilemap.CSV);
    game.load.tilemap('map3', './waterFight2_Path.csv', null, Phaser.Tilemap.CSV);
    game.load.tilemap('map4', './waterFight2_Items.csv', null, Phaser.Tilemap.CSV);
    game.load.tilemap('map5', './waterFight2_Cave thing.csv', null, Phaser.Tilemap.CSV);
    game.load.image('1', './assets/1.png');
    game.load.image('atlas', './assets/base_out_atlas.png');
    game.load.image('BGMbutton','./assets/button_music.png');
    game.load.audio('BGMtest','./assets/Theodore Kuchar - Dmitri Shostakovich Suitefor Jazz Orchestra No.2-7. Waltz No.2.mp3')
}

var player;
var cursors;

var bgm;
var bgmButtonON = false;

function create() {
    var button = game.add.button(300, 300, 'BGMbutton', musicOnOff, this);
    bgm = game.add.audio('BGMtest');
    
    if(bgmButtonON){
        bgm.play();
    }

    game.scale.scaleMode = Phaser.ScaleManager.USER_SCALE;
    game.scale.forceLandscape = true;

    // var map = game.add.tileSprite(0, 0, 1920, 1920, 'background');

    //to set map scale user [layer name].setScale(x, x);

    var map = game.add.tilemap('map', 16, 16);
    map.addTilesetImage('1');
    var layer1 = map.createLayer(0);
    layer1.resizeWorld();

    var map2 = game.add.tilemap('map2', 16, 16);
    map2.addTilesetImage('1');
    var layer2 = map2.createLayer(0);
    layer2.resizeWorld();

    var map3 = game.add.tilemap('map3', 16, 16);
    map3.addTilesetImage('1');
    var layer3 = map3.createLayer(0);
    layer3.resizeWorld();

    var map5 = game.add.tilemap('map5', 16, 16);
    map5.addTilesetImage('atlas');
    var layer5 = map5.createLayer(0);
    layer5.resizeWorld();
    
    var map4 = game.add.tilemap('map4', 16, 16);
    map4.addTilesetImage('atlas');
    var layer4 = map4.createLayer(0);
    layer4.resizeWorld();

    game.world.setBounds(0, 0, 1952, 1952);
    game.physics.startSystem(Phaser.Physics.P2JS);

    player = new Dog(game, game.world.centerX, game.world.centerY);

    cursors = game.input.keyboard.createCursorKeys();
    game.camera.follow(player, Phaser.Camera.FOLLOW_TOPDOWN_TIGHT, 0.08, 0.08);
}

function update() {
    player.body.setZeroVelocity();
    player.isWalking = false;

    if( joystick.right() ){
        player.moveRight();
        //player.position.x = player.position.x + 60;
    } else if( joystick.left() ){
        player.moveLeft();
        //player.position.x = player.position.x - 60 * frameTime;
    } else if( joystick.up() ){
        player.moveUp();
        //player.position.y = player.position.y + 60 * frameTime;
    } else if( joystick.down() ){
        player.moveDown();
        //player.position.y = player.position.y - 60 * frameTime;
    }

    if (cursors.up.isDown) {
        player.moveUp();
    } else if (cursors.down.isDown) {
        player.moveDown();
    } else if (cursors.left.isDown) {
        player.moveLeft();
    } else if (cursors.right.isDown) {
        player.moveRight();
    }

    if (cursors.up.downDuration(1)) {
        player.playWalkAnimation();
    } else if (cursors.down.downDuration(1)) {
        player.playWalkAnimation();
    } else if (cursors.left.downDuration(1)) {
        player.playWalkAnimation();
    } else if (cursors.right.downDuration(1)) {
        player.playWalkAnimation();
    }

    if (player.isWalking === false && !player.isIdle) {
        player.playIdleAnimation();
    }
}

function render() {
    game.debug.spriteInfo(player, 32, 32);
}


function musicOnOff() {
    if(bgmButtonON){
        bgmButtonON = false;
    } else{
        bgmButtonON = true;
    }
    
}

function fullscreen() {
    game.scale.fullScreenScaleMode = Phaser.ScaleManager.SHOW_ALL;
    game.scale.startFullScreen();
}