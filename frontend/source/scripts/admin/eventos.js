import {
    listarEventos,
    listarMinisterios,
    criarEvento,
    atualizarEvento,
    excluirEvento
} from "../services/api.js";

import {
    criarLinhaEventoAdmin
} from "../components/cards.js";

import {
    abrirModal,
    fecharModal,
    modalEstaAberto
} from "../components/modal.js";

import {
    mostrarTabelaCarregando,
    mostrarTabelaErro,
    mostrarTabelaVazia
} from "../components/table.js";

import {
    configurarFallbackImagens,
    normalizarTexto
} from "../utils/helpers.js";

import {
    mostrarToast
} from "./toast.js";

const formEvento =
    document.getElementById("form-evento");

const eventoId =
    document.getElementById("evento-id");

const campoTitulo =
    document.getElementById("titulo");

const campoDescricao =
    document.getElementById("descricao");

const campoData =
    document.getElementById("data");

const campoImagem =
    document.getElementById("imagem");

const campoMinisterio =
    document.getElementById("ministerio");

const listaEventos =
    document.getElementById(
        "lista-eventos-admin"
    );

const mensagemEvento =
    document.getElementById(
        "mensagem-evento"
    );

const tituloFormulario =
    document.getElementById(
        "titulo-formulario"
    );

const botaoNovoEvento =
    document.getElementById(
        "btn-novo-evento"
    );

const botaoSalvar =
    document.getElementById(
        "btn-salvar"
    );

const botaoCancelar =
    document.getElementById(
        "btn-cancelar"
    );

const botaoFecharModal =
    document.getElementById(
        "btn-fechar-modal"
    );

const campoPesquisa =
    document.getElementById(
        "pesquisa-evento"
    );

const ordenacaoEventos =
    document.getElementById(
        "ordenacao-eventos"
    );

const modalEvento =
    document.getElementById(
        "modal-evento"
    );

const previewImagemContainer =
    document.getElementById(
        "preview-imagem-container"
    );

const previewImagem =
    document.getElementById(
        "preview-imagem"
    );

let eventosCarregados = [];

function limparFormulario() {
    formEvento.reset();

    eventoId.value = "";
    mensagemEvento.textContent = "";

    tituloFormulario.textContent =
        "Cadastrar evento";

    botaoSalvar.textContent =
        "Salvar evento";

    previewImagem.src = "";
    previewImagemContainer.hidden = true;
}

function fecharModalEvento() {
    fecharModal(
        modalEvento,
        limparFormulario
    );
}

function atualizarPreviewImagem() {
    const url =
        campoImagem.value.trim();

    if (!url) {
        previewImagem.src = "";
        previewImagemContainer.hidden = true;

        return;
    }

    previewImagemContainer.hidden = false;
    previewImagem.src = url;
}

async function carregarMinisterios() {
    const resposta =
        await listarMinisterios();

    const ministerios =
        Array.isArray(resposta)
            ? resposta
            : [];

    campoMinisterio.innerHTML = `
        <option value="">
            Selecione um ministério
        </option>
    `;

    ministerios.forEach(ministerio => {
        const option =
            document.createElement("option");

        option.value = ministerio.id;
        option.textContent =
            ministerio.nome;

        campoMinisterio.appendChild(option);
    });
}

function renderizarEventos(eventos) {
    if (
        !Array.isArray(eventos) ||
        !eventos.length
    ) {
        mostrarTabelaVazia(
            listaEventos,
            "Nenhum evento encontrado.",
            4
        );

        return;
    }

    listaEventos.innerHTML =
        eventos
            .map(criarLinhaEventoAdmin)
            .join("");

    configurarFallbackImagens(
        "[data-imagem-evento-admin]",
        "https://placehold.co/300x300?text=Evento"
    );
}

function ordenarEventos(lista) {
    const eventos = [...lista];

    switch (ordenacaoEventos.value) {
        case "titulo":
            eventos.sort(
                (eventoA, eventoB) =>
                    String(
                        eventoA.titulo || ""
                    ).localeCompare(
                        String(
                            eventoB.titulo || ""
                        ),
                        "pt-BR"
                    )
            );
            break;

        case "ministerio":
            eventos.sort(
                (eventoA, eventoB) =>
                    String(
                        eventoA.ministerioNome || ""
                    ).localeCompare(
                        String(
                            eventoB.ministerioNome || ""
                        ),
                        "pt-BR"
                    )
            );
            break;

        case "antigos":
            eventos.sort(
                (eventoA, eventoB) =>
                    Number(eventoA.id || 0) -
                    Number(eventoB.id || 0)
            );
            break;

        case "recentes":
        default:
            eventos.sort(
                (eventoA, eventoB) =>
                    Number(eventoB.id || 0) -
                    Number(eventoA.id || 0)
            );
            break;
    }

    return eventos;
}

function aplicarPesquisaEOrdenacao() {
    const pesquisa =
        normalizarTexto(
            campoPesquisa.value
        );

    const eventosFiltrados =
        eventosCarregados.filter(evento => {
            const titulo =
                normalizarTexto(evento.titulo);

            const descricao =
                normalizarTexto(
                    evento.descricao
                );

            const data =
                normalizarTexto(evento.data);

            const ministerio =
                normalizarTexto(
                    evento.ministerioNome
                );

            return (
                titulo.includes(pesquisa) ||
                descricao.includes(pesquisa) ||
                data.includes(pesquisa) ||
                ministerio.includes(pesquisa)
            );
        });

    renderizarEventos(
        ordenarEventos(eventosFiltrados)
    );
}

