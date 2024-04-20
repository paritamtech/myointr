$(document).ready(function() {
  // Hide the logout button container initially
  $("#logout-btn-container").hide();

  // Login form submission
  $('#login-form').submit(function(event) {
    // Prevent the default form submission behavior
    event.preventDefault();

    // Retrieve the values of the username and password fields
    var username = $('#username').val();
    var password = $('#password').val();

		// Check if the username and password are correct
		if (username === 'aiims_1' && password === 'Aiims#212') {
		  // Hide the login container and show the instructions container
		  $('#login-container').addClass('d-none');
		  $('#instructions-container').removeClass('d-none');
		  
		  // Show the logout button container
		  $('#logout-btn-container').show();
		} else {
		  // If the username or password is incorrect, display an alert
		  alert('Invalid username or password');
		}
	  });

  // Proceed to Diagnose button
  $('#proceed-btn').click(function() {
    $('#instructions-container').addClass('d-none');
    $('#app-container').removeClass('d-none');
  });

  // "Go to Instructions" button
  $('#go-to-instructions').click(function() {
    $('#app-container').addClass('d-none');
    $('#instructions-container').removeClass('d-none');
  });

  // Questionnaire form submission
  $('#questionnaire').submit(function(event) {
    event.preventDefault();
	
	// Add blur effect to the background
	$('#blur-background').css('backdrop-filter', 'blur(5px)');

	// Show the result container
	$('#result-container').removeClass('d-none');


    var q1 = parseInt($('input[name="q1"]:checked').val());
    var q2 = parseInt($('input[name="q2"]:checked').val());
    var q3 = parseInt($('input[name="q3"]:checked').val());
    var q4 = parseInt($('input[name="q4"]:checked').val());
    var q5 = parseInt($('input[name="q5"]:checked').val());

    var sum = q1 + q2 + q3 + q4 + q5;

    var resultText;
    var resultCardClass;

    if (sum > 5) {
      resultText = 'DEFINITE';
      resultCardClass = 'definite';
    } else if (sum > 3 && sum < 6) {
      resultText = 'PROBABLE';
      resultCardClass = 'probable';
    } else {
      resultText = 'UNLIKELY';
      resultCardClass = 'unlikely';
    }

    $('#summary').html(`
      MRI - ${$('input[name="q1"]:checked').parent().text()}<br>
      DOTA - ${$('input[name="q2"]:checked').parent().text()}<br>
      EMBX - ${$('input[name="q3"]:checked').parent().text()}<br>
      CRP - ${$('input[name="q4"]:checked').parent().text()}<br>
      CPAIN - ${$('input[name="q5"]:checked').parent().text()}
    `);

    $('#result-text').text(`As per the observations, there is a ${resultText.toUpperCase()} possibility of Myocarditis.`);

    $('#result-card').addClass(resultCardClass);

    $('#app-container').addClass('d-none');
    $('#result-container').removeClass('d-none');
  });

  // Reset button
  $('#reset-btn').click(function() {
    $('#questionnaire')[0].reset();
    $('#result-container').addClass('d-none');
    $('#app-container').removeClass('d-none');
    $('#result-card').removeClass('definite probable unlikely');
  });

 	  // Logout button
	  $('#logout-btn').click(function() {
		$('#app-container').addClass('d-none');
		$('#login-container').removeClass('d-none');
		$('#result-container').addClass('d-none');
		// Hide the logout button container
		$('#logout-btn-container').hide();
        // Reset the questionnaire form
		$('#questionnaire')[0].reset();		
		// Hide the instructions container
		$('#instructions-container').addClass('d-none');
		// Remove the blur effect from the background
		$('#blur-background').css('backdrop-filter', 'blur(0px)');
		
		//Clearing the creds		
		$('#username').val('');
		$('#password').val('');
	  });

	  // Submit Again button
	  $('#submit-again').click(function() {
		$('#result-container').addClass('d-none');
		$('#app-container').removeClass('d-none');
		
        // Reset the questionnaire form
		$('#questionnaire')[0].reset();
		
		// Remove color classes from the result card
		$('#result-card').removeClass('definite probable unlikely');
		
		// Remove the blur effect from the background
		$('#blur-background').css('backdrop-filter', 'blur(0px)');
	  });
});