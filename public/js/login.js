document.getElementById('myForm').addEventListener('submit', async function(e) {
    e.preventDefault();  // Prevent default form submission
    console.log('RADI SCRIPTA');
    const formData = new FormData(this);
    
    const data = {
      username: formData.get('name'),
      pw: formData.get('pw'),
     };

    try {
      const response = await fetch('/login/send', {
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