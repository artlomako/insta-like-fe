<template>
  <input :class="classes" :value="text" @input="$emit('input', $event.target.value)"
         @change="$emit('change', $event.target.value)"
         placeholder="Link do zdjęcia" :placeholder="placeholder"/>
</template>

<script>
  export default {
    name: "VTextField",
    props: {
      text: {
        required: true,
        type: String
      },
      valid: {
        required: false,
        type: Boolean,
        default: true
      },
      type: {
        required: true,
        type: String,
        validator: value => ["primary", "secondary"].includes(value)
      },
      placeholder: {
        required: true,
        type: String
      }
    },
    computed: {
      classes() {
        return {
          "text-field": true,
          "text-field--invalid": !this.valid,
          ["text-field--" + this.type]: true
        }
      }
    }
  }
</script>

<style>
  .text-field {
    background: #d1d3c0;
    transition: all 300ms ease-out;
    height: 2rem;
    width: 100%;
  }

  .text-field:focus {
    outline: none;
    background: none;
  }

  .text-field--invalid {
    background: #fc7674;
  }

  .text-field--primary {
    font-size: 1.5rem;
    border-width: 0 0 1px 0;
    border-color: #3f3f3f;
  }

  .text-field--secondary {
    border: none;
    font-size: 1rem;
  }

</style>