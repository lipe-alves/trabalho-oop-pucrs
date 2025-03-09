import { Engine, Sala } from "../basicas.js";
import { BailarinaMusical, PortaDoPorao } from "../objetos/index.js";
import { ChaveDoPorao, ChaveDeFenda, Martelo, Grampo, Isqueiro } from "../ferramentas/index.js";
import { validate } from "bycontract";

export class Porao extends Sala {
    /** @param {Engine} engine */
    constructor(engine) {
        super("Porao", engine, "O porão está completamente escuro, somente um pequeno feixe de luz da janela ilumina parcialmente o local. Você não consegue observar muitos objetos ou ferramentas.");

        const isqueiro = new Isqueiro();
        this.ferramentas.set(isqueiro.nome, isqueiro);
    }

    /** @param {string} nomeFerramenta */
    acende(nomeFerramenta) {
        validate(nomeFerramenta, "String");

        if (!this.engine.mochila.tem(nomeFerramenta)) {
            return false;
        }

        const ferramenta = this.engine.mochila.pega(nomeFerramenta);
        if (!(ferramenta instanceof Isqueiro)) {
            console.log("Não é possível acender esse item.");
            return false;
        }

        const acaoOk = ferramenta.acende(this);

        if (acaoOk) {
            this.descricao = "O porão está mais iluminado do que antes. Agora você consegue ver diversos objetos e ferramentas disponíveis.";

            const martelo = new Martelo();
            const grampo = new Grampo();
            const chaveDeFenda = new ChaveDeFenda();

            this.ferramentas.set(martelo.nome, martelo);
            this.ferramentas.set(grampo.nome, grampo);
            this.ferramentas.set(chaveDeFenda.nome, chaveDeFenda);

            const bailarina = new BailarinaMusical();
            const portaDoPorao = new PortaDoPorao();
            
            this.objetos.set(bailarina.nome, bailarina);
            this.objetos.set(portaDoPorao.nome, portaDoPorao);
        }

        return acaoOk;
    }

    /**
     * @param {string} nomeFerramenta 
     * @param {string=} nomeObjeto  
     */
    usa(nomeFerramenta, nomeObjeto) {
        const acaoOk = super.usa(nomeFerramenta, nomeObjeto);
        if (!acaoOk) return false;

        const objeto = this.objetos.get(nomeObjeto);
        const ferramenta = this.engine.mochila.pega(nomeFerramenta);

        const abriuBailarina = objeto instanceof BailarinaMusical && ferramenta instanceof ChaveDeFenda;
        if (abriuBailarina) {
            const chaveEscondida = new ChaveDoPorao();
            this.ferramentas.set(chaveEscondida.nome, chaveEscondida);
        }

        const abriuPorta = (
            objeto instanceof PortaDoPorao && (
                ferramenta instanceof ChaveDoPorao || 
                ferramenta instanceof Grampo
            )
        );
        if (abriuPorta) {
            const salaDeEstar = this.engine.salas.get("Sala_de_Estar");
            this.portas.set(salaDeEstar.nome, salaDeEstar);
            this.objetos.delete(objeto);

            if (ferramenta instanceof Grampo) {
                console.log("Grampo quebrou e não pode ser mais utilizado.");
                this.engine.mochila.descarta(ferramenta.nome);
            }
        }

        return true;
    }
}
