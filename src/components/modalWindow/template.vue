<template>
  <b-modal ref="TodoModal"
      id="todo-modal-2"
      no-close-on-backdrop
      hide-footer>
      <header>
        <h3>{{ todoTitle }}</h3>
      </header>
      <b-form @submit="onSubmit" @reset="onReset" class="w-100">
      <b-form-group id="form-description-group"
        label="Описание:"
        label-for="form-description-input">
        <b-form-input id="form-description-input"
          type="text"
          v-model="todoForm.description"
          required
          placeholder="Завести задачу">
        </b-form-input>
      </b-form-group>
      <b-form-group id="form-complete-group">
        <b-form-checkbox-group v-model="todoForm.is_completed" id="form-checks">
          <b-form-checkbox>Задача выполнена?</b-form-checkbox>
        </b-form-checkbox-group>
      </b-form-group>
        <b-button type="submit" variant="primary">{{ todoTitle }}</b-button>
        <b-button type="reset" variant="danger">Сброс</b-button>
      </b-form>
    </b-modal>
</template>

<script  src='./index.js'></script>

<style lang='scss'>
  @import url('./style.css')
</style>
