const formname = document.querySelector('#otpForm');

let otp = formname.elements.namedItem("otp");

var attempt = 0;

//generating a random number between 1000 & 9999
var random = Math.floor(Math.random() * 8999) + 1000;

document.getElementById("message").innerHTML = "Please enter the 4-digit otp that has been sent to your phone to login";
alert(random + " is the verification code to login to your account");

function validateOTP() {

  if (random === parseInt(otp.value)) {
    return true;
    //redirect to pixel6 page
  }
  else {
    document.getElementById("message").innerHTML = "Wrong otp. Try again";
    otp.value = ''
    attempt++;
    if (attempt === 3) {
      document.getElementById("message").innerHTML = "Sorry!! Validation Unsuccessful";
      //redirect to 404 page after 2 seconds
      setTimeout(function () { window.location.assign("LoginUnsuccessful.html") }, 2000);
    }
    return false;
  }

}
