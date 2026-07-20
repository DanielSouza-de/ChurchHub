const TEMPO_PADRAO = 3500;

function obterContainer() {
    let container = document.getElementById("toast-container");

    if (!container) {
        container = document.createElement("div");
        container.id = "toast-container";
        container.className = "toast-container";

        document.body.appendChild(container);
    }

    return container;
}

export function mostrarToast(
    mensagem,
    tipo = "sucesso",
    duracao = TEMPO_PADRAO
) {
    const container = obterContainer();

    const toast = document.createElement("div");

    toast.className = `toast toast--${tipo}`;
    toast.setAttribute("role", "status");

    const icones = {
        sucesso: "✓",
        erro: "×",
        aviso: "!",
        info: "i"
    };

    toast.innerHTML = `
        <span class="toast__icone">
            ${icones[tipo] ?? icones.info}
        </span>

        <p class="toast__mensagem"></p>

        <button
            type="button"
            class="toast__fechar"
            aria-label="Fechar notificação"
        >
            ×
        </button>
    `;

    toast.querySelector(".toast__mensagem").textContent =
        mensagem;

    function removerToast() {
        toast.classList.add("toast--saindo");

        setTimeout(() => {
            toast.remove();
        }, 250);
    }

    toast
        .querySelector(".toast__fechar")
        .addEventListener("click", removerToast);

    container.appendChild(toast);

    requestAnimationFrame(() => {
        toast.classList.add("toast--visivel");
    });

    setTimeout(removerToast, duracao);
}