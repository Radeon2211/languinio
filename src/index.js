import '@babel/polyfill';
import displayingModals, { modalBoxRegister, modalBoxLogin, hideModals } from './modals';
import Authentication from './authentication';
import UI from './ui';

displayingModals();

// GET ELEMENTS NEEDED TO UI CLASS
const credsField = document.querySelector('.profile-heading');

// CREATE INSTANCE OF AUTHENTICATION CLASS
const authentication = new Authentication();

// CREATE INSTANCE OF UI CLASS
const ui = new UI(credsField);

// GET INTRO AND MAIN CONTAINERS TO SHOW / HIDE THEM
const introductionContainer = document.querySelector('.introduction-container');
const mainContainer = document.querySelector('.main-container');
const adminItems = document.querySelectorAll('.admin-item');

// LISTEN FOR AUTH STATUS CHANGED START
auth.onAuthStateChanged((user) => {
  if (user) {
    user.getIdTokenResult().then((idTokenResult) => {
      user.admin = idTokenResult.claims.admin;
      if (user.admin) { // if user is admin, show admin items
        adminItems.forEach((item) => {
          item.classList.remove('hide');
        });
      }
    });

    // display user credentials
    ui.displayUserCreds(user);

    // hide introduction page and show main page
    if (!introductionContainer.classList.contains('hide')) {
      introductionContainer.classList.add('hide');
    }
    if (mainContainer.classList.contains('hide')) {
      mainContainer.classList.remove('hide');
    }
  } else {
    // show introduction container and hide main page
    if (introductionContainer.classList.contains('hide')) {
      introductionContainer.classList.remove('hide');
    }
    if (!mainContainer.classList.contains('hide')) {
      mainContainer.classList.add('hide');
    }
  }
});
// LISTEN FOR AUTH STATUS CHANGED END


// REGISTER START
const formRegister = document.querySelector('#form-register');
formRegister.addEventListener('submit', (e) => {
  e.preventDefault();
  // call register method
  authentication.register(formRegister, hideModals, modalBoxRegister);
});
// REGISTER END


// LOGIN START
const formLogin = document.querySelector('#form-login');
formLogin.addEventListener('submit', (e) => {
  e.preventDefault();
  // call login method
  authentication.login(formLogin, hideModals, modalBoxLogin);
});
// LOGIN END


// LOGOUT START
const logoutLinks = document.querySelectorAll('.logout-link');
logoutLinks.forEach((link) => {
  link.addEventListener('click', () => {
    // call logout method
    authentication.logOut();
  });
});
// LOGOUT END


// ADD ADMIN ROLE START
const formAddAdmin = document.querySelector('#form-add-admin');
formAddAdmin.addEventListener('submit', (e) => {
  e.preventDefault();
  const email = formAddAdmin.email.value.trim();
  // call addAdmin method
  authentication.addAdmin(email, formAddAdmin);
});
// ADD ADMIN ROLE END


// DISPLAYING PAGES AND NAV ITEMS MANAGEMENT
const mainPages = document.querySelectorAll('.main-page'); // all pages
const navToggler = document.querySelector('#nav-toggler'); // side navigation toggler
const notAtHomeItems = document.querySelectorAll('.not-at-home-item'); // nav items which shouldn 't display at home page

// HIDING ALL PAGES AND SHOWING WHICH USER WANTS
const hideAllPagesAndShowOne = (pageToShow) => {
  // hide all pages
  mainPages.forEach((page) => {
    if (!page.classList.contains('hide')) {
      page.classList.add('hide');
    }
  });
  // show page to show
  pageToShow.classList.remove('hide');

  // if page to show is home page, hide not home items from navs
  if (pageToShow.classList.contains('home-page')) {
    notAtHomeItems.forEach((item) => {
      item.classList.add('hide');
    });
  } else {
    notAtHomeItems.forEach((item) => { // else, show them
      item.classList.remove('hide');
    });
  }

  // set sidenav toggler checkbox to false
  navToggler.checked = false;
};


// HOME PAGE by clicking the nav link
const linksToHomePage = document.querySelectorAll('.home-link');
const homePage = document.querySelector('.home-page');
linksToHomePage.forEach((link) => {
  link.addEventListener('click', () => {
    hideAllPagesAndShowOne(homePage);
  });
});

// CREATE SET PAGE by clicking the panel at home page or nav link
const linksToCreateSet = document.querySelectorAll('.create-set-link');
const createSetPage = document.querySelector('.create-set-page');
linksToCreateSet.forEach((link) => {
  link.addEventListener('click', () => {
    hideAllPagesAndShowOne(createSetPage);
  });
});

// SEARCH SETS PAGE by clicking the nav link
const linksToSearchSets = document.querySelectorAll('.search-sets-link');
const searchSetsPage = document.querySelector('.search-sets-page');
linksToSearchSets.forEach((link) => {
  link.addEventListener('click', () => {
    hideAllPagesAndShowOne(searchSetsPage);
  });
});

// PROFILE PAGE by clicking the nav link
const linksToProfilePage = document.querySelectorAll('.profile-link');
const profilePage = document.querySelector('.profile-page');
linksToProfilePage.forEach((link) => {
  link.addEventListener('click', () => {
    hideAllPagesAndShowOne(profilePage);
  });
});

// ADMIN PAGE by clicking the nav link
const linksToAdminPage = document.querySelectorAll('.admin-link');
const adminPage = document.querySelector('.admin-page');
linksToAdminPage.forEach((link) => {
  link.addEventListener('click', () => {
    hideAllPagesAndShowOne(adminPage);
  });
});
