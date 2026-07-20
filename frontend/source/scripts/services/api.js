import {
    getToken,
    logout
} from "./auth.js";

const BASE_URL = "https://churchhub-api-eha7.onrender.com";
const API_URL = `${BASE_URL}/api/v1`;

async function lerCorpoResposta(response) {
    const texto = await response.text();

    if (!texto.trim()) {
        return null;
    }

    try {
        return JSON.parse(texto);
    } catch {
        return texto.trim();
    }
}

function extrairMensagemErro(dados) {
    if (!dados) {
        return null;
    }

    if (typeof dados === "string") {
        return dados;
    }

    return (
        dados.mensagem ??
        dados.message ??
        dados.erro ??
        dados.error ??
        null
    );
}

export async function apiRequest(
    endpoint,
    options = {}
) {
    const headers = {
        Accept: "application/json, text/plain, */*",
        ...options.headers
    };

    const bodyEhFormData =
        options.body instanceof FormData;

    if (
        options.body &&
        !bodyEhFormData
    ) {
        headers["Content-Type"] =
            headers["Content-Type"] ??
            "application/json";
    }

    const token = getToken();

    if (token) {
        headers.Authorization =
            `Bearer ${token}`;
    }

    let response;

    try {
        response = await fetch(
            endpoint,
            {
                ...options,
                headers
            }
        );
    } catch (erro) {
        console.error(
            "Erro de conexão com a API:",
            erro
        );

        throw new Error(
            "Não foi possível conectar ao servidor."
        );
    }

    if (response.status === 401) {
        logout();

        throw new Error(
            "Sua sessão expirou. Entre novamente."
        );
    }

    const dados =
        response.status === 204
            ? null
            : await lerCorpoResposta(response);

    if (response.status === 403) {
        const mensagem =
            extrairMensagemErro(dados);

        throw new Error(
            mensagem ||
            "Você não tem permissão para realizar esta ação."
        );
    }

    if (!response.ok) {
        const mensagem =
            extrairMensagemErro(dados);

        throw new Error(
            mensagem ||
            `Erro na requisição: ${response.status}`
        );
    }

    return dados;
}

function normalizarLista(resposta) {
    if (Array.isArray(resposta)) {
        return resposta;
    }

    if (Array.isArray(resposta?.content)) {
        return resposta.content;
    }

    if (Array.isArray(resposta?.dados)) {
        return resposta.dados;
    }

    if (Array.isArray(resposta?.items)) {
        return resposta.items;
    }

    return [];
}

// ========================================
// EVENTOS
// ========================================

export async function listarEventos() {
    const resposta = await apiRequest(
        `${API_URL}/eventos`
    );

    return normalizarLista(resposta);
}

export async function buscarEventoPorId(id) {
    if (!id) {
        throw new Error(
            "O ID do evento é obrigatório."
        );
    }

    return apiRequest(
        `${API_URL}/eventos/${id}`
    );
}

export async function criarEvento(evento) {
    return apiRequest(
        `${API_URL}/eventos`,
        {
            method: "POST",
            body: JSON.stringify(evento)
        }
    );
}

export async function atualizarEvento(
    id,
    evento
) {
    if (!id) {
        throw new Error(
            "O ID do evento é obrigatório."
        );
    }

    return apiRequest(
        `${API_URL}/eventos/${id}`,
        {
            method: "PUT",
            body: JSON.stringify(evento)
        }
    );
}

export async function excluirEvento(id) {
    if (!id) {
        throw new Error(
            "O ID do evento é obrigatório."
        );
    }

    return apiRequest(
        `${API_URL}/eventos/${id}`,
        {
            method: "DELETE"
        }
    );
}

// ========================================
// MINISTÉRIOS
// ========================================

export async function listarMinisterios() {
    const resposta = await apiRequest(
        `${API_URL}/ministerios`
    );

    return normalizarLista(resposta);
}

export async function buscarMinisterioPorId(
    id
) {
    if (!id) {
        throw new Error(
            "O ID do ministério é obrigatório."
        );
    }

    return apiRequest(
        `${API_URL}/ministerios/${id}`
    );
}

export async function criarMinisterio(
    ministerio
) {
    return apiRequest(
        `${API_URL}/ministerios`,
        {
            method: "POST",
            body: JSON.stringify(ministerio)
        }
    );
}

export async function atualizarMinisterio(
    id,
    ministerio
) {
    if (!id) {
        throw new Error(
            "O ID do ministério é obrigatório."
        );
    }

    return apiRequest(
        `${API_URL}/ministerios/${id}`,
        {
            method: "PUT",
            body: JSON.stringify(ministerio)
        }
    );
}

export async function excluirMinisterio(id) {
    if (!id) {
        throw new Error(
            "O ID do ministério é obrigatório."
        );
    }

    return apiRequest(
        `${API_URL}/ministerios/${id}`,
        {
            method: "DELETE"
        }
    );
}

// ========================================
// CONFIGURAÇÕES
// ========================================

export async function buscarConfiguracoes() {
    return apiRequest(
        `${API_URL}/configuracoes`
    );
}

export async function atualizarConfiguracoes(
    configuracoes
) {
    return apiRequest(
        `${API_URL}/configuracoes`,
        {
            method: "PUT",
            body: JSON.stringify(configuracoes)
        }
    );
}