class Cat extends ControlledNPC {
    constructor(game, x, y) {
        super(game, x, y, 'cat_front');

        this.isWalking = false;
        this.isWalkingLeft = false;
        this.isWalingRight = false;
        this.walkSpeed = 12;
        this.scaleFactor = 1.7;

        this.scale.x = this.scaleFactor;
        this.scale.y = this.scaleFactor;
        this.anchor.setTo(0.5, 0.5);
    }

    customUpdate() {
        if (this.velocity.x < 0) {
            // console.log("right");
        } else if (this.velocity.x > 0) {
            // console.log("left");
        } else if (this.velocity.x === 0 && this.velocity.y === 0) {
            // console.log("stationary");
        }
    }

    playWalkFrontAnimation() {
        this.loadFrontTexture();
        this.animations.play('cat_front_walk', this.walkSpeed, true);
    }

    playWalkSideAnimation(side) {
        this.loadSideTexture();
        if (side == 'left') {
            cat.isWalkingLeft = true;
            cat.isWalkingRight = false;
            this.scale.x = this.scaleFactor;
        } else if (side == 'right') {
            cat.isWalkingRight = true;
            cat.isWalkingLeft = false;
            this.scale.x = -this.scaleFactor;
        }
        cat.isWalking = true;
        this.animations.play('cat_side_walk', this.walkSpeed, true);
    }

    stopAnimations() {
        this.animations.stop(null, true);
        cat.isWalking = false;
        cat.isWalkingLeft = false;
        cat.isWalkingRight = false;
    }

    loadFrontTexture() {
        this.loadTexture('cat_front', 0);
        this.animations.add('cat_front_walk');
    }

    loadSideTexture() {
        this.loadTexture('cat_side', 0);
        this.animations.add('cat_side_walk');
    }
}
