<template>
  <div class="container">
    <div class="col-sm-12">
      <h5>
        Заданий в планировщике: {{totalTodo}}, выполнено {{todoDone}}, в работе: {{inProgress}}
      </h5>
      <hr>
      <h3>Задачи</h3>
      <confirmation :message='confirmationMessage'
                    :showed='showConfirmation'
                    @confirmed="hideConfirmation" />
      <button type="button"
        id="task-add"
        class="btn btn-success btn-sm align-left d-block"
        v-b-modal.todo-modal-2
        @click="resetForm()">
        Добавить задачу
      </button>

      <table class="table table-dark table-stripped table-hover">
        <thead class="thead-light">
          <tr>
            <th>Uid</th>
            <th>Описание</th>
            <th>Выполнена?</th>
            <th></th>
          </tr>
        </thead>

        <tbody>
          <tr v-for="(todo, index) in todos" :key="index">
            <td class="todo-uid">{{ todo.uid }}</td>
            <td>{{ todo.description }}</td>
            <td>
              <span v-if="todo.is_completed">Выполнено</span>
              <span v-else>Не выполнено</span>
            </td>
            <td>
              <div class="btn-group" role="group">
                <button type="button"
                        class="btn btn-secondary btn-sm"
                        v-b-modal.todo-modal-2
                        @click="updateTodo(todo)">
                  Обновить
                </button>
                &nbsp;
                <button type="button"
                        class="btn btn-danger btn-sm"
                        @click="deleteTodo(todo)">
                  X
                </button>
              </div>
            </td>
          </tr>
        </tbody>

      </table>
    </div>
    <modalwindow
      :todoForm='todoForm'
      :todoTitle='todoTitle'
      @modalSubmit="onSubmit"
      @modalReset="onReset" />
    <!-- <b-modal ref="addTodoModal"
      id="todo-modal"
      title="Добавить задачу"
      no-close-on-backdrop
      hide-footer>
      <b-form @submit="onSubmit" @reset="onReset" class="w-100">
      <b-form-group id="form-description-group"
        label="Описание:"
        label-for="form-description-input">
        <b-form-input id="form-description-input"
          type="text"
          v-model="addTodoForm.description"
          required
          placeholder="Завести задачу">
        </b-form-input>
      </b-form-group>
      <b-form-group id="form-complete-group">
        <b-form-checkbox-group v-model="addTodoForm.is_completed" id="form-checks">
          <b-form-checkbox value="false">Задача выполнена?</b-form-checkbox>
        </b-form-checkbox-group>
      </b-form-group>
        <b-button type="submit" variant="primary">Добавить</b-button>
        <b-button type="reset" variant="danger">Сброс</b-button>
      </b-form>
    </b-modal>
    <b-modal ref="updateTodoModal"
      id="todo-update-modal"
      title="Update"
      hide-footer>
      <b-form @submit="onUpdateSubmit" @reset="onUpdateReset" class="w-100">
      <b-form-group id="form-update-description-group"
                    label="Описание:"
                    label-for="form-update-description-input">
        <b-form-input id="form-update-description-input"
                      type="text"
                      v-model="updateTodoForm.description"
                      required>
        </b-form-input>
      </b-form-group>
      <b-form-group id="form-update-complete-group">
        <b-form-checkbox-group v-model="updateTodoForm.is_completed" id="form-update-checks">
          <b-form-checkbox value="true">Задача выполнена?</b-form-checkbox>
        </b-form-checkbox-group>
      </b-form-group>
      <b-button-group>
        <b-button type="submit" variant="primary">Обновить</b-button>
        <b-button type="reset" variant="danger">Сброс</b-button>
      </b-button-group>
      </b-form>
    </b-modal> -->
  </div>
</template>

<script src="./index.js"></script>

<style lang="scss" scoped>
  @import url("./style.css");
</style>
