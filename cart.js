let items = JSON.parse(localStorage.getItem("data")) || [];

let cartAmount = document.querySelector(".cart-amt");
let no = 0;
JSON.parse(localStorage.getItem("data")).map((y) => {
  no = y.no + no;
});

cartAmount.innerHTML = no;

// let shopItemsData = [
//     {
//         id: item.name,
//         no: item.no,
//     }
// ];
let shoppingCart = document.getElementById("shopCard");
let label = document.getElementById("label");

let generateCartItems = () => {
  if (items.length !== 0) {
    return (shoppingCart.innerHTML = items
      .map((x) => {
        let { id, name, price, picture, no } = x;

        return `
    <div class= "cart-item">
    <img src= ${x.picture}   alt=""/ style="width :90px; height: 80px; margin-left: 20px; margin-top: 15px">
    <div class="details">
    <div class="title-price-x">
    <p class="price"> ${x.price}*${x.no}</p>
    <p class="product-name"> ${x.name}</p>
    <div class="price-quantity">
    <button id = "decrement">
    <i
    onclick="decrement(${id})"
    class="fas fa-minus quantity-btn"
    ></i>
    </button>
    
  <h4 id=${id}>${x.no}</h4>
  <button id = "increment">
  <i
  onclick="increment(${id})"
  class="fas fa-plus quantity-btn"
></i>
  </button>
 
  </div>
    </div>
    <div class="cart-buttons">
    <p style="color:#49b649; font-weight: 900;">$ ${x.no * x.price}</p>
    <button onclick ="removeCart(${id})" class="del-btn">X</button>
    </div>
    </div>
    </div>

   
    `;
      })
      .join(""));
  } else {
    shoppingCart.innerHTML = ``;
    label.innerHTML = `
    </div>
    <div class="cart-empty"><h2>Cart is Empty</h2>
      <a href="./index.html"><button class="Homebtn">Back to home</button></a></div>
    `;
  }
  
};
// {/* <div class="total">
// <div class="subtotal">$ $</div>
// <div class="grand-total"></div>
// </div> */}
generateCartItems();

let increment = (id) => {
  let search = items.find((y) => y.id === id);
  if (search === undefined) {
    items.push(
      item
      //   {
      //   id: item.name,
      //   no: item.no,
      // }
    );
  } else {
    search.no += 1;
  }
  update(id);
  localStorage.setItem("data", JSON.stringify(items));
  generateCartItems();
  calculation();
};
JSON.parse(localStorage.getItem("data"));

let decrement = (id) => {
  let search = items.find((y) => y.id === id);
  if (search.no === 0) return;
  else {
    search.no -= 1;
  }
  update(id);
  items = items.filter((y) => y.no !== 0);
  generateCartItems();
  localStorage.setItem("data", JSON.stringify(items));
  calculation();
};
JSON.parse(localStorage.getItem("data"));

let update = (id) => {
  let search = items.find((y) => y.id === id);
  document.getElementById(id).innerHTML = search.no;
  calculation();
  totalAmount();
};

let calculation = () => {
  let cartAmount = document.querySelector(".cart-amt");
  cartAmount.innerHTML = JSON.parse(localStorage.getItem("data"))
    .map((y) => y.no)
    .reduce((y, x) => y + x, 0);
};

let removeCart = (id) => {
  items = items.filter((y) => y.id !== id);
  generateCartItems();
  localStorage.setItem("data", JSON.stringify(items));
  totalAmount();
  calculation();
};

let totalAmount = () => {
  if (items.length !== 0) {
    let amount = items
      .map((y) => {
        return y.no * y.price;
      })
      .reduce((y, x) => y + x, 0);

    label.innerHTML = `
<div class="subtotal">
  <span>Subtotal</span>
  <span>$ ${amount}</span>
</div>
<div class="shipping">
  <span>Shipping</span>
  <span>$ 5</span>
</div>
<div class="total">
  <span>Total</span>
  <span> $ ${amount + 5}</span>
</div>
<a href="./chechout.html"><button class="checkout">CHECKOUT</button></a>

`;
// let pay = document.getElementById('pay');
// pay.innerHTML = `${amount + 5} pay`;
  } else return;
};

totalAmount();

