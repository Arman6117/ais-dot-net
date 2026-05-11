"use client";
import { useState } from "react";
import {
  Briefcase,
  MapPin,
  Clock,
  DollarSign,
  Send,
  Search,
  GraduationCap,
  Calendar,
  ArrowRight,
  Sparkles,
  Mail,
  Cpu,
  Users,
  Database,
  TrendingUp,
  Filter,
} from "lucide-react";

// Application email for all internships
const APPLICATION_EMAIL = "aistatics.interns@gmail.com";

const internships = [
  {
    id: 1,
    title: "AI Engineer Intern",
    department: "AI & Research",
    location: "Pune, Maharashtra (Offline)",
    duration: "3-6 months",
    stipend: "Not Mentioned",
    type: "Full-time Internship",
    postedDate: "2026-04-20",
    deadline: "2026-05-20",
    icon: Cpu,
    requirements: [
      "Knowledge of Python and ML libraries (Sklearn, TensorFlow, etc.)",
      "Understanding of AI/ML concepts",
      "Passion for research and innovation",
      "Basic understanding of image processing and NLP",
    ],
    responsibilities: [
      "Develop and implement ML/AI models for research problems",
      "Work on image processing, NLP, and prediction models",
      "Assist in building solutions for PhD-level projects",
      "Data preprocessing, model training, and evaluation",
      "Collaborate on innovative AI use cases (healthcare, survey, prediction)",
      "Support research paper implementation and experimentation",
    ],
    perks: [
      "Work on real-world AI problems",
      "Research-based solutions experience",
      "Certificate of completion",
      "Letter of recommendation",
    ],
    featured: true,
  },
  {
    id: 2,
    title: "HR Intern",
    department: "Human Resources",
    location: "Pune, Maharashtra (Offline)",
    duration: "3-6 months",
    stipend: "Not Mentioned",
    type: "Full-time Internship",
    postedDate: "2026-04-20",
    deadline: "2026-05-20",
    icon: Users,
    requirements: [
      "Good communication skills",
      "Basic understanding of HR processes",
      "Organized and proactive approach",
      "Ability to multitask",
    ],
    responsibilities: [
      "Manage internship and job postings",
      "Screen resumes and schedule interviews",
      "Coordinate with candidates and internal teams",
      "Handle onboarding of interns and employees",
      "Maintain HR records and communication",
      "Support hiring for PhD research projects and technical roles",
    ],
    perks: [
      "Great exposure to hiring in Data Science & Research domain",
      "Certificate of completion",
      "Letter of recommendation",
      "Hands-on HR experience",
    ],
    featured: false,
  },
  {
    id: 3,
    title: "Data Analyst Intern (Paid)",
    department: "Data Analytics",
    location: "Pune, Maharashtra (Offline)",
    duration: "6 months",
    stipend: "₹5,000 / month",
    type: "Full-time Internship",
    postedDate: "2026-04-20",
    deadline: "2026-05-20",
    icon: Database,
    requirements: [
      "Knowledge of Python / SQL / Power BI",
      "Understanding of statistics concepts",
      "Interest in research and real-world data problems",
      "Basic knowledge of data visualization",
    ],
    responsibilities: [
      "Data analysis and visualization using Python/Power BI",
      "Handle research datasets and perform statistical testing",
      "Work on survey analysis, hypothesis testing, and interpretation",
      "Assist in AI/ML model building for research use cases",
      "Prepare reports, dashboards, and insights for clients",
      "Support research paper implementation tasks",
    ],
    perks: [
      "Paid internship with stipend",
      "Practical exposure to live projects",
      "Career growth opportunities",
      "Mentorship from industry experts",
    ],
    featured: true,
  },
  {
    id: 4,
    title: "Data Analyst Intern (Unpaid)",
    department: "Data Analytics",
    location: "Pune, Maharashtra (Offline)",
    duration: "6 months",
    stipend: "Not Mentioned",
    type: "Full-time Internship",
    postedDate: "2026-04-20",
    deadline: "2026-05-20",
    icon: TrendingUp,
    requirements: [
      "Students from Statistics, Data Science, or related fields",
      "Basic knowledge of Python/Excel/SPSS",
      "Strong analytical mindset",
      "Eagerness to learn research methodologies",
    ],
    responsibilities: [
      "Data collection, cleaning, and preprocessing for research projects",
      "Perform statistical analysis using Python/SPSS/Excel",
      "Assist in survey analysis and interpretation",
      "Work on real datasets related to AI/ML and research problems",
      "Support in report writing and documentation for PhD work",
      "Collaborate with team on research-based problem solving",
    ],
    perks: [
      "Great opportunity for hands-on research experience",
      "Work on real PhD research projects",
      "Certificate of completion",
      "Letter of recommendation",
    ],
    featured: false,
  },
];

