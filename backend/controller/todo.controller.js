import Todo from "../models/todo.model.js";

export const createTodo = async(req,res)=>{

    const todo = new Todo({
        text: req.body.text,
        completed : req.body.completed
    })

    try{
        const newTodo = await todo.save()
        res.status(201).json({
            message: "Todo Created Successfully", 
            newTodo
        })
    }catch(error)
    {
        console.log(`TODO CREATE ERROR ${error}`)
        res.status(400).json({
            message: "Error occuring in todo creation"
        })
    }
}

export const getTodos = async(req,res)=>{
    try {
        const todos = await Todo.find()
        res.status(201).json({
            message: "Todo Fetching Successfully",
            todos
        })
    } catch (error) {
        console.log("GET TODOS ERROR ",error)
        res.status(400).json({
            message: "Error occuring in todo fetching"
        })
    }
}

export const upadeTodo = async(req,res)=>{
    try {
        const todo = await Todo.findByIdAndUpdate(req.params.id, req.body, {
            new : true,
        })
        res.status(201).json({
            message: "Todo Updated Successfully",
            todo
        })
    } catch (error) {
        console.log("UPDATE TODOS ERROR ",error) 
        res.status(400).json({
            message: "Error occuring in todo update"
        })
    }
}

export const deleteTodo = async(req,res)=>{
    try {
        const todo = await Todo.findByIdAndDelete(req.params.id)
        if(!todo)
        {
            return res.status(404).json({message : "Todo not found"})
        }
        res.status(201).json({
            message: "Todo Deleted Successfully",
            todo
        })
    } catch (error) {
        console.log("DELETE TODOS ERROR ",error) 
        res.status(400).json({
            message: "Error occuring in todo fetching"
        })
    }
}