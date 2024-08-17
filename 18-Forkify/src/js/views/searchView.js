class SearchView {
  #parentEl = document.querySelector('.search');

  #clearInput() {
    this.#parentEl.querySelector('.search__field').value = '';
  }

  getQuery() {
    const queryResult = this.#parentEl.querySelector('.search__field').value;
    this.#clearInput();
    return queryResult;
  }

  addHandlerSearch(handler) {
    this.#parentEl.addEventListener('submit', function (evn) {
      evn.preventDefault();
      handler(); // This function is defined in "controler.js"
    });
  }
}

// Create an Instance (object) of "SearchView" and export it
export default new SearchView();
