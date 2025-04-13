// Script for RSVP for to send to Google sheets
document.getElementById('rsvp-form').addEventListener('submit', function(event) {
    event.preventDefault();
    const name = document.getElementById('name').value;
    const guests = document.getElementById('guests').value;
    console.log('Sending:', { name, guests });
    fetch(this.action, {
        method: 'POST',
        body: JSON.stringify({ name: name, guests: guests })
    })
    .then(response => {
        console.log('Response status:', response.status);
        console.log('Response OK:', response.ok);
        return response.json();
    })
    .then(data => {
        console.log('Response data:', data);
        if (data.status === 'success') {
            alert(`Thank you, ${name}! We've recorded your RSVP for ${guests} guest${guests == 1 ? '' : 's'}.`);
            this.reset();
        } else {
            alert('Oops, something went wrong. Response: ' + JSON.stringify(data));
        }
    })
    .catch(error => {
        console.error('Fetch error:', error);
        alert('Error submitting RSVP: ' + error.message);
    });
});

//script to theme toggle
const html = document.documentElement;
const toggleButton = document.getElementById('theme-toggle');
toggleButton.addEventListener('click', () => {
    html.classList.toggle('dark');
    localStorage.setItem('theme', html.classList.contains('dark') ? 'dark' : 'light');
});