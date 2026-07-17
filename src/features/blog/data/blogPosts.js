export const blogPosts = [
  {
    title: 'Designing AI Products with Trust in Mind',
    slug: 'designing-ai-products-with-trust',
    description: 'A practical guide to building AI systems that balance usability, reliability, and human-centered trust.',
    content: `# Designing AI Products with Trust in Mind

Building trustworthy AI starts with a clear product vision, transparent interactions, and thoughtful failure modes.

> Trust is not a feature; it's the architecture behind every decision.

## Why trust matters

AI should feel predictable, explainable, and safe. When users understand what the system can do, adoption becomes smoother.

### Core trust principles

- Clear expectations
- Meaningful feedback
- Human-led control
- Responsible fallback behavior

### Example: prompt routing

\`\`\`js
const routePrompt = (input) => {
  if (input.includes('code')) return 'code-assistant';
  if (input.includes('research')) return 'research-assistant';
  return 'general';
};
\`\`\`

## Structural checkpoints

1. Data lineage
2. Bias assessment
3. Monitoring and alerts
4. Documentation and audit trails

::: note
Use the trust checklist before every deployment. It is the best way to keep AI work aligned with the team.
:::

::: warning
Avoid making the model appear omniscient. Always surface uncertainty when the answer is not confident.
:::

### Formula for trust score

$\text{Trust} = \frac{\text{Transparency} + \text{Reliability} + \text{Safety}}{3}$

| Dimension | What to measure |
| --- | --- |
| Transparency | Explanations, rationale, prompt clarity |
| Reliability | uptime, accuracy, consistency |
| Safety | guardrails, content policy, fallback |

## Running the checklist

- [x] Model capability mapped
- [x] Feedback loops designed
- [ ] Guardrails tested

**Reading time:** 7 min
`,
    category: 'AI',
    tags: ['AI', 'Product Design', 'Trust', 'RAG'],
    coverImage: 'https://images.unsplash.com/photo-1518779578993-ec3579fee39f?auto=format&fit=crop&w=1200&q=80',
    publishDate: '2026-06-05',
    updatedDate: '2026-07-08',
    readingTime: '7 min',
    difficulty: 'Intermediate',
    featured: true,
    author: {
      name: 'Geno Futaba',
      role: 'AI Developer',
      bio: 'Building data-driven systems, cloud-native tooling, and research-backed learning experiences.',
      photo: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=240&q=80',
      socials: {
        github: 'https://github.com/geno',
        linkedin: 'https://www.linkedin.com/in/geno/',
        twitter: 'https://twitter.com/geno'
      }
    },
    popularity: 96
  },
  {
    title: 'From Data to Insights: Data Science Workflow for Modern Teams',
    slug: 'data-science-workflow-for-modern-teams',
    description: 'Practical steps for teams to move from raw data to insight-driven decisions with a reliable workflow.',
    content: `# From Data to Insights

A clear workflow is the difference between raw logs and impactful decisions.

## The modern data science lifecycle

1. Data collection
2. Feature engineering
3. Model training
4. Validation
5. Deployment

### Tools in the stack

- Python
- SQL
- Cloud compute
- Model monitoring

::: success
A repeatable workflow reduces wasted effort and makes experimentation scalable.
:::

\`\`\`sql
SELECT user_id,
       COUNT(event) AS event_count,
       AVG(duration) AS avg_duration
FROM session_events
WHERE event_date >= '2026-01-01'
GROUP BY user_id;
\`\`\`

## Popular metrics

- Accuracy
- Precision / Recall
- Latency
- Feature drift

### Recommended dashboard layout

| Section | Purpose |
| --- | --- |
| Overview | Business KPIs |
| Data quality | Missing, anomalies |
| Model health | Accuracy and drift |
| Alerts | Actionable thresholds |

**Reading time:** 6 min
`,
    category: 'Data Science',
    tags: ['Data Science', 'Python', 'SQL', 'ML'],
    coverImage: 'https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=1200&q=80',
    publishDate: '2026-05-18',
    updatedDate: '2026-06-28',
    readingTime: '6 min',
    difficulty: 'Beginner',
    featured: true,
    author: {
      name: 'Geno Futaba',
      role: 'Data Science',
      bio: 'Crafting repeatable analytics workflows that connect product intuition with data.',
      photo: 'https://images.unsplash.com/photo-1544723795-3fb6469f5b39?auto=format&fit=crop&w=240&q=80',
      socials: {
        github: 'https://github.com/geno',
        linkedin: 'https://www.linkedin.com/in/geno/',
        instagram: 'https://instagram.com/geno'
      }
    },
    popularity: 88
  },
  {
    title: 'Kubernetes Patterns for Cloud-native Startups',
    slug: 'kubernetes-patterns-for-cloud-native-startups',
    description: 'How to design scalable clusters, deployment pipelines, and infrastructure patterns that grow with your team.',
    content: `# Kubernetes Patterns for Cloud-native Startups

Kubernetes is powerful when it is opinionated, lean, and easy to operate.

## A practical startup cluster

- Minimal namespaces
- GitOps-style deployments
- Observability by default

### Deployment strategy

Use rolling deployments with a fast rollback path:

\`\`\`yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: app
spec:
  replicas: 2
  strategy:
    type: RollingUpdate
    rollingUpdate:
      maxSurge: 1
      maxUnavailable: 0
\`\`\`

::: info
Start with a single cluster and add managed services only when they reduce your daily operational load.
:::

### Common gotchas

- Over-complicating namespaces
- Too many custom operators
- No readiness / liveness checks

**Reading time:** 8 min
`,
    category: 'Kubernetes',
    tags: ['Kubernetes', 'Cloud', 'DevOps', 'Docker'],
    coverImage: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=80',
    publishDate: '2026-07-03',
    updatedDate: '2026-07-03',
    readingTime: '8 min',
    difficulty: 'Intermediate',
    featured: false,
    author: {
      name: 'Geno Futaba',
      role: 'Cloud Engineer',
      bio: 'Building resilient infrastructure and developer experiences for AI-native teams.',
      photo: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=240&q=80',
      socials: {
        github: 'https://github.com/geno',
        linkedin: 'https://www.linkedin.com/in/geno/',
        twitter: 'https://twitter.com/geno'
      }
    },
    popularity: 80
  },
  {
    title: 'How I Build Developer Tools for Better Feedback Loops',
    slug: 'build-developer-tools-for-better-feedback-loops',
    description: 'A journal entry on the engineering practices, API design, and UX patterns that make tools feel delightful and productive.',
    content: `# Building Developer Tools for Better Feedback Loops

Developer tools should empower fast exploration while keeping complexity under control.

## Focus areas

- Instant feedback
- Clear error context
- Discoverable workflows

### Example feedback loop

\`\`\`js
function reactToEvent(event) {
  const result = analyze(event.payload);
  return result.status === 'ok'
    ? showSuccess(result.summary)
    : showError(result.issues);
}
\`\`\`

::: info
A good tool reduces the cost of learning, not the number of features.
:::

## Components of a strong developer tool

- Responsive outputs
- Compact UX
- Annotated suggestions

**Reading time:** 5 min
`,
    category: 'Developer Tools',
    tags: ['Developer Tools', 'Software Engineering', 'Productivity'],
    coverImage: 'https://images.unsplash.com/photo-1517430816045-df4b7de0110b?auto=format&fit=crop&w=1200&q=80',
    publishDate: '2026-04-24',
    updatedDate: '2026-05-05',
    readingTime: '5 min',
    difficulty: 'Beginner',
    featured: false,
    author: {
      name: 'Geno Futaba',
      role: 'Software Engineer',
      bio: 'Turning learnings into polished tools that support developers and builders.',
      photo: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=240&q=80',
      socials: {
        github: 'https://github.com/geno',
        linkedin: 'https://www.linkedin.com/in/geno/',
        twitter: 'https://twitter.com/geno'
      }
    },
    popularity: 75
  },
  {
    title: 'Machine Learning Model Monitoring Without Overhead',
    slug: 'ml-model-monitoring-without-overhead',
    description: 'A lightweight way to keep model drift, latency, and data health visible in production.',
    content: `# ML Model Monitoring Without Overhead

Monitoring should be automated, easy to read, and focused on the signals that matter.

## What to track

- Prediction distribution
- Input drift
- Latency
- Error rates

### Simple slate monitor

\`\`\`python
import time

def emit_metric(name, value):
    payload = {'metric': name, 'value': value, 'timestamp': time.time()}
    send_to_monitor(payload)
\`\`\`

::: warning
Do not monitor every signal. Start with the top 3 metrics that indicate whether the model is still useful.
:::

## Operational checklist

- Alert on data drift
- Track performance regressions
- Keep a deploy audit log

**Reading time:** 6 min
`,
    category: 'Machine Learning',
    tags: ['Machine Learning', 'Monitoring', 'Python', 'ML'],
    coverImage: 'https://images.unsplash.com/photo-1531297484001-80022131f5a1?auto=format&fit=crop&w=1200&q=80',
    publishDate: '2026-03-11',
    updatedDate: '2026-06-20',
    readingTime: '6 min',
    difficulty: 'Intermediate',
    featured: false,
    author: {
      name: 'Geno Futaba',
      role: 'AI Developer',
      bio: 'Monitoring models and building feedback loops for dependable AI products.',
      photo: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&w=240&q=80',
      socials: {
        github: 'https://github.com/geno',
        linkedin: 'https://www.linkedin.com/in/geno/',
        twitter: 'https://twitter.com/geno'
      }
    },
    popularity: 82
  },
  {
    title: 'A Developer Journal: Shipping the Next Generation Portfolio',
    slug: 'developer-journal-shipping-the-next-generation-portfolio',
    description: 'A build log for the Genofogu site, showing design choices, architecture, and future plans.',
    content: `# Shipping the Next Generation Portfolio

This build log captures the roadmap behind the Genofogu knowledge ecosystem.

## Why a blog now?

The portfolio is evolving into a learning hub, with content that spans AI, cloud, and engineering.

### Key goals

- Publish insights consistently
- Share technical learnings
- Keep the site fast and accessible

::: note
Every article should be easy to add and automatically surface across the site.
:::

## Architecture decisions

- Static data model in JavaScript
- Single source of truth for posts
- Reusable card + page components

### Next steps

- Add rich tagging
- Add article analytics
- Add newsletters and collections

**Reading time:** 4 min
`,
    category: 'Build Logs',
    tags: ['Build Logs', 'Software Engineering', 'Personal Learning'],
    coverImage: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1200&q=80',
    publishDate: '2026-07-10',
    updatedDate: '2026-07-11',
    readingTime: '4 min',
    difficulty: 'Beginner',
    featured: false,
    author: {
      name: 'Geno Futaba',
      role: 'Startup Builder',
      bio: 'Sharing the developer journey, architecture choices, and product learnings.',
      photo: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=240&q=80',
      socials: {
        github: 'https://github.com/geno',
        linkedin: 'https://www.linkedin.com/in/geno/',
        twitter: 'https://twitter.com/geno'
      }
    },
    popularity: 78
  }
];

