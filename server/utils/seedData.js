const Category = require("../models/Category");
const Course = require("../models/Course");
const User = require("../models/User");
const Profile = require("../models/Profile");
const Section = require("../models/Section");
const SubSection = require("../models/Subsection");
const bcrypt = require("bcryptjs");

const demoCategories = [
  {
    _id: "650000000000000000000001",
    name: "Web Development",
    description: "Master modern web development with HTML, CSS, JavaScript, React, Node.js, and Full-Stack MERN architecture.",
  },
  {
    _id: "650000000000000000000002",
    name: "Python & Data Science",
    description: "Learn Python programming, Machine Learning, Data Analysis, Pandas, NumPy, and AI algorithms.",
  },
  {
    _id: "650000000000000000000003",
    name: "Cyber Security",
    description: "Ethical hacking, network security, penetration testing, cryptography, and cyber threat intelligence.",
  },
  {
    _id: "650000000000000000000004",
    name: "Cloud Computing & DevOps",
    description: "Master AWS, Docker, Kubernetes, CI/CD pipelines, and scalable cloud infrastructure.",
  },
  {
    _id: "650000000000000000000005",
    name: "Android & App Development",
    description: "Build high-performance cross-platform mobile apps using Flutter, React Native, and Kotlin.",
  },
];

const demoCourses = [
  {
    _id: "650000000000000000000101",
    courseName: "The Complete Web Development Bootcamp 2026",
    courseDescription: "Become a full-stack MERN developer by building real-world web applications from scratch.",
    whatYouWillLearn: "Build responsive websites, master React.js, Express, MongoDB, Node.js, and deploy production apps.",
    price: 499,
    thumbnail: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=800&q=80",
    tag: ["Web Development", "React", "NodeJS", "FullStack"],
    category: "650000000000000000000001",
    instructions: ["Prerequisites: None required", "Must have a laptop with internet connection"],
    status: "Published",
  },
  {
    _id: "650000000000000000000102",
    courseName: "Python for Data Science & Machine Learning Masterclass",
    courseDescription: "Comprehensive guide to Python programming, data analytics, visualization, and AI machine learning models.",
    whatYouWillLearn: "Analyze data using Pandas, create visualizations with Matplotlib, build ML models with Scikit-Learn.",
    price: 699,
    thumbnail: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=800&q=80",
    tag: ["Python", "Data Science", "Machine Learning", "AI"],
    category: "650000000000000000000002",
    instructions: ["Basic algebra helpful but not mandatory"],
    status: "Published",
  },
  {
    _id: "650000000000000000000103",
    courseName: "Ethical Hacking & Network Security Fundamentals",
    courseDescription: "Learn penetration testing, vulnerability assessment, wireless security, and system defense strategies.",
    whatYouWillLearn: "Perform ethical security audits, identify system vulnerabilities, secure network infrastructures.",
    price: 599,
    thumbnail: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=800&q=80",
    tag: ["Cyber Security", "Ethical Hacking", "Networking"],
    category: "650000000000000000000003",
    instructions: ["For educational and authorized security testing only"],
    status: "Published",
  },
  {
    _id: "650000000000000000000104",
    courseName: "AWS Cloud Architect & DevOps Engineering",
    courseDescription: "Hands-on guide to Amazon Web Services (AWS), Docker containerization, Kubernetes, and CI/CD pipelines.",
    whatYouWillLearn: "Architect fault-tolerant cloud systems, automate deployments with CI/CD, orchestrate Docker containers.",
    price: 799,
    thumbnail: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=800&q=80",
    tag: ["AWS", "Cloud", "DevOps", "Docker", "Kubernetes"],
    category: "650000000000000000000004",
    instructions: ["Basic Linux command line experience is recommended"],
    status: "Published",
  },
];

