import { Sala, Engine } from "../basicas.js";
import { Grampo, Lupa, PanoDePrato, Faca, Isqueiro } from "../ferramentas/index.js";
import { Joia, Geladeira, GavetaDeCima, GavetaDebaixo } from "../objetos/index.js";
import { validate } from "bycontract";

export class Cozinha extends Sala {
    /** @param {Engine} engine */
    constructor(engine) {
        super("Cozinha", engine);

        const geladeira = new Geladeira();
        this.objetos.set(geladeira.nome, geladeira);

        const gavetaDeCima = new GavetaDeCima();
        this.objetos.set(gavetaDeCima.nome, gavetaDeCima);

        const gavetaDebaixo = new GavetaDebaixo();
        this.objetos.set(gavetaDebaixo.nome, gavetaDebaixo);
    }

    /** @param {string} nomeObjeto */
    abre(nomeObjeto) {
        validate(nomeObjeto, "String");

        if (!this.tem(nomeObjeto)) {
            return false;
        }

        const objeto = this.objetos.get(nomeObjeto);
        if (!(objeto instanceof GavetaDeCima)) {
            console.log("Não é possível abrir esse objeto.");
            return false;
        }

        const acaoOk = objeto.abre();
        if (!acaoOk) return false;

        const panoDePrato = new PanoDePrato();
        this.ferramentas.set(panoDePrato.nome, panoDePrato);

        const faca = new Faca();
        this.ferramentas.set(faca.nome, faca);

        return true;
    }

    usa(nomeFerramenta, nomeObjeto) {
        const acaoOk = super.usa(nomeFerramenta, nomeObjeto);
        if (!acaoOk) return false;

        const ferramenta = this.engine.mochila.pega(nomeFerramenta);
        const objeto = this.objetos.get(nomeObjeto);

        const destrancouGavetaDebaixo = (
            ferramenta instanceof Grampo &&
            objeto instanceof GavetaDebaixo
        );
        if (destrancouGavetaDebaixo) {
            const grampo = ferramenta;
            this.ferramentas.delete(grampo.nome, grampo);

            const lupa = new Lupa();
            this.ferramentas.set(lupa.nome, lupa);
        }

        const descongelouGeladeira = (
            ferramenta instanceof Isqueiro &&
            objeto instanceof Geladeira
        );
        if (descongelouGeladeira) {
            const joia = new Joia();
            this.objetos.set(joia.nome, joia);
        }

        return acaoOk;
    }
}