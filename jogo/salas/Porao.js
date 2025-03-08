import { Engine, Sala } from "../basicas.js";
import { BailarinaMusical, PortaDoPorao } from "../objetos/index.js";
import { ChaveDoPorao, ChaveDeFenda, Martelo, Grampo, Isqueiro } from "../ferramentas/index.js";
import { SalaDeEstar } from "../salas/index.js";

export class Porao extends Sala {
    /** @param {Engine} engine */
    constructor(engine) {
        super("Porao", engine, "O porão está completamente escuro, somente um pequeno feixe de luz da janela ilumina parcialmente o local. Você não consegue observar muitos objetos ou ferramentas.");

        const isqueiro = new Isqueiro();
        this.ferramentas.set(isqueiro.nome, isqueiro);
    }

    /** @param {string} nomeFerramenta */
    acende(nomeFerramenta) {
        const acaoOk = super.acende(nomeFerramenta);

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

        const abriuPorta = ferramenta instanceof ChaveDoPorao && objeto instanceof PortaDoPorao;
        if (abriuPorta) {
            const salaDeEstar = new SalaDeEstar(this.engine);
            this.portas.set(salaDeEstar.nome, salaDeEstar);
            this.objetos.delete(objeto);
        }

        return true;
    }
}
