//ANIMATION TESTING
const animated = document.querySelector(".number-tile");

$(function () {
  $("#test-animation").on("click", function () {
    $(".number-tile").addClass("animate__animated animate__pulse");
  });
  animated.onanimationend = () => {
    $(".number-tile").removeClass("animate__animated animate__pulse");
  };
});

//Arrow Keypresses
$(document).keydown(function (e) {
  switch (e.which) {
    case 37: //left arrow key
      
      break;
    case 38: //up arrow key
      
      break;
    case 39: //right arrow key
      
      break;
    case 40: //bottom arrow key
      
      break;
  }
});
