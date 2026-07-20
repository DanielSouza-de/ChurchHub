import {
    buscarConfiguracoes
} from "../services/api.js";

const configuracoesPadrao = {
    nomeIgreja: "Nome da Igreja",
    slogan: "Uma comunidade para acolher, servir e transformar vidas",
    nomePastor: "Nome do Pastor",
    fotoPastor: "",
    textoApresentacao:
        "Escreva aqui uma apresentação da igreja, sua missão, seus valores e a mensagem que deseja transmitir aos visitantes.",
    endereco: "Endereço da igreja",
    telefone: "",
    whatsapp: "",
    email: "",
    instagram: "",
    facebook: "",
    youtube: "",
    logo: "https://placehold.co/300x300?text=Logo",
    banner: "https://placehold.co/1920x1080?text=Banner"
};

document.addEventListener(
    "DOMContentLoaded",
    carregarConfiguracoesSite
);

async function carregarConfiguracoesSite() {
    try {
        const configuracoesRecebidas =
        await buscarConfiguracoes();

        const configuracoes = {
            ...configuracoesPadrao,
            ...configuracoesRecebidas
        };

        aplicarConfiguracoes(configuracoes);

    } catch (error) {
        console.error(
            "Não foi possível carregar as configurações do site:",
            error
        );

        aplicarConfiguracoes(
            configuracoesPadrao
        );
    }
}

function aplicarConfiguracoes(configuracoes) {
    atualizarTitulo(configuracoes);
    atualizarLogo(configuracoes);
    atualizarBanner(configuracoes);
    atualizarApresentacao(configuracoes);
    atualizarFotoPastor(configuracoes);
    atualizarFooter(configuracoes);
    atualizarRedesSociais(configuracoes);
}

function atualizarTitulo(configuracoes) {
    const nomeIgreja =
        configuracoes.nomeIgreja?.trim() ||
        configuracoesPadrao.nomeIgreja;

    document.title = nomeIgreja;

    definirTexto(
        "nome-igreja-banner",
        nomeIgreja
    );

    definirTexto(
        "nome-igreja-footer",
        nomeIgreja
    );

    definirTexto(
        "titulo-apresentacao",
        `Bem-vindos ao ${nomeIgreja}!`
    );
}

function atualizarLogo(configuracoes) {
    const logo =
        document.getElementById("logo-site");

    const favicon =
        document.getElementById("favicon-site");

    const urlLogo =
        configuracoes.logo?.trim() ||
        configuracoesPadrao.logo;

    if (logo) {
        logo.src = urlLogo;

        logo.alt =
            `Logo ${
                configuracoes.nomeIgreja?.trim() ||
                configuracoesPadrao.nomeIgreja
            }`;

        logo.addEventListener(
            "error",
            function () {
                logo.src =
                    configuracoesPadrao.logo;
            },
            {
                once: true
            }
        );
    }

    if (favicon) {
        favicon.href = urlLogo;
    }
}

function atualizarBanner(configuracoes) {
    const banner =
        document.getElementById("banner-site");

    if (!banner) {
        return;
    }

    const urlBanner =
        configuracoes.banner?.trim();

    if (urlBanner) {
        banner.style.backgroundImage =
            `linear-gradient(
                rgba(0, 0, 0, 0.45),
                rgba(0, 0, 0, 0.45)
            ), url("${urlBanner}")`;

        banner.style.backgroundSize =
            "cover";

        banner.style.backgroundPosition =
            "center";

        banner.style.backgroundRepeat =
            "no-repeat";
    }

    definirTexto(
        "slogan-site",
        configuracoes.slogan?.trim() ||
            configuracoesPadrao.slogan
    );
}

function atualizarApresentacao(configuracoes) {
    definirTexto(
        "texto-apresentacao",
        configuracoes.textoApresentacao?.trim() ||
            configuracoesPadrao.textoApresentacao
    );

    const nomePastor =
        configuracoes.nomePastor?.trim() ||
        configuracoesPadrao.nomePastor;

    definirTexto(
        "nome-pastor",
        `Pr. ${nomePastor}`
    );
}

