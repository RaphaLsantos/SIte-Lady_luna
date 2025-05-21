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
        const sql = "SELECT * FROM receitas WHERE id = ?"
        return consult(sql, id, 'Erro ao encontrar!') 
        
    }
    updadeById(produto, id){
        const sql = "UPDATE receitas SET ? WHERE id = ?;"
        return consult(sql, [produto, id], "Erro ao atualizar!")
    }
    deleteById(id){
        const sql = "DELETE FROM receitas WHERE id = ?"
        return consult(sql, id, 'Erro ao deletar!')
    }

}

export default new ReceitaRepository;