import { escaparHtml } from "../utils/helpers.js";

export function mostrarLinhaTabela(
    elemento,
    mensagem,
    quantidadeColunas = 4
) {
    if (!elemento) {
        return;
    }

    elemento.innerHTML = `
        <tr>
            <td colspan="${quantidadeColunas}">
                ${escaparHtml(mensagem)}
            </td>
        </tr>
    `;
}

export function mostrarTabelaCarregando(
    elemento,
    mensagem = "Carregando...",
    quantidadeColunas = 4
) {
    mostrarLinhaTabela(
        elemento,
        mensagem,
        quantidadeColunas
    );
}

export function mostrarTabelaVazia(
    elemento,
    mensagem = "Nenhum registro encontrado.",
    quantidadeColunas = 4
) {
    mostrarLinhaTabela(
        elemento,
        mensagem,
        quantidadeColunas
    );
}

export function mostrarTabelaErro(
    elemento,
    mensagem = "Não foi possível carregar os dados.",
    quantidadeColunas = 4
) {
    mostrarLinhaTabela(
        elemento,
        mensagem,
        quantidadeColunas
    );
}