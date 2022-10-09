const templateWcUserCard = document.createElement('template')
templateWcUserCard.innerHTML = `
<div class="wc-user-card">
<img src="https://ikuewumi.github.io/wc/assets/user-card/user.jpg" alt="User Picture" class="user_img">
<section class="content">
   <h2 class="name"><slot name="name">Imagine Dragons</slot></h2>
   <strong class="email"><slot name="email">imagine@dragons.co.uk</slot></strong>
   <span class="position"><slot name="positon">Artiste Grande</slot></span>
   <p><slot name="description">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Veniam libero distinctio perspiciatis ipsa itaque quibusdam impedit corporis dignissimos excepturi exercitationem.</slot></p>
</section>
</div>

<style>
wc-user-card,
:host {
   width: fit-content;
}

.wc-user-card,
.wc-user-card *,
.wc-user-card p {
   margin: 0;
   padding: 0;
   font-family: 'Urbanist', 'Poppins', 'Verdana', sans-serif;
}

.wc-user-card {
   width: min(450px, 90vw);
   font-size: 14px;
   display: flex;
   gap: 0.7rem;
   align-items: start;
   padding: 0.8rem 1rem;
   padding-bottom: 1.4rem;
   /* border: 0.5px solid rgb(0 0 0 / 0.2); */
   border-radius: 0.5vmax;
   box-shadow: 0 0 2px -1.5px rgb(0 0 0 / 0.02);
   line-height: 1.5;
   background: #fff;
   font-family: 'Urbanist', 'Verdana', sans-serif;
   /* flex-wrap: wrap; */
   /* grid-template-columns: repeat(auto-fit); */
}



.wc-user-card img {
   max-width: 100%;
   width: 100px;
   height: auto;
   border-radius: 0.5vmax;
}

.wc-user-card section.content {
   display: grid;
   gap: 0.4rem;
   font-weight: 400;
}

.wc-user-card h2 {
   line-height: 1;
   font-size: 1.9rem;
   font-weight: 600;
   font-family: 'Urbanist';
}

.wc-user-card strong {
   font-size: 1.0rem;
   font-weight: 400;
}

.wc-user-card .position {
   margin-top: 0.1rem;
   font-weight: 600;
   font-size: 0.9rem;
}

.wc-user-card p {
   /* font-family: 'Work Sans'; */
   font-weight: 400;
   font-size: 0.8rem;
   letter-spacing: 0.2px;
}

@media (max-width: 485px) {
   .wc-user-card {
      flex-direction: column;
   }
}
</style>
`//Define the template's HTML and CSS here

class UserCard extends HTMLElement {
   constructor() {
      // Do not delete this line
      super();

      // Start things up 
      this.attachShadow({ mode: 'open' })
      this.shadowRoot.appendChild(templateWcUserCard.content.cloneNode(true))

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
      if (!(UserCard.props.includes(key) && this.isConnected)) return this.disconnectedCallback()

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
   window.customElements.define('wc-user-card', UserCard)
}

register()