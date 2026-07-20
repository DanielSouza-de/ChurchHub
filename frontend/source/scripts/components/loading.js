import { escaparHtml } from "../utils/helpers.js";

export function mostrarCarregando(
    elemento,
    mensagem = "Carregando..."
) {
    if (!elemento) {
        return;
    }

    elemento.innerHTML = `
        <div class="eventos-carregando">
            <p>
                ${escaparHtml(mensagem)}
            </p>
        </div>
    `;
}

export function mostrarVazio(
    elemento,
    titulo,
    mensagem
) {
    if (!elemento) {
        return;
    }

    elemento.innerHTML = `
        <div class="eventos-vazio">

            <h3>
                ${escaparHtml(titulo)}
            </h3>

            <p>
                ${escaparHtml(mensagem)}
            </p>

        </div>
    `;
}

export function mostrarErro(
    elemento,
    {
        titulo = "Não foi possível carregar os dados",
        mensagem = "Tente novamente mais tarde.",
        textoBotao = "",
        idBotao = "",
        aoTentarNovamente = null
    } = {}
) {
    if (!elemento) {
        return;
    }

    const possuiBotao =
        textoBotao &&
        idBotao &&
        typeof aoTentarNovamente === "function";

    elemento.innerHTML = `
        <div class="eventos-vazio">

            <h3>
                ${escaparHtml(titulo)}
            </h3>

            <p>
                ${escaparHtml(mensagem)}
            </p>

            ${
                possuiBotao
                    ? `
                        <button
                            type="button"
                            class="btn-saiba-mais"
                            id="${escaparHtml(idBotao)}"
                        >
                            ${escaparHtml(textoBotao)}
                        </button>
                    `
                    : ""
            }

        </div>
    `;

    if (!possuiBotao) {
        return;
    }

    document
        .getElementById(idBotao)
        ?.addEventListener(
            "click",
            aoTentarNovamente
        );
}