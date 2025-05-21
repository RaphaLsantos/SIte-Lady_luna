import mysql from 'mysql2'

const conexao = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "Bankai@6579",
    database: "lady_luna"
})

conexao.connect()

/**
 * 
 * @param {string} sql  instrução sql a ser executada
 * @param {string | [selecao, id]} values valores a serem passados ao SQL
 * @param {string} rejectMessage mensagem a ser exibida
 * @returns objeto da Promisse
 */

export const consult = (sql, values = "", rejectMessage) => {
    
    return new Promise((resolve, reject) => {
        conexao.query(sql, values, (error, result) => {
            if(error) return reject(rejectMessage)
                const row = JSON.parse(JSON.stringify(result))
                return resolve(row)
        })
    })
}

export default conexao;