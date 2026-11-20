export interface Item { id: number; name: string; price: number; doublePrice?: number; emoji: string; cat: string; top?: boolean; img?: string }
export interface Reward { pts: number; label: string; pct?: number }
export const WHATSAPP = '919384463160';
// Every item has img: 'assets/menu_images/<file>' – just replace the file in src/assets/menu_images (or edit the name here).
export const ITEMS: Item[] = [
    { id: 1, name: 'Milk Chocolate Waffle', price: 59, doublePrice: 109, emoji: '🧇', cat: 'Waffles', top: true, img: 'assets/menu_images/1.png' },
    { id: 2, name: 'Dark Chocolate Waffle', price: 59, doublePrice: 109, emoji: '🧇', cat: 'Waffles', img: 'assets/menu_images/2.png' },
    { id: 3, name: 'White Chocolate Waffle', price: 59, doublePrice: 109, emoji: '🧇', cat: 'Waffles', img: 'assets/menu_images/3.png' },
    { id: 4, name: 'Triple Chocolate Waffle', price: 69, doublePrice: 129, emoji: '🧇', cat: 'Waffles', top: true, img: 'assets/menu_images/4.jpg' },
    { id: 5, name: 'KitKat Waffle', price: 79, doublePrice: 149, emoji: '🍫', cat: 'Waffles', img: 'assets/menu_images/5.png' },
    { id: 6, name: 'Oreo and Cream Waffle', price: 79, doublePrice: 149, emoji: '🍪', cat: 'Waffles', img: 'assets/menu_images/6.png' },
    { id: 7, name: 'Biscoff Waffle', price: 79, doublePrice: 149, emoji: '🧇', cat: 'Waffles', img: 'assets/menu_images/7.png' },
    { id: 8, name: 'Nutella Waffle', price: 89, doublePrice: 159, emoji: '🍫', cat: 'Waffles', top: true, img: 'assets/menu_images/8.png' },
    { id: 9, name: 'Tiramisu', price: 89, emoji: '🍰', cat: 'Cakes', img: 'assets/menu_images/9.jpg' },
    { id: 10, name: 'Tres Leches Milk', price: 89, emoji: '🍰', cat: 'Cakes', top: true, img: 'assets/menu_images/10.png' },
    { id: 11, name: 'Tres Leches Mango', price: 89, emoji: '🥭', cat: 'Cakes', top: true, img: 'assets/menu_images/11.png' },
    { id: 12, name: 'Tres Leches Rose Milk', price: 89, emoji: '🌹', cat: 'Cakes', img: 'assets/menu_images/12.jpg' },
    { id: 13, name: 'Tres Leches Blueberry', price: 89, emoji: '🫐', cat: 'Cakes', img: 'assets/menu_images/13.jpg' },
    { id: 14, name: 'Matilda Cake', price: 179, emoji: '🍫', cat: 'Cakes', top: true, img: 'assets/menu_images/14.jpg' },
    { id: 15, name: 'Little Heart with Kunafa', price: 99, emoji: '❤️', cat: 'Kunafa', img: 'assets/menu_images/15.jpg' },
    { id: 16, name: 'Banana with Kunafa', price: 99, emoji: '🍌', cat: 'Kunafa', img: 'assets/menu_images/16.jpg' },
    { id: 17, name: 'Strawberry Kunafa', price: 139, emoji: '🍓', cat: 'Kunafa', img: 'assets/menu_images/17.jpg' },
    { id: 18, name: 'Brownie with Kunafa Bowl', price: 149, emoji: '🍫', cat: 'Kunafa', top: true, img: 'assets/menu_images/18.jpg' },
    { id: 19, name: 'Overloaded Kunafa Bowl', price: 199, emoji: '🍨', cat: 'Kunafa', top: true, img: 'assets/menu_images/19.jpg' },
    { id: 20, name: 'Blueberry Cheesecake', price: 179, emoji: '🫐', cat: 'Cheesecakes', img: 'assets/menu_images/20.jpg' },
    { id: 21, name: 'Triple Chocolate Cheesecake', price: 189, emoji: '🍫', cat: 'Cheesecakes', img: 'assets/menu_images/21.jpg' },
    { id: 22, name: 'Strawberry Cheesecake', price: 189, emoji: '🍓', cat: 'Cheesecakes', img: 'assets/menu_images/22.jpg' },
    { id: 23, name: 'Lotus Biscoff Cheesecake', price: 199, emoji: '🍰', cat: 'Cheesecakes', img: 'assets/menu_images/23.jpg' },
    { id: 24, name: 'Little Hearts', price: 59, emoji: '❤️', cat: 'Triple Chocolate', img: 'assets/menu_images/24.jpg' },
    { id: 25, name: 'Banana', price: 79, emoji: '🍌', cat: 'Triple Chocolate', img: 'assets/menu_images/25.jpg' },
    { id: 26, name: 'Marshmallow', price: 89, emoji: '🍡', cat: 'Triple Chocolate', img: 'assets/menu_images/26.jpg' },
    { id: 27, name: 'Strawberry', price: 139, emoji: '🍓', cat: 'Triple Chocolate', img: 'assets/menu_images/27.jpg' },
    { id: 28, name: 'Dark Chocolate Brownie', price: 129, emoji: '🍫', cat: 'Brownies', img: 'assets/menu_images/28.jpg' },
    { id: 29, name: 'Milk Chocolate Brownie', price: 129, emoji: '🍫', cat: 'Brownies', img: 'assets/menu_images/29.jpg' },
    { id: 30, name: 'White Chocolate Brownie', price: 119, emoji: '🟫', cat: 'Brownies', img: 'assets/menu_images/30.jpg' },
    { id: 31, name: 'Triple Chocolate Brownie', price: 149, emoji: '🍫', cat: 'Brownies', img: 'assets/menu_images/31.jpg' },
    { id: 32, name: 'Sizzling Brownie', price: 179, emoji: '🔥', cat: 'Brownies', img: 'assets/menu_images/32.jpg' },
    { id: 33, name: 'Lotus Biscoff Brownie', price: 189, emoji: '🍪', cat: 'Brownies', img: 'assets/menu_images/33.jpg' },
    { id: 34, name: 'Death by Chocolate', price: 199, emoji: '🍫', cat: 'Brownies', img: 'assets/menu_images/34.jpg' },
    { id: 35, name: 'Hot Chocolate Brownie', price: 159, emoji: '🍫', cat: 'Brownie Special', top: true, img: 'assets/menu_images/35.jpg' },
    { id: 36, name: 'Bun Butter Jam', price: 49, emoji: '🍞', cat: 'Buns', img: 'assets/menu_images/36.jpg' },
    { id: 37, name: 'Brown Sugar Bun', price: 49, emoji: '🍞', cat: 'Buns', img: 'assets/menu_images/37.jpg' },
    { id: 38, name: 'Palkova Bun', price: 69, emoji: '🍞', cat: 'Buns', img: 'assets/menu_images/38.jpg' },
    { id: 39, name: 'White Chocolate Bun', price: 59, emoji: '🍞', cat: 'Buns', img: 'assets/menu_images/39.jpg' },
    { id: 40, name: 'Dark Chocolate Bun', price: 59, emoji: '🍞', cat: 'Buns', img: 'assets/menu_images/40.jpg' },
    { id: 41, name: 'Milk Chocolate Bun', price: 59, emoji: '🍞', cat: 'Buns', img: 'assets/menu_images/41.jpg' },
    { id: 42, name: 'Triple Chocolate Bun', price: 79, emoji: '🍞', cat: 'Buns', img: 'assets/menu_images/42.jpg' },
    { id: 43, name: 'Platter', price: 249, emoji: '🍽️', cat: 'Main Course', img: 'assets/menu_images/43.jpg' },
    { id: 44, name: 'Sizzling Platter', price: 299, emoji: '🔥', cat: 'Main Course', img: 'assets/menu_images/44.jpg' },
    { id: 45, name: 'Brownie Burger', price: 99, emoji: '🍔', cat: 'Choco Burger', img: 'assets/menu_images/45.jpg' },
    { id: 46, name: 'Overloaded Kunafa Burger', price: 149, emoji: '🍔', cat: 'Choco Burger', img: 'assets/menu_images/46.jpg' },
    { id: 47, name: 'Hot Chocolate', price: 59, emoji: '☕', cat: 'Coffee', img: 'assets/menu_images/47.jpg' },
    { id: 48, name: 'Plain Maggie', price: 59, emoji: '🍜', cat: 'Maggie', img: 'assets/menu_images/48.jpg' },
    { id: 49, name: 'Cheese Maggie', price: 69, emoji: '🧀', cat: 'Maggie', img: 'assets/menu_images/49.jpg' },
    { id: 50, name: 'Chicken Maggie', price: 79, emoji: '🍜', cat: 'Maggie', img: 'assets/menu_images/50.jpg' },
    { id: 51, name: 'Chicken Cheese Maggie', price: 99, emoji: '🧀', cat: 'Maggie', img: 'assets/menu_images/51.jpg' },
    { id: 52, name: 'Fries', price: 69, emoji: '🍟', cat: 'Fries', img: 'assets/menu_images/52.jpg' },
    { id: 53, name: 'Masala Fries', price: 89, emoji: '🍟', cat: 'Fries', img: 'assets/menu_images/53.jpg' },
    { id: 54, name: 'Fried Chicken Momos', price: 89, emoji: '🥟', cat: 'Snacks', img: 'assets/menu_images/54.jpg' },
    { id: 55, name: 'Chicken Nuggets', price: 89, emoji: '🍗', cat: 'Snacks', img: 'assets/menu_images/55.jpg' },
    { id: 56, name: 'Chicken Pops', price: 89, emoji: '🍗', cat: 'Snacks', img: 'assets/menu_images/56.jpg' },
    { id: 57, name: 'London Strawberry', price: 119, emoji: '🍓', cat: 'Special Items', top: true, img: 'assets/menu_images/57.jpg' },
    { id: 58, name: 'Brownie Kebab', price: 59, emoji: '🍫', cat: 'Special Items', img: 'assets/menu_images/58.jpg' },
    { id: 59, name: 'Mispahh', price: 99, emoji: '🍨', cat: 'Special Items', img: 'assets/menu_images/59.jpg' },
    { id: 60, name: 'Waffle Pizza', price: 249, emoji: '🍕', cat: 'Special Items', top: true, img: 'assets/menu_images/60.jpg' },
    { id: 61, name: 'Schezwan Momos', price: 109, emoji: '🥟', cat: 'Special Items', img: 'assets/menu_images/61.jpg' },
    { id: 62, name: 'Schezwan Pops', price: 109, emoji: '🍗', cat: 'Special Items', img: 'assets/menu_images/62.jpg' },
    { id: 63, name: 'Chicken Strips', price: 149, emoji: '🍗', cat: 'Special Items', img: 'assets/menu_images/63.jpg' },
    { id: 64, name: 'Cold Boost', price: 60, emoji: '🥤', cat: 'Juice', img: 'assets/menu_images/64.jpg' },
    { id: 65, name: 'Rose Milk', price: 70, emoji: '🥛', cat: 'Juice', img: 'assets/menu_images/65.jpg' },
    { id: 66, name: 'Blue Curacao Mojito', price: 80, emoji: '🍹', cat: 'Juice', img: 'assets/menu_images/66.jpg' },
    { id: 67, name: 'Green Apple Mojito', price: 80, emoji: '🍏', cat: 'Juice', img: 'assets/menu_images/67.jpg' },
];

