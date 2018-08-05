<template>
  <button :class="classes" @click="$emit('click')">
    <img class="button__icon" :src="icon"/>
  </button>
</template>

<script>
  export default {
    name: "VButton",
    props: {
      icon: {
        required: true,
        type: String
      },
      size: {
        required: true,
        type: String,
        validator: value => ["small", "medium", "big"].includes(value)
      },
      disabled: {
        required: false,
        type: Boolean,
        default: false
      }
    },
    computed: {
      classes() {
        return [
          "button",
          "button--" + this.size,
          {"button--disabled": this.disabled}
        ]
      }
    }
  }
</script>

<style>
  .button {
    border: none;
    background: none;
    padding: 0;
    outline: none;
    cursor: pointer;
  }

  .button--small {
    width: 1.3rem;
    height: 1.3rem;
  }

  .button--medium {
    width: 2rem;
    height: 2rem;
  }

  .button--big {
    width: 4.3rem;
    height: 4.3rem;
  }

  .button__icon {
    width: 100%;
    height: 100%;
  }

  .button--disabled {
    opacity: 0.5;
  }
</style>