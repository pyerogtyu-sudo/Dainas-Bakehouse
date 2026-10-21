
const PRODUCTS = [
    {
        "id": 1,
        "name": "Butter Croissant",
        "category": "Pastries",
        "price": 85,
        "description": "Flaky layers baked golden with rich butter.",
        "image": "https://images.unsplash.com/photo-1555507036-ab1f4038808a?auto=format&fit=crop&w=800&q=82",
        "best": false,
        "keywords": "butter croissant pastries flaky layers baked golden with rich butter.",
        "unit": "Per piece"
    },
    {
        "id": 2,
        "name": "Chocolate Fudge Cake",
        "category": "Cakes",
        "price": 195,
        "description": "Moist chocolate layers with silky fudge.",
        "image": "chocolate-fudge-cake.jpg",
        "best": false,
        "keywords": "chocolate fudge cake cakes moist chocolate layers with silky fudge.",
        "unit": "Per slice"
    },
    {
        "id": 3,
        "name": "Cinnamon Rolls",
        "category": "Pastries",
        "price": 110,
        "description": "Soft, buttery rolls swirled with cinnamon and finished with a light glaze.",
        "image": "https://images.unsplash.com/photo-1509365465985-25d11c17e812?auto=format&fit=crop&w=800&q=82",
        "best": false,
        "keywords": "cinnamon rolls pastries soft, buttery rolls swirled with cinnamon and finished with a light glaze. cinnamon roll cinnamon rolls",
        "unit": "Per piece"
    },
    {
        "id": 4,
        "name": "Country Sourdough",
        "category": "Bread",
        "price": 210,
        "description": "Slow-fermented artisan loaf with crisp crust.",
        "image": "https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=800&q=82",
        "best": false,
        "keywords": "country sourdough bread slow-fermented artisan loaf with crisp crust.",
        "unit": "Per loaf"
    },
    {
        "id": 5,
        "name": "Chocolate Chip Cookies",
        "category": "Pastries",
        "price": 65,
        "description": "Golden cookies packed with chocolate chips.",
        "image": "https://images.unsplash.com/photo-1499636136210-6f4ee915583e?auto=format&fit=crop&w=800&q=82",
        "best": false,
        "keywords": "chocolate chip cookies pastries golden cookies packed with chocolate chips. chocolate chip cookie cookies",
        "unit": "Per piece"
    },
    {
        "id": 6,
        "name": "Iced Spanish Latte",
        "category": "Coffee",
        "price": 155,
        "description": "Espresso, milk and a sweet creamy finish.",
        "image": "https://images.unsplash.com/photo-1517701604599-bb29b565090c?auto=format&fit=crop&w=800&q=82",
        "best": false,
        "keywords": "iced spanish latte coffee espresso, milk and a sweet creamy finish.",
        "unit": "Per cup"
    },
    {
        "id": 7,
        "name": "Classic Cappuccino",
        "category": "Coffee",
        "price": 135,
        "description": "Rich espresso topped with velvety foam.",
        "image": "https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=800&q=82",
        "best": false,
        "keywords": "classic cappuccino coffee rich espresso topped with velvety foam.",
        "unit": "Per cup"
    },
    {
        "id": 8,
        "name": "Strawberry Cheesecake",
        "category": "Cakes",
        "price": 215,
        "description": "Creamy cheesecake with berry notes.",
        "image": "https://static.750g.com/images/640-auto/7a6b30f4d3b456d853f30fd6a48d4d46/adobestock-328951084-1-.jpeg",
        "best": false,
        "keywords": "strawberry cheesecake cakes creamy cheesecake with berry notes.",
        "unit": "Per slice"
    },
    {
        "id": 9,
        "name": "Vanilla Cupcake",
        "category": "Cakes",
        "price": 95,
        "description": "Soft vanilla sponge with fluffy frosting.",
        "image": "vanilla-cupcake.jpg",
        "best": false,
        "keywords": "vanilla cupcake cakes soft vanilla sponge with fluffy frosting.",
        "unit": "Per piece"
    },
    {
        "id": 10,
        "name": "French Baguette",
        "category": "Bread",
        "price": 125,
        "description": "Crackly crust and airy, soft center.",
        "image": "french-baguette.jpg",
        "best": false,
        "keywords": "french baguette bread crackly crust and airy, soft center.",
        "unit": "Per loaf"
    },
    {
        "id": 11,
        "name": "Cafe Latte",
        "category": "Coffee",
        "price": 145,
        "description": "Smooth espresso and steamed milk.",
        "image": "https://images.unsplash.com/photo-1461023058943-07fcbe16d735?auto=format&fit=crop&w=800&q=82",
        "best": false,
        "keywords": "cafe latte coffee smooth espresso and steamed milk.",
        "unit": "Per cup"
    },
    {
        "id": 12,
        "name": "Fudgy Brownies",
        "category": "Pastries",
        "price": 105,
        "description": "Dense, fudgy brownies with a deep cocoa flavor and a tender center.",
        "image": "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&w=800&q=82",
        "best": false,
        "keywords": "fudgy brownies pastries dense, fudgy brownies with a deep cocoa flavor and a tender center. brownie brownies chocolate brownie",
        "unit": "Per piece"
    },
    {
        "id": 13,
        "name": "Glazed Doughnut",
        "category": "Pastries",
        "price": 85,
        "description": "Pillowy doughnut with a delicate glaze.",
        "image": "https://www.7eleven.com.au/content/7eleven/au/en/home/products/food/krispy-Kreme/doughnut-range/original-glazed/_jcr_content/root/responsivegrid_256503375/layoutcontainer/par1/image.coreimg.jpeg/1709784157415/original-glazed.jpeg",
        "best": false,
        "keywords": "glazed doughnut pastries pillowy doughnut with a delicate glaze.",
        "unit": "Per piece"
    },
    {
        "id": 14,
        "name": "Blueberry Muffin",
        "category": "Pastries",
        "price": 110,
        "description": "Tender muffin with sweet blueberries.",
        "image": "https://images.unsplash.com/photo-1607958996333-41aef7caefaa?auto=format&fit=crop&w=800&q=82",
        "best": false,
        "keywords": "blueberry muffin pastries tender muffin with sweet blueberries.",
        "unit": "Per piece"
    },
    {
        "id": 15,
        "name": "Peach Iced Tea",
        "category": "Drinks / Beverages",
        "price": 115,
        "description": "Refreshing brewed tea with peach flavor.",
        "image": "https://www.herdheld.de/uploads/alkoholfreie-drinks-eistee-pfirsich.webp",
        "best": false,
        "keywords": "peach iced tea drinks / beverages refreshing brewed tea with peach flavor.",
        "unit": "Per drink"
    },
    {
        "id": 16,
        "name": "Fruit Tart",
        "category": "Cakes",
        "price": 175,
        "description": "Buttery tart shell with fruit topping.",
        "image": "https://images.unsplash.com/photo-1488477181946-6428a0291777?auto=format&fit=crop&w=800&q=82",
        "best": false,
        "keywords": "fruit tart cakes buttery tart shell with fruit topping.",
        "unit": "Per slice"
    },
    {
        "id": 17,
        "name": "Ham & Cheese Bun",
        "category": "Bread",
        "price": 135,
        "description": "Soft savory bun with a cheesy filling.",
        "image": "ham-and-cheese.jpg",
        "best": false,
        "keywords": "ham & cheese bun bread soft savory bun with a cheesy filling.",
        "unit": "Per piece"
    },
    {
        "id": 18,
        "name": "Cold Brew Coffee",
        "category": "Coffee",
        "price": 145,
        "description": "Slow-steeped coffee served chilled.",
        "image": "https://images.unsplash.com/photo-1517701604599-bb29b565090c?auto=format&fit=crop&w=800&q=82",
        "best": false,
        "keywords": "cold brew coffee coffee slow-steeped coffee served chilled.",
        "unit": "Per cup"
    },
    {
        "id": 19,
        "name": "Classic Chocolate Crinkles",
        "category": "Crinkles",
        "price": 120,
        "description": "Rich chocolate crinkles with a soft, fudgy center and a signature powdered sugar coating. Pack of 6.",
        "image": "https://overdoughs.ph/cdn/shop/collections/Untitled-1.png?v=1716794741&width=1500",
        "best": true,
        "keywords": "classic chocolate crinkles crinkles rich chocolate crinkles with a soft, fudgy center and a signature powdered sugar coating. pack of 6. chocolate cookies cocoa powdered sugar pack of six",
        "unit": "Pack of 6"
    },
    {
        "id": 20,
        "name": "Red Velvet Crinkles",
        "category": "Crinkles",
        "price": 135,
        "description": "Soft red velvet cookies with a sweet, delicate flavor and a beautiful crinkled finish. Pack of 6.",
        "image": "https://cdn.lisadishes.com/images/featured_image_row_4_b02d7730-b8.jpg",
        "best": true,
        "keywords": "red velvet crinkles crinkles soft red velvet cookies with a sweet, delicate flavor and a beautiful crinkled finish. pack of 6. red velvet cookies crinkle pack of six",
        "unit": "Pack of 6"
    },
    {
        "id": 21,
        "name": "Matcha Crinkles",
        "category": "Crinkles",
        "price": 145,
        "description": "Tender matcha cookies with a gentle earthy sweetness and a snowy sugar finish. Pack of 6.",
        "image": "https://ujichamatcha.com/cdn/shop/files/matcha-crinkle-cookie-kait-balbin_grande.png?v=1730940276",
        "best": false,
        "keywords": "matcha crinkles crinkles tender matcha cookies with a gentle earthy sweetness and a snowy sugar finish. pack of 6. green tea matcha cookies pack of six",
        "unit": "Pack of 6"
    },
    {
        "id": 22,
        "name": "Cookies and Cream Crinkles",
        "category": "Crinkles",
        "price": 145,
        "description": "Soft cocoa cookies with creamy vanilla notes and cookie crumb pieces. Pack of 6.",
        "image": "cookies-and-cream-crinkles.jpg",
        "best": false,
        "keywords": "cookies and cream crinkles crinkles soft cocoa cookies with creamy vanilla notes and cookie crumb pieces. pack of 6. cookies cream oreo chocolate crinkle pack of six",
        "unit": "Pack of 6"
    },
    {
        "id": 23,
        "name": "Double Chocolate Crinkles",
        "category": "Crinkles",
        "price": 145,
        "description": "Extra chocolatey crinkles with a rich cocoa taste and a fudgy texture. Pack of 6.",
        "image": "https://overdoughs.ph/cdn/shop/files/Crinkles_DoubleDark_f495abf2-1aa8-41d8-85ea-87396f42b58d.jpg?v=1687227540&width=1445",
        "best": true,
        "keywords": "double chocolate crinkles crinkles extra chocolatey crinkles with a rich cocoa taste and a fudgy texture. pack of 6. double chocolate cocoa fudgy cookies pack of six",
        "unit": "Pack of 6"
    },
    {
        "id": 24,
        "name": "Strawberry Crinkles",
        "category": "Crinkles",
        "price": 135,
        "description": "Soft strawberry-flavored crinkles with a delicate sweetness and a pretty powdered finish. Pack of 6.",
        "image": "https://cupofyum.com/uploads/images/000/222/539/222539-strawberry-crinkle-cookies-b80b4e6d884129334d956f7012983dda.jpg",
        "best": false,
        "keywords": "strawberry crinkles crinkles soft strawberry-flavored crinkles with a delicate sweetness and a pretty powdered finish. pack of 6. strawberry pink cookies crinkle pack of six",
        "unit": "Pack of 6"
    },
    {
        "id": 25,
        "name": "Chocolate Cupcakes",
        "category": "Cakes",
        "price": 95,
        "description": "Moist chocolate sponge topped with smooth chocolate frosting.",
        "image": "chocolate-cupcakes.jpg",
        "best": false,
        "keywords": "chocolate cupcakes cakes moist chocolate sponge topped with smooth chocolate frosting. chocolate cupcake cocoa frosting",
        "unit": "Per piece"
    },
    {
        "id": 26,
        "name": "Red Velvet Cupcakes",
        "category": "Cakes",
        "price": 105,
        "description": "Soft red velvet sponge crowned with a creamy frosting swirl.",
        "image": "https://cdn.apartmenttherapy.info/image/upload/f_jpg%2Cq_auto%3Aeco%2Cc_fill%2Cg_auto%2Cw_1500%2Car_4%3A3/k%2FPhoto%2FRecipe%20Ramp%20Up%2F2021-12-Red-Velvet-Cupcakes%2Fred-velvet-cupcakes",
        "best": false,
        "keywords": "red velvet cupcakes cakes soft red velvet sponge crowned with a creamy frosting swirl. red velvet cupcake cream cheese frosting",
        "unit": "Per piece"
    },
    {
        "id": 27,
        "name": "Banana Bread",
        "category": "Bread",
        "price": 145,
        "description": "Moist banana loaf with a gently caramelized crust and comforting flavor.",
        "image": "banana-bread.jpg",
        "best": false,
        "keywords": "banana bread bread moist banana loaf with a gently caramelized crust and comforting flavor. banana loaf quick bread",
        "unit": "Per loaf"
    },
    {
        "id": 28,
        "name": "Cheese Rolls",
        "category": "Bread",
        "price": 85,
        "description": "Soft, pillowy rolls filled with savory cheese and baked until golden.",
        "image": "cheese-rolls.jpg",
        "best": false,
        "keywords": "cheese rolls bread soft, pillowy rolls filled with savory cheese and baked until golden. cheese bread roll savory",
        "unit": "Per piece"
    },
    {
        "id": 29,
        "name": "Ensaymada",
        "category": "Bread",
        "price": 75,
        "description": "A soft, buttery Filipino brioche-style bread finished with cheese and a light sweetness.",
        "image": "ensaymada.jpg",
        "best": false,
        "keywords": "ensaymada bread a soft, buttery filipino brioche-style bread finished with cheese and a light sweetness. filipino ensaymada cheese bread",
        "unit": "Per piece"
    },
    {
        "id": 30,
        "name": "Classic Chocolate Cake",
        "category": "Cakes",
        "price": 650,
        "description": "Classic cocoa sponge layered with chocolate frosting. 6-inch cake.",
        "image": "https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=800&q=82",
        "best": false,
        "keywords": "classic chocolate cake cakes classic cocoa sponge layered with chocolate frosting. 6-inch cake. whole chocolate birthday celebration cake 6 inch",
        "unit": "6-inch cake"
    },
    {
        "id": 31,
        "name": "Strawberry Shortcake",
        "category": "Cakes",
        "price": 780,
        "description": "Light sponge layered with cream and strawberry filling. 6-inch cake.",
        "image": "https://itsonly.recipes/images/recipeimages/classic-strawberry-shortcake.webp",
        "best": false,
        "keywords": "strawberry shortcake cakes light sponge layered with cream and strawberry filling. 6-inch cake. strawberry cream shortcake whole cake",
        "unit": "6-inch cake"
    },
    {
        "id": 32,
        "name": "Blueberry Cheesecake",
        "category": "Cakes",
        "price": 850,
        "description": "Creamy cheesecake with a blueberry topping and buttery crumb base. 6-inch cake.",
        "image": "https://images.unsplash.com/photo-1533134242443-d4fd215305ad?auto=format&fit=crop&w=800&q=82",
        "best": false,
        "keywords": "blueberry cheesecake cakes creamy cheesecake with a blueberry topping and buttery crumb base. 6-inch cake. blueberry cheesecake whole cake",
        "unit": "6-inch cake"
    },
    {
        "id": 33,
        "name": "Assorted Pastry Boxes",
        "category": "Pastries",
        "price": 480,
        "description": "A shareable box of six assorted pastries. Selection may vary by availability.",
        "image": "https://d34zicoa2zcr2f.cloudfront.net/sites/files/bakersbrewstudio2/images/products/202310/party_box_thumbnail.jpg",
        "best": false,
        "keywords": "assorted pastry boxes pastries a shareable box of six assorted pastries. selection may vary by availability. pastry box assorted pastries gift box six pieces",
        "unit": "Box of 6"
    }
];

