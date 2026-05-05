import { type RouteConfig, index, layout, prefix, route } from "@react-router/dev/routes";

export default [index("routes/home.tsx"),
    ...prefix("todos", [
        index("routes/todos.tsx"),
        layout("components/TodoLayout.tsx", [ 
            route(":id", "routes/todo.tsx"),
            route(":id/edit", "routes/todo-edit.tsx"),
            route("new", "routes/todo-new.tsx")
        ]),

    ])
] satisfies RouteConfig;
