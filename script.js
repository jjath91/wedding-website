document.getElementById('rsvp-form').addEventListener('submit', function (event) 
{
    event.preventDefault(); //stop the default form submission
    const name = document.getElementById('name').value; //store the name in a variable
    const guests = document.getElementById('guests').value; //store the number of guests in a variable
    console.log('Sending:', {name, guests});
    fetch(this.action, {
        method: 'POST',
        body: JSON.stringify({name: name, guests: guests}),
        headers: {'content-type': 'application/json'}
    })
    .then(response => {
        console.log('Response status:', response.status);
        console.log('Resonse OK:', response.ok);
        return response.json()
    })
    .then(data => {
        console.log('Response data', data);
        if (data.status === 'success') {
            alert(`Thank you, ${name}! We've recorded your RSVP for ${guests} guest${guests == 1 ? '' : 's'}.`);
            this.reset();
        } else {
            alert('oops, something went wrong. Response: ' + JSON.stringify(data));
        }
    })
    .catch(error => {
        console.error('Fetch error:', error);
        alert('Error submitting RSVP: ' + error.message);
    });
});
