function changeImage() {
  let redballImg = document.getElementById("redball");
  if (redballImg.style.justifyContent == 'flex-start'){
    redballImg.style.justifyContent = 'flex-end'
  }
  else {
    redballImg.style.justifyContent = 'flex-start'
  }


}
