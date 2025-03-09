import { Engine } from "./basicas.js";
import { Porao, SalaDeEstar, Quarto, Cozinha, SalaScreta } from "./salas/index.js";

export class Jogo extends Engine {
    constructor() {
        super();
    }

    executaComando(comando, argumentos) {
        const executou = super.executaComando(comando, argumentos);

        if (!executou) {
            switch (comando) {
                case "liga":
                case "empurra":
                case "acende":
                case "abre": {
                    const nomeObjeto = argumentos[0];

                    if (typeof this.salaCorrente[comando] === "function") {
                        if (this.salaCorrente[comando](nomeObjeto)) {
                            console.log("Feito !!");
                        } else {
                            console.log("Nada aconteceu!");
                        }
                    } else {
                        console.log(`Não é possível ${comando}r ${nomeObjeto} nesta sala`);
                    }
                    break;
                }
                case "ajusta":
                case "ajusta_ponteiros":
                case "ajusta_horario": {
                    const nomeObjeto = argumentos[0];
                    const horario = argumentos[1];

                    if (typeof this.salaCorrente.ajustaPonteiros === "function") {
                        if (this.salaCorrente.ajustaPonteiros(nomeObjeto, horario)) {
                            console.log("Feito !!");
                        } else {
                            console.log("Nada aconteceu!");
                        }
                    } else {
                        console.log("Não é possível executar esse comando nesta sala");
                    }
                    break;
                }
                case "disca":
                case "disca_codigo":
                case "codigo": {
                    const nomeObjeto = argumentos[0];
                    const codigo = argumentos[1];

                    if (typeof this.salaCorrente.discaCodigo === "function") {
                        if (this.salaCorrente.discaCodigo(nomeObjeto, codigo)) {
                            console.log("Feito !!");
                        } else {
                            console.log("Código errado!");
                        }
                    } else {
                        console.log("Não é possível executar esse comando nesta sala");
                    }
                    break;
                }
                default:
                    return false;
            }

            return true;
        }

        return executou;
    }

    criaCenario() {
        const porao = new Porao(this);
        const quarto = new Quarto(this);
        const salaDeEstar = new SalaDeEstar(this);
        const cozinha = new Cozinha(this);
        const salaScreta = new SalaScreta(this);

        this.salas.set(porao.nome, porao);
        this.salas.set(salaDeEstar.nome, salaDeEstar);
        this.salas.set(quarto.nome, quarto);
        this.salas.set(cozinha.nome, cozinha);
        this.salas.set(salaScreta.nome, salaScreta);

        salaDeEstar.portas.set(porao.nome, porao);
        salaDeEstar.portas.set(quarto.nome, quarto);
        salaDeEstar.portas.set(cozinha.nome, cozinha);
        cozinha.portas.set(salaDeEstar.nome, salaDeEstar);
        quarto.portas.set(salaDeEstar.nome, salaDeEstar);
        salaScreta.portas.set(quarto.nome, quarto);

        this.salaCorrente = porao;
    }
}
