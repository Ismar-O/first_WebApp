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



document.getElementById('novaFoo').addEventListener('click',async function(foo) {

  let data = {
    dataOdKlijenta1: 'primjer 1',
    dataOdKlijenta2: 'primjer 2',
  };
  foo.preventDefault();
  const response = await fetch('/redirect', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),

  });
  if (response.redirected) {
    window.location.href = response.url; // Redirect to the URL specified in the response
  }
    const result = await response.json();
    console.log(result);
    //console.log('Response:', result);


})