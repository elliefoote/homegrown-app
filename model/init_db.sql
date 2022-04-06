DROP TABLE IF EXISTS Cart;
DROP TABLE IF EXISTS OrderItems;
DROP TABLE IF EXISTS Orders;
DROP TABLE IF EXISTS Products;
DROP TABLE IF EXISTS Sellers;
DROP TABLE IF EXISTS Users;

CREATE TABLE `Users` (
	`userid` INT NOT NULL AUTO_INCREMENT,
	`username` varchar(10) NOT NULL UNIQUE,
	`password` varchar(255) NOT NULL,
	`email` varchar(255) NOT NULL UNIQUE,
	PRIMARY KEY (`userid`)
);

INSERT INTO `Users` VALUES 
    (1,'user1','$2b$12$eFzMWbS9SogNtxkmo3J7aO8FQMFQSKbtpwLMIOVsF6GGKpTQdgq.W','user1@example.com'),
    (2,'user2','$2b$12$WZcGPyrkCvD5e8m0Qz/nFOdBryUcsp6uDlE2MDo/AjuBhPrQBCfI6','user2@example.com'),
    (3,'user3','$2b$12$tiAz4eaXlpU.CdltUVvw6udLA2BWsitk5zXM2XOm2IpAeAiFfMCdy','user3@example.com');

CREATE TABLE `Sellers` (
	`sellerid` INT NOT NULL AUTO_INCREMENT,
	`username` varchar(10) NOT NULL UNIQUE,
	`password` varchar(255) NOT NULL,
	`email` varchar(255) NOT NULL UNIQUE,
	`picurl` varchar(255),
	`coverurl` varchar(255),
	`shopname` varchar(100),
	`description` text,
	PRIMARY KEY (`sellerid`)
);
-- NOTE: New sellers need encrypted passwords!
INSERT INTO `Sellers` VALUES 
    (1,'seller1','$2b$12$eFzMWbS9SogNtxkmo3J7aO8FQMFQSKbtpwLMIOVsF6GGKpTQdgq.W','seller1@example.com', 'seller_1_profile.jpg', 'seller_1_cover.jpg', 'Gracia Wooden Goods', 'Welcome to Gracia Wooden Goods. All pieces are crafted with the utmost care in Gracia.' ),
    (2,'seller2','$2b$12$WZcGPyrkCvD5e8m0Qz/nFOdBryUcsp6uDlE2MDo/AjuBhPrQBCfI6','seller2@example.com', 'seller_2_profile.jpg', 'seller_2_cover.jpg', 'Plants and Paper Co.', 'Shop our products that bring together the plant and intricaate papercraft worlds. All of our packaging is bio-degradable.'),
    (3,'seller3','$2b$12$tiAz4eaXlpU.CdltUVvw6udLA2BWsitk5zXM2XOm2IpAeAiFfMCdy','seller3@example.com', 'seller_3_profile.jpg', 'seller_3_cover.jpg', 'Tuft Queen', 'After graduating from Falmouth University with a degree in Textiles in 2019, Tuft Queen was born. I specialise in hand-tufted cushions and crochet goods of the highest quality.'),
	(4,'seller4','$2b$12$LJpHMh4/rP4HskaBxdbBUetY8kjTq5gR/FsIUAro.VoleThcXGemu','seller4@example.com', 'seller_4_profile.jpg', 'seller_4_cover.jpg', 'Soy & Ceramics BCN', 'Nothing beats the coziness of a natural soy candle or that first sip of coffee in the morning. Shop all of the sustainable home comforts at Soy & Ceramics BCN'),
	(5,'seller5','$2b$12$7lseatmkQ/jkxdX33yq0KeT5Z/C4OwYZj2LyNjFGb80Hqz971ha3O','seller5@example.com', 'seller_5_profile.jpg', 'seller_5_cover.jpg', 'Scandi Emporium', 'Add some vibrancy to your living space with our funky scandi-inspired glass homewares. Our products come in a multitude of sizes, shapes and colours. All packed with love and care x'),
	(6,'seller6','$2b$12$7oekZzEeHgA7WDzZGk08I.K9USbsUhRfsaGI6.UV4VXqF3wrJVoZC','seller6@example.com', 'seller_6_profile.jpg', 'seller_6_cover.jpg', 'Emerald Wonder', 'Handmade necklaces made in Barcelona. Classy, elegant, and stylish.'),
	(7,'seller7','$2b$12$CkCfsA0r4Z4DxFektkDbO.NGb/4aCJDtrQtMpWOgpiB.npivipuyW','seller7@example.com', 'seller_7_profile.jpg', 'seller_7_cover.jpg', 'Mia Makes', 'Hi, welcome to Mia Makes. I make bold and playful earrings from my home studio in Barcelona. New designs every month!'),
	(8,'seller8','$2b$12$XClWpbvFzaWfL3dbfU/r8OS8Y87KjAb6dndpMMakCXy5FZo.YkcHG','seller8@example.com', 'seller_8_profile.jpg', 'seller_8_cover.jpg', 'Love & Leather', 'Quality handcrafted leather accessories to smarten up your everyday belongings.'),
	(9,'seller9','$2b$12$agxVVfQgU9fmmwF34UyPi.qDe5/kuFFMMUZnYKrMtxoVj7fWHaZK.','seller9@example.com', 'seller_9_profile.jpg', 'seller_9_cover.jpg', 'Boho in Barcelona', 'Boho in Barcelona specialises in handmade Coral and Turquoise jewellry. Why not add a new piece to your collection?'),
	(10,'seller10','$2b$12$41nStWBSUMvXSLMMUDTq.uhF8PSHWquUfa7X6DOhyYhE9AncY3b1y','seller10@example.com', 'seller_10_profile.jpg', 'seller_10_cover.jpg', 'Sunny Outlooks', 'If you are looking for expertly-crafted polymer jewellry and accessories, look no further!'),
	(11,'seller11','$2b$12$C7tuqJDqQdw5xAUxLp3pFOma0fejC0F3Cv7Jejr2hE4IIIr76U5ru','seller11@example.com', 'seller_11_profile.jpg', 'seller_11_cover.jpg', 'Totes Amazing', 'We sell the best bags in Barcelona! Made from quality second-hand fabric. Guilt-free and stylish.'),
	(12,'seller12','$2b$12$kHjMJvcNN3FhghBD.hHg2.777z2k5TZ8iK8hYBXErPUOpRFWMOtx.','seller12@example.com', 'seller_12_profile.jpg', 'seller_12_cover.jpg', 'Andy Prints', 'Welcome to my shop. I started creating impression prints to document my travels. Now I work from my Barcelona studio, creating art based on the surrounding beauty of the area.'),
	(13,'seller13','$2b$12$GvqvJueflBoXzsdhJ9wrBOFqy29Ky4cu4q.Es9BmQ35sDJTrvqIYa','seller13@example.com', 'seller_13_profile.jpg', 'seller_13_cover.jpg', 'Studio Bright', 'Find the perfect piece of art for your home at Studio Bright. We are a husband and wife team putting a hyper-colorful spin on the beautiful Barcelona.');

