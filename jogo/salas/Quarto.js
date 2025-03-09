import { Sala, Engine } from "../basicas.js";
import { PanoDePrato, ChaveSecreta, Faca } from "../ferramentas/index.js";
import { Travesseiro, QuadroEmpoeirado, Armario, Abajur, PortaSecreta } from "../objetos/index.js";
import { validate } from "bycontract";

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

    /** @param {string} nomeObjeto */
    liga(nomeObjeto) {
        validate(nomeObjeto, "String");

        if (!this.tem(nomeObjeto)) {
            return false;
        }

        const objeto = this.objetos.get(nomeObjeto);
        if (!(objeto instanceof Abajur)) {
            console.log("Não é possível ligar esse objeto.");
            return false;
        }

        const acaoOk = objeto.liga();
        if (acaoOk) {
            const quadro = this.objetos.get("Quadro_Empoeirado");
            const quadroEstaLimpo = quadro.acaoOk;

            if (quadroEstaLimpo) {
                quadro.revelaNumeros();
            }
        }

        return acaoOk;
    }

    empurra(nomeObjeto) {
        validate(nomeObjeto, "String");

        if (!this.tem(nomeObjeto)) {
            return false;
        }

        const objeto = this.objetos.get(nomeObjeto);
        if (!(objeto instanceof Armario)) {
            console.log("Não é possível empurrar esse objeto.");
            return false;
        }

        const acaoOk = objeto.empurra();
        if (acaoOk) {
            const portaSecreta = new PortaSecreta();
            this.objetos.set(portaSecreta.nome, portaSecreta);
        }

        return acaoOk;
    }

    usa(nomeFerramenta, nomeObjeto) {
        const acaoOk = super.usa(nomeFerramenta, nomeObjeto);
        if (!acaoOk) return false;

        const ferramenta = this.engine.mochila.pega(nomeFerramenta);
        const objeto = this.objetos.get(nomeObjeto);

        const cortouTravesseiro = (
            ferramenta instanceof Faca &&
            objeto instanceof Travesseiro
        );
        if (cortouTravesseiro) {
            const chaveSecreta = new ChaveSecreta();
            this.ferramentas.set(chaveSecreta.nome, chaveSecreta);
        }

        const limpouQuadro = (
            ferramenta instanceof PanoDePrato &&
            objeto instanceof QuadroEmpoeirado
        );
        if (limpouQuadro) {
            const quadro = objeto;
            const abajur = this.objetos.get("Abajur");
            const abajurEstaLigado = abajur.acaoOk;

            if (abajurEstaLigado) {
                quadro.revelaNumeros();
            }
        }

        const destrancouPortaSecreta = (
            ferramenta instanceof ChaveSecreta &&
            objeto instanceof PortaSecreta
        );
        if (destrancouPortaSecreta) {
            const salaSecreta = this.engine.salas.get("Sala_Secreta");
            this.portas.set(salaSecreta.nome, salaSecreta);
        }

        return acaoOk;
    }
}