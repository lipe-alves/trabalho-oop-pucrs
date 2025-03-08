import { Engine } from "./basicas.js";
import { Porao, SalaDeEstar, Quarto, Cozinha } from "./salas/index.js";

export class Jogo extends Engine {
    constructor() {
        super();
    }

    criaCenario() {
        const porao = new Porao(this);
        const quarto = new Quarto(this);
        const salaDeEstar = new SalaDeEstar(this);
        const cozinha = new Cozinha(this);
        
        this.salas.set(porao.nome, porao);
        this.salas.set(salaDeEstar.nome, salaDeEstar);
        this.salas.set(quarto.nome, quarto);
        this.salas.set(cozinha.nome, cozinha);

        salaDeEstar.portas.set(porao.nome, porao);
        salaDeEstar.portas.set(quarto.nome, quarto);
        salaDeEstar.portas.set(cozinha.nome, cozinha);

        cozinha.portas.set(salaDeEstar.nome, salaDeEstar);

        quarto.portas.set(salaDeEstar.nome, salaDeEstar);

        this.salaCorrente = porao;
    }
}
