<template>
  <v-dialog v-if="event" :text="event.text" :icon="event.icon" @close="hide"/>
</template>

<script>
  import VDialog from "./common/VDialog";
  import {subscribe} from "../messageBus";

  export default {
    name: "MessageDialog",
    components: {VDialog},
    data() {
      return {
        event: undefined
      }
    },
    mounted() {
      subscribe(this.show);
    },
    methods: {
      show(event) {
        this.event = event;
      },
      hide() {
        this.event = undefined;
      }
    }
  }
</script>