// TAKEAWAY CHARGE
export const TAKEAWAY_CHARGE = 10;
export const REWARDS: Reward[] = [
    { pts: 1000, label: '5% off total bill', pct: 5 },
    { pts: 2000, label: 'FREE single piece waffle' },
    { pts: 3000, label: 'FREE mojito' },
    { pts: 5000, label: 'FREE tres leches cake' }];
export const RATING = { score: 4.8, count: 120, mapsUrl: 'https://www.google.com/maps' };
export const REVIEWS = [
    { name: 'Mukila T', stars: 5, text: '5⭐ Very Tastey and Delicious 😍' },
    { name: 'Thenga', stars: 5, text: 'Waffles are so good here' },
    { name: 'Mukilan Mukilan', stars: 4, text: 'Kunafa is very good....and all the food are really very good🥰🥰' }];
// (Instagram now lives in extras.ts; these two are no longer used)
export const INSTA_ID = 'yellove_dessert_rathinam';
export const INSTA_POSTS: any[] = [];
export const GROUPS = [
    { slug: 'desserts', title: 'Desserts', cats: ['Waffles', 'Cakes', 'Kunafa', 'Cheesecakes', 'Triple Chocolate', 'Brownies', 'Brownie Special', 'Buns', 'Special Items'] },
    { slug: 'fried', title: 'Fried & Snacks', cats: ['Snacks', 'Fries', 'Maggie', 'Choco Burger', 'Main Course'] },
    { slug: 'juice', title: 'Juices & Drinks', cats: ['Juice', 'Coffee'] }
];