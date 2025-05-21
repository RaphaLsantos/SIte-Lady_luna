import { consult } from "../database/conexao.js"

class EstoqueRepository{
    // CRUD
    create(produto){
        const sql = "INSERT INTO estoque SET ?;"
        return consult(sql, produto, "Erro ao inserir!")
    }
    findAll(){
        const sql = "SELECT * FROM estoque;"
        return consult(sql, 'Erro ao encontrar!')
    }

    findById(id){
        const sql = "SELECT * FROM estoque WHERE id = ?"
        return consult(sql, id, 'Erro ao encontrar!') 
        
    }
    updadeById(produto, id){
        const sql = "UPDATE estoque SET ? WHERE id = ?;"
        return consult(sql, [produto, id], "Erro ao atualizar!")
    }
     updateyReceita(receita){

    }
    deleteById(id){
        const sql = "DELETE FROM estoque WHERE id = ?"
        return consult(sql, id, 'Erro ao deletar!')
    }
   
}

export default new EstoqueRepository;