
const formname = document.querySelector('#myForm');
const valreg = /^[a-zA-Z ]$/  //regex pattern for name field
const valreg1 = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/ //regex pattern for email field
const valreg2 = /^[0-9]+$/


//Getting references to the form elements
var nameFlag = emailFlag = phoneFlag = false
let username = formname.elements.namedItem("username");
let email = formname.elements.namedItem("email");
let phone1 = formname.elements.namedItem("phone1");
let phone2 = formname.elements.namedItem("phone2");
let phone3 = formname.elements.namedItem("phone3");


var wordCount = 0
var stateCode;
var numFlag = [];
var charFlag = [];

//Setting event listeners
username.addEventListener("keyup", validate);
email.addEventListener("keyup", validate);
phone1.addEventListener("keyup", validate);
phone2.addEventListener("keyup", validate);
phone3.addEventListener("keyup", validate);


//Function called on onSubmit()
function validateForm() {
  if (nameFlag === true && emailFlag === true && phoneFlag === true) {
    return true;
  }
  else {
    document.getElementById("message0").innerHTML = "Please enter accurate information";
    return false;
  }
}

//Function called on keyup event of text inputs
function validate(e) {
  let target = e.target;

  //when username is being entered
  if (target.name === "username") {
    if (valreg.test(target.value)) {
      document.getElementById("NameMessage1").innerHTML = " ";
      document.getElementById("NameMessage2").innerHTML = " ";
      document.getElementById("NameMessage3").innerHTML = " ";
      nameFlag = true
    }
    else {

      var strArr = target.value.split(" ");
      var strCharArr = target.value.split("");

      for (var i = 0; i < strArr.length; i++) {
        if (strArr[i].length < 4 || strArr.length <= 5 || Number.isInteger(parseInt(strArr[i])) || /[~`!#$%\^&*+=\-\[\]\\';,/{}|\\":<>\?]/g.test(target.value)) {

          //Checking for minimum no. of characters in each word being entered
          if (strArr[i].length < 4) {
            document.getElementById("NameMessage1").innerHTML = "Name should be minimum 4 characters long";
          }
          else if (strArr[i].length >= 4) {
            document.getElementById("NameMessage1").innerHTML = " ";
          }

          //Checking for no. of minimum no. of words being entered
          if (strArr.length < 2) {
            document.getElementById("NameMessage2").innerHTML = "Name should be minimum 2 words long";
          }
          else {
            document.getElementById("NameMessage2").innerHTML = " ";
          }



          numFlag = [];
          //Iterating through the entire string in the input box and checking for numbers and special characters
          for (var j in strCharArr) {
            //checking if any number is present or not in the entire text box input
            if (Number.isInteger(parseInt(strCharArr[j]))) {
              numFlag[j] = true;
            }
            else {
              numFlag[j] = false;
            }

             //checking if any special character is present or not in the entire text box input
            if (/[~`@!#$%\^&*+=\-\[\]\\';,/{}|\\":<>\?]/g.test(strCharArr[j])) {
              charFlag[j] = true;
            }
            else {
              charFlag[j] = false;
            }
          }

          //using the every function, here we check if the numFlag and charFlag arrays contain all false values or not. 
          //If all false, it means no number or no special character is present in the entire data in the text box
          numAbsent = numFlag.every((flag) => flag === false);
          charAbsent = charFlag.every((flag) => flag === false);

          //setting the text in <p> depending on above outcome
          if (numAbsent) {
            document.getElementById("NameMessage3").innerHTML = " ";
          }
          else {
            document.getElementById("NameMessage3").innerHTML = "Numbers not allowed";
          }

          if (charAbsent) {
            document.getElementById("NameMessage4").innerHTML = " ";
          }
          else {
            document.getElementById("NameMessage4").innerHTML = "Special Characters not allowed";
          }


        }
      }
    }

  }


  //when email is being entered
  if (target.name === "email") {
    if (valreg1.test(target.value)) {
      document.getElementById("message1").innerHTML = " ";
      emailFlag = true
    }
    else {
      document.getElementById("message1").innerHTML = "Enter a valid email id";
      emailFlag = false;
    }
  }

  //when first 3 digits of phone number is being entered
  if (target.name === "phone1" && e.key != "Backspace") {
    str = target.value;
    size = str.length;

    //Formatting the first 3 digits and appending '(' & ')' at the start and end 
    //and also checking for range and dispaying appropriate message(Jio, Idea etc)

    if (size === 0) {
      strFormat = str;
      phone1.value = strFormat;
    }
    if (size === 1) {
      strFormat = '(' + str;
      phone1.value = strFormat;
    }
    if (size === 4) {
      strFormat = str + ')';
      if (parseInt(str.substring(1, 4)) > 621 && parseInt(str.substring(1, 4)) < 799) {
        document.getElementById("message2").innerHTML = "Jio, ";
      }
      else if (parseInt(str.substring(1, 4)) > 801 && parseInt(str.substring(1, 4)) < 920) {
        document.getElementById("message2").innerHTML = "Idea, ";
      }
      else if (parseInt(str.substring(1, 4)) > 921 && parseInt(str.substring(1, 4)) < 999) {
        document.getElementById("message2").innerHTML = "Vodafone, ";
      }
      else {
        document.getElementById("message2").innerHTML = "Invalid";
      }
      phone1.value = strFormat;
    }

  }

  //when next 3 digits of phone number is being entered
  if (target.name === "phone2" && e.key != "Backspace") {

    str = target.value;
    size = str.length;

    
    //Formatting the next 3 digits and displaying appropriate state name 
    if (size === 0) {
      strFormat = str;
      phone2.value = strFormat;
    }

    if (size === 3) {
      stateCode = str.substring(0, 3)

      if (stateCode != undefined) {
        if (parseInt(stateCode) > 99 && parseInt(stateCode) < 137) {
          checkState(stateCode);
          phoneFlag = true;
        }
        else {
          document.getElementById("message3").innerHTML = ", Wrong state code";
          phoneFlag = false;
        }
      }
    }
  }
}


