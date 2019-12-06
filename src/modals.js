// HIDE MODAL ON CLICK THE MODAL CLOSE AND MODAL BACKGROUND
const modalBoxLogin = document.querySelector('#modal-box-login');
const modalBoxRegister = document.querySelector('#modal-box-register');
const hideModals = (modal) => {
  // remove show class
  modal.parentElement.classList.remove('show-modal');
  modal.classList.remove('show-modal-box');
  // add hide class
  modal.parentElement.classList.add('hide-modal');
  modal.classList.add('hide-modal-box');
};

const displayingModals = () => {
  // QUERY THE DOM
  const modalCloses = document.querySelectorAll('.modal-box__close');
  const buttonRegister = document.querySelector('#button-register');
  const buttonLogin = document.querySelector('#button-login');
  const linkToModalLogin = document.querySelector('#link-to-login');
  const linkToModalRegister = document.querySelector('#link-to-register');

  // SHOW MODALS ON CLICK BUTTON LOGIN/REGISTER
  const displayModals = (modal) => {
    // if elements have hide class, remove it
    if (modal.classList.contains('hide-modal-box')) {
      modal.classList.remove('hide-modal-box');
    }
    if (modal.parentElement.classList.contains('hide-modal')) {
      modal.parentElement.classList.remove('hide-modal');
    }
    // add show class
    modal.classList.add('show-modal-box');
    modal.parentElement.classList.add('show-modal');
  };

  // LISTEN FOR CLICK EVENTS
  buttonRegister.addEventListener('click', () => {
    displayModals(modalBoxRegister);
  });

  buttonLogin.addEventListener('click', () => {
    displayModals(modalBoxLogin);
  });


  modalCloses.forEach((close) => {
    const closeParent = close.parentElement;
    close.addEventListener('click', () => {
      hideModals(closeParent);
    });
    closeParent.parentElement.addEventListener('click', (e) => {
      // if clicked element has class modal, hide modal
      if (e.target.classList.contains('modal')) {
        hideModals(closeParent);
      }
    });
  });

  // CHANGE MODAL ON CLICK TO LINK ON THE BOTTOM OF MODAL-BOX
  const changeModal = (removeModal, addModal) => {
    removeModal.classList.remove('show-modal-box');
    removeModal.parentElement.classList.remove('show-modal');
    addModal.classList.remove('hide-modal-box');
    addModal.parentElement.classList.remove('hide-modal');
    addModal.classList.add('show-modal-box');
    addModal.parentElement.classList.add('show-modal');
  };

  linkToModalRegister.addEventListener('click', () => {
    changeModal(modalBoxLogin, modalBoxRegister);
  });

  linkToModalLogin.addEventListener('click', () => {
    changeModal(modalBoxRegister, modalBoxLogin);
  });


  // DISPLAYING PAGES MANAGEMENT
  const mainPages = document.querySelectorAll('.main-page'); // all pages
  const navLists = document.querySelectorAll('.nav-list'); // navigations
  const navToggler = document.querySelector('#nav-toggler'); // side navigation toggler

  navLists.forEach((list) => {
    list.addEventListener('click', (e) => { // attach onclick event
      if (e.target.classList.contains('not-page-link')) { // if it's logout link, do nothing
        return;
      }
      // get page to show based on link's data-target
      let pageToShow = null;
      if (e.target.tagName === 'A') pageToShow = document.querySelector(e.target.getAttribute('data-target'));
      else if (e.target.parentElement.tagName === 'A') pageToShow = document.querySelector(e.target.parentElement.getAttribute('data-target'));
      else if (e.target.parentElement.parentElement.tagName === 'A') pageToShow = document.querySelector(e.target.parentElement.parentElement.getAttribute('data-target'));
      if (pageToShow) {
        mainPages.forEach((page) => { // hide all pages
          if (!page.classList.contains('hide')) {
            page.classList.add('hide');
          }
        });
        pageToShow.classList.remove('hide'); // show chosen page
        navToggler.checked = false;
      }
    });
  });
};

// first 3 are outside the main function because I want to export them separately to use in index.js
export {
  modalBoxRegister, modalBoxLogin, hideModals, displayingModals as default,
};
