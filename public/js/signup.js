document.getElementById('formData').addEventListener('submit', async function(e) {
    e.preventDefault();  // Prevent default form submission
    const formData = new FormData(this);
    console.log('submit');

    if(formData.get('name') == '' || formData.get('pw')=='' || formData.get('email')==''){
      console.error('Empty fields!!');
      document.getElementById('formData').style.backgroundColor = 'rgb(255, 60, 60)';
      return;
}
    
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
        if(result!=null){
          alert(result.alert);
        }
        
              
    } catch (error) {
      console.error('Error:', error);
    }
  });


  document.getElementById('btn-login').addEventListener('click', () => {
    window.location.href = '/login'; 
  });
  
  
  

  
