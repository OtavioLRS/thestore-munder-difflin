const card_div = document.querySelector('.card');
let total_price = 0.0;
const product_list = JSON.parse(localStorage.getItem('productList'));
console.log(product_list);

function addCartItens() {

  for (const product of product_list) {
    console.log(product);
    addItem(productsJSON[product.id - 1], product.amount);
  }

  let total_price_div =
    `<div class="total_price_title">valor total</div>
     <div class="total_price">R$ ${total_price.toFixed(2)}</div>
    </div>`

  let total_price_container = document.createElement('div');
  total_price_container.setAttribute('class', 'product-container');
  total_price_container.setAttribute('id', 'final_price');
  total_price_container.innerHTML = total_price_div;
  card_div.appendChild(total_price_container);

  addListeners();
}

function addItem(product, amount) {
  const { id, name, image, price } = product;
  const finalPrice = parseFloat(price.replace(',', '.')) * parseFloat(amount)
  total_price += finalPrice

  let new_product =
    `<div class="product-img">
        <img src="../../assets/img/${image}" alt="">
      </div>
      <div class="product-info">
        <div class="info">

          <div class="product-details">
            <div>${name} &emsp;</div>
            <div>R$ ${price} un.</div>
          </div>

          <div class="amount-controller" id="${id}">
            <a href="" class="button button-plus">
              <div>+</div>
            </a>
            <div>${amount}</div>
            <a href="" class="button button-minus">
              <div>-</div>
            </a>
            <div class="price-final">R$ ${finalPrice}</div>
          </div>

        </div>
      </div>`;

  let new_product_div = document.createElement('div');
  new_product_div.setAttribute('class', 'product-container');
  new_product_div.innerHTML = new_product;
  card_div.appendChild(new_product_div);
}

function addListeners() {
  let buttons_plus = document.querySelectorAll('.button-plus');
  let buttons_minus = document.querySelectorAll('.button-minus');

  for (plus of buttons_plus) {
    plus.addEventListener('click', function (e) {
      e.preventDefault();

      let button = e.currentTarget;
      let parent = button.parentElement;
      let id = parent.getAttribute("id");

      // atualiza quantidade
      let amount_atual = parseInt(parent.childNodes[3].innerHTML);
      parent.childNodes[3].innerHTML = (amount_atual + 1).toString();

      // preco un
      let price = parseFloat(productsJSON[id - 1].price);
      console.log(price);

      // preco total produto
      let price_total = parseFloat(parent.childNodes[7].innerHTML.split(' ')[1]);
      price_total += price;
      console.log(price_total);
      parent.childNodes[7].innerHTML = "R$ ".concat(price_total.toFixed(2).toString());

      // preco total final
      let total_price_div = document.querySelector('.total_price');
      let total_price = parseFloat(total_price_div.innerHTML.split(' ')[1]);
      total_price += price;
      total_price_div.innerHTML = "R$ ".concat(total_price.toFixed(2).toString());

      // atualiza local storage
      for (const product of product_list) {
        if (product.id === id) {
          product.amount++;
          break;
        }
      }
    })
  }

  for (minus of buttons_minus) {
    minus.addEventListener('click', function (e) {
      e.preventDefault();

      let button = e.currentTarget;
      let parent = button.parentElement;
      let id = parent.getAttribute("id");
      console.log(parent.childNodes)

      let amount_atual = parseInt(parent.childNodes[3].innerHTML);

      // estoque 0, nao ha o que remover
      if (amount_atual == 0) {
        return;
      }

      else {
        // atualiza quantidade
        parent.childNodes[3].innerHTML = (amount_atual - 1).toString();

        // preco un
        let price = parseFloat(productsJSON[id - 1].price);
        console.log(price);

        // preco total produto
        let price_total = parseFloat(parent.childNodes[7].innerHTML.split(' ')[1]);
        price_total -= price;
        console.log(price_total);
        parent.childNodes[7].innerHTML = "R$ ".concat(price_total.toFixed(2).toString());

        // preco total final
        let total_price_div = document.querySelector('.total_price');
        let total_price = parseFloat(total_price_div.innerHTML.split(' ')[1]);
        total_price -= price;
        total_price_div.innerHTML = "R$ ".concat(total_price.toFixed(2).toString());

        //atualiza localstorage
        for (const product of product_list) {
          if (product.id === id) {
            product.amount--;
            break;
          }
        }
      }
    })
  }
}

const endSellButton = document.querySelector('#end-sell-button');
endSellButton.addEventListener('click', function (e) {
  e.preventDefault();

  const name = document.querySelector('#name').value;
  const address = document.querySelector('#address').value;
  const number = document.querySelector('#number').value;
  const city = document.querySelector('#city').value;
  const cep = document.querySelector('#postal-code').value;
  const final_price = document.querySelector('.total_price').innerHTML;

  if (final_price == "R$ 0.00")
    window.alert("Você não está comprando nada !!")
  else if (!name || !address || !number || !city || !cep)
    window.alert("Por favor, complete os dados de entrada !!");

  else {
    localStorage.setItem('userData', JSON.stringify({ name, address, number, city, cep }));
    localStorage.setItem('productList', JSON.stringify(product_list));

    window.location.href = "../sellDetails/"
  }
});