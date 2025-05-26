// Variável para armazenar a receita atual no modal
    let receitaAtual = null;
    let todasReceitas = [];
    let modoEdicao = false;

// Função principal ao carregar a página
document.addEventListener('DOMContentLoaded', async () => {
    try {
        const receitas = await getDadosReceita();
        todasReceitas = receitas;
        exibirReceitas(receitas);
        
        // Configurar eventos dos botões do modal
        document.getElementById('btn-editar').addEventListener('click', editarReceita);
        document.getElementById('btn-excluir').addEventListener('click', excluirReceita);
        document.getElementById('btn-produzir').addEventListener('click', produzirReceita);
        
    } catch (error) {
        console.error('Erro ao carregar receitas:', error);
        alert('Não foi possível carregar as receitas. Tente novamente mais tarde.');
    }
});

// Função para buscar receitas da API
async function getDadosReceita() {
    try {
        const response = await fetch('http://localhost:8081/receita');
        if (!response.ok) {
            throw new Error(`Erro HTTP: ${response.status}`);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Erro ao buscar dados:', error);
        document.getElementById('loading').textContent = 'Erro ao carregar receitas.';
        return [];
    }
}

// Função para exibir as receitas na página
function exibirReceitas(receitas) {
    const container = document.getElementById('receitas-container');
    
    if (!receitas || receitas.length === 0) {
        container.innerHTML = '<p class="sem-receitas">Nenhuma receita encontrada.</p>';
        return;
    }
    
    container.innerHTML = receitas.map(receita => `
    <div class="card-receita" data-id="${receita.id_receita}">
        <div class="card-imagem" style="background-image: url('https://source.unsplash.com/random/300x200/?${encodeURIComponent(receita.nome)}')">
            <div class="card-icone-categoria" title="${formatarCategoria(receita.categoria)}">
                ${getIconeCategoria(receita.categoria)}
            </div>
        </div>
        <div class="card-conteudo">
            <h3 class="card-titulo">${receita.nome}</h3>
            <p class="card-descricao">${receita.descricao}</p>
            
            <div class="card-info">
                <span class="card-tempo">
                    ⏱️ ${receita.tempo_preparo} min
                </span>
                <span class="card-porcoes">
                    👨‍👩‍👧‍👦 ${receita.porcoes} porções
                </span>
            </div>
            
            <span class="card-categoria">${formatarCategoria(receita.categoria)}</span>
        </div>
    </div>
    `).join('');

    // Adiciona evento de clique para cada card
    document.querySelectorAll('.card-receita').forEach(card => {
        card.addEventListener('click', () => {
            const receitaId = card.getAttribute('data-id');
            const receita = receitas.find(r => r.id_receita == receitaId);
            abrirModalReceita(receita);
        });
    });
}


// Função para abrir o modal com os detalhes da receita
async function abrirModalReceita(receita) {
    receitaAtual = receita;
    const modal = document.getElementById('modal-ingredientes');
    const titulo = document.getElementById('modal-titulo');
    const ingredientesLista = document.getElementById('modal-ingredientes-lista');
    const preparo = document.getElementById('modal-preparo');

    // Define o título do modal
    titulo.textContent = receita.nome;

    // Busca os ingredientes da receita
    try {
        const response = await fetch(`http://localhost:8081/ingredientes/${receita.id_receita}`);
        if (!response.ok) {
            throw new Error(`Erro HTTP: ${response.status}`);
        }
        const ingredientes = await response.json();

        // Preenche a lista de ingredientes com a estrutura da sua API
        ingredientesLista.innerHTML = ingredientes.map(ing => {
            // Formata a quantidade para remover zeros desnecessários
            let quantidade = ing.quantidade;
            if (quantidade.endsWith('.000')) {
                quantidade = quantidade.replace('.000', '');
            }
            
            // Formata a unidade de medida (remove plural se quantidade for 1)
            let unidade = ing.unidade_medida;
            if (quantidade === '1' && unidade.endsWith('s')) {
                unidade = unidade.slice(0, -1);
            }
            
            return `<li>${quantidade} ${unidade} de ${ing.nome_item}</li>`;
        }).join('');
        
    } catch (error) {
        console.error('Erro ao buscar ingredientes:', error);
        ingredientesLista.innerHTML = '<li>Não foi possível carregar os ingredientes</li>';
    }

    // Preenche o modo de preparo (se disponível)
    preparo.textContent = receita.modo_preparo || 'Modo de preparo não disponível.';

    // Exibe o modal
    modal.style.display = 'block';

    // Configura os eventos para fechar o modal
    configurarFecharModal(modal);
}

// Função auxiliar para configurar os eventos de fechar o modal
function configurarFecharModal(modal) {
    // Fecha o modal quando clicar no X
    document.querySelector('.close-modal').onclick = function() {
        modal.style.display = 'none';
    };

    // Fecha o modal quando clicar fora dele
    window.onclick = function(event) {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    };

    // Fecha o modal com a tecla ESC
    document.onkeydown = function(event) {
        if (event.key === "Escape") {
            modal.style.display = 'none';
        }
    };
}

// Função para formatar a categoria
function formatarCategoria(categoria) {
    const formatacoes = {
        'bolos': 'Bolo',
        'tortas': 'Torta',
        'salgados': 'Salgado',
        'doces': 'Doce',
        'bebidas': 'Bebida'
    };
    
    return formatacoes[categoria] || categoria;
}

// Função para editar receita
async function editarReceita() {
    if (!receitaAtual) return;

    modoEdicao = true;

    // Preenche os campos do formulário
    document.getElementById('nomeReceita').value = receitaAtual.nome;
    document.getElementById('descricaoReceita').value = receitaAtual.descricao;
    document.getElementById('tempoPreparo').value = receitaAtual.tempo_preparo;
    document.getElementById('porcoes').value = receitaAtual.porcoes;
    document.getElementById('categoriaReceita').value = receitaAtual.categoria;

    // Limpa ingredientes anteriores do formulário
    document.getElementById('ingredientesContainer').innerHTML = '';

    // Carrega os ingredientes da receita
    fetch(`http://localhost:8081/ingredientes/${receitaAtual.id_receita}`)
        .then(res => res.json())
        .then(ingredientes => {
            ingredientes.forEach(ing => {
                const clone = ingredienteTemplate.content.cloneNode(true);
                const select = clone.querySelector('.ingrediente-select');
                const quantidade = clone.querySelector('.quantidade');
                const observacoes = clone.querySelector('.observacoes');

                // Popular o select com itens do estoque
                select.innerHTML = '<option value="" disabled>Selecione um item</option>';
                estoqueItens.forEach(item => {
                    const option = document.createElement('option');
                    option.value = item.id_item;
                    option.textContent = item.nome;
                    if (item.nome === ing.nome_item || item.id_item === ing.id_item) {
                        option.selected = true;
                    }
                    select.appendChild(option);
                });

                quantidade.value = ing.quantidade;
                observacoes.value = ing.observacoes || '';

                // Botão de remover
                clone.querySelector('.remover-ingrediente').addEventListener('click', function() {
                    this.closest('.ingrediente-item').remove();
                });

                ingredientesContainer.appendChild(clone);
            });

            // Abre o modal no modo edição
            receitaModal.style.display = 'block';
        })
        .catch(err => {
            console.error('Erro ao carregar ingredientes:', err);
            alert('Erro ao carregar os ingredientes da receita.');
        });
}

// Função para excluir receita
async function excluirReceita() {
// Verifica se há uma receita selecionada e confirma com o usuário
    if (!receitaAtual || !confirm(`Tem certeza que deseja excluir "${receitaAtual.nome}"?`)) {
        return; // Sai da função se não houver receita ou se o usuário cancelar
    }

    try {
        // Envia requisição DELETE para a API
        const response = await fetch(`http://localhost:8081/receita/${receitaAtual.id_receita}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                // Adicione outros headers se necessário (ex: token de autenticação)
            }
        });

        console.log('Excluindo receita:', receitaAtual);
        
        // Verifica se a resposta não foi bem-sucedida
        if (!response.ok) {
            throw new Error(`Erro HTTP! status: ${response.status}`);
        }

        alert('Receita excluída com sucesso!');
        
        // Fecha o modal de ingredientes
        document.getElementById('modal-ingredientes').style.display = 'none';
        
        // Atualiza a lista local removendo a receita excluída
        todasReceitas = todasReceitas.filter(r => r.id_receita !== receitaAtual.id_receita);
        
        // Atualiza a exibição das receitas
        exibirReceitas(todasReceitas);
        
    } catch (error) {
        console.error('Erro ao excluir receita:', error);
        alert(`Falha ao excluir receita: ${error.message}`);
    }
}

// Função para produzir receita
async function produzirReceita() {
    if (receitaAtual) {
        try {
            const response = await fetch(`http://localhost:8081/receita/${receitaAtual.id_receita}/produzir`, {
                method: 'POST'
            });
            
            if (response.ok) {
                const resultado = await response.json();
                alert(`Produção de "${receitaAtual.nome}" iniciada com sucesso!`);
                console.log('Resultado da produção:', resultado);
            } else {
                throw new Error('Falha ao registrar produção');
            }
        } catch (error) {
            console.error('Erro ao produzir receita:', error);
            alert('Erro ao iniciar produção da receita');
        }
    }
}

