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
        if(this.position.x < 7 || this.position.x > width - 7){
            this.velocity.x *= -1;
        }else if(this.position.y < 7 || this.position.y > height - 7){
            this.velocity.y *= -1;
        }else if(this.position.x < 7 && this.position.y < 7){
            this.velocity.mult(-1);
        }
    }
}