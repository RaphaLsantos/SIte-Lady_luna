let recipes = [
    {
        name: "Bolo de Morango",
        ingredients: "2 xícaras de farinha de trigo\n1 xícara de leite Ninho\n1/2 xícara de açúcar\n1/2 xícara de manteiga...",
        image: ""
    },
    {
        name: "Bolo de Chocolate",
        ingredients: "3 ovos\n1 ½ xícara de açúcar\n2 xícaras de farinha de trigo...",
        image: ""
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
        const imageURL = r.image ? r.image : 'https://via.placeholder.com/250x150';
        card.innerHTML = `
      <img src="${imageURL}" alt="${r.name}" />
      <div class="top-right">
        <button onclick="editRecipe(${i})">✏️</button>
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
    const recipe = recipes[index];
    document.getElementById('detailsText').innerText = recipe.ingredients;
    document.getElementById('detailsImage').src = recipe.image || 'https://via.placeholder.com/250x150';
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
    const fileInput = document.getElementById('newImage');
    const file = fileInput.files[0];

    if (name && ingredients) {
        const reader = new FileReader();
        reader.onload = function (e) {
            const image = e.target.result;
            recipes.push({ name, ingredients, image });
            renderCards();
            closeModal('addModal');
            document.getElementById('newName').value = '';
            document.getElementById('newIngredients').value = '';
            fileInput.value = '';
        };
        if (file) reader.readAsDataURL(file);
        else {
            recipes.push({ name, ingredients, image: '' });
            renderCards();
            closeModal('addModal');
            document.getElementById('newName').value = '';
            document.getElementById('newIngredients').value = '';
            fileInput.value = '';
        }
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

let recipeToEdit = null;
function editRecipe(index) {
    recipeToEdit = index;
    document.getElementById('editName').value = recipes[index].name;
    document.getElementById('editIngredients').value = recipes[index].ingredients;
    document.getElementById('editImage').value = '';
    document.getElementById('editModal').style.display = 'flex';
}

function saveEditRecipe() {
    const name = document.getElementById('editName').value;
    const ingredients = document.getElementById('editIngredients').value;
    const fileInput = document.getElementById('editImage');
    const file = fileInput.files[0];

    if (name && ingredients && recipeToEdit !== null) {
        if (file) {
            const reader = new FileReader();
            reader.onload = function (e) {
                const image = e.target.result;
                recipes[recipeToEdit] = { name, ingredients, image };
                renderCards();
                closeModal('editModal');
                recipeToEdit = null;
            };
            reader.readAsDataURL(file);
        } else {
            const oldImage = recipes[recipeToEdit].image;
            recipes[recipeToEdit] = { name, ingredients, image: oldImage };
            renderCards();
            closeModal('editModal');
            recipeToEdit = null;
        }
    }
}

searchInput.addEventListener('input', renderCards);
window.onload = renderCards;