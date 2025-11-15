'use client';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import { FiHeart, FiStar, FiCode, FiBook, FiMail, FiArrowUp, FiGithub, FiLinkedin, FiClock, FiTool, FiCheckCircle, FiMapPin, FiBriefcase } from 'react-icons/fi';
import { HiSparkles } from 'react-icons/hi';

const projects = [
  {
    title: 'AI-Powered Resume Optimization Tool',
    timeline: 'Spring 2025',
    tech: 'Python, Flask, spaCy, PyResparser, PostgreSQL, Snowflake, AWS (S3, Lambda), OpenAI GPT API',
    description: `This is a full-stack AI-driven web application designed to analyze resumes and job descriptions to enhance job seeker success. I built it to automate resume matching and optimize job application outcomes.\n\n• Used PyResparser and spaCy to extract skills, experiences, and metadata from resumes and job descriptions.\n• Developed an NLP-powered similarity engine (TF-IDF + cosine similarity) to calculate match scores between resumes and job listings.\n• Integrated OpenAI’s GPT API to provide personalized content improvement suggestions like keyword insertion, grammar improvements, and achievement phrasing.\n• Built the frontend in Flask and hosted the app using AWS Lambda and S3, enabling scalable performance.\n• Designed and managed PostgreSQL and Snowflake databases for structured data and user profiles.\n• Achieved over 85% skill extraction accuracy, with match suggestions and updates rendered in under 3 seconds.`,
    result: '🚀 Result: Provided users with actionable insights on resume improvement, matching their profiles to job posts more intelligently and quickly.'
  },
  {
    title: 'Automated Video Processing with YOLO & Custom OCR Engine',
    timeline: 'Summer 2024',
    tech: 'Python, YOLOv5, OpenCV, OCR, PostgreSQL, AWS S3, REST APIs',
    description: `This project focused on extracting container IDs from video frames for a logistics use case.\n\n• Integrated YOLOv5 object detection to detect bounding boxes of containers in real-time video footage.\n• Built a custom OCR engine using OpenCV + pytesseract to extract container numbers from the detected boxes.\n• Images were uploaded to AWS S3, processed via Python, and data extracted from the frames was formatted to JSON.\n• This data was transmitted to a remote server via REST APIs, and stored in a PostgreSQL database for tracking and analysis.`,
    result: '📦 Result: Automated what was once a manual data entry process for container tracking, saving hours of labor and reducing human error.'
  },
  {
    title: 'School Similarity Matching Model',
    timeline: 'Spring 2024',
    tech: 'Python, scikit-learn, pandas, KNN, K-means, t-SNE, cosine similarity',
    description: `Designed to help users discover similar schools based on academic and geographic data.\n\n• Cleaned and preprocessed a dataset of 300+ schools using pandas.\n• Engineered a similarity pipeline using KNN and cosine similarity to find schools that matched user preferences.\n• Applied K-means clustering to group similar institutions based on feature vectors.\n• Used t-SNE for dimensionality reduction and visual clustering to better understand relationships in data.`,
    result: '🎓 Result: Achieved 89% similarity accuracy, enabling useful data-driven recommendations for students or policy makers.'
  },
  {
    title: 'Data Visualization & Reporting for Coffee Shop Chain',
    timeline: 'Spring 2024',
    tech: 'Tableau, Power BI, Tableau Prep Builder, Excel',
    description: `Worked on visualizing and analyzing over 149,000+ transactions from a chain of coffee shops to uncover business insights.\n\n• Conducted ETL (Extract, Transform, Load) using Tableau Prep Builder and Power Query in Excel.\n• Created interactive dashboards in Power BI and Tableau that allowed slicing by revenue, region, products, time, and customer segments.\n• Included visual KPIs, weekly trends, anomalies, and performance summaries for management.`,
    result: '☕ Result: Helped stakeholders understand key revenue drivers and optimize product mix and inventory decisions.'
  },
  {
    title: 'Hotel Reservation System Database',
    timeline: 'Fall 2023',
    tech: 'PostgreSQL',
    description: `Built a fully relational hotel reservation database with robust backend functionality.\n\n• Designed multi-table schema to manage rooms, customers, bookings, payments, and services.\n• Developed stored procedures for automated operations like booking updates, check-ins, and cancellations.\n• Created triggers for auto-calculating revenue and room occupancy rates.\n• Optimized queries for reporting real-time statistics on revenue, occupancy, and guest history.`,
    result: '🏨 Result: Simulated a real-world backend for a hotel management system, improving operations and reporting accuracy.'
  },
  {
    title: 'SIDS Monitoring System (IoT Project)',
    timeline: 'Fall 2022',
    tech: 'Python, Raspberry Pi, sensors, Android App (MIT App Inventor)',
    description: `Developed a Sudden Infant Death Syndrome (SIDS) prevention system using IoT and mobile tech.\n\n• Integrated sensors on Raspberry Pi to monitor infant vital signs such as heartbeat and temperature.\n• Developed an Android app that connected with the device to display real-time data.\n• Built logic for anomaly detection and push alerts to caregivers during emergencies.\n• Implemented cloud data storage for historical data access.`,
    result: '👶 Result: Created a potentially life-saving product concept with real-time monitoring and alerting.'
  },
];

