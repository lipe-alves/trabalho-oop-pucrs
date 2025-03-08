import { validate } from "bycontract";
import promptsync from "prompt-sync";

const prompt = promptsync({ sigint: true });

/** @param {string} nome */
function ajustaNome(nome) {
    validate(nome, "String");
    nome = nome.trim();
    nome = nome.replace(/\s+/g, " ");
    nome = nome.replace(/\s/g, "_");
    return nome;
}

export class Ferramenta {
    /** @type {string} */
    #nome;

    /** @param {string} nome */
    constructor(nome) {
        validate(nome, "String");
        this.#nome = ajustaNome(nome);
    }

    get nome() {
        return this.#nome;
    }

    /** @param {Sala} sala */
    acende(sala) {
        validate(sala, Sala);
        return false;
    }
}

export class Mochila {
    /** @type {Ferramenta[]} */
    #ferramentas;

    constructor() {
        this.#ferramentas = [];
    }

    /** @param {Ferramenta} ferramenta */
    guarda(ferramenta) {
        validate(ferramenta, Ferramenta);
        this.#ferramentas.push(ferramenta);
    }

    /** @param {string} nomeFerramenta */
    pega(nomeFerramenta) {
        validate(nomeFerramenta, "String");
        let ferramenta = this.#ferramentas.find(f => f.nome === nomeFerramenta);
        return ferramenta;
    }

    /** @param {string} nomeFerramenta */
    tem(nomeFerramenta) {
        validate(nomeFerramenta, "String");
        return this.#ferramentas.some(f => f.nome === nomeFerramenta);
    }

    inventario() {
        return this.#ferramentas.map(obj => obj.nome).join(", ");
    }
}

export class Objeto {
    #nome;
    #descricaoAntesAcao;
    #descricaoDepoisAcao;
    #acaoOk;

    /**
     * @param {string} nome
     * @param {string} descricaoAntesAcao
     * @param {string} descricaoDepoisAcao
     */
    constructor(nome, descricaoAntesAcao, descricaoDepoisAcao) {
        validate(nome, "String");
        validate(descricaoAntesAcao, "String");
        validate(descricaoDepoisAcao, "String");
        this.#nome = ajustaNome(nome);
        this.#descricaoAntesAcao = descricaoAntesAcao;
        this.#descricaoDepoisAcao = descricaoDepoisAcao;
        this.#acaoOk = false;
    }

    get nome() {
        return this.#nome;
    }

    get acaoOk() {
        return this.#acaoOk;
    }

    set acaoOk(acaoOk) {
        validate(acaoOk, "Boolean");
        this.#acaoOk = acaoOk;
    }

    get descricao() {
        if (!this.acaoOk) {
            return this.#descricaoAntesAcao;
        } else {
            return this.#descricaoDepoisAcao;
        }
    }

    /** @param {string} codigo */
    discaCodigo(codigo) {
        validate(codigo, "String");
        this.acaoOk = false;
        return this.acaoOk;
    }

    /** @param {string} horario */
    ajustaPonteiros(horario) {
        validate(horario, "String");
        this.acaoOk = false;
        return this.acaoOk;
    }

    /** @param {Ferramenta} ferramenta */
    usa(ferramenta) {
        validate(ferramenta, Ferramenta);
        this.acaoOk = false;
        return false;
    }

    empurra() {
        this.acaoOk = false;
        return this.acaoOk;
    }
}

export class Sala {
    #nome;
    #objetos;
    #ferramentas;
    #portas;
    #descricao;
    #engine;

    /**
     * @param {string} nome 
     * @param {Engine} engine 
     * @param {string} descricao 
     */
    constructor(nome, engine, descricao = "") {
        validate(nome, "String");
        validate(engine, Engine);
        validate(descricao, "String");
        this.#nome = ajustaNome(nome);
        this.#descricao = descricao;
        this.#objetos = new Map();
        this.#ferramentas = new Map();
        this.#portas = new Map();
        this.#engine = engine;
    }

    get nome() {
        return this.#nome;
    }

    get objetos() {
        return this.#objetos;
    }

    get ferramentas() {
        return this.#ferramentas;
    }

    get portas() {
        return this.#portas;
    }

    get engine() {
        return this.#engine;
    }

    get descricao() {
        return this.#descricao;
    }

    /** @param {string} descricao */
    set descricao(descricao) {
        validate(descricao, "String");
        this.#descricao = descricao;
    }

