// THIS IS A TEMPLATE FILE

const templateWcModalv1 = document.createElement('template')
templateWcModalv1.innerHTML = `
   <style>

   :host {
      position: fixed;
      z-index: 259;
      inset: 0 auto auto 0;
   }

   p {
      margin: 0;
   }

   .modal, :host {
      height: 100%;
      width: 100%;
      display: grid;
      place-items: center;
   }

   .modal {
      background: rgb(0 0 0 / 0.4);
   }

   :slotted(.content) {
      max-width: 100%;
   }
   </style>

   <div class="modal">
      <slot />
   </div>
`//Define the template's HTML and CSS here

class Modal extends HTMLElement {
   constructor() {
      // Do not delete this line
      super();

      // Start things up 
      this.attachShadow({ mode: 'open' })
      this.shadowRoot.appendChild(templateWcModalv1.content.cloneNode(true))

   }

   static props = ['open']

   connectedCallback() {
      this.updateUI('open')

      this.addEventListener('click', (e) => {

         if (this === e.target) {
            this.open = !this.open
         }

      })
   }

   disconnectedCallback() {
      this.removeEventListener('click', () => { })
      this.remove()
   }

   updateUI(key) {
      if (!(Modal.props.includes(key))) throw DOMException(`cannot update prop:${key}. Prop not found`)
   }

   get open() {
      return this.hasAttribute('open')
   }

   set open(value) {
      const bool = Boolean(value)
      if (bool === this.open) return
      this.toggleAttribute('open')
      this.updateUI('open')
   }


}

// Register the element
function register() {
   window.customElements.define('wc-modal', Modal)
}

register()