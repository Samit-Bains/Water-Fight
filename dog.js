class Dog extends Phaser.Sprite {
    constructor(game, x, y) {
        super(game, x, y, 'player_idle');

        this.isWalking = false;
        this.isIdle = true;
        this.walkSpeed = 20;
        this.idleSpeed = 7;
        this.movementSpeed = 300;
        this.scaling = 0.3;

        this.animations.add('idle');
        this.animations.play('idle', this.idleSpeed, true);
        this.scale.x = 0.3;
        this.scale.y = 0.3;

        game.physics.p2.enable(this);
        game.add.existing(this);
    }

    update() {
        this.body.angle = 0;
    }

    moveLeft() {
        this.body.moveLeft(this.movementSpeed);
        this.scale.x = -this.scaling;
        this.isWalking = true;
        this.isIdle = false;
    }

    moveRight() {
        this.body.moveRight(this.movementSpeed);
        this.scale.x = this.scaling;
        this.isWalking = true;
        this.isIdle = false;
    }

    moveUp() {
        this.body.moveUp(this.movementSpeed);
        this.isWalking = true;
        this.isIdle = false;
    }

    moveDown() {
        this.isWalking = true;
        this.isIdle = false;
        this.body.moveDown(this.movementSpeed);
    }

    loadWalkTexture() {
        this.loadTexture('player_walk', 0);
        this.animations.add('walk');
    }

    loadIdleTexture() {
        this.loadTexture('player_idle', 0);
        this.animations.add('idle');
    }

    playWalkAnimation() {
        this.loadWalkTexture();
        this.animations.play('walk', this.walkSpeed, true);
    }

    playIdleAnimation() {
        player.isIdle = true;
        this.loadIdleTexture();
        this.animations.play('idle', this.idleSpeed, true);
    }
}
