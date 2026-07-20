export function abrirModal(modal) {
    if (!modal) {
        return;
    }

    modal.classList.add("aberto");
    modal.setAttribute("aria-hidden", "false");

    document.body.classList.add("modal-aberto");
}

export function fecharModal(
    modal,
    aoFechar = null
) {
    if (!modal) {
        return;
    }

    modal.classList.remove("aberto");
    modal.setAttribute("aria-hidden", "true");

    document.body.classList.remove("modal-aberto");

    if (typeof aoFechar === "function") {
        aoFechar();
    }
}

export function modalEstaAberto(modal) {
    return Boolean(
        modal?.classList.contains("aberto")
    );
}