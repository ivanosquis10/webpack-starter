import { Todo } from '.';

export class TodoList {
  constructor() {
    this.cargarStorage();
  }

  // Crear un nuevo to-do
  nuevoTodo(todo) {
    this.todos.push(todo);
    this.guardarStorage();
  }

  // Eliminar los to-dos
  eliminarTodo(id) {
    // Va a traer un arreglo excluyendo el Todo.id que coincida con el id
    this.todos = this.todos.filter((todo) => todo.id != id);

    // Al momento de modificar el arreglo, hay que guardarlo en el local
    this.guardarStorage();
  }

  // Marcar como completado o no
  marcarCompletado(id) {
    for (const todo of this.todos) {
      // console.log(todo.id);
      // console.log(parseInt(id));

      if (todo.id === parseInt(id)) {
        todo.completed = !todo.completed;
        this.guardarStorage();
        break;
      }
    }
  }

  // Eliminar los to-dos completados
  eliminarCompletados() {
    // Eliminar los que estan completado, por eso el signo de exclamacion, quiero que traiga lo contrario, es decir, los que aun no han sido completados
    this.todosa = this.todos.filter((todo) => !todo.completed);
    this.guardarStorage();
  }

  // Guardar en el localStorage
  guardarStorage() {
    localStorage.setItem('todo', JSON.stringify(this.todos));
  }

  // Cargar el localStorage
  cargarStorage() {
    this.todos = localStorage.getItem('todo')
      ? JSON.parse(localStorage.getItem('todo'))
      : [];

    this.todos = this.todos.map((obj) => Todo.fromJson(obj));
  }
}
