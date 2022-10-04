let addToCartBtn = document.getElementsByClassName("add-cart");

let items = JSON.parse(localStorage.getItem("data")) || [];

let myPic = [{ img: "./brocolli flower.png" }, { img: "./pomegranate.png" }];

for (let i = 0; i < addToCartBtn.length; i++) {
  addToCartBtn[i].addEventListener("click", (e) => {
    let item = {
      id: i + 1,
      name: e.target.parentElement.children[2].textContent,
      price: e.target.parentElement.children[1].children[0].textContent,
      picture: e.target.parentElement.children[0].src,
      no: 1,
    };
    let search = items.find((x) => x.id === item.id);
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
    localStorage.setItem("data", JSON.stringify(items));

    let cartAmount = document.querySelector(".cart-amt");
    let no = 0;
    JSON.parse(localStorage.getItem("data")).map((y) => {
      no = y.no + no;
    });

    cartAmount.innerHTML = no;
  });
}

let cartAmount = document.querySelector(".cart-amt");
let no = 0;
JSON.parse(localStorage.getItem("data")).map((y) => {
  no = y.no + no;
});

cartAmount.innerHTML = no;

// let shop = document.querySelector(".favourite")
// console.log(shop);

// let basket = [];

//  let increment = () => {

//   //

//  console.log('i love u');
//  };

//  let decrement = () => {
//    console.log("decrement");
//  };
//  let update = () => {};
