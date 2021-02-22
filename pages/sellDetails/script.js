const productList = JSON.parse(localStorage.getItem('productList'));
const userData = JSON.parse(localStorage.getItem('userData'));
console.log(userData);


function addProduct(product, isTotal) {
  let productHTML = `
    <div class="product-name">
      ${isTotal ? 'valor total' : product.amount + ' - ' + product.name}
    </div>
    <div class="product-price">
      R$ ${product.price}
    </div>
  `;

  const productsDiv = document.querySelector('.card-products');
  const newProduct = document.createElement('div');
  newProduct.setAttribute('class', 'product');
  newProduct.innerHTML = productHTML;
  productsDiv.appendChild(newProduct);
}

function addProducts() {
  let total = 0.0;
  for (const product of productList) {
    for (const data of productsJSON) {
      if (data.id === product.id) {
        let price = parseFloat(product.amount) * parseFloat(data.price);
        addProduct({ id: product.id, amount: product.amount, name: data.name, price: price.toFixed(2) }, false);
        total += price;
        break;
      }
    }
  }
  addProduct({ price: total.toFixed(2) }, true);
}

function addUserData(data) {
  let dataHTML = `
    <div class="data">
      <div>nome do destinatario:</div>
      <div>${data.name}</div>
    </div>
    <div class="data">
      <div>endereço:</div>
      <div>${data.address}</div>
    </div>
    <div class="data">
      <div>numero:</div>
      <div>${data.number}</div>
    </div>
    <div class="data">
      <div>cidade:</div>
      <div>${data.city}</div>
    </div>
    <div class="data">
      <div>cep:</div>
      <div>${data.cep}</div>
    </div>
  `;

  const cardData = document.querySelector('.user-data');
  cardData.innerHTML += dataHTML;
}

function generateShipping() {
  let days = Math.floor((Math.random() * 8) + 3);
  document.querySelector('#shipping').innerHTML = "seu pedido chegará em aproximadamente ".concat(days).concat(" dias!");
}

window.onload = function () {
  addProducts();
  addUserData(userData);
  generateShipping();
}