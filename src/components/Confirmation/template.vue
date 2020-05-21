<template>
  <div v-if="showed">
    <b-alert variant="success" show>{{ message }}
      <button @click="onClose"
        type="button" class="close" data-dismiss="alert" aria-label="Close">
        <span aria-hidden="true">&times;</span>
      </button>
    </b-alert>

  </div>
</template>

<script src="./index.js"></script>
