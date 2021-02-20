function generateShipping() {
  let days = Math.floor((Math.random() * 8) + 3)
  console.log(days)
  document.querySelector('#shipping').innerHTML = "Seu pedido chegará em ".concat(days).concat(" dias!")
}