export class Todo {
  static fromJson({ id, tarea, completed, create }) {
    const tempTodo = new Todo(tarea);

    tempTodo.id = id;
    tempTodo.completed = completed;
    tempTodo.create = create;

    return tempTodo;
  }

  constructor(tarea) {
    this.tarea = tarea;
    this.id = new Date().getTime(); // 232453
    this.completed = false;
    this.create = new Date();
  }

  imprimrClase() {
    console.log(`${this.tarea} - ${this.id}`);
  }
}
