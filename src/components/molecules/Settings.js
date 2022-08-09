import Button from "../atoms/button";
import Select from "../atoms/Select";

const template = document.createElement('template');
template.innerHTML = `
<style>
  .settings {
    text-align: center;
    margin: 5em 0em 3em 0em;
  }
</style>
<div class="settings">
  <custom-select
    id="levelSelect"
    name="levelSelect"
    label="Chose level"
    options=[{"label":"1","value":"1"},{"label":"5","value":"5"}]></custom-select>
  <custom-button id="startButton" label="Start"></custom-button>
  <custom-button label="Reset" id="resetButton"></custom-button>
</div>
`

class Settings extends HTMLElement {
    constructor(){
        super();
        this._shadowRoot = this.attachShadow({ 'mode': 'open' });
        this._shadowRoot.appendChild(template.content.cloneNode(true));
        this.level='5';
    }

    handleStartButtonClick = () => {
      const myEvent = new CustomEvent('createNewPattern', {
        bubbles: true,
        composed: true,
        detail: {
          level: this.level,
        },
      })
      this.dispatchEvent(myEvent);
    }
    handleResetButtonClick = () => {
      const myEvent = new CustomEvent('resetBoard', {
        bubbles: true,
        composed: true,
      })
      this.dispatchEvent(myEvent);
    }
    connectedCallback() {
      const selectOptions = [...Array(10).keys()].map((item) => ({ value: `${item + 1}`, label: `${item + 1}` }))
      const levelSelect = this._shadowRoot.querySelector('#levelSelect')
      const startButton = this._shadowRoot.querySelector('#startButton')
      const restetButton = this._shadowRoot.querySelector('#resetButton')
      levelSelect.setAttribute('options', JSON.stringify(selectOptions))
      levelSelect.setAttribute('value', this.level)
      levelSelect.addEventListener('onChange', ({ detail : { value }}) => { this.level = value })
      startButton.addEventListener('onClick', this.handleStartButtonClick)
      restetButton.addEventListener('onClick', this.handleResetButtonClick)
    }
}

window.customElements.define('application-settings', Settings);

export default Settings;
