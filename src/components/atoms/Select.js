const template = document.createElement('template');

template.innerHTML = `
<style>
  .select {
    padding: 10px;
    min-width: 200px;
    border-radius: 5px;
    margin-left: 10px;
    font-size: 16px;
  }
  .label {
    font-weight: bold;
  }
</style>
<label class=label></label>
<select class=select></select>
`
class Select extends HTMLElement {
    constructor(){
        super();
        this._shadowRoot = this.attachShadow({ 'mode': 'open' });
        this._shadowRoot.appendChild(template.content.cloneNode(true));
    }

    static get observedAttributes() {
      return ['options', 'value'];
    }


    attributeChangedCallback(name, oldValue, newValue) {
      this.populateSelectOptions()
    }

    onChange = (event) => {
      const myEvent = new CustomEvent('onChange', {
        bubbles: true,
        composed: true,
        detail: {
          value: event.target.value,
        },
      })
      this.dispatchEvent(myEvent);
    }

    populateSelectOptions = () => {
      const propValue = this.getAttribute('value')
      const options = JSON.parse(this.getAttribute('options'))
      const select = this._shadowRoot.querySelector('select')
      select.innerHTML = options?.map(({label, value}) => (
        `<option value=${value} ${value == propValue ? 'selected' : ''}>
          ${label}
        </option>`
      ))
    }

    connectedCallback() {
        const name = this.getAttribute('name');
        const labelProp = this.getAttribute('label');
        const label = this._shadowRoot.querySelector('label')
        const select = this._shadowRoot.querySelector('select')
        select.onchange = this.onChange
        select.setAttribute('id', name)
        label.setAttribute('for', name)
        label.innerHTML = labelProp
        this.populateSelectOptions()
    }
}

window.customElements.define('custom-select', Select);
export default Select;
