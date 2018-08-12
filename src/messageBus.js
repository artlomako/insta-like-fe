let callbacks = [];

export const subscribe = (cb) => {
  callbacks.push(cb);
};

const emit = (event) => {
  callbacks.forEach(cb => cb(event));
};

export const commentsStarted = () => {
  emit({
    text: "Uruchomiono. Akcje ruszą w ciągu 5 minut",
    icon: "deal.svg"
  });
};

export const likesStarted = () => {
  emit({
    text: "Uruchomiono. Akcje ruszą w ciągu godziny",
    icon: "deal.svg"
  });
};

export const accessDenied = () => {
  emit({
    text: "Użytkownik, który udostępnił zdjęcie nie ma dostępu do serwisu",
    icon: "warning.svg"
  });
};

export const apiUnavailable = () => {
  emit({
    text: "Brak połączenia z serwisem",
    icon: "warning.svg"
  });
};

export const alreadyProcessing = () => {
  emit({
    text: "Zdjęcie już jest w trakcie przetwarzania",
    icon: "warning.svg"
  });
};

export const noComments = () => {
  emit({
    text: "Nie dodano komentarzy",
    icon: "warning.svg"
  })
};

export const invalidPhotoUrl = () => {
  emit({
    text: "Niepoprawny link do zdjęcia",
    icon: "warning.svg"
  });
};

export const emptyPhotoUrl = () => {
  emit({
    text: "Link do zdjęcia nie może być pusty",
    icon: "warning.svg"
  });
};

export const error = () => {
  emit({
    text: "Wystąpił nieoczekiwany błąd",
    icon: "warning.svg"
  });
};

export const invalidPassword = () => {
  emit({
    text: "Wprowadzono złe hasło",
    icon: "warning.svg"
  });
};

export const authorizationError = () => {
  emit({
    text: "Brak uprawnień. Zaloguj się ponownie",
    icon: "warning.svg"
  });
};