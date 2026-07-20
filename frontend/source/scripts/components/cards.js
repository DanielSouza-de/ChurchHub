import {
    escaparHtml,
    formatarData,
    limitarTexto
} from "../utils/helpers.js";

const IMAGEM_EVENTO =
    "https://placehold.co/600x400?text=Encontro";

const IMAGEM_EVENTO_ADMIN =
    "https://placehold.co/300x300?text=Evento";

export function criarCardEventoHome(evento) {
    const imagem =
        evento.imagem?.trim() ||
        IMAGEM_EVENTO;

    const titulo =
        evento.titulo?.trim() ||
        "Encontro sem título";

    const descricao =
        evento.descricao?.trim() ||
        "Sem descrição disponível.";

    const data =
        formatarData(evento.data);

    const ministerioNome =
        evento.ministerioNome?.trim();

    return `
        <article class="card-encontros card-evento-home">

            <img
                class="img-encontros"
                src="${escaparHtml(imagem)}"
                alt="${escaparHtml(titulo)}"
                loading="lazy"
                data-imagem-evento-home
            >

            <h3 class="subtitulo-encontros">
                ${escaparHtml(titulo)}
            </h3>

            <div class="legenda-cultos">

                <p class="paragrafo-encontros">
                    ${escaparHtml(descricao)}
                </p>

                <p class="paragrafo-encontros">
                    ${escaparHtml(data)}
                </p>

                ${
                    ministerioNome
                        ? `
                            <p class="paragrafo-encontros">
                                <strong>Ministério:</strong>
                                ${escaparHtml(ministerioNome)}
                            </p>
                        `
                        : ""
                }

            </div>

        </article>
    `;
}

export function criarCardMinisterioHome(
    ministerio
) {
    const nome =
        ministerio.nome?.trim() ||
        "Ministério sem nome";

    const descricao =
        ministerio.descricao?.trim() ||
        "Sem descrição disponível.";

    const lider =
        ministerio.lider?.trim() ||
        "Não informado";

    return `
        <article class="card-identidade card-ministerio-home">

            <h3>
                ${escaparHtml(nome)}
            </h3>

            <p>
                ${escaparHtml(descricao)}
            </p>

            <p>
                <strong>Líder:</strong>
                ${escaparHtml(lider)}
            </p>

        </article>
    `;
}

export function criarCardEventoPublico(evento) {
    const titulo =
        evento.titulo?.trim() ||
        "Encontro sem título";

    const descricao =
        evento.descricao?.trim() ||
        "Sem descrição disponível.";

    const data =
        formatarData(evento.data);

    const imagem =
        evento.imagem?.trim() ||
        IMAGEM_EVENTO;

    const ministerioNome =
        evento.ministerioNome?.trim();

    return `
        <article class="card-encontros card-evento-publico">

            <div class="card-evento-publico__imagem">

                <img
                    class="img-encontros"
                    src="${escaparHtml(imagem)}"
                    alt="${escaparHtml(titulo)}"
                    loading="lazy"
                    data-imagem-evento
                >

            </div>

            <div class="card-evento-publico__conteudo">

                ${
                    ministerioNome
                        ? `
                            <span class="card-evento-publico__ministerio">
                                ${escaparHtml(ministerioNome)}
                            </span>
                        `
                        : ""
                }

                <h3 class="subtitulo-encontros">
                    ${escaparHtml(titulo)}
                </h3>

                <p class="card-evento-publico__data">
                    ${escaparHtml(data)}
                </p>

                <p class="paragrafo-encontros">
                    ${escaparHtml(descricao)}
                </p>

            </div>

        </article>
    `;
}

export function criarCardMinisterioPublico(
    ministerio
) {
    const nome =
        ministerio.nome?.trim() ||
        "Ministério sem nome";

    const descricao =
        limitarTexto(
            ministerio.descricao?.trim() ||
            "Sem descrição disponível."
        );

    const lider =
        ministerio.lider?.trim() ||
        "Não informado";

    const quantidadeEventos =
        Array.isArray(ministerio.eventos)
            ? ministerio.eventos.length
            : 0;

    return `
        <article class="card-ministerio-publico">

            <div class="card-ministerio-publico__topo">

                <span class="ministerio-tag">
                    MINISTÉRIO
                </span>

                <h3>
                    ${escaparHtml(nome)}
                </h3>

            </div>

            <p class="card-ministerio-publico__descricao">
                ${escaparHtml(descricao)}
            </p>

            <div class="card-ministerio-publico__rodape">

                <p>
                    <strong>Líder:</strong>
                    ${escaparHtml(lider)}
                </p>

                <p>
                    <strong>Eventos:</strong>
                    ${quantidadeEventos}
                </p>

            </div>

        </article>
    `;
}

export function criarLinhaEventoAdmin(evento) {
    const imagem =
        evento.imagem?.trim() ||
        IMAGEM_EVENTO_ADMIN;

    const titulo =
        evento.titulo?.trim() ||
        "Evento sem título";

    const descricao =
        evento.descricao?.trim() ||
        "Sem descrição";

    const data =
        evento.data ||
        "Não informada";

    const ministerio =
        evento.ministerioNome ||
        "Não informado";

    return `
        <tr>
            <td>
                <div class="admin-table__event">

                    <img
                        src="${escaparHtml(imagem)}"
                        alt="${escaparHtml(titulo)}"
                        data-imagem-evento-admin
                    >

                    <div class="admin-table__event-info">

                        <strong>
                            ${escaparHtml(titulo)}
                        </strong>

                        <span>
                            ${escaparHtml(descricao)}
                        </span>

                    </div>

                </div>
            </td>

            <td>
                ${escaparHtml(data)}
            </td>

            <td>
                ${escaparHtml(ministerio)}
            </td>

            <td>
                <div class="admin-table__actions">

                    <button
                        type="button"
                        class="admin-table__edit"
                        data-acao="editar"
                        data-id="${evento.id}"
                    >
                        Editar
                    </button>

                    <button
                        type="button"
                        class="admin-table__delete"
                        data-acao="excluir"
                        data-id="${evento.id}"
                    >
                        Excluir
                    </button>

                </div>
            </td>
        </tr>
    `;
}

export function criarLinhaMinisterioAdmin(
    ministerio
) {
    const nome =
        ministerio.nome?.trim() ||
        "Ministério sem nome";

    const lider =
        ministerio.lider?.trim() ||
        "Não informado";

    const descricao =
        ministerio.descricao?.trim() ||
        "Sem descrição";

    return `
        <tr>
            <td>
                <strong>
                    ${escaparHtml(nome)}
                </strong>
            </td>

            <td>
                ${escaparHtml(lider)}
            </td>

            <td>
                ${escaparHtml(descricao)}
            </td>

            <td>
                <div class="admin-table__actions">

                    <button
                        type="button"
                        class="admin-table__edit"
                        data-acao="editar"
                        data-id="${ministerio.id}"
                    >
                        Editar
                    </button>

                    <button
                        type="button"
                        class="admin-table__delete"
                        data-acao="excluir"
                        data-id="${ministerio.id}"
                    >
                        Excluir
                    </button>

                </div>
            </td>
        </tr>
    `;
}