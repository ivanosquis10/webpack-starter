import { todoList } from '..';
import { Todo } from '../classes';

// Referencias del HTML
const divTodoList = document.querySelector('.todo-list');
const inputTxt = document.querySelector('.new-todo');
const btnBorrar = document.querySelector('.clear-completed');
const ulFiltros = document.querySelector('.filters');
const anchorFiltros = document.querySelectorAll('.filtro');

export const crearTodoHtml = (todo) => {
  // Funcion para crear una nueva tarea en el html
  const htmlTodo = `
    <li class="${todo.completed ? 'completed' : ''}" data-id="${todo.id}">
			<div class="view">
				<input class="toggle" type="checkbox" ${todo.completed ? 'checked' : ''}>
				<label>${todo.tarea}</label>
				<button class="destroy"></button>
			</div>
			<input class="edit" value="Create a TodoMVC template">
		</li> 
  `;

  const div = document.createElement('DIV');
  div.innerHTML = htmlTodo;

  divTodoList.append(div.firstElementChild);

  return div;
};

// Eventos

// Evento que permite crear un nuevo todo al darle ENTER => 13
inputTxt.addEventListener('keyup', (e) => {
  // Validamos que se presione el enter y que el input no este vacio
  if (e.keyCode === 13 && inputTxt.value.length > 0) {
    // Creamos un nuevo elemento para el todo y lo pasamos como referencia a la instancia creada en el index
    const newTodo = new Todo(inputTxt.value);

    // Agregamos el nuevo ToDo a la instancia creada (que tiene el arreglo con los ToDos)
    todoList.nuevoTodo(newTodo);

    // Y luego usamos la funcion para mostrar en el html el nuevo ToDo
    crearTodoHtml(newTodo);

    // Reiniciamos el input
    inputTxt.value = '';
  }
});

// Identificar a cual elemento se le hace click para marcarlo como completado
divTodoList.addEventListener('click', (e) => {
  const nombreElemento = e.target.localName; // Input, label o button
  const todoElmLi = e.target.parentElement.parentElement; // Este es el li que contiene el elemento
  const todoId = todoElmLi.getAttribute('data-id'); // Extrae el id del elemento

  if (nombreElemento.includes('input')) {
    // Click en el checkbox
    todoList.marcarCompletado(todoId);
    todoElmLi.classList.toggle('completed');
  } else if (nombreElemento.includes('button')) {
    // Click en la equis (eliminar) => Hay que borrar
    todoList.eliminarTodo(todoId);
    divTodoList.removeChild(todoElmLi);
  }
});

// Boton que elimina todas las tareas marcadas como completado
btnBorrar.addEventListener('click', () => {
  todoList.eliminarCompletados();

  // Hacer referencia a todos los hijos del divTodoList
  for (let i = divTodoList.children.length - 1; i >= 0; i--) {
    const elemento = divTodoList.children[i];

    if (elemento.classList.contains('completed')) {
      divTodoList.removeChild(elemento);
    }
  }
});

// Botones de filtradp
ulFiltros.addEventListener('click', (e) => {
  const filtro = e.target.text; // Pendientes, Completados, Todos
  if (!filtro) return;

  anchorFiltros.forEach((e) => e.classList.remove('selected'));
  e.target.classList.add('selected');

  for (const elemento of divTodoList.children) {
    elemento.classList.remove('hidden');
    const completado = elemento.classList.contains('completed');

    switch (filtro) {
      // Si tiene la clase completados los oculta y muestra los que no.
      case 'Pendientes':
        if (completado) {
          elemento.classList.add('hidden');
        }
        break;

      // Lo contrario al de arriba
      case 'Completados':
        if (!completado) {
          elemento.classList.add('hidden');
        }
        break;

      default:
        break;
    }
  }
});
