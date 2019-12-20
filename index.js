let game = false
let bola
let players = []
//diametro da bola
const diametro = 16
const raio = diametro / 2
//dimensoes do jogador
const largura = 20
const altura = 60

function setup(){
    createCanvas(1000,400)
    bola = new Bola(width/2, height/2)
    players.push(new Player(largura, width/2))
    players.push(new Player(width - largura*2, width/2))

    background(0)
    fill(255)
    stroke(255)

    bola.start()
}

function draw(){
    background(0)
    
    if(game) {
        for(let i = 0; i < players.length; i++) {
            rect(players[i].position.x, players[i].position.y, largura, altura)
            
            detectaColisao(players[i], i)   
        }
        escrevePontos(players)
        line(width/2, height - largura, width/2, largura)
        circle(bola.position.x, bola.position.y, diametro) //bola
        updateBot(players[1])
        bola.update()
    }
}

function mouseMoved(){
    players[0].position.y = mouseY - altura/2
    if(players[0].position.y < 20)
        players[0].position.y = 20
    if(players[0].position.y > height - (altura + 20))
        players[0].position.y = height - (altura + 20)
    return false
}

function mouseClicked() {
    if(!game) {
        game = true
        bola.start()
    }
}

function updateBot(bot){
    bot.position.y = map(random(), 0, 1, 20, height - (altura + 20))
    if(bot.position.y < 20)
        bot.position.y = 20
    if(bot.position.y > height - (altura + 20))
        bot.position.y = height - (altura + 20)
}

function detectaColisao(player, i) {

    let bordaEsquerda = player.position.x
    let bordaDireita = player.position.x + largura;
    let bordaTop = player.position.y
    let bordaBottom = player.position.y + altura;
    let r2 = [3, 4,-3,-4]

    let r = map(random(), 0, 1, 0, 3)
    r = Math.ceil(r)
    r = r2[r]
        

    if(bola.position.x + raio > bordaEsquerda) 
        if(bola.position.x - raio < bordaDireita)
            if(bola.position.y + raio > bordaTop) 
                if(bola.position.y - raio < bordaBottom) {
                    
                    bola.velocity.x *= -1
                    if(i == 0) 
                        bola.velocity.x = abs(r)
                    if(i == 1)
                        bola.velocity.x = abs(r)*-1
                    bola.update()
                }
                    
}


function escrevePontos() {
    textSize(32)
    fill(255)
    text(players[0].pontos.toString(), width/4, 32)
    text(players[1].pontos.toString(), width - width/4, 32)
}