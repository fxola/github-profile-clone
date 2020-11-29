import { grab } from "./utils.js";

const secondaryHeader = grab("secondary-header");
const miniProfileDetail = grab("mini-profile-detail");
const profileDropdownWrapper = grab("nav-profile");
const profileDropdownContent = grab("nav-profile-content");
const addNewDropdownWrapper = grab("nav-add-new");
const addNewDropdownContent = grab("nav-add-new-content");
const hamburger = grab("hamburger-icon");
const navigationBlock = grab("nav-block");

const handleScrollInteractions = scrollPosition => {
  if (scrollPosition >= 60) {
    secondaryHeader.classList.remove("top-pad");
    if (scrollPosition >= 350) {
      miniProfileDetail.classList.add("show");
    } else {
      miniProfileDetail.classList.remove("show");
    }
  } else {
    secondaryHeader.classList.add("top-pad");
  }
};

let lastKnownScrollPositionition = 0;
let ticking = false;

window.addEventListener("scroll", () => {
  lastKnownScrollPositionition = window.scrollY;

  if (!ticking) {
    window.requestAnimationFrame(() => {
      handleScrollInteractions(lastKnownScrollPositionition);
      ticking = false;
    });
    ticking = true;
  }
});

window.addEventListener("click", e => {
  if (e.target == hamburger) {
    navigationBlock.classList.toggle("show");
  }

  if (
    e.target == profileDropdownWrapper ||
    e.target.parentNode == profileDropdownWrapper
  ) {
    profileDropdownContent.classList.toggle("show");
  } else {
    if (profileDropdownContent.classList.contains("show")) {
      profileDropdownContent.classList.remove("show");
    }
  }

  if (
    e.target == addNewDropdownWrapper ||
    e.target.parentNode == addNewDropdownWrapper
  ) {
    addNewDropdownContent.classList.toggle("show");
  } else {
    if (addNewDropdownContent.classList.contains("show")) {
      addNewDropdownContent.classList.remove("show");
    }
  }
});
