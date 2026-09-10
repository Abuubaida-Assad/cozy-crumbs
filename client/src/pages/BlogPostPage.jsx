import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { BLOG_POSTS } from './BlogPage';
import { Calendar, Clock, ArrowLeft, Share2, Tag, BookOpen } from 'lucide-react';
import { useToast } from '../context/ToastContext';

export const BlogPostPage = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { success } = useToast();

  const post = BLOG_POSTS.find((p) => p.slug === slug) || BLOG_POSTS[0];

  const handleShare = () => {
    navigator.clipboard?.writeText(window.location.href);
    success('Article link copied to clipboard!');
  };

  return (
    <div className="pt-24 sm:pt-28 md:pt-36 pb-16 sm:pb-20 px-4 sm:px-6 lg:px-8 bg-[#FDFBF7] min-h-screen">
      <div className="max-w-4xl mx-auto">
        
        {/* Back navigation */}
        <div className="flex items-center justify-between mb-6 sm:mb-8">
          <button
            onClick={() => navigate('/blog')}
            className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-cocoa hover:text-accent transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Journal</span>
          </button>

          <button
            onClick={handleShare}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-cream-beige hover:bg-cream-sand text-cocoa text-xs font-semibold transition-colors"
          >
            <Share2 className="w-3.5 h-3.5" />
            <span>Share</span>
          </button>
        </div>

        {/* Article Container */}
        <article className="bg-white rounded-2xl sm:rounded-3xl md:rounded-[2.5rem] shadow-soft border border-cocoa/10 overflow-hidden p-5 sm:p-8 md:p-12 mb-10 sm:mb-12">
          {/* Post Header */}
          <div className="mb-6 sm:mb-8">
            <span className="text-xs font-bold uppercase tracking-widest text-accent bg-accent-soft/70 px-3.5 py-1 rounded-full inline-block mb-3 sm:mb-4">
              {post.category}
            </span>

            <h1 className="font-display text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold text-cocoa tracking-tight leading-tight mb-3 sm:mb-4">
              {post.title}
            </h1>

            <div className="flex flex-wrap items-center gap-3 sm:gap-4 text-xs text-cocoa-light">
              <span className="flex items-center gap-1.5 font-medium">
                <Calendar className="w-4 h-4" />
                {post.date}
              </span>
              <span className="flex items-center gap-1.5 font-medium">
                <Clock className="w-4 h-4" />
                {post.readTime}
              </span>
              <span className="hidden sm:inline">• By Cozy Crumbs Master Confectioners</span>
            </div>
          </div>

          {/* Featured Image */}
          <div className="aspect-[16/9] rounded-2xl overflow-hidden bg-cream-beige mb-10 shadow-sm">
            <img
              src={post.image}
              alt={post.title}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Body Content */}
          <div className="prose prose-stone max-w-none font-sans text-sm sm:text-base text-cocoa/85 leading-relaxed space-y-5 whitespace-pre-line">
            {post.content}
          </div>

          {/* Footer Callout */}
          <div className="mt-12 pt-8 border-t border-cocoa/10 bg-cream-soft/60 rounded-2xl p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <h4 className="font-display text-base font-bold text-cocoa mb-1">
                Taste the Difference Today
              </h4>
              <p className="text-xs text-cocoa/75">
                Visit any of our 5 Hyderabad outlets or explore our catalog online.
              </p>
            </div>
            <Link to="/menu" className="btn-primary py-3 px-6 text-xs whitespace-nowrap">
              <span>EXPLORE MENU</span>
            </Link>
          </div>
        </article>

      </div>
    </div>
  );
};
