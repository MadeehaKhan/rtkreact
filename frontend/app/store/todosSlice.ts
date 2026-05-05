import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface Todo {
  id: string;
  title: string;
  completed: boolean;
}

interface TodosState {
  items: Todo[];
  loading: boolean;
  filter: "all" | "active" | "completed";
}

const initialState: TodosState = {
  items: [],
  loading: false,
  filter: "all",
};

const todosSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {
    // Load todos from API
    setTodos: (state, action: PayloadAction<Todo[]>) => {
      state.items = action.payload;
    },

    // Add a todo
    addTodo: (state, action: PayloadAction<Todo>) => {
      state.items.push(action.payload);
    },

    // Update a todo
    updateTodo: (state, action: PayloadAction<Todo>) => {
      const index = state.items.findIndex((t) => t.id === action.payload.id);
      if (index !== -1) {
        state.items[index] = action.payload;
      }
    },

    // Delete a todo
    deleteTodo: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter((t) => t.id !== action.payload);
    },

    // Toggle loading state
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },

    // Set filter
    setFilter: (state, action: PayloadAction<"all" | "active" | "completed">) => {
      state.filter = action.payload;
    },
  },
});

export const {
  setTodos,
  addTodo,
  updateTodo,
  deleteTodo,
  setLoading,
  setFilter,
} = todosSlice.actions;

export default todosSlice.reducer;

// Selectors
export const selectTodos = (state: any) => state.todos.items;
export const selectLoading = (state: any) => state.todos.loading;
export const selectFilter = (state: any) => state.todos.filter;

export const selectFilteredTodos = (state: any) => {
  const { items, filter } = state.todos;
  switch (filter) {
    case "active":
      return items.filter((t: Todo) => !t.completed);
    case "completed":
      return items.filter((t: Todo) => t.completed);
    default:
      return items;
  }
};
