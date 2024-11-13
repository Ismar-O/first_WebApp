
document.getElementById('index').addEventListener('click', async function(e) {
  e.preventDefault();  // Prevent default form submission
 

  try {
    fetch('/login', {
      method: 'GET',
    }).then(response => {
      if (response.ok) {
        return response.text(); // Assuming the server returns HTML or text
      } else {
        throw new Error('Failed to load login page');
      }
    })
    .then(data => {
      console.log('Login page content:', data);
      // Optionally, you could display the response in the DOM:
      document.body.innerHTML = data;
    })
    .catch(error => {
      console.error('Error:', error);
    });
  } catch (error) {
    console.error('Error:', error);
  }
});
