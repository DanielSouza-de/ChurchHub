import {
    listarEventos,
    listarMinisterios
} from "../services/api.js";

const totalEventos = document.getElementById("total-eventos");
const totalMinisterios = document.getElementById("total-ministerios");
const eventosRecentes = document.getElementById("eventos-recentes");
const mensagemDashboard = document.getElementById("mensagem-dashboard");

function escaparHtml(valor) {
    const elemento = document.createElement("div");

    elemento.textContent = valor ?? "";

    return elemento.innerHTML;
}

function renderizarEventosRecentes(eventos) {
    if (!eventosRecentes) {
        return;
    }

    if (!Array.isArray(eventos) || eventos.length === 0) {
        eventosRecentes.innerHTML = `
            <tr>
                <td colspan="4">
                    Nenhum evento cadastrado.
                </td>
            </tr>
        `;

        return;
    }

    eventosRecentes.innerHTML = eventos
        .slice(-5)
        .reverse()
        .map(evento => `
            <tr>
                <td>
                    <div class="admin-table__event">
                        <img
                            src="${escaparHtml(evento.imagem)}"
                            alt="${escaparHtml(evento.titulo)}"
                        >

                        <strong>
                            ${escaparHtml(evento.titulo)}
                        </strong>
                    </div>
                </td>

                <td>
                    ${escaparHtml(evento.data)}
                </td>

                <td>
                    ${escaparHtml(
                        evento.ministerioNome ?? "Não informado"
                    )}
                </td>

                <td>
                    <a
                        href="./eventos.html"
                        class="admin-table__action"
                    >
                        Gerenciar
                    </a>
                </td>
            </tr>
        `)
        .join("");
}

async function carregarDashboard() {
    try {
        const [eventos, ministerios] = await Promise.all([
            listarEventos(),
            listarMinisterios()
        ]);

        totalEventos.textContent = eventos.length;
        totalMinisterios.textContent = ministerios.length;

        renderizarEventosRecentes(eventos);

    } catch (erro) {
        console.error("Erro ao carregar dashboard:", erro);

        totalEventos.textContent = "-";
        totalMinisterios.textContent = "-";

        eventosRecentes.innerHTML = `
            <tr>
                <td colspan="4">
                    Não foi possível carregar os eventos.
                </td>
            </tr>
        `;

        mensagemDashboard.textContent =
            "Não foi possível carregar os dados do painel.";
    }
}

carregarDashboard();