const SITE_CONFIG = {
    "contact": {
        "email": "hello@dainasbakehouse.koko",
        "phone": "+63 007 143 1016",
        "emailIsExample": false,
        "phoneIsExample": false
    },
    "hours": "Daily, 8:00 AM–7:00 PM",
    "hoursNote": "Hours shown are suggested and should be confirmed before visiting.",
    "socialLinks": [
        {
            "name": "Facebook",
            "icon": "f",
            "url": "https://www.facebook.com/your-page-name",
            "isExample": true
        },
        {
            "name": "Instagram",
            "icon": "◎",
            "url": "https://www.instagram.com/your-profile-name/",
            "isExample": true
        },
        {
            "name": "TikTok",
            "icon": "♪",
            "url": "https://www.tiktok.com/@your-profile-name",
            "isExample": true
        }
    ],
    "branches": [
        {
            "name": "Caloocan – Zapote",
            "address": "Zapote, Caloocan City, Metro Manila, Philippines",
            "phone": "+63 007 010 0016",
            "phoneIsExample": false,
            "hours": "Daily, 8:00 AM–7:00 PM",
            "map": "https://www.google.com/maps/search/?api=1&query=Zapote%2C+Caloocan+City%2C+Metro+Manila"
        },
        {
            "name": "Sto. Domingo – Cainta, Rizal",
            "address": "Sto. Domingo, Cainta, Rizal, Philippines",
            "phone": "+63 007 002 0022",
            "phoneIsExample": false,
            "hours": "Daily, 8:00 AM–7:00 PM",
            "map": "https://www.google.com/maps/search/?api=1&query=Sto.+Domingo%2C+Cainta%2C+Rizal"
        },
        {
            "name": "Sta. Mesa, Manila",
            "address": "Sta. Mesa, Manila, Philippines",
            "phone": "+63 009 014 2026",
            "phoneIsExample": false,
            "hours": "Daily, 8:00 AM–7:00 PM",
            "map": "https://www.google.com/maps/search/?api=1&query=Polytechnic+University+of+the+Philippines%2C+Sta.+Mesa%2C+Manila"
        }
    ]
};
