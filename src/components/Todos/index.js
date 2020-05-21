import Confirmation from '@/components/Confirmation/template.vue';
import modalWindow from '@/components/modalWindow/template.vue';

export default {
  name: 'Todo',
  data() {
    return {
      todos: [],
      todoForm: {
        uid: 0,
        description: '',
        is_completed: [],
      },
      todoTitle: 'Добавить',
      confirmationMessage: '',
      showConfirmation: false,
      formOnSubmit: undefined,
      formOnReset: undefined,
    };
  },
  components: {
    confirmation: Confirmation,
    modalwindow: modalWindow,
  },
  methods: {
    getTodos() { // получаем данные из localStorage
      if (!localStorage.getItem('jobs')) {
        const jobs = []; // если данных пока нет, запилим пустой список пусть будет
        localStorage.setItem('jobs', JSON.stringify(jobs));
      }
      // список задач храним в обьекте JSON, преобразованном в строку
      // при парсинге получим красивый список без дополнительных циклов
      this.todos = JSON.parse(localStorage.getItem('jobs'));
      // считаем общее количество задач, выполненных и не выполненных
      this.totalTodo = this.todos.length;
      this.todoDone = 0;
      this.inProgress = 0;
      this.todos.forEach((todo) => {
        if (todo.is_completed) this.todoDone += 1;
        else this.inProgress += 1;
      });
    },
    resetForm() {
      this.todoTitle = 'Добавить';
      this.todoForm.uid = 0;
      this.todoForm.description = '';
      this.todoForm.is_completed = false;
      // console.log('%o', this.todoForm);
    },
    onSubmit(event, subTodo) {
      event.preventDefault();
      // console.log('%o', subTodo);
      if (subTodo.uid === 0) {
        const addJob = {
          description: subTodo.description,
          is_completed: Boolean(subTodo.is_completed),
        };
        this.addTodos(addJob);
        this.getTodos();
        this.resetForm();
      } else {
        const updData = {
          uid: subTodo.uid,
          description: subTodo.description,
          is_completed: Boolean(subTodo.is_completed),
        };
        // console.log('%o', updData);
        this.modifyTodo(updData);
        this.getTodos();
        this.resetForm();
      }
    },
    addTodos(addData) {
      const rawTodos = JSON.parse(localStorage.getItem('jobs'));
      const addUid = (rawTodos.length > 0) ? rawTodos[rawTodos.length - 1].uid + 1 : 1;
      // console.log(addUid);
      rawTodos.push({
        uid: addUid,
        description: addData.description,
        is_completed: addData.is_completed,
      });
      this.commitStorage(rawTodos, `"${addData.description}" добавлена`);
    },
    onReset(event) {
      event.preventDefault();
      this.resetForm();
    },
    updateTodo(todo) {
      this.todoTitle = 'Обновить';
      this.todoForm.uid = todo.uid;
      this.todoForm.description = todo.description;
      this.todoForm.is_completed = todo.is_completed;
    },
    modifyTodo(mTodo) {
      const rawTodos = JSON.parse(localStorage.getItem('jobs'));
      const modTodos = [];
      rawTodos.forEach((todo) => {
        if (todo.uid === mTodo.uid) {
          modTodos.push({
            uid: mTodo.uid,
            description: mTodo.description,
            is_completed: mTodo.is_completed,
          });
        } else {
          modTodos.push(todo);
        }
      });
      this.commitStorage(modTodos, `"${mTodo.description}" изменена`);
    },
    removeTodo(mTodo) {
      const rawTodos = JSON.parse(localStorage.getItem('jobs'));
      const modTodos = [];
      rawTodos.forEach((todo) => {
        if (todo.uid !== mTodo.uid) {
          modTodos.push(todo);
        }
      });
      this.commitStorage(modTodos, `"${mTodo.description}" удалена`);
    },
    commitStorage(jsnData, confirmMessage) { // записываем данные и выводим уведомление
      localStorage.setItem('jobs', JSON.stringify(jsnData));
      this.confirmationMessage = `Задача ${confirmMessage}`;
      this.showConfirmation = true;
    },
    deleteTodo(todo) {
      // console.log('Пришли данные: %o', todo);
      this.removeTodo(todo);
      this.getTodos();
    },
    hideConfirmation(event) { // обрабатываем событие от confirmation чтобы его скрыть
      event.preventDefault();
      this.showConfirmation = false;
    },
  },
  created() {
    this.getTodos();
  },
};
