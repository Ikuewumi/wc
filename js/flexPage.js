// THIS IS A TEMPLATE FILE

const template = document.createElement('template')
template.innerHTML = `

<div class="wc-flex-page">
<img src="https://ikuewumi.github.io/wc/assets/flex-page/bg.png" alt="Bg Page">

<section class="content">
   <slot></slot>
</section>
</div>


<style>


.wc-flex-page, .wc-flex-page *, .wc-flex-page p {
   margin: 0;
}
.wc-flex-page {
   --br: 2.5vmax;
   --f: 'Poppins', sans-serif;

   width: min(650px, 95vw);
   height: 60vh;
   display: flex;
   align-items: center;
   /* gap: 0.6rem; */
   background: #fff;
   border-radius: var(--br);
}

.wc-flex-page * {
   font-family: var(--f);

}

.wc-flex-page>img {
   height: 100%;
   max-width: 30%;
   object-fit: cover;

   border-top-left-radius: var(--br);
   border-bottom-left-radius: var(--br);
}

.wc-flex-page>section.content {
   padding-inline: 1rem;
   border-top-right-radius: var(--br);
   border-bottom-right-radius: var(--br);
   display: grid;
   gap: 0.3rem;
}


.wc-flex-page h1 {
   margin-bottom: 0.5rem;
   font-size: 20px;
   font-weight: 500;
}

.wc-flex-page p {
   font-size: 12px;
   /* font-weight: 500; */
   margin: 0;
}

@media (max-width: 550px) {

   .wc-flex-page {
      --br: 3vmax;
      flex-direction: column;
      height: fit-content;
   }

   .wc-flex-page>section.content {
      padding-block: 1rem;
      padding-inline: 2rem;
      padding-bottom: 2.5rem;
      border-bottom-left-radius: var(--br);
      border-bottom-right-radius: var(--br);
   }

   .wc-flex-page>img {
      height: auto;
      width: 100%;
      max-width: none;
      max-height: min(60vh, 150px);
      object-fit: cover;

      border-top-left-radius: var(--br);
      border-top-right-radius: var(--br);
   }


}
</style>

`//Define the template's HTML and CSS here

class FlexPageComponent extends HTMLElement {
   constructor() {
      // Do not delete this line
      super();

      // Start things up 
      this.attachShadow({ mode: 'open' })
      this.shadowRoot.appendChild(template.content.cloneNode(true))

   }
   // Static Property, An array of observed properties
   static props = ['img']

   connectedCallback() {
      // Mount the element. Add event listeners and timers
      this.updateUI('img')
   }

   disconnectedCallback() {
      // Unmount the element. Remove event listeners and timers
      this.remove()
      throw DOMException('element not mounted')
   }

   updateUI(key) {
      if (!(FlexPageComponent.props.includes(key) && this.isConnected)) return this.disconnectedCallback()

      const updateImg = () => {
         this.shadowRoot.querySelector('img').setAttribute('src', this.img)
      }

      switch (key) {
         case 'img':
            updateImg();
            break;
      }
   }


   get img() {
      return this.getAttribute('img') ?? ''
   }

   set img(value) {
      if (typeof value !== 'string' || value > '') throw Error('image can only be a string')
      this.setAttribute('img', `${value}`)
   }


}

// Register the element
function register() {
   window.customElements.define('wc-flex-page', FlexPageComponent)
}

register()