export default function OpenInternships() {
  const [selectedDepartment, setSelectedDepartment] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedInternship, setSelectedInternship] = useState<typeof internships[0] | null>(null);

  const departments = ["All", "AI & Research", "Data Analytics", "Human Resources"];
  
  const filteredInternships = internships.filter((internship) => {
    const matchesDepartment = selectedDepartment === "All" || internship.department === selectedDepartment;
    const matchesSearch =
      searchQuery === "" ||
      internship.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      internship.department.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesDepartment && matchesSearch;
  });

  const featuredInternships = filteredInternships.filter((i) => i.featured);
  const regularInternships = filteredInternships.filter((i) => !i.featured);

  const handleApply = (internshipTitle: string) => {
    const subject = encodeURIComponent(`Application for ${internshipTitle} Internship`);
    const body = encodeURIComponent(
      `Dear Hiring Team,\n\nI am writing to apply for the ${internshipTitle} position at AIS Solutions Pvt. Ltd.\n\nPlease find my resume attached.\n\nThank you for your consideration.\n\nBest regards,\n[Your Name]\n[Your Phone Number]`
    );
    window.location.href = `mailto:${APPLICATION_EMAIL}?subject=${subject}&body=${body}`;
  };

  return (
    <section className="py-20 bg-gradient-to-b from-white via-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-13">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex justify-center mb-4">
            <span className="text-sm uppercase tracking-wider text-blue-600 font-medium bg-blue-50 px-4 py-2 rounded-full">
              Open Positions
            </span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Current Internships
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Join our team and work on real-world projects with expert mentorship
          </p>
        </div>

        {/* Email Notice */}
        <div className="mb-8">
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-xl p-4 flex items-center justify-between flex-wrap gap-3">
            <div className="flex items-center gap-3">
              <Mail size={18} className="text-[#1A56DB]" />
              <span className="text-sm text-gray-700">
                Send your applications to: <strong className="text-[#1A56DB]">{APPLICATION_EMAIL}</strong>
              </span>
            </div>
            <a
              href={`mailto:${APPLICATION_EMAIL}`}
              className="text-sm bg-[#1A56DB] text-white px-4 py-1.5 rounded-lg hover:bg-[#2563EB] transition-colors"
            >
              Compose Email
            </a>
          </div>
        </div>

        {/* Filters */}
        <div className="mb-8">
          <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                <input
                  type="text"
                  placeholder="Search internships..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:border-[#1A56DB] transition-colors"
                />
              </div>
              <div className="relative min-w-[200px]">
                <select
                  value={selectedDepartment}
                  onChange={(e) => setSelectedDepartment(e.target.value)}
                  className="pl-10 pr-8 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:border-[#1A56DB] appearance-none bg-white w-full"
                >
                  {departments.map((dept) => (
                    <option key={dept} value={dept}>{dept}</option>
                  ))}
                </select>
                <Briefcase className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
              </div>
            </div>
          </div>
        </div>

        {/* Featured Internships */}
        {featuredInternships.length > 0 && (
          <>
            <div className="flex items-center gap-2 mb-6">
              <Sparkles size={20} className="text-[#1A56DB]" />
              <h3 className="text-xl font-bold text-gray-800">Featured Internships</h3>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-12">
              {featuredInternships.map((internship) => {
                const Icon = internship.icon;
                return (
                  <div
                    key={internship.id}
                    className="group bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border-l-4 border-[#1A56DB] cursor-pointer"
                    onClick={() => setSelectedInternship(internship)}
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center">
                          <Icon size={20} className="text-[#1A56DB]" />
                        </div>
                        <div>
                          <h3 className="text-xl font-bold text-gray-800 group-hover:text-[#1A56DB] transition-colors">
                            {internship.title}
                          </h3>
                          <p className="text-sm text-gray-500 mt-1">{internship.department}</p>
                        </div>
                      </div>
                      <span className="px-3 py-1 bg-blue-50 text-[#1A56DB] text-xs font-medium rounded-full">
                        {internship.stipend === "Unpaid" ? "Unpaid" : "Paid"}
                      </span>
                    </div>
                    
                    <div className="space-y-2 mb-4">
                      <div className="flex items-center gap-2 text-sm text-gray-500">
                        <MapPin size={14} />
                        <span>{internship.location}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-500">
                        <Clock size={14} />
                        <span>{internship.duration}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-500">
                        <DollarSign size={14} />
                        <span>{internship.stipend}</span>
                      </div>
                    </div>
                    
                    <button className="mt-4 inline-flex items-center gap-2 text-[#1A56DB] font-medium text-sm group-hover:gap-3 transition-all">
                      View Details <ArrowRight size={14} />
                    </button>
                  </div>
                );
              })}
            </div>
          </>
        )}

        {/* All Internships */}
        <h3 className="text-xl font-bold text-gray-800 mb-6">All Internships</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {regularInternships.map((internship) => {
            const Icon = internship.icon;
            return (
              <div
                key={internship.id}
                className="group bg-white rounded-2xl p-6 shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100 cursor-pointer"
                onClick={() => setSelectedInternship(internship)}
              >
                <div className="flex items-start gap-3 mb-3">
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center shrink-0">
                    <Icon size={16} className="text-gray-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-gray-800 group-hover:text-[#1A56DB] transition-colors">
                      {internship.title}
                    </h3>
                    <p className="text-xs text-gray-500">{internship.department}</p>
                  </div>
                </div>
                
                <div className="space-y-1.5 mb-4">
                  <div className="flex items-center gap-2 text-xs text-gray-500">
                    <MapPin size={12} />
                    <span>Pune, Maharashtra</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-gray-500">
                    <DollarSign size={12} />
                    <span>{internship.stipend}</span>
                  </div>
                </div>
                
                <button className="mt-2 text-[#1A56DB] text-sm font-medium inline-flex items-center gap-1 group-hover:gap-2 transition-all">
                  Apply Now <ArrowRight size={12} />
                </button>
              </div>
            );
          })}
        </div>

        {filteredInternships.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500">No internships found matching your criteria.</p>
          </div>
        )}
      </div>

      {/* Internship Modal */}
      {selectedInternship && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedInternship(null)}
        >
          <div
            className="bg-white rounded-2xl max-w-2xl w-full max-h-[85vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="sticky top-0 bg-white border-b border-gray-100 p-6">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center">
                    {selectedInternship.icon && <selectedInternship.icon size={24} className="text-[#1A56DB]" />}
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-gray-800">{selectedInternship.title}</h2>
                    <p className="text-gray-500 mt-1">{selectedInternship.department}</p>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedInternship(null)}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  ✕
                </button>
              </div>
            </div>
            
            <div className="p-6 space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <MapPin size={16} className="text-[#1A56DB]" />
                  <span>{selectedInternship.location}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Clock size={16} className="text-[#1A56DB]" />
                  <span>{selectedInternship.duration}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <DollarSign size={16} className="text-[#1A56DB]" />
                  <span>{selectedInternship.stipend}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Calendar size={16} className="text-[#1A56DB]" />
                  <span>Apply by {new Date(selectedInternship.deadline).toLocaleDateString()}</span>
                </div>
              </div>

              <div>
                <h3 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
                  <GraduationCap size={18} /> Requirements
                </h3>
                <ul className="space-y-2">
                  {selectedInternship.requirements.map((req, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-gray-600">
                      <span className="text-[#1A56DB]">•</span>
                      {req}
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
                  <Briefcase size={18} /> Responsibilities
                </h3>
                <ul className="space-y-2">
                  {selectedInternship.responsibilities.map((resp, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-gray-600">
                      <span className="text-[#1A56DB]">•</span>
                      {resp}
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
                  <Sparkles size={18} /> Perks & Benefits
                </h3>
                <div className="flex flex-wrap gap-2">
                  {selectedInternship.perks.map((perk, i) => (
                    <span key={i} className="px-3 py-1 bg-green-50 text-green-700 text-xs rounded-full">
                      {perk}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-4">
                <button
                  onClick={() => handleApply(selectedInternship.title)}
                  className="w-full inline-flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-[#1A56DB] to-[#2563EB] text-white font-semibold rounded-xl hover:shadow-lg transition-all duration-300"
                >
                  Apply Now <Send size={16} />
                </button>
                <p className="text-xs text-gray-400 text-center mt-3">
                  Send your resume to: <strong>{APPLICATION_EMAIL}</strong> with the position name in subject
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}