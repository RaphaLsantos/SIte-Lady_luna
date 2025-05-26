import { consult } from "../database/conexao.js";

class MateriaisRepository {
    // CRUD

    create(material) {
        const sql = "INSERT INTO materiais SET ?;";
        return consult(sql, material, "Erro ao inserir!");
    }

    findAll() {
        const sql = "SELECT * FROM materiais;";
        return consult(sql, 'Erro ao encontrar!');
    }

    findById(id_material) {
        const sql = "SELECT * FROM materiais WHERE id_material = ?";
        return consult(sql, id_material, 'Erro ao encontrar!');
    }

    updateById(material, id_material) {
        const sql = "UPDATE materiais SET ? WHERE id_material = ?;";
        return consult(sql, [material, id_material], "Erro ao atualizar!");
    }

    deleteById(id_material) {
        const sql = "DELETE FROM materiais WHERE id_material = ?;";
        return consult(sql, id_material, 'Erro ao deletar!');
    }
}

export default new MateriaisRepository();
