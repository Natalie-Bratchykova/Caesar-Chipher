///----------------------HEADER----------------------
// when 1 option is selected/hovered - others become lighter

// -------------- SKILLS--------------------------
// add for cards next effects:
// id one card is hovered - make others disabled

//-------------------EDUCATION------------------
const educationBtns = document.querySelectorAll(".education-btn");
// const educationInfo = document.querySelectorAll('.__info');
educationBtns.forEach((btn, index) => {
  btn.addEventListener("click", () => {
    console.log("lol");
    if (btn.id === `education-btn${index + 1}`) {
      console.log("lol1");
      document.querySelector(`.info${index + 1}`).classList.toggle("_hidden");
    }
  });
});

// ARROWS
const arrows = document.querySelectorAll(".arrow-expand-more");
const educationCards = document.querySelectorAll(".education_content");
arrows.forEach((arrow, index) => {
  arrow.addEventListener("click", () => {
    if (arrow.textContent === "expand_less") {
      arrow.textContent = "expand_more";
      educationCards[index].classList.remove("arrow-func");
    } else {
      educationCards[index].classList.add("arrow-func");
      arrow.textContent = "expand_less";
    }
  });
});
