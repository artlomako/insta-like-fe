<template>
  <v-dialog/>
</template>

<script>
  import {createNamespacedHelpers} from "vuex";

  const {mapState, mapMutations} = createNamespacedHelpers("service");

  export default {
    name: "ErrorDialog",
    computed: {
      ...mapState(["status"]),
      ...mapMutations(["setStatus"])
    },
    watch: {
      status({value}) {
        let errorMessage;
        switch (value) {
          case "UNAUTHORIZED":
            errorMessage = "Użytkownik, który udostępnił zdjęcie nie ma dostępu do serwisu";
            break;
          case "API_UNAVAILABLE":
            errorMessage = "Brak połączenia z serwisem";
            break;
          case "INVALID_PHOTO_URL":
            errorMessage = "Niepoprawny link do zdjęcia";
            break;
          case "NO_OPTION_CHOSEN":
            errorMessage = "Wybierz przynajmniej jedną opcję: <strong>Like</strong> lub <strong>Komentarz</strong>";
            break;
          case "ERROR":
            errorMessage = "Wystąpił nieoczekiwany błąd";
            break;
        }
        if (errorMessage) {
          this.$modal.show("dialog", {
            text: errorMessage,
            buttons: [
              {
                title: "OK",
                default: true
              }
            ]
          });
        }
      }
    }
  }

</script>

<style scoped>

</style>