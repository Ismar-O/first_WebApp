
function animateElement() {
    const element = document.getElementById("myId");
  
    // Function to move the element up and down
    let isUp = false;
  
    setInterval(function() {
      if (isUp) {
        // Move down
        element.style.transform = "translateY(0)";
      } else {
        // Move up
        element.style.transform = "translateY(100px)";
      }
      isUp = !isUp; // Toggle the direction
    }, 2000); // Move every 4 seconds (2 seconds up, 2 seconds down)
  }
  
  // Call the function to start the animation
  animateElement();
  console.log('redi')