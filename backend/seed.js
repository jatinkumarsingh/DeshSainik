const mongoose = require('mongoose');
require('dotenv').config();

const Course = require('./models/Course');
const Job = require('./models/Job');

const seedCourses = [
  { title: "NDA Complete Preparation", description: "Full NDA syllabus: Maths, GAT, English with PYQs and mock tests", category: "NDA", price: 799, duration: "6 months", level: "Intermediate", instructor: "Col. Sharma (Retd.)" },
  { title: "CDS Combined Defence Services", description: "CDS OTA/IMA/AFA prep with topic-wise notes and practice sets", category: "CDS", price: 749, duration: "4 months", level: "Intermediate", instructor: "Maj. Verma (Retd.)" },
  { title: "AFCAT Officer Entry", description: "AFCAT sections: Verbal, Numerical, Reasoning & Military Aptitude", category: "AFCAT", price: 699, duration: "3 months", level: "Beginner", instructor: "Wg Cdr. Kapoor (Retd.)" },
  { title: "Agniveer Army GD/Clerk/Tech", description: "Targeted preparation for Army Agniveer entries with physical standards", category: "Agniveer", price: 599, duration: "3 months", level: "Beginner", instructor: "Subedar Yadav (Retd.)" },
  { title: "SSB 5-Day Process", description: "Complete SSB overview: Screening, Psychology, GTO, Interview, Conference", category: "SSB", price: 999, duration: "2 months", level: "Advanced", instructor: "Brig. Singh (Retd.)" },
  { title: "Mathematics for NDA/CDS", description: "Algebra, Trigonometry, Geometry, Calculus with speed drills", category: "General", price: 449, duration: "3 months", level: "Intermediate", instructor: "Prof. Gupta" },
  { title: "English & Comprehension", description: "Grammar, vocabulary, comprehension for defence exams", category: "General", price: 399, duration: "2 months", level: "Beginner", instructor: "Dr. Sharma" },
  { title: "Physical Fitness Program", description: "Running plans, strength training tailored to rally standards", category: "Physical", price: 499, duration: "3 months", level: "Beginner", instructor: "PTI Rathore" },
  { title: "Navy SSR/MR Entry", description: "Syllabus coverage, sample papers for SSR/MR entries", category: "Navy", price: 549, duration: "3 months", level: "Beginner", instructor: "CPO Nair (Retd.)" },
  { title: "Air Force Agniveer X/Y", description: "Maths, Physics, English for X; Reasoning & GA for Y", category: "AirForce", price: 599, duration: "3 months", level: "Beginner", instructor: "Sgt. Kumar (Retd.)" },
  { title: "CAPF Assistant Commandant", description: "Paper I & II strategy with essay and interview guidance", category: "CAPF", price: 649, duration: "4 months", level: "Advanced", instructor: "DIG Mishra (Retd.)" },
  { title: "SSC GD Constable", description: "Reasoning, Maths, GK with PET/PST standards overview", category: "CAPF", price: 549, duration: "3 months", level: "Beginner", instructor: "Insp. Tiwari (Retd.)" },
];

const seedJobs = [
  { title: "Army GD Rally Rajasthan", description: "Army GD recruitment rally for Rajasthan region", category: "GD", region: "North", organization: "Indian Army", vacancies: 500, eligibility: "10th Pass, Age 17.5-21", salary: "₹21,700 - ₹69,100" },
  { title: "Air Force Agniveer Vayu Intake", description: "Agniveer Vayu recruitment for technical and non-technical", category: "Group X", region: "All India", organization: "Indian Air Force", vacancies: 3000, eligibility: "12th Pass with PCM/Any Stream", salary: "₹30,000 per month" },
  { title: "Navy SSR Recruitment 2025", description: "Senior Secondary Recruit for Indian Navy", category: "SSR", region: "All India", organization: "Indian Navy", vacancies: 2000, eligibility: "12th Pass with Maths & Physics", salary: "₹21,700 - ₹69,100" },
  { title: "BSF Constable Recruitment", description: "Border Security Force Constable GD recruitment", category: "Constable", region: "North", organization: "BSF", vacancies: 1500, eligibility: "10th Pass, Age 18-23", salary: "₹21,700 - ₹69,100" },
  { title: "CRPF Head Constable Ministerial", description: "CRPF Head Constable ministerial posts", category: "Clerk", region: "All India", organization: "CRPF", vacancies: 800, eligibility: "12th Pass with Typing", salary: "₹25,500 - ₹81,100" },
  { title: "Navy MR Recruitment 2025", description: "Matric Recruit for Indian Navy", category: "MR", region: "South", organization: "Indian Navy", vacancies: 1000, eligibility: "10th Pass", salary: "₹21,700 - ₹69,100" },
  { title: "Army Technical Entry TES 52", description: "Technical Entry Scheme for B.Tech graduates", category: "Technical", region: "All India", organization: "Indian Army", vacancies: 90, eligibility: "10+2 with PCM, Min 70%", salary: "₹56,100 - ₹1,77,500" },
  { title: "CISF Constable Fire Recruitment", description: "CISF Constable Fire category recruitment", category: "Constable", region: "Central", organization: "CISF", vacancies: 1200, eligibility: "12th Pass, Age 18-23", salary: "₹21,700 - ₹69,100" },
  { title: "ITBP Constable GD Recruitment", description: "Indo-Tibetan Border Police Constable GD", category: "Constable", region: "North", organization: "ITBP", vacancies: 900, eligibility: "10th Pass, Age 18-23", salary: "₹21,700 - ₹69,100" },
  { title: "Coast Guard Navik GD 2025", description: "Indian Coast Guard Navik General Duty", category: "GD", region: "All India", organization: "Indian Coast Guard", vacancies: 350, eligibility: "10th Pass", salary: "₹21,700 - ₹69,100" },
  { title: "Army Nursing Officer Recruitment", description: "Military Nursing Service Officer recruitment", category: "Nursing", region: "All India", organization: "Indian Army", vacancies: 100, eligibility: "B.Sc Nursing", salary: "₹56,100 - ₹1,10,700" },
  { title: "SSC GD Constable Result 2024", description: "SSC GD Constable 2024 exam result announced", category: "Result", region: "All India", organization: "SSC", vacancies: 0, eligibility: "N/A", salary: "N/A" },
];

const seedDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    // Clear existing data
    await Course.deleteMany({});
    await Job.deleteMany({});
    console.log('Cleared existing data');

    // Insert seed data
    await Course.insertMany(seedCourses);
    console.log(`Inserted ${seedCourses.length} courses`);

    await Job.insertMany(seedJobs);
    console.log(`Inserted ${seedJobs.length} jobs`);

    console.log('Database seeded successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

seedDatabase();
