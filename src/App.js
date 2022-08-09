import GameBoard from "./components/molecules/GameBoard";
import PatternBoard from "./components/molecules/PatternBoard";
import Settings from "./components/molecules/Settings";

const template = document.createElement('template');
template.innerHTML = `
  <style>
    * {
      box-sizing: border-box;
    }
    .container {
      max-width: 1500px;
      margin: auto;
      display: flex;
      justify-content: space-between;
    }
  </style>
  <div>
    <application-settings id="applicationSettings"></application-settings>
    <div class="container">
      <pattern-board id="patternBoard"></pattern-board>
      <game-board id="gameBoard" blocked="true"></game-board>
    </div>
  </div>
`

class App extends HTMLElement {
    constructor(){
        super();
        this._shadowRoot = this.attachShadow({ 'mode': 'open' });
        this._shadowRoot.appendChild(template.content.cloneNode(true));
        this.pattern = []
        this.iteration = 0
        this.checkedBoxes = []
        this.currentLevelPattern = []
    }
    handleNextIteration = () => {
      const patternBoard = this._shadowRoot.querySelector('#patternBoard')
      patternBoard.setAttribute('activeCell', this.currentLevelPattern[this.iteration])
      if(this.iteration  === this.currentLevelPattern.length) {
        this.setBoardBlocked(false)
      }
      this.iteration = this.iteration + 1
    }
    handleCreateNewPattern = ({ detail: { level } }) => {
      this.pattern = Array.from({length: level}, () => Math.floor(Math.random() * 16))
      this.iteration = 0
      this.currentLevelPattern = [this.pattern[0]]
      this.handleNextIteration()
    }
    handleAddcheckedBox = ({ detail: { cel } }) => {
      const checked = [ ...this.checkedBoxes, parseInt(cel) ]
      if (checked.length < this.currentLevelPattern.length) {
        this.checkedBoxes = checked
        return;
      }
      if (JSON.stringify(checked) === JSON.stringify(this.currentLevelPattern)) {
        this.currentLevelPattern = [...this.currentLevelPattern, this.pattern[this.iteration]]
        this.iteration = 0
        this.checkedBoxes = []
        this.setBoardBlocked(true)
        this.handleNextIteration()
        return;
      }
      this.checkedBoxes = []
      this.iteration = 0
      this.setBoardBlocked(true)
      this.handleNextIteration()
    }

    setBoardBlocked = (value) => {
      this._shadowRoot.querySelector('#gameBoard').setAttribute('blocked', value)
    }

    connectedCallback() {
      const applicationSettings = this._shadowRoot.querySelector('#applicationSettings')
      const patternBoard = this._shadowRoot.querySelector('#patternBoard')
      const gameBoard = this._shadowRoot.querySelector('#gameBoard')
      applicationSettings.addEventListener('createNewPattern', this.handleCreateNewPattern)
      patternBoard.addEventListener('nextIteration', this.handleNextIteration)
      gameBoard.addEventListener('addCheckedBox', this.handleAddcheckedBox)
    }
}


window.customElements.define('among-us', App);

export default App;