CREATE TABLE `Cart` (
	`userid` INT NOT NULL,
	`productid` INT NOT NULL,
	`price` INT NOT NULL,
    `quantity` INT NOT NULL,
	`subtotal` INT,
	`orderid` INT,
	PRIMARY KEY (`userid`, `productid`),
    FOREIGN KEY (userid) REFERENCES `Users`(userid)
);

CREATE TABLE `Products` (
	`productid` INT NOT NULL AUTO_INCREMENT,
	`name` varchar(255) NOT NULL,
	`description` varchar(500) NOT NULL,
    `imgurl` varchar(255) NOT NULL,
	`category` varchar(255) NOT NULL,
	`price` INT NOT NULL,
	`listedby` INT NOT NULL,
	`stripe_prodid` varchar(255),
	`stripe_priceid` varchar(255),
	PRIMARY KEY (`productid`)
);

CREATE TABLE `Orders` (
	`orderid` INT NOT NULL AUTO_INCREMENT,
	`userid` INT NOT NULL,
	`orderemail` varchar(255),
	`ordername` varchar(255),
	`orderaddress` varchar(255),
	`orderdate` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
	`ordertotal` INT,
	PRIMARY KEY (`orderid`)
);

CREATE TABLE `OrderItems` (
	`itemid` INT NOT NULL AUTO_INCREMENT,
	`orderid` INT NOT NULL,
	`orderprice` INT NOT NULL,
	`orderquantity` INT NOT NULL,
	`productid` INT NOT NULL,
	`subtotal` INT,
	PRIMARY KEY (`itemid`)
);

