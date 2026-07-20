import { listarEventos } from "./api.js";

const header = document.querySelector("header");
const menuMobile = document.getElementById("menu-mobile");
const botaoMenu = document.getElementById("btn-menu");

const paginaAtual = window.location.pathname;

const paginaComHeaderFixo =
    paginaAtual.includes("encontros.html")
    || paginaAtual.includes("ministerios.html");

let eventosCarregados = [];

// ========================================
// Header
// ========================================

function atualizarHeader() {
    if (!header) {
        return;
    }

    if (
        paginaComHeaderFixo
        || window.scrollY > 0
        || menuMobile?.classList.contains("abrir")
    ) {
        header.classList.add("rolagem");
    } else {
        header.classList.remove("rolagem");
    }
}

window.addEventListener("scroll", atualizarHeader);

atualizarHeader();

// ========================================
// Menu mobile
// ========================================

function alternarMenu() {
    if (!menuMobile || !botaoMenu) {
        return;
    }

    const menuAberto =
        menuMobile.classList.toggle("abrir");

    botaoMenu.classList.toggle(
        "ativar",
        menuAberto
    );

    botaoMenu.setAttribute(
        "aria-expanded",
        String(menuAberto)
    );

    atualizarHeader();
}

botaoMenu?.addEventListener(
    "click",
    alternarMenu
);

menuMobile?.addEventListener(
    "click",
    function (event) {
        if (event.target.closest("a")) {
            alternarMenu();
        }
    }
);


// ========================================
// Utilidades
// ========================================

function escaparHtml(valor) {
    const elemento = document.createElement("div");

    elemento.textContent = valor ?? "";

    return elemento.innerHTML;
}

function limitarTexto(texto, limite = 180) {
    if (!texto) {
        return "";
    }

    if (texto.length <= limite) {
        return texto;
    }

    return `${texto.substring(0, limite).trim()}...`;
}

// ========================================
// Eventos públicos
// ========================================

const listaEventos =
    document.getElementById("lista-eventos");

const campoPesquisa =
    document.getElementById("pesquisa-eventos");

const filtroMinisterio =
    document.getElementById("filtro-ministerio");

function criarCardEvento(evento) {
    const imagem =
        evento.imagem
        || "https://placehold.co/600x400";

    const ministerio =
        evento.ministerioNome
        || "Não informado";

    return `
        <article class="card-encontros">

            <div class="card-encontros__imagem">

                <img
                    class="img-encontros"
                    src="${escaparHtml(imagem)}"
                    alt="${escaparHtml(evento.titulo)}"
                    loading="lazy"
                    data-imagem-evento
                >

            </div>

            <div class="card-encontros__conteudo">

                <span class="card-encontros__ministerio">
                    ${escaparHtml(ministerio)}
                </span>

                <h3 class="subtitulo-encontros">
                    ${escaparHtml(evento.titulo)}
                </h3>

                <p class="card-encontros__descricao">
                    ${escaparHtml(
                        limitarTexto(evento.descricao)
                    )}
                </p>

                <div class="card-encontros__rodape">

                    <p class="card-encontros__data">
                        <span aria-hidden="true">📅</span>

                        ${escaparHtml(evento.data)}
                    </p>

                </div>

            </div>

        </article>
    `;
}

function configurarFallbackDasImagens() {
    const imagens = document.querySelectorAll(
        "[data-imagem-evento]"
    );

    imagens.forEach(imagem => {
        imagem.addEventListener(
            "error",
            function () {
                imagem.src =
                    "https://placehold.co/600x400";
            },
            {
                once: true
            }
        );
    });
}

function renderizarEventos(eventos) {
    if (!listaEventos) {
        return;
    }

    if (
        !Array.isArray(eventos)
        || eventos.length === 0
    ) {
        listaEventos.innerHTML = `
            <div class="eventos-vazio">
                <h3>Nenhum encontro encontrado</h3>

                <p>
                    Tente alterar a pesquisa ou o filtro selecionado.
                </p>
            </div>
        `;

        return;
    }

    listaEventos.innerHTML = eventos
        .map(criarCardEvento)
        .join("");

    configurarFallbackDasImagens();
}

function carregarOpcoesDeMinisterio() {
    if (!filtroMinisterio) {
        return;
    }

    const ministerios = eventosCarregados
        .map(evento => evento.ministerioNome)
        .filter(Boolean)
        .filter(
            (nome, indice, lista) =>
                lista.indexOf(nome) === indice
        )
        .sort((a, b) =>
            a.localeCompare(b, "pt-BR")
        );

    filtroMinisterio.innerHTML = `
        <option value="">
            Todos os ministérios
        </option>
    `;

    ministerios.forEach(nome => {
        const opcao =
            document.createElement("option");

        opcao.value = nome;
        opcao.textContent = nome;

        filtroMinisterio.appendChild(opcao);
    });
}

function aplicarFiltrosDosEventos() {
    const pesquisa =
        campoPesquisa?.value
            .trim()
            .toLowerCase()
        ?? "";

    const ministerioSelecionado =
        filtroMinisterio?.value
        ?? "";

    const eventosFiltrados =
        eventosCarregados.filter(evento => {
            const titulo =
                evento.titulo?.toLowerCase()
                ?? "";

            const descricao =
                evento.descricao?.toLowerCase()
                ?? "";

            const data =
                evento.data?.toLowerCase()
                ?? "";

            const ministerio =
                evento.ministerioNome
                ?? "";

            const correspondePesquisa =
                titulo.includes(pesquisa)
                || descricao.includes(pesquisa)
                || data.includes(pesquisa)
                || ministerio
                    .toLowerCase()
                    .includes(pesquisa);

            const correspondeMinisterio =
                !ministerioSelecionado
                || ministerio ===
                    ministerioSelecionado;

            return (
                correspondePesquisa
                && correspondeMinisterio
            );
        });

    renderizarEventos(eventosFiltrados);
}

async function carregarEventos() {
    if (!listaEventos) {
        return;
    }

    try {
        listaEventos.innerHTML = `
            <p>Carregando encontros...</p>
        `;

        eventosCarregados =
            await listarEventos();

        eventosCarregados.sort(
            (a, b) =>
                Number(b.id) - Number(a.id)
        );

        carregarOpcoesDeMinisterio();
        aplicarFiltrosDosEventos();

    } catch (erro) {
        console.error(
            "Erro ao carregar eventos:",
            erro
        );

        listaEventos.innerHTML = `
            <div class="eventos-vazio">
                <h3>Não foi possível carregar os encontros</h3>

                <p>
                    Verifique se a API está funcionando e tente novamente.
                </p>
            </div>
        `;
    }
}

campoPesquisa?.addEventListener(
    "input",
    aplicarFiltrosDosEventos
);

filtroMinisterio?.addEventListener(
    "change",
    aplicarFiltrosDosEventos
);

// ========================================
// Inicialização
// ========================================

document.addEventListener(
    "DOMContentLoaded",
    function () {
        digitar();
        carregarEventos();
    }
);