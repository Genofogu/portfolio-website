import { useMemo, useState } from 'react';
import { blogPosts } from '../data/blogPosts';

const normalize = (value) => value.toString().toLowerCase();

export const useBlogSearch = () => {
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('All');
  const [tag, setTag] = useState('All');
  const [difficulty, setDifficulty] = useState('All');
  const [sortKey, setSortKey] = useState('Newest');

  const filtered = useMemo(() => {
    const term = normalize(query);

    return blogPosts
      .filter((post) => {
        const matchesQuery =
          !term ||
          normalize(post.title).includes(term) ||
          normalize(post.description).includes(term) ||
          normalize(post.category).includes(term) ||
          normalize(post.tags.join(' ')).includes(term) ||
          normalize(post.content).includes(term);

        const matchesCategory = category === 'All' || post.category === category;
        const matchesTag = tag === 'All' || post.tags.includes(tag);
        const matchesDifficulty = difficulty === 'All' || post.difficulty === difficulty;

        return matchesQuery && matchesCategory && matchesTag && matchesDifficulty;
      })
      .sort((a, b) => {
        if (sortKey === 'Oldest') return new Date(a.publishDate) - new Date(b.publishDate);
        if (sortKey === 'Most Popular') return b.popularity - a.popularity;
        if (sortKey === 'Recently Updated') return new Date(b.updatedDate) - new Date(a.updatedDate);
        return new Date(b.publishDate) - new Date(a.publishDate);
      });
  }, [query, category, tag, difficulty, sortKey]);

  return {
    query,
    setQuery,
    category,
    setCategory,
    tag,
    setTag,
    difficulty,
    setDifficulty,
    sortKey,
    setSortKey,
    results: filtered
  };
};
