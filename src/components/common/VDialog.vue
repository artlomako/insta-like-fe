<template>
  <v-base-modal flex @close="$emit('close')">
    <div class="dialog__content">
      <img class="content__icon" :src="icon"/>
      <p class="content__text">{{text}}</p>
    </div>
    <div class="dialog__footer">
      <v-button class="footer__button" size="medium" icon="check.svg" @click="$emit('close')"/>
    </div>
  </v-base-modal>
</template>

<script>
  import VBaseModal from "./VBaseModal";
  import VButton from "./VButton";

  export default {
    name: "VDialog",
    components: {
      VBaseModal,
      VButton
    },
    props: {
      icon: {
        required: false,
        type: String
      },
      text: {
        required: true,
        type: String
      }
    },
  }
</script>

<style>
  .dialog__content {
    flex-grow: 1;
    display: flex;
    flex-direction: row;
    align-items: center;
    overflow: auto;
    background-color: #fcfeeb;
    padding: 1.5rem
  }

  .content__icon {
    width: 4rem;
    height: 4rem;
  }

  .content__text {
    margin-left: 1rem;
    font-weight: 500;
  }

  .dialog__footer {
    width: 100%;
    border-top: 1px solid #ccc;
    display: flex;
    justify-content: center;
    background-color: #dddfcc;
  }

  .footer__button {
    margin: 0.5rem;
  }
</style>