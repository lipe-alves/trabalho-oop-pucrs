import { Sala, Engine } from "../basicas.js";
import { PanoDePrato, ChaveSecreta, Faca } from "../ferramentas/index.js";
import { Travesseiro, QuadroEmpoeirado, Armario, Abajur, PortaSecreta } from "../objetos/index.js";
import { validate } from "bycontract";

/** Classe que representa o quarto do captor. */
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

        // O comando liga só é utilizado no abajur nesta sala.
        const objeto = this.objetos.get(nomeObjeto);
        if (!(objeto instanceof Abajur)) {
            console.log("Não é possível ligar esse objeto.");
            return false;
        }

        const acaoOk = objeto.liga();
        if (acaoOk) {
            /**
             * O jogador precisa limpar o quadro e ligar o abajur para revelar os números secretos.
             * Como não sabemos a ordem que ele fará (ligou abajur => limpou quadro ou limpou quadro => ligou abajur), acrescentamos essa validação em cima e embaixo.
             */
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

        // O método empurra só é usado no armário nesta sala.
        const objeto = this.objetos.get(nomeObjeto);
        if (!(objeto instanceof Armario)) {
            console.log("Não é possível empurrar esse objeto.");
            return false;
        }

        // O jogador precisa empurrar o armário para descobrir a porta secreta atrás do armário.
        const acaoOk = objeto.empurra();
        if (acaoOk) {
            // Se ele empurrar, acrescentamos a porta secreta como objeto ao cenário para o jogador interagir com a chave.
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

        // O jogador precisa cortar o travesseiro para descobrir a chave da portinha secreta de trás do armário.
        const cortouTravesseiro = (
            ferramenta instanceof Faca &&
            objeto instanceof Travesseiro
        );
        if (cortouTravesseiro) {
            // Se cortou, acrescentamos a chave secreta ao cenário.
            const chaveSecreta = new ChaveSecreta();
            this.ferramentas.set(chaveSecreta.nome, chaveSecreta);
        }

        /**
         * O jogador precisa limpar o quadro e ligar o abajur para revelar os números secretos.
         * Como não sabemos a ordem que ele fará (ligou abajur => limpou quadro ou limpou quadro => ligou abajur), acrescentamos essa validação em cima e embaixo.
         */
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

        // O jogador precisa usar a chave secreta do travesseiro para abrir a porta secreta.
        const destrancouPortaSecreta = (
            ferramenta instanceof ChaveSecreta &&
            objeto instanceof PortaSecreta
        );
        if (destrancouPortaSecreta) {
            // Se destrancou (usou a chave secreta na porta secreta), colocamos a passagem para a sala secreta no cenário.
            const salaSecreta = this.engine.salas.get("Sala_Secreta");
            this.portas.set(salaSecreta.nome, salaSecreta);
        }

        return acaoOk;
    }
}
