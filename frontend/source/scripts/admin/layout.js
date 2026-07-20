import {
    logout,
    estaAutenticado
} from "../services/auth.js";

const sidebarContainer = document.getElementById(
    "sidebar-container"
);

const topbarContainer = document.getElementById(
    "topbar-container"
);

function protegerPagina() {
    if (!estaAutenticado()) {
        window.location.replace("./login.html");
        return false;
    }

    return true;
}

async function carregarComponente(container, caminho) {
    if (!container) {
        return;
    }

    const resposta = await fetch(caminho);

    if (!resposta.ok) {
        throw new Error(
            `Não foi possível carregar o componente: ${caminho}`
        );
    }

    container.innerHTML = await resposta.text();
}

function marcarPaginaAtual() {
    const paginaAtual =
        document.body.dataset.adminPage;

    const linkAtual = document.querySelector(
        `[data-page="${paginaAtual}"]`
    );

    linkAtual?.classList.add("ativo");
}

function configurarLogout() {
    const botaoLogout = document.getElementById(
        "btn-logout-sidebar"
    );

    botaoLogout?.addEventListener("click", function () {
        logout();
        window.location.href = "./login.html";
    });
}

function configurarSidebar() {
    const sidebar = document.getElementById(
        "admin-sidebar"
    );

    const botaoSidebar = document.getElementById(
        "btn-sidebar"
    );

    botaoSidebar?.addEventListener("click", function () {
        sidebar?.classList.toggle("aberta");
    });
}

function configurarTitulo() {
    const titulo = document.body.dataset.pageTitle;
    const elementoTitulo = document.getElementById(
        "admin-page-title"
    );

    if (titulo && elementoTitulo) {
        elementoTitulo.textContent = titulo;
    }
}

async function iniciarLayoutAdmin() {
    if (!protegerPagina()) {
        return;
    }

    try {
        await Promise.all([
            carregarComponente(
                sidebarContainer,
                "./components/sidebar.html"
            ),
            carregarComponente(
                topbarContainer,
                "./components/topbar.html"
            )
        ]);

        marcarPaginaAtual();
        configurarLogout();
        configurarSidebar();
        configurarTitulo();

        document.dispatchEvent(
            new CustomEvent("adminLayoutReady")
        );
    } catch (erro) {
        console.error(
            "Erro ao carregar o layout administrativo:",
            erro
        );
    }
}

iniciarLayoutAdmin();