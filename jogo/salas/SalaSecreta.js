import { Sala, Engine } from "../basicas.js";
import { Cofre } from "../objetos/index.js";
import { validate } from "bycontract";

export class SalaSecreta extends Sala {
    /** @param {Engine} engine */
    constructor(engine) {
        super("Sala Secreta", engine);

        const cofre = new Cofre();
        this.objetos.set(cofre.nome, cofre);
    }

    /** 
     * @param {string} nomeObjeto
     * @param {string} codigo  
     */
    discaCodigo(nomeObjeto, codigo) {
        validate(nomeObjeto, "String");
        validate(codigo, "String");

        if (!this.tem(nomeObjeto)) {
            return false;
        }

        const objeto = this.objetos.get(nomeObjeto);
        if (!(objeto instanceof Cofre)) {
            console.log("Não é possível discar código nesse objeto.");
            return false;
        }

        const acaoOk = objeto.discaCodigo(codigo);
        return acaoOk;
    }
}