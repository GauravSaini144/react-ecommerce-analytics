import {generateInventory,generateOrders, generateProduct, generateRevenueData, generateUsers} from "../utils/generateData"


const users=generateUsers(700);
const products=generateProduct(20);
const orders=generateOrders(users, products);
const inventory=generateInventory(products);
const revenue=generateRevenueData();

export {users, products, orders, inventory, revenue};