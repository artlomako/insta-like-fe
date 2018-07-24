<template>
  <v-base-modal @close="$emit('close')">
    <div class="modal__header">
      <p class="modal__title">{{title}}</p>
    </div>
    <div class="modal__content">
      <slot/>
    </div>
  </v-base-modal>
</template>

<script>
  import VBaseModal from "./VBaseModal";

  export default {
    name: "VModal",
    components: {
      VBaseModal
    },
    props: {
      title: {
        required: true,
        type: String
      }
    },
  }
</script>

<style>
  .modal__header {
    border-bottom: 1px solid #ccc;
    background-color: #dddfcc;
  }

  .modal__title {
    font-weight: bold;
    margin: 0.5rem 1rem;
  }

  .modal__content {
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    overflow: auto;
    background-color: #fcfeeb;
  }
</style>