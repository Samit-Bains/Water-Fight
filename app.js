var game = new Phaser.Game(window.innerWidth, window.innerHeight, Phaser.CANVAS, 'phaser-example', {
    preload: preload,
    create: create,
    update: update,
    render: render
});

function preload() {
    game.load.image('background', './assets/1920x1080_Grid.png');
    game.load.spritesheet('player_walk', './assets/Dog Walk Sprite Sheet547x481.png', 547, 481, 10);
    game.load.spritesheet('player_idle', './assets/Dog Idle Sprite Sheet547x481.png', 547, 481, 10);
}

var player;
var cursors;
var sm;

var playerScaling = 0.3;

var isWalking = false;
var isIdle = true;
var walkSpeed = 20;
var idleSpeed = 7;
var movementSpeed = 300;

function create() {
    game.scale.scaleMode = Phaser.ScaleManager.USER_SCALE;
    game.scale.forceLandscape = true;

    game.add.tileSprite(0, 0, 1920, 1920, 'background');
    game.world.setBounds(0, 0, 1920, 1920);
    game.physics.startSystem(Phaser.Physics.P2JS);
    player = game.add.sprite(game.world.centerX, game.world.centerY, 'player_idle');

    player.animations.add('idle');
    player.animations.play('idle', idleSpeed, true);

    player.scale.x = playerScaling;
    player.scale.y = playerScaling;

    game.physics.p2.enable(player);
    cursors = game.input.keyboard.createCursorKeys();
    game.camera.follow(player, Phaser.Camera.FOLLOW_TOPDOWN_TIGHT, 0.08, 0.08);
}

function update() {
    player.body.setZeroVelocity();
    
    //make sure that the sprite does not rotate from hitting walls
    player.body.angle = 0;

    isWalking = false;

    if (cursors.up.isDown) {
        player.body.moveUp(movementSpeed);
        isWalking = true;
        isIdle = false;
    } else if (cursors.down.isDown) {
        isWalking = true;
        isIdle = false;
        player.body.moveDown(movementSpeed);
    }

    if (cursors.left.isDown) {
        player.body.moveLeft(movementSpeed);
        player.scale.x = -playerScaling;
        isWalking = true;
        isIdle = false;
    } else if (cursors.right.isDown) {
        player.body.moveRight(movementSpeed);
        player.scale.x = playerScaling;
        isWalking = true;
        isIdle = false;
    }

    if (cursors.up.downDuration(1)) {
        loadWalkTexture();
        player.animations.play('walk', walkSpeed, true);
    } else if (cursors.down.downDuration(1)) {
        loadWalkTexture();
        player.animations.play('walk', walkSpeed, true);
    }

    if (cursors.left.downDuration(1)) {
        loadWalkTexture();
        player.animations.play('walk', walkSpeed, true);
    } else if (cursors.right.downDuration(1)) {
        loadWalkTexture();
        player.animations.play('walk', walkSpeed, true);
    }

    if (isWalking === false && !isIdle) {
        isIdle = true;
        loadIdleTexture();
        player.animations.play('idle', idleSpeed, true);
    }
}

function render() {
    game.debug.spriteInfo(player, 32, 32);
}

function loadWalkTexture() {
    player.loadTexture('player_walk', 0);
    player.animations.add('walk');
}

function loadIdleTexture() {
    player.loadTexture('player_idle', 0);
    player.animations.add('idle');
}
