var game = new Phaser.Game(window.innerWidth, window.innerHeight, Phaser.AUTO, 'test', {
    preload: preload,
    create: create,
    update: update,
    render: render
}, false, false);

// var mt = new MobileTester();
// if (mt.isMobile()) {
//     alert("mobile");
// }

function preload() {
    game.load.spritesheet('dog_walk', './assets/spritesheets/Dog Walk.png', 547, 481, 10);
    game.load.spritesheet('dog_idle', './assets/spritesheets/Dog Idle.png', 547, 481, 10);
    game.load.spritesheet('cat_front', './assets/spritesheets/cat_front.png', 32, 32, 3);
    game.load.spritesheet('cat_side', './assets/spritesheets/cat_side.png', 32, 32, 3);

    game.load.physics('dog_physics_right', './assets/physics/dog_physics.json');
    game.load.physics('dog_physics_left', './assets/physics/dog_physics.json');

    game.load.tilemap('lake_bounds', './assets/tilemaps/lake_bounds.json', null, Phaser.Tilemap.TILED_JSON);
    game.load.tilemap('bounds', './assets/tilemaps/bounds.json', null, Phaser.Tilemap.TILED_JSON);

    game.load.tilemap('Cliffs(C)', './assets/tilemaps/map_Cliffs(C) - 7.csv', null, Phaser.Tilemap.CSV);
    game.load.tilemap('Cystal Hideen(NC)', './assets/tilemaps/map_Crystal Hidden(NC) - 8.csv', null, Phaser.Tilemap.CSV);
    game.load.tilemap('Detail Over(NC)', './assets/tilemaps/map_Detail Over(NC) - 3.csv', null, Phaser.Tilemap.CSV);
    game.load.tilemap('Detail Under(NC)', './assets/tilemaps/map_Detail Under(NC) - 3.csv', null, Phaser.Tilemap.CSV);
    game.load.tilemap('Detail(NC)', './assets/tilemaps/map_Detail(NC) - 3.csv', null, Phaser.Tilemap.CSV);
    game.load.tilemap('Dirt Areas(NC)', './assets/tilemaps/map_Dirt Areas(NC) - 1.csv', null, Phaser.Tilemap.CSV);
    game.load.tilemap('Dirt Grass Cover (NC)', './assets/tilemaps/map_Dirt Grass Cover (NC) - 1.csv', null, Phaser.Tilemap.CSV);
    game.load.tilemap('Grass(NC)', './assets/tilemaps/map_Grass(NC) - 1.csv', null, Phaser.Tilemap.CSV);
    game.load.tilemap('Lake(C)', './assets/tilemaps/map_Lake(C) - 1.csv', null, Phaser.Tilemap.CSV);

    game.load.image('1', './assets/tilesets/1.png');
    game.load.image('3', './assets/tilesets/3.png');
    game.load.image('7', './assets/tilesets/7.png');
    game.load.image('8', './assets/tilesets/8.png');

    game.load.image('BGMbutton','./assets/button/button_music.png');
    game.load.audio('BGMtest','./assets/audio/Theodore Kuchar - Dmitri Shostakovich Suitefor Jazz Orchestra No.2-7. Waltz No.2.mp3')

}

var dog;
var cat;
var spriteGroup;
var runFaster = false;
var map;
var mapSprite;
var bgm;
var bgmButtonON = true;

var joystick = new VirtualJoystick({
    mouseSupport	: true,
    stationaryBase	: true,
    baseX		: 280,
    baseY		: 550
});

function createMap() {
    map = new Multimap(game);
    map.addTilemap('Grass(NC)', 16, 16, '1', true);
    map.addTilemap('Dirt Areas(NC)', 16, 16, '1', true);
    map.addTilemap('Dirt Grass Cover (NC)', 16, 16, '1', true);
    map.addTilemap('Lake(C)', 16, 16, '1', true);
    map.addTilemap('Cliffs(C)', 16, 16, '7', true);
    map.addTilemap('Detail Under(NC)', 16, 16, '3', true);
    map.addTilemap('Detail(NC)', 16, 16, '3', true);
    map.addTilemap('Detail Over(NC)', 16, 16, '3', true);
    map.addTilemap('Cystal Hideen(NC)', 16, 16, '8', true);

    map.addCollisionMap('bounds');
    map.addCollisionMapLayer('Lake Bounds', 'Cliff Bounds');

    // map.setCollisionBetween('Lake(C)', 180, 470);
    // map.setCollisionBetween('Cliffs(C)', 0, 416);
}

