'use client';
import { useState, useEffect, FormEvent } from 'react';
import Image from 'next/image';
import { FiHeart, FiStar, FiCode, FiBook, FiMail, FiArrowUp, FiGithub, FiLinkedin, FiClock, FiTool, FiCheckCircle, FiMapPin, FiBriefcase } from 'react-icons/fi';
import { HiSparkles } from 'react-icons/hi';
import emailjs from '@emailjs/browser';
import StatsCounter from './components/StatsCounter';
import SkillBar from './components/SkillBar';
import Timeline from './components/Timeline';

const projects = [
  {
    title: 'AI-Powered Resume Optimization Tool',
    timeline: 'Spring 2025',
    tech: 'Python, Flask, spaCy, PyResparser, PostgreSQL, Snowflake, AWS (S3, Lambda), OpenAI GPT API',
    metrics: [
      { label: 'Accuracy', value: '85%', icon: '🎯' },
      { label: 'Response Time', value: '<3s', icon: '⚡' },
    ],
    description: `This is a full-stack AI-driven web application designed to analyze resumes and job descriptions to enhance job seeker success. I built it to automate resume matching and optimize job application outcomes.\n\n• Used PyResparser and spaCy to extract skills, experiences, and metadata from resumes and job descriptions.\n• Developed an NLP-powered similarity engine (TF-IDF + cosine similarity) to calculate match scores between resumes and job listings.\n• Integrated OpenAI's GPT API to provide personalized content improvement suggestions like keyword insertion, grammar improvements, and achievement phrasing.\n• Built the frontend in Flask and hosted the app using AWS Lambda and S3, enabling scalable performance.\n• Designed and managed PostgreSQL and Snowflake databases for structured data and user profiles.\n• Achieved over 85% skill extraction accuracy, with match suggestions and updates rendered in under 3 seconds.`,
    result: '🚀 Result: Provided users with actionable insights on resume improvement, matching their profiles to job posts more intelligently and quickly.'
  },
  {
    title: 'School Similarity Matching Model',
    timeline: 'Spring 2024',
    tech: 'Python, scikit-learn, pandas, KNN, K-means, t-SNE, cosine similarity',
    metrics: [
      { label: 'Accuracy', value: '89%', icon: '🎯' },
      { label: 'Schools', value: '300+', icon: '🏫' },
    ],
    description: `Designed to help users discover similar schools based on academic and geographic data.\n\n• Cleaned and preprocessed a dataset of 300+ schools using pandas.\n• Engineered a similarity pipeline using KNN and cosine similarity to find schools that matched user preferences.\n• Applied K-means clustering to group similar institutions based on feature vectors.\n• Used t-SNE for dimensionality reduction and visual clustering to better understand relationships in data.`,
    result: '🎓 Result: Achieved 89% similarity accuracy, enabling useful data-driven recommendations for students or policy makers.'
  },
  {
    title: 'Data Visualization & Reporting for Coffee Shop Chain',
    timeline: 'Spring 2024',
    tech: 'Tableau, Power BI, Tableau Prep Builder, Excel',
    metrics: [
      { label: 'Transactions', value: '149K+', icon: '📊' },
      { label: 'Dashboards', value: '11+', icon: '📈' },
    ],
    description: `Worked on visualizing and analyzing over 149,000+ transactions from a chain of coffee shops to uncover business insights.\n\n• Conducted ETL (Extract, Transform, Load) using Tableau Prep Builder and Power Query in Excel.\n• Created interactive dashboards in Power BI and Tableau that allowed slicing by revenue, region, products, time, and customer segments.\n• Included visual KPIs, weekly trends, anomalies, and performance summaries for management.`,
    result: '☕ Result: Helped stakeholders understand key revenue drivers and optimize product mix and inventory decisions.'
  },
  {
    title: 'Hotel Reservation System Database',
    timeline: 'Fall 2023',
    tech: 'PostgreSQL',
    metrics: [
      { label: 'Tables', value: 'Multi-table', icon: '🗄️' },
      { label: 'Automation', value: 'Triggers', icon: '⚙️' },
    ],
    description: `Built a fully relational hotel reservation database with robust backend functionality.\n\n• Designed multi-table schema to manage rooms, customers, bookings, payments, and services.\n• Developed stored procedures for automated operations like booking updates, check-ins, and cancellations.\n• Created triggers for auto-calculating revenue and room occupancy rates.\n• Optimized queries for reporting real-time statistics on revenue, occupancy, and guest history.`,
    result: '🏨 Result: Simulated a real-world backend for a hotel management system, improving operations and reporting accuracy.'
  },
  {
    title: 'SIDS Monitoring System (IoT Project)',
    timeline: 'Fall 2022',
    tech: 'Python, Raspberry Pi, sensors, Android App (MIT App Inventor)',
    metrics: [
      { label: 'Monitoring', value: 'Real-time', icon: '⏱️' },
      { label: 'Alerts', value: 'Instant', icon: '🔔' },
    ],
    description: `Developed a Sudden Infant Death Syndrome (SIDS) prevention system using IoT and mobile tech.\n\n• Integrated sensors on Raspberry Pi to monitor infant vital signs such as heartbeat and temperature.\n• Developed an Android app that connected with the device to display real-time data.\n• Built logic for anomaly detection and push alerts to caregivers during emergencies.\n• Implemented cloud data storage for historical data access.`,
    result: '👶 Result: Created a potentially life-saving product concept with real-time monitoring and alerting.'
  },
];

