<template>
  <div>
    <div class="admin-switches">
      <v-button
        icon="comment.svg"
        size="big"
        :disabled="mode !== 'COMMENTS'"
        @click="onChangeMode('COMMENTS')"
      />
      <v-button
        icon="heart.svg"
        size="big"
        :disabled="mode !== 'LIKES'"
        @click="onChangeMode('LIKES')"
      />
      <v-button
        icon="users.svg"
        size="big"
        :disabled="mode !== 'USERS'"
        @click="onChangeMode('USERS')"
      />
    </div>
    <router-view/>
  </div>

</template>

<script>
  import VButton from "@/components/common/VButton";
  import VTextField from "@/components/common/VTextField";
  import {createNamespacedHelpers} from "vuex";

  const {mapState, mapMutations} = createNamespacedHelpers("admin");

  export default {
    name: "AdminView",
    components: {
      VTextField,
      VButton
    },
    methods: {
      ...mapMutations(["changeMode"]),
      onSubmit(e) {
        e.preventDefault();
      },
      onChangeMode(newMode) {
        this.changeMode(newMode.toUpperCase());
        this.$router.push("/admin/" + newMode.toLowerCase());
      }
    },
    computed: {
      ...mapState(["mode"])
    }
  }
</script>

<style>
  .admin-switches {
    display: flex;
    justify-content: space-around;
    width: 100%;
    margin-top: 1rem;
    align-items: center;
  }
</style>