'use strict';
var loadAllItems = require("items.js");
var loadPromotions = require("promotions");

function bestCharge(selectedItems) {
  return /*TODO*/;
}

/*读取输入的菜品数量*/
function getNumber(listArr){
    let order=[];
    for (let category of listArr){
            let list= category.split('x');
            order.push({id:list[0],num:list[1]});
    }return order;
}
/*根据菜品编码得到菜品信息算出各个菜品价格*/
function getPrice(order){
    let item=loadAllItems();
    for (let numbering of order){
        for (let price of item){
            if (numbering.id===price.id){
                numbering.price=price.price*numbering.num;
                numbering.name=price.name;
            }
        }
    }return order;
}
/*满30元的话进行满30减6操作*/
function discount{}
/*进行指定菜品半价操作*/
function halfPrice{}
/*比较两种方法优惠量大小并选择*/
/*输出商品清单和优惠信息*/
function printList{}