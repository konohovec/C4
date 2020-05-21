export default {
  name: 'modalView',
  data() {
    return {
      todoData: [],
    };
  },
  props: [
    'todoForm',
    'todoTitle',
    'button',
  ],
  methods: {
    onSubmit(event) {
      this.$refs.TodoModal.hide();
      this.todoData.uid = this.todoForm.uid;
      // console.log(this.todoForm.is_completed);
      const retData = {
        uid: this.todoForm.uid,
        description: this.todoForm.description,
        is_completed: this.todoForm.is_completed,
      };
      // console.log(retData);
      this.$emit('modalSubmit', event, retData);
    },
    onReset(event) {
      this.$refs.TodoModal.hide();
      this.$emit('modalReset', event);
    },
  },
};
