const containers = document.querySelectorAll(".cadaopt");
const contents = document.querySelectorAll(".tab-content");

// Estado inicial: ativa apenas a primeira opção
window.addEventListener("DOMContentLoaded", () => {
    // Remove qualquer 'active' existente por segurança
    containers.forEach(c => c.classList.remove("active"));
    document.querySelectorAll(".configopt h2").forEach(h => h.classList.remove("active"));
    contents.forEach(content => content.style.display = "none");

    // Ativa apenas o primeiro item
    const firstContainer = containers[0];
    const firstTab = firstContainer.querySelector("h2");
    const target = firstTab.getAttribute("data-target");

    firstContainer.classList.add("active");
    firstTab.classList.add("active");
    document.getElementById(target).style.display = "block";
});

// Evento de clique nas opções
containers.forEach(container => {
    container.addEventListener("click", () => {
        const tab = container.querySelector("h2");
        const target = tab.getAttribute("data-target");

        // Remove 'active' de todos
        containers.forEach(c => c.classList.remove("active"));
        document.querySelectorAll(".configopt h2").forEach(h => h.classList.remove("active"));
        contents.forEach(content => content.style.display = "none");

        // Ativa a aba clicada
        container.classList.add("active");
        tab.classList.add("active");
        document.getElementById(target).style.display = "block";
    });
});

document.addEventListener("DOMContentLoaded", () => {
    const isFontEnlarged = localStorage.getItem("fontSizeEnlarged") === "true";

    // Aplica a classe caso esteja ativada
    if (isFontEnlarged) {
        document.documentElement.classList.add("enlarged-font");
    }

    // Se você tiver um botão ou checkbox com id "fontSizeToggle", conecte aqui
    const toggle = document.getElementById("fontSizeToggle");
    if (toggle) {
        toggle.checked = isFontEnlarged;

        toggle.addEventListener("change", (e) => {
            const enlarged = e.target.checked;
            document.documentElement.classList.toggle("enlarged-font", enlarged);
            localStorage.setItem("fontSizeEnlarged", enlarged);
        });
    }
});




