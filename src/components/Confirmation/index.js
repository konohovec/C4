export default {
  name: 'Confirmation',
  props: [
    'message',
    'showed',
    // 'onCloseAlert',
  ],
  methods: {
    onClose(event) {
      this.$emit('confirmed', event);
    },
  },
  created() {
    // console.log(this.message);
  },
};
