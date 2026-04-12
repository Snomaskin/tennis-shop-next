type Order = {
  id: number;
  status: string;
  shipping: {
    first_name: string;
    last_name: string;
    address_1: string;
    city: string;
    postcode: string;
    country: string;
  };
  line_items: {
    id: string;
    name: string;
    quantity: number;

    price: string;

    image: {
      src: string;
      id: string;
    };
  }[];

  total: string;
};

export type { Order };
