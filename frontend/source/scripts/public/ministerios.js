import {
    listarMinisterios
} from "../services/api.js";

import {
    criarCardMinisterioPublico
} from "../components/cards.js";

import {
    mostrarCarregando,
    mostrarErro,
    mostrarVazio
} from "../components/loading.js";

import {
    normalizarTexto
} from "../utils/helpers.js";

const listaMinisterios =
    document.getElementById(
        "lista-ministerios-publico"
    );

const campoPesquisa =
    document.getElementById(
        "pesquisa-ministerios"
    );

let todosMinisterios = [];

function ordenarMinisterios(lista) {
    return [...lista].sort(
        (ministerioA, ministerioB) =>
            String(
                ministerioA.nome || ""
            ).localeCompare(
                String(
                    ministerioB.nome || ""
                ),
                "pt-BR"
            )
    );
}

function renderizarMinisterios(lista) {
    if (!listaMinisterios) {
        return;
    }

    if (!lista.length) {
        mostrarVazio(
            listaMinisterios,
            "Nenhum ministério encontrado",
            "Tente alterar sua pesquisa."
        );

        return;
    }

    listaMinisterios.innerHTML =
        ordenarMinisterios(lista)
            .map(criarCardMinisterioPublico)
            .join("");
}

function aplicarPesquisa() {
    const pesquisa =
        normalizarTexto(
            campoPesquisa?.value
        );

    const resultado =
        todosMinisterios.filter(
            ministerio =>
                normalizarTexto(
                    ministerio.nome
                ).includes(pesquisa) ||
                normalizarTexto(
                    ministerio.descricao
                ).includes(pesquisa) ||
                normalizarTexto(
                    ministerio.lider
                ).includes(pesquisa)
        );

    renderizarMinisterios(resultado);
}

async function carregarMinisterios() {
    if (!listaMinisterios) {
        return;
    }

    mostrarCarregando(
        listaMinisterios,
        "Carregando ministérios..."
    );

    try {
        const resposta =
            await listarMinisterios();

        todosMinisterios =
            Array.isArray(resposta)
                ? resposta
                : [];

        renderizarMinisterios(
            todosMinisterios
        );

    } catch (erro) {
        console.error(
            "Erro ao carregar ministérios:",
            erro
        );

        mostrarErro(
            listaMinisterios,
            {
                titulo:
                    "Não foi possível carregar os ministérios",
                mensagem:
                    "Verifique se a API está em execução.",
                textoBotao:
                    "Tentar novamente",
                idBotao:
                    "btn-recarregar-ministerios",
                aoTentarNovamente:
                    carregarMinisterios
            }
        );
    }
}

campoPesquisa?.addEventListener(
    "input",
    aplicarPesquisa
);

carregarMinisterios();