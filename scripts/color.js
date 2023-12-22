document.addEventListener("DOMContentLoaded", function () {
  colorOriginal();
  splitOriginal();
  split();
  eraseBoard();
});

function colorOriginal() {
  var randColor = "#" + Math.floor(Math.random() * 16777215).toString(16);
  document.querySelector(".original").style.backgroundColor = randColor;
}

function splitOriginal() {
  document
    .querySelector(".original")
    .addEventListener("mouseover", function (event) {
      var randColor = "#" + Math.floor(Math.random() * 16777215).toString(16);
      for (let i = 0; i < 4; i++) {
        const splitDiv = document.createElement("div");
        splitDiv.className = "split";
        splitDiv.style.backgroundColor = randColor;
        event.target.appendChild(splitDiv);
      }
    });
}

function split() {
  document.addEventListener("mouseover", function (event) {
    if (event.target.classList.contains("split")) {
      var randColor = "#" + Math.floor(Math.random() * 16777215).toString(16);
      for (let i = 0; i < 4; i++) {
        const splitDiv = document.createElement("div");
        splitDiv.className = "split";
        splitDiv.style.backgroundColor = randColor;
        event.target.appendChild(splitDiv);
      }
    }
  });
}

function clear() {
  document.body.addEventListener("mousemove", function (event) {
    if (!preventClearAnimation) {
      //slide from left
      if (event.pageX < 15) {
        createAndAnimateNewDiv("left");
      }

      //slide from top
      else if (event.pageY < 15) {
        createAndAnimateNewDiv("top");
      }

      //slide from right
      else if (event.pageX > window.innerWidth - 15) {
        createAndAnimateNewDiv("right");
      }

      //slide from bottom
      else if (event.pageY > window.innerHeight - 15) {
        createAndAnimateNewDiv("bottom");
      }
    }
  });
}

function createAndAnimateNewDiv(direction) {
  const newDiv = document.createElement("div");
  newDiv.className = "newDiv";
  var randColor = "#" + Math.floor(Math.random() * 16777215).toString(16);
  newDiv.style.backgroundColor = randColor;

  document.body.appendChild(newDiv);

  switch (direction) {
    case "left":
      newDiv.style.left = "-100%";
      break;
    case "top":
      newDiv.style.top = "-100%";
      break;
    case "right":
      newDiv.style.left = "100%";
      break;
    case "bottom":
      newDiv.style.top = "100%";
      break;
  }

  animateDiv(newDiv, direction);
  animateDiv(
    document.querySelector(".original"),
    direction === "left" || direction === "right" ? direction : null
  );
  preventClear();
}

function animateDiv(element, direction) {
  const animationProperties = { left: 0, top: 0 };

  if (direction === "left") {
    animationProperties.left = 0;
  } else if (direction === "top") {
    animationProperties.top = 0;
  }

  element.animate(animationProperties, { duration: 500 });
}

function preventClear() {
  preventClearAnimation = true;
  window.setTimeout(function () {
    preventClearAnimation = false;
  }, 500);
}

function eraseBoard() {
  var element = document.getElementById("about");
  var element_position = element.offsetTop;
  var screen_height = window.innerHeight;
  var activation_offset = 0.4;
  var activation_point = element_position - screen_height * activation_offset;
  var max_scroll_height = document.body.offsetHeight - screen_height - 5;

  window.addEventListener("scroll", function () {
    var y_scroll_pos = window.pageYOffset;

    var element_in_view = y_scroll_pos > activation_point;
    var has_reached_bottom_of_page =
      max_scroll_height <= y_scroll_pos && !element_in_view;

    if (element_in_view || has_reached_bottom_of_page) {
      //erase board
      document.querySelectorAll(".split").forEach(function (splitDiv) {
        splitDiv.style.opacity = 0;
        setTimeout(function () {
          splitDiv.remove();
        }, 1000);
      });
    }
  });
}

// Start rotateColors
(function () {
  rotateColors();
  setInterval(rotateColors, 3000);
})();

function rotateColors() {
  var randColor = "#" + Math.floor(Math.random() * 16777215).toString(16);
  document.querySelector(".original").style.backgroundColor = randColor;
}
