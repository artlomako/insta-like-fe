<template>
  <div>
    <v-button v-show="front" size="medium" :icon="iconFront" :size="size" @click="$emit('toggle')"/>
    <v-button v-show="!front" size="medium" :icon="iconBack" :size="size" @click="$emit('toggle')"/>
  </div>
</template>

<script>
  import VButton from "./VButton";

  export default {
    name: "VSwitch",
    components: {
      VButton
    },
    props: {
      front: {
        required: true,
        type: Boolean
      },
      iconFront: {
        required: true,
        type: String
      },
      iconBack: {
        required: true,
        type: String
      },
      size: {
        required: true,
        type: String,
        validator: value => ["tiny", "small", "medium", "big"].includes(value)
      }
    }
  }
</script>