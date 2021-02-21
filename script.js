function generateShipping() {
  let days = Math.floor((Math.random() * 8) + 3);
  document.querySelector('#shipping').innerHTML = "seu pedido chegará em ".concat(days).concat(" dias!");
}

function resetProducts() {
  let products_div = document.querySelector('.products');
  products_div.innerHTML = "";
}

function addItem(father, item) {
  let new_product =
    `<div class="product-img">
      <img src="../../assets/img/${item.image}" alt="">
    </div>
    <div class="product-categories">
      <div class="product-category">${item.category}</div>
    </div>
    <div class="product-body">
      <div class="product-text">
        <div class="product-name">${item.name}</div>
        <div class="product-price">R$ ${item.price.split(',')[0]}<span>${item.price.split(',')[1]}</span></div>
      </div>
      <div class="product-button">
        <a href="" class="button">
          <div>Adicionar ao carrinho</div>
        </a>
      </div>
    </div>`;

  let product = document.createElement('div');
  product.setAttribute('class', 'product');
  product.innerHTML = new_product;

  father.appendChild(product);
}

function addCategory(father, category) {
  let categoryHTML = `<div>${category}</div>`;
  let newCategory = document.createElement('a');
  newCategory.setAttribute('class', 'category button');
  newCategory.setAttribute('href', '');
  newCategory.innerHTML = categoryHTML;

  father.appendChild(newCategory);
}

async function readItens() {
  fetch("../../itens.json")
    .then(response => response.json())
    .then(data => {
      let products_div = document.querySelector('.products')
      let product_list = data.products

      let categories = [];

      for (let product of product_list) {
        addItem(products_div, product)
        if (!categories.includes(product.category))
          categories.push(product.category);
      }

      let categories_div = document.querySelector('.categories');
      for (const category of categories) {
        addCategory(categories_div, category);
      }
      addCategoriesEvent();
    })
    .catch(error => console.log(error));
}

const filterSelect = document.querySelector('#price-filter');
filterSelect.addEventListener('change', function (e) {
  const option = parseInt(e.target.value);
  const products_div = document.querySelector('.products');
  const input = document.querySelector('.search-input');
  input.value = "";
  resetProducts();
  fetch("../../itens.json")
    .then(response => response.json())
    .then(data => {
      const products = data.products;
      for (const product of products) {
        const price = parseFloat(product.price.replace(',', '.'));
        switch (option) {
          case 0:
            addItem(products_div, product);
            break;

          case 1:
            if (price <= 99.99)
              addItem(products_div, product);
            break;

          case 2:
            if (price >= 100 && price <= 199.99)
              addItem(products_div, product);
            break;

          case 3:
            if (price >= 200 && price <= 299.99)
              addItem(products_div, product);
            break;

          case 4:
            if (price >= 300 && price <= 399.99)
              addItem(products_div, product);
            break;

          case 5:
            if (price >= 400)
              addItem(products_div, product);
            break;

          default:
            break;
        }
      }
    })
    .catch(error => console.log(error));
});

function addCategoriesEvent() {
  let categories = document.querySelectorAll('.category');
  console.log(categories);
  for (const category of categories) {
    category.addEventListener('click', function (e) {
      e.preventDefault();
      resetProducts();
      const filterSelect = document.querySelector('#price-filter');
      filterSelect.value = '0';
      const input = document.querySelector('.search-input');
      input.value = "";
      const category = e.target.innerHTML;
      fetch("../../itens.json")
        .then(response => response.json())
        .then(data => {
          const products = data.products;
          const products_div = document.querySelector('.products');
          for (const product of products) {
            if (product.category === category || category === 'todos')
              addItem(products_div, product);
          }
        })
        .catch(error => console.log(error));
    });
  }
}

const searchButton = document.querySelector('.search-button');
searchButton.addEventListener('click', function (e) {
  e.preventDefault();
  resetProducts();
  const filterSelect = document.querySelector('#price-filter');
  filterSelect.value = '0';
  const input = document.querySelector('.search-input').value;
  fetch("../../itens.json")
    .then(response => response.json())
    .then(data => {
      const products = data.products;
      const products_div = document.querySelector('.products');
      for (const product of products) {
        if (product.name.includes(input))
          addItem(products_div, product);
      }
    })
    .catch(error => console.log(error));
})