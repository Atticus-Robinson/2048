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