-- NOTE TO KEZI: I changed the prices into cents, so we can have prices that aren't round amounts, like €12.95 or whatever. They are stored in the DB in cents, then divided by 100 on the front end so they display correctly.

INSERT INTO `Products` VALUES 
-- Homewares 
    (1,'Wooden vase','Handcrafted wall décor/propagation stations made with Australian reclaimed timber and glass test tubes! An original piece to complete your home décor displaying any plant from fresh to dry , you can display one as a statement piece or add different models and finish for a wall feature.','https://i.etsystatic.com/12397853/c/2171/1725/0/1094/il/505fa0/2426681051/il_500x500.2426681051_mocv.jpg', 'Homewares', 2000, 1, 'prod_LIiHCjlNIGlrKG', 'price_1Kc6qeKmdPIQ5CnWjgBaHCAt'),
    (2,'Paper plants','This is a set of four mini handmade paper plants. They are designed to brighten any spot in your home. Each leaf is printed, cut out by hand, and positioned in a 1.5" terracotta pot. The soil is not loose, so do not worry about your new plants making a mess. Although each leaf is treated with a clear coating, please do not get the plant wet (we know it might be hard). Wipe with a dry cloth to dust them if needed.','https://i.etsystatic.com/29669210/r/il/48a8a1/3619807266/il_1588xN.3619807266_4hg4.jpg', 'Homewares', 1000, 2, 'prod_LJqiKsHIwWEMqC', 'price_1KdDGuKmdPIQ5CnWe266Htsd'),
	(3,'Hand tufted cushion','100% handmade, durable, comfortable and adds a splash of color in your home. Each pillowcase is handmade using the punched needle technique. Cotton envelope back and zipper closure. Embroidered with organic cotton thread and linen canvas backing.','https://i.etsystatic.com/26021575/r/il/89fb96/3195528881/il_1588xN.3195528881_tc4t.jpg', 'Homewares', 6000, 3, 'prod_LLhUdyyTUJ1q12', 'price_1Kf05aKmdPIQ5CnWvDNVgqOp'),
	(4,'Soy wax candles','Our soy wax candles are infused with organic ingredients including shea butter, coconut oil, jojoba, and cocoa butter! All candles are 13 ounces (375g) and made with 100% soy wax, wood wicks, and premium essential oils that are ethically sourced.','https://i.etsystatic.com/29637539/r/il/0b7500/3283471533/il_1588xN.3283471533_ss8g.jpg', 'Homewares', 2500, 4, 'prod_LLhsu9eqVgWvfM', 'price_1Kf0SKKmdPIQ5CnWqTrlciAH'),
	(5,'Decorative Candles','Made with 100% soy wax and hand poured in Barcelona. 11cm height. A soft and pleasant aroma to fill your home. Our candles have a very slow combustion time, so you can use time and time again. Trim the wick each time before lighting.','https://i.etsystatic.com/27588369/r/il/f40a10/3335179827/il_1588xN.3335179827_h5is.jpg', 'Homewares', 900, 4, 'prod_LLhz62CESciGMF', 'price_1Kf0ZlKmdPIQ5CnWGOOw8byH'),
	(6,'Ceramic mug','Handcrafted on a wheel with white stoneware, fired at high temperature and decorated with colored pigments under glossy enamel. Each piece is made by hand individually, so no two are the same. Dishwasher and microwave safe.','https://i.etsystatic.com/22488933/r/il/70dafd/3695573399/il_1588xN.3695573399_pbm3.jpg', 'Homewares', 1000, 4, 'prod_LLiDEzk97CYIhI', 'price_1Kf0nXKmdPIQ5CnWEf6rls6i'),
	(7,'Ceramic travel mug','These travel mugs are a solid step towards a less wasteful lifestyle. Created on the potters wheel and hand molded from beautiful speckled stoneware clay and glazed with a clear glaze. Enamelled inside and out. Hand wash only. 10.5cm x Ø 8.5cm.','https://i.etsystatic.com/26179465/r/il/df52f3/3560463487/il_1588xN.3560463487_jb4d.jpg', 'Homewares', 4000, 4, 'prod_LLiMTkcsKObcBo', 'price_1Kf0vSKmdPIQ5CnWtYQQpyQP'),
	(8,'Colorful Scandi style vases','These flower vases are so beautifully sculptural and pretty that they would certainly brighten up any room. Inspired by vintage art nouveau housewares. Use as a sculptural piece, flower stand, incense holder, or candle holder!','https://i.etsystatic.com/26042245/r/il/c2f858/3489338565/il_1588xN.3489338565_axdu.jpg', 'Homewares', 3000, 5, 'prod_LLiYnNUd5of9I1', 'price_1Kf17YKmdPIQ5CnWdhZqRUiP'),
	(9,'Groovy candle holder','So stunning and elegant, these beautiful orange glass candle holders come in many beautiful designs and styles. Place a few together to create an eclectic mismatched feel or use them alone to hold a statement candle. Very chic.','https://i.etsystatic.com/26042245/r/il/9e2c8e/3046537405/il_1588xN.3046537405_fbbz.jpg', 'Homewares', 3000, 5, 'prod_LLic92gdeO08Pt', 'price_1Kf1BVKmdPIQ5CnWlxCdM7MH'),
	(10,'Wood desk lamp','Handcrafted from sustainable agave wood sourced from Spain, this unique Edison Bulb desk lamp casts a warm glow and adds organic beauty to your carefully curated space. A perfect addition to your bedroom, living room, entryway, or home office.','https://i.etsystatic.com/14540775/r/il/682062/1898908238/il_1588xN.1898908238_4jm1.jpg', 'Homewares', 4900, 1, 'prod_LLikapFXfVuJR0', 'price_1Kf1JNKmdPIQ5CnW8RuFwhFu'),
