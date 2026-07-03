export const MAGAZINE_CONTENT = {
  title: "Larksois Magazine",
  recentArticles: "Recent Articles",
  noRecentArticles: "No recent articles yet.",
  readMore: "Read More ->",
  previous: "Previous",
  next: "Next",
  page: "Page",
  of: "of",
  categories: {
    health: "Health",
    news: "News",
  },
};

export const MAGAZINE_ARTICLES = [
  {
    slug: "gene-therapy-emerging-science",
    title: "How Gene Therapy Is Transforming Modern Treatment",
    excerpt:
      "Gene therapy is moving from concept to clinic, offering targeted ways to correct genetic issues instead of only managing symptoms.",
    date: "May 13, 2024",
    readTime: "7-9 min read",
    image: "/images/article/gene-therapy.jpg",
    tag: "health",
    heroCaption:
      "Gene therapy looks at disease from the level of DNA, aiming to correct or adjust the instructions that cells follow.",
    sections: [
      {
        heading: "What is gene therapy?",
        paragraphs: [
          "Inside almost every cell of the body, DNA carries the instructions for how that cell should function. When part of this instruction manual is damaged, missing or altered, disease can appear.",
          "Gene therapy focuses on these faulty sections and aims to repair, replace or adjust the genetic material.",
        ],
      },
      {
        subheading: "Main approaches",
        paragraphs: [
          "In simple terms, gene therapy can:",
          "- Add a working copy of a missing or broken gene",
          "- Reduce or silence a harmful gene",
          "- Edit the DNA sequence using modern gene-editing tools",
        ],
      },
      {
        subheading: "1. Gene augmentation",
        paragraphs: [
          "Some diseases occur because a key gene is missing or not working properly. Adding a healthy copy can help restore cell function.",
        ],
      },
      {
        subheading: "2. Gene inhibition",
        paragraphs: [
          "In other diseases, the issue is a gene that is too active or producing something harmful. Gene inhibition strategies aim to reduce or block this activity.",
        ],
      },
      {
        subheading: "3. Gene editing",
        paragraphs: [
          "Tools like CRISPR act like molecular scissors, allowing scientists to cut DNA at precise locations and correct mutations or insert new material.",
        ],
      },
      {
        heading: "How digital tools support gene therapy",
        paragraphs: [
          "Gene therapy research generates huge amounts of data. AI helps analyse this information and support decisions about which patients may benefit most.",
        ],
      },
      {
        heading: "Where gene therapy is used today",
        paragraphs: [
          "Approved gene therapies currently focus on rare inherited diseases. Research is expanding into oncology, cardiovascular medicine and neurology.",
        ],
      },
      {
        heading: "Potential benefits",
        paragraphs: [
          "- Addresses the root cause of disease",
          "- Can offer long-lasting or one-time treatments",
          "- Provides precise targeting of cells or tissues",
          "- Creates new options where standard therapies are limited",
        ],
      },
      {
        heading: "Points to watch",
        paragraphs: [
          "- Unintended changes elsewhere in the genome",
          "- Possible immune reactions",
          "- Complex, high-cost manufacturing",
          "- Need for long-term safety monitoring",
        ],
      },
      {
        heading: "Ethics and the future",
        paragraphs: [
          "Because gene therapy modifies core biological instructions, it raises important questions about access, fairness and long-term safety.",
          "As delivery methods improve, gene therapy is expected to become part of mainstream medical care.",
        ],
      },
    ],
  },
  {
    slug: "power-of-ai-medical-industry",
    title: "The Power of AI in the Medical Industry: 4 Things to Know",
    excerpt:
      "Artificial intelligence is reshaping diagnostics, workflows and decision-making across hospitals and pharma companies.",
    date: "May 11, 2024",
    readTime: "6-8 min read",
    image: "/images/article/ai-medicine.jpg",
    tag: "health",
    heroCaption:
      "Artificial intelligence helps turn complex medical and pharmaceutical data into faster, more informed decisions.",
    sections: [
      {
        heading: "The impact of AI in medicine",
        paragraphs: [
          "Artificial intelligence is becoming one of the most important tools in modern healthcare. It can analyse thousands of data points at once and highlight patterns that humans may miss.",
          "In hospitals and the pharmaceutical industry, AI supports decision-making, improves diagnostics and streamlines workflows.",
        ],
      },
      {
        heading: "AI in the pharmaceutical industry",
        paragraphs: [
          "Pharma relies heavily on data - chemical libraries, biological experiments, clinical trials and safety signals. AI connects these information streams and accelerates research.",
          "- Virtual screening for drug discovery",
          "- Simulation of formulations and processes",
          "- Predictive modelling for safety assessment",
        ],
      },
      {
        heading: "AI in pharma marketing",
        paragraphs: [
          "AI makes marketing more data-driven by tailoring communication to real information needs.",
          "- More precise audience segmentation",
          "- Personalised content",
          "- Better understanding of what drives behaviour",
        ],
      },
      {
        heading: "AI in healthcare systems and hospitals",
        paragraphs: [
          "AI analyses lab results, imaging, vital signs and history to identify urgent risks or guide treatment adjustments.",
          "- Imaging support for radiologists",
          "- Risk prediction tools",
          "- Virtual assistants for patient support",
        ],
      },
      {
        heading: "The future of AI in medicine",
        paragraphs: [
          "AI will play a major role in precision medicine by helping tailor treatments to each individual's genetics and risk profile.",
        ],
      },
      {
        heading: "Why AI matters",
        paragraphs: [
          "For patients: earlier detection, personalised treatment and better outcomes.",
          "For pharma and providers: smarter use of existing data and better efficiency.",
        ],
      },
    ],
  },
  {
    slug: "personalized-medicine-basics",
    title: "Personalized Medicine: Treatments Tailored to Each Patient",
    excerpt:
      "By using genetics, biomarkers and clinical data, personalized medicine aims to choose the right treatment for the right person at the right time.",
    date: "March 3, 2024",
    readTime: "6-8 min read",
    image: "/images/article/personalized-medicine.jpg",
    tag: "health",
    heroCaption:
      "Personalized medicine combines genetics, clinical data and lifestyle information to tailor treatment to each patient.",
    sections: [
      {
        heading: "What is personalized medicine?",
        paragraphs: [
          "Personalized medicine moves healthcare away from a one-size-fits-all model and tailors treatments to each individual.",
          "Advances in genomic sequencing show why two patients with the same condition may respond differently to the same therapy.",
        ],
      },
      {
        heading: "Genetic engineering and precision medicine",
        paragraphs: [
          "Modern DNA sequencing helps identify genetic variations linked to disease, response to drugs or risk of side effects.",
        ],
      },
      {
        heading: "Benefits of personalized medicine",
        paragraphs: [
          "- More precise treatments with higher chances of response",
          "- Proactive, preventive healthcare",
          "- Better allocation of medical resources",
          "- Innovation in diagnostics and targeted therapies",
        ],
      },
      {
        heading: "Challenges and responsibilities",
        paragraphs: [
          "- Data privacy and protection of genetic information",
          "- Ensuring equitable access",
          "- Clear regulatory frameworks",
          "- Interoperability between healthcare systems",
        ],
      },
      {
        heading: "Looking ahead",
        paragraphs: [
          "As sequencing becomes more accessible, personalized medicine will become a central part of modern healthcare.",
        ],
      },
    ],
  },
  {
    slug: "what-is-obesity-how-to-overcome-it",
    title: "What Is Obesity - and How Do You Really Overcome It?",
    excerpt:
      "Obesity is influenced by biology, environment and lifestyle. Long-term management needs structure, not just short diets.",
    date: "March 9, 2024",
    readTime: "6-8 min read",
    image: "/images/article/obesity.jpg",
    tag: "health",
    heroCaption:
      "Obesity is influenced by biology, environment and lifestyle. Long-term management requires structure, not just short diets.",
    sections: [
      {
        heading: "Why obesity happens",
        paragraphs: [
          "Diet and exercise matter, but they are only part of the story. Biological factors, sleep, stress, medications and social environment all contribute significantly.",
        ],
      },
      {
        heading: "Health risks associated with obesity",
        paragraphs: [
          "- Higher risk of type 2 diabetes and insulin resistance",
          "- Increased likelihood of high blood pressure and heart disease",
          "- Sleep apnea, joint pain and certain cancers",
          "- Impact on mental health, including self-esteem and depression",
        ],
      },
      {
        heading: "Approaching weight management realistically",
        paragraphs: [
          "Sustainable weight management is not about extreme diets or quick fixes. It requires a balanced, long-term plan.",
          "- Enjoyable, balanced nutrition rather than strict rules",
          "- Regular physical activity that is manageable and sustainable",
          "- Managing sleep, stress and emotional eating triggers",
          "- Medication or surgery where appropriate, under clinical guidance",
        ],
      },
      {
        heading: "Long-term support matters",
        paragraphs: [
          "Because obesity is a chronic condition, long-term support helps maintain progress.",
          "The goal is not perfection - but steady, consistent improvements over time.",
        ],
      },
    ],
  },
  {
    slug: "international-womens-day-healthcare",
    title: "In Honor of International Women's Day",
    excerpt:
      "Women scientists, clinicians and leaders drive critical advances in healthcare. Recognizing their work is part of building a better system.",
    date: "February 21, 2024",
    readTime: "5-7 min read",
    image: "/images/article/womens-day.jpg",
    tag: "news",
    heroCaption:
      "International Women's Day is a moment to celebrate women's achievements and to focus on closing gaps in women's health.",
    sections: [
      {
        heading: "Women's health challenges",
        paragraphs: [
          "Across many countries, women face a combination of obstacles:",
          "- Limited access to reproductive and maternal healthcare",
          "- Under-diagnosis or delayed diagnosis of chronic diseases such as heart disease",
          "- Cultural pressures and discrimination that make accessing care more difficult",
        ],
      },
      {
        heading: "Diseases that disproportionately affect women",
        paragraphs: [
          "Certain conditions strongly influence women's health outcomes.",
          "- Breast cancer and cervical cancer, where screening can significantly improve survival",
          "- Maternal complications during pregnancy and childbirth",
          "- Chronic conditions that may present differently in women, leading to misdiagnosis",
        ],
      },
      {
        heading: "Promoting women's health: key levers",
        paragraphs: [
          "- Improving access to essential services: maternity care, contraception, screening",
          "- Investing in education, economic empowerment and access to reliable information",
          "- Encouraging research that includes women in sufficient numbers",
          "- Strengthening public health policies that protect reproductive rights and ensure access to care",
        ],
      },
      {
        heading: "A commitment beyond one day",
        paragraphs: [
          "International Women's Day is a reminder, not a single event. Reducing gaps in women's health requires consistent and long-term commitment.",
          "For Larksois Pharma, prioritizing women's health means designing medicines, communication and programs with women's unique needs in mind.",
        ],
      },
    ],
  },
  {
    slug: "diabetes-kidney-disease-6",
    title: "Does Diabetes Increase the Risk of Kidney Disease?",
    excerpt:
      "Chronically high blood sugar can damage the tiny blood vessels in the kidneys. Understanding this link early matters.",
    date: "December 4, 2023",
    readTime: "5-7 min read",
    image: "/images/article/diabetes-kidney-1.jpg",
    tag: "health",
    heroCaption:
      "Diabetes is one of the most important risk factors for chronic kidney disease, especially when blood sugar and blood pressure remain high over time.",
    sections: [
      {
        heading: "How diabetes affects the kidneys",
        paragraphs: [
          "High blood sugar damages the kidney's filtering units, called glomeruli. Over time, they become leaky and allow proteins like albumin to pass into the urine.",
          "High blood pressure and inflammation add additional strain and worsen the damage.",
        ],
      },
      {
        heading: "Warning signs",
        paragraphs: [
          "- Swelling in the legs, ankles or around the eyes",
          "- Foamy or bubbly urine (a sign of protein loss)",
          "- Increasing difficulty controlling blood pressure",
          "- Fatigue, poor appetite or difficulty focusing",
        ],
      },
      {
        heading: "The role of screening",
        paragraphs: [
          "Urine tests for albumin and blood tests for creatinine and eGFR can detect kidney damage long before severe symptoms appear.",
        ],
      },
      {
        heading: "Protecting the kidneys",
        paragraphs: [
          "- Keeping blood sugar within target range",
          "- Strict blood pressure control, often with ACE inhibitors or ARBs",
          "- Healthy lifestyle habits: nutrition, exercise, good sleep and not smoking",
        ],
      },
      {
        heading: "A message of prevention and partnership",
        paragraphs: [
          "Diabetes does increase the risk of kidney disease - but the risk is not fixed.",
          "With early detection, proper management and strong collaboration with healthcare teams, kidney function can be protected for much longer.",
        ],
      },
    ],
  },
];

export function getMagazineArticleBySlug(slug) {
  return MAGAZINE_ARTICLES.find((article) => article.slug === slug) || null;
}

export function getMagazineArticlesByCategory(category) {
  return MAGAZINE_ARTICLES.filter((article) => article.tag === category);
}
