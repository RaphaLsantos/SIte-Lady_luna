 function toggleForm() {
      const form = document.getElementById('transaction-form');
      form.style.display = form.style.display === 'flex' ? 'none' : 'flex';
    }

    function formatarReal(valor) {
      return valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
    }

    function adicionarTransacao() {
      const data = document.getElementById('data').value;
      const descricao = document.getElementById('descricao').value;
      const valor = parseFloat(document.getElementById('valor').value);
      const tabela = document.getElementById('tabela-transacoes').getElementsByTagName('tbody')[0];

      if (!data || !descricao || isNaN(valor)) return alert("Preencha todos os campos corretamente.");

      const novaLinha = tabela.insertRow(0);
      novaLinha.insertCell(0).innerText = data;
      novaLinha.insertCell(1).innerText = descricao;
      const cellValor = novaLinha.insertCell(2);
      cellValor.innerText = formatarReal(valor);
      if (valor < 0) cellValor.classList.add('negative');

      atualizarTotais(valor);
      document.getElementById('transaction-form').reset();
      toggleForm();
    }

    let totalReceita = 12000;
    let totalDespesa = 4500;

    function atualizarTotais(valor) {
      if (valor >= 0) {
        totalReceita += valor;
      } else {
        totalDespesa += Math.abs(valor);
      }

      const saldo = totalReceita - totalDespesa;

      document.getElementById('receita').innerText = formatarReal(totalReceita);
      document.getElementById('despesa').innerText = "-"+formatarReal(totalDespesa);
      document.getElementById('saldo').innerText = formatarReal(saldo);
    }