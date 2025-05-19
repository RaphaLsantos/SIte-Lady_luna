let recipes = [
    {
        name: "Bolo de Morango",
        ingredients: "2 xícaras de farinha de trigo\n1 xícara de leite Ninho\n1/2 xícara de açúcar\n1/2 xícara de manteiga..."
    },
    {
        name: "Bolo de Chocolate",
        ingredients: "3 ovos\n1 ½ xícara de açúcar\n2 xícaras de farinha de trigo..."
    }
];

const searchInput = document.getElementById('searchInput');

function renderCards() {
    const container = document.getElementById('cardsContainer');
    container.innerHTML = '';
    const search = searchInput.value.toLowerCase();
    const filtered = recipes.filter(r => r.name.toLowerCase().includes(search));
    filtered.forEach((r, i) => {
        const card = document.createElement('div');
        card.className = 'card';
        card.innerHTML = `
          <img src="https://via.placeholder.com/250x150" alt="${r.name}" />
          <div class="top-right">
            <button onclick="confirmDelete(${i})">🗑️</button>
          </div>
          <div class="info">
            <h2>Nome da receita:<br><span>${r.name}</span></h2>
            <p><strong>Receita:</strong><br>${r.ingredients.split('\n').slice(0, 3).join('<br>')}...</p>
            <button class="details" onclick="showDetails(${i})">Mais Detalhes</button>
          </div>
        `;
        container.appendChild(card);
    });
    document.getElementById('counter').innerText = `(${filtered.length})`;
}

function showDetails(index) {
    document.getElementById('detailsText').innerText = recipes[index].ingredients;
    document.getElementById('detailsModal').style.display = 'flex';
}

function closeModal(id) {
    document.getElementById(id).style.display = 'none';
}

document.getElementById('addRecipeBtn').onclick = () => {
    document.getElementById('addModal').style.display = 'flex';
};

function addRecipe() {
    const name = document.getElementById('newName').value;
    const ingredients = document.getElementById('newIngredients').value;
    if (name && ingredients) {
        recipes.push({ name, ingredients });
        renderCards();
        closeModal('addModal');
        document.getElementById('newName').value = '';
        document.getElementById('newIngredients').value = '';
    }
}

let recipeToDelete = null;
function confirmDelete(index) {
    recipeToDelete = index;
    document.getElementById('deleteModal').style.display = 'flex';
}

document.getElementById('confirmDeleteBtn').onclick = () => {
    if (recipeToDelete !== null) {
        recipes.splice(recipeToDelete, 1);
        renderCards();
        closeModal('deleteModal');
        recipeToDelete = null;
    }
};

searchInput.addEventListener('input', renderCards);

window.onload = renderCards;