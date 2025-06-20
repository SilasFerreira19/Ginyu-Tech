const substore = document.querySelector(".substore");
const itemBoxes = document.querySelectorAll(".item_box h2");

const subAbas = {
    "Roupas": document.getElementById("aba_roupas"),
    "Acessórios": document.getElementById("aba_acess"),
    "Octoken": document.getElementById("aba_octoken"),
    "Item": document.getElementById("aba_item")
};

function showElementWithTransition(toShow, toHide) {
    toHide.classList.remove("active");
    setTimeout(() => {
        toHide.style.display = "none";
        toShow.style.display = "flex";
        setTimeout(() => {
            toShow.classList.add("active");
        }, 10);
    }, 400);
}

itemBoxes.forEach(box => {
    box.parentElement.addEventListener("click", () => {
        const aba = subAbas[box.textContent.trim()];
        if (aba) {
            showElementWithTransition(aba, substore);
        }
    });
});

Object.values(subAbas).forEach(aba => {
    const btn = aba.querySelector(".btn-voltar");
    btn.addEventListener("click", () => {
        showElementWithTransition(substore, aba);
    });
});

window.addEventListener("DOMContentLoaded", () => {
    substore.style.display = "flex";
    substore.classList.add("active");
});

// Seletores do modal padrão
const modal = document.getElementById("modalCompra");
const fecharModal = document.getElementById("fecharModal");
const modalNome = document.getElementById("modalNome");
const modalImagem = document.getElementById("modalImagem");

// Seletores do modal de Octoken (exclusivo)
const modalOctoken = document.getElementById("modalOctoken");
const fecharModalOctoken = document.getElementById("fecharModalOctoken");
const modalNomeOctoken = document.getElementById("modalNomeOctoken");
const modalImagemOctoken = document.getElementById("modalImagemOctoken");
const precoReais = document.getElementById("precoReais");
const modalQtdOctoken = document.getElementById("modalQtdOctoken");

// Modal padrão (roupas, acessórios, itens)
function abrirModal(nome, imagemSrc, precoPolvoeda, precoOctoken) {
    // Fecha outro modal, se estiver aberto
    modalOctoken.style.display = "none";

    modalNome.textContent = nome;
    modalImagem.src = imagemSrc;
    document.getElementById("valorPolvoeda").textContent = precoPolvoeda;
    document.getElementById("valorOctoken").textContent = precoOctoken;
    modal.style.display = "flex";
}

// Modal exclusivo para compra de Octokens com R$
function abrirModalOctoken(nome, imagemSrc, precoR$, qtdOctokens) {
    // Fecha outro modal, se estiver aberto
    modal.style.display = "none";

    modalNomeOctoken.textContent = nome;
    modalImagemOctoken.src = imagemSrc;
    precoReais.textContent = precoR$;
    modalQtdOctoken.textContent = `Quantidade: ${qtdOctokens} Octokens`;
    modalOctoken.style.display = "flex";
}

// Fechar os modais
fecharModal.onclick = () => modal.style.display = "none";
fecharModalOctoken.onclick = () => modalOctoken.style.display = "none";

window.onclick = (e) => {
    if (e.target === modal) modal.style.display = "none";
    if (e.target === modalOctoken) modalOctoken.style.display = "none";
};

// Botões de compra - roupas, acessórios e itens (exceto Octoken)
document.querySelectorAll(".item_loja button, #aba_acess .item_octoken button, #aba_item .item_octoken button").forEach(botao => {
    botao.addEventListener("click", (e) => {
        const itemBox = e.target.closest(".item_loja") || e.target.closest(".item_octoken");
        const nome = itemBox.querySelector("h1").textContent;
        const imagem = itemBox.querySelector("img").src;
        const valores = itemBox.querySelectorAll(".tokenstore h2");
        const precoPolvoeda = valores[0]?.textContent || "0";
        const precoOctoken = valores[1]?.textContent || "0";
        abrirModal(nome, imagem, precoPolvoeda, precoOctoken);
    });
});

// Botões de compra da aba Octoken (compra com dinheiro)
document.querySelectorAll("#aba_octoken .item_octoken button").forEach(botao => {
    botao.addEventListener("click", (e) => {
        const itemBox = e.target.closest(".item_octoken");
        const nome = itemBox.querySelector("h1").textContent;
        const imagem = itemBox.querySelector("img").src;
        const preco = itemBox.querySelector("h3").textContent;
        const qtd = itemBox.querySelector("h2").textContent;
        abrirModalOctoken(nome, imagem, preco, qtd);
    });
});
