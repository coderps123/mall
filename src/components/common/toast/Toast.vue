<template>
  <div class="toast">
    {{msg}}
  </div>
</template>

<script>
  export default {
    name: "Toast",
    props: {
      msg: {
        type: String,
        default: ''
      }
    }
  }
</script>

<style scoped>
  .toast{
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);

    padding: 8px 10px;

    background-color: rgba(0, 0, 0, .65);
    color: #fff;
  }
</style>