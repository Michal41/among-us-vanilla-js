const template = document.createElement('template');

template.innerHTML = `
<style>
  .gameCel {
    width: 115px;
    height: 115px;
    background-color: #696b69;
    border: 3px solid #252625;
    border-radius: 7%;
    box-shadow: inset 0 0 10px;
    color: black;
    cursor: pointer;
  }
  .gameCel:disabled {
    cursor: not-allowed;
  }
</style>
<button class="gameCel"></button>
`

class GameBoardCel extends HTMLElement {
    constructor(){
        super();
        this._shadowRoot = this.attachShadow({ 'mode': 'open' });
        this._shadowRoot.appendChild(template.content.cloneNode(true));
    }
    static get observedAttributes() {
      return ['disabled'];
    }
    attributeChangedCallback(name, oldValue, newValue) {
      if(name !== 'disabled') {
        return;
      }
      const button = this._shadowRoot.querySelector('button')
      if(newValue === 'true'){
        button.setAttribute('disabled', 'true')
      } else {
        button.removeAttribute('disabled')
      }
    }

    handleButtonClick = () => {
      const myEvent = new CustomEvent('addCheckedBox', {
        bubbles: true,
        composed: true,
        detail: {
          cell: this.getAttribute('celNumber')
        }
      })
      this.dispatchEvent(myEvent);
    }

    connectedCallback() {
      const button = this._shadowRoot.querySelector('button')
      button.onclick = this.handleButtonClick
    }
}

window.customElements.define('game-board-cel', GameBoardCel);
export default GameBoardCel;