const skills = [
  {
    icon: '⚙️',
    title: 'Methodologies',
    tags: [
      'Agile (Scrum)', 'SDLC', 'A/B Testing', 'Statistical Analysis', 'Data Storytelling'
    ],
    color: 'skill-tag-pink',
  },
  {
    icon: '🧑‍💻',
    title: 'Programming & Scripting',
    tags: [
      'Python', 'NumPy', 'Pandas', 'Scikit-Learn', 'PyTorch', 'TensorFlow', 'spaCy', 'OpenCV', 'PyResparser',
      'R', 'SQL', 'Bash'
    ],
    color: 'skill-tag-lavender',
  },
  {
    icon: '🗂️',
    title: 'Data Engineering & Databases',
    tags: [
      'PostgreSQL', 'MySQL', 'Snowflake', 'Oracle', 'MongoDB', 'Databricks', 'Kafka', 'Hadoop',
      'Flask', 'FastAPI', 'REST APIs', 'ETL Pipelines', 'Apache Airflow', 'Data Warehousing', 'Data Lakes (AWS S3)'
    ],
    color: 'skill-tag-peach',
  },
  {
    icon: '☁️',
    title: 'Cloud & DevOps',
    tags: [
      'AWS (S3, Lambda, Redshift, EMR, Kinesis, Firehose, IAM, SageMaker)', 'Microsoft Azure', 'Docker', 'Git', 'GitHub'
    ],
    color: 'skill-tag-pink',
  },
  {
    icon: '🧠',
    title: 'Machine Learning & AI',
    tags: [
      'Supervised & Unsupervised Learning', 'Feature Engineering', 'Regression', 'Random Forest', 'XGBoost', 'Gradient Boosting',
      'KNN', 'K-Means Clustering', 't-SNE', 'PCA', 'CNN Modeling', 'Anomaly Detection'
    ],
    color: 'skill-tag-lavender',
  },
  {
    icon: '💬',
    title: 'Natural Language Processing',
    tags: [
      'LLMs', 'Prompt Engineering', 'LangChain', 'OpenAI GPT APIs', 'spaCy', 'PyResparser', 'TF-IDF',
      'Cosine Similarity', 'Knowledge Graphs', 'NER'
    ],
    color: 'skill-tag-peach',
  },
  {
    icon: '📊',
    title: 'Statistical & Analytical Modeling',
    tags: [
      'Hypothesis Testing', 'Regression Analysis', 'Time Series Forecasting', 'A/B Testing',
      'ANOVA', 'Chi-Square', 'T-Test', 'Correlation Analysis'
    ],
    color: 'skill-tag-pink',
  },
  {
    icon: '📈',
    title: 'Data Visualization & BI',
    tags: [
      'Tableau', 'Power BI', 'Tableau Prep Builder', 'SSIS', 'Matplotlib', 'Seaborn', 'ggplot2',
      'Advanced Excel (Pivot, VLOOKUP, Macros)'
    ],
    color: 'skill-tag-lavender',
  },
];

