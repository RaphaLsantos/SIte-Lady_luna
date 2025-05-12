// Highlight menu item on hover com som leve (efeito visual)
const menuLinks = document.querySelectorAll(".menu a");

menuLinks.forEach(link => {
    link.addEventListener("mouseenter", () => {
        link.classList.add("hovered");
    });

    link.addEventListener("mouseleave", () => {
        link.classList.remove("hovered");
    });
});

// Feedback ao clicar no botão "Nova Transação"
const newBtn = document.querySelector(".new-btn");
if (newBtn) {
    newBtn.addEventListener("click", () => {
        // Mostra o modal
        const modal = document.getElementById("transactionModal");
        if (modal) modal.style.display = "flex";
    });
}

// Efeito de clique nas cards
const cards = document.querySelectorAll(".card");
cards.forEach(card => {
    card.addEventListener("click", () => {
        card.classList.add("clicked");
        setTimeout(() => card.classList.remove("clicked"), 300);
    });
});

// Gráfico de barras
const ctx = document.getElementById('barChart').getContext('2d');
new Chart(ctx, {
    type: 'bar',
    data: {
        labels: ['Jan', 'Fev', 'Mar', 'Abr'],
        datasets: [{
            label: 'Quantidade Vendida',
            data: [48, 42, 26, 18],
            backgroundColor: 'rgba(244, 162, 97, 0.7)',
            borderRadius: 6,
        }]
    },
    options: {
        responsive: true,
        scales: {
            y: {
                beginAtZero: true
            }
        }
    }
});

/*inicio modal*/

// Fechar modal
const closeModal = document.getElementById("closeModal");
const modal = document.getElementById("transactionModal");

if (closeModal && modal) {
    closeModal.addEventListener("click", () => {
        modal.style.display = "none";
    });

    window.addEventListener("click", (e) => {
        if (e.target === modal) {
            modal.style.display = "none";
        }
    });
}

// Submissão do formulário de nova transação
const form = document.getElementById("transactionForm");
if (form) {
    form.addEventListener("submit", (e) => {
        e.preventDefault();

        const desc = form.description.value;
        const amount = form.amount.value;
        const date = form.date.value;

        alert(`Transação salva:\n${desc} - ${amount} em ${date}`);

        form.reset();
        modal.style.display = "none";
    });
}

/*final modal*/
