import GameBoardCel from "../atoms/GameBoardCel";

const template = document.createElement('template');

template.innerHTML = `
<style>
  .gameBoard {
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
<div class="gameBoard" id="gameBoard">
</div>
`

class GameBoard extends HTMLElement {
    constructor(){
        super();
        this._shadowRoot = this.attachShadow({ 'mode': 'open' });
        this._shadowRoot.appendChild(template.content.cloneNode(true));
    }

    connectedCallback() {
      const gameBoard = this._shadowRoot.querySelector('#gameBoard')
      gameBoard.innerHTML = [...Array(16).keys()].map((ceilNumber) =>
          (`<game-board-cel celNumber=${ceilNumber} disabled=${false}>
            </game-board-cel>`)).join('')
    }
}

window.customElements.define('game-board', GameBoard);
export default GameBoard;