// Demo course outlines (lesson titles only, no videos).
// Used by the course page's "Course Content" section and by the AI Course Advisor.
// Durations are in seconds.
const demoCourseContent = {
  "650000000000000000000101": [
    {
      sectionName: "Web Foundations: HTML & CSS",
      lessons: [
        ["How the Web Works", 540],
        ["HTML Structure and Semantic Tags", 900],
        ["CSS Selectors, Box Model and Flexbox", 1200],
        ["Responsive Design with Media Queries", 960],
      ],
    },
    {
      sectionName: "Modern JavaScript",
      lessons: [
        ["Variables, Functions and Scope", 1080],
        ["DOM Manipulation and Events", 1140],
        ["Promises, Async/Await and Fetch API", 1260],
      ],
    },
    {
      sectionName: "React.js",
      lessons: [
        ["Components, Props and JSX", 1020],
        ["State and the useEffect Hook", 1320],
        ["React Router and Single Page Apps", 960],
        ["Global State with Redux Toolkit", 1380],
      ],
    },
    {
      sectionName: "Backend with Node, Express and MongoDB",
      lessons: [
        ["Building REST APIs with Express", 1260],
        ["MongoDB and Mongoose Models", 1140],
        ["Authentication with JWT", 1200],
        ["Deploying a MERN App", 900],
      ],
    },
  ],
  "650000000000000000000102": [
    {
      sectionName: "Python Fundamentals",
      lessons: [
        ["Python Syntax, Variables and Data Types", 900],
        ["Lists, Dictionaries and Loops", 1020],
        ["Functions and Modules", 960],
      ],
    },
    {
      sectionName: "Data Analysis",
      lessons: [
        ["NumPy Arrays", 1080],
        ["Data Cleaning with Pandas", 1320],
        ["Visualization with Matplotlib", 1140],
      ],
    },
    {
      sectionName: "Machine Learning",
      lessons: [
        ["Introduction to Machine Learning", 840],
        ["Linear and Logistic Regression", 1380],
        ["Decision Trees and Random Forests", 1260],
        ["Model Evaluation with Scikit-Learn", 1200],
      ],
    },
  ],
  "650000000000000000000103": [
    {
      sectionName: "Security Fundamentals",
      lessons: [
        ["The CIA Triad and Threat Landscape", 780],
        ["Networking Basics: TCP/IP, Ports and Protocols", 1200],
        ["Setting Up a Safe Practice Lab", 960],
      ],
    },
    {
      sectionName: "Reconnaissance and Scanning",
      lessons: [
        ["Information Gathering", 1020],
        ["Network Scanning with Nmap", 1260],
        ["Vulnerability Assessment", 1140],
      ],
    },
    {
      sectionName: "Defense",
      lessons: [
        ["Web Application Security Basics (OWASP Top 10)", 1320],
        ["Wireless Network Security", 1080],
        ["Firewalls and Hardening Systems", 1020],
      ],
    },
  ],
  "650000000000000000000104": [
    {
      sectionName: "AWS Core Services",
      lessons: [
        ["Cloud Computing Concepts", 720],
        ["EC2, S3 and IAM", 1380],
        ["VPC and Networking on AWS", 1260],
      ],
    },
    {
      sectionName: "Containers",
      lessons: [
        ["Docker Images and Containers", 1200],
        ["Docker Compose for Multi-Container Apps", 1080],
        ["Kubernetes Pods, Deployments and Services", 1440],
      ],
    },
    {
      sectionName: "DevOps Pipelines",
      lessons: [
        ["CI/CD Concepts", 840],
        ["Building a Pipeline with GitHub Actions", 1260],
        ["Monitoring and Logging", 960],
      ],
    },
  ],
};

// Adds the demo outline to a demo course only if that course has no content yet,
// so courses an instructor has already built are never touched.
async function seedDemoCourseContent() {
  for (const [courseId, sections] of Object.entries(demoCourseContent)) {
    const course = await Course.findById(courseId);
    if (!course || course.courseContent.length > 0) continue;

    const sectionIds = [];
    for (const section of sections) {
      const subSections = await SubSection.insertMany(
        section.lessons.map(([title, seconds]) => ({
          title,
          timeDuration: String(seconds),
          description: `${title} - part of ${course.courseName}.`,
          videoUrl: "",
        }))
      );
      const createdSection = await Section.create({
        sectionName: section.sectionName,
        subSection: subSections.map((sub) => sub._id),
      });
      sectionIds.push(createdSection._id);
    }

    course.courseContent = sectionIds;
    await course.save();
    console.log(`[Seed] Added demo lessons to "${course.courseName}"`);
  }
}

async function seedDatabase() {
  try {
    // Check if database is empty or needs categories
    const categoryCount = await Category.countDocuments();
    if (categoryCount === 0) {
      console.log("[Seed] Populating initial demo categories...");
      await Category.insertMany(demoCategories);
      console.log("[Seed] Demo categories created successfully!");
    }

    // The demo instructor has a publicly known password, so it (and the demo
    // courses that need it) are only created when explicitly enabled.
    if (process.env.SEED_DEMO_DATA !== "true") {
      return;
    }

    // Check if instructor user exists
    let instructor = await User.findOne({ accountType: "Instructor" });
    if (!instructor) {
      const hashedPassword = await bcrypt.hash("Password123", 10);
      const profile = await Profile.create({
        gender: "Other",
        dateOfBirth: "1995-01-01",
        about: "Expert Senior Software Engineer & Course Creator",
        contactNumber: "9876543210",
      });
      instructor = await User.create({
        firstName: "Demo",
        lastName: "Instructor",
        email: "instructor@studynotion.com",
        password: hashedPassword,
        accountType: "Instructor",
        additionalDetails: profile._id,
        image: "https://api.dicebear.com/5.x/initials/svg?seed=Demo%20Instructor",
      });
      console.log("[Seed] Demo Instructor created: instructor@studynotion.com / Password123");
    }

    // Seed courses if empty
    const courseCount = await Course.countDocuments();
    if (courseCount === 0 && instructor) {
      console.log("[Seed] Populating demo courses...");
      const coursesToInsert = demoCourses.map((c) => ({
        ...c,
        instructor: instructor._id,
      }));
      const createdCourses = await Course.insertMany(coursesToInsert);
      
      // Update categories with their course IDs
      for (const course of createdCourses) {
        await Category.findByIdAndUpdate(course.category, {
          $push: { courses: course._id },
        });
      }
      console.log("[Seed] Demo courses populated successfully!");
    }

    // Add lesson outlines to demo courses that don't have any yet
    await seedDemoCourseContent();
  } catch (err) {
    console.error("[Seed] Error seeding demo data:", err.message);
  }
}

module.exports = {
  demoCategories,
  demoCourses,
  demoCourseContent,
  seedDatabase,
};
