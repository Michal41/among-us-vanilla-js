import App from "./components/organisms/AmongUs";

function component() {
  window.addEventListener('error', (event) => {
    element.innerHTML = `<h1>Sorry something went wrong</h1>`
  });
  const element = document.createElement('div');
  element.innerHTML = `<among-us></among-us>`

  return element;
}

document.body.appendChild(component());