export default {
  namespaced: true,
  state: {
    photoUrl: "",
    shouldLike: true,
    shouldComment: true
  },
  getters: {
    photoUrlValid({photoUrl}) {
      return (
          photoUrl.trim().length === 0 ||
          /^(https?:\/\/)?(www\.)?instagram\.com\/.+/.test(
              photoUrl.trim().toLowerCase()
          )
      );
    },
  },
  mutations: {
    changePhotoUrl(state, newUrl) {
      state.photoUrl = newUrl;
    },
    switchShouldLike(state) {
      state.shouldLike = !state.shouldLike;
    },
    switchShouldComment(state) {
      state.shouldComment = !state.shouldComment;
    },
  }
};