//Function to get the state names depending on the state code(second set of 3 digits in the phone number)
function checkState(stateCode) {
  switch (stateCode) {
    case '100': document.getElementById("message3").innerHTML = "Andhra Pradesh";
      break;
    case '101': document.getElementById("message3").innerHTML = "Arunachal Pradesh";
      break;
    case '102': document.getElementById("message3").innerHTML = "Assam";
      break;
    case '103': document.getElementById("message3").innerHTML = "Bihar";
      break;
    case '104': document.getElementById("message3").innerHTML = "Chhattisgarh";
      break;
    case '105': document.getElementById("message3").innerHTML = "Goa";
      break;
    case '106': document.getElementById("message3").innerHTML = "Gujarat";
      break;
    case '107': document.getElementById("message3").innerHTML = "Haryana";
      break;
    case '108': document.getElementById("message3").innerHTML = "Himachal Pradesh";
      break;
    case '109': document.getElementById("message3").innerHTML = "Jharkhand";
      break;
    case '110': document.getElementById("message3").innerHTML = "Karnataka";
      break;
    case '111': document.getElementById("message3").innerHTML = "Kerela";
      break;
    case '112': document.getElementById("message3").innerHTML = "Madhya Pradesh";
      break;
    case '113': document.getElementById("message3").innerHTML = "Maharashtra";
      break;
    case '114': document.getElementById("message3").innerHTML = "Manipur";
      break;
    case '115': document.getElementById("message3").innerHTML = "Meghalaya";
      break;
    case '116': document.getElementById("message3").innerHTML = "Mizoram";
      break;
    case '117': document.getElementById("message3").innerHTML = "Nagaland";
      break;
    case '118': document.getElementById("message3").innerHTML = "Odisha";
      break;
    case '119': document.getElementById("message3").innerHTML = "Punjab";
      break;
    case '120': document.getElementById("message3").innerHTML = "Rajasthan";
      break;
    case '121': document.getElementById("message3").innerHTML = "Sikkim";
      break;
    case '122': document.getElementById("message3").innerHTML = "Tamil Nadu";
      break;
    case '123': document.getElementById("message3").innerHTML = "Telangana";
      break;
    case '124': document.getElementById("message3").innerHTML = "Tripura";
      break;
    case '125': document.getElementById("message3").innerHTML = "Uttar Pradesh";
      break;
    case '126': document.getElementById("message3").innerHTML = "Uttarakhand";
      break;
    case '127': document.getElementById("message3").innerHTML = "West Bengal";
      break;
    case '128': document.getElementById("message3").innerHTML = "Andaman and Nicobar Islands";
      break;
    case '129': document.getElementById("message3").innerHTML = "Chandigarh";
      break;
    case '130': document.getElementById("message3").innerHTML = "Dadra Nagar Haveli and Daman Diu";
      break;
    case '131': document.getElementById("message3").innerHTML = "Delhi";
      break;
    case '132': document.getElementById("message3").innerHTML = "Jammu and Kashmir";
      break;
    case '133': document.getElementById("message3").innerHTML = "Ladakh";
      break;
    case '134': document.getElementById("message3").innerHTML = "Lakshadweep";
      break;
    case '135': document.getElementById("message3").innerHTML = "Puducherry";
      break;

  }
}