import PatternBoard from "./components/molecules/PatternBoard";
import Settings from "./components/molecules/Settings";

const template = document.createElement('template');
template.innerHTML = `
  <style>
    * {
      box-sizing: border-box;
    }
  </style>
  <div>
    <application-settings id="applicationSettings"></application-settings>
    <pattern-board id="patternBoard"></pattern-board>
  </div>
`

class App extends HTMLElement {
    constructor(){
        super();
        this._shadowRoot = this.attachShadow({ 'mode': 'open' });
        this._shadowRoot.appendChild(template.content.cloneNode(true));
        this.pattern = []
        this.itertation = 0
    }
    handleNextIteration = () => {
      const patternBoard = this._shadowRoot.querySelector('#patternBoard')
      patternBoard.setAttribute('activeCell', this.pattern[this.itertation])
      this.itertation = this.itertation + 1
    }
    handleCreateNewPattern = ({ detail: { level } }) => {
      this.pattern = Array.from({length: level}, () => Math.floor(Math.random() * 16))
      this.itertation = 0
      this.handleNextIteration()
    }
    connectedCallback() {
      const applicationSettings = this._shadowRoot.querySelector('#applicationSettings')
      const patternBoard = this._shadowRoot.querySelector('#patternBoard')
      applicationSettings.addEventListener('createNewPattern', this.handleCreateNewPattern)
      patternBoard.addEventListener('nextIteration', this.handleNextIteration)
    }
}


window.customElements.define('among-us', App);

export default App;
