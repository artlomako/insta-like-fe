<template>
  <v-button :class="classes" size="medium" :icon="icon" @click="$emit('toggle')"/>
</template>

<script>
  import VButton from "./VButton";

  export default {
    name: "VSwitch",
    components: {
      VButton
    },
    props: {
      icon: {
        required: true,
        type: String
      },
      enabled: {
        required: true,
        type: Boolean
      }
    },
    computed: {
      classes() {
        return [
          "switch",
          {"switch--disabled": !this.enabled}
        ]
      }
    }
  }
</script>

<style>
  .switch {
    transition: 0.5s;
    outline: none;
  }

  .switch--disabled {
    opacity: 0.5;
  }
</style>