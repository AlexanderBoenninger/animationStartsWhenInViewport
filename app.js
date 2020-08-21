
const text = document.querySelector('.fancy');
const back = document.querySelector('.banner');
const strText = text.textContent;
const splitText = strText.split("");
text.textContent = "";

function initialize() {
  //we set the scroll handler here
  window.addEventListener('scroll', onScroll)
}

function onScroll() {
  //run this function on every scroll event
  if(elementScrolled('.banner')) {
    //if the elment is in the viewport, remove the scroll listener, and run runAnimation()
    //this way we guarantee the runAnimation function is executed only once
    window.removeEventListener('scroll', onScroll);
    runAnimation();
  }
}

function runAnimation() {
  for (let i = 0; i < splitText.length; i++){
    text.innerHTML += "<span>" + splitText[i] + "</span>";
  }

  let char = 0;
  let timer = setInterval(onTick, 100);

  function onTick(){
    const span = text.querySelectorAll('span')[char];
    span.classList.add('blick');
    back.classList.toggle('black');
    char++

    if (char === splitText.length){
      complete();
      return;
    }
  }

  function complete() {
    clearInterval(timer);
    timer = null;
    back.classList.remove('black');
    setTimeout(runAnimation, 5000);
  }
}

function elementScrolled(elem) {
  //helper function to see if element is in viewport
  var docViewTop = $(window).scrollTop();
  var docViewBottom = docViewTop + $(window).height()/1.5;
  var elemTop = $(elem).offset().top;
  var thisH = $(elem).outerHeight() + elemTop /1.5;
  return ((elemTop <= docViewBottom) && (thisH >= docViewTop));
}

initialize();
