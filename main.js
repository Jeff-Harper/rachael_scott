'use strict';

/* ---------------- Animation observer ---------------- */
/* ---------------------------------------------------- */
const animationObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.setAttribute('data-animate', '');
      return;
    }
  });
}, { threshold: 0.4 });


const animatedElements = document.querySelectorAll('[class*="animate"]');
animatedElements.forEach((element) => animationObserver.observe(element));



/* ---------------- Primary Navigation ---------------- */
/* ---------------------------------------------------- */

const primaryNav = document.querySelector(".primary-navigation");
const navToggle = document.querySelector(".mobile-nav-toggle");

navToggle.addEventListener('click', () => {
  const visibility = primaryNav.getAttribute("data-visible");

  if (visibility === "false") {
    primaryNav.setAttribute("data-visible", true);
    navToggle.setAttribute("aria-expanded", true);
  } else if (visibility === "true") {
    primaryNav.setAttribute("data-visible", false);
    navToggle.setAttribute("aria-expanded", false);
  }
})



/* -------------------- Accordian --------------------- */
/* ---------------------------------------------------- */

class Accordion {
  constructor(domNode) {
    this.rootEl = domNode;
    this.buttonEl = this.rootEl.querySelector('button[aria-expanded]');
    this.open = this.buttonEl.getAttribute('aria-expanded') === 'true';

    const controlsId = this.buttonEl.getAttribute('aria-controls');
    this.contentEl = document.getElementById(controlsId);

    // add event listeners
    this.buttonEl.addEventListener('click', this.onButtonClick.bind(this));
  }

  onButtonClick() {
    // update the internal state
    this.determineOpenState();
    this.closeOtherContent(!this.open);
    this.toggle(!this.open);
  }

  determineOpenState() {
    this.open = this.buttonEl.getAttribute('aria-expanded') === 'true';
  }

  closeOtherContent(open) {
    if (open) {
      console.log(open);
      console.log(this.open);
      const allButtons = document.querySelectorAll(".accordion-trigger[data-accordion-active]")
      allButtons.forEach(button => {
        const ariaControl = button.getAttribute('aria-controls');
        const content = document.querySelector(`#${ariaControl}`);
        button.removeAttribute('data-accordion-active');
        button.setAttribute('aria-expanded', false);
        content.setAttribute('data-hidden', '');
      })
    };
  }

  toggle(open) {
    // don't do anything if the open state doesn't change
    if (open === this.open) {
      return;
    }

    // update the internal state
    /* this.open = open; */

    // handle DOM updates
    this.buttonEl.setAttribute('aria-expanded', `${open}`);
    if (open) {
      this.contentEl.removeAttribute('data-hidden');
      this.buttonEl.setAttribute('data-accordion-active', '')
    } else {
      this.contentEl.setAttribute('data-hidden', '');
      this.buttonEl.removeAttribute('data-accordion-active');
    }
  }

// Add public open and close methods for convenience
  open() {
    this.toggle(true);
  }

  close() {
    this.toggle(false);
  }

}

const accordions = document.querySelectorAll('.accordion h3');
accordions.forEach((accordionEl) => {
  new Accordion(accordionEl);
});

/* ♡ */
/* &#9825; */



