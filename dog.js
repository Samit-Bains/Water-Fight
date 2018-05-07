class Dog extends Phaser.Sprite {
    constructor(game, x, y) {
        super(game, x, y, 'dog_idle');

        this.isWalking = false;
        this.isIdle = true;
        this.walkSpeed = 20;
        this.idleSpeed = 7;
        this.movementSpeed = 250;
        this.scaling = 0.2;

        this.animations.add('idle');
        this.animations.play('idle', this.idleSpeed, true);

        this.scale.x = this.scaling;
        this.scale.y = this.scaling;
        this.anchor.setTo(0.5, 0.5);

        game.add.existing(this);
    }

    update() {
        this.isWalking = false;
    }

    moveLeft() {
        if (this.scale.x !== -this.scaling) {
            // console.log("left");
            dog.body.clearShapes();
            dog.body.loadPolygon('dog_physics_left_scaled', 'Left');
        }
        this.body.moveLeft(this.movementSpeed);
        this.scale.x = -this.scaling;
        this.isWalking = true;
        this.isIdle = false;
    }

    moveRight() {
        this.body.moveRight(this.movementSpeed);
        if (this.scale.x !== -this.scaling) {
            // console.log("right");
            dog.body.clearShapes();
            dog.body.loadPolygon('dog_physics_right_scaled', 'Right');
        }
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
        this.body.moveDown(this.movementSpeed);
        this.isWalking = true;
        this.isIdle = false;
    }

    loadWalkTexture() {
        this.loadTexture('dog_walk', 0);
        this.animations.add('walk');
    }

    loadIdleTexture() {
        this.loadTexture('dog_idle', 0);
        this.animations.add('idle');
    }

    playWalkAnimation() {
        this.loadWalkTexture();
        this.animations.play('walk', this.walkSpeed, true);
    }

    playIdleAnimation() {
        this.isIdle = true;
        this.loadIdleTexture();
        this.animations.play('idle', this.idleSpeed, true);
    }
}
