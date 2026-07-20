import {
    obterItem,
    removerItem,
    salvarItem
} from "./storage.js";

const BASE_URL = "https://churchhub-api-eha7.onrender.com";
const AUTH_URL = `${BASE_URL}/auth`;

const TOKEN_KEY = "token";
const USUARIO_KEY = "usuario";

export function getToken() {
    return obterItem(TOKEN_KEY);
}

export function getUsuario() {
    const usuario = obterItem(USUARIO_KEY);

    if (!usuario) {
        return null;
    }

    try {
        return JSON.parse(usuario);
    } catch (erro) {
        console.error(
            "Não foi possível interpretar os dados do usuário:",
            erro
        );

        removerItem(USUARIO_KEY);

        return null;
    }
}

export function estaAutenticado() {
    return Boolean(getToken());
}

export function salvarSessao(dados) {
    if (!dados?.token) {
        throw new Error(
            "O servidor não retornou um token válido."
        );
    }

    salvarItem(TOKEN_KEY, dados.token);

    const usuario =
        dados.usuario ??
        dados.user ??
        dados.nome ??
        null;

    if (usuario) {
        salvarItem(USUARIO_KEY, usuario);
    }
}

export async function login(email, senha) {
    const emailNormalizado = email?.trim();

    if (!emailNormalizado || !senha) {
        throw new Error(
            "Informe o e-mail e a senha."
        );
    }

    let response;

    try {
        response = await fetch(
            `${AUTH_URL}/login`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    email: emailNormalizado,
                    senha
                })
            }
        );
    } catch (erro) {
        console.error(
            "Erro de conexão durante o login:",
            erro
        );

        throw new Error(
            "Não foi possível conectar ao servidor."
        );
    }

    if (!response.ok) {
        let mensagem =
            "E-mail ou senha inválidos.";

        try {
            const respostaErro =
                await response.text();

            if (respostaErro?.trim()) {
                mensagem = respostaErro;
            }
        } catch (erro) {
            console.error(
                "Não foi possível ler a resposta de erro:",
                erro
            );
        }

        throw new Error(mensagem);
    }

    const dados = await response.json();

    salvarSessao(dados);

    return dados;
}

export function logout() {
    removerItem(TOKEN_KEY);
    removerItem(USUARIO_KEY);
}

export function exigirAutenticacao(
    paginaLogin = "./login.html"
) {
    if (estaAutenticado()) {
        return true;
    }

    window.location.replace(paginaLogin);

    return false;
}

export function redirecionarUsuarioAutenticado(
    paginaDestino = "./dashboard.html"
) {
    if (!estaAutenticado()) {
        return false;
    }

    window.location.replace(paginaDestino);

    return true;
}