import { Router } from "express";
import EstoqueController from "./app/controllers/EstoqueController.js";
import ReceitaController from "./app/controllers/ReceitaController.js";
import materiaisController from "./app/controllers/materiaisController.js";

const router = Router()

//Rotas estoque
router.get('/estoque', EstoqueController.index)
router.get('/estoque/:id', EstoqueController.show)
router.post('/estoque', EstoqueController.store)
router.put('/estoque/:id', EstoqueController.update)
router.delete('/estoque/:id', EstoqueController.delete)
// Rotas receitas
router.get('/receita', ReceitaController.index)
router.get('/receita/:id', ReceitaController.show)
router.get('/buscareceita/:nome', ReceitaController.buscaReceitaPorNome)
router.post('/receita', ReceitaController.store)
router.put('/receita/:id', ReceitaController.update)
router.delete('/receita/:id', ReceitaController.delete)

router.get('/ingredientes/:id', ReceitaController.showItemReceita)

//rota para materiais
router.get('/materiais', materiaisController.index)
router.get('/materiais/:id', materiaisController.show)
router.post('/materiais', materiaisController.store)
router.put('/materiais/:id', materiaisController.update)
router.delete('/materiais/:id', materiaisController.delete)

export default router;