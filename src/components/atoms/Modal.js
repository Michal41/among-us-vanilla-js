const template = document.createElement('template');

template.innerHTML = `
<style>
  .modal {
    display: none;
    justify-content: center;
    align-items: center;
    position: fixed;
    width: 100%;
    height: 100%;
    background: rgba(138, 134, 149, 0.9);
    top: 0;
    left: 0;
    zIndex: 100;
  }
  .open {
    display: flex;
  }
</style>
<div class="modal" id="modal">
  <slot></slot>
</div>
`
class Modal extends HTMLElement {
    constructor(){
        super();
        this._shadowRoot = this.attachShadow({ 'mode': 'open' });
        this._shadowRoot.appendChild(template.content.cloneNode(true));
    }

    static get observedAttributes() {
      return ['open'];
    }

    attributeChangedCallback(name, oldValue, newValue) {
      if(name !== 'open') {
        return;
      }
      const modal = this._shadowRoot.querySelector('#modal')
      if(newValue === 'true'){
        modal.setAttribute('class', 'modal open')
      } else {
        modal.setAttribute('class', 'modal')
      }
    }
}

window.customElements.define('custom-modal', Modal);
export default Modal;
