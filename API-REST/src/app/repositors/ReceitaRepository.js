import { consult } from "../database/conexao.js"

class ReceitaRepository{
    // CRUD
    create(receita){
        const sql = "INSERT INTO receitas SET ?;"
        return consult(sql, receita, "Erro ao inserir!")
    }
    findAll(){
        const sql = "SELECT * FROM receitas;"
        return consult(sql, 'Erro ao encontrar!')
    }
    findById(id){
        const sql = "SELECT * FROM receitas WHERE id_receita = ?"
        return consult(sql, id, 'Erro ao encontrar!') 
    }
    updadeById(receita, id){
        const sql = "UPDATE receitas SET ? WHERE id = ?;"
        return consult(sql, [receita, id], "Erro ao atualizar!")
    }
    deleteById(id){
        const sql = "DELETE FROM receitas WHERE id_receita = ?"
        return consult(sql, id, 'Erro ao deletar!')
    }
    mostraItemReceita(id){
        const sql = "SELECT e.nome_item AS nome_item, ri.quantidade, e.unidade_medida FROM receitas r JOIN receita_ingredientes ri ON r.id_receita = ri.id_receita JOIN estoque e ON ri.id_item = e.id_item WHERE r.id_receita = ?"
        return consult(sql, id, "Erro ao exibir itens")
    }
    buscaReceitaPorNome(nome){
        const sql = "SELECT * FROM receitas WHERE LOWER(nome) LIKE LOWER(?)";
        const termoBusca = `%${nome}%`;
        return consult(sql, termoBusca, 'ERRO ao encontrar receita');
    }
    

}

export default new ReceitaRepository;