const skillCategories = [
  {
    icon: '🧑‍💻',
    title: 'Programming & Data Science',
    color: 'pink',
    skills: [
      { name: 'Python (Pandas, NumPy, Scikit-Learn)', percentage: 95 },
      { name: 'SQL (PostgreSQL, MySQL, Snowflake)', percentage: 90 },
      { name: 'R & Statistical Computing', percentage: 80 },
    ],
  },
  {
    icon: '🧠',
    title: 'Machine Learning & AI',
    color: 'purple',
    skills: [
      { name: 'Supervised & Unsupervised Learning', percentage: 92 },
      { name: 'Deep Learning (PyTorch, TensorFlow, CNN)', percentage: 88 },
      { name: 'NLP & LLMs (spaCy, LangChain, GPT APIs)', percentage: 85 },
    ],
  },
  {
    icon: '📊',
    title: 'Data Visualization & BI',
    color: 'orange',
    skills: [
      { name: 'Tableau & Power BI', percentage: 90 },
      { name: 'Python Visualization (Matplotlib, Seaborn)', percentage: 88 },
      { name: 'Advanced Excel & Data Storytelling', percentage: 85 },
    ],
  },
  {
    icon: '🗂️',
    title: 'Data Engineering & Cloud',
    color: 'pink',
    skills: [
      { name: 'AWS (S3, Lambda, SageMaker, Redshift)', percentage: 87 },
      { name: 'ETL Pipelines (Airflow, SSIS, FastAPI)', percentage: 85 },
      { name: 'Data Warehousing (Snowflake, Databricks)', percentage: 82 },
    ],
  },
  {
    icon: '📈',
    title: 'Statistical Analysis',
    color: 'purple',
    skills: [
      { name: 'A/B Testing & Hypothesis Testing', percentage: 90 },
      { name: 'Time Series Forecasting & Regression', percentage: 88 },
      { name: 'Feature Engineering & Model Optimization', percentage: 92 },
    ],
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
    company: 'AI4M Technology Pvt. Ltd.',
    role: 'Machine Vision & Automation Intern',
    duration: 'January 2023 – July 2023',
    location: 'Pune, India',
    focus: 'Computer Vision, Deep Learning, CNN, Real-time Systems, AWS, PostgreSQL, Embedded Hardware',
    icon: '💼',
    projects: [
      {
        name: 'Online Coating Weight Estimation System (OCWES)',
        color: 'bg-purple-50',
        goal: 'Automate the measurement and reporting of coating weights in manufacturing using image processing and machine learning.',
        contributions: [
          'Built a Python-based automation pipeline for generating coating reports using the fpdf library.',
          'Integrated the report system with AWS S3 for secure storage and Lambda to trigger email alerts, cutting down manual intervention significantly.',
          'Developed and optimized a PostgreSQL database schema to store, retrieve, and query coating weight data for each batch.',
          'Used PyTorch, OpenCV, and NumPy to preprocess spectroscopic images, applying filters like Gaussian blur and edge detection to enhance feature clarity.',
          'Trained a regression-based convolutional neural network (CNN) to estimate continuous coating weights from visual input data — this eliminated the need for manual binning or operator inference.',
          'Worked on high-speed data collection from hardware-integrated systems such as Raspberry Pi and Tinker Boards, improving sampling accuracy.',
          'Ensured precise calibration of spectroscope sensors and built logic for real-time scientific data acquisition.'
        ],
        impact: '🧪 Impact: Reduced manual QA processes by over 70% and enabled scalable, automated quality control for a production environment.'
      },
      {
        name: 'Automated Surface Inspection',
        color: 'bg-yellow-50',
        goal: 'Replace manual defect inspection with an AI-powered, real-time system for surface quality assurance.',
        contributions: [
          'Designed a real-time video processing pipeline using segmentation models to detect multiple types of surface defects.',
          'Integrated machine vision cameras with hardware systems to capture high-resolution, real-time frames.',
          'Applied ROI (Region of Interest) extraction and image enhancement techniques (noise filtering, contrast enhancement) using OpenCV to isolate problem areas.',
          'Cleaned and structured data using NumPy and pandas for training and evaluation.',
          'Implemented Kafka for streaming sensor and image data in real-time, ensuring low-latency updates across distributed systems.',
          'Used ZeroMQ (ZMQ) as a lightweight message-passing interface to enable high-speed communication between system modules.',
          'Collaborated on point cloud creation using laser-based profiling to capture surface texture in 3D.'
        ],
        impact: '⚙️ Impact: Increased defect detection accuracy by 75%, enabling real-time alerts and reducing inspection delays and quality lapses on the production line.'
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
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [formStatus, setFormStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  const [formMessage, setFormMessage] = useState('');

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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [id]: value
    }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormStatus('sending');
    setFormMessage('');

    // Validate form
    if (!formData.name || !formData.email || !formData.message) {
      setFormStatus('error');
      setFormMessage('Please fill in all fields.');
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setFormStatus('error');
      setFormMessage('Please enter a valid email address.');
      return;
    }

    try {
      // EmailJS configuration
      const serviceID = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || 'service_xxxxxxx';
      const templateID = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID || 'template_xxxxxxx';
      const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY || 'YOUR_PUBLIC_KEY';

      // Initialize EmailJS with public key
      emailjs.init(publicKey);

      // Send email using EmailJS
      const result = await emailjs.send(
        serviceID,
        templateID,
        {
          from_name: formData.name,
          from_email: formData.email,
          message: formData.message,
          to_email: 'jahnavisingh6@gmail.com',
          subject: `Portfolio Contact from ${formData.name}`,
        }
      );

      if (result.status === 200) {
        setFormStatus('success');
        setFormMessage('✅ Message sent successfully! I\'ll get back to you soon.');

        // Reset form after success
        setTimeout(() => {
          setFormData({ name: '', email: '', message: '' });
          setFormStatus('idle');
          setFormMessage('');
        }, 5000);
      } else {
        throw new Error('Failed to send message');
      }
    } catch (error) {
      console.error('EmailJS Error:', error);
      setFormStatus('error');
      setFormMessage('❌ Failed to send message. Please email me directly at jahnavisingh6@gmail.com');

      // Keep error message visible longer
      setTimeout(() => {
        setFormStatus('idle');
        setFormMessage('');
      }, 8000);
    }
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
            Data Analyst & Data Scientist | ML, NLP & AI
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
          <div className="flex justify-center gap-4 mb-8">
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
          <div className="flex justify-center">
            <a
              href="/resume.pdf"
              download
              className="px-8 py-3 rounded-xl bg-gradient-to-r from-pink-400 to-purple-400
              text-white font-medium hover:from-purple-400 hover:to-pink-400 transition-all duration-300
              hover:shadow-lg shadow-pink-200/50 flex items-center gap-2"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              Download Resume
            </a>
          </div>
        </div>
      </section>

      {/* Statistics Dashboard */}
      <StatsCounter />

      {/* About Section */}
      <section id="about" className="py-20 bg-white/50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="section-title">
            <FiHeart className="section-title-icon" />
            About Me
          </h2>
          <div className="card">
            <p className="text-lg text-gray-600 leading-relaxed mb-4">
              Data Analyst & aspiring Data Scientist with <strong>3.5 years of experience</strong> in data analytics, predictive modeling, machine learning, data visualization, and cloud computing. Currently pursuing my Master's in Information Technology at Arizona State University (GPA: 3.87/4.0), specializing in <strong>Machine Learning, Natural Language Processing, and AI</strong>.
            </p>
            <p className="text-lg text-gray-600 leading-relaxed mb-4">
              Passionate about leveraging <strong>ML, NLP, and AI technologies</strong> to solve complex real-world problems. Proficient in Python, SQL, Tableau, Power BI, AWS, and Azure to drive data-driven decision-making. Skilled in ETL pipeline development, statistical analysis, building scalable ML models, and deploying deep learning solutions for computer vision and language understanding.
            </p>
            <p className="text-lg text-gray-600 leading-relaxed">
              <strong>Key Achievements:</strong> Managed datasets exceeding 1M+ records, deployed 20+ machine learning models to improve forecasting and operational efficiency, optimized workflows to reduce data processing time by 30%, and built 11+ interactive dashboards that delivered actionable insights to business stakeholders. Experienced in developing CNN models for image analysis and implementing LLM-based solutions for intelligent automation.
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
            Technical Skills & Proficiency
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {skillCategories.map((category, idx) => (
              <div key={category.title} className="card">
                <h3 className="text-xl font-semibold mb-6 flex items-center gap-2">
                  <span className="text-2xl">{category.icon}</span> {category.title}
                </h3>
                <div className="space-y-4">
                  {category.skills.map((skill, i) => (
                    <SkillBar
                      key={i}
                      skill={skill.name}
                      percentage={skill.percentage}
                      color={category.color}
                      delay={i * 100}
                    />
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
            Professional Experience
          </h2>

          {/* Visual Timeline */}
          <div className="mb-16">
            <Timeline
              items={experiences.map((exp, idx) => ({
                company: exp.company,
                role: exp.role,
                duration: exp.duration,
                location: exp.location,
                icon: exp.icon,
                current: idx === 0,
              }))}
            />
          </div>

          {/* Detailed Experience */}
          <div className="mt-12">
            <h3 className="text-2xl font-semibold text-gray-800 mb-8 text-center">Detailed Project Contributions</h3>
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
              <div key={project.title} className="card relative overflow-hidden">
                {/* Key Metrics Banner */}
                <div className="flex gap-2 mb-4">
                  {project.metrics.map((metric, i) => (
                    <div key={i} className="flex-1 bg-gradient-to-br from-pink-50 to-purple-50 rounded-lg p-3 border border-pink-200">
                      <div className="text-2xl mb-1">{metric.icon}</div>
                      <div className="text-2xl font-bold bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent">
                        {metric.value}
                      </div>
                      <div className="text-xs text-gray-600 font-medium">{metric.label}</div>
                    </div>
                  ))}
                </div>

                <div className="flex items-center gap-2 mb-2">
                  <FiBook className="text-pink-400" />
                  <h3 className="text-xl font-semibold text-gray-800 mb-0">{project.title}</h3>
                </div>
                <div className="flex items-center gap-2 text-sm text-pink-500 mb-2">
                  <FiClock />
                  <span>{project.timeline}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-purple-500 mb-4">
                  <FiTool />
                  <span className="line-clamp-2">{project.tech}</span>
                </div>
                <div className="text-gray-600 whitespace-pre-line mb-4 text-sm">
                  {project.description}
                </div>
                <div className="text-green-600 font-medium flex items-center gap-2 bg-green-50 p-3 rounded-lg">
                  <FiCheckCircle className="text-green-400 flex-shrink-0" />
                  <span className="text-sm">{project.result}</span>
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
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div>
                <label className="block text-gray-700 mb-2" htmlFor="name">Name</label>
                <input
                  type="text"
                  id="name"
                  className="input-field"
                  placeholder="Your name"
                  value={formData.name}
                  onChange={handleInputChange}
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
                  value={formData.email}
                  onChange={handleInputChange}
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
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                ></textarea>
              </div>

              {/* Status Messages */}
              {formMessage && (
                <div className={`p-4 rounded-lg ${
                  formStatus === 'success' ? 'bg-green-50 text-green-700' :
                  formStatus === 'error' ? 'bg-red-50 text-red-700' :
                  'bg-blue-50 text-blue-700'
                }`}>
                  {formMessage}
                </div>
              )}

              <button
                type="submit"
                disabled={formStatus === 'sending'}
                className="w-full py-3 px-6 rounded-xl bg-gradient-to-r from-pink-400 to-purple-400
                text-white font-medium hover:from-purple-400 hover:to-pink-400 transition-all duration-300
                hover:shadow-lg shadow-pink-200/50 flex items-center justify-center gap-2
                disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <FiHeart className="w-5 h-5" />
                {formStatus === 'sending' ? 'Sending...' : 'Send Message'}
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
