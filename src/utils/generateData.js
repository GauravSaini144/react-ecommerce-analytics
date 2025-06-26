import {faker, fakerSK} from "@faker-js/faker"


export const generateUsers=(count=100)=>{
    return Array.from({length:count},()=>({
        id:faker.string.uuid(),
        name:faker.person.fullName(),
        email:faker.internet.email(),
        role:"customer",
        createdAt:faker.date.past().toISOString(),
        status:faker.helpers.arrayElement(["active","inactive"]),
    })
);
}

export const generateProduct=(count=50)=>{

    return Array.from({length: count},()=>({

        id:faker.string.uuid(),
        name:faker.commerce.productName(),
        category:faker.commerce.department(),
        price:Number(faker.commerce.price({min:100, max:2000})),
        stock:faker.number.int({min:0, max:100}),
        rating:faker.number.float({min:1, max:5, precision:0.1}),
        image:faker.image.urlPicsumPhotos(),
        description:faker.commerce.productDescription(),
    }));

}
   

export const generateOrders = (users, products, count = 500) => {
  // Generate an array of the past 30 days
  const past30Days = Array.from({ length: 30 }, (_, i) => {
    const date = new Date();
    date.setDate(date.getDate() - i); // i days ago
    return date;
  });

  const orders = Array.from({ length: count }, () => {
    const user = faker.helpers.arrayElement(users);

    const items = faker.helpers.multiple(
      () => {
        const product = faker.helpers.arrayElement(products);
        const quantity = faker.number.int({ min: 1, max: 5 });

        return {
          productId: product.id,
          name: product.name,
          quantity,
          price: product.price,
          total: product.price * quantity,
        };
      },
      { count: { min: 1, max: 5 } }
    );

    const total = items.reduce((acc, item) => acc + item.total, 0);

    return {
      id: faker.string.uuid(),
      userId: user.id,
      items,
      total,
      status: faker.helpers.arrayElement(["delivered", "pending", "cancelled"]),
      createdAt: faker.helpers.arrayElement(past30Days).toISOString(),
    };
  });

  // ✅ Sort by createdAt ascending
  return orders.sort(
    (a, b) => new Date(a.createdAt) - new Date(b.createdAt)
  );
};

export const generateInventory=(products)=>{
    return products.map((product)=>({
        productId:product.id,
        productName:product.name,
        productImage:product.image,
        stock:product.stock,
        price:product.price,
        category:product.category,
        lastUpdated:faker.date.recent(10).toISOString(),
    }));
};

export const generateRevenueData=(days=30)=>{
    return Array.from({length:days}, (_, i)=>{
        const date=new Date();
        date.setDate(date.getDate() - i);

    return {
      date: date.toISOString().split('T')[0],
      revenue: faker.number.int({ min: 1000, max: 50000 }),
      ordersCount: faker.number.int({ min: 5, max: 50 }),
    };
  }).reverse(); // Keep recent first

}
