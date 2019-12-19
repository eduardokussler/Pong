class Bola {
    constructor(x, y) {
        this.position = createVector(x, y);
        this.velocity = createVector(0, 0);
    }

    start() {
        this.velocity.set(5, 5);
    }

    update() {
        this.colisao();
        this.position.add(this.velocity);
    }

    colisao(){
        if(this.position.x < diametro/2 || this.position.x > width - diametro/2){
            this.velocity.x *= -1;
        }else if(this.position.y < diametro/2 || this.position.y > height - diametro/2){
            this.velocity.y *= -1;
        }else if(this.position.x < diametro/2 && this.position.y < diametro/2){
            this.velocity.mult(-1);
        }
    }
}