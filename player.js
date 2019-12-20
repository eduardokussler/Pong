class Player {
    constructor(x, y, nome) {
        this.position = createVector(x, y)
        this.nome = nome
        this.velocity = 6.5
        this.goto = 5
        this.pontos = {
            val: 0,
            posX: null,
            size: 32
        }
    }
}