export const categories = [
  'AI',
  'Machine Learning',
  'Data Science',
  'Python',
  'Java',
  'JavaScript',
  'React',
  'Cloud',
  'AWS',
  'GCP',
  'Docker',
  'Kubernetes',
  'SQL',
  'System Design',
  'DevOps',
  'Software Engineering',
  'Developer Tools',
  'Build Logs',
  'Research',
  'Personal Thoughts',
  'Career',
  'Interview Preparation',
  'Algorithms',
  'Operating Systems',
  'Computer Networks',
  'Database',
  'Projects',
  'Productivity',
  'Startup Journey'
];

export const getPostBySlug = (slug) => blogPosts.find((post) => post.slug === slug);
export const getPostsByCategory = (category) =>
  blogPosts.filter((post) => post.category.toLowerCase() === category.toLowerCase());
export const getFeaturedPosts = () => blogPosts.filter((post) => post.featured);
export const getRecentPosts = () => [...blogPosts].sort((a, b) => new Date(b.publishDate) - new Date(a.publishDate));
export const getPopularPosts = () => [...blogPosts].sort((a, b) => b.popularity - a.popularity);
export const getAllTags = () => Array.from(new Set(blogPosts.flatMap((post) => post.tags))).sort();
export const getRelatedPosts = (currentPost, limit = 3) =>
  blogPosts
    .filter((post) => post.slug !== currentPost.slug)
    .sort((a, b) => {
      const aScore = a.tags.filter((tag) => currentPost.tags.includes(tag)).length;
      const bScore = b.tags.filter((tag) => currentPost.tags.includes(tag)).length;
      return bScore - aScore || b.popularity - a.popularity;
    })
    .slice(0, limit);

export const getCategoryCounts = () =>
  categories.map((category) => ({
    category,
    count: blogPosts.filter((post) => post.category === category).length
  })).filter((item) => item.count > 0);
