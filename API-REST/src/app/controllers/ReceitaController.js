import ReceitaRepository from '../repositors/ReceitaRepository.js'

class ReceitaController {
    
    async index(req, res) {
       const row = await ReceitaRepository.findAll()
       res.json(row)
     }
    async show(req, res) {
        const id = req.params.id
        const row = await ReceitaRepository.findById(id)
        res.json(row)
    }
    async store(req, res) {
        const receita = req.body
        const row = await ReceitaRepository.create(receita)
        res.json(row)
    }
    async update(req, res) {
        const id = req.params.id
        const receita = req.body
        const row = await ReceitaRepository.updadeById(receita, id)
        res.json(row)
    }
    async delete(req, res) {
        const id = req.params.id
        const row = await ReceitaRepository.deleteById(id)
        res.json(row)
    }
    async showItemReceita(req, res) {
        const id = req.params.id
        const row = await ReceitaRepository.mostraItemReceita(id)
        res.json(row)
    }
    async buscaReceitaPorNome(req, res) {
        const nome = req.params.nome
        const row = await ReceitaRepository.buscaReceitaPorNome(nome)
        res.json(row)
    }
    
}

export default new ReceitaController()