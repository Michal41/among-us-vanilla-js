const template = document.createElement('template');

template.innerHTML = `
<style>
  .button {
    outline: none;
    background: #45a8ff;
    color: white;
    padding: 12px 25px;
    margin-left: 10px;
    border-radius: 5px;
    box-shadow: inset 0 0 10px;
    font-size: 16px;
    border: none;
    cursor: pointer;
  }
  .button:hover {
    box-shadow: inset 0px 0px 0px 10px #45a8ff;
  }
</style>
<button class="button"></button>
`

class Button extends HTMLElement {
    constructor(){
        super();
        this._shadowRoot = this.attachShadow({ 'mode': 'open' });
        this._shadowRoot.appendChild(template.content.cloneNode(true));
    }
    onClick = (event) => {
      const myEvent = new CustomEvent('onClick', {
        bubbles: true,
        composed: true,
      })
      this.dispatchEvent(myEvent);
    }

    connectedCallback() {
        const labelProp = this.getAttribute('label');
        const button = this._shadowRoot.querySelector('button')
        button.innerHTML = labelProp;
        button.onclick = this.onClick;
    }
}

window.customElements.define('custom-button', Button);
export default Button;