function create() {
    //var button = game.add.button(300, 300, 'BGMbutton', musicOnOff, this);
    bgm = game.add.audio('BGMtest');
    
    if(bgmButtonON){
        bgm.play();
    }

    game.plugins.add(Phaser.Plugin.AdvancedTiming);
    // game.scale.forceOrientation(true, false);
    // game.scale.enterIncorrectOrientation.add(handleIncorrect);

    game.physics.startSystem(Phaser.Physics.P2JS);

    createMap();

    spriteGroup = game.add.group();

    dog = new Dog(game, game.world.centerX, game.world.centerY);
    game.physics.p2.enable(dog, true);
    dog.body.fixedRotation = true;

    let pr = new PhysicsResize(game);
    pr.resizePolygon('dog_physics_right', 'dog_physics_right_scaled', 'Right', dog.scaling);
    pr.resizePolygon('dog_physics_left', 'dog_physics_left_scaled', 'Left', dog.scaling);
    dog.body.clearShapes();
    dog.body.loadPolygon('dog_physics_right_scaled', 'Right');

    cat = new Cat(game, game.world.centerX - 200, game.world.centerY);
    game.physics.p2.enable(cat, true);
    cat.body.fixedRotation = true;

    spriteGroup.add(dog);
    spriteGroup.add(cat);
    spriteGroup.sort();

    game.world.setBounds(0, 0, 16 * 200, 16 * 200);
    game.physics.p2.setBoundsToWorld(true, true, true, true, false);

    cursors = game.input.keyboard.createCursorKeys();
    game.camera.follow(dog, Phaser.Camera.FOLLOW_LOCKON, 0.08, 0.08);
}

function update() {
    dog.body.setZeroVelocity();
    // cat.body.setZeroVelocity();

    //mobile side controller
    if( joystick.right() ){
        dog.moveRight();
        //player.position.x = player.position.x + 60;
    } else if( joystick.left() ){
        dog.moveLeft();
        //player.position.x = player.position.x - 60 * frameTime;
    } else if( joystick.up() ){
        dog.moveUp();
        //player.position.y = player.position.y + 60 * frameTime;
    } else if( joystick.down() ){
        dog.moveDown();
        //player.position.y = player.position.y - 60 * frameTime;
    }


    //pc side controller
    if (cursors.up.isDown) {
        dog.moveUp();
    } else if (cursors.down.isDown) {
        dog.moveDown();
    } else if (cursors.left.isDown) {
        dog.moveLeft();
    } else if (cursors.right.isDown) {
        dog.moveRight();
    }

    if (cursors.up.downDuration(1)) {
        dog.playWalkAnimation();
    } else if (cursors.down.downDuration(1)) {
        dog.playWalkAnimation();
    } else if (cursors.left.downDuration(1)) {
        dog.playWalkAnimation();
    } else if (cursors.right.downDuration(1)) {
        dog.playWalkAnimation();
    }

    if (dog.isWalking === false && !dog.isIdle) {
        dog.playIdleAnimation();
    }

    let a = new Phaser.Point(dog.x, dog.y);
    let b = new Phaser.Point(cat.x, cat.y);

    if (a.distance(b) > 250) {
        cat.seek(dog, 50, 299); 
    } else {
        cat.body.setZeroVelocity();
        cat.velocity.x = 0;
        cat.velocity.y = 0;
    }
    // if (a.distance(b) < 100) {
    //     cat.flee(dog, 100, 500);
    //     runFaster = true;
    // } else if (a.distance(b) < 200 && runFaster) {
    //     cat.flee(dog, 100, 500);
    // } else {
    //     cat.wander(100, 100, dog, 100);
    //     if (runFaster) {
    //         cat.generateNewTarget();
    //     }
    //     runFaster = false;
    // }

    spriteGroup.sort('y', Phaser.Group.SORT_ASCENDING);
}

function render() {
    game.debug.spriteInfo(dog, 32, 32);
    game.debug.gameInfo(32, 150);
}

function handleIncorrect() {
    alert("wrong orientation");
}

function musicOnOff() {
    if(bgmButtonON){
        bgmButtonON = false;
    } else{
        bgmButtonON = true;
    }
}

window.addEventListener('resize', function (event) {
    console.log("resized");
});
