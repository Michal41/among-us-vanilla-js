import PatternBoardCel from "../atoms/PatternBoardCel";

const template = document.createElement('template');

template.innerHTML = `
<style>
  .patternBoard {
    margin: 15px;
    min-width: 530px;
    display: grid;
    grid-template-columns: repeat(auto-fill, 120px);
    width: 530px;
    background: #a1a3a2;
    border: 30px inset #cbcdca;
    padding: 20px;
    border-radius: 5%;
    grid-gap: 10px;
  }
</style>
<div class="patternBoard" id="patternBoard">
</div>
`

class PatternBoard extends HTMLElement {
  constructor(){
    super();
    this._shadowRoot = this.attachShadow({ 'mode': 'open' });
    this._shadowRoot.appendChild(template.content.cloneNode(true));
  }
  static get observedAttributes() {
    return ['activecell'];
  }
  attributeChangedCallback(name, oldValue, newValue) {
    if(name !== 'activecell') {
        return;
    }
    this.renderBoard(newValue)
  }

  renderBoard = (activeCel) => {
    const patternBoard = this._shadowRoot.querySelector('#patternBoard')
    patternBoard.innerHTML = [...Array(16).keys()].map((ceilNumber) =>
        (`<pattern-board-cel active=${ceilNumber.toString() === activeCel}></pattern-board-cel>`)).join('')
  }

  connectedCallback() {
    this.renderBoard()
  }
}

window.customElements.define('pattern-board', PatternBoard);
export default PatternBoard;
