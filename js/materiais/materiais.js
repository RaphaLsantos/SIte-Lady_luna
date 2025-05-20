let materials = JSON.parse(localStorage.getItem('materials')) || [];

const container = document.getElementById('cardsContainer');
const counter = document.getElementById('counter');
const searchInput = document.getElementById('searchInput');
const addBtn = document.getElementById('addMaterialBtn');
const confirmDeleteBtn = document.getElementById('confirmDeleteBtn');

let deleteIndex = null;

// Renderiza os cards
function renderMaterials() {
    container.innerHTML = '';

    materials.forEach((material, index) => {
        const card = document.createElement('div');
        card.classList.add('card');

        card.innerHTML = `
            <h3>${material.name}</h3>
            <p>${material.details}</p>
            <button onclick="viewDetails(${index})">🔍</button>
            <button onclick="askDelete(${index})">🗑️</button>
        `;

        container.appendChild(card);
    });

    counter.textContent = `(${materials.length})`;
}

// Adiciona um novo material
function addMaterial() {
    const name = document.getElementById('newName').value.trim();
    const details = document.getElementById('newDetails').value.trim();

    if (!name || !details) {
        alert("Preencha todos os campos.");
        return;
    }

    materials.push({ name, details });
    localStorage.setItem('materials', JSON.stringify(materials));
    renderMaterials();
    closeModal('addModal');
    document.getElementById('newName').value = '';
    document.getElementById('newDetails').value = '';
}

// Mostra detalhes
function viewDetails(index) {
    const material = materials[index];
    const detailsText = document.getElementById('detailsText');
    detailsText.textContent = `${material.name}\n\n${material.details}`;
    openModal('detailsModal');
}

// Confirma exclusão
function askDelete(index) {
    deleteIndex = index;
    openModal('deleteModal');
}

// Exclui material
confirmDeleteBtn.addEventListener('click', () => {
    if (deleteIndex !== null) {
        materials.splice(deleteIndex, 1);
        localStorage.setItem('materials', JSON.stringify(materials));
        renderMaterials();
        closeModal('deleteModal');
        deleteIndex = null;
    }
});

// Pesquisa em tempo real
searchInput.addEventListener('input', () => {
    const value = searchInput.value.toLowerCase();
    const cards = container.querySelectorAll('.card');

    cards.forEach(card => {
        const visible = card.textContent.toLowerCase().includes(value);
        card.style.display = visible ? 'block' : 'none';
    });
});

// Abre modal
function openModal(id) {
    document.getElementById(id).style.display = 'flex';
}

// Fecha modal
function closeModal(id) {
    document.getElementById(id).style.display = 'none';
}

// Fecha modal ao clicar fora
window.addEventListener('click', (e) => {
    ['detailsModal', 'addModal', 'deleteModal'].forEach(id => {
        const modal = document.getElementById(id);
        if (e.target === modal) modal.style.display = 'none';
    });
});

// Botão ➕
addBtn.addEventListener('click', () => openModal('addModal'));

// Inicializa a página
renderMaterials();