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