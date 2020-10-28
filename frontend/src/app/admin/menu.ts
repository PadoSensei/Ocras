export interface Restaurant {
  name: string;
  address: string;
  url?: string;
  id?: string;
}

export interface MenuItem {
  name: string;
  price: number;
  description: string;
  type: string;
}

export interface Menu {
  restaurant: Restaurant;
  items: MenuItem[];
}