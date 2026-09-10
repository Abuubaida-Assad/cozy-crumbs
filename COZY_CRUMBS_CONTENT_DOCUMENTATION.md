# COZY CRUMBS — COMPLETE WEBSITE & ADMIN PORTAL CONTENT SPECIFICATION

**Document Version:** 1.0.0  
**Project:** Cozy Crumbs Artisanal Bakery Web Application  
**Primary Contact:** cozycrumbs6767@gmail.com | +91 7098322796  
**Address:** Gachibowli TNGOS Colony, Hyderabad, Telangana  

---

## TABLE OF CONTENTS
1. [Executive Summary & Brand Identity](#1-executive-summary--brand-identity)
2. [Global Navigation & Header](#2-global-navigation--header)
3. [Homepage Content](#3-homepage-content)
4. [Menu Catalog & Complete Product Database](#4-menu-catalog--complete-product-database)
5. [Interactive Modals & Drawers](#5-interactive-modals--drawers)
6. [Contact Page & Physical Outlets](#6-contact-page--physical-outlets)
7. [About Us, Heritage & Bakery Values](#7-about-us-heritage--bakery-values)
8. [Bakery Journal & Blog Articles](#8-bakery-journal--blog-articles)
9. [Careers & Employment Opportunities](#9-careers--employment-opportunities)
10. [Global Footer](#10-global-footer)
11. [404 Error Page](#11-404-error-page)
12. [Admin Portal & Management Dashboard](#12-admin-portal--management-dashboard)
13. [Database Models & Technical Specifications](#13-database-models--technical-specifications)

---

## 1. EXECUTIVE SUMMARY & BRAND IDENTITY

### 1.1 Brand Mission & Vision
**Cozy Crumbs** is an artisanal European-Indian bakery established to bring warmth, real ingredients, and culinary craftsmanship back to daily celebrations. Unlike commercial bakeries reliant on premixes and artificial stabilizers, Cozy Crumbs adheres to slow fermentation, real churned butter, unbleached flours, and dawn-baked freshness.

### 1.2 Core Brand Statements
- **Tagline:** *Baking Joy, Creating Sweet Memories.*
- **Sub-tagline:** *Artisanal Bakery Handcrafted Daily.*
- **Philosophy Quote:** *"From a small kitchen to a place where every celebration gets a little sweeter."*
- **Primary Bakery Promise:** Handcrafted cakes, warm artisanal breads & flaky golden pastries, baked fresh every morning.

### 1.3 Brand Color System
- **Cocoa Primary (Dark Roast):** `#24130D` / `#3A2923` (Main text, dark backgrounds, buttons, and footers)
- **Warm Bronze Accent:** `#8C735A` / `#B09A7C` / `#6F5746` (Subheadings, highlights, accents)
- **Cream / Pastel Linen:** `#FCFAF7` / `#F7F4EE` / `#E8DED1` (Page backgrounds, cards, section dividers)
- **Status Green (Veg / Active):** `#15803D` / `#DCFCE7`
- **Status Red (Non-Veg / Destructive):** `#B91C1C` / `#FEE2E2`

### 1.4 Typography
- **Display Headings:** Playfair Display (Serif, Elegant, Editorial)
- **Body & UI Elements:** Inter / Modern Sans-Serif (Clean, legible, tracking-spaced uppercase for labels)

---

## 2. GLOBAL NAVIGATION & HEADER

The global navbar is fixed at the top with adaptive blur and scroll detection (transparent/light on initial load, frosted linen `#FCFAF7/95` with soft drop shadow upon scrolling).

### 2.1 Brand Logo
- **Display Name:** `COZY CRUMBS` (Playfair Display, italic, black weight, `#3A2923`)
- **Subtitle Pill:** `ARTISANAL BAKERY` (uppercase tracking, bordered divider)
- **Link Target:** `/` (Home)

### 2.2 Desktop Navigation Links
1. **HOME** (`/`) — Landing page with scroll cake animation, collection highlights, and reviews.
2. **MENU** (`/menu`) — Full bakery catalog with category filtering, dietary tags, and search.
3. **CONTACT** (`/contact`) — Direct inquiry form, phone numbers, and bakery location details.

### 2.3 Desktop Action Button
- **Label:** `ADMIN DASHBOARD`
- **Icon:** Shield Check (`lucide-react`)
- **Target:** `/admin/login` (Admin Authentication Portal)
- **Style:** Pill badge, border `#3A2923/25`, hover state inverts to solid cocoa `#3A2923` with white text.

### 2.4 Mobile Navigation Drawer
- **Trigger:** 3-dot circular toggle button (`MoreVertical` / `X` icon).
- **Backdrop:** Dimmed cocoa blur (`#24130D/40`).
- **Items:** Full-width pill buttons for `HOME`, `MENU`, `CONTACT`, plus dedicated full-width `ADMIN DASHBOARD` button.

---

## 3. HOMEPAGE CONTENT

### 3.1 Hero Section
- **Pre-title / Tag:** `SIGNATURE CAKES` • `Freshly baked daily`
- **H1 Main Headline:**
  > Baking Joy,  
  > Creating  
  > Sweet Memories.
- **Subtitle:**  
  *Handcrafted cakes, warm artisanal breads & flaky golden pastries, baked fresh every morning.*
- **Primary Call to Action:**  
  `[EXPLORE MENU ->]` (Redirects to `/menu`)
- **Interactive Visual Animation:**
  - **Desktop/Laptop (>= 1024px):** 96-frame high-performance canvas sequence of a signature chocolate celebration cake smoothly rotating and slicing. Scroll-linked over ~1.8 viewport heights seamlessly bridging the hero section into the brand highlights.
  - **Tablet Fallback (768px - 1023px):** Static high-resolution artisanal bakery hero photo.
  - **Mobile Card (< 768px):** High-definition signature cake showcase with frosted badge tags.

### 3.2 Brand Statement Bar (3-Column Value Strip)
1. **Freshly Baked** — *Every Single Day* (Sparkles Icon)
2. **Made With Care** — *Pure Artisanal Craft* (Heart Icon)
3. **Original Recipes** — *Premium Quality Ingredients* (Flame Icon)

### 3.3 "Our Collection" Showcase
- **Heading:** `EXPLORE OUR BAKES`
- **Subheading:** *Handcrafted Daily with Love*
- **Description:** From decadent multi-layered celebration cakes to warm morning sourdough loaves and savoury tea-time pastries.
- **Visual Category Cards:**
  - **Cakes:** Celebration cakes, rich creams & decadent toppings.
  - **Pastries:** Single-serve delicate sponge slices & fruit glazes.
  - **Breads:** Wholesome loaves with crispy crusts and tender crumb.
  - **Brownies & Tea-Time:** Traditional bakery biscuits, crispy rusks, flaky khari.
  - **Puffs:** Golden multi-layered savoury puffs with aromatic Indian fillings.
  - **Protein Shakes:** Rich, velvety chilled shakes for balanced energy.

### 3.4 Custom Celebrations Section
- **Category Pill:** `CUSTOM CELEBRATIONS`
- **H2 Headline:**  
  *"Make every celebration a little sweeter with a cake made just for you."*
- **Narrative Copy:**  
  *Whether it is an intimate birthday, a grand wedding, or a corporate gathering, our master bakers handcraft bespoke celebration cakes and dessert spreads tailored to your flavor and design wishes.*
- **Action Button:** `[TALK TO US ->]` (Links to `/contact`)
- **Featured Visual:** Showcase of the custom order *Rahul Black Forest Celebration Cake* with chocolate curls and maraschino cherries.

### 3.5 Customer Testimonials ("Loved By Our Patrons")
- **Heading:** `TESTIMONIALS`
- **Title:** *Loved By Our Patrons*
- **Review 1 (Celebration Cakes):**
  - **Rating:** 5 / 5 Stars
  - **Quote:** *"The chocolate cake was soft, fresh and perfectly balanced. The richness of the ganache made our celebration truly special."*
  - **Author:** — Customer Review
- **Review 2 (Artisanal Breads):**
  - **Rating:** 5 / 5 Stars
  - **Quote:** *"The sourdough bread was incredibly fresh and soft with an authentic golden crust. Best morning loaf we have ever tasted."*
  - **Author:** — Customer Review
- **Review 3 (Handmade Biscuits):**
  - **Rating:** 5 / 5 Stars
  - **Quote:** *"The Osmania butter biscuits were crisp and delicious. The melt-in-the-mouth texture with evening tea is simply unmatched."*
  - **Author:** — Customer Review

---

## 4. MENU CATALOG & COMPLETE PRODUCT DATABASE

The Cozy Crumbs catalog features **6 Core Categories** and **31 Specialized Products**. All items are baked in-house. Prices are dynamically served or marked with the official bakery badge: *"Price available in store"*.

### 4.1 Category Summary
| # | Category Name | Slug | Icon | Description | Total Items |
|---|---------------|------|------|-------------|-------------|
| 1 | Cakes | `cakes` | Cake | Artisanal celebration cakes, freshly baked with rich cream & delicate sponge | 8 Products |
| 2 | Pastries | `pastries` | IceCream | Single-serve bakery slices with silky fresh cream and fruit glazes | 8 Products |
| 3 | Breads | `breads` | Croissant | Daily artisanal loaves with soft crumb, crisp crust, and natural yeast | 4 Products |
| 4 | Brownies | `brownies` | Cookie | Classic Indian bakery tea-time favourites, crispy rusks, butter biscuits | 6 Products |
| 5 | Puffs | `puffs` | Flame | Golden, flaky multi-layered savoury puffs with aromatic Indian fillings | 3 Products |
| 6 | Protein Shakes | `protein-shakes` | Coffee | Smooth, creamy chilled protein shakes crafted for daily nourishment | 2 Products |

---

### 4.2 Complete Product Details (All 31 Products)

#### CATEGORY 1: CAKES (8 Products)

1. **Chocolate Cake**
   - **Category:** Cakes (`cakes`)
   - **Price:** Price available in store (`price: 0`)
   - **Weight / Size:** 500g / 1kg
   - **Dietary:** 100% Pure Veg | Eggless | Signature Featured
   - **Description:** Rich and moist chocolate cake layered with smooth cream and finished with a delicious chocolate topping. A classic choice for birthdays and celebrations.
   - **Key Ingredients:** Flour, Cocoa Powder, Dairy Cream, Sugar, Dark Chocolate Ganache.
   - **Nutritional Info:** 340 kcal/slice | 6-8 Servings | Shelf Life: 3 Days Refrigerated.

2. **Vanilla Cake**
   - **Category:** Cakes (`cakes`)
   - **Price:** Price available in store (`price: 0`)
   - **Weight / Size:** 500g / 1kg
   - **Dietary:** 100% Pure Veg | Eggless
   - **Description:** Soft and fluffy vanilla sponge layered with creamy frosting and a delicate vanilla flavour. A simple and timeless favourite.
   - **Key Ingredients:** Flour, Pure Vanilla Extract, Fresh Whipped Cream, Butter, Sugar.
   - **Nutritional Info:** 290 kcal/slice | 6-8 Servings | Shelf Life: 3 Days Refrigerated.

3. **Butterscotch Cake**
   - **Category:** Cakes (`cakes`)
   - **Price:** Price available in store (`price: 0`)
   - **Weight / Size:** 500g / 1kg
   - **Dietary:** 100% Pure Veg | Eggless | Signature Featured
   - **Description:** Soft vanilla sponge layered with creamy butterscotch frosting and crunchy caramel bits for a rich Indian bakery-style treat.
   - **Key Ingredients:** Flour, Butterscotch Essence, Caramel Praline, Whipped Cream, Sugar.
   - **Nutritional Info:** 320 kcal/slice | 6-8 Servings | Shelf Life: 3 Days Refrigerated.

4. **Pineapple Cake**
   - **Category:** Cakes (`cakes`)
   - **Price:** Price available in store (`price: 0`)
   - **Weight / Size:** 500g / 1kg
   - **Dietary:** 100% Pure Veg | Eggless | Signature Featured
   - **Description:** Light and fluffy pineapple cake layered with smooth cream and juicy pineapple pieces for a refreshing fruity taste.
   - **Key Ingredients:** Flour, Pineapple Crushed Chunks, Fresh Cream, Sugar, Cherries.
   - **Nutritional Info:** 280 kcal/slice | 6-8 Servings | Shelf Life: 2 Days Refrigerated.

5. **Strawberry Cake**
   - **Category:** Cakes (`cakes`)
   - **Price:** Price available in store (`price: 0`)
   - **Weight / Size:** 500g / 1kg
   - **Dietary:** 100% Pure Veg | Eggless
   - **Description:** Soft sponge layered with creamy strawberry filling and sweet strawberry flavour, perfect for celebrations and special occasions.
   - **Key Ingredients:** Flour, Strawberry Compote, Fresh Dairy Cream, Vanilla Sponge, Sugar.
   - **Nutritional Info:** 290 kcal/slice | 6-8 Servings | Shelf Life: 2 Days Refrigerated.

6. **Mango Cake**
   - **Category:** Cakes (`cakes`)
   - **Price:** Price available in store (`price: 0`)
   - **Weight / Size:** 500g / 1kg
   - **Dietary:** 100% Pure Veg | Eggless
   - **Description:** Delicate sponge layered with creamy mango filling and a rich fruity mango flavour, bringing a delicious seasonal touch.
   - **Key Ingredients:** Flour, Alphonso Mango Pulp, Whipped Dairy Cream, Sugar, Glaze.
   - **Nutritional Info:** 300 kcal/slice | 6-8 Servings | Shelf Life: 2 Days Refrigerated.

7. **Black Forest Cake**
   - **Category:** Cakes (`cakes`)
   - **Price:** Price available in store (`price: 0`)
   - **Weight / Size:** 500g / 1kg
   - **Dietary:** 100% Pure Veg | Eggless | Signature Featured
   - **Description:** Moist chocolate sponge layered with fresh cream and cherry filling, finished with chocolate shavings for a classic bakery favourite.
   - **Key Ingredients:** Chocolate Sponge, Red Cherries, Whipped Cream, Chocolate Flakes, Sugar Syrup.
   - **Nutritional Info:** 350 kcal/slice | 6-8 Servings | Shelf Life: 3 Days Refrigerated.

8. **White Forest Cake**
   - **Category:** Cakes (`cakes`)
   - **Price:** Price available in store (`price: 0`)
   - **Weight / Size:** 500g / 1kg
   - **Dietary:** 100% Pure Veg | Eggless
   - **Description:** Soft vanilla sponge layered with smooth cream and white chocolate flavours, finished with delicate white chocolate shavings.
   - **Key Ingredients:** Vanilla Sponge, White Chocolate Shavings, Fresh Cream, Glazed Cherries, Sugar.
   - **Nutritional Info:** 330 kcal/slice | 6-8 Servings | Shelf Life: 3 Days Refrigerated.

---

#### CATEGORY 2: PASTRIES (8 Products)

9. **Chocolate Pastry**
   - **Category:** Pastries (`pastries`)
   - **Price:** Price available in store (`price: 0`)
   - **Weight / Size:** 1 Pc
   - **Dietary:** 100% Pure Veg | Eggless | Signature Featured
   - **Description:** Soft chocolate sponge layered with smooth cream and rich chocolate flavour, making it a perfect tea-time or quick sweet treat.
   - **Key Ingredients:** Chocolate Sponge, Dark Chocolate Truffle, Dairy Cream, Sugar.
   - **Nutritional Info:** 220 kcal | 1 Person | Shelf Life: 2 Days.

10. **Vanilla Pastry**
    - **Category:** Pastries (`pastries`)
    - **Price:** Price available in store (`price: 0`)
    - **Weight / Size:** 1 Pc
    - **Dietary:** 100% Pure Veg | Eggless
    - **Description:** Delicate and airy vanilla sponge layered with smooth fresh cream, a light and comforting everyday bakery slice.
    - **Key Ingredients:** Vanilla Sponge, Fresh Whipped Cream, Sugar Syrup, Vanilla Pod.
    - **Nutritional Info:** 190 kcal | 1 Person | Shelf Life: 2 Days.

11. **Butterscotch Pastry**
    - **Category:** Pastries (`pastries`)
    - **Price:** Price available in store (`price: 0`)
    - **Weight / Size:** 1 Pc
    - **Dietary:** 100% Pure Veg | Eggless | Signature Featured
    - **Description:** Golden vanilla sponge layered with butterscotch cream and sprinkled with crunchy praline bits for a classic Indian bakery flavour.
    - **Key Ingredients:** Sponge, Butterscotch Crunch, Caramel Drizzle, Whipped Cream.
    - **Nutritional Info:** 210 kcal | 1 Person | Shelf Life: 2 Days.

12. **Pineapple Pastry**
    - **Category:** Pastries (`pastries`)
    - **Price:** Price available in store (`price: 0`)
    - **Weight / Size:** 1 Pc
    - **Dietary:** 100% Pure Veg | Eggless
    - **Description:** Fluffy sponge slice filled with sweet pineapple cream and diced pineapple chunks, crowned with a bright cherry glaze.
    - **Key Ingredients:** Sponge, Pineapple Puree, Pineapple Chunks, Fresh Cream.
    - **Nutritional Info:** 185 kcal | 1 Person | Shelf Life: 2 Days.

13. **Strawberry Pastry**
    - **Category:** Pastries (`pastries`)
    - **Price:** Price available in store (`price: 0`)
    - **Weight / Size:** 1 Pc
    - **Dietary:** 100% Pure Veg | Eggless
    - **Description:** Tender sponge layered with luscious strawberry cream and fruity compote, offering a sweet and delicate indulgence.
    - **Key Ingredients:** Sponge, Strawberry Glaze, Dairy Whipped Cream, Berry Bits.
    - **Nutritional Info:** 195 kcal | 1 Person | Shelf Life: 2 Days.

14. **Mango Pastry**
    - **Category:** Pastries (`pastries`)
    - **Price:** Price available in store (`price: 0`)
    - **Weight / Size:** 1 Pc
    - **Dietary:** 100% Pure Veg | Eggless
    - **Description:** A luscious single-serve pastry slice infused with aromatic mango puree and smooth dairy cream.
    - **Key Ingredients:** Vanilla Sponge, Mango Fruit Glaze, Fresh Cream, Mango Pulp.
    - **Nutritional Info:** 200 kcal | 1 Person | Shelf Life: 2 Days.

15. **Black Forest Pastry**
    - **Category:** Pastries (`pastries`)
    - **Price:** Price available in store (`price: 0`)
    - **Weight / Size:** 1 Pc
    - **Dietary:** 100% Pure Veg | Eggless | Signature Featured
    - **Description:** Traditional German-style bakery slice with layers of dark chocolate sponge, whipped cream, and shaved chocolate.
    - **Key Ingredients:** Chocolate Sponge, Dark Chocolate Shavings, Red Cherry Filling, Whipped Cream.
    - **Nutritional Info:** 230 kcal | 1 Person | Shelf Life: 2 Days.

16. **White Forest Pastry**
    - **Category:** Pastries (`pastries`)
    - **Price:** Price available in store (`price: 0`)
    - **Weight / Size:** 1 Pc
    - **Dietary:** 100% Pure Veg | Eggless
    - **Description:** Melt-in-mouth vanilla sponge pastry layered with whipped white cream and topped with fine white chocolate flakes.
    - **Key Ingredients:** Vanilla Sponge, White Chocolate Curls, Whipped Cream, Red Cherry.
    - **Nutritional Info:** 215 kcal | 1 Person | Shelf Life: 2 Days.

---

#### CATEGORY 3: BREADS (4 Products)

17. **Regular Bread**
    - **Category:** Breads (`breads`)
    - **Price:** Price available in store (`price: 0`)
    - **Weight / Size:** 400g
    - **Dietary:** 100% Pure Veg | Eggless | Signature Featured
    - **Description:** Freshly baked soft bread with a light texture, perfect for breakfast, toast, sandwiches and everyday family meals.
    - **Key Ingredients:** Wheat Flour, Yeast, Filtered Water, Salt, A Pinch of Sugar.
    - **Nutritional Info:** 75 kcal/slice | 12-14 Slices | Shelf Life: 4-5 Days.

18. **Brown Bread**
    - **Category:** Breads (`breads`)
    - **Price:** Price available in store (`price: 0`)
    - **Weight / Size:** 400g
    - **Dietary:** 100% Pure Veg | Eggless
    - **Description:** Soft and wholesome brown bread with a pleasant texture, ideal for healthy breakfasts, sandwiches and evening snacks.
    - **Key Ingredients:** Whole Wheat Flour, Wheat Bran, Yeast, Salt, Molasses.
    - **Nutritional Info:** 70 kcal/slice | 12-14 Slices | Shelf Life: 4-5 Days.

19. **Milk Bread**
    - **Category:** Breads (`breads`)
    - **Price:** Price available in store (`price: 0`)
    - **Weight / Size:** 400g
    - **Dietary:** 100% Pure Veg | Eggless | Signature Featured
    - **Description:** Soft, fluffy and mildly sweet bread enriched with a delicate milky flavour, perfect with tea or breakfast.
    - **Key Ingredients:** Refined Flour, Whole Milk, Butter, Yeast, Sugar.
    - **Nutritional Info:** 85 kcal/slice | 12-14 Slices | Shelf Life: 4 Days.

20. **Sandwich Bread**
    - **Category:** Breads (`breads`)
    - **Price:** Price available in store (`price: 0`)
    - **Weight / Size:** 400g
    - **Dietary:** 100% Pure Veg | Eggless
    - **Description:** Freshly baked soft sliced bread with an even texture, specially suited for preparing delicious sandwiches and snacks.
    - **Key Ingredients:** Wheat Flour, Yeast, Vegetable Oil, Salt, Malt Extract.
    - **Nutritional Info:** 78 kcal/slice | 14-16 Slices | Shelf Life: 4-5 Days.

---

#### CATEGORY 4: BROWNIES & TEA-TIME SPECIALS (6 Products)

21. **Moon Biscuit**
    - **Category:** Brownies (`brownies`)
    - **Price:** Price available in store (`price: 0`)
    - **Weight / Size:** 250g
    - **Dietary:** 100% Pure Veg | Eggless | Signature Featured
    - **Description:** Crispy, buttery bakery biscuits with a delicate texture, perfect for enjoying with a hot cup of tea or coffee.
    - **Key Ingredients:** Refined Flour, Pure Butter, Sugar, Cardamom, Milk Solids.
    - **Nutritional Info:** 120 kcal/biscuit | 10-12 Biscuits | Shelf Life: 14 Days.

22. **Cream Roll**
    - **Category:** Brownies (`brownies`)
    - **Price:** Price available in store (`price: 0`)
    - **Weight / Size:** 2 Pcs
    - **Dietary:** 100% Pure Veg | Eggless | Signature Featured
    - **Description:** Golden flaky pastry rolled around a smooth sweet cream filling, a nostalgic favourite from Indian bakeries.
    - **Key Ingredients:** Laminated Pastry Dough, Vanilla Bakery Cream, Powdered Sugar.
    - **Nutritional Info:** 180 kcal/roll | 2 Rolls | Shelf Life: 3-4 Days.

23. **Cupcake**
    - **Category:** Brownies (`brownies`)
    - **Price:** Price available in store (`price: 0`)
    - **Weight / Size:** 2 Pcs
    - **Dietary:** 100% Pure Veg | Eggless
    - **Description:** Soft and fluffy individual cake topped with creamy frosting, perfect for a quick sweet bite or small celebration.
    - **Key Ingredients:** Flour, Butter, Vanilla Extract, Cream Frosting, Sprinkles.
    - **Nutritional Info:** 160 kcal/cupcake | 2 Cupcakes | Shelf Life: 3 Days.

24. **Fine Biscuit**
    - **Category:** Brownies (`brownies`)
    - **Price:** Price available in store (`price: 0`)
    - **Weight / Size:** 250g
    - **Dietary:** 100% Pure Veg | Eggless
    - **Description:** Light, crisp and mildly sweet bakery biscuits with a delicate texture, ideal for tea-time snacking.
    - **Key Ingredients:** Wheat Flour, Ghee, Sugar, Custard Powder, Milk.
    - **Nutritional Info:** 110 kcal/biscuit | 12-14 Biscuits | Shelf Life: 20 Days.

25. **Rusk**
    - **Category:** Brownies (`brownies`)
    - **Price:** Price available in store (`price: 0`)
    - **Weight / Size:** 250g
    - **Dietary:** 100% Pure Veg | Eggless | Signature Featured
    - **Description:** Crispy twice-baked bread with a lightly sweet flavour, perfect for dipping into tea, coffee or milk.
    - **Key Ingredients:** Wheat Flour, Sugar, Cardamom (Elaichi), Fennel Seeds, Yeast.
    - **Nutritional Info:** 65 kcal/piece | 14-16 Rusks | Shelf Life: 30 Days.

26. **Khari**
    - **Category:** Brownies (`brownies`)
    - **Price:** Price available in store (`price: 0`)
    - **Weight / Size:** 200g
    - **Dietary:** 100% Pure Veg | Eggless | Signature Featured
    - **Description:** Light, crisp and flaky puff pastry with a buttery texture, a classic Indian bakery tea-time favourite.
    - **Key Ingredients:** Refined Flour, Bakery Shortening, Rock Salt, Ajwain (optional).
    - **Nutritional Info:** 80 kcal/piece | 12-15 Pieces | Shelf Life: 20 Days.

---

#### CATEGORY 5: PUFFS (3 Products)

27. **Egg Puff**
    - **Category:** Puffs (`puffs`)
    - **Price:** Price available in store (`price: 0`)
    - **Weight / Size:** 1 Pc
    - **Dietary:** Non-Vegetarian | Contains Egg | Signature Featured
    - **Description:** Golden flaky pastry filled with seasoned egg and aromatic spices, freshly baked for a delicious savoury snack.
    - **Key Ingredients:** Flaky Puff Pastry, Boiled Eggs, Onion-Tomato Masala, Garam Masala, Curry Leaves.
    - **Nutritional Info:** 260 kcal | 1 Person | Shelf Life: Best Same Day.

28. **Veg Puff**
    - **Category:** Puffs (`puffs`)
    - **Price:** Price available in store (`price: 0`)
    - **Weight / Size:** 1 Pc
    - **Dietary:** 100% Pure Veg | Eggless | Signature Featured
    - **Description:** Flaky golden pastry filled with a tasty blend of seasoned vegetables and mild spices, perfect for a quick Indian bakery snack.
    - **Key Ingredients:** Flaky Puff Pastry, Potatoes, Green Peas, Carrots, Indian Spices.
    - **Nutritional Info:** 220 kcal | 1 Person | Shelf Life: Best Same Day.

29. **Chicken Puff**
    - **Category:** Puffs (`puffs`)
    - **Price:** Price available in store (`price: 0`)
    - **Weight / Size:** 1 Pc
    - **Dietary:** Non-Vegetarian | Signature Featured
    - **Description:** Golden flaky puff pastry filled with flavourful seasoned chicken and aromatic spices, baked fresh for a delicious savoury bite.
    - **Key Ingredients:** Flaky Puff Pastry, Spiced Minced Chicken, Caramelized Onions, Bakery Spices.
    - **Nutritional Info:** 290 kcal | 1 Person | Shelf Life: Best Same Day.

---

#### CATEGORY 6: PROTEIN SHAKES (2 Products)

30. **Chocolate Protein Shake**
    - **Category:** Protein Shakes (`protein-shakes`)
    - **Price:** Price available in store (`price: 0`)
    - **Weight / Size:** 300ml
    - **Dietary:** 100% Pure Veg | Eggless | Signature Featured
    - **Description:** A smooth and creamy chocolate protein shake with a rich cocoa flavour, prepared for a satisfying and filling drink.
    - **Key Ingredients:** Chilled Milk, Cocoa Powder, Natural Sweetener, Protein Blend.
    - **Nutritional Info:** 220 kcal | 300ml | Shelf Life: Consume Fresh.

31. **Vanilla Protein Shake**
    - **Category:** Protein Shakes (`protein-shakes`)
    - **Price:** Price available in store (`price: 0`)
    - **Weight / Size:** 300ml
    - **Dietary:** 100% Pure Veg | Eggless
    - **Description:** A creamy vanilla protein shake with a smooth and refreshing flavour, perfect for a filling drink after a busy day.
    - **Key Ingredients:** Chilled Milk, Natural Vanilla Extract, Sweetener, Protein Blend.
    - **Nutritional Info:** 205 kcal | 300ml | Shelf Life: Consume Fresh.

---

## 5. INTERACTIVE MODALS & DRAWERS

### 5.1 Product Detail Modal (`ProductModal.jsx`)
When a customer taps or clicks any item in the catalog or collection:
- **Header:** Category eyebrow, close icon button (`X`).
- **Product Visual:** Full-size image with Indian FSSAI green veg badge (square with green dot) or red non-veg badge, plus `Eggless` pill badge.
- **Title & Pricing:** Item name, formatted price (e.g. *"Price available in store"*), weight badge (`500g / 1kg`, `400g`, `250g`, etc.), and `Available` green status pill.
- **Description:** Comprehensive artisanal baking notes.
- **Nutrition Strip:** 3-column pill showing Calories, Servings, and Shelf Life.
- **Ingredient Cloud:** Individual bubble tags for all key ingredients.
- **Direct Action:** `[INQUIRE / CUSTOM ORDER]` (opens contact drawer / navigates to `/contact`).

### 5.2 Store Selector Modal (`StoreModal.jsx`)
Allows patrons to choose their nearest bakery outlet in Hyderabad for pickup or custom orders:
- **Title:** `Select a Bakery Store`
- **Subtitle:** *Choose your preferred outlet for fresh pickup or store-direct ordering.*
- **Outlets Listed:**
  1. **Cozy Crumbs — Jubilee Hills (Road No. 36):** Plot 412, Road No. 36, Jubilee Hills, Hyderabad | Phone: `+91 90101 11144` | Hours: `8:00 AM - 11:30 PM` | `1.2 km away`
  2. **Cozy Crumbs — Banjara Hills (Road No. 12):** Near MLA Colony, Road No. 12, Banjara Hills, Hyderabad | Phone: `+91 90101 11145` | Hours: `8:00 AM - 11:00 PM` | `3.4 km away`
  3. **Cozy Crumbs — Madhapur (Hitec City):** Opp. Inorbit Mall Road, Madhapur, Hyderabad | Phone: `+91 90101 11146` | Hours: `7:30 AM - Midnight` | `5.1 km away`
  4. **Cozy Crumbs — Gachibowli:** Near DLF Cybercity, Gachibowli, Hyderabad | Phone: `+91 90101 11147` | Hours: `8:00 AM - 11:00 PM` | `7.8 km away`
  5. **Cozy Crumbs — Kukatpally:** Main Road, KPHB Colony, Kukatpally, Hyderabad | Phone: `+91 90101 11148` | Hours: `8:30 AM - 10:30 PM` | `9.5 km away`

---

## 6. CONTACT PAGE & PHYSICAL OUTLETS

**URL:** `/contact`

### 6.1 Header Section
- **Tag:** `GET IN TOUCH`
- **H1:** *Contact Cozy Crumbs*
- **Subheading:** *Have a question about custom celebration orders, menu ingredients, or baking timings? We would love to hear from you.*

### 6.2 Customer Inquiry Form
- **Form Heading:** *Send Us a Message* ("Our bakery team responds promptly.")
- **Fields:**
  1. **Name \*** (Text input, required)
  2. **Email \*** (Email input, required)
  3. **Phone** (Tel input, optional)
  4. **Message \*** (Multi-line textarea, required: *"Tell us about your celebration or query..."*)
- **Submit Button:** `[SEND MESSAGE]` (with loading state `SENDING MESSAGE...`)
- **Success State:** *Message Sent! Thank you for reaching out. A representative from Cozy Crumbs will get back to you shortly.* with `[Send Another Message]` button.

### 6.3 Official Bakery Information Card
- **Brand Sub-label:** `COZY CRUMBS`
- **Title:** *Bakery Information*
- **Description:** Handcrafted baking, celebration cakes, and daily artisanal breads.
- **Phone:** `7098322796` (Clickable `tel:7098322796`)
- **Email:** `cozycrumbs6767@gmail.com` (Clickable `mailto:cozycrumbs6767@gmail.com`)
- **Address:** `Gachibowli TNGOS Colony`, Hyderabad

---

## 7. ABOUT US, HERITAGE & BAKERY VALUES

**URL:** Codebase reference `/pages/AboutPage.jsx` (Core brand narrative for patrons & press)

### 7.1 Story Narrative
> "Cozy Crumbs began with a simple belief: that baked goods should nourish both heart and memory. In a world full of artificial additives and commercial pre-mixes, we chose the slower, honorable path of artisanal craftsmanship. Every day, our master bakers hand-knead natural sourdoughs, slow-churn rich chocolate ganaches, and whip fresh cream frostings from scratch."

### 7.2 The 4 Core Pillars
1. **Pure Honest Ingredients** — We never compromise on pure churned dairy butter, Belgian dark chocolate, unbleached flour, and farm-fresh dairy.
2. **Dawn Baking Guarantee** — Our deck ovens light up at 4:00 AM every single morning to ensure unmatched oven-fresh warmth and crispness.
3. **100% In-House Production** — No outsourcing or pre-mixed powders. Every dough, ganache, glaze, and filling is handcrafted in our hygiene-certified kitchens.
4. **Celebration Centric** — Whether a humble evening tea snack or a lavish multi-tier wedding cake, every crumb is crafted with joy.

### 7.3 Milestone Timeline
- **2016 (The First Spark):** Started in a boutique kitchen with small-batch sourdough loaves and authentic tea cakes.
- **2019 (Artisanal Expansion):** Opened our central bakery kitchen in Hyderabad with European stone hearth deck ovens.
- **2023 (Celebration Mastery):** Delivered over 250,000 custom celebration cakes, signature puffs, and wedding spreads.
- **2026 (A Beloved Tradition):** Expanding to 5 vibrant outlets across Hyderabad while preserving zero-compromise artisanal baking.

---

## 8. BAKERY JOURNAL & BLOG ARTICLES

**URL:** Codebase reference `/pages/BlogPage.jsx` & `/pages/BlogPostPage.jsx` (Educational bakery journalism)

### Article 1: 5 Tips for Choosing the Perfect Birthday Cake
- **Slug:** `5-tips-for-choosing-the-perfect-birthday-cake`
- **Category:** Guides & Tips | **Date:** Sep 02, 2026 | **Read Time:** 4 min read
- **Summary:** From crowd-pleasing chocolate truffle profiles to sizing guidelines and dietary requirements like eggless, here is your essential cake planning handbook.
- **Full Text Key Takeaways:**
  1. *Portion Sizing:* 500g serves 4-6 guests comfortably; 1kg provides 8-12 generous celebration slices.
  2. *Flavor Profiles:* Dutch Chocolate Truffle, Black Forest, and Fresh Pineapple ensure maximum crowd enjoyment.
  3. *Dietary Consideration:* 80%+ of Cozy Crumbs cakes are 100% eggless with zero texture loss.
  4. *Temperature:* Keep cream-based cakes refrigerated until 30 minutes before cutting.
  5. *Advance Notice:* 24-48 hours required for complex custom tier orders.

### Article 2: The Secret Behind Our 36-Hour Naturally Fermented Sourdough
- **Slug:** `the-secret-behind-our-fresh-sourdough-breads`
- **Category:** Behind The Scenes | **Date:** Aug 26, 2026 | **Read Time:** 5 min read
- **Summary:** Discover how wild yeast cultures, stone-ground flour, and slow overnight cold retard create our blistered crust and custard-like open crumb.
- **Full Text Highlights:** Nurturing a 10-year-old starter named 'Aura', slow 24-hr cold fermentation in chilled retarders for gentle lactic acidity, and high-steam baking on volcanic stone hearth decks.

### Article 3: The Art of the Truffle: Crafting Our 70% Belgian Chocolate Masterpiece
- **Slug:** `how-we-make-our-signature-belgian-chocolate-cake`
- **Category:** Craftsmanship | **Date:** Aug 14, 2026 | **Read Time:** 3 min read
- **Summary:** Take a peek inside our temperature-regulated chocolate room as our chocolatiers temper Callebaut dark chocolate into velvety ganache.
- **Full Text Highlights:** Single-origin 70% Callebaut dark chocolate couverture emulsified with dairy cream at exactly 42°C, brushed with vanilla bean reduction and finished with delicate dark chocolate shards.

### Article 4: Hyderabadi Chai & Osmania: The Story of Our Heritage Tea Biscuit
- **Slug:** `heritage-of-authentic-osmania-tea-biscuits`
- **Category:** Heritage & Culture | **Date:** Jul 29, 2026 | **Read Time:** 4 min read
- **Summary:** Why the subtle interplay of churned butter, salt, and cardamom essence makes the Osmania biscuit Hyderabad’s favorite companion to Irani chai.
- **Full Text Highlights:** Named after Nizam Mir Osman Ali Khan; strict adherence to real dairy butter, sea salt balance, and cardamom aromatics.

---

## 9. CAREERS & EMPLOYMENT OPPORTUNITIES

**URL:** Codebase reference `/pages/CareersPage.jsx`

### 9.1 Culture & Compensation Highlights
- **State-of-the-Art Kitchens:** European stone deck ovens, climate-controlled chocolate rooms.
- **Growth & Learning:** Fast-track culinary leadership tracks and masterclasses with pastry chefs.
- **Competitive Benefits:** Industry-leading salaries, health insurance, daily fresh bakery allowances.

### 9.2 Current Job Openings
1. **Senior Cake Artist & Sugar Confectioner**
   - **Department:** Bakery Production | **Location:** Central Kitchen — Jubilee Hills, Hyderabad
   - **Type:** Full-Time | **Experience:** 3+ Years
   - **Scope:** Multi-tiered wedding cakes, custom celebration cakes, fondant sculpting, chocolate filigree.
2. **Master Pastry & Sourdough Baker**
   - **Department:** Bread & Viennoiserie | **Location:** Central Kitchen — Madhapur, Hyderabad
   - **Type:** Full-Time | **Experience:** 2+ Years
   - **Scope:** Laminated doughs, European croissants, brioche, long-fermentation natural sourdough.
3. **Bakery Outlet Store Manager**
   - **Department:** Retail Operations | **Location:** Banjara Hills Outlet, Hyderabad
   - **Type:** Full-Time | **Experience:** 2+ Years
   - **Scope:** Retail operations, guest hospitality, inventory replenishment, team scheduling.
4. **Guest Experience & Barista Associate**
   - **Department:** Customer Service | **Location:** All Hyderabad Outlets
   - **Type:** Full-Time / Part-Time | **Experience:** Fresher / 1 Year
   - **Scope:** Hospitality, coffee brewing, dessert pairings, cake presentation and packaging.

---

## 10. GLOBAL FOOTER

Rendered consistently on every customer page in deep cocoa `#24130D` with warm cream accents:

### 10.1 Column 1: Brand Info
- **Brand Title:** `COZY CRUMBS` (Playfair Display, italic)
- **Statement:** *"At Cozy Crumbs, we believe every day deserves something freshly baked. From celebration cakes to warm breads and delicate biscuits, we create simple moments worth remembering."*

### 10.2 Column 2: Useful Links
- **Home** (`/`)
- **Menu** (`/menu`)
- **Contact** (`/contact`)
- **Admin Dashboard** (`/admin/login`) — Shield check icon link for store staff.

### 10.3 Column 3: Contact Us
- **Phone:** `7098322796` (`tel:7098322796`)
- **Email:** `cozycrumbs6767@gmail.com` (`mailto:cozycrumbs6767@gmail.com`)
- **Address:** `Gachibowli TNGOS Colony`

### 10.4 Bottom Bar & Social Media Links
- **Copyright:** `© [Year] Cozy Crumbs. All rights reserved.`
- **Social Channels:**
  - **Instagram:** `https://instagram.com`
  - **Facebook:** `https://facebook.com`
  - **X (Twitter):** `https://x.com`
  - **WhatsApp Direct:** `https://wa.me/917098322796`

---

## 11. 404 ERROR PAGE

**URL:** `/404` or any unmatched route (`NotFoundPage.jsx`)
- **Graphic:** Circular crumb badge.
- **H1 Headline:** `404 — Page Not Found`
- **Sub-copy:** *"Oops! The page you are looking for seems to have crumbled away or does not exist."*
- **Call to Action:** `[RETURN TO HOME]` (links back to `/`)

---

## 12. ADMIN PORTAL & MANAGEMENT DASHBOARD

A dedicated administration suite for bakery managers, chefs, and inventory staff.

### 12.1 Authentication & Credentials (`AdminLoginPage.jsx`)
- **URL:** `/admin/login`
- **Theme:** Deep cocoa background (`#24130D`), elevated brown card (`#3A2923`).
- **Standard Administrator Credentials:**
  - **Email:** `cozycrumbs6767@gmail.com`
  - **Password:** `@#cozycrumbs6767@gmail.com#@`
  - *(Fallback username for legacy instances: `cozycrums6767@gmail.com`)*
- **Security Features:**
  - Password visibility toggle (`Eye` / `EyeOff`).
  - JWT Bearer Token generation upon authentication stored in `localStorage`.
  - Protected route redirection — auto-navigates back to the attempted URL after login.

---

### 12.2 Admin Layout & Sidebar Navigation (`AdminLayout.jsx`)
- **Sidebar Top:** Logo, Cozy Crumbs title, `Admin Dashboard` sub-badge.
- **Sidebar Navigation Links:**
  1. `Dashboard` (`/admin/dashboard`) — Icon: `LayoutDashboard`
  2. `Products` (`/admin/products`) — Icon: `Cake`
  3. `Categories` (`/admin/categories`) — Icon: `FolderTree`
  4. `Messages` (`/admin/messages`) — Icon: `Mail`
- **Sidebar Bottom Links:**
  - `Live Bakery Site` (Opens `/` in a new tab)
  - `Logout` (Clears token and user context, redirects to `/admin/login`)
- **Top Header Bar:** Responsive hamburger toggle, portal title, administrator avatar initials, and active admin email.

---

### 12.3 Control Center Dashboard (`AdminDashboardPage.jsx`)
- **Welcome Banner:**
  - **Heading:** `CONTROL CENTER` • *Bakery Catalog & Operations*
  - **Description:** Manage your artisanal cakes, pastry inventory, bakery categories, and monitor customer inquiries.
  - **Quick Buttons:** `[+ Manage Products]` and `[View Store]`.
- **4 Key Real-Time Metrics Cards:**
  1. **Total Products:** Live count of all catalog items.
  2. **Active Categories:** Count of active categories (Cakes, Pastries, Breads, Brownies, Puffs, Protein Shakes).
  3. **Signature Featured:** Count of items currently flagged with `isFeatured: true`.
  4. **Available Products:** Count of items with `isAvailable: true`.
- **Recently Added Bakery Items Table:**
  - Thumbnail preview, Product Name, Category Name, Price, and Active/Hidden pill badge.
- **Quick Shortcuts Panel:**
  - Direct jump to Products CRUD, Categories CRUD, and Customer Messages.
- **System Status Card:**
  - MongoDB Database Connection: Online (Live)
  - REST API Server: Online (Port 5050)
  - JWT Authentication: Active

---

### 12.4 Product Management Portal (`AdminProductsPage.jsx`)
Complete CRUD interface for bakery inventory:
- **Search & Filters:**
  - Live text search across product names and descriptions.
  - Category dropdown filter (All, Cakes, Pastries, Breads, Brownies, Puffs, Protein Shakes).
  - Availability filter (All, Available Only, Hidden Only).
- **Product Inventory Table:**
  - Image thumbnail.
  - Product Name, Category, Weight.
  - Price (₹ or 0 for store pricing).
  - Dietary badges: Green veg / Red non-veg dot, Eggless indicator.
  - Featured star toggle (one-click toggle `isFeatured`).
  - Availability visibility toggle (one-click toggle `isAvailable` with `Eye` / `EyeOff`).
  - Action buttons: `Edit` (opens modal) and `Delete` (opens confirm dialog).
- **Add / Edit Product Modal:**
  - **Product Name \*** (Text)
  - **Category \*** (Dropdown populated dynamically from database)
  - **Price (₹) \*** (Number, 0 for "Price available in store")
  - **Weight / Size** (e.g. `500g / 1kg`, `400g`, `1 Pc`, `250g`)
  - **Description \*** (Artisanal tasting notes and shelf life details)
  - **Key Ingredients** (Comma-separated string, e.g. *Flour, Cocoa, Cream, Butter*)
  - **Image URL / Asset Uploader \*** (Direct URL input or image upload)
  - **Dietary & Catalog Toggles:**
    - `Pure Vegetarian` (Checkbox)
    - `Eggless Recipe` (Checkbox)
    - `Featured on Homepage` (Checkbox)
    - `Currently Available in Outlets` (Checkbox)
  - **Display Order** (Numeric sort position)

---

### 12.5 Category Management Portal (`AdminCategoriesPage.jsx`)
- **Category List & Ordering:**
  - Re-order categories for customer navbar and homepage display.
  - Shows category icon, image thumbnail, name, slug, description, and status.
- **Add / Edit Category Modal:**
  - **Category Name \*** (e.g. *Cakes*, *Pastries*, *Breads*)
  - **Description** (e.g. *Artisanal celebration cakes...*)
  - **Category Icon Selector:** (Interactive icon grid: `Cake`, `Flame`, `Pizza`, `IceCream`, `Cookie`, `Croissant`, `Donut`, `Sparkles`, `Citrus`, `CupSoda`, `UtensilsCrossed`, `Coffee`)
  - **Category Cover Image URL**
  - **Display Order** (Numeric ranking)
  - **Active Status Toggle**

---

### 12.6 Customer Inquiries & Messages Portal (`AdminMessagesPage.jsx`)
- **List of Contact Form Submissions:**
  - Patron Name, Email, Phone Number, Date/Time stamp.
  - Customer Message Body.
  - **Status Workflow:** `unread` (amber highlighted) -> `read` -> `replied` (green badge).
  - **Direct Actions:** Click-to-call phone button, click-to-email button to respond directly.

---

## 13. DATABASE MODELS & TECHNICAL SPECIFICATIONS

### 13.1 Category Schema (`server/src/models/Category.js`)
```javascript
{
  name: { type: String, required: true, trim: true },
  slug: { type: String, required: true, unique: true, lowercase: true },
  description: { type: String, default: '' },
  icon: { type: String, default: 'Cake' },
  image: { type: String, default: '' },
  displayOrder: { type: Number, default: 0 },
  isActive: { type: Boolean, default: true }
}
```

### 13.2 Product Schema (`server/src/models/Product.js`)
```javascript
{
  name: { type: String, required: true, trim: true },
  slug: { type: String, required: true, unique: true, lowercase: true },
  category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true, min: 0 }, // 0 = "Price available in store"
  weight: { type: String, default: '' },
  image: { type: String, required: true },
  isVeg: { type: Boolean, default: true },
  isEggless: { type: Boolean, default: true },
  isFeatured: { type: Boolean, default: false },
  isAvailable: { type: Boolean, default: true },
  displayOrder: { type: Number, default: 0 },
  ingredients: [{ type: String }],
  nutritionalInfo: {
    calories: { type: String, default: '' },
    servings: { type: String, default: '' },
    shelfLife: { type: String, default: '' }
  }
}
```

### 13.3 Message Schema (`server/src/models/Message.js`)
```javascript
{
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, default: '' },
  message: { type: String, required: true },
  status: { type: String, enum: ['unread', 'read', 'replied'], default: 'unread' },
  createdAt: { type: Date, default: Date.now }
}
```

### 13.4 User Schema (`server/src/models/User.js`)
```javascript
{
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true, lowercase: true },
  password: { type: String, required: true }, // bcrypt hashed
  role: { type: String, enum: ['admin', 'staff', 'customer'], default: 'customer' }
}
```

---

*Document compiled and verified against the Cozy Crumbs codebase on September 10, 2026.*
