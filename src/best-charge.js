'use strict';
var loadAllItems = require("items.js");
var loadPromotions = require("promotions");

function bestCharge(selectedItems) {
  let listNumber = getNumber(selectedItems);
  let listPrice = getPrice(listNumber);
  let original = originalPrice(listPrice);
  let full30 = discount(listPrice);
  let halfDiscount = halfPrice(listPrice);
  let choosePromotion = comparativeOffer(full30, halfDiscount);
  let discountPrice = discountPrice(full30, halfDiscount);
  return printList(listPrice, choosePromotion, original, discountPrice);
}

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

function originalPrice(order) {
  let totalPrice = 0;
  for (let i = 0; i < order.length; i++) {
    totalPrice += order[i].price;
  }
  return totalPrice;
}

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

function comparativeOffer(one, two) {
  let promotion;
  let orderList = loadPromotions();
  if (one > two) {
    promotion = orderList[0];
  } else if (one < two) {
    promotion = orderList[1];
  } else {
    promotion = orderList[0];
  }
  return promotion;
}

function discountPrice(one, two) {
  let price;
  let orderList = loadPromotions();
  if (one > two) {
    price = one;
  } else {
    price = two;
  }
  return price;
}

function printList(list, promotion, originalPrice, totalPrice) {
  let promotionList;
  let discountedPrices = originalPrice - totalPrice;
  for (let half of list) {
    if (half.id === promotion[1].items[0] || half.id === promotion[1].items[1]) {
      promotionList += half.name;
    }
  }
  let receipt = '============= 订餐明细 =============\n';
  for (let item of list) {
    let itemOfList = item.name + ' x ' + item.count + ' = ' + item.subtotal + '元\n';
    receipt += itemOfList;
  }
  receipt += '-----------------------------------\n';
  if (!promotion.items) {
    receipt += '使用优惠:\n' + promotion.type + '，省6元\n';
  } else {
    receipt += '使用优惠:\n' + promotion.type + promotionList + '，省' + discountedPrices + '元\n'
  }
  receipt += '-----------------------------------\n';
  receipt += '总计：' + totalPrice + '元\n';
  receipt += '===================================';
  return receipt;
}