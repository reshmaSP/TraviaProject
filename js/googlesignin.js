function onSignIn(googleUser) {
    var profile = googleUser.getBasicProfile();
    // $("#name").text(profile.getName());
    // $("#email").text(profile.getEmail());
    // $("#image").attr('src',profile.getImageUrl());
    $window.location.href="index.html";
    // $(".data").css('display',"block");
    // $(".g-signin2").css('display',"none");

  }
  
  function signOut() {
    var auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function () {
      console.log('User signed out.');
      alert(" yOU have been signOut successfully");
      $(".g-signin2").css('display',"block");
    $(".data").css('display',"none");


    });
  }