-- Jewellry
    (11,'Minimalist emerald necklace','This is a gorgeous necklace with a fancy Swarovski pendant. This necklace is made for you by hand in house with 925 sterling silver, plated with 14k gold. We also have an option of the 925 sterling silver chain. We believe in quality, so only the highest quality materials are used to make your personalized necklace. Completely hypoallergenic & filled with love.','https://i.etsystatic.com/20105212/r/il/99e7ee/3700655518/il_1588xN.3700655518_tpti.jpg', 'Jewellry', 4000, 6, 'prod_LIiPvgNwlhQNhI', 'price_1Kdz9RKmdPIQ5CnWml9q5cz5'),
	(12,'Watermelon earrings','Colorful watermelon earrings. All my products are handmade with love and care. I will ship this item beautifully packaged, ready for gift giving.','https://i.etsystatic.com/18518759/r/il/c322f3/3189368898/il_1588xN.3189368898_65q7.jpg', 'Jewellry', 1200, 7, 'prod_LLj5rHhYRQzFiH', 'price_1Kf1dWKmdPIQ5CnWHwyC4eYM'),
	(13,'Greek inspired dangle earrings','Greek earrings, inspired by the Greek island Santorini, made entirely by hand, blue and banks with details in gold. All my products are handmade with love and care. I will ship this item beautifully packaged, ready for gift giving.','https://i.etsystatic.com/18518759/r/il/369e51/2587550394/il_1588xN.2587550394_810v.jpg', 'Jewellry', 1500, 7, 'prod_LLj9k94xJP4iB8', 'price_1Kf1hHKmdPIQ5CnWvb9Bgn1V'),
	(14,'Leather key holder','Our keychains are handmade from soft, colored leather. Choose from a selection of 14 beautiful colors with either personalised engraving or plain. Dimensions: 10 cm x 3 cm (3.94" x 1.18")','https://i.etsystatic.com/32676577/r/il/7d4309/3562275027/il_1588xN.3562275027_qhe3.jpg', 'Jewellry', 1600, 8, 'prod_LLjG1zWiW1CoT3', 'price_1Kf1noKmdPIQ5CnWCa6s0YZh'),
	(15,'Leather pen pouch','The leather pen pouch is a beautiful gift for writers. Available in a selection of 14 beautiful colors. Custom engraving on request. The dimensions of this pen case are: 15.5 x 5.3 cm (6.10" x 2.10")','https://i.etsystatic.com/32676577/r/il/c0b40d/3494140697/il_1588xN.3494140697_39lx.jpg', 'Jewellry', 2400, 8, 'prod_LLjKVbJds0Ttuv', 'price_1Kf1sEKmdPIQ5CnWt2vOk95l'),
	(16,'Turquoise gold hoops','Huggie hoops. Gold plated 18 kts 925 Sterling Silver with natural blue zirconia gemstones. Made with love.','https://i.etsystatic.com/12190216/r/il/b62378/3443397880/il_1588xN.3443397880_tl0t.jpg', 'Jewellry', 1800, 9, 'prod_LLjWjBEgkEIbxi', 'price_1Kf23WKmdPIQ5CnWGq35msAJ'),
	(17,'Gold coral ring','Natural coral stone gold plated 18k 925 sterling silver ring for stacking with other rings. Very tiny and versatile to wear with any stack combinations. Made with love.','https://i.etsystatic.com/12190216/r/il/880755/2436465232/il_1588xN.2436465232_xp1t.jpg', 'Jewellry', 2400, 9, 'prod_LLjaFDO3fz0l6H', 'price_1Kf26tKmdPIQ5CnWzqHfsPFQ'),
	(18,'Polymer hair clip','All my accessories are handmade, with great care and love. Made with polymer clay, the designs are original and exclusive, perfect for any occasion.','https://i.etsystatic.com/23782893/r/il/a337a3/2722908920/il_1588xN.2722908920_nffa.jpg', 'Jewellry', 1000, 10, 'prod_LLje3JbJDjil76', 'price_1Kf2AkKmdPIQ5CnWpJhOhomh'),
	(19,'Polymer clay earrings','All my accessories are handmade, with great care and love. Made with polymer clay, the designs are original and exclusive, perfect for any occasion.','https://i.etsystatic.com/23782893/r/il/0e3d2f/2445360872/il_1588xN.2445360872_jskl.jpg', 'Jewellry', 1100, 10, 'prod_LLjiNXvjqrzMIN', 'price_1Kf2F7KmdPIQ5CnWBzh1svQp'),
	(20,'Daisy polymer earrings','All my accessories are handmade, with great care and love. Made with polymer clay, the designs are original and exclusive, perfect for any occasion.','https://i.etsystatic.com/23782893/r/il/a849cb/2960308552/il_1588xN.2960308552_qax2.jpg', 'Jewellry', 1400, 10, 'prod_LLjlQhYWobWfSP', 'price_1Kf2HhKmdPIQ5CnWvO2hnhTJ'),
