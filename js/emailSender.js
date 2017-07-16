function validateEmail(email, id) {
  var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if(re.test($(email).val())){
    return true;
  }
  else{
    $(id).fadeIn();
    return false;
  }
}

function displayFeedbackMessage(value, id){
  if($(value).val() == ""){
    $(id).fadeIn();
    return false;
  }
  else{
    return true;
  }
}

function hideFeedbackMessage(){
  $("#js_errorName_empty").fadeOut();
  $("#js_errorEmail_empty").fadeOut();
  $("#js_errorEmail_format").fadeOut();
  $("#js_errorMessage_empty").fadeOut();
  $("#js_successMessage_sent").fadeOut();
}


function clickOnSendEmail () {
  if(!$(".buttonSend").hasClass("buttonSend--disabled")){
    hideFeedbackMessage();

    var name = displayFeedbackMessage("#js_inputName", "#js_errorName_empty");
    var email = displayFeedbackMessage("#js_inputEmail", "#js_errorEmail_empty");
    var emailValidated = false;
    if(email){
      emailValidated = validateEmail("#js_inputEmail", "#js_errorEmail_format");
    }
    var message = displayFeedbackMessage("#js_inputMessage", "#js_errorMessage_empty");

    if(name && email && emailValidated && message){
      $("#js_inputName").val("");
      $("#js_inputEmail").val("");
      $("#js_inputMessage").val("");
      $(".buttonSend").addClass("buttonSend--disabled");
      $("#js_successMessage_sent").fadeIn();
      setTimeout(function(){
        $(".buttonSend").removeClass("buttonSend--disabled");
      }, 10000);
    }
    else{
      $(".buttonSend").removeClass("buttonSend--disabled");
    }
  }
}