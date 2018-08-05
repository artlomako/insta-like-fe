<template>
  <v-modal flex title="Zaloguj się">
    <div class="admin-login__main">
      <form @submit.prevent="onSubmit">
        <VTextField
          class="admin-login__password"
          :text="password"
          type="secondary"
          placeholder="Hasło"
          secured
          @change="pwd => this.password=pwd"
        />
      </form>
    </div>
    <div class="admin-login__footer">
      <v-button class="admin-login__button" size="medium" icon="unlock.svg" @click="onSubmit"/>
    </div>
  </v-modal>
</template>

<script>
  import VModal from "@/components/common/VModal";
  import VButton from "@/components/common/VButton";
  import VTextField from "@/components/common/VTextField";

  import {createNamespacedHelpers} from "vuex";

  const {mapActions} = createNamespacedHelpers("admin");
  export default {
    name: "AdminLoginView",
    components: {
      VTextField,
      VModal,
      VButton
    },
    data() {
      return {
        password: ""
      }
    },
    methods: {
      ...mapActions(["authenticate"]),
      onSubmit() {
        this.authenticate(this.password).then(authenticated => {
          if (authenticated) {
            this.$router.push("/admin")
          }
        });
      }
    }
  }
</script>

<style>
  .admin-login__main {
    margin: 1rem;
  }

  .admin-login__password {
    min-width: 15rem;
  }

  .admin-login__footer {
    width: 100%;
    border-top: 1px solid #ccc;
    display: flex;
    justify-content: center;
    background-color: #dddfcc;
  }

  .admin-login__button {
    margin: 0.4rem;
  }
</style>