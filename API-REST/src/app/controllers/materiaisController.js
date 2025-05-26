import materiaisRepository from "./MateriaisRepository.js";

class MateriaisController {

    async index(req, res) {
        const rows = await materiaisRepository.findAll();
        res.json(rows);
    }

    async show(req, res) {
        const id = req.params.id;
        const row = await materiaisRepository.findById(id);
        res.json(row);
    }

    async store(req, res) {
        const material = req.body;
        const row = await materiaisRepository.create(material);
        res.json(row);
    }

    async update(req, res) {
        const id = req.params.id;
        const material = req.body;
        const row = await materiaisRepository.updateById(material, id);
        res.json(row);
    }

    async delete(req, res) {
        const id = req.params.id;
        const row = await materiaisRepository.deleteById(id);
        res.json(row);
    }

}

export default new MateriaisController();
