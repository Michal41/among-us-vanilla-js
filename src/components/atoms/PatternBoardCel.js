const template = document.createElement('template');

template.innerHTML = `
<style>
  @keyframes blink {
    0% {
      background-color: #45a8ff;
    }
    80% {
      background-color: #45a8ff;
    }
    100% {
      background-color: #696b69;
    }
  }
  .patternCel {
    width: 115px;
    height: 115px;
    background-color: #696b69;
    border: 3px solid #252625;
    border-radius: 7%;
    box-shadow: inset 0 0 10px;
    color: black;
  }
  .blinkAnimation {
    animation: infinite linear;
    animation-name: blink;
    animation-duration: 625ms;
  }
</style>
<div class="patternCel"></div>
`

class PatternBoardCel extends HTMLElement {
    constructor(){
        super();
        this._shadowRoot = this.attachShadow({ 'mode': 'open' });
        this._shadowRoot.appendChild(template.content.cloneNode(true));
    }
    static get observedAttributes() {
      return ['active'];
    }

    attributeChangedCallback(name, oldValue, newValue) {
      if(name !== 'active') {
        return;
      }
      const cell = this._shadowRoot.querySelector('div')
      if(newValue === 'true') {
        cell.setAttribute('class', 'patternCel blinkAnimation')
      } else {
        cell.setAttribute('class', 'patternCel')
      }
    }

    onAnimationIteration = () => {
      const myEvent = new CustomEvent('nextIteration', {
        bubbles: true,
        composed: true,
      })
      this.dispatchEvent(myEvent);
    }

    connectedCallback() {
      const cell = this._shadowRoot.querySelector('div')
      cell.addEventListener('animationiteration', this.onAnimationIteration)
    }
}

window.customElements.define('pattern-board-cel', PatternBoardCel);
export default PatternBoardCel;