-- Clothing & Accessories
	(21,'Crochet square top','100% wool yarn. Very fresh and soft, ideal for spring and summer. Each item is made to order. The top is available in sizes XS, S, M, L and XL.','https://i.etsystatic.com/33982390/r/il/21178b/3624591132/il_1588xN.3624591132_8lmg.jpg', 'Clothing & Accessories', 2600, 3, 'prod_LLk1sUeJL5sTHT', 'price_1Kf2XHKmdPIQ5CnWpoMM91Jg'),
	(22,'Crochet halter top','100% wool yarn. Very fresh and soft, ideal for spring and summer. Each item is made to order. The top is available in sizes XS, S, M, L and XL.','https://i.etsystatic.com/27583426/r/il/dc696d/2950897682/il_1588xN.2950897682_71zb.jpg', 'Clothing & Accessories', 2700, 3, 'prod_LLk5SUxRSRqqo4', 'price_1Kf2auKmdPIQ5CnWyNIw5NIx'),
	(23,'Bucket hat','Super warm hat for winter. It is made according to the standard hat size, but since it is crocheted it is flexible so it can fit perfectly. Each item is made to order.','https://i.etsystatic.com/27583426/r/il/ac130f/3469930367/il_1588xN.3469930367_pj8e.jpg', 'Clothing & Accessories', 2000, 3, 'prod_LLk7LheprSfjgc', 'price_1Kf2dFKmdPIQ5CnWTkCeiCPx'),
	(24,'Sailor beanie','Material: 100% untreated virgin wool. This means that the wool retains all its original properties, since it has not been subjected to any chemical treatment before dyeing. Each item is made to order.','https://hayhaycrochet.com/wp-content/uploads/2021/12/IMG_0098_jpg.jpg', 'Clothing & Accessories', 2900, 3, 'prod_LLkD80GPzcaZmR', 'price_1Kf2jNKmdPIQ5CnWGDsI06Ja'),
	(25,'Flower tote bag','Beautiful and elegant hand-painted canvas tote bag. An ideal shopping bag. Very comfortable because of its long handles. 38 cm x 41 cm (14.96” x 16.14”). The tote bags hold approximately 22.05 lbs (10 kg).','https://i.etsystatic.com/21162700/r/il/47a657/3082993889/il_1588xN.3082993889_o77f.jpg', 'Clothing & Accessories', 1500, 11, 'prod_LLkIQISxZArVnp', 'price_1Kf2o2KmdPIQ5CnW1BjSHyWp'),
	(26,'Corduroy Bag','Large corduroy bag, ideal for college or an urban outfit. Fits a laptop, books and water bottle. Measurements: 37 cm high x 38cm wide x 22cm gusset.','https://i.etsystatic.com/21672421/r/il/33188e/2524606996/il_1588xN.2524606996_o7wb.jpg', 'Clothing & Accessories', 3200, 11, 'prod_LLkM12yAsI7Odd', 'price_1Kf2rZKmdPIQ5CnWXffC2Nre'),
