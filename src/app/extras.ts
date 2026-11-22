// Shop settings – edit here (payment QR image: src/assets/payment-qr.png)
export const INSTA_URL='https://www.instagram.com/yellove_dessert_rathinam/';
// Paste links of your latest reels/posts here (open the reel on Instagram > Share > Copy link). They show as video cards.
export const REEL_LINKS:string[]=[];
export const MAP_URL='https://www.google.com/maps/place/Yellove+dessert+rathinam/@10.9336082,76.9777131,17z/data=!3m1!4b1!4m6!3m5!1s0x3ba85bfc8cac861f:0x1629d326ded833fd!8m2!3d10.9336082!4d76.980288!16s%2Fg%2F11nc0vl0v_';
export const MAP_EMBED='https://www.google.com/maps?q=10.9336082,76.980288&z=17&output=embed';
export const PLACEHOLDER_IMG='assets/menu_images/jpg1.jpg';   // shown for any item that has no photo yet
export const QUOTES:Record<string,string[]>={
 home:['Life is short – eat dessert first. 🍰','Happiness is a warm waffle and good company.','Taste the love in every bite. 💛'],
 menu:['Every bite is a little love letter.','Calories are just hugs for your taste buds.','Choose happiness. Choose chocolate. 🍫'],
 cart:['Good things come to those who order dessert.','Your sweet moment is one tap away.','Almost there – sweetness is on its way! 💛'],
 game:['Play a little, win a lot – sweet rewards await!','Every point brings you closer to something delicious.','Fun first, dessert after. 🎮🍨'],
 updates:['Fresh from our kitchen to your feed.','Sweet moments, served daily. 📸','Follow the drip, follow the love.'],
 visit:['Come for the dessert, stay for the love.','Your table is waiting – and so is the chocolate.','Find us, taste us, love us. 📍']};

// ADMIN: log in with this name + number to open the Admin page. The password is NOT stored here – it is your Firebase Authentication password.
export const ADMIN={name:'Srini',phone:'9384463160'};
// FIREBASE (real-time menu). Fill these from the Firebase console (see README). Leave databaseURL empty to run without Firebase.
export const FIREBASE={apiKey:'',authDomain:'',databaseURL:'',projectId:'',appId:''};
// The email of the admin user you create in Firebase Authentication. Its password is what you type on the login screen.
export const ADMIN_EMAIL='';
