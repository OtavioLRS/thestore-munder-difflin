const productList = [];

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
        <div class="product-price">R$ ${item.price.split('.')[0]}<span>${item.price.split('.')[1]}</span></div>
      </div>
      <div class="product-button">
        <a href="" id="${item.id}" class="button">
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
  let products_div = document.querySelector('.products')
  let product_list = productsJSON

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
  addProductsEvent();
}

const filterSelect = document.querySelector('#price-filter');
filterSelect.addEventListener('change', function (e) {
  const option = parseInt(e.target.value);
  const products_div = document.querySelector('.products');
  const input = document.querySelector('.search-input');
  input.value = "";
  resetProducts();
  const products = productsJSON;
  for (const product of products) {
    const price = parseFloat(product.price);
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
      const products = productsJSON;
      const products_div = document.querySelector('.products');
      for (const product of products) {
        if (product.category === category || category === 'todos')
          addItem(products_div, product);
      }

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
  const products = productsJSON;
  const products_div = document.querySelector('.products');
  for (const product of products) {
    if (product.name.includes(input))
      addItem(products_div, product);
  }
})

function addProductsEvent() {
  const products = document.querySelectorAll('.product-button a');
  for (const product of products) {
    product.addEventListener('click', function (e) {
      e.preventDefault();
      const id = parseInt(e.currentTarget.getAttribute('id'));
      const amountDiv = document.querySelector('.amount');

      if (amountDiv.innerHTML === '0') {
        amountDiv.innerHTML = 1;
        amountDiv.style.display = 'flex';
      }
      else
        amountDiv.innerHTML = parseInt(amountDiv.innerHTML) + 1;

      if (productList.some(product => product.id === id)) {
        for (const product of productList)
          if (product.id === id) {
            product.amount++;
            // alert("O produto foi adicionado ao carrinho !!");
          }
      }
      else
        productList.push({ id: id, amount: 1 });
      // alert("O produto foi adicionado ao carrinho !!");
    });
  }
}

const cartButton = document.querySelector('#cart-button');
cartButton.addEventListener('click', function (e) {
  e.preventDefault();

  const amount = document.querySelector('.amount').innerHTML;
  if (amount === '0') {
    window.alert('Carrinho está vazio !!');
  }
  else {
    localStorage.setItem('productList', JSON.stringify(productList));
    window.location.href = '../cart';
  }
});