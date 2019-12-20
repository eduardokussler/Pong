let game = false
let fezPonto = false
let bola
let players = []
let winner = null
var tempo
//diametro da bola
const diametro = 16
const raio = diametro / 2
//dimensoes do jogador
const largura = 20
const altura = 60
const tempoAnimacao = 1000

function preload(){
    loadFont('fonts/Ubuntu-Regular.ttf');
}

function setup(){
    createCanvas(1000,400)
    bola = new Bola(width/2, height/2)
    players.push(new Player(largura, width/2, "Jogador 1"))
    players.push(new Player(width - largura*2, width/2, "Bot"))

    background(0)
    fill(255)
    stroke(255)
    tempo = millis()
    bola.start()
}

function draw(){
    if(game) {
        background(0)
        for(let i = 0; i < players.length; i++) {
            rect(players[i].position.x, players[i].position.y, largura, altura)
            detectaColisao(players[i], i)   
        }
        fill(255)
        stroke(255)
        textStyle(NORMAL)
        if(millis() - tempo >= tempoAnimacao){
            tempo = millis()
            fezPonto = false
        }
        escrevePontos(players)
        line(width/2, height - largura, width/2, largura)
        circle(bola.position.x, bola.position.y, diametro) //bola
        updateBot(players[1])
        bola.update()
        updatePlayer(players[0])
    } else {
        if(winner != null){
            winnerText(winner)
        } else {
            startText()
        }
    }
}

function mouseMoved(){
    players[0].velocity = 5
    players[0].goto = mouseY - altura/2
    if(players[0].position.y - players[0].goto < 0){
        players[0].velocity = abs(players[0].velocity)
        return true
    }else if(players[0].position.y - players[0].goto > 0){
        players[0].velocity = abs(players[0].velocity) * -1
        return true
    }else{
        return false
    }
}

function mouseClicked() {
    if(!game) {
        winner = null
        game = true
        bola.start()
        players[1].pontos.val = 0
        players[0].pontos.val = 0
    }
}

function updateBot(bot){
    bot.goto = bola.position.y - altura/2
    if(bot.position.y - bot.goto < 0){
        bot.velocity = abs(bot.velocity) 
    }else if(bot.position.y - bot.goto > 0){
        bot.velocity = abs(bot.velocity) * -1
    }
    if(abs(bola.position.x - bot.position.x) < 150){
        bot.position.y += bot.velocity
    }
    if(bot.position.y < 20)
        bot.position.y = 20
    if(bot.position.y > height - (altura + 20))
        bot.position.y = height - (altura + 20)
}

function updatePlayer(player){
    if(abs(player.goto - player.position.y) < 10) {
        player.velocity = 0
        
    }
    player.position.y += player.velocity
    if(player.position.y < 20)
        player.position.y = 20
    if(player.position.y > height - (altura + 20))
        player.position.y = height - (altura + 20)
}

function detectaColisao(player, i) {

    let bordaEsquerda = player.position.x
    let bordaDireita = player.position.x + largura;
    let bordaTop = player.position.y
    let bordaBottom = player.position.y + altura;
    
    let r2 = [3, 4, 5, 6, 7, 8]

    let r = map(random(), 0, 1, 0, 5)
    r = Math.ceil(r)
    r = r2[r]
        
    if(bola.position.x + raio > bordaEsquerda) 
        if(bola.position.x - raio < bordaDireita)
            if(bola.position.y + raio > bordaTop) 
                if(bola.position.y - raio < bordaBottom) {
                    
                    bola.velocity.x *= -1
                    if(i == 0) 
                        bola.velocity.x = r
                    if(i == 1)
                        bola.velocity.x = r * -1
                    bola.update()
                }
                    
}

function escrevePontos() {
    textSize(32)
    fill(255)
    
    for(let i = 0; i < players.length; i++) {
        let pontos = players[i]["pontos"]
        
        if(i == 0)
            if(fezPonto) {
                //tempo = millis()
                pontos["posX"] = width/4 + random(-3, 3)
                pontos["size"] = 40
            } else {
                pontos["posX"] = width/4
                pontos["size"] = 32
            }
        if(i == 1)
            if(fezPonto) {
                //tempo = millis()
                pontos["posX"] = (width - width/4) + random(-3, 3)
                pontos["size"] = 40
                
            } else {
                pontos["posX"] = width - width/4
                pontos["size"] = 32
            }
        text(pontos["val"].toString(), pontos["posX"], pontos["size"])
    }

}

function startText(){
    background(120)
    fill(255)
    stroke(0)
    strokeWeight(1)
    textFont("Ubuntu-Regular")
    textSize(96)
    textStyle(ITALIC)
    text("PONG", width / 3 , height / 4)
    
    textSize(24)
    text("Click anywhere to start", width / 3, height / 2)
}

function winnerText(name) {
    background(120)
    fill(255)
    stroke(80)
    strokeWeight(1)
    textFont("Ubuntu-Regular")
    textSize(96)
    text("WINNER \n\t", largura, 100)
    textSize(72)
    text(name, largura, 200)

    textSize(24)
    text("Click anywhere to restart", largura, height / 1.5)
}