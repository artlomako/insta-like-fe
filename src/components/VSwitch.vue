<template>
  <img :src="icon" :class="[{'container--disabled': !enabled}, 'container', {'container--big' : primary}]" @click="$emit('click')"/>
</template>

<script>
  export default {
    name: "VSwitch",
    props: {
      icon: {
        type: String,
        required: true
      },
      enabled: {
        type: Boolean,
        required: false,
        default: true
      },
      primary: {
        type: Boolean,
        required: false,
        default: false
      },
    }
  };
</script>

<style scoped>
  .container {
    height: 2.3rem;
    transition: 0.5s;
  }

  .container--big {
    height: 4.3rem;
  }

  .container--disabled {
    opacity: 0.5;
  }
</style>