async function carregarEventos() {
    mostrarTabelaCarregando(
        listaEventos,
        "Carregando eventos...",
        4
    );

    try {
        const resposta =
            await listarEventos();

        eventosCarregados =
            Array.isArray(resposta)
                ? resposta
                : [];

        aplicarPesquisaEOrdenacao();

    } catch (erro) {
        console.error(
            "Erro ao carregar eventos:",
            erro
        );

        mostrarTabelaErro(
            listaEventos,
            "Não foi possível carregar os eventos.",
            4
        );

        mostrarToast(
            "Não foi possível carregar os eventos.",
            "erro"
        );
    }
}

function iniciarCadastro() {
    limparFormulario();
    abrirModal(modalEvento);

    setTimeout(
        () => campoTitulo.focus(),
        50
    );
}

function obterEventoPorId(id) {
    return eventosCarregados.find(
        evento =>
            Number(evento.id) === Number(id)
    );
}

function iniciarEdicao(id) {
    const evento =
        obterEventoPorId(id);

    if (!evento) {
        mostrarToast(
            "Evento não encontrado.",
            "erro"
        );

        return;
    }

    eventoId.value = evento.id;
    campoTitulo.value = evento.titulo ?? "";
    campoDescricao.value =
        evento.descricao ?? "";
    campoData.value = evento.data ?? "";
    campoImagem.value = evento.imagem ?? "";
    campoMinisterio.value =
        evento.ministerioId ?? "";

    tituloFormulario.textContent =
        "Editar evento";

    botaoSalvar.textContent =
        "Atualizar evento";

    atualizarPreviewImagem();
    abrirModal(modalEvento);
}

async function removerEvento(id) {
    const evento =
        obterEventoPorId(id);

    const confirmou =
        window.confirm(
            `Deseja realmente excluir o evento "${evento?.titulo ?? ""}"?`
        );

    if (!confirmou) {
        return;
    }

    try {
        await excluirEvento(id);

        mostrarToast(
            "Evento excluído com sucesso.",
            "sucesso"
        );

        await carregarEventos();

    } catch (erro) {
        console.error(
            "Erro ao excluir evento:",
            erro
        );

        mostrarToast(
            "Não foi possível excluir o evento.",
            "erro"
        );
    }
}

formEvento.addEventListener(
    "submit",
    async function (event) {
        event.preventDefault();

        const ministerioId =
            Number(campoMinisterio.value);

        if (!ministerioId) {
            mensagemEvento.textContent =
                "Selecione um ministério.";

            mostrarToast(
                "Selecione um ministério.",
                "aviso"
            );

            return;
        }

        const evento = {
            titulo:
                campoTitulo.value.trim(),

            descricao:
                campoDescricao.value.trim(),

            data:
                campoData.value.trim(),

            imagem:
                campoImagem.value.trim(),

            ministerio: {
                id: ministerioId
            }
        };

        botaoSalvar.disabled = true;

        mensagemEvento.textContent =
            "Salvando...";

        try {
            if (eventoId.value) {
                await atualizarEvento(
                    eventoId.value,
                    evento
                );

                mostrarToast(
                    "Evento atualizado com sucesso.",
                    "sucesso"
                );
            } else {
                await criarEvento(evento);

                mostrarToast(
                    "Evento cadastrado com sucesso.",
                    "sucesso"
                );
            }

            fecharModalEvento();
            await carregarEventos();

        } catch (erro) {
            console.error(
                "Erro ao salvar evento:",
                erro
            );

            mensagemEvento.textContent =
                "Não foi possível salvar o evento.";

            mostrarToast(
                "Não foi possível salvar o evento.",
                "erro"
            );

        } finally {
            botaoSalvar.disabled = false;
        }
    }
);

listaEventos.addEventListener(
    "click",
    function (event) {
        const botao =
            event.target.closest(
                "button[data-acao]"
            );

        if (!botao) {
            return;
        }

        const id =
            botao.dataset.id;

        const acao =
            botao.dataset.acao;

        if (acao === "editar") {
            iniciarEdicao(id);
        }

        if (acao === "excluir") {
            removerEvento(id);
        }
    }
);

campoPesquisa.addEventListener(
    "input",
    aplicarPesquisaEOrdenacao
);

ordenacaoEventos.addEventListener(
    "change",
    aplicarPesquisaEOrdenacao
);

campoImagem.addEventListener(
    "input",
    atualizarPreviewImagem
);

previewImagem.addEventListener(
    "error",
    function () {
        previewImagemContainer.hidden = true;
    }
);

previewImagem.addEventListener(
    "load",
    function () {
        previewImagemContainer.hidden = false;
    }
);

botaoNovoEvento.addEventListener(
    "click",
    iniciarCadastro
);

botaoCancelar.addEventListener(
    "click",
    fecharModalEvento
);

botaoFecharModal.addEventListener(
    "click",
    fecharModalEvento
);

modalEvento.addEventListener(
    "click",
    function (event) {
        if (
            event.target.hasAttribute(
                "data-fechar-modal"
            )
        ) {
            fecharModalEvento();
        }
    }
);

document.addEventListener(
    "keydown",
    function (event) {
        if (
            event.key === "Escape" &&
            modalEstaAberto(modalEvento)
        ) {
            fecharModalEvento();
        }
    }
);

async function iniciarPagina() {
    try {
        await carregarMinisterios();
        await carregarEventos();

    } catch (erro) {
        console.error(
            "Erro ao iniciar página de eventos:",
            erro
        );

        mostrarTabelaErro(
            listaEventos,
            "Não foi possível carregar os dados.",
            4
        );

        mostrarToast(
            "Não foi possível carregar os dados da página.",
            "erro"
        );
    }
}

iniciarPagina();