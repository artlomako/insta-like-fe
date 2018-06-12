<template>
  <button class="button" @click="$emit('click', $event)">
    <img class="button__image" :src="icon" />
  </button>
</template>

<script>
export default {
  name: "VIconButton",
  props: {
    icon: {
      type: String,
      required: true
    }
  }
};
</script>

<style scoped>
.button {
  background: none;
  border: none;
  padding: 0;
  width: 1rem;
  height: 1rem;
}

.button__image {
  width: 100%;
  height: 100%;
}
</style>
