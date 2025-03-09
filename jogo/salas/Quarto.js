import { Sala, Engine } from "../basicas.js";
import { Travesseiro, QuadroEmpoeirado, Armario, Abajur } from "../objetos/index.js"; 

export class Quarto extends Sala {
    /** @param {Engine} engine */
    constructor(engine) {
        super("Quarto", engine);

        const travesseiro = new Travesseiro();
        const abajur = new Abajur();
        const quadroEmpoeirado = new QuadroEmpoeirado();
        const armario = new Armario();

        this.objetos.set(travesseiro.nome, travesseiro);
        this.objetos.set(abajur.nome, abajur);
        this.objetos.set(quadroEmpoeirado.nome, quadroEmpoeirado);
        this.objetos.set(armario.nome, armario);
    }
}