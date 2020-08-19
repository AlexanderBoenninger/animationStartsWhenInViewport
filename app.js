
const text = document.querySelector('.fancy');
const back = document.querySelector('.banner');
const strText = text.textContent;
const splitText = strText.split("");
text.textContent = "";

function elementScrolled(elem) {
  var docViewTop = $(window).scrollTop();
  var docViewBottom = docViewTop + $(window).height()/1.5;
  var elemTop = $(elem).offset().top;
  var thisH = $(elem).outerHeight() + elemTop /1.5;
  return ((elemTop <= docViewBottom) && (thisH >= docViewTop));
}

function onScroll() {
  if(elementScrolled('.banner')) {
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

    function complete(){
      clearInterval(timer);
      timer = null;
      back.classList.remove('black');
      back.classList.remove('banner');
      window.removeEventListener('scroll', onScroll);
    }
 }
}



window.addEventListener('scroll', onScroll)
