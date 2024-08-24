import View from './View.js';
import icons from 'url:../../img/icons.svg';
//
class PaginationView extends View {
  _parentElement = document.querySelector('.pagination');

  _generateMarkup() {
    const numPages = Math.ceil(
      this._data.results.length / this._data.resultsPerPage
    );
    console.log(numPages);
    // 1. Page 1, and there are other pages
    if (this._data.page === 1 && numPages > 1) {
      return `Page 1 and other pages.`;
    }
    // 2. Last page
    if (this._data.page === numPages && numPages > 1) {
      return `Last page.`;
    }
    // 3. Other page
    if (this._data.page < numPages) {
      return `Other pages.`;
    }
    // 4. Page 1, and NO other pages
    return `Page 1 and NO other pages.`;
  }
}

export default new PaginationView();
