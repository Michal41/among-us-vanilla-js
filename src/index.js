import App from "./App";

function component() {
  const element = document.createElement('div');

  element.innerHTML = `<among-us></among-us>`

  return element;
}

document.body.appendChild(component());