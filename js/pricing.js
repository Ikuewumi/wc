// THIS IS A TEMPLATE FILE

const templateWcPricing = document.createElement('template')
templateWcPricing.innerHTML = `
<div class="wc-pricing">
      <img src="" alt="Dummy Picture">
      <h2 role="heading"><slot name="title">title</slot></h2>
      <div class="price">
         <span class="number"><slot name="price">$30</slot></span>
         <span class="duration">/month</span>
      </div>

      <button role="button" class="buy"><slot name="btn">BUY</slot></button>

      <ul class="features">
      </ul>
   </div>

   <!-- STyling for pricing component -->
   <style>

      wc-pricing, :host {
         width: fit-content;
         height: fit-content;
      }
      .wc-pricing, .wc-pricing *, .wc-pricing p {
         margin: 0;
         padding: 0;
         box-sizing: border-box;
         font-family: 'Poppins', 'Verdana';
      }

      .wc-pricing {
         width: min(350px, 90vw);
         padding: 1.2rem 0.4rem;
         padding-bottom: 2.7rem;
         display: grid;
         place-items: center;
         gap: 0.7rem;
         border: 1px solid rgb(0 0 0 / 0.1);
         border-radius: 1vmax;
         background: #fff;
      }

      .wc-pricing > img, .wc-pricing > svg {
         width: min(60vw, 150px);
      }

      .wc-pricing h2 {
         font-size: 2rem;
      }

      .wc-pricing .price {
         display: flex;
         align-items: baseline;
         line-height: 1;
      }

      .wc-pricing .price .number {
         font-size: 1.4rem;
         font-weight: 300;
      }

      .wc-pricing .price .duration {
         font-size: 0.9rem;
      }

      .wc-pricing button {
         margin-top: 0.8rem;
         /* padding: 0.4rem 1.2rem; */
         width: min(150px, 80%);
         padding-block: 0.5rem;
         border-radius: 4vmax;
         background: rgb(140 199 140);
         cursor: pointer;
         border: none;
         outline: none;
         font-size: 1.2rem;
         transition: 0.2s ease;
      }

      .wc-pricing button:hover {
         background: rgb(140 199 140);
         color: #fff;
      }

      .wc-pricing ul {
         margin-top: 1.2rem;
         display: grid;
         gap: 0.4rem;
      }

      .wc-pricing ul li {
         list-style: none;
         display: grid;
         grid-template-columns: 17px auto;
         align-items: center;
         font-size: 13px;
      }

      .wc-pricing ul li::before {
         content: '';
         background-image: url('./assets/pricing/mark.svg');
         background-size: contain;
         background-repeat: no-repeat;
         background-position: center center;
         width: 7px;
         height: 7px;
         padding: .2rem;
         aspect-ratio: 1 / 1;
         /* background: red; */
         /* background-size: contain; */
      }
   </style>
`//Define the template's HTML and CSS here

class Pricing extends HTMLElement {
   constructor() {
      // Do not delete this line
      super();

      // Start things up 
      this.attachShadow({ mode: 'open' })
      this.shadowRoot.appendChild(templateWcPricing.content.cloneNode(true))

   }

   connectedCallback() {
      // Mount the element. Add event listeners and timers
      this.updateFeatures()
      this.updateImg()
   }

   disconnectedCallback() {
      // Unmount the element. Remove event listeners and timers
      this.remove()
   }


   updateUI(key) {
      // Optional. Used to update the UI. A custom method
      if (!this.isConnected) return this.disconnectedCallback()

      const updateObject = {
         features: this.updateFeatures,
         img: this.updateImg
      }


      setTimeout(() => {
         if (key in updateObject) {
            updateObject[key]()
         }
      }, 0)
   }



   // UPDATE FUNCTIONS

   updateFeatures() {
      this.checkConnection()
      let processedStr = ''

      this.features.forEach(feature => {
         const str = `<li>${feature}</li>`
         processedStr += str
      })

      this.shadowRoot.querySelector('ul').innerHTML = `${processedStr}`


   }

   updateImg() {
      this.checkConnection()
      this.shadowRoot.querySelector('img').setAttribute('src', this.img)
   }

   // check if placed
   checkConnection() {
      if (!this.isConnected) throw new DOMException('Element is not there')
   }



   // GETTERS AND SETTERS

   get features() {
      const array = []
      const text = this.getAttribute('features') ?? ''

      if (text > '') {
         array.push(...text.split(',').map(key => key.trim()))
      }

      console.log(text, array)

      return array
   }

   set features(value) {
      const array = []
      if (typeof value === 'string' && value > '') {
         array.push(...value.split(',').map(key => key.trim()))
      }

      if (Array.isArray(value)) { array.push(...value) }

      this.setAttribute('features', array.join(','))
      this.updateFeatures()

   }

   get img() {
      return this.getAttribute('img') ?? './assets/pricing/leaf.svg'
   }

   set img(value) {
      this.setAttribute('img', value ?? '')
      this.updateImg()
   }


}

// Register the element
function register() {
   window.customElements.define('wc-pricing', Pricing)
}

register()