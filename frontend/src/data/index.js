export const FARMERS = [
  { id: 1, name: 'Rani Kumari', location: 'Gurgaon, Haryana', dist: '2.5km', rating: 4.5, reviews: 128, products: 18, exp: 8, orders: 340, specialty: 'Organic vegetables', tags: ['Organic', 'Seasonal'], emoji: '👩‍🌾', verified: true, desc: 'Specializes in organic vegetables and seasonal greens.' },
  { id: 2, name: 'Harpal Singh', location: 'Gurgaon, Haryana', dist: '2.5km', rating: 4.5, reviews: 95, products: 24, exp: 12, orders: 540, specialty: 'Seasonal fruits', tags: ['Fresh Today', 'Premium'], emoji: '👨‍🌾', verified: true, desc: 'Expert in seasonal fruits and exotic produce.' },
  { id: 3, name: 'Sunrise Farms', location: 'Gurgaon, Haryana', dist: '3.1km', rating: 4.5, reviews: 139, products: 24, exp: 12, orders: 540, specialty: 'Organic vegetables and seasonal greens', tags: ['Organic', 'Seasonal', 'Premium'], emoji: '🧑‍🌾', verified: true, desc: 'Large farm specializing in organic vegetables and seasonal greens.' },
  { id: 4, name: 'Vishwas Dairy', location: 'Gurgaon, Haryana', dist: '4.2km', rating: 4.2, reviews: 67, products: 8, exp: 5, orders: 120, specialty: 'Fresh dairy products', tags: ['Fresh Today'], emoji: '🥛', verified: false, desc: 'Fresh dairy products delivered daily.' },
  { id: 5, name: 'Deshmukh Farms', location: 'Gurgaon, Haryana', dist: '3.8km', rating: 4.0, reviews: 43, products: 15, exp: 7, orders: 210, specialty: 'Root vegetables and carrots', tags: ['Seasonal'], emoji: '🥕', verified: false, desc: 'Specializes in root vegetables grown without chemicals.' },
]

export const PRODUCTS = [
  { id: 1, name: 'Organic Tomatoes', farmer: 'Green Valley Farms', farmerId: 3, price: 40, unit: 'kg', emoji: '🍅', category: 'Vegetables', stock: true, desc: 'Our organic tomatoes are harvested daily from the rich, fertile soils of the North Valley. Grown without synthetic pesticides or fertilizers, these tomatoes retain their natural sweetness and crisp texture. Perfect for salads, roasting, or cooking.', rating: 4.5, reviews: 128 },
  { id: 2, name: 'Spinach (palak)', farmer: 'Harpal Singh Farm', farmerId: 2, price: 25, unit: 'bunch', emoji: '🥬', category: 'Vegetables', stock: true, desc: 'Fresh spinach leaves, packed with iron and nutrients. Hand-picked every morning.', rating: 4.3, reviews: 89 },
  { id: 3, name: 'Pure Cow Milk', farmer: 'Vishwas Dairy', farmerId: 4, price: 50, unit: 'ltr', emoji: '🥛', category: 'Dairy', stock: true, desc: 'Pure cow milk sourced fresh every morning. No additives, no preservatives.', rating: 4.6, reviews: 201 },
  { id: 4, name: 'Carrot (gajar)', farmer: 'Deshmukh Farms', farmerId: 5, price: 30, unit: 'kg', emoji: '🥕', category: 'Vegetables', stock: true, desc: 'Crunchy organic carrots, perfect for salads and cooking. Grown without chemicals.', rating: 4.4, reviews: 76 },
  { id: 5, name: 'Fresh Mangoes', farmer: 'Rani Kumari Farm', farmerId: 1, price: 120, unit: 'kg', emoji: '🥭', category: 'Fruits', stock: true, desc: 'Alphonso mangoes from the farms of Gurgaon. Sweet, juicy and naturally ripened.', rating: 4.8, reviews: 312 },
  { id: 6, name: 'Sweet Bell Peppers', farmer: 'Sunrise Farms', farmerId: 3, price: 60, unit: 'kg', emoji: '🫑', category: 'Vegetables', stock: true, desc: 'Colorful, sweet bell peppers grown organically. Rich in vitamins and antioxidants.', rating: 4.5, reviews: 94 },
  { id: 7, name: 'Fresh Cucumbers', farmer: 'Sunrise Farms', farmerId: 3, price: 25, unit: 'kg', emoji: '🥒', category: 'Vegetables', stock: true, desc: 'Crisp, hydrating cucumbers picked fresh daily. Great for salads and raita.', rating: 4.2, reviews: 55 },
  { id: 8, name: 'Bananas', farmer: 'Rani Kumari Farm', farmerId: 1, price: 35, unit: 'dozen', emoji: '🍌', category: 'Fruits', stock: true, desc: 'Ripe, sweet bananas from local farms. Natural energy booster.', rating: 4.3, reviews: 143 },
]

export const CATEGORIES = ['All', 'Fruits', 'Vegetables', 'Dairy', 'Grains']

export const ORDERS = [
  {
    id: 'FFC-12345', date: '30 Mar, 12:31 pm', amount: 420.59, status: 'arrived',
    items: [{ name: 'Organic Carrots', qty: '1kg', price: 40, emoji: '🥕' }, { name: 'Fresh Kale', qty: '300g', price: 30, emoji: '🥬' }, { name: 'Organic tomatoes', qty: '1kg', price: 50, emoji: '🍅' }],
    farmer: { name: 'Harpal Singh', location: 'Gurgaon, Haryana', rating: 4.5, emoji: '👨‍🌾' },
    payment: 'Cash on delivery', delivery: '123 University Hall, Campus Exit', estimatedArrival: 'Today, 5:30 PM',
  },
  {
    id: 'FFC-12346', date: '30 Mar, 12:31 pm', amount: 420.59, status: 'cancelled',
    items: [{ name: 'Organic Carrots', qty: '1kg', price: 40, emoji: '🥕' }, { name: 'Fresh Kale', qty: '300g', price: 30, emoji: '🥬' }, { name: 'Spinach', qty: '1kg', price: 50, emoji: '🥬' }],
    farmer: { name: 'Rahul Sharma', location: 'Gurgaon, Haryana', rating: 4.2, emoji: '🧑‍🌾' },
    payment: 'UPI', delivery: '123 University Hall, Campus Exit', estimatedArrival: 'N/A',
  },
  {
    id: 'FFC-12347', date: '30 Mar, 12:31 pm', amount: 420.59, status: 'ongoing',
    items: [{ name: 'Organic Carrots', qty: '1kg', price: 40, emoji: '🥕' }, { name: 'Mangoes', qty: '500g', price: 60, emoji: '🥭' }, { name: 'Bananas', qty: '1dz', price: 35, emoji: '🍌' }],
    farmer: { name: 'Rahul Sharma', location: 'Gurgaon, Haryana', rating: 4.2, emoji: '🧑‍🌾' },
    payment: 'UPI', delivery: '123 University Hall, Campus Exit', estimatedArrival: 'Today, 5:30 PM',
  },
]

export const ADDRESSES = [
  { id: 1, label: 'Home', current: true, address: '123 Campus Lane, Block B, Gurgaon, Haryana, 122018', phone: '+91 87664 92210', icon: '🏠' },
  { id: 2, label: 'Office', current: false, address: '456 Business Park, Sector 34, Gurgaon, Haryana, 122001', phone: '+91 98765 43210', icon: '🏢' },
  { id: 3, label: 'Warehouse', current: false, address: '789 Knowledge Road, Zone 5, Gurgaon, Haryana, 122002', phone: '+91 99999 88888', icon: '🏭' },
]
