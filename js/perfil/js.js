function changePhoto(event) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function (e) {
            document.getElementById('profile-img').src = e.target.result;
        };
        reader.readAsDataURL(file);
    }
}



function openPasswordModal() {
    document.getElementById('passwordModal').style.display = 'block';
}

function closePasswordModal() {
    document.getElementById('passwordModal').style.display = 'none';
}

// Fecha o modal ao clicar fora do conteúdo
window.onclick = function (event) {
    const modal = document.getElementById('passwordModal');
    if (event.target == modal) {
        modal.style.display = "none";
    }
}