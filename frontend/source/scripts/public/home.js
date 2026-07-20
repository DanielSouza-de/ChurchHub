import {
    listarEventos,
    listarMinisterios
} from "../services/api.js";

import {
    criarCardEventoHome,
    criarCardMinisterioHome
} from "../components/cards.js";

import {
    mostrarCarregando,
    mostrarErro,
    mostrarVazio
} from "../components/loading.js";

import {
    configurarFallbackImagens,
    obterTimestamp
} from "../utils/helpers.js";

const listaEventosHome =
    document.getElementById("lista-eventos-home");

const listaMinisteriosHome =
    document.getElementById("lista-ministerios-home");

function ordenarEventos(eventos) {
    return [...eventos].sort(
        (eventoA, eventoB) => {
            const dataA =
                obterTimestamp(eventoA.data);

            const dataB =
                obterTimestamp(eventoB.data);

            if (dataA !== dataB) {
                return dataA - dataB;
            }

            return (
                Number(eventoB.id || 0) -
                Number(eventoA.id || 0)
            );
        }
    );
}

function ordenarMinisterios(ministerios) {
    return [...ministerios].sort(
        (ministerioA, ministerioB) =>
            String(
                ministerioA.nome || ""
            ).localeCompare(
                String(
                    ministerioB.nome || ""
                ),
                "pt-BR"
            )
    );
}

async function carregarEventosHome() {
    if (!listaEventosHome) {
        return;
    }

    mostrarCarregando(
        listaEventosHome,
        "Carregando encontros..."
    );

    try {
        const resposta = await listarEventos();

        const eventos =
            Array.isArray(resposta)
                ? resposta
                : [];

        if (!eventos.length) {
            mostrarVazio(
                listaEventosHome,
                "Nenhum encontro cadastrado",
                "Os próximos encontros aparecerão aqui."
            );

            return;
        }

        const eventosDestaque =
            ordenarEventos(eventos)
                .slice(0, 3);

        listaEventosHome.innerHTML =
            eventosDestaque
                .map(criarCardEventoHome)
                .join("");

        configurarFallbackImagens(
            "[data-imagem-evento-home]",
            "https://placehold.co/600x400?text=Encontro"
        );

    } catch (erro) {
        console.error(
            "Erro ao carregar eventos da página inicial:",
            erro
        );

        mostrarErro(
            listaEventosHome,
            {
                titulo:
                    "Não foi possível carregar os encontros",
                mensagem:
                    "Verifique se a API está funcionando."
            }
        );
    }
}

async function carregarMinisteriosHome() {
    if (!listaMinisteriosHome) {
        return;
    }

    mostrarCarregando(
        listaMinisteriosHome,
        "Carregando ministérios..."
    );

    try {
        const resposta =
            await listarMinisterios();

        const ministerios =
            Array.isArray(resposta)
                ? resposta
                : [];

        if (!ministerios.length) {
            mostrarVazio(
                listaMinisteriosHome,
                "Nenhum ministério cadastrado",
                "Os ministérios aparecerão aqui."
            );

            return;
        }

        const ministeriosDestaque =
            ordenarMinisterios(ministerios)
                .slice(0, 3);

        listaMinisteriosHome.innerHTML =
            ministeriosDestaque
                .map(criarCardMinisterioHome)
                .join("");

    } catch (erro) {
        console.error(
            "Erro ao carregar ministérios da página inicial:",
            erro
        );

        mostrarErro(
            listaMinisteriosHome,
            {
                titulo:
                    "Não foi possível carregar os ministérios",
                mensagem:
                    "Verifique se a API está funcionando."
            }
        );
    }
}

async function iniciarHome() {
    await Promise.all([
        carregarEventosHome(),
        carregarMinisteriosHome()
    ]);
}

iniciarHome();