class Bola {
    constructor(x, y) {
        this.position = createVector(x, y)
        this.velocity = createVector(0, 0)
    }

    start() {
        this.velocity.set(3.5, 3.5)
    }

    update() {
        this.colisao();
        this.position.add(this.velocity)
        
        if(bola.position.x - raio <= largura) {
            //ponto do bot
            players[1]["pontos"]++
            this.position.set(width/2, height/2)
        } else if(bola.position.x + raio >= width - largura){
            //ponto do player
            players[0].pontos++
            this.position.set(width/2, height/2)
        }
    }

    colisao(){
        if(this.position.x <= raio){
            this.position.x = diametro
            this.velocity.x *= -1
        }else if(this.position.x >= width - raio){
            this.position.x = width - diametro
            this.velocity.x *= -1
        } else if(this.position.y <= raio){
            this.position.y = diametro
            this.velocity.y *= -1
        }else if(this.position.y >= height - raio){
            this.position.y = height - diametro
            this.velocity.y *= -1
        }else if(this.position.x < raio && this.position.y < raio){
            console.log("Teste")
            this.velocity.mult(-1)
        }
    }
}