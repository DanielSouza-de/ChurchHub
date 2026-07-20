export function escaparHtml(valor) {
    const elemento = document.createElement("div");

    elemento.textContent = valor ?? "";

    return elemento.innerHTML;
}

export function normalizarTexto(valor) {
    return String(valor ?? "")
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .toLowerCase()
        .trim();
}

export function limitarTexto(texto, limite = 160) {
    const textoNormalizado = String(texto ?? "").trim();

    if (!textoNormalizado) {
        return "";
    }

    if (textoNormalizado.length <= limite) {
        return textoNormalizado;
    }

    return `${textoNormalizado
        .substring(0, limite)
        .trim()}...`;
}

export function somenteNumeros(valor) {
    return String(valor ?? "").replace(/\D/g, "");
}

export function obterTimestamp(data) {
    if (!data) {
        return Number.MAX_SAFE_INTEGER;
    }

    const dataDireta = new Date(data);

    if (!Number.isNaN(dataDireta.getTime())) {
        return dataDireta.getTime();
    }

    const partes = String(data)
        .split(/[/-]/)
        .map(Number);

    if (partes.length !== 3) {
        return Number.MAX_SAFE_INTEGER;
    }

    const [primeira, segunda, terceira] = partes;

    if (
        String(data).includes("/") &&
        primeira <= 31
    ) {
        const dataBrasileira = new Date(
            terceira,
            segunda - 1,
            primeira
        );

        return dataBrasileira.getTime();
    }

    return Number.MAX_SAFE_INTEGER;
}

export function formatarData(data) {
    if (!data) {
        return "Data não informada";
    }

    const timestamp = obterTimestamp(data);

    if (timestamp === Number.MAX_SAFE_INTEGER) {
        return String(data);
    }

    return new Intl.DateTimeFormat(
        "pt-BR",
        {
            day: "2-digit",
            month: "long",
            year: "numeric"
        }
    ).format(new Date(timestamp));
}

export function configurarFallbackImagens(
    seletor,
    imagemFallback
) {
    const imagens = document.querySelectorAll(seletor);

    imagens.forEach(imagem => {
        imagem.addEventListener(
            "error",
            function () {
                imagem.src = imagemFallback;
            },
            {
                once: true
            }
        );
    });
}