    get objetosDisponiveis() {
        if (this.#objetos.size === 0) return "Não há objetos na sala";

        const arrObjs = [...this.#objetos.values()];
        return arrObjs.map((obj) => {
            let valor = obj.nome;

            if (obj.descricao) {
                valor += ` (${obj.descricao})`;
            }

            return valor;
        });
    }

    get ferramentasDisponiveis() {
        if (this.#ferramentas.size === 0) return "Não há ferramentas na sala";

        const arrFer = [...this.#ferramentas.values()];
        return arrFer.map(f => f.nome);
    }

    get portasDisponiveis() {
        if (this.#portas.size === 0) return "Não há portas na sala";

        const arrPortas = [...this.#portas.values()];
        return arrPortas.map(sala => sala.nome);
    }

    get descricaoCompleta() {
        let descricao = `Você está no ${this.nome}\n`;
        descricao += `${this.descricao}\n`;
        descricao += `Objetos: ${this.objetosDisponiveis}\n`;
        descricao += `Ferramentas: ${this.ferramentasDisponiveis}\n`;
        descricao += `Portas: ${this.portasDisponiveis}\n`;
        return descricao;
    }

    /** @param {string} nomeObjeto */
    tem(nomeObjeto) {
        validate(nomeObjeto, "String");
        return this.objetos.has(nomeObjeto);
    }

    pega(nomeFerramenta) {
        validate(nomeFerramenta, "String");
        let ferramenta = this.#ferramentas.get(nomeFerramenta);
        if (ferramenta != null) {
            this.#engine.mochila.guarda(ferramenta);
            this.#ferramentas.delete(nomeFerramenta);
            return true;
        } else {
            return false;
        }
    }

    /** @param {string} porta */
    sai(porta) {
        validate(porta, "String");
        return this.#portas.get(porta);
    }

    /** @param {string} porta */
    entra(porta) {
        return this.sai(porta);
    }

    /**
     * @param {string} nomeObjeto
     * @param {string} horario
     */
    ajustaPonteiros(nomeObjeto, horario) {
        validate(nomeObjeto, "String");
        validate(horario, "String");

        if (!this.tem(nomeObjeto)) {
            return false;
        }

        const objeto = this.objetos.get(nomeObjeto);
        return objeto.ajustaPonteiros(horario);
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
        return objeto.discaCodigo(codigo);
    }

    /** @param {string} nomeFerramenta */
    acende(nomeFerramenta) {
        validate(nomeFerramenta, "String");

        if (!this.engine.mochila.tem(nomeFerramenta)) {
            return false;
        }

        const ferramenta = this.engine.mochila.pega(nomeFerramenta);
        return ferramenta.acende(this);
    }

    /** @param {string} nomeObjeto */
    empurra(nomeObjeto) {
        validate(nomeObjeto, "String");

        if (!this.tem(nomeObjeto)) {
            return false;
        }

        const objeto = this.objetos.get(nomeObjeto);
        return objeto.empurra();
    }

    /**
     * @param {string} nomeFerramenta 
     * @param {string} nomeObjeto  
     */
    usa(nomeFerramenta, nomeObjeto) {
        validate(nomeFerramenta, "String");
        validate(nomeObjeto, "String");

        if (!this.engine.mochila.tem(nomeFerramenta)) {
            return false;
        }

        if (!this.tem(nomeObjeto)) {
            return false;
        }

        const objeto = this.objetos.get(nomeObjeto);
        const ferramenta = this.engine.mochila.pega(nomeFerramenta);
        const acaoOk = objeto.usa(ferramenta);

        return acaoOk;
    }
}

export class Engine {
    #mochila;
    #salas;
    #salaCorrente;
    #fim;

    constructor() {
        this.#mochila = new Mochila();
        this.#salaCorrente = null;
        this.#salas = new Map();
        this.#fim = false;
        this.criaCenario();
    }

    get mochila() {
        return this.#mochila;
    }

    get salas() {
        return this.#salas;
    }

    get salaCorrente() {
        return this.#salaCorrente;
    }

    set salaCorrente(sala) {
        validate(sala, Sala);
        this.#salaCorrente = sala;
    }

    indicaFimDeJogo() {
        this.#fim = true;
    }

    criaCenario() { }

    joga() {
        let novaSala = null;
        let acao = "";
        let tokens = null;
        while (!this.#fim) {
            console.log("-------------------------");
            console.log(this.salaCorrente.descricaoCompleta);
            acao = prompt("O que você deseja fazer? ");
            tokens = acao.split(" ");
            switch (tokens[0]) {
                case "fim":
                    this.#fim = true;
                    break;
                case "pega":
                    if (this.salaCorrente.pega(tokens[1])) {
                        console.log(`Ok! ${tokens[1]} guardado!`);
                    } else {
                        console.log(`Objeto ${tokens[1]} não encontrado.`);
                    }
                    break;
                case "inventario":
                    console.log("Ferramentas disponíveis para uso: " + this.#mochila.inventario());
                    break;
                case "usa":
                    if (this.salaCorrente.usa(tokens[1], tokens[2])) {
                        console.log("Feito !!");
                    } else {
                        console.log(`Não é possível usar ${tokens[1]} sobre ${tokens[2]} nesta sala`);
                    }
                    break;
                case "ajusta":
                case "ajusta_ponteiros":
                case "ajusta_horario":
                    if (this.salaCorrente.ajustaPonteiros(tokens[1], tokens[2])) {
                        console.log("Feito !!");
                    } else {
                        console.log("Nada aconteceu!");
                    }
                    break;
                case "disca":
                case "disca_codigo":
                case "codigo":
                    if (this.salaCorrente.discaCodigo(tokens[1], tokens[2])) {
                        console.log("Feito !!");
                    } else {
                        console.log("Código errado!");
                    }
                    break;
                case "acende":
                    if (this.salaCorrente.acende(tokens[1])) {
                        console.log("Feito !!");
                    } else {
                        console.log(`Não é possível acender ${tokens[1]} nesta sala`);
                    }
                    break;
                case "sai":
                case "entra":
                    novaSala = this.salaCorrente.entra(tokens[1]);
                    if (novaSala == null) {
                        console.log("Sala desconhecida ...");
                    } else {
                        this.#salaCorrente = novaSala;
                    }
                    break;
                default:
                    console.log("Comando desconhecido: " + tokens[0]);
                    break;
            }

            if (this.#fim) {
                console.log("Parabéns, você venceu!");
            }
        }
        console.log("Jogo encerrado!");
    }
}
