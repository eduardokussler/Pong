let gameStarted = false
let bola
let player
let borda = 20;
//diametro da bola
const diametro = 16
//dimensoes do jogador
const largura = 20
const altura = 60
function setup(){
    bola = new Bola(width/2, height/2)
    player = new Player(borda, 170)
    bot = new Player(560, 170)

    createCanvas(600,400)
    background(0)
    fill(255)
    stroke(255)
    rect(player.position.x, player.position.y, largura, altura) //p1
    //rect(bot.position.x, bot.position., 20, 60) //p2
    //frameRate(60)
}

function draw(){
    background(0)
    rect(player.position.x, player.position.y, largura, altura)
    if(gameStarted) {
        circle(bola.position.x, bola.position.y, diametro)
        bola.update()
        detectaColisao(player)
    }
}

function mouseMoved(){
    player.position.y = mouseY
    if(player.position.y < 20)
        player.position.y = 20
    if(player.position.y > height - 80)
        player.position.y = height - 80
    
    return false;
}

function mouseClicked() {
    if(!gameStarted) {
        gameStarted = true
        bola.start()
    }
}

function detectaColisao(player){
    //console.log(player)
    if(bola.position.x == player.position.x + largura){ 
        if(bola.position.y < player.position.y){
            return 
        }else if(bola.position.y > player.position.y + altura){
            return
        }else{
            bola.velocity.mult(-1)
        }
    }
}