<template>
  <transition name="modal-fade">
    <div class="modal" @click.self="$emit('close')">
      <div :class="gutsClasses">
        <slot/>
      </div>
    </div>
  </transition>

</template>

<script>
  export default {
    name: "VBaseModal",
    props: {
      flex: {
        required: false,
        type: Boolean,
        default: false
      }
    },
    computed: {
      gutsClasses() {
        return [
          "modal__guts",
          {"modal__guts--flex": this.flex}
        ]
      }
    }
  }
</script>

<style>
  .modal {
    background-color: rgba(0, 0, 0, 0.5);
    position: fixed;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1;
    top: 0;
    left: 0;
  }

  .modal__guts {
    width: 35rem;
    max-width: 90%;
    height: 17rem;
    max-height: 90%;
    z-index: 2;
    display: flex;
    flex-direction: column;
  }

  .modal__guts--flex {
    height: auto;
    width: auto;
  }

  .modal-fade-enter-active {
    transition: all .3s ease;
  }

  .modal-fade-leave-active {
    transition: all .3s ease;
  }

  .modal-fade-enter, .modal-fade-leave-to {
    transform: scale(1.05);
    opacity: 0;
  }
</style>