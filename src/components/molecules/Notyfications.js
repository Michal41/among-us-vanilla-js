import Modal from "../atoms/Modal";

const template = document.createElement('template');

template.innerHTML = `
<style>
  .vinNotyfication {
    background: white;
    padding: 5em;
    border-radius: 15px;
    position: relative;
  }
  .close {
    position: absolute;
    top: 0px;
    right: 10px;
    cursor: pointer;
    font-size: 25px;
    font-family: Arial;
  }

</style>
<div>
  <custom-modal open="false" id="modal">
    <h3 class="vinNotyfication">
      Congratulations task compleated
      <div class="close" id="closeModal">
        x
      </div>
    </h3>
  </custom-modal>
</div>
`
class Notyfications extends HTMLElement {
    constructor(){
        super();
        this._shadowRoot = this.attachShadow({ 'mode': 'open' });
        this._shadowRoot.appendChild(template.content.cloneNode(true));
    }

    static get observedAttributes() {
      return ['taskcompleted'];
    }

    attributeChangedCallback(name, oldValue, newValue) {
      if(name !== 'taskcompleted'){
        return;
      }
      const modal = this._shadowRoot.querySelector('#modal')
      if(newValue === 'true') {
        modal.setAttribute('open', true)
      }
    }

    connectedCallback() {
      const closeButton = this._shadowRoot.querySelector('#closeModal')
      const modal = this._shadowRoot.querySelector('#modal')
      closeButton.onclick = () => { modal.setAttribute('open', false)}
    }
}

window.customElements.define('game-notyfications', Notyfications);
export default Notyfications;
