import EstoqueRepository from "../repositors/EstoqueRepository.js"

class EstoqueController {

    async index(req, res) {
       const row = await EstoqueRepository.findAll()
       res.json(row)
     }
    async show(req, res) {
        const id = req.params.id
        const row = await EstoqueRepository.findById(id)
        res.json(row)
    }
    async store(req, res) {
        const estoque = req.body
        const row = await EstoqueRepository.create(estoque)
        res.json(row)
    }
    async update(req, res) {
        const id = req.params.id
        const estoque = req.body
        const row = await EstoqueRepository.updadeById(estoque, id)
        res.json(row)
    }
    async delete(req, res) {
        const id = req.params.id
        const row = await EstoqueRepository.deleteById(id)
        res.json(row)
    }

}

// padrão Singleton
export default new EstoqueController()