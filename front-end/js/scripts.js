// JavaScript file for CASA0017 - Web Architecture

// Toggle menu bar
const menuToggle = document.querySelector('.toggle');
const main = document.querySelector('.main');

menuToggle.addEventListener('click', () => {
  menuToggle.classList.toggle('active')
  main.classList.toggle('active')
})

// Typewriter animation landing page
document.addEventListener('DOMContentLoaded',function(event){
    // array with texts to type in typewriter
    var dataText = [ "COP 26 is approaching.", "Nations are gathering.", "Prepare yourself.", "Welcome to climate action radar."];
    
    // type one text in the typwriter
    // keeps calling itself until the text is finished
    function typeWriter(text, i, fnCallback) {
      // chekc if text isn't finished yet
      if (i < (text.length)) {
        // add next character to h1
       document.querySelector("h2").innerHTML = text.substring(0, i+1) +'<span aria-hidden="true"></span>';
  
        // wait for a while and call this function again for next character
        setTimeout(function() {
          typeWriter(text, i + 1, fnCallback)
        }, 100);
      }
      // text finished, call callback if there is a callback function
      else if (typeof fnCallback == 'function') {
        // call callback after timeout
        setTimeout(fnCallback, 700);
      }
    }
    // start a typewriter animation for a text in the dataText array
     function StartTextAnimation(i) {
       if (typeof dataText[i] == 'undefined'){
          setTimeout(function() {
            StartTextAnimation(0);
          }, 20000);
       }
       // check if dataText[i] exists
      if (i < dataText[i].length) {
        // text exists! start typewriter animation
       typeWriter(dataText[i], 0, function(){
         // after callback (and whole text has been animated), start next text
         StartTextAnimation(i + 1);
       });
      }
    }
    // start the text animation
    StartTextAnimation(0);
  });

// Transition animation for globe page
Barba.Pjax.start();

var FadeTransition = Barba.BaseTransition.extend({
  start: function() {
  /**
* This function is automatically called as soon the Transition starts
* this.newContainerLoading is a Promise for the loading of the new container
* (Barba.js also comes with an handy Promise polyfill!)
*/
  // As soon the loading is finished and the old page is faded out, let's fade the new page
  Promise
  .all([this.newContainerLoading, this.fadeOut()])
  .then(this.fadeIn.bind(this));
  },
  fadeOut: function() {
  /**
* this.oldContainer is the HTMLElement of the old Container
*/
  return $(this.oldContainer).animate({ opacity: 0 }).promise();
  },
  fadeIn: function() {
  /**
* this.newContainer is the HTMLElement of the new Container
* At this stage newContainer is on the DOM (inside our #barba-container and with visibility: hidden)
* Please note, newContainer is available just after newContainerLoading is resolved!
*/
  var _this = this;
  var $el = $(this.newContainer);
  $(this.oldContainer).hide();
  $el.css({
  visibility : 'visible',
  opacity : 0
  });
  $el.animate({ opacity: 1 }, 400, function() {
  /**
* Do not forget to call .done() as soon your transition is finished!
* .done() will automatically remove from the DOM the old Container
*/
  _this.done();
  });
  }
});
/**
* Next step, you have to tell Barba to use the new Transition
*/
Barba.Pjax.getTransition = function() {
  /**
* Here you can use your own logic!
* For example you can use different Transition based on the current page or link...
*/
  return FadeTransition;
};

// RSS news feed

// Geolocation of user (IP)

