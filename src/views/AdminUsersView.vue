<template>
  <div>
    <div class="admin-users__username-editor">
      <v-text-field
        class="admin-users__username-input"
        :text="username"
        @input="changeUsername"
        type="primary"
        placeholder="Nazwa użytkownika"
        @keyup.enter="onAddUser"
      />
      <v-button
        icon="plus.svg"
        size="medium"
        @click="onAddUser"
        :disabled="username.length === 0"
      />
    </div>
    <v-list
      :items="users"
      :on-delete="deleteUser"
    />
  </div>
</template>

<script>
  import VTextField from "../components/common/VTextField";
  import VList from "../components/common/VList";
  import {mapState, mapMutations} from "vuex";
  import VButton from "../components/common/VButton";

  export default {
    name: "AdminUsersView",
    components: {VButton, VList, VTextField},
    data() {
      return {
        username: ""
      }
    },
    computed: {
      ...mapState("admin/users", ["users"])
    },
    methods: {
      ...mapMutations("admin/users", ["addUser", "deleteUser"]),
      changeUsername(username) {
        this.username = username;
      },
      onAddUser(){
        this.addUser(this.username);
        this.username = "";
      }
    },
    mounted() {
      this.$store.commit("admin/changeMode", "USERS");
      this.$store.dispatch("admin/fetch");
    }
  }
</script>

<style>
  .admin-users__username-editor {
    display: flex;
  }

  .admin-users__username-input {
    margin-right: 0.5rem;
  }
</style>