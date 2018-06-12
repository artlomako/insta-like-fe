<template>
  <img :src="icon" :class="[{'container--disabled': !enabled}, 'container']" @click="$emit('click')" />
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
      required: true,
      default: false
    }
  }
};
</script>

<style scoped>
.container {
  height: 2.5rem;
  transition: 0.5s;
}

.container--disabled {
  opacity: 0.5;
}
</style>
