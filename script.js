$(document).ready(function () {
  $("#contact").validate({
    debug:true,
    errorClass: "alert alert-danger",
    errorLabelContainer: "#output-area",
    errorElement: "div",
    // rules define what is good input and what is
    // bad input
    // each rule starts with the form input
    //elements NAME attribute
    rules: {
      name: {
        required: true
      },
      email: {
        email: true,
        required: true
      },
      message: {
        required: true,
        maxlength: 2000,
      }
    },
    messages:{
      name: {
        required: "Name required"
      },
      email: {
        email: "Please provide valid email",
        required: "Valid email required"
      },
      message: {
        required: "Message required",
        maxlength: "Message is too long"
      }
    },
    submitHandler: (form) => {
      $("#contact").ajaxSubmit({
        type: "POST",
        url: $("#contact").attr('action'),
        success: (ajaxOutput) => {
          $("output-area").css("display", "")
          $("output-area").html(ajaxOutput)
          if($(".alert-success" >= 1)) {
            $("#contact") [0].reset()
          }
        }
      })
    }
  })
})
