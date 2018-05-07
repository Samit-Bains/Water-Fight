class PhysicsResize {
    constructor(game) {
        this.game = game;
    }

    resizePolygon(originalPhysicsKey, newPhysicsKey, shapeKey, scale) {
        let newData = [];
        let data = this.game.cache.getPhysicsData(originalPhysicsKey, shapeKey);
        for (let i = 0; i < data.length; i++) {
            let vertices = [];
            for (let j = 0; j < data[i].shape.length; j += 2) {
                vertices[j] = data[i].shape[j] * scale;
                vertices[j + 1] = data[i].shape[j + 1] * scale;
            }
            newData.push({
                shape: vertices
            });
        }
        let item = {};
        item[shapeKey] = newData;
        this.game.load.physics(newPhysicsKey, '', item);
        
        //debugPolygon(newPhysicsKey, shapeKey);
    }
}
