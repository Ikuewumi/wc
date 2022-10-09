// THIS IS A TEMPLATE FILE

const template = document.createElement('template')
template.innerHTML = ``//Define the template's HTML and CSS here

class Component extends HTMLElement {
   constructor() {
      // Do not delete this line
      super();

      // Start things up 
      this.attachShadow({ mode: 'open' })
      this.shadowRoot.appendChild(template.content.cloneNode(true))

   }

   static props = []

   connectedCallback() {
      // Mount the element. Add event listeners and timers
   }

   disconnectedCallback() {
      // Unmount the element. Remove event listeners and timers
   }

   updateUI() {
      // Optional. Used to update the UI. A custom method
   }


}

// Register the element
function register() {
   window.customElements.define('new-component', Component)
}

register()