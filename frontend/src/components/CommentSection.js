'use client';

import { useState } from 'react';
import { postComment } from '@/lib/api';
import { MessageSquare, Send, User } from 'lucide-react';

export default function CommentSection({ articleId, initialComments = [] }) {
  const [comments, setComments] = useState(initialComments);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [content, setContent] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name.trim() || !content.trim()) return;

    setIsSubmitting(true);
    const newComment = await postComment(articleId, name, email, content);
    
    setComments([newComment, ...comments]);
    setName('');
    setEmail('');
    setContent('');
    setIsSubmitting(false);
    setMessage('Komentar Anda berhasil dikirim!');

    setTimeout(() => setMessage(''), 4000);
  };

  return (
    <section className="space-y-6 pt-8 border-t border-slate-200 dark:border-slate-800">
      <div className="flex items-center gap-2">
        <MessageSquare className="w-5 h-5 text-blue-600" />
        <h3 className="text-xl font-bold text-slate-900 dark:text-white">
          Komentar & Diskusi ({comments.length})
        </h3>
      </div>

      {/* Comment Form */}
      <form onSubmit={handleSubmit} className="bg-slate-50 dark:bg-slate-800/50 rounded-2xl p-5 border border-slate-200/80 dark:border-slate-700/80 space-y-4">
        <h4 className="text-sm font-semibold text-slate-900 dark:text-white">Tulis Pendapat Anda</h4>
        
        {message && (
          <p className="text-xs text-emerald-600 dark:text-emerald-400 font-medium bg-emerald-50 dark:bg-emerald-950/40 p-2.5 rounded-lg border border-emerald-200 dark:border-emerald-800">
            {message}
          </p>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <input
            type="text"
            required
            placeholder="Nama Lengkap *"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="px-3.5 py-2 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50"
          />
          <input
            type="email"
            placeholder="Email (Opsional)"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="px-3.5 py-2 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50"
          />
        </div>

        <textarea
          required
          rows="3"
          placeholder="Tulis komentar atau opini Anda mengenai berita ini..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="w-full px-3.5 py-2 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50"
        />

        <button
          type="submit"
          disabled={isSubmitting}
          className="px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold flex items-center gap-2 transition-colors shadow-md disabled:opacity-50"
        >
          <Send className="w-4 h-4" />
          <span>{isSubmitting ? 'Mengirim...' : 'Kirim Komentar'}</span>
        </button>
      </form>

      {/* Comments List */}
      <div className="space-y-4 pt-2">
        {comments.map((item) => (
          <div key={item.id} className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-full bg-blue-100 dark:bg-blue-900/50 text-blue-600 dark:text-blue-400 flex items-center justify-center font-bold text-xs">
                  <User className="w-4 h-4" />
                </div>
                <span className="font-bold text-sm text-slate-900 dark:text-white">{item.name}</span>
              </div>
              <span className="text-[11px] text-slate-400">
                {new Date(item.created_at || Date.now()).toLocaleDateString('id-ID')}
              </span>
            </div>
            <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed pl-9">
              {item.content}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
