import {
    login,
    redirecionarUsuarioAutenticado
} from "../services/auth.js";

const formLogin =
    document.getElementById("form-login");

const campoEmail =
    document.getElementById("email");

const campoSenha =
    document.getElementById("senha");

const mensagemLogin =
    document.getElementById(
        "mensagem-login"
    );

const botaoEntrar =
    document.getElementById("btn-entrar");

function definirMensagem(
    mensagem,
    tipo = ""
) {
    if (!mensagemLogin) {
        return;
    }

    mensagemLogin.textContent = mensagem;

    mensagemLogin.classList.remove(
        "erro",
        "sucesso",
        "carregando"
    );

    if (tipo) {
        mensagemLogin.classList.add(tipo);
    }
}

function definirFormularioCarregando(
    carregando
) {
    if (botaoEntrar) {
        botaoEntrar.disabled = carregando;

        botaoEntrar.textContent =
            carregando
                ? "Entrando..."
                : "Entrar";
    }

    if (campoEmail) {
        campoEmail.disabled = carregando;
    }

    if (campoSenha) {
        campoSenha.disabled = carregando;
    }
}

function validarFormulario() {
    const email = campoEmail?.value.trim();
    const senha = campoSenha?.value ?? "";

    if (!email || !senha) {
        definirMensagem(
            "Preencha o e-mail e a senha.",
            "erro"
        );

        return null;
    }

    if (!campoEmail.checkValidity()) {
        definirMensagem(
            "Informe um endereço de e-mail válido.",
            "erro"
        );

        campoEmail.focus();

        return null;
    }

    return {
        email,
        senha
    };
}

async function realizarLogin(event) {
    event.preventDefault();

    const credenciais =
        validarFormulario();

    if (!credenciais) {
        return;
    }

    definirMensagem(
        "Validando seus dados...",
        "carregando"
    );

    definirFormularioCarregando(true);

    try {
        await login(
            credenciais.email,
            credenciais.senha
        );

        definirMensagem(
            "Login realizado com sucesso.",
            "sucesso"
        );

        window.location.replace(
            "./dashboard.html"
        );
    } catch (erro) {
        console.error(
            "Erro ao realizar login:",
            erro
        );

        definirMensagem(
            erro.message ||
            "Não foi possível realizar o login.",
            "erro"
        );

        campoSenha.value = "";
        campoSenha.focus();
    } finally {
        definirFormularioCarregando(false);
    }
}

function iniciarPaginaLogin() {
    if (
        redirecionarUsuarioAutenticado(
            "./dashboard.html"
        )
    ) {
        return;
    }

    if (
        !formLogin ||
        !campoEmail ||
        !campoSenha ||
        !botaoEntrar
    ) {
        console.error(
            "Os elementos necessários da página de login não foram encontrados."
        );

        return;
    }

    formLogin.addEventListener(
        "submit",
        realizarLogin
    );

    campoEmail.focus();
}

iniciarPaginaLogin();