import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Clock, ArrowRight, BookOpen } from 'lucide-react';

export const BLOG_POSTS = [
  {
    id: '1',
    slug: '5-tips-for-choosing-the-perfect-birthday-cake',
    title: '5 Tips for Choosing the Perfect Birthday Cake for Any Celebration',
    category: 'Guides & Tips',
    date: 'Sep 02, 2026',
    readTime: '4 min read',
    image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=800&q=80',
    summary: 'From crowd-pleasing chocolate truffle profiles to sizing guidelines and dietary requirements like eggless, here is your essential cake planning handbook.',
    content: `Choosing the right birthday cake sets the sweet foundation for your entire party. Here are our master baker tips:

1. Know Your Guest Count & Portion Sizing: As a rule of thumb, a 500g cake serves 4-6 guests comfortably, while a 1kg cake provides 8-12 generous celebration slices.

2. Consider Flavor Profiles for the Crowd: While unusual berry combinations are exciting, timeless classics like Dutch Chocolate Truffle, Black Forest, or Fresh Pineapple guarantee every guest takes a second slice.

3. Dietary Preferences: Always ensure there is an eggless option available for vegetarian friends and family. At Cozy Crumbs, over 80% of our signature cake recipes are completely 100% eggless with zero compromise on sponge texture.

4. Temperature & Timing: Cream-based cakes should be refrigerated until 30 minutes before cutting to allow the frosting to reach optimal creamy silkiness without melting.

5. Custom Theming & Inscriptions: Order custom tier cakes at least 24-48 hours in advance so our decorators have ample time to sculpt delicate chocolate filigrees and marzipan details.`,
  },
  {
    id: '2',
    slug: 'the-secret-behind-our-fresh-sourdough-breads',
    title: 'The Secret Behind Our 36-Hour Naturally Fermented Sourdough',
    category: 'Behind The Scenes',
    date: 'Aug 26, 2026',
    readTime: '5 min read',
    image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=800&q=80',
    summary: 'Discover how wild yeast cultures, stone-ground flour, and slow overnight cold retard create our blistered crust and custard-like open crumb.',
    content: `Real bread requires patience. In our central Hyderabad bakery, we nurture a decade-old wild yeast sourdough starter named 'Aura'.

The process begins with mixing stone-ground unbleached wheat flour with filtered water. After autolyse, we perform gentle stretch-and-folds every 30 minutes for three hours.

Next comes the magic: a 24-hour slow cold fermentation in temperature-controlled proofing chambers. This allows natural lactobacillus bacteria to break down complex starches, resulting in bread that is easier to digest and brimming with complex lactic acidity.

Finally, each loaf is baked on volcanic stone hearth decks with generous steam injection, giving our sourdough its signature singing crackly crust and moist, airy interior.`,
  },
  {
    id: '3',
    slug: 'how-we-make-our-signature-belgian-chocolate-cake',
    title: 'The Art of the Truffle: Crafting Our 70% Belgian Chocolate Masterpiece',
    category: 'Craftsmanship',
    date: 'Aug 14, 2026',
    readTime: '3 min read',
    image: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&w=800&q=80',
    summary: 'Take a peek inside our temperature-regulated chocolate room as our chocolatiers temper Callebaut dark chocolate into velvety ganache.',
    content: `Chocolate is both an art and an exacting science. For our signature Dutch Chocolate Truffle cake, we import single-origin 70% Belgian chocolate couveture.

To achieve our mirror-like glaze and melt-in-mouth ganache:
- We slowly emulsify warm dairy cream with tempered chocolate blocks at exactly 42°C.
- Our dark cocoa sponge is brushed with a delicate vanilla bean reduction to preserve moisture.
- Each layer is coated in velvety chocolate mousse before being hand-finished with handcrafted chocolate shards.

Experience the richness in every bite — available daily across all Cozy Crumbs outlets.`,
  },
  {
    id: '4',
    slug: 'heritage-of-authentic-osmania-tea-biscuits',
    title: 'Hyderabadi Chai & Osmania: The Story of Our Heritage Tea Biscuit',
    category: 'Heritage & Culture',
    date: 'Jul 29, 2026',
    readTime: '4 min read',
    image: 'https://images.unsplash.com/photo-1558961363-fa8fdf82db35?auto=format&fit=crop&w=800&q=80',
    summary: 'Why the subtle interplay of churned butter, salt, and cardamom essence makes the Osmania biscuit Hyderabad’s favorite companion to Irani chai.',
    content: `Named after the last Nizam of Hyderabad, Mir Osman Ali Khan, the Osmania biscuit represents the quintessence of local tea culture.

What gives the Cozy Crumbs Osmania biscuit its distinctive character is our strict adherence to traditional proportions: pure churned dairy butter, unbleached flour, a hint of aromatic cardamom essence, and a touch of sea salt that balances the sweetness.

Crisp on the first bite, yet melting smoothly on the tongue, it remains our most requested tea-time staple.`,
  },
];

export const BlogPage = () => {
  return (
    <div className="pt-24 sm:pt-28 md:pt-36 pb-16 sm:pb-20 px-4 sm:px-6 lg:px-8 bg-[#FDFBF7] min-h-screen">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-14">
          <span className="font-sans text-accent font-bold tracking-[0.2em] uppercase text-xs mb-2 block">
            BAKERY JOURNAL
          </span>
          <h1 className="font-display text-3xl sm:text-4xl md:text-5xl font-extrabold text-cocoa tracking-tight mb-2 sm:mb-3">
            Stories, Tips & Recipes
          </h1>
          <p className="font-sans text-xs sm:text-sm text-cocoa/75 leading-relaxed">
            Insights from our master confectioners, baking secrets, and celebration guides.
          </p>
        </div>

        {/* Blog Posts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          {BLOG_POSTS.map((post) => (
            <article
              key={post.id}
              className="bg-white rounded-3xl overflow-hidden border border-cocoa/10 shadow-soft transition-all duration-300 hover:shadow-hover hover:-translate-y-1 flex flex-col justify-between group"
            >
              <div>
                <div className="aspect-[16/10] overflow-hidden bg-cream-beige relative">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <span className="absolute top-4 left-4 bg-cocoa/85 text-cream text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider backdrop-blur-sm">
                    {post.category}
                  </span>
                </div>

                <div className="p-5 sm:p-7 md:p-8">
                  <div className="flex items-center gap-4 text-[11px] font-medium text-cocoa-light mb-3">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5" />
                      {post.date}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" />
                      {post.readTime}
                    </span>
                  </div>

                  <h2 className="font-display text-lg sm:text-xl md:text-2xl font-bold text-cocoa group-hover:text-accent transition-colors leading-snug mb-2 sm:mb-3">
                    {post.title}
                  </h2>

                  <p className="font-sans text-xs sm:text-sm text-cocoa/75 leading-relaxed line-clamp-3">
                    {post.summary}
                  </p>
                </div>
              </div>

              <div className="px-5 pb-5 sm:px-7 sm:pb-7 md:px-8 md:pb-8 pt-0">
                <Link
                  to={`/blog/${post.slug}`}
                  className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-accent group-hover:text-accent-hover transition-colors"
                >
                  <span>READ ARTICLE</span>
                  <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                </Link>
              </div>
            </article>
          ))}
        </div>

      </div>
    </div>
  );
};
