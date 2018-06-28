export default {
  namespaced: true,
  state: {
    photoUrl: "",
    likes: {
      number: 20,
      enabled: false
    },
    comments: {
      enabled: false,
      number: 10
    }
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
    switchLikes({likes}) {
      likes.enabled = !likes.enabled;
    },
    changeNumberOfLikes({likes}, likesNumber) {
      likes.number = likesNumber;
    },
    switchComments({comments}) {
      comments.enabled = !comments.enabled;
    },
    changeNumberOfComments({comments}, commentsNumber) {
      comments.number = commentsNumber;
    }
  }
};