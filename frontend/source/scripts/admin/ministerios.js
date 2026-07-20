import {
    listarMinisterios,
    criarMinisterio,
    atualizarMinisterio,
    excluirMinisterio
} from "../services/api.js";

import {
    criarLinhaMinisterioAdmin
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
    normalizarTexto
} from "../utils/helpers.js";

import {
    mostrarToast
} from "./toast.js";

const formMinisterio =
    document.getElementById("form-ministerio");

const ministerioId =
    document.getElementById("ministerio-id");

const campoNome =
    document.getElementById("nome");

const campoLider =
    document.getElementById("lider");

const campoDescricao =
    document.getElementById("descricao");

const listaMinisterios =
    document.getElementById(
        "lista-ministerios-admin"
    );

const mensagemMinisterio =
    document.getElementById(
        "mensagem-ministerio"
    );

const tituloFormulario =
    document.getElementById(
        "titulo-formulario"
    );

const botaoNovoMinisterio =
    document.getElementById(
        "btn-novo-ministerio"
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
        "pesquisa-ministerio"
    );

const modalMinisterio =
    document.getElementById(
        "modal-ministerio"
    );

let ministeriosCarregados = [];

function limparFormulario() {
    formMinisterio.reset();

    ministerioId.value = "";
    mensagemMinisterio.textContent = "";

    tituloFormulario.textContent =
        "Cadastrar ministério";

    botaoSalvar.textContent =
        "Salvar ministério";
}

function fecharModalMinisterio() {
    fecharModal(
        modalMinisterio,
        limparFormulario
    );
}

function renderizarMinisterios(
    ministerios
) {
    if (
        !Array.isArray(ministerios) ||
        !ministerios.length
    ) {
        mostrarTabelaVazia(
            listaMinisterios,
            "Nenhum ministério encontrado.",
            4
        );

        return;
    }

    listaMinisterios.innerHTML =
        ministerios
            .map(criarLinhaMinisterioAdmin)
            .join("");
}

function aplicarPesquisa() {
    const pesquisa =
        normalizarTexto(
            campoPesquisa.value
        );

    const ministeriosFiltrados =
        ministeriosCarregados.filter(
            ministerio => {
                const nome =
                    normalizarTexto(
                        ministerio.nome
                    );

                const lider =
                    normalizarTexto(
                        ministerio.lider
                    );

                const descricao =
                    normalizarTexto(
                        ministerio.descricao
                    );

                return (
                    nome.includes(pesquisa) ||
                    lider.includes(pesquisa) ||
                    descricao.includes(pesquisa)
                );
            }
        );

    renderizarMinisterios(
        ministeriosFiltrados
    );
}

async function carregarMinisterios() {
    mostrarTabelaCarregando(
        listaMinisterios,
        "Carregando ministérios...",
        4
    );

    try {
        const resposta =
            await listarMinisterios();

        ministeriosCarregados =
            Array.isArray(resposta)
                ? resposta
                : [];

        aplicarPesquisa();

    } catch (erro) {
        console.error(
            "Erro ao carregar ministérios:",
            erro
        );

        mostrarTabelaErro(
            listaMinisterios,
            "Não foi possível carregar os ministérios.",
            4
        );

        mostrarToast(
            "Não foi possível carregar os ministérios.",
            "erro"
        );
    }
}

function iniciarCadastro() {
    limparFormulario();

    abrirModal(
        modalMinisterio
    );

    setTimeout(
        () => campoNome.focus(),
        50
    );
}

function obterMinisterioPorId(id) {
    return ministeriosCarregados.find(
        ministerio =>
            Number(ministerio.id) ===
            Number(id)
    );
}

function iniciarEdicao(id) {
    const ministerio =
        obterMinisterioPorId(id);

    if (!ministerio) {
        mostrarToast(
            "Ministério não encontrado.",
            "erro"
        );

        return;
    }

    ministerioId.value =
        ministerio.id;

    campoNome.value =
        ministerio.nome ?? "";

    campoLider.value =
        ministerio.lider ?? "";

    campoDescricao.value =
        ministerio.descricao ?? "";

    tituloFormulario.textContent =
        "Editar ministério";

    botaoSalvar.textContent =
        "Atualizar ministério";

    abrirModal(
        modalMinisterio
    );
}

async function removerMinisterio(id) {
    const ministerio =
        obterMinisterioPorId(id);

    const confirmou =
        window.confirm(
            `Deseja realmente excluir o ministério "${ministerio?.nome ?? ""}"?`
        );

    if (!confirmou) {
        return;
    }

    try {
        await excluirMinisterio(id);

        mostrarToast(
            "Ministério excluído com sucesso.",
            "sucesso"
        );

        await carregarMinisterios();

    } catch (erro) {
        console.error(
            "Erro ao excluir ministério:",
            erro
        );

        mostrarToast(
            "Não foi possível excluir o ministério. Verifique se existem eventos vinculados.",
            "erro",
            5000
        );
    }
}

formMinisterio.addEventListener(
    "submit",
    async function (event) {
        event.preventDefault();

        const ministerio = {
            nome:
                campoNome.value.trim(),

            lider:
                campoLider.value.trim(),

            descricao:
                campoDescricao.value.trim()
        };

        botaoSalvar.disabled = true;

        mensagemMinisterio.textContent =
            "Salvando...";

        try {
            if (ministerioId.value) {
                await atualizarMinisterio(
                    ministerioId.value,
                    ministerio
                );

                mostrarToast(
                    "Ministério atualizado com sucesso.",
                    "sucesso"
                );
            } else {
                await criarMinisterio(
                    ministerio
                );

                mostrarToast(
                    "Ministério cadastrado com sucesso.",
                    "sucesso"
                );
            }

            fecharModalMinisterio();

            await carregarMinisterios();

        } catch (erro) {
            console.error(
                "Erro ao salvar ministério:",
                erro
            );

            mensagemMinisterio.textContent =
                "Não foi possível salvar o ministério.";

            mostrarToast(
                "Não foi possível salvar o ministério.",
                "erro"
            );

        } finally {
            botaoSalvar.disabled = false;
        }
    }
);

listaMinisterios.addEventListener(
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
            removerMinisterio(id);
        }
    }
);

campoPesquisa.addEventListener(
    "input",
    aplicarPesquisa
);

botaoNovoMinisterio.addEventListener(
    "click",
    iniciarCadastro
);

botaoCancelar.addEventListener(
    "click",
    fecharModalMinisterio
);

botaoFecharModal.addEventListener(
    "click",
    fecharModalMinisterio
);

modalMinisterio.addEventListener(
    "click",
    function (event) {
        if (
            event.target.hasAttribute(
                "data-fechar-modal"
            )
        ) {
            fecharModalMinisterio();
        }
    }
);

document.addEventListener(
    "keydown",
    function (event) {
        if (
            event.key === "Escape" &&
            modalEstaAberto(
                modalMinisterio
            )
        ) {
            fecharModalMinisterio();
        }
    }
);

carregarMinisterios();