document.getElementById('formData').addEventListener('submit', async function(e) {
    e.preventDefault();                     // Prevent default form submission
    const formData = new FormData(this);


    //Ovdje projeriti ispravnost podataka, treba unaprijediti
    if(formData.get('name') == '' || formData.get('pw')==''){
          console.error('Empty fields!!');
          document.getElementById('formData').style.backgroundColor = 'rgb(255, 50, 50)';
          return;
    }


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


  document.getElementById('btn-signup').addEventListener('click', () => {
    window.location.href = '/signup'; 
  });