import { Product, Clothing, Appliance } from "../../../data/products.js";

describe("tests suite: Product Class", () => {
  const products = [
    {
      id: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
      image: "images/products/athletic-cotton-socks-6-pairs.jpg",
      name: "Black and Gray Athletic Cotton Socks - 6 Pairs",
      rating: {
        stars: 4.5,
        count: 87,
      },
      priceCents: 1090,
      keywords: ["socks", "sports", "apparel"],
    },
    {
      id: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
      image: "images/products/intermediate-composite-basketball.jpg",
      name: "Intermediate Size Basketball",
      rating: {
        stars: 4,
        count: 127,
      },
      priceCents: 2095,
      keywords: ["sports", "basketballs"],
    },
    {
      id: "83d4ca15-0f35-48f5-b7a3-1ea210004f2e",
      image: "images/products/adults-plain-cotton-tshirt-2-pack-teal.jpg",
      name: "Adults Plain Cotton T-Shirt - 2 Pack",
      rating: {
        stars: 4.5,
        count: 56,
      },
      priceCents: 799,
      keywords: ["tshirts", "apparel", "mens"],
      type: "clothing", // -> discriminator property
      sizeChartLink: "images/clothing-size-chart.png",
    },
    {
      id: "54e0eccd-8f36-462b-b68a-8182611d9add",
      image: "images/products/black-2-slot-toaster.jpg",
      name: "2 Slot Toaster - Black",
      rating: {
        stars: 5,
        count: 2197,
      },
      priceCents: 1899,
      keywords: ["toaster", "kitchen", "appliances"],
      type: "appliances",
      instructionsLink: "images/appliance-instructions.png",
      warrantyLink: "images/appliance-warranty.png",
    },
  ];

  it("Product Class (generate object and check property and method)", () => {
    // create object
    const newProducts = products.map((product) => {
        return new Product(product);
    });

    expect(newProducts.length).toEqual(4);
    
    // check property
    expect(newProducts[0].id).toEqual('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');

    // check method generate image
    expect(newProducts[0].generateImage()).toContain('images/');

    // check method generate prices
    expect(newProducts[0].generatePrice()).toContain('10.90');
  });

  it("Clothing Class [Product Inherit] (generate object and check property and method)", () => {
    // create object
    const newProducts = products.map((product) => {
        if (product.type === 'clothing') {
            return new Clothing(product);
        }
        return new Product(product);
    });

    expect(newProducts.find((product) => product instanceof Clothing).id).not.toEqual(null);
    
    // check property
    expect(newProducts.find((product) => product instanceof Clothing).id).toEqual('83d4ca15-0f35-48f5-b7a3-1ea210004f2e');
    
    // check method generate image
    expect(newProducts.find((product) => product instanceof Clothing).generateImage()).toContain('images/');
    
    // check method generate prices
    expect(newProducts.find((product) => product instanceof Clothing).generatePrice()).toContain('7.99');

    // check spesific method
    expect(newProducts.find((product) => product instanceof Clothing).extraInfoHtml()).toContain('Size Chart');
  });

  it("Appliance Class [Product Inherit] (generate object and check property and method)", () => {
    // create object
    const newProducts = products.map((product) => {
        if (product.type === 'clothing') {
            return new Clothing(product);
        } else if (product.type === 'appliances') {
            return new Appliance(product);
        }
        return new Product(product);
    });

    expect(newProducts.find((product) => product instanceof Appliance).id).not.toEqual(null);
    
    // check property
    expect(newProducts.find((product) => product instanceof Appliance).id).toEqual('54e0eccd-8f36-462b-b68a-8182611d9add');
    
    // check method generate image
    expect(newProducts.find((product) => product instanceof Appliance).generateImage()).toContain('images/');
    
    // check method generate prices
    expect(newProducts.find((product) => product instanceof Appliance).generatePrice()).toContain('18.99');

    // check spesific method
    expect(newProducts.find((product) => product instanceof Appliance).extraInfoHtml()).not.toContain('Size Chart');
    expect(newProducts.find((product) => product instanceof Appliance).extraInfoHtml()).toContain('Instructions');
    expect(newProducts.find((product) => product instanceof Appliance).extraInfoHtml()).toContain('Warranty');
  });
});
