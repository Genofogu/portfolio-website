export const projectsData = [
  {
    slug: 'vespera',
    title: "Vespera",
    subtitle: "AI-Powered Daily Productivity Companion",
    heroImage: "/placeholders/vespera-bg.png",
    category: "AI Systems",
    tags: ["React", "Express", "OpenAI", "Supabase", "SCSS"],
    summary: "Built an intelligent productivity hub featuring automated daily goal generation, habit tracking, and responsive scheduling to maximize focus.",
    githubUrl: "https://github.com/genofogu/vespera",
    liveUrl: "https://vespera.app",
    sections: [
      {
        title: "The Vision",
        content: [
          "Vespera was born from the need to unify disjointed productivity tools. The goal was to build a single hub that not only tracks tasks but actively helps plan them using AI."
        ]
      },
      {
        title: "Architecture & Implementation",
        content: [
          "The frontend is built with React and Vite for optimal performance, utilizing SCSS for a futuristic, immersive glassmorphic design.",
          "The backend relies on Supabase for real-time data sync and authentication, passing context to OpenAI's API to generate personalized daily action plans based on the user's past performance."
        ]
      },
      {
        title: "Features & Outcomes",
        content: [
          "Seamless authentication and real-time database.",
          "AI-driven task breakdown algorithms.",
          "Immersive UI leading to 40% higher daily completion rates in beta testing."
        ]
      }
    ]
  },
  {
    slug: 'rag-knowledge-assistant',
    title: "RAG Knowledge Assistant",
    subtitle: "Retrieval-Augmented Generation Chatbot",
    heroImage: "/placeholders/rag-bg.png",
    category: "AI Systems",
    tags: ["Python", "LangChain", "Pinecone", "HuggingFace"],
    summary: "Developed a context-aware AI assistant capable of answering questions based on proprietary document embeddings injected into the LLM context window.",
    githubUrl: "https://github.com/genofogu/rag-assistant",
    liveUrl: "#",
    sections: [
      {
        title: "The Challenge",
        content: [
          "Standard LLMs hallucinate when asked about proprietary company data. This project solves that by integrating a vector database for semantic search."
        ]
      },
      {
        title: "Implementation",
        content: [
          "PDFs and text documents are parsed, chunked, and embedded using HuggingFace models.",
          "Pinecone stores the vectors. When a user asks a query, the most relevant chunks are retrieved and passed to the LLM via LangChain to formulate a grounded response."
        ]
      }
    ]
  },
  {
    slug: 'ai-search-engine',
    title: "AI Search Engine",
    subtitle: "Semantic Document Retrieval System",
    heroImage: "/placeholders/search-bg.png",
    category: "AI Systems",
    tags: ["Python", "FastAPI", "React", "Elasticsearch"],
    summary: "A robust semantic search engine that understands intent rather than just keywords, processing millions of tokens in milliseconds.",
    githubUrl: "https://github.com/genofogu",
    liveUrl: "#",
    sections: []
  },
  {
    slug: 'travel-recommendation-platform',
    title: "Travel Recommendation Platform",
    subtitle: "Machine Learning Personalization",
    heroImage: "/placeholders/travel-bg.png",
    category: "Data Science",
    tags: ["Python", "Scikit-learn", "Pandas", "Flask"],
    summary: "Engineered a collaborative filtering recommendation system that suggests custom travel itineraries based on user preference clustering.",
    githubUrl: "https://github.com/genofogu",
    liveUrl: "#",
    sections: []
  },
  {
    slug: 'predictive-churn-model',
    title: "Enterprise MLOps Churn System",
    subtitle: "End-to-End ML Pipeline",
    heroImage: "/placeholders/churn-bg.png",
    category: "Data Science",
    tags: ["Python", "Docker", "MLflow", "AWS"],
    summary: "An optimized MLOps pipeline for predicting customer churn, featuring automated model retraining, experiment tracking, and high-availability deployment.",
    githubUrl: "https://github.com/genofogu/churn-prediction",
    liveUrl: "#",
    sections: []
  },
  {
    slug: 'cloud-infrastructure',
    title: "Cloud Deployment Architectures",
    subtitle: "AWS & GCP Scalable Infrastructure",
    heroImage: "/placeholders/cloud-bg.png",
    category: "Cloud",
    tags: ["Terraform", "AWS", "GCP", "Docker", "CI/CD"],
    summary: "Designed and deployed scalable, load-balanced containerized applications across AWS and GCP using infrastructure-as-code principles.",
    githubUrl: "https://github.com/genofogu",
    liveUrl: "#",
    sections: []
  }
];