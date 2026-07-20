const storageDisponivel = (() => {
    try {
        const chaveTeste = "__storage_test__";

        localStorage.setItem(chaveTeste, chaveTeste);
        localStorage.removeItem(chaveTeste);

        return true;
    } catch (erro) {
        console.error(
            "O armazenamento local não está disponível:",
            erro
        );

        return false;
    }
})();

export function salvarItem(chave, valor) {
    if (!storageDisponivel) {
        return false;
    }

    try {
        const valorNormalizado =
            typeof valor === "string"
                ? valor
                : JSON.stringify(valor);

        localStorage.setItem(
            chave,
            valorNormalizado
        );

        return true;
    } catch (erro) {
        console.error(
            `Não foi possível salvar "${chave}" no armazenamento:`,
            erro
        );

        return false;
    }
}

export function obterItem(
    chave,
    valorPadrao = null
) {
    if (!storageDisponivel) {
        return valorPadrao;
    }

    try {
        const valor = localStorage.getItem(chave);

        return valor ?? valorPadrao;
    } catch (erro) {
        console.error(
            `Não foi possível obter "${chave}" do armazenamento:`,
            erro
        );

        return valorPadrao;
    }
}

export function obterItemJson(
    chave,
    valorPadrao = null
) {
    const valor = obterItem(chave);

    if (valor === null) {
        return valorPadrao;
    }

    try {
        return JSON.parse(valor);
    } catch (erro) {
        console.error(
            `O valor armazenado em "${chave}" não contém um JSON válido:`,
            erro
        );

        return valorPadrao;
    }
}

export function removerItem(chave) {
    if (!storageDisponivel) {
        return false;
    }

    try {
        localStorage.removeItem(chave);

        return true;
    } catch (erro) {
        console.error(
            `Não foi possível remover "${chave}" do armazenamento:`,
            erro
        );

        return false;
    }
}

export function limparStorage() {
    if (!storageDisponivel) {
        return false;
    }

    try {
        localStorage.clear();

        return true;
    } catch (erro) {
        console.error(
            "Não foi possível limpar o armazenamento:",
            erro
        );

        return false;
    }
}