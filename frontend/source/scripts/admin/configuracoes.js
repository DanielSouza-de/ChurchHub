import {
    buscarConfiguracoes,
    atualizarConfiguracoes
} from "../services/api.js";

import { mostrarToast } from "./toast.js";

const formConfiguracoes = document.getElementById(
    "form-configuracoes"
);

const campoNomeIgreja = document.getElementById(
    "nome-igreja"
);

const campoSlogan = document.getElementById(
    "slogan"
);

const campoNomePastor = document.getElementById(
    "nome-pastor"
);

const campoFotoPastor = document.getElementById(
    "foto-pastor"
);

const campoTextoApresentacao = document.getElementById(
    "texto-apresentacao"
);

const campoEndereco = document.getElementById(
    "endereco"
);

const campoTelefone = document.getElementById(
    "telefone"
);

const campoWhatsapp = document.getElementById(
    "whatsapp"
);

const campoEmail = document.getElementById(
    "email"
);

const campoInstagram = document.getElementById(
    "instagram"
);

const campoFacebook = document.getElementById(
    "facebook"
);

const campoYoutube = document.getElementById(
    "youtube"
);

const campoLogo = document.getElementById(
    "logo"
);

const campoBanner = document.getElementById(
    "banner"
);

const previewFotoPastorContainer =
    document.getElementById(
        "preview-foto-pastor-container"
    );

const previewFotoPastor = document.getElementById(
    "preview-foto-pastor"
);

const previewLogoContainer = document.getElementById(
    "preview-logo-container"
);

const previewLogo = document.getElementById(
    "preview-logo"
);

const previewBannerContainer =
    document.getElementById(
        "preview-banner-container"
    );

const previewBanner = document.getElementById(
    "preview-banner"
);

const mensagemConfiguracoes =
    document.getElementById(
        "mensagem-configuracoes"
    );

const botaoSalvar = document.getElementById(
    "btn-salvar-configuracoes"
);

function atualizarPreview(
    campo,
    imagem,
    container
) {
    const url = campo.value.trim();

    if (!url) {
        imagem.removeAttribute("src");
        container.hidden = true;
        return;
    }

    container.hidden = true;
    imagem.src = url;
}

function configurarEventosPreview(
    campo,
    imagem,
    container
) {
    campo.addEventListener(
        "input",
        function () {
            atualizarPreview(
                campo,
                imagem,
                container
            );
        }
    );

    imagem.addEventListener(
        "load",
        function () {
            container.hidden = false;
        }
    );

    imagem.addEventListener(
        "error",
        function () {
            container.hidden = true;
        }
    );
}

function preencherFormulario(configuracoes) {
    campoNomeIgreja.value =
        configuracoes.nomeIgreja ?? "";

    campoSlogan.value =
        configuracoes.slogan ?? "";

    campoNomePastor.value =
        configuracoes.nomePastor ?? "";

    campoFotoPastor.value =
        configuracoes.fotoPastor ?? "";

    campoTextoApresentacao.value =
        configuracoes.textoApresentacao ?? "";

    campoEndereco.value =
        configuracoes.endereco ?? "";

    campoTelefone.value =
        configuracoes.telefone ?? "";

    campoWhatsapp.value =
        configuracoes.whatsapp ?? "";

    campoEmail.value =
        configuracoes.email ?? "";

    campoInstagram.value =
        configuracoes.instagram ?? "";

    campoFacebook.value =
        configuracoes.facebook ?? "";

    campoYoutube.value =
        configuracoes.youtube ?? "";

    campoLogo.value =
        configuracoes.logo ?? "";

    campoBanner.value =
        configuracoes.banner ?? "";

    atualizarPreview(
        campoFotoPastor,
        previewFotoPastor,
        previewFotoPastorContainer
    );

    atualizarPreview(
        campoLogo,
        previewLogo,
        previewLogoContainer
    );

    atualizarPreview(
        campoBanner,
        previewBanner,
        previewBannerContainer
    );
}

async function carregarConfiguracoes() {
    try {
        mensagemConfiguracoes.textContent =
            "Carregando configurações...";

        const configuracoes =
            await buscarConfiguracoes();

        preencherFormulario(configuracoes);

        mensagemConfiguracoes.textContent = "";

    } catch (erro) {
        console.error(
            "Erro ao carregar configurações:",
            erro
        );

        mensagemConfiguracoes.textContent =
            "Não foi possível carregar as configurações.";

        mostrarToast(
            "Não foi possível carregar as configurações.",
            "erro"
        );
    }
}

formConfiguracoes.addEventListener(
    "submit",
    async function (event) {
        event.preventDefault();

        const configuracoes = {
            nomeIgreja:
                campoNomeIgreja.value.trim(),

            slogan:
                campoSlogan.value.trim(),

            nomePastor:
                campoNomePastor.value.trim(),

            fotoPastor:
                campoFotoPastor.value.trim(),

            textoApresentacao:
                campoTextoApresentacao.value.trim(),

            endereco:
                campoEndereco.value.trim(),

            telefone:
                campoTelefone.value.trim(),

            whatsapp:
                campoWhatsapp.value.trim(),

            email:
                campoEmail.value.trim(),

            instagram:
                campoInstagram.value.trim(),

            facebook:
                campoFacebook.value.trim(),

            youtube:
                campoYoutube.value.trim(),

            logo:
                campoLogo.value.trim(),

            banner:
                campoBanner.value.trim()
        };

        botaoSalvar.disabled = true;

        mensagemConfiguracoes.textContent =
            "Salvando...";

        try {
            const configuracoesAtualizadas =
                await atualizarConfiguracoes(
                    configuracoes
                );

            preencherFormulario(
                configuracoesAtualizadas
            );

            mensagemConfiguracoes.textContent = "";

            mostrarToast(
                "Configurações atualizadas com sucesso.",
                "sucesso"
            );

        } catch (erro) {
            console.error(
                "Erro ao salvar configurações:",
                erro
            );

            mensagemConfiguracoes.textContent =
                "Não foi possível salvar as configurações.";

            mostrarToast(
                "Não foi possível salvar as configurações.",
                "erro"
            );

        } finally {
            botaoSalvar.disabled = false;
        }
    }
);

configurarEventosPreview(
    campoFotoPastor,
    previewFotoPastor,
    previewFotoPastorContainer
);

configurarEventosPreview(
    campoLogo,
    previewLogo,
    previewLogoContainer
);

configurarEventosPreview(
    campoBanner,
    previewBanner,
    previewBannerContainer
);

carregarConfiguracoes();