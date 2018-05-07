class ControlledNPC extends Phaser.Sprite {
    constructor(game, x, y, imageKey) {
        super(game, x, y, imageKey);

        this.velocity = new Phaser.Point(0, 0);
        this.target;
        this.isFirstTimeWandering = true;
        this.wanderRadius = 100;

        game.add.existing(this);
    }

    update() {
        this.customUpdate();
    }

    // ######################################
    // # THIS CAN BE OVERRIDDEN BY CHILDREN #
    // ######################################
    customUpdate() {}

    seek(sprite, force, speed) {
        let point = new Phaser.Point(sprite.x, sprite.y);
        this.seekPoint(point, force, speed);
    }

    flee(sprite, force, speed) {
        this.seek(sprite, force, speed);
        this.body.velocity.x *= -1;
        this.body.velocity.y *= -1;
    }

    seekPoint(point, force, speed) {
        let direction = new Phaser.Point(point.x, point.y);
        direction.subtract(this.x, this.y);
        direction.normalize();
        direction.setMagnitude(speed);
        direction.subtract(this.velocity.x, this.velocity.y);
        direction.normalize();
        direction.setMagnitude(force);
        this.velocity.add(direction.x, direction.y);
        this.velocity.normalize();
        this.velocity.setMagnitude(speed);
        this.body.velocity.x = this.velocity.x;
        this.body.velocity.y = this.velocity.y;
    }

    wander(force, speed, predator, fleeDistance) {
        if (this.isFirstTimeWandering) {
            this.generateNewTarget();
            this.isFirstTimeWandering = false;
            this.seekPoint(this.target, force, speed);
        } else {
            this.seekPoint(this.target, force, speed);
            let loc = new Phaser.Point(this.x, this.y);
            if (loc.distance(this.target) < 10) {
                this.generateNewTarget();
                if (predator !== 'undefined') {
                    while (this.target.distance(new Phaser.Point(predator.x, predator.y) < fleeDistance)) {
                        this.generateNewTarget();
                    }
                }
            }
        }
    }

    generateNewTarget() {
        let a = Math.random() * 2 * Math.PI;
        let r = this.wanderRadius * Math.sqrt(Math.random());
        let x = r * Math.cos(a) + this.x;
        let y = r * Math.sin(a) + this.y;
        this.target = new Phaser.Point(x, y);
    }
}
