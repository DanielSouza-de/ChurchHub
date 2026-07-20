import {
    listarEventos,
    listarMinisterios
} from "../services/api.js";

import {
    criarCardEventoPublico
} from "../components/cards.js";

import {
    mostrarCarregando,
    mostrarErro,
    mostrarVazio
} from "../components/loading.js";

import {
    configurarFallbackImagens,
    escaparHtml,
    normalizarTexto,
    obterTimestamp
} from "../utils/helpers.js";

const listaEventos =
    document.getElementById("lista-eventos");

const campoPesquisa =
    document.getElementById("pesquisa-eventos");

const filtroMinisterio =
    document.getElementById("filtro-ministerio");

let todosEventos = [];

function ordenarEventos(eventos) {
    return [...eventos].sort(
        (eventoA, eventoB) => {
            const dataA =
                obterTimestamp(eventoA.data);

            const dataB =
                obterTimestamp(eventoB.data);

            if (dataA !== dataB) {
                return dataA - dataB;
            }

            return (
                Number(eventoB.id || 0) -
                Number(eventoA.id || 0)
            );
        }
    );
}

function renderizarEventos(eventos) {
    if (!listaEventos) {
        return;
    }

    if (!eventos.length) {
        mostrarVazio(
            listaEventos,
            "Nenhum encontro encontrado",
            "Tente alterar a pesquisa ou o filtro selecionado."
        );

        return;
    }

    listaEventos.innerHTML =
        ordenarEventos(eventos)
            .map(criarCardEventoPublico)
            .join("");

    configurarFallbackImagens(
        "[data-imagem-evento]",
        "https://placehold.co/600x400?text=Encontro"
    );
}

function aplicarFiltros() {
    const termoPesquisa =
        normalizarTexto(
            campoPesquisa?.value
        );

    const ministerioSelecionado =
        normalizarTexto(
            filtroMinisterio?.value
        );

    const eventosFiltrados =
        todosEventos.filter(evento => {
            const titulo =
                normalizarTexto(evento.titulo);

            const descricao =
                normalizarTexto(evento.descricao);

            const data =
                normalizarTexto(evento.data);

            const ministerioNome =
                normalizarTexto(
                    evento.ministerioNome
                );

            const correspondePesquisa =
                !termoPesquisa ||
                titulo.includes(termoPesquisa) ||
                descricao.includes(termoPesquisa) ||
                data.includes(termoPesquisa) ||
                ministerioNome.includes(
                    termoPesquisa
                );

            const correspondeMinisterio =
                !ministerioSelecionado ||
                ministerioNome ===
                    ministerioSelecionado;

            return (
                correspondePesquisa &&
                correspondeMinisterio
            );
        });

    renderizarEventos(eventosFiltrados);
}

function preencherFiltroMinisterios(
    ministerios
) {
    if (!filtroMinisterio) {
        return;
    }

    const nomesMinisterios =
        Array.isArray(ministerios)
            ? ministerios
                .map(ministerio =>
                    ministerio.nome?.trim()
                )
                .filter(Boolean)
            : [];

    todosEventos.forEach(evento => {
        const nome =
            evento.ministerioNome?.trim();

        if (nome) {
            nomesMinisterios.push(nome);
        }
    });

    const nomesUnicos =
        [...new Set(nomesMinisterios)]
            .sort(
                (nomeA, nomeB) =>
                    nomeA.localeCompare(
                        nomeB,
                        "pt-BR"
                    )
            );

    filtroMinisterio.innerHTML = `
        <option value="">
            Todos os ministérios
        </option>

        ${nomesUnicos
            .map(nome => `
                <option value="${escaparHtml(nome)}">
                    ${escaparHtml(nome)}
                </option>
            `)
            .join("")}
    `;
}

async function carregarPaginaEncontros() {
    if (!listaEventos) {
        return;
    }

    mostrarCarregando(
        listaEventos,
        "Carregando encontros..."
    );

    try {
        const [
            respostaEventos,
            respostaMinisterios
        ] = await Promise.all([
            listarEventos(),
            listarMinisterios()
        ]);

        todosEventos =
            Array.isArray(respostaEventos)
                ? respostaEventos
                : [];

        preencherFiltroMinisterios(
            respostaMinisterios
        );

        renderizarEventos(
            todosEventos
        );

    } catch (erro) {
        console.error(
            "Erro ao carregar a página de encontros:",
            erro
        );

        mostrarErro(
            listaEventos,
            {
                titulo:
                    "Não foi possível carregar os encontros",
                mensagem:
                    "Verifique se a API está funcionando e tente novamente.",
                textoBotao:
                    "Tentar novamente",
                idBotao:
                    "btn-tentar-novamente-eventos",
                aoTentarNovamente:
                    carregarPaginaEncontros
            }
        );
    }
}

campoPesquisa?.addEventListener(
    "input",
    aplicarFiltros
);

filtroMinisterio?.addEventListener(
    "change",
    aplicarFiltros
);

carregarPaginaEncontros();