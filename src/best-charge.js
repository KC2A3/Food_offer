'use strict';
var loadAllItems = require("items.js");
var loadPromotions = require("promotions");

function bestCharge(selectedItems) {
  let listNumber = getNumber(selectedItems);
  let listPrice = getPrice(listNumber);
  let full30 = discount(listPrice);
  let halfDiscount = halfPrice(listPrice);
  return /*TODO*/;
}
/*读取输入的菜品数量*/
function getNumber(listArr) {
  let order = [];
  for (let category of listArr) {
    let list = category.split('x');
    order.push({
      id: list[0],
      num: list[1]
    });
  }
  return order;
}
/*根据菜品编码得到菜品信息算出各个菜品价格*/
function getPrice(order) {
  let item = loadAllItems();
  for (let numbering of order) {
    for (let price of item) {
      if (numbering.id === price.id) {
        numbering.price = price.price * numbering.num;
        numbering.name = price.name;
      }
    }
  }
  return order;
}
/*满30元的话进行满30减6操作*/
function discount(order) {
  let totalPrice = 0;
  for (let i = 0; i < order.length; i++) {
    totalPrice += order[i].price;
  }
  if (totalPrice >= 30) {
    totalPrice -= 6;
  }
  return totalPrice;
}
/*进行指定菜品半价操作*/
function halfPrice(order) {
  let orderList = loadPromotions();
  for (let half of order) {
    if (half.id === orderList[1].items[0] || half.id === orderList[1].items[1]) {
      half.price = half.price / 2;
    }
  }
  let totalPrice = 0;
  for (let i = 0; i < order.length; i++) {
    totalPrice += order[i].price;
  }
  return totalPrice;
}
/*比较两种方法优惠量大小并选择*/
function comparativeOffer(one, two) {
  let promotion;
  let orderList = loadPromotions();
  if (one > two) {
    promotion = orderList[0].type;
  } else {
    promotion = orderList[1].type;
  }
  return promotion;
}
/*输出商品清单和优惠信息*/
function printList {}