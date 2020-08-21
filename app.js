
const scroller = scrollama();

// setup the instance, pass callback functions
scroller
  .setup({
    step: ".banner"
  })
  .onStepEnter(response => {
    // { element, index, direction }
    console.log('onStepEnter', response);
    runAnimation(response.element)
  })
  .onStepExit(response => {
    // { element, index, direction }
    console.log('onStepExit', response);
  });

// setup resize event
window.addEventListener("resize", scroller.resize);

function runAnimation(elem) {
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
    // setTimeout(runAnimation, 5000);
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