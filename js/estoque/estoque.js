async function getDadosEstoque() {
    try {
        const response = await fetch('http://localhost:8081/estoque');
        if (!response.ok) {
            throw new Error(`Erro HTTP: ${response.status}`);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Erro ao buscar dados:', error);
        document.getElementById('loading').textContent = 'Erro ao carregar estoque.';
        return [];
    }
}

function formatarData(dataString) {
    if (!dataString) return 'N/A';
    const data = new Date(dataString);
    return data.toLocaleDateString('pt-BR');
}

function calcularValorTotal(quantidade, valorUnitario) {
    const qtd = parseFloat(quantidade);
    const valor = parseFloat(valorUnitario);
    return (qtd * valor).toFixed(2);
}

function verificarStatus(item) {
    const hoje = new Date();
    const validade = item.data_validade ? new Date(item.data_validade) : null;
    const qtdAtual = parseFloat(item.quantidade);
    const qtdMinima = parseFloat(item.minimo_estoque);
    
    let status = [];
    
    // Verificar estoque
    if (qtdAtual < qtdMinima) {
        status.push('Estoque baixo');
    }
    
    // Verificar validade (considerando 30 dias como limite)
    if (validade) {
        const diffTime = validade - hoje;
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        
        if (diffDays <= 0) {
            status.push('Vencido');
        } else if (diffDays <= 30) {
            status.push(`Vence em ${diffDays} dias`);
        }
    }
    
    return status.length > 0 ? status.join(' | ') : 'OK';
}

function adicionarClassesCSS(item, element) {
    const qtdAtual = parseFloat(item.quantidade);
    const qtdMinima = parseFloat(item.minimo_estoque);
    const hoje = new Date();
    const validade = item.data_validade ? new Date(item.data_validade) : null;
    
    if (qtdAtual < qtdMinima) {
        element.classList.add('estoque-baixo');
    }
    
    if (validade) {
        const diffTime = validade - hoje;
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        if (diffDays <= 30) {
            element.classList.add('validade-proxima');
        }
    }
}

async function carregarTabelaEstoque() {
    const dados = await getDadosEstoque();
    const corpoTabela = document.getElementById('corpo-tabela');
    const loadingElement = document.getElementById('loading');
    
    if (dados.length === 0) {
        loadingElement.textContent = 'Nenhum item encontrado no estoque.';
        return;
    }
    
    loadingElement.style.display = 'none';
    document.getElementById('tabela-estoque').style.display = 'table';
    
    dados.forEach(item => {
        const linha = document.createElement('tr');
        
        // Aplicar classes CSS com base no status
        adicionarClassesCSS(item, linha);
        
        linha.innerHTML = `
            <td>${item.id_item}</td>
            <td>${item.nome_item}</td>
            <td>${item.categoria}</td>
            <td>${item.quantidade} ${item.unidade_medida}</td>
            <td>R$ ${parseFloat(item.valor_unitario).toFixed(2)}</td>
            <td>R$ ${calcularValorTotal(item.quantidade, item.valor_unitario)}</td>
            <td>${formatarData(item.data_validade)}</td>
            <td>${item.fornecedor}</td>
            <td>${item.local_armazenamento}</td>
            <td>${verificarStatus(item)}</td>
        `;
        
        corpoTabela.appendChild(linha);
    });
}

// Carrega a tabela quando a página é carregada
document.addEventListener('DOMContentLoaded', carregarTabelaEstoque);



// Abrir modal
document.getElementById('openModalBtn').addEventListener('click', function() {
    document.getElementById('modalForm').style.display = 'flex';
});

// Fechar modal ao clicar no ×
document.querySelector('.close').addEventListener('click', function() {
    document.getElementById('modalForm').style.display = 'none';
});

// Fechar modal ao clicar fora do conteúdo
document.getElementById('modalForm').addEventListener('click', function(e) {
    if (e.target === this) {
        document.getElementById('modalForm').style.display = 'none';
    }
});

// Enviar formulário
document.getElementById('itemForm').addEventListener('submit', async function(e) {
    e.preventDefault();
    
    // Validar campos obrigatórios antes de enviar
    if (!validateForm()) {
        return;
    }

    // Coletar todos os dados do formulário
    const formData = {
        nome_item: document.getElementById('nome_item').value,
        categoria: document.getElementById('categoria').value,
        quantidade: parseFloat(document.getElementById('quantidade').value),
        unidade_medida: document.getElementById('unidade_medida').value,
        valor_unitario: parseFloat(document.getElementById('valor_unitario').value),
        data_validade: document.getElementById('data_validade').value || null,
        fornecedor: document.getElementById('fornecedor').value || null,
        local_armazenamento: document.getElementById('local_armazenamento').value || null,
        minimo_estoque: document.getElementById('minimo_estoque').value ? parseFloat(document.getElementById('minimo_estoque').value) : null,
        ativo: document.getElementById('ativo').value === '1',
        observacoes: document.getElementById('observacoes').value || null
    };

    try {
        const response = await fetch('http://localhost:8081/estoque', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        });
        
        if (!response.ok) {
            throw new Error('Erro na resposta do servidor');
        }
        
        const data = await response.json();
        console.log('Sucesso:', data);
        alert('Item cadastrado com sucesso!');
        document.getElementById('modalForm').style.display = 'none';
        document.getElementById('itemForm').reset();
        
    } catch (error) {
        console.error('Erro:', error);
        alert('Erro ao cadastrar item: ' + error.message);
    }
});

// Função para validar os campos obrigatórios
function validateForm() {
    let isValid = true;
    
    // Validar nome do item
    if (!document.getElementById('nome_item').value.trim()) {
        document.getElementById('nome_item_error').style.display = 'block';
        isValid = false;
    } else {
        document.getElementById('nome_item_error').style.display = 'none';
    }
    
    // Validar categoria
    if (!document.getElementById('categoria').value) {
        document.getElementById('categoria_error').style.display = 'block';
        isValid = false;
    } else {
        document.getElementById('categoria_error').style.display = 'none';
    }
    
    // Validar quantidade
    if (!document.getElementById('quantidade').value || 
        parseFloat(document.getElementById('quantidade').value) <= 0) {
        document.getElementById('quantidade_error').style.display = 'block';
        isValid = false;
    } else {
        document.getElementById('quantidade_error').style.display = 'none';
    }
    
    // Validar unidade de medida
    if (!document.getElementById('unidade_medida').value) {
        document.getElementById('unidade_medida_error').style.display = 'block';
        isValid = false;
    } else {
        document.getElementById('unidade_medida_error').style.display = 'none';
    }
    
    // Validar valor unitário
    if (!document.getElementById('valor_unitario').value || 
        parseFloat(document.getElementById('valor_unitario').value) <= 0) {
        document.getElementById('valor_unitario_error').style.display = 'block';
        isValid = false;
    } else {
        document.getElementById('valor_unitario_error').style.display = 'none';
    }
    
    return isValid;
}