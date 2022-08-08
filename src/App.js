import Settings from "./components/molecules/Settings";

const template = document.createElement('template');
template.innerHTML = `
  <div>
    <application-settings id="applicationSettings"></application-settings>
  </div>
`


class App extends HTMLElement {
    constructor(){
        super();
        this._shadowRoot = this.attachShadow({ 'mode': 'open' });
        this._shadowRoot.appendChild(template.content.cloneNode(true));
    }
    connectedCallback() {
      const applicationSettings = this._shadowRoot.querySelector('#applicationSettings')
      applicationSettings.addEventListener('createNewPattern', (event) => {console.log(event)})
    }
}


window.customElements.define('among-us', App);

export default App;