const experiences = [
  {
    company: 'Blue Cross Blue Shield',
    role: 'Data Analyst',
    duration: 'August 2024 – Present',
    location: 'USA',
    focus: 'Healthcare Analytics, Machine Learning, HIPAA Compliance, ETL Workflows, Predictive Modeling, Data Visualization',
    icon: '🏥',
    projects: [
      {
        name: 'Medicare Advantage Patient Risk Prediction & Churn Analysis',
        color: 'bg-blue-50',
        goal: 'Analyze de-identified EHRs and billing data to identify factors contributing to patient churn and disengagement across 50 states.',
        contributions: [
          'Led a HIPAA-compliant, cross-functional project analyzing electronic health records (EHRs), billing systems, and patient interaction datasets.',
          'Designed and maintained ETL workflows using SSIS to extract, transform, and load large-scale clinical and administrative datasets into AWS S3, ensuring data integrity and compliance.',
          'Developed and fine-tuned multi-algorithm patient risk prediction models using Logistic Regression, Random Forest, and XGBoost, achieving 90% accuracy.',
          'Conducted rigorous model evaluation using cross-validation, AUC-ROC curves, precision-recall analysis, and confusion matrices, increasing predictive reliability by 2%.',
          'Implemented data versioning and model monitoring in AWS S3 and SageMaker, tracking data lineage, detecting model drift, and enabling automated retraining.',
          'Built comprehensive Power BI dashboards visualizing patient risk trends, disease progression, and intervention effectiveness for 25+ healthcare stakeholders.'
        ],
        impact: '📊 Impact: Provided actionable insights on high-risk patient segments, influencing strategic care decisions and reducing patient churn.'
      }
    ]
  },
  {
    company: 'Accenture',
    role: 'Data Analyst',
    duration: 'April 2021 – January 2023',
    location: 'India',
    focus: 'Inventory Optimization, Demand Forecasting, Machine Learning, ETL Pipelines, Statistical Analysis, Data Visualization',
    icon: '📦',
    projects: [
      {
        name: 'SKU-Level Demand Forecasting & Inventory Optimization',
        color: 'bg-purple-50',
        goal: 'Improve inventory planning by forecasting demand patterns for 100,000+ SKUs using machine learning.',
        contributions: [
          'Analyzed historical sales and inventory data of 100,000+ SKUs to identify demand patterns, seasonality, and key factors influencing stock levels, leading to a 15–20% improvement in inventory planning.',
          'Executed ETL pipelines using Python (Pandas, NumPy) and SQL, automating data preprocessing, cleaning, and feature engineering for 20+ variables, reducing manual effort by 80%.',
          'Conducted variable transformations, correlation analysis, and statistical tests (ANOVA, Chi-Square, U-Test, T-Test) to uncover relationships between sales, promotions, and supply constraints.',
          'Developed Machine Learning models (Linear Regression, Random Forest, Gradient Boosting) to forecast SKU-level demand, achieving predictive accuracy of 86.3%.',
          'Optimized model performance using Grid Search, Random Search, and PCA, improving overall forecast accuracy by 8%.',
          'Performed A/B testing on promotional strategies and inventory interventions to evaluate their impact on sales and stock efficiency.',
          'Deployed forecasting models via FastAPI/Flask, enabling batch-wise inventory predictions for 20k+ SKUs per quarter.',
          'Built interactive Tableau dashboards visualizing forecasted demand, stock levels, and reorder alerts for 25+ stakeholders.'
        ],
        impact: '🎯 Impact: Drove actionable insights for procurement and supply chain planning, optimizing inventory efficiency and reducing stockouts.'
      }
    ]
  }
];