-- Art
	(27,'Plant Lady Print 1','A3 art print. Printed on high quality 300gsm matte textured paper with vibrant colors using professional fade resistant inks. Shipped with love and care.','https://i.etsystatic.com/15441369/r/il/bfe80a/2964252227/il_1588xN.2964252227_2pec.jpg', 'Art', 4000, 2, 'prod_LLkM12yAsI7Odd', 'price_1Kf2rZKmdPIQ5CnWXffC2Nre'),
	(28,'Plant Lady Print 2','A3 art print. Printed on high quality 300gsm matte textured paper with vibrant colors using professional fade resistant inks. Shipped with love and care.','https://i.etsystatic.com/15441369/r/il/e4e223/3475786541/il_1588xN.3475786541_heaf.jpg', 'Art', 4000, 2, 'prod_LLkWLyysRDHcdQ', 'price_1Kf31dKmdPIQ5CnWEu27aREJ'),
	(29,'Plant Lady Print 3','A3 art print. Printed on high quality 300gsm matte textured paper with vibrant colors using professional fade resistant inks. Shipped with love and care.','https://i.etsystatic.com/15441369/r/il/e4684c/2683845128/il_1588xN.2683845128_iwaa.jpg', 'Art', 4000, 2, 'prod_LLkYbX1t2PeT8r', 'price_1Kf33MKmdPIQ5CnWD8jhPj7j'),
	(30,'Tree Rings Print','Original impression of a Barcelona tree. Materials: cedar wood, raised ink, acid free paper. Height: 24 inches. Width: 18 inches.','https://i.etsystatic.com/8052643/r/il/cffed8/1757122331/il_1588xN.1757122331_gdpt.jpg', 'Art', 1900, 12, 'prod_LLkcG1qsRbg2a6', 'price_1Kf36yKmdPIQ5CnWq1y3oBu8'),
	(31,'Barcelona art print','"Rooftops of Barcelona". I was walking on a sunny day towards Guinardo park and took many photos of the beautiful views once I reached the top. A3+ 33x48cm or 13"x19"','https://i.etsystatic.com/16423569/r/il/ea2659/1398750579/il_1588xN.1398750579_7r3w.jpg', 'Art', 2500, 13, 'prod_LLkf9nf8RfNjea', 'price_1Kf3AbKmdPIQ5CnWO3kYgRRL');

ALTER TABLE `Cart` ADD CONSTRAINT `Cart_fk0` FOREIGN KEY (`userid`) REFERENCES `Users`(`userid`);

ALTER TABLE `Cart` ADD CONSTRAINT `Cart_fk1` FOREIGN KEY (`productid`) REFERENCES `Products`(`productid`);

ALTER TABLE `Products` ADD CONSTRAINT `Products_fk0` FOREIGN KEY (`listedby`) REFERENCES `Sellers`(`sellerid`);

ALTER TABLE `Orders` ADD CONSTRAINT `Orders_fk0` FOREIGN KEY (`userid`) REFERENCES `Users`(`userid`);

ALTER TABLE `OrderItems` ADD CONSTRAINT `OrderItems_fk0` FOREIGN KEY (`orderid`) REFERENCES `Orders`(`orderid`);

ALTER TABLE `OrderItems` ADD CONSTRAINT `OrderItems_fk1` FOREIGN KEY (`productid`) REFERENCES `Products`(`productid`);
