document.getElementById('myForm').addEventListener('submit', async function(e) {
    e.preventDefault();  // Prevent default form submission
    const formData = new FormData(this);
    console.log('submit');
    
    const data = {
      username: formData.get('name'),
      pw: formData.get('pw'),
      email: formData.get('email')
     };

    try {
      const response = await fetch('/signup/send', {
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
      
    } catch (error) {
      console.error('Error:', error);
    }
  });


  document.getElementById('btn-login').addEventListener('click', () => {
    window.location.href = '/login'; 
  });
  
  
  /* Dio GET FETCH ne radi zbog status koda koji vraca, 200 umjesto redirect 300

  document.getElementById('btn-login').addEventListener('click', async function(e) {
      try {
      const response = await fetch('/login', {
        method: 'GET',
        redirect: 'follow'
      })
      
      if (response.redirected) {
        console.log('redirected');
        window.location.href = response.url; // Redirect to the URL specified in the response
      }
        //const result = await response.json();
       
        console.log('nakon');
    } catch (error) {
      console.error('Error:', error);
    }
  });


 
  */


  
