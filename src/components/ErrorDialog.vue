<template>
  <v-dialog/>
</template>

<script>
  import {mapState, mapMutations} from "vuex";

  export default {
    name: "ErrorDialog",
    computed: {
      ...mapState("service", ["status"]),
      ...mapState("settings", ["photoUrl"]),
      ...mapMutations("service", ["setStatus"])
    },
    watch: {
      status({value}) {
        let errorMessage;
        let icon;
        switch (value) {
          case "OK":
            errorMessage = "<div style=\"display: flex; align-items: center;\"><img style=\"width:4rem; height: 4rem; margin-right: 1rem;\" src=\"success.svg\"/><span style=\"font-weight: bold; font-size: 1rem\">Uruchomiono. Akcje ruszą do 5 minut.</span></div>";
            icon = "success";
            break;
          case "UNAUTHORIZED":
            errorMessage = "Użytkownik, który udostępnił zdjęcie nie ma dostępu do serwisu";
            break;
          case "API_UNAVAILABLE":
            errorMessage = "Brak połączenia z serwisem";
            break;
          case "ALREADY_PROCESSING":
            errorMessage = "Zdjęcie już jest w trakcie przetwarzania";
            break;
          case "NO_COMMENTS":
            errorMessage = "Nie dodano komentarzy";
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