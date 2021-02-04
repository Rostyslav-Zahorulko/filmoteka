const apiServise = {
  query: '',
  page: 1,

  setQuery(value) {
    this.query = value;
  },

  setPage(value) {
    this.page = value;
  },

  incrementPage() {
    this.page += 1;
  },

  decrementPage() {
    this.page -= 1;
  },

  resetPage() {
    this.page = 1;
  },
};

export default apiServise;
