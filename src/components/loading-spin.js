class LoadingSpin extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <div class="loading-overlay">
        <div class="spinner"></div>
        <span>Loading...</span>
      </div>
    `;
  }
}

customElements.define("loading-spin", LoadingSpin);
