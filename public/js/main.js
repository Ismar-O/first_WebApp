document.getElementById('myForm').addEventListener('submit', async function(e) {
    e.preventDefault();  // Prevent default form submission
    console.log('RADI SCRIPTA');
    const formData = new FormData(this);
    
    const data = {
      mojText: formData.get('mojText'),
     };

    try {
      const response = await fetch('http://localhost:8000/newpost', {
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
    } catch (error) {
      console.error('Error:', error);
    }
  });