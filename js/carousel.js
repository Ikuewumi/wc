// THIS IS A TEMPLATE FILE

const templateWcCarouselv1 = document.createElement('template')
templateWcCarouselv1.innerHTML = `
<div class="wc-carousel">

<header>
   <h1>Title</h1>
</header>

<nav>
   <span class="arrow prev"><</span>
   <span class="number">
      <strong>0</strong>/0
   </span>
   <span class="arrow next">></span>
</nav>

<div class="container">
   <slot />
</div>
</div>

<wc-modal>
<img class="content" src="./assets/carousel/bg01.png" alt="current image">
</wc-modal>


<style>
*{
   margin: 0;
}

.wc-carousel {
   width: min(600px, 90vw);
   height: 50vh;
   background: #fff;
   display: grid;
   grid-template-rows: 9fr 1fr;
   grid-template-columns: 1fr;
   font-family: var(--f, 'Poppins');
   overflow: hidden;
   box-shadow: 0 1px 5px 0px rgb(0 0 0 / 0.04);

   --br: 1.5vmax;
   border-radius: var(--br);
   position: relative;
}



.wc-carousel>* {
   grid-column: 1 / -1;
}

wc-modal img.content {
   object-fit: contain;
   max-width: min(750px, 90%);
   border-radius: 1vmax;
}

wc-modal[open] {
   display: grid;
}

wc-modal {
   display: none;
}

.wc-carousel header {
   position: absolute;
   z-index: 5;
   inset: 0 auto auto 0;
   width: 100%;
   text-align: center;
   font-family: var(--f, 'Poppins');
   font-size: 17px;
   background: rgba(253, 253, 253, 0.952);
   color: rgb(0 0 0 / 0.65);
   border-top-right-radius: var(--br);
   border-top-left-radius: var(--br);
   padding: 0.5rem 0.2rem;
   font-weight: 500;
   transition: 0.4s ease;
   transform: translateY(0%);

}

.wc-carousel:hover>header {
   transform: translateY(-100%);

}

.wc-carousel header h1 {
   font-weight: 500;

}

.wc-carousel>nav {
   grid-row: 2 / -1;
   width: fit-content;
   justify-self: right;
   background: rgba(255, 254, 254, 0.61);
   padding: 0.9rem;
   display: flex;
   align-items: center;
   justify-content: center;
   gap: 0.6rem;
   border-bottom-right-radius: var(--br);
   border-top-left-radius: var(--br);

}

.wc-carousel>.container {
   grid-row: 1 / -1;
}

.wc-carousel>nav {
   font-size: 25px;
   color: rgb(0 0 0 / 0.7)
}

.wc-carousel>nav strong {
   font-size: 30px;

}

.wc-carousel>nav .arrow {
   width: 30px;
   height: 30px;
   background: rgba(58, 58, 58, 0.163);
   border-radius: 50%;
   display: grid;
   place-content: center;
   font-size: 17px;
   cursor: pointer;
   font-weight: 600;
   transition: 0.4s ease;
   border: 0.5px solid rgb(0 0 0 / 0.2);
   user-select: none;
}

.wc-carousel>nav .arrow:hover {
   background: rgb(255 255 255 / 0.3);
   color: rgba(39, 38, 38, 0.815);
}

.wc-carousel .container,
.wc-carousel .container img,
:slotted(img) {
   /* position: absolute; */
   width: 100%;
   height: 100%;
   inset: 0 0 auto auto;
   z-index: 1;
   border-radius: var(--br);

}

.wc-carousel .container {
   display: grid;
   overflow-y: hidden;
   overflow-x: hidden;
   grid-auto-flow: column;
   grid-auto-columns: 100%;
   width: 100%;
   height: 100%;
}

.wc-carousel>nav {
   z-index: 100;
}

::slotted(img),
:host(img) {
   max-width: 100%;
   object-fit: cover;
   height: 100%;
}



</style>

`//Define the template's HTML and CSS here

class Carousel extends HTMLElement {
   constructor() {
      // Do not delete this line
      super();

      // Start things up 
      this.attachShadow({ mode: 'open' })
      this.shadowRoot.appendChild(templateWcCarouselv1.content.cloneNode(true))

   }

   static props = ['title']
   _i = 0

   connectedCallback() {
      setTimeout(() => { this.i = 1 }, 0)

      this.updateUI('title')

      this.prevBtn.addEventListener('click', () => { toPreviousImage(this) })

      this.nextBtn.addEventListener('click', () => { toNextImage(this) })

      this.renderModal()

      window.addEventListener('resize', () => navHtml(this))

   }

   renderModal() {
      this.addEventListener('click', (e) => {
         e.stopPropagation()
         e.preventDefault()

         const valid = this.images.includes(e.target)

         if (!valid) return

         this.modal.innerHTML = `
            <img class="content" src="${e.target.getAttribute('src')}" alt="${e.target.getAttribute('alt') ?? 'Modal Image'}" />
         `

         this.modal.open = true
      })

   }

   disconnectedCallback() {
      // Unmount the element. Remove event listeners and timers
      this.i = 1
      this.prevBtn.removeEventListener('click', _ => { })
      this.nextBtn.removeEventListener('click', _ => { })
      this.removeEventListener('click', _ => { })
      window.removeEventListener('resize', _ => { })



      this.remove()
   }

   updateUI(key) {
      if (!(Carousel.props.includes(key))) throw new DOMException(`cannot update prop:${key}. Prop not found`)

      switch (key) {
         case 'title':
            changeTitle(this)
            break;
      }
   }


   get prevBtn() { return this.shadowRoot.querySelector('span.prev') }
   get nextBtn() { return this.shadowRoot.querySelector('span.next') }
   get modal() { return this.shadowRoot.querySelector('wc-modal') }
   get container() { return this.shadowRoot.querySelector('.container') }
   get images() { return Array.from(this.querySelectorAll('img')) }
   get imagesLength() { return this.querySelectorAll('img').length }
   get navText() { return this.shadowRoot.querySelector('span.number') }

   get i() { return this._i + 1 }
   set i(value) {
      const num = Number(value)
      if (!(Number.isInteger(num) && num >= 1)) throw new DOMException('i must be set to a valid number')
      this._i = value - 1
      navHtml(this)
   }


   get title() {
      return this.getAttribute('title') ?? 'Title'
   }
   set title(value) {
      this.setAttribute('title', `${value}`)
      this.updateUI('title')
   }


}

const changeTitle = (el) => {
   el.shadowRoot.querySelector('header h1').textContent = `${el.title}`
}

const navHtml = (el) => {
   el.container.scrollLeft = el._i * el.container.clientWidth
   el.navText.innerHTML = `<strong>${el.i}</strong>/${el.imagesLength}`
}

const toPreviousImage = (el) => {
   const isValid = el.i > 1
   el.i = isValid ? el.i - 1 : el.imagesLength
}

const toNextImage = (el) => {
   const isValid = el.i < el.imagesLength
   el.i = isValid ? el.i + 1 : 1
}







// Register the element
function register() {
   window.customElements.define('wc-carousel', Carousel)
}

register()