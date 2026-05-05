package com.todoapp.controller;

import com.todoapp.entity.Todo;
import com.todoapp.repository.TodoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.graphql.data.method.annotation.Argument;
import org.springframework.graphql.data.method.annotation.MutationMapping;
import org.springframework.graphql.data.method.annotation.QueryMapping;
import org.springframework.stereotype.Controller;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Controller
public class TodoGraphQLController {

    @Autowired
    private TodoRepository todoRepository;

    @QueryMapping
    public List<Todo> todos() {
        return todoRepository.findAll();
    }

    @QueryMapping
    public Todo todo(@Argument Long id) {
        Optional<Todo> todo = todoRepository.findById(id);
        return todo.orElse(null);
    }

    @MutationMapping
    public Todo createTodo(@Argument String title, @Argument String description) {
        Todo todo = new Todo();
        todo.setTitle(title);
        todo.setDescription(description);
        todo.setCompleted(false);
        todo.setCreatedAt(LocalDateTime.now());
        todo.setUpdatedAt(LocalDateTime.now());
        return todoRepository.save(todo);
    }

    @MutationMapping
    public Todo updateTodo(@Argument Long id, @Argument String title, @Argument String description, @Argument Boolean completed) {
        Optional<Todo> optionalTodo = todoRepository.findById(id);
        if (optionalTodo.isPresent()) {
            Todo todo = optionalTodo.get();
            if (title != null) todo.setTitle(title);
            if (description != null) todo.setDescription(description);
            if (completed != null) todo.setCompleted(completed);
            todo.setUpdatedAt(LocalDateTime.now());
            return todoRepository.save(todo);
        }
        return null;
    }

    @MutationMapping
    public Boolean deleteTodo(@Argument Long id) {
        if (todoRepository.existsById(id)) {
            todoRepository.deleteById(id);
            return true;
        }
        return false;
    }
}
