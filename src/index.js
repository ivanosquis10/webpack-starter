import './styles.css';

// Centralizamos un archivo para que importe todas desde un solo archivo y se vea mas claro y limpio
import { Todo, TodoList } from './classes/index';
import { crearTodoHtml } from './js/componentes';

export const todoList = new TodoList();

todoList.todos.forEach(crearTodoHtml); // O todoList.todos.forEach( todo => crearTodoHtml(todo) )

// todoList.todos[0].imprimrClase();

console.log('todos', todoList.todos);