// Função para obter ícone baseado na categoria
function getIconeCategoria(categoria) {
    const icones = {
        'bolos': '🎂',
        'tortas': '🥧',
        'salgados': '🥨',
        'doces': '🍬',
        'bebidas': '🥤',
        'massas': '🍝',
        'sopas': '🍲',
        'saladas': '🥗',
        'carnes': '🍖',
        'aves': '🍗',
        'peixes': '🐟',
        'vegetariano': '🥦',
        'vegano': '🌱',
        'lanches': '🍔',
        'pães': '🍞'
    };
    
    return icones[categoria.toLowerCase()] || '🍽️';
}

document.addEventListener('DOMContentLoaded', function() {
    // Elementos do modal
    const receitaModal = document.getElementById('receitaModal');
    const btnAbrirModal = document.getElementById('btn-adicionar');
    const btnFecharModal = document.querySelector('.close-modal');
    const btnCancelar = document.getElementById('cancelarReceita');

    // Elementos do formulário
    const ingredientesContainer = document.getElementById('ingredientesContainer');
    const ingredienteTemplate = document.getElementById('ingredienteTemplate');
    const btnAdicionarIngrediente = document.getElementById('adicionarIngrediente');
    const btnSalvarReceita = document.getElementById('salvarReceita');

    // Variável para armazenar os itens do estoque
    let estoqueItens = [];

    // Funções para controlar o modal
    function abrirModal() {
        receitaModal.style.display = 'block';
        carregarItensEstoque();
        adicionarCampoIngrediente();
    }

    function fecharModal() {
    receitaModal.style.display = 'none';
    limparFormulario();
    modoEdicao = false;
    receitaAtual = null;
}

    // Event listeners para o modal
    btnAbrirModal.addEventListener('click', abrirModal);
    btnFecharModal.addEventListener('click', fecharModal);
    btnCancelar.addEventListener('click', fecharModal);

    // Fechar modal ao clicar fora do conteúdo
    window.addEventListener('click', function(event) {
        if (event.target === receitaModal) {
            fecharModal();
        }
});
            
            // Restante das funções (carregarItensEstoque, adicionarCampoIngrediente, salvarReceita, limparFormulario)
            // ... (mantenha as mesmas funções do seu código original, apenas remova as referências ao Bootstrap)
            
function carregarItensEstoque() {
    fetch('http://localhost:8081/estoque')
        .then(response => {
            if (!response.ok) {
                throw new Error('Erro na requisição');
            }
            return response.json();
        })
        .then(data => {
            console.log('Dados recebidos do estoque:', data); // Adicione esta linha
            estoqueItens = data;
        })
        .catch(error => console.error('Erro ao carregar estoque:', error));
}   
            
function adicionarCampoIngrediente() {
    // Verifica se há itens no estoque
    if (estoqueItens.length === 0) {
        alert('Carregando itens do estoque... Por favor, aguarde.');
        carregarItensEstoque().then(() => {
            // Chama a função novamente após carregar os itens
            adicionarCampoIngrediente();
        });
        return;
    }

    const clone = ingredienteTemplate.content.cloneNode(true);
    const select = clone.querySelector('.ingrediente-select');
    
    // Limpa opções padrão e adiciona os itens
    select.innerHTML = '<option value="" selected disabled>Selecione um item</option>';
    
    estoqueItens.forEach(item => {
        const option = document.createElement('option');
        option.value = item.id_item;
        option.textContent = item.nome;
        select.appendChild(option);
    });
    
    // Adiciona evento para remover o ingrediente
    clone.querySelector('.remover-ingrediente').addEventListener('click', function() {
        this.closest('.ingrediente-item').remove();
    });
    
    ingredientesContainer.appendChild(clone);
}
            
function salvarReceita() {
    const formReceita = document.getElementById('formReceita');
    if (!formReceita.checkValidity()) {
        formReceita.reportValidity();
        return;
    }

    const receitaData = {
        nome: document.getElementById('nomeReceita').value,
        descricao: document.getElementById('descricaoReceita').value,
        tempo_preparo: parseInt(document.getElementById('tempoPreparo').value),
        porcoes: parseInt(document.getElementById('porcoes').value),
        categoria: document.getElementById('categoriaReceita').value
    };

    const ingredientes = [];
    document.querySelectorAll('.ingrediente-item').forEach(item => {
        ingredientes.push({
            id_item: parseInt(item.querySelector('.ingrediente-select').value),
            quantidade: parseFloat(item.querySelector('.quantidade').value),
            observacoes: item.querySelector('.observacoes').value
        });
    });

    const metodo = modoEdicao ? 'PUT' : 'POST';
    const url = modoEdicao 
        ? `http://localhost:8081/receita/${receitaAtual.id_receita}` 
        : 'http://localhost:8081/receita';

    fetch(url, {
        method: metodo,
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            receita: receitaData,
            ingredientes: ingredientes
        })
    })
    .then(response => {
        if (!response.ok) throw new Error('Erro ao salvar');
        return response.json();
    })
    .then(data => {
        alert(modoEdicao ? 'Receita atualizada com sucesso!' : 'Receita salva com sucesso!');
        fecharModal();
        location.reload(); // Ou recarregar apenas as receitas
    })
    .catch(error => {
        console.error('Erro ao salvar receita:', error);
        alert('Erro ao salvar receita. Por favor, tente novamente.');
    });
}

            
function limparFormulario() {
    document.getElementById('formReceita').reset();
    ingredientesContainer.innerHTML = '';
}
            
// Event listeners para os botões
btnAdicionarIngrediente.addEventListener('click', adicionarCampoIngrediente);
btnSalvarReceita.addEventListener('click', salvarReceita);
});