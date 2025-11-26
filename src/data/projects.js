// src/data/projects.js

// This array is your single source of truth for all project data.
export const projectsData = [
  {
    slug: 'predictive-churn-model',
    title: "Predictive Customer Churn Model",
    subtitle: "Machine Learning & Business Strategy",
    heroImage: "/path/to/your/image1.jpg", // We'll add real images later
    tags: ["Python", "Scikit-learn", "Pandas"],
    summary: "Developed a machine learning model to predict customer churn with 88% accuracy, enabling proactive retention campaigns and reducing revenue loss.",
    
    // --- DETAILED CONTENT (using Markdown-like arrays) ---
    sections: [
      {
        title: "The Challenge",
        content: [
          "The company was experiencing a higher-than-average customer churn rate, but lacked the tools to identify at-risk customers before they left. The primary goal was to create a data-driven system to proactively address this issue."
        ]
      },
      {
        title: "My Process & Solution",
        content: [
          "I began by performing an exploratory data analysis (EDA) on a large dataset of customer behavior, identifying key features correlated with churn. These included metrics like usage frequency, support ticket history, and plan type.",
          "Using these features, I trained several classification models, ultimately selecting a Logistic Regression model for its high accuracy and interpretability.",
          "The final deliverable was a Python script that could process new customer data and output a 'churn probability score,' which was then integrated into the company's CRM for the marketing team."
        ]
      },
      {
        title: "Key Outcomes",
        content: [
          "**88% prediction accuracy** in identifying customers likely to churn within the next 30 days.",
          "Enabled a targeted retention campaign that **reduced overall churn by 12%** in the first quarter.",
          "Provided a scalable framework that could be retrained and improved as new data became available."
        ]
      }
    ]
  },
  {
    slug: 'sales-forecasting-engine',
    title: "Sales Forecasting Engine",
    subtitle: "Time-Series Analysis & Inventory Management",
    heroImage: "/path/to/your/image2.jpg",
    tags: ["R", "Time-Series", "ARIMA"],
    summary: "Built a time-series forecasting model to predict quarterly sales, improving inventory management and reducing overhead by 15%.",
    sections: [
      // ... Add detailed sections for this project here ...
    ]
  },
  // Add your other projects here...
];