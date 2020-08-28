
const scroller = scrollama();
let animationsRun = {};

// setup the instance, pass callback functions
scroller
.setup({
  step: ".banner_blink, .banner_typewriter",
})
.onStepEnter(response => {
  // { element, index, direction }
  // console.log('onStepEnter', animationsRun);
  if($(response.element).hasClass('banner_blink')){
    animationsRun[response.index] = true;
    runAnimationBlink(response.element, response.index);
  }
  if($(response.element).hasClass('banner_typewriter') && !animationsRun[response.index]){
    runAnimationTypewriter(response.element, response.index);
  }
})
.onStepExit(response => {
  // { element, index, direction }
  // console.log('onStepExit', response);
  if($(response.element).hasClass('banner_blink')){
    animationsRun[response.index] = false;
  }
});

// setup resize event
window.addEventListener("resize", scroller.resize);

function runAnimationBlink(elem, index) {
  
  const back = elem;
  const text = elem.querySelector('.fancy');
  const strText = text.textContent;
  const splitText = strText.split("");
  text.textContent = "";
  for (let i = 0; i < splitText.length; i++){
    text.innerHTML += "<span>" + splitText[i] + "</span>";
  }

  let char = 0;
  let timer = setInterval(onTick, 100);

  function complete() {
    clearInterval(timer);
    timer = null;
    back.classList.remove('black');
    if(animationsRun[index]){
      setTimeout(() => {
        runAnimationBlink(back, index);
      }, 500);
    }
  }

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

}

function runAnimationTypewriter(elem, index) {
  animationsRun[index] = true;
  const back = elem;
  const text = elem.querySelector('.zitat');
  const strText = text.textContent;
  const splitText = strText.split("");
  text.textContent = "";
  for (let i = 0; i < splitText.length; i++){
    text.innerHTML += "<span>" + splitText[i] + "</span>";
  }

  let char = 0;
  let timer = setInterval(onTick, 50);

  function complete() {
    clearInterval(timer);
    timer = null;
    back.classList.remove('black');
  }

  function onTick(){
    const span = text.querySelectorAll('span')[char];
    span.classList.add('blick');
    char++

    if (char === splitText.length){
      complete();
      return;
    }
  }

}
