class Bola {
    constructor(x, y) {
        this.position = createVector(x, y)
        this.velocity = createVector(0, 0)
    }

    start() {

        this.velocity.set(5, 5)
    }

    update() {
        this.colisao();
        this.position.add(this.velocity)
        
        if(bola.position.x - raio <= largura) {
            //ponto do bot
            players[1]["pontos"].val++
            fezPonto = true
            this.position.set(width/2, height/2)
            this.velocity.set(random(0.75, 1.25) * 5, random(0.75, 1.25) * 5)
            if(random() < 0.5)
                this.velocity.mult(-1)
            
            if(players[1].pontos.val == 10){
                game = false
                winner = players[1].nome
            }
        } else if(bola.position.x + raio >= width - largura){
            //ponto do player
            fezPonto = true
            players[0].pontos.val++
            this.velocity.set(random(0.75, 1.25) * 5, random(0.75, 1.25) * 5)
            if(random() < 0.5)
                this.velocity.mult(-1)
            this.position.set(width/2, height/2)
            if(players[0].pontos.val == 10){
                game = false
                winner = players[0].nome
            }
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