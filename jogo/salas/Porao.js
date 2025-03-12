import { Engine, Sala } from "../basicas.js";
import { BailarinaMusical, PortaDoPorao } from "../objetos/index.js";
import { ChaveDoPorao, ChaveDeFenda, Martelo, Grampo, Isqueiro } from "../ferramentas/index.js";
import { validate } from "bycontract";

/** Classe que representa o porão. A parte inicial do jogo. */
export class Porao extends Sala {
    /** @param {Engine} engine */
    constructor(engine) {
        super("Porao", engine, "O porão está completamente escuro, somente um pequeno feixe de luz da janela ilumina parcialmente o local. Você não consegue observar muitos objetos ou ferramentas.");

        const isqueiro = new Isqueiro();
        this.ferramentas.set(isqueiro.nome, isqueiro);
    }

    /** 
     * O método que é executado depois do comando "acende", que é utilizado para acender o isqueiro para iluminar o porão.
     * Esse deve ser o primeiro mmovimento do jogador, pois vários itens importantes estão escondidos pela escuridão.
     * @param {string} nomeFerramenta 
     */
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

        /**
         * O jogador deve usar o comando "usa" para abrir a bailarina com a chave de fenda e descobrir a chave do porão escondida.
         */
        const abriuBailarina = objeto instanceof BailarinaMusical && ferramenta instanceof ChaveDeFenda;
        if (abriuBailarina) {
            const chaveEscondida = new ChaveDoPorao();
            this.ferramentas.set(chaveEscondida.nome, chaveEscondida);
        }

        /**
         * Em seguida, deve usar a chave do porão para abrir a porta do porão. 
         * Porém, ele pode usar também o grampo para abrir a porta, mas, o grampo só pode ser usado 1 vez e ele deve ser usado mais adiante no jogo. 
         * O jogador precisa tomar a melhor decisão nesta hora.
         */
        const abriuPorta = (
            objeto instanceof PortaDoPorao && (
                ferramenta instanceof ChaveDoPorao || 
                ferramenta instanceof Grampo
            )
        );
        if (abriuPorta) {
            const salaDeEstar = this.engine.salas.get("Sala_de_Estar");
            // Abriu porta? Cria passagem.
            this.portas.set(salaDeEstar.nome, salaDeEstar);
            this.objetos.delete(objeto);

            if (ferramenta instanceof Grampo) {
                // Se usou o grampo, o grampo "quebrou", então, usamos o descarta da mochila para o item desaparecer.
                console.log("Grampo quebrou e não pode ser mais utilizado.");
                this.engine.mochila.descarta(ferramenta.nome);
            }
        }

        return true;
    }
}