export default function Home() {
  const [showBackToTop, setShowBackToTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 400);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <main className="min-h-screen pt-16">
      {/* Hero Section */}
      <section className="min-h-[calc(100vh-4rem)] flex items-center justify-center relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/pattern.svg')] opacity-5"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <div className="mb-8 relative mx-auto w-48 h-48 rounded-full overflow-hidden border-4 border-white shadow-lg animate-float">
            <Image
              src="/profile.JPG"
              alt="Jahnavi Singh"
              fill
              className="object-cover object-top"
              priority
            />
          </div>
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent">
            Jahnavi Singh
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 mb-4 flex items-center justify-center gap-2">
            <HiSparkles className="text-pink-400" />
            Data Analyst | 3.5 Years Experience
            <HiSparkles className="text-pink-400" />
          </p>
          <div className="flex items-center justify-center gap-4 mb-8 text-gray-600">
            <a href="mailto:jahnavisingh6@gmail.com" className="hover:text-pink-400 transition-colors">
              jahnavisingh6@gmail.com
            </a>
            <span>•</span>
            <a href="tel:+16025743737" className="hover:text-pink-400 transition-colors">
              (602) 574-3737
            </a>
          </div>
          <div className="flex justify-center gap-4">
            <a
              href="https://linkedin.com/in/jahnavisingh6"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 rounded-full bg-white/80 hover:bg-pink-50 transition-all duration-300"
            >
              <FiLinkedin className="w-6 h-6 text-gray-600 hover:text-pink-400" />
            </a>
            <a
              href="https://github.com/jahnavisingh6"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 rounded-full bg-white/80 hover:bg-pink-50 transition-all duration-300"
            >
              <FiGithub className="w-6 h-6 text-gray-600 hover:text-pink-400" />
            </a>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 bg-white/50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="section-title">
            <FiHeart className="section-title-icon" />
            About Me
          </h2>
          <div className="card">
            <p className="text-lg text-gray-600 leading-relaxed mb-4">
              Data Analyst with <strong>3.5 years of experience</strong> in data analytics, predictive modeling, machine learning, data visualization, and cloud computing. Currently pursuing my Master's in Information Technology at Arizona State University (GPA: 3.87/4.0).
            </p>
            <p className="text-lg text-gray-600 leading-relaxed mb-4">
              Proficient in Python, SQL, Tableau, Power BI, AWS, and Azure to drive data-driven decision-making. Skilled in ETL pipeline development, statistical analysis, and building scalable ML models.
            </p>
            <p className="text-lg text-gray-600 leading-relaxed">
              <strong>Key Achievements:</strong> Managed datasets exceeding 1M+ records, deployed 20+ machine learning models to improve forecasting and operational efficiency, optimized workflows to reduce data processing time by 30%, and built 11+ interactive dashboards that delivered actionable insights to business stakeholders.
            </p>
          </div>
        </div>
      </section>

      {/* Education Section */}
      <section id="education" className="py-20 bg-white/50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="section-title">
            <span className="text-2xl">🏫</span> Education
          </h2>
          <div className="flex flex-col gap-8">
            {/* ASU */}
            <div className="card bg-purple-50">
              <h3 className="text-lg font-semibold mb-1">Arizona State University</h3>
              <div className="text-pink-500 mb-1">Master of Science in Information Technology<br/>(Information Systems Management)</div>
              <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
                <span>📍 Tempe, AZ</span> <span>—</span> <span>Expected May 2025</span> <span>—</span> <span>GPA: 3.87/4.0</span>
              </div>
              <div className="text-sm text-purple-600 font-semibold mb-1">Relevant Coursework:</div>
              <ul className="list-disc list-inside text-gray-600 text-sm space-y-1">
                <li>Advanced Big Data Analytics & AI</li>
                <li>Analyzing Big Data</li>
                <li>Natural Language Processing</li>
                <li>Cloud Architecture</li>
                <li>Data Visualization & Reporting</li>
                <li>Advanced DBMS</li>
                <li>Information Systems Development</li>
              </ul>
            </div>
            {/* SIT */}
            <div className="card bg-pink-50">
              <h3 className="text-lg font-semibold mb-1">Symbiosis Institute of Technology</h3>
              <div className="text-pink-500 mb-1">B.Tech. in Electronics & Telecommunications</div>
              <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
                <span>📍 Pune, India</span> <span>—</span> <span>Graduated May 2023</span> <span>—</span> <span>GPA: 3.5/4.0</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="section-title">
            <FiStar className="section-title-icon" />
            Technical Skills
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {skills.map((group, idx) => (
              <div key={group.title} className="card">
                <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                  <span className="text-2xl">{group.icon}</span> {group.title}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {group.tags.map((skill, i) => (
                    <span key={i} className={`skill-tag ${group.color}`}>{skill}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" className="py-20 bg-white/50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="section-title">
            <FiCode className="section-title-icon" />
            Experience
          </h2>
          <div className="space-y-12">
            {experiences.map((exp, idx) => (
              <div key={exp.company} className="relative">
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-2xl">{exp.icon}</span>
                  <h3 className="text-xl font-semibold text-gray-800 mb-0">{exp.company}</h3>
                </div>
                <div className="flex flex-wrap gap-4 text-sm text-pink-500 mb-2 items-center">
                  <FiBriefcase /> <span>{exp.role}</span>
                  <FiClock /> <span>{exp.duration}</span>
                  <FiMapPin /> <span>{exp.location}</span>
                </div>
                <div className="text-xs text-purple-500 mb-4">Focus: {exp.focus}</div>
                <div className="space-y-8">
                  {exp.projects.map((proj, pidx) => (
                    <div key={proj.name} className={`rounded-xl p-6 shadow-sm border-l-4 ${proj.color} border-pink-200`}>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-lg">{exp.icon}</span>
                        <span className="font-semibold text-gray-700">{proj.name}</span>
                      </div>
                      <div className="text-sm text-gray-500 mb-2 italic">Goal: {proj.goal}</div>
                      <ul className="list-disc list-inside text-gray-600 mb-2 space-y-1">
                        {proj.contributions.map((c, i) => (
                          <li key={i}>{c}</li>
                        ))}
                      </ul>
                      <div className="text-green-600 font-medium flex items-center gap-2">
                        <FiCheckCircle className="text-green-400" />
                        <span>{proj.impact}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="section-title">
            <FiBook className="section-title-icon" />
            Projects
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {projects.map((project, idx) => (
              <div key={project.title} className="card relative">
                <div className="flex items-center gap-2 mb-2">
                  <FiBook className="text-pink-400" />
                  <h3 className="text-xl font-semibold text-gray-800 mb-0">{project.title}</h3>
                </div>
                <div className="flex items-center gap-2 text-sm text-pink-500 mb-2">
                  <FiClock />
                  <span>{project.timeline}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-purple-500 mb-2">
                  <FiTool />
                  <span>{project.tech}</span>
                </div>
                <div className="text-gray-600 whitespace-pre-line mb-2">
                  {project.description}
                </div>
                <div className="text-green-600 font-medium flex items-center gap-2">
                  <FiCheckCircle className="text-green-400" />
                  <span>{project.result}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-white/50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="section-title">
            <FiMail className="section-title-icon" />
            Let's Connect
          </h2>
          <div className="card">
            <form className="space-y-6">
              <div>
                <label className="block text-gray-700 mb-2" htmlFor="name">Name</label>
                <input
                  type="text"
                  id="name"
                  className="input-field"
                  placeholder="Your name"
                  required
                />
              </div>
              <div>
                <label className="block text-gray-700 mb-2" htmlFor="email">Email</label>
                <input
                  type="email"
                  id="email"
                  className="input-field"
                  placeholder="your.email@example.com"
                  required
                />
              </div>
              <div>
                <label className="block text-gray-700 mb-2" htmlFor="message">Message</label>
                <textarea
                  id="message"
                  rows={4}
                  className="input-field"
                  placeholder="Write your message here..."
                  required
                ></textarea>
              </div>
              <button
                type="submit"
                className="w-full py-3 px-6 rounded-xl bg-gradient-to-r from-pink-400 to-purple-400
                text-white font-medium hover:from-purple-400 hover:to-pink-400 transition-all duration-300
                hover:shadow-lg shadow-pink-200/50 flex items-center justify-center gap-2"
              >
                <FiHeart className="w-5 h-5" />
                Send Message
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Back to Top Button */}
      {showBackToTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 bg-pink-400 text-white rounded-full p-3 shadow-lg
          hover:bg-pink-500 transition-all duration-300 hover:scale-110 z-50"
          aria-label="Back to top"
        >
          <FiArrowUp className="w-6 h-6" />
        </button>
      )}
    </main>
  );
}
