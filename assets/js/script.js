//ANIMATION TESTING
import 'animate.css';

$(function () {
  $("#test-animation")
    .on("click", function () {
      $(".number-tile").addClass("animate");
      $(".number-tile").removeClass("animate");
    })
    .on("animationend", function () {
      console.log("test");
      $(".number-tile").removeClass("animate");
    });
});