function atualizarFotoPastor(configuracoes) {
    const fotoPastor =
        document.getElementById(
            "foto-pastor-site"
        );

    if (!fotoPastor) {
        return;
    }

    const fotoOriginal =
        fotoPastor.getAttribute("src") || "";

    const urlFotoPastor =
        configuracoes.fotoPastor?.trim();

    fotoPastor.alt =
        `Pastor ${
            configuracoes.nomePastor?.trim() ||
            configuracoesPadrao.nomePastor
        }`;

    if (!urlFotoPastor) {
        return;
    }

    fotoPastor.addEventListener(
        "error",
        function () {
            if (fotoOriginal) {
                fotoPastor.src =
                    fotoOriginal;
            }
        },
        {
            once: true
        }
    );

    fotoPastor.src =
        urlFotoPastor;
}

function atualizarFooter(configuracoes) {
    definirTexto(
        "slogan-footer",
        configuracoes.slogan?.trim() ||
            configuracoesPadrao.slogan
    );

    definirTexto(
        "endereco-footer",
        configuracoes.endereco?.trim() ||
            configuracoesPadrao.endereco
    );

    configurarTelefone(
        configuracoes.telefone
    );

    configurarWhatsapp(
        configuracoes.whatsapp
    );

    configurarEmail(
        configuracoes.email
    );
}

function configurarTelefone(telefone) {
    const container =
        document.getElementById(
            "telefone-container"
        );

    const link =
        document.getElementById(
            "telefone-footer"
        );

    const telefoneLimpo =
        telefone?.trim();

    if (!container || !link) {
        return;
    }

    if (!telefoneLimpo) {
        container.style.display =
            "none";

        return;
    }

    container.style.display = "";

    link.textContent =
        telefoneLimpo;

    link.href =
        `tel:${somenteNumeros(
            telefoneLimpo
        )}`;
}

function configurarWhatsapp(whatsapp) {
    const container =
        document.getElementById(
            "whatsapp-container"
        );

    const link =
        document.getElementById(
            "whatsapp-footer"
        );

    const whatsappLimpo =
        whatsapp?.trim();

    if (!container || !link) {
        return;
    }

    if (!whatsappLimpo) {
        container.style.display =
            "none";

        return;
    }

    let numero =
        somenteNumeros(
            whatsappLimpo
        );

    if (
        numero.length === 10 ||
        numero.length === 11
    ) {
        numero =
            `55${numero}`;
    }

    container.style.display = "";

    link.textContent =
        `WhatsApp: ${whatsappLimpo}`;

    link.href =
        `https://wa.me/${numero}`;

    link.target = "_blank";

    link.rel =
        "noopener noreferrer";
}

function configurarEmail(email) {
    const container =
        document.getElementById(
            "email-container"
        );

    const link =
        document.getElementById(
            "email-footer"
        );

    const emailLimpo =
        email?.trim();

    if (!container || !link) {
        return;
    }

    if (!emailLimpo) {
        container.style.display =
            "none";

        return;
    }

    container.style.display = "";

    link.textContent =
        emailLimpo;

    link.href =
        `mailto:${emailLimpo}`;
}

function atualizarRedesSociais(configuracoes) {
    configurarRedeSocial(
        "facebook-site",
        configuracoes.facebook
    );

    configurarRedeSocial(
        "instagram-site",
        configuracoes.instagram
    );

    configurarRedeSocial(
        "youtube-site",
        configuracoes.youtube
    );
}

function configurarRedeSocial(
    elementoId,
    url
) {
    const elemento =
        document.getElementById(
            elementoId
        );

    if (!elemento) {
        return;
    }

    const urlLimpa =
        url?.trim();

    if (!urlLimpa) {
        elemento.style.display =
            "none";

        return;
    }

    elemento.style.display = "";

    elemento.href =
        urlLimpa;

    elemento.target =
        "_blank";

    elemento.rel =
        "noopener noreferrer";
}

function definirTexto(
    elementoId,
    texto
) {
    const elemento =
        document.getElementById(
            elementoId
        );

    if (!elemento) {
        return;
    }

    elemento.textContent =
        texto || "";
}

function somenteNumeros(valor) {
    return String(
        valor || ""
    ).replace(/\D/g, "");
}