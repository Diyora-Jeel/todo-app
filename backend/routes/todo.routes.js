import express from 'express';
import {createTodo, deleteTodo, getTodos, upadeTodo} from '../controller/todo.controller.js';
const router = express.Router();

router.post("/create",createTodo)
router.get("/fetch",getTodos)
router.put("/update/:id", upadeTodo)
router.delete("/delete/:id", deleteTodo)

export default router