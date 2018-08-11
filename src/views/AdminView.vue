<template>
  <div>
    <div class="admin-switches">
      <v-button
        icon="comment.svg"
        size="medium"
        @click="onChangeMode('COMMENTS')"
        :class="buttonStyle('COMMENTS')"
      />
      <v-button
        icon="heart.svg"
        size="medium"
        @click="onChangeMode('LIKES')"
        :class="buttonStyle('LIKES')"
      />
      <v-button
        icon="users.svg"
        size="medium"
        @click="onChangeMode('USERS')"
        :class="buttonStyle('USERS')"
      />
      <v-button
        icon="check.svg"
        size="medium"
        :disabled="synchronized"
        @click="submit"
      />
    </div>
    <router-view/>
  </div>

</template>

<script>
  import VButton from "@/components/common/VButton";
  import VTextField from "@/components/common/VTextField";
  import {createNamespacedHelpers} from "vuex";

  const {mapState, mapGetters, mapMutations, mapActions} = createNamespacedHelpers("admin");

  export default {
    name: "AdminView",
    components: {
      VTextField,
      VButton
    },
    methods: {
      ...mapMutations(["changeMode"]),
      ...mapActions(["submit"]),
      onSubmit(e) {
        e.preventDefault();
      },
      onChangeMode(newMode) {
        this.$router.push("/admin/" + newMode.toLowerCase());
      },
      buttonStyle(buttonMode) {
        return {
          "admin-view__switch--inactive": this.mode !== buttonMode
        };
      }
    },
    computed: {
      ...mapState(["mode"]),
      ...mapGetters(["synchronized"])
    }
  }
</script>

<style>
  .admin-switches {
    display: flex;
    justify-content: space-around;
    width: 100%;
    margin-bottom: 1rem;
    align-items: center;
  }

  .admin-view__switch--inactive {
    opacity: 0.5;
  }
</style>