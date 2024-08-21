class SearchView {
  _parentEl = document.querySelector('.search');

  _clearInput() {
    this._parentEl.querySelector('.search__field').value = '';
  }

  getQuery() {
    const queryResult = this._parentEl.querySelector('.search__field').value;
    this._clearInput();
    return queryResult;
  }

  addHandlerSearch(handler) {
    this._parentEl.addEventListener('submit', function (evn) {
      evn.preventDefault();
      handler(); // This function is defined in "controler.js"
    });
  }
}

// Create an Instance (object) of "SearchView" and export it
export default new SearchView();
