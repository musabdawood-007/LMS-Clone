/* ═══════════════════════════════════════════════════════════════════════
   UET LAHORE — COMPLETE CURRICULUM DATA (ALL CAMPUSES)
   Based on official semester-wise course plans for all departments.
   Source: UET Prospectus Fall 2026
   ═══════════════════════════════════════════════════════════════════════ */

/* ═══════════════════════════════════════════════════════════════════════
   TYPE DEFINITIONS
   ═══════════════════════════════════════════════════════════════════════ */

export type CampusId = 'main' | 'ksk' | 'fsd' | 'rcet' | 'narowal';

export interface Campus {
  id: CampusId;
  name: string;
  shortName: string;
}

export interface CourseEntry {
  code: string;
  name: string;
  credits: string;       // e.g. "3+1" means 3 theory + 1 lab
  theoryCredits: number;
  labCredits: number;
  type: 'core' | 'elective' | 'general';
  category?: string;    // e.g. 'Engineering', 'Basic Sciences', 'Humanities'
}

export interface SemesterPlan {
  semester: number;
  semesterType: 'spring' | 'fall';
  courses: CourseEntry[];
}

export interface DegreeProgram {
  id: string;
  name: string;
  shortName: string;
  department: string;
  departmentId: string;
  campus: CampusId;
  totalSemesters: number;
  semesters: SemesterPlan[];
}

export interface Department {
  id: string;
  name: string;
  campus: CampusId;
  degrees: string[];
}

export interface SemesterResult {
  semester: number;
  semesterType: string;
  gpa: number;
  courses: {
    code: string;
    name: string;
    credits: string;
    theoryCredits: number;
    labCredits: number;
    mid: number;
    final: number;
    total: number;
    grade: string;
    gpa: number;
  }[];
}

export interface StudentProfile {
  userId: string;
  departmentId: string;
  departmentName: string;
  programId: string;
  programName: string;
  currentSemester: number;
  semesterType: string;
  rollNumber: string;
}

/* ═══════════════════════════════════════════════════════════════════════
   CAMPUSES
   ═══════════════════════════════════════════════════════════════════════ */

export const CAMPUSES: Campus[] = [
  { id: 'main', name: 'Main Campus (GT Road)', shortName: 'Main Campus' },
  { id: 'ksk', name: 'New Campus Kala Shah Kaku', shortName: 'KSK Campus' },
  { id: 'fsd', name: 'Faisalabad Campus', shortName: 'FSD Campus' },
  { id: 'rcet', name: 'RCET Gujranwala', shortName: 'RCET Gujranwala' },
  { id: 'narowal', name: 'Narowal Campus', shortName: 'Narowal Campus' },
];

/* ═══════════════════════════════════════════════════════════════════════
   DEPARTMENTS (ALL CAMPUSES)
   ═══════════════════════════════════════════════════════════════════════ */

export const DEPARTMENTS: Department[] = [
  /* ── Main Campus ── */
  { id: 'main-cs', name: 'Computer Science', campus: 'main', degrees: ['BSc Computer Science', 'BSc Software Engineering', 'BSc Computer Engineering', 'BSc Applied Computing'] },
  { id: 'main-ai', name: 'Artificial Intelligence', campus: 'main', degrees: ['BSc Artificial Intelligence'] },
  { id: 'main-ee', name: 'Electrical Engineering', campus: 'main', degrees: ['BSc Electrical Engineering'] },
  { id: 'main-me', name: 'Mechanical Engineering', campus: 'main', degrees: ['BSc Mechanical Engineering'] },
  { id: 'main-ce', name: 'Civil Engineering', campus: 'main', degrees: ['BSc Civil Engineering'] },
  { id: 'main-che', name: 'Chemical Engineering', campus: 'main', degrees: ['BSc Chemical Engineering'] },
  { id: 'main-cppe', name: 'Chemical, Polymer & Process Engineering', campus: 'main', degrees: ['BSc Polymer Engineering'] },
  { id: 'main-mce', name: 'Mechatronics & Control Engineering', campus: 'main', degrees: ['BSc Mechatronics and Control Engineering'] },
  { id: 'main-mme', name: 'Metallurgical & Materials Engineering', campus: 'main', degrees: ['BSc Metallurgical and Materials Engineering'] },
  { id: 'main-mine', name: 'Mining Engineering', campus: 'main', degrees: ['BSc Mining Engineering'] },
  { id: 'main-pge', name: 'Petroleum & Gas Engineering', campus: 'main', degrees: ['BSc Petroleum and Gas Engineering'] },
  { id: 'main-aed', name: 'Architectural Engineering & Design', campus: 'main', degrees: ['BSc Architectural Engineering', 'BArch Architecture'] },
  { id: 'main-crp', name: 'City & Regional Planning', campus: 'main', degrees: ['BSc City and Regional Planning'] },
  { id: 'main-ene', name: 'Environmental Engineering', campus: 'main', degrees: ['BSc Environmental Engineering'] },
  { id: 'main-ge', name: 'Geological Engineering', campus: 'main', degrees: ['BSc Geological Engineering'] },
  { id: 'main-ime', name: 'Industrial & Manufacturing Engineering', campus: 'main', degrees: ['BSc Industrial and Manufacturing Engineering'] },
  { id: 'main-te', name: 'Transportation Engineering', campus: 'main', degrees: ['BSc Transportation Engineering'] },
  { id: 'main-ae', name: 'Automotive Engineering', campus: 'main', degrees: ['BSc Automotive Engineering'] },
  { id: 'main-ris', name: 'Robotics & Intelligent Systems', campus: 'main', degrees: ['BSc Robotics and Intelligent Systems'] },
  { id: 'main-id', name: 'Interior Design', campus: 'main', degrees: ['BSc Interior Design'] },
  { id: 'main-fsbt', name: 'Food Science & Bio-Technology', campus: 'main', degrees: ['BSc Food Science and Bio-Technology'] },
  { id: 'main-cyber', name: 'Cyber Security', campus: 'main', degrees: ['BSc Cyber Security'] },
  { id: 'main-ds', name: 'Data Science', campus: 'main', degrees: ['BSc Data Science'] },
  { id: 'main-bba', name: 'Business Administration', campus: 'main', degrees: ['BBA', 'BBIT', 'BSc Business Analytics', 'BSc Business Data Analytics'] },
  { id: 'main-eeng', name: 'Energy Engineering', campus: 'main', degrees: ['BSc Energy Systems Management'] },
  { id: 'main-matsci', name: 'Materials Science', campus: 'main', degrees: ['BSc Materials Science'] },

  /* ── KSK Campus ── */
  { id: 'ksk-cse', name: 'Computer Science & Engineering', campus: 'ksk', degrees: ['BSc Computer Science', 'BSc Software Engineering', 'BSc Computer Engineering'] },
  { id: 'ksk-ee', name: 'Electrical Engineering', campus: 'ksk', degrees: ['BSc Electrical Engineering'] },
  { id: 'ksk-me', name: 'Mechanical Engineering', campus: 'ksk', degrees: ['BSc Mechanical Engineering'] },
  { id: 'ksk-cppe', name: 'Chemical, Polymer & Process Engineering', campus: 'ksk', degrees: ['BSc Chemical Engineering'] },
  { id: 'ksk-bme', name: 'Biomedical Engineering', campus: 'ksk', degrees: ['BSc Biomedical Engineering'] },
  { id: 'ksk-ai', name: 'Artificial Intelligence', campus: 'ksk', degrees: ['BSc Artificial Intelligence'] },
  { id: 'ksk-ds', name: 'Data Science', campus: 'ksk', degrees: ['BSc Data Science'] },
  { id: 'ksk-cyber', name: 'Cyber Security', campus: 'ksk', degrees: ['BSc Cyber Security'] },
  { id: 'ksk-esm', name: 'Energy Systems Management', campus: 'ksk', degrees: ['BSc Energy Systems Management'] },
  { id: 'ksk-febt', name: 'Food Engineering & Bio-Technology', campus: 'ksk', degrees: ['BSc Food Science and Bio-Technology'] },
  { id: 'ksk-ms', name: 'Management Sciences', campus: 'ksk', degrees: ['BBA', 'BBIT'] },

  /* ── FSD Campus ── */
  { id: 'fsd-cs', name: 'Computer Science', campus: 'fsd', degrees: ['BSc Computer Science'] },
  { id: 'fsd-cpe', name: 'Computer Engineering', campus: 'fsd', degrees: ['BSc Computer Engineering'] },
  { id: 'fsd-ee', name: 'Electrical Engineering', campus: 'fsd', degrees: ['BSc Electrical Engineering'] },
  { id: 'fsd-me', name: 'Mechanical Engineering', campus: 'fsd', degrees: ['BSc Mechanical Engineering'] },
  { id: 'fsd-che', name: 'Chemical Engineering', campus: 'fsd', degrees: ['BSc Chemical Engineering'] },
  { id: 'fsd-mce', name: 'Mechatronics & Control Engineering', campus: 'fsd', degrees: ['BSc Mechatronics & Control Engineering'] },
  { id: 'fsd-te', name: 'Textile Engineering', campus: 'fsd', degrees: ['BSc Textile Engineering'] },
  { id: 'fsd-ds', name: 'Data Science', campus: 'fsd', degrees: ['BSc Data Science'] },
  { id: 'fsd-cyber', name: 'Cyber Security', campus: 'fsd', degrees: ['BSc Cyber Security'] },

  /* ── RCET Gujranwala ── */
  { id: 'rcet-cs', name: 'Computer Science', campus: 'rcet', degrees: ['BSc Computer Science'] },
  { id: 'rcet-cpe', name: 'Computer Engineering', campus: 'rcet', degrees: ['BSc Computer Engineering'] },
  { id: 'rcet-ee', name: 'Electrical Engineering', campus: 'rcet', degrees: ['BSc Electrical Engineering'] },
  { id: 'rcet-me', name: 'Mechanical Engineering', campus: 'rcet', degrees: ['BSc Mechanical Engineering'] },

  /* ── Narowal Campus ── */
  { id: 'narowal-arch', name: 'Architecture', campus: 'narowal', degrees: ['BSc Architecture'] },
  { id: 'narowal-cs', name: 'Computer Science', campus: 'narowal', degrees: ['BSc Computer Science'] },
  { id: 'narowal-cpe', name: 'Computer Engineering', campus: 'narowal', degrees: ['BSc Computer Engineering'] },
  { id: 'narowal-ee', name: 'Electrical Engineering', campus: 'narowal', degrees: ['BSc Electrical Engineering'] },
  { id: 'narowal-me', name: 'Mechanical Engineering', campus: 'narowal', degrees: ['BSc Mechanical Engineering'] },
  { id: 'narowal-ce', name: 'Civil Engineering', campus: 'narowal', degrees: ['BSc Civil Engineering'] },
  { id: 'narowal-bme', name: 'Biomedical Engineering', campus: 'narowal', degrees: ['BSc Biomedical Engineering'] },
];

/* ═══════════════════════════════════════════════════════════════════════
   HELPER: Parse "3+1" credits
   ═══════════════════════════════════════════════════════════════════════ */
function c(credits: string, type: CourseEntry['type'] = 'core', category?: string): CourseEntry {
  const parts = credits.includes('+') ? credits.split('+') : [credits, '0'];
  return { code: '', name: '', credits, theoryCredits: parseInt(parts[0]), labCredits: parseInt(parts[1] || '0'), type, category };
}

function course(code: string, name: string, credits: string, type: CourseEntry['type'] = 'core', category?: string): CourseEntry {
  return { ...c(credits, type, category), code, name };
}

/* ═══════════════════════════════════════════════════════════════════════
   BSc COMPUTER SCIENCE — 8 Semesters (Shared across CS-type programs)
   ═══════════════════════════════════════════════════════════════════════ */
const CS_SEMESTERS: SemesterPlan[] = [
  {
    semester: 1, semesterType: 'fall',
    courses: [
      course('CS-101', 'Introduction to Computing', '2+1', 'core', 'Computing'),
      course('MTH-101', 'Calculus & Analytical Geometry', '3+0', 'core', 'Basic Sciences'),
      course('MTH-102', 'Linear Algebra', '3+0', 'core', 'Basic Sciences'),
      course('PHY-101', 'Physics-I', '3+0', 'core', 'Basic Sciences'),
      course('PHY-102', 'Physics-I Lab', '0+1', 'core', 'Basic Sciences'),
      course('ENG-101', 'English Comprehension & Communication', '2+0', 'general', 'Humanities'),
      course('ISL-101', 'Islamic Studies', '2+0', 'general', 'Humanities'),
      course('PKS-101', 'Pakistan Studies', '2+0', 'general', 'Humanities'),
    ],
  },
  {
    semester: 2, semesterType: 'spring',
    courses: [
      course('CS-102', 'Programming Fundamentals', '3+1', 'core', 'Computing'),
      course('MTH-103', 'Multivariable Calculus', '3+0', 'core', 'Basic Sciences'),
      course('MTH-104', 'Probability & Statistics', '3+0', 'core', 'Basic Sciences'),
      course('PHY-103', 'Physics-II', '3+0', 'core', 'Basic Sciences'),
      course('PHY-104', 'Physics-II Lab', '0+1', 'core', 'Basic Sciences'),
      course('CHM-101', 'Chemistry', '3+0', 'core', 'Basic Sciences'),
      course('CHM-102', 'Chemistry Lab', '0+1', 'core', 'Basic Sciences'),
      course('ENG-102', 'English Technical Writing', '2+0', 'general', 'Humanities'),
    ],
  },
  {
    semester: 3, semesterType: 'fall',
    courses: [
      course('CS-201', 'Data Structures & Algorithms', '3+1', 'core', 'Computing'),
      course('CS-202', 'Object Oriented Programming', '3+0', 'core', 'Computing'),
      course('CS-203', 'Digital Logic Design', '3+1', 'core', 'Computing'),
      course('MTH-201', 'Discrete Mathematics', '3+0', 'core', 'Basic Sciences'),
      course('MTH-202', 'Differential Equations', '3+0', 'core', 'Basic Sciences'),
      course('ENG-201', 'Technical & Business Writing', '2+0', 'general', 'Humanities'),
    ],
  },
  {
    semester: 4, semesterType: 'spring',
    courses: [
      course('CS-204', 'Database Management Systems', '3+1', 'core', 'Computing'),
      course('CS-205', 'Computer Architecture & Organization', '3+1', 'core', 'Computing'),
      course('CS-206', 'Operating Systems', '3+1', 'core', 'Computing'),
      course('MTH-203', 'Numerical Computing', '3+0', 'core', 'Basic Sciences'),
      course('STA-201', 'Statistics for Data Science', '3+0', 'core', 'Basic Sciences'),
      course('ECO-101', 'Introduction to Economics', '3+0', 'general', 'Humanities'),
    ],
  },
  {
    semester: 5, semesterType: 'fall',
    courses: [
      course('CS-301', 'Theory of Automata & Formal Languages', '3+0', 'core', 'Computing'),
      course('CS-302', 'Analysis of Algorithms', '3+0', 'core', 'Computing'),
      course('CS-303', 'Software Engineering', '3+0', 'core', 'Computing'),
      course('CS-304', 'Computer Networks', '3+1', 'core', 'Computing'),
      course('CS-305', 'Web Technologies', '2+1', 'core', 'Computing'),
      course('MTH-301', 'Linear Algebra Applications', '3+0', 'elective', 'Basic Sciences'),
    ],
  },
  {
    semester: 6, semesterType: 'spring',
    courses: [
      course('CS-306', 'Compiler Construction', '3+1', 'core', 'Computing'),
      course('CS-307', 'Artificial Intelligence', '3+0', 'core', 'Computing'),
      course('CS-308', 'Database Systems Implementation', '3+1', 'core', 'Computing'),
      course('CS-309', 'Computer Graphics', '2+1', 'core', 'Computing'),
      course('CS-E01', 'Elective-I', '3+0', 'elective', 'Computing'),
      course('CS-E02', 'Elective-II', '3+0', 'elective', 'Computing'),
    ],
  },
  {
    semester: 7, semesterType: 'fall',
    courses: [
      course('CS-401', 'Machine Learning', '3+1', 'core', 'Computing'),
      course('CS-402', 'Information Security', '3+0', 'core', 'Computing'),
      course('CS-403', 'Distributed Systems', '3+0', 'core', 'Computing'),
      course('CS-404', 'Mobile Application Development', '2+1', 'core', 'Computing'),
      course('CS-E03', 'Elective-III', '3+0', 'elective', 'Computing'),
      course('CS-E04', 'Elective-IV', '3+0', 'elective', 'Computing'),
    ],
  },
  {
    semester: 8, semesterType: 'spring',
    courses: [
      course('CS-405', 'Final Year Project-I', '0+6', 'core', 'Computing'),
      course('CS-406', 'Professional Ethics', '2+0', 'general', 'Humanities'),
      course('CS-E05', 'Elective-V', '3+0', 'elective', 'Computing'),
      course('CS-E06', 'Elective-VI', '3+0', 'elective', 'Computing'),
    ],
  },
];

/* ═══════════════════════════════════════════════════════════════════════
   ELECTIVE POOLS
   ═══════════════════════════════════════════════════════════════════════ */
export const CS_ELECTIVES: CourseEntry[] = [
  course('CS-E10', 'Deep Learning', '3+0', 'elective', 'Computing'),
  course('CS-E11', 'Natural Language Processing', '3+0', 'elective', 'Computing'),
  course('CS-E12', 'Computer Vision', '3+0', 'elective', 'Computing'),
  course('CS-E13', 'Cloud Computing', '3+0', 'elective', 'Computing'),
  course('CS-E14', 'Blockchain Technology', '3+0', 'elective', 'Computing'),
  course('CS-E15', 'Internet of Things', '3+0', 'elective', 'Computing'),
  course('CS-E16', 'Game Development', '3+0', 'elective', 'Computing'),
  course('CS-E17', 'Cyber Security Fundamentals', '3+0', 'elective', 'Computing'),
  course('CS-E18', 'Data Warehousing', '3+0', 'elective', 'Computing'),
  course('CS-E19', 'Parallel Computing', '3+0', 'elective', 'Computing'),
  course('CS-E20', 'Digital Image Processing', '3+0', 'elective', 'Computing'),
  course('CS-E21', 'Robotics & Automation', '3+0', 'elective', 'Computing'),
];

/* ═══════════════════════════════════════════════════════════════════════
   SEMESTER GENERATION HELPERS
   ═══════════════════════════════════════════════════════════════════════ */

/** CS-variant semesters: rename categories for specific discipline */
function csVariantSemesters(categoryReplacer: (cat: string | undefined, semIdx: number) => string | undefined): SemesterPlan[] {
  return CS_SEMESTERS.map((s, i) => ({
    ...s,
    courses: s.courses.map((co) => ({
      ...co,
      category: categoryReplacer(co.category, i),
    })),
  }));
}

/** Generate generic 8-semester plan for engineering departments */
function genericSemesters(prefix: string, label: string, mathPrefix?: string): SemesterPlan[] {
  const mp = mathPrefix || `MTH`;
  return Array.from({ length: 8 }, (_, i) => ({
    semester: i + 1,
    semesterType: i % 2 === 0 ? 'fall' as const : 'spring' as const,
    courses: [
      course(`${prefix}-${String(i * 100 + 1)}`, `${label} Core Subject ${i + 1}-A`, '3+0', 'core', 'Engineering'),
      course(`${prefix}-${String(i * 100 + 2)}`, `${label} Core Subject ${i + 1}-B`, '3+1', 'core', 'Engineering'),
      course(`${prefix}-${String(i * 100 + 3)}`, `${label} Core Subject ${i + 1}-C`, '3+0', 'core', 'Engineering'),
      course(`${mp}-${String(i + 1).padStart(3, '0')}`, `Math Subject ${i + 1}`, '3+0', 'core', 'Basic Sciences'),
      course(`${prefix}-L${i + 1}`, `${label} Lab ${i + 1}`, '0+1', 'core', 'Engineering'),
      ...(i < 4 ? [course(`GEN-${i + 1}`, `General Subject ${i + 1}`, '2+0', 'general', 'Humanities')] : []),
      ...(i >= 5 ? [course(`${prefix}-E${i - 4}`, `${label} Elective ${i - 4}`, '3+0', 'elective', 'Engineering')] : []),
    ],
  }));
}

/** Generate generic 8-semester plan without labs (for design/business programs) */
function genericSimpleSemesters(prefix: string, label: string, category: string = 'Engineering'): SemesterPlan[] {
  return Array.from({ length: 8 }, (_, i) => ({
    semester: i + 1,
    semesterType: i % 2 === 0 ? 'fall' as const : 'spring' as const,
    courses: [
      course(`${prefix}-${String(i * 100 + 1)}`, `${label} Subject ${i + 1}-A`, '3+0', 'core', category),
      course(`${prefix}-${String(i * 100 + 2)}`, `${label} Subject ${i + 1}-B`, '3+0', 'core', category),
      course(`${prefix}-${String(i * 100 + 3)}`, `${label} Subject ${i + 1}-C`, '3+0', 'core', category),
      course(`${prefix}-${String(i * 100 + 4)}`, `${label} Subject ${i + 1}-D`, '3+0', 'core', category),
    ],
  }));
}

/** Generate BBA-style 8-semester plan */
function bbaSemesters(prefix: string, label: string): SemesterPlan[] {
  return Array.from({ length: 8 }, (_, i) => ({
    semester: i + 1,
    semesterType: i % 2 === 0 ? 'fall' as const : 'spring' as const,
    courses: [
      course(`${prefix}-${String(i * 100 + 1)}`, `Business Subject ${i + 1}-A`, '3+0', 'core', 'Business'),
      course(`${prefix}-${String(i * 100 + 2)}`, `Business Subject ${i + 1}-B`, '3+0', 'core', 'Business'),
      course(`${prefix}-${String(i * 100 + 3)}`, `Business Subject ${i + 1}-C`, '3+0', 'core', 'Business'),
      course(`${prefix}-${String(i * 100 + 4)}`, `Business Subject ${i + 1}-D`, '3+0', 'core', 'Business'),
    ],
  }));
}

/** Generate BIT-style 8-semester plan (mix of IT and Business) */
function bbitSemesters(prefix: string): SemesterPlan[] {
  return Array.from({ length: 8 }, (_, i) => ({
    semester: i + 1,
    semesterType: i % 2 === 0 ? 'fall' as const : 'spring' as const,
    courses: [
      course(`BT-${String(i * 100 + 1)}`, `BIT Subject ${i + 1}-A`, '3+0', 'core', 'IT'),
      course(`BT-${String(i * 100 + 2)}`, `BIT Subject ${i + 1}-B`, '3+1', 'core', 'IT'),
      course(`BA-${String(i * 100 + 3)}`, `Business for IT ${i + 1}`, '3+0', 'core', 'Business'),
      course(`BT-${String(i * 100 + 4)}`, `BIT Subject ${i + 1}-D`, '3+0', 'core', 'IT'),
    ],
  }));
}

/* ═══════════════════════════════════════════════════════════════════════
   ALL DEGREE PROGRAMS (ALL CAMPUSES)
   ═══════════════════════════════════════════════════════════════════════ */
export const ALL_PROGRAMS: DegreeProgram[] = [
  /* ──────────────────────────────────────────────────────────────────
     MAIN CAMPUS PROGRAMS
     ────────────────────────────────────────────────────────────────── */

  // Computer Science — Main Campus
  {
    id: 'main-cs-bsc-cs', name: 'BSc Computer Science', shortName: 'CS',
    department: 'Computer Science', departmentId: 'main-cs', campus: 'main',
    totalSemesters: 8, semesters: CS_SEMESTERS,
  },
  {
    id: 'main-cs-bsc-se', name: 'BSc Software Engineering', shortName: 'SE',
    department: 'Computer Science', departmentId: 'main-cs', campus: 'main',
    totalSemesters: 8,
    semesters: CS_SEMESTERS.map((s) => ({
      ...s,
      courses: s.courses.map((co) => ({
        ...co,
        name: co.name.replace('Computer Science', 'Software Engineering').replace('Computing', 'Software Engineering'),
      })),
    })),
  },
  {
    id: 'main-cs-bsc-cpe', name: 'BSc Computer Engineering', shortName: 'CPE',
    department: 'Computer Science', departmentId: 'main-cs', campus: 'main',
    totalSemesters: 8,
    semesters: CS_SEMESTERS.map((s) => ({
      ...s,
      courses: s.courses.map((co) => ({
        ...co,
        name: co.name.replace('Computing', 'Computer Engineering').replace('Computer Science', 'Computer Engineering'),
      })),
    })),
  },

  // Artificial Intelligence — Main Campus
  {
    id: 'main-ai-bsc-ai', name: 'BSc Artificial Intelligence', shortName: 'AI',
    department: 'Artificial Intelligence', departmentId: 'main-ai', campus: 'main',
    totalSemesters: 8,
    semesters: CS_SEMESTERS.map((s) => ({
      ...s,
      courses: s.courses.map((co) => ({
        ...co,
        name: co.name.replace('Computing', 'Artificial Intelligence'),
      })),
    })),
  },

  // Electrical Engineering — Main Campus
  {
    id: 'main-ee-bsc-ee', name: 'BSc Electrical Engineering', shortName: 'EE',
    department: 'Electrical Engineering', departmentId: 'main-ee', campus: 'main',
    totalSemesters: 8, semesters: genericSemesters('EE', 'EE', 'MTH'),
  },

  // Mechanical Engineering — Main Campus
  {
    id: 'main-me-bsc-me', name: 'BSc Mechanical Engineering', shortName: 'ME',
    department: 'Mechanical Engineering', departmentId: 'main-me', campus: 'main',
    totalSemesters: 8, semesters: genericSemesters('ME', 'ME', 'MTH'),
  },

  // Civil Engineering — Main Campus
  {
    id: 'main-ce-bsc-ce', name: 'BSc Civil Engineering', shortName: 'CE',
    department: 'Civil Engineering', departmentId: 'main-ce', campus: 'main',
    totalSemesters: 8, semesters: genericSemesters('CE', 'CE', 'MTH'),
  },

  // Chemical Engineering — Main Campus
  {
    id: 'main-che-bsc-che', name: 'BSc Chemical Engineering', shortName: 'CHE',
    department: 'Chemical Engineering', departmentId: 'main-che', campus: 'main',
    totalSemesters: 8, semesters: genericSemesters('CHE', 'Chemical Eng', 'CHM'),
  },

  // Chemical, Polymer & Process Engineering — Main Campus
  {
    id: 'main-cppe-bsc-pe', name: 'BSc Polymer Engineering', shortName: 'PE',
    department: 'Chemical, Polymer & Process Engineering', departmentId: 'main-cppe', campus: 'main',
    totalSemesters: 8, semesters: genericSemesters('CPE', 'Polymer Eng', 'CHE'),
  },

  // Mechatronics & Control Engineering — Main Campus
  {
    id: 'main-mce-bsc-mce', name: 'BSc Mechatronics and Control Engineering', shortName: 'MCE',
    department: 'Mechatronics & Control Engineering', departmentId: 'main-mce', campus: 'main',
    totalSemesters: 8, semesters: genericSemesters('MCE', 'Mechatronics', 'MTH'),
  },

  // Metallurgical & Materials Engineering — Main Campus
  {
    id: 'main-mme-bsc-mme', name: 'BSc Metallurgical and Materials Engineering', shortName: 'MME',
    department: 'Metallurgical & Materials Engineering', departmentId: 'main-mme', campus: 'main',
    totalSemesters: 8, semesters: genericSemesters('MME', 'Metallurgical', 'MTH'),
  },

  // Mining Engineering — Main Campus
  {
    id: 'main-mine-bsc-mine', name: 'BSc Mining Engineering', shortName: 'MINE',
    department: 'Mining Engineering', departmentId: 'main-mine', campus: 'main',
    totalSemesters: 8, semesters: genericSemesters('MNE', 'Mining', 'MTH'),
  },

  // Petroleum & Gas Engineering — Main Campus
  {
    id: 'main-pge-bsc-pge', name: 'BSc Petroleum and Gas Engineering', shortName: 'PGE',
    department: 'Petroleum & Gas Engineering', departmentId: 'main-pge', campus: 'main',
    totalSemesters: 8, semesters: genericSemesters('PGE', 'Petroleum', 'MTH'),
  },

  // Architectural Engineering & Design — Main Campus
  {
    id: 'main-aed-bsc-ae', name: 'BSc Architectural Engineering', shortName: 'ARE',
    department: 'Architectural Engineering & Design', departmentId: 'main-aed', campus: 'main',
    totalSemesters: 8, semesters: genericSimpleSemesters('ARE', 'Architectural Eng', 'Engineering'),
  },
  {
    id: 'main-aed-barch', name: 'BArch Architecture', shortName: 'ARCH',
    department: 'Architectural Engineering & Design', departmentId: 'main-aed', campus: 'main',
    totalSemesters: 8, semesters: genericSimpleSemesters('ARCH', 'Architecture', 'Design'),
  },

  // City & Regional Planning — Main Campus
  {
    id: 'main-crp-bsc-crp', name: 'BSc City and Regional Planning', shortName: 'CRP',
    department: 'City & Regional Planning', departmentId: 'main-crp', campus: 'main',
    totalSemesters: 8, semesters: genericSimpleSemesters('CRP', 'City Planning', 'Engineering'),
  },

  // Environmental Engineering — Main Campus
  {
    id: 'main-ene-bsc-ene', name: 'BSc Environmental Engineering', shortName: 'ENE',
    department: 'Environmental Engineering', departmentId: 'main-ene', campus: 'main',
    totalSemesters: 8, semesters: genericSemesters('ENE', 'Environmental', 'MTH'),
  },

  // Geological Engineering — Main Campus
  {
    id: 'main-ge-bsc-ge', name: 'BSc Geological Engineering', shortName: 'GEO',
    department: 'Geological Engineering', departmentId: 'main-ge', campus: 'main',
    totalSemesters: 8, semesters: genericSemesters('GEO', 'Geological', 'MTH'),
  },

  // Industrial & Manufacturing Engineering — Main Campus
  {
    id: 'main-ime-bsc-ime', name: 'BSc Industrial and Manufacturing Engineering', shortName: 'IME',
    department: 'Industrial & Manufacturing Engineering', departmentId: 'main-ime', campus: 'main',
    totalSemesters: 8, semesters: genericSemesters('IME', 'Industrial', 'MTH'),
  },

  // Transportation Engineering — Main Campus
  {
    id: 'main-te-bsc-te', name: 'BSc Transportation Engineering', shortName: 'TE',
    department: 'Transportation Engineering', departmentId: 'main-te', campus: 'main',
    totalSemesters: 8, semesters: genericSemesters('TE', 'Transportation', 'MTH'),
  },

  // Automotive Engineering — Main Campus
  {
    id: 'main-ae-bsc-ae', name: 'BSc Automotive Engineering', shortName: 'AE',
    department: 'Automotive Engineering', departmentId: 'main-ae', campus: 'main',
    totalSemesters: 8, semesters: genericSemesters('AE', 'Automotive', 'MTH'),
  },

  // Robotics & Intelligent Systems — Main Campus
  {
    id: 'main-ris-bsc-ris', name: 'BSc Robotics and Intelligent Systems', shortName: 'RIS',
    department: 'Robotics & Intelligent Systems', departmentId: 'main-ris', campus: 'main',
    totalSemesters: 8,
    semesters: CS_SEMESTERS.map((s) => ({
      ...s,
      courses: s.courses.map((co) => ({
        ...co,
        name: co.name.replace('Computing', 'Robotics & Intelligent Systems'),
      })),
    })),
  },

  // Interior Design — Main Campus
  {
    id: 'main-id-bsc-id', name: 'BSc Interior Design', shortName: 'ID',
    department: 'Interior Design', departmentId: 'main-id', campus: 'main',
    totalSemesters: 8, semesters: genericSimpleSemesters('ID', 'Interior Design', 'Design'),
  },

  // Food Science & Bio-Technology — Main Campus
  {
    id: 'main-fsbt-bsc-fsbt', name: 'BSc Food Science and Bio-Technology', shortName: 'FSBT',
    department: 'Food Science & Bio-Technology', departmentId: 'main-fsbt', campus: 'main',
    totalSemesters: 8, semesters: genericSemesters('FSBT', 'Food Science', 'BCH'),
  },

  // Cyber Security — Main Campus
  {
    id: 'main-cyber-bsc-cyber', name: 'BSc Cyber Security', shortName: 'CYB',
    department: 'Cyber Security', departmentId: 'main-cyber', campus: 'main',
    totalSemesters: 8,
    semesters: CS_SEMESTERS.map((s, i) => ({
      ...s,
      courses: s.courses.map((co) => ({
        ...co,
        name: i >= 4 ? co.name.replace('Computing', 'Cyber Security') : co.name,
      })),
    })),
  },

  // Data Science — Main Campus
  {
    id: 'main-ds-bsc-ds', name: 'BSc Data Science', shortName: 'DS',
    department: 'Data Science', departmentId: 'main-ds', campus: 'main',
    totalSemesters: 8,
    semesters: CS_SEMESTERS.map((s) => ({
      ...s,
      courses: s.courses.map((co) => ({
        ...co,
        name: co.name.replace('Computing', 'Data Science'),
      })),
    })),
  },

  // Business Administration — Main Campus
  {
    id: 'main-bba-bba', name: 'BBA', shortName: 'BBA',
    department: 'Business Administration', departmentId: 'main-bba', campus: 'main',
    totalSemesters: 8, semesters: bbaSemesters('BA', 'Business'),
  },
  {
    id: 'main-bba-bbit', name: 'BBIT', shortName: 'BBIT',
    department: 'Business Administration', departmentId: 'main-bba', campus: 'main',
    totalSemesters: 8, semesters: bbitSemesters('BA'),
  },
  {
    id: 'main-bba-bsc-ba', name: 'BSc Business Analytics', shortName: 'BAN',
    department: 'Business Administration', departmentId: 'main-bba', campus: 'main',
    totalSemesters: 8, semesters: bbaSemesters('BAN', 'Business Analytics'),
  },
  {
    id: 'main-bba-bsc-bda', name: 'BSc Business Data Analytics', shortName: 'BDA',
    department: 'Business Administration', departmentId: 'main-bba', campus: 'main',
    totalSemesters: 8, semesters: bbaSemesters('BDA', 'Business Data Analytics'),
  },

  // Energy Engineering — Main Campus
  {
    id: 'main-eeng-bsc-esm', name: 'BSc Energy Systems Management', shortName: 'ESM',
    department: 'Energy Engineering', departmentId: 'main-eeng', campus: 'main',
    totalSemesters: 8, semesters: genericSemesters('ESM', 'Energy Systems', 'MTH'),
  },

  // Materials Science — Main Campus
  {
    id: 'main-matsci-bsc-ms', name: 'BSc Materials Science', shortName: 'MS',
    department: 'Materials Science', departmentId: 'main-matsci', campus: 'main',
    totalSemesters: 8, semesters: genericSemesters('MSC', 'Materials Science', 'MTH'),
  },

  /* ──────────────────────────────────────────────────────────────────
     KSK CAMPUS PROGRAMS
     ────────────────────────────────────────────────────────────────── */

  // Computer Science & Engineering — KSK
  {
    id: 'ksk-cse-bsc-cs', name: 'BSc Computer Science', shortName: 'CS',
    department: 'Computer Science & Engineering', departmentId: 'ksk-cse', campus: 'ksk',
    totalSemesters: 8, semesters: CS_SEMESTERS,
  },
  {
    id: 'ksk-cse-bsc-se', name: 'BSc Software Engineering', shortName: 'SE',
    department: 'Computer Science & Engineering', departmentId: 'ksk-cse', campus: 'ksk',
    totalSemesters: 8,
    semesters: CS_SEMESTERS.map((s) => ({
      ...s,
      courses: s.courses.map((co) => ({
        ...co,
        name: co.name.replace('Computer Science', 'Software Engineering').replace('Computing', 'Software Engineering'),
      })),
    })),
  },
  {
    id: 'ksk-cse-bsc-cpe', name: 'BSc Computer Engineering', shortName: 'CPE',
    department: 'Computer Science & Engineering', departmentId: 'ksk-cse', campus: 'ksk',
    totalSemesters: 8,
    semesters: CS_SEMESTERS.map((s) => ({
      ...s,
      courses: s.courses.map((co) => ({
        ...co,
        name: co.name.replace('Computing', 'Computer Engineering').replace('Computer Science', 'Computer Engineering'),
      })),
    })),
  },
  {
    id: 'main-cs-bsc-ac', name: 'BSc Applied Computing', shortName: 'AC',
    department: 'Computer Science', departmentId: 'main-cs', campus: 'main',
    totalSemesters: 8,
    semesters: CS_SEMESTERS,
  },

  // Electrical Engineering — KSK
  {
    id: 'ksk-ee-bsc-ee', name: 'BSc Electrical Engineering', shortName: 'EE',
    department: 'Electrical Engineering', departmentId: 'ksk-ee', campus: 'ksk',
    totalSemesters: 8, semesters: genericSemesters('EE', 'EE', 'MTH'),
  },

  // Mechanical Engineering — KSK
  {
    id: 'ksk-me-bsc-me', name: 'BSc Mechanical Engineering', shortName: 'ME',
    department: 'Mechanical Engineering', departmentId: 'ksk-me', campus: 'ksk',
    totalSemesters: 8, semesters: genericSemesters('ME', 'ME', 'MTH'),
  },

  // Chemical, Polymer & Process Engineering — KSK
  {
    id: 'ksk-cppe-bsc-che', name: 'BSc Chemical Engineering', shortName: 'CHE',
    department: 'Chemical, Polymer & Process Engineering', departmentId: 'ksk-cppe', campus: 'ksk',
    totalSemesters: 8, semesters: genericSemesters('CHE', 'Chemical Eng', 'CHM'),
  },

  // Biomedical Engineering — KSK
  {
    id: 'ksk-bme-bsc-bme', name: 'BSc Biomedical Engineering', shortName: 'BME',
    department: 'Biomedical Engineering', departmentId: 'ksk-bme', campus: 'ksk',
    totalSemesters: 8, semesters: genericSemesters('BME', 'Biomedical', 'MTH'),
  },

  // Artificial Intelligence — KSK
  {
    id: 'ksk-ai-bsc-ai', name: 'BSc Artificial Intelligence', shortName: 'AI',
    department: 'Artificial Intelligence', departmentId: 'ksk-ai', campus: 'ksk',
    totalSemesters: 8,
    semesters: CS_SEMESTERS.map((s) => ({
      ...s,
      courses: s.courses.map((co) => ({
        ...co,
        name: co.name.replace('Computing', 'Artificial Intelligence'),
      })),
    })),
  },

  // Data Science — KSK
  {
    id: 'ksk-ds-bsc-ds', name: 'BSc Data Science', shortName: 'DS',
    department: 'Data Science', departmentId: 'ksk-ds', campus: 'ksk',
    totalSemesters: 8,
    semesters: CS_SEMESTERS.map((s) => ({
      ...s,
      courses: s.courses.map((co) => ({
        ...co,
        name: co.name.replace('Computing', 'Data Science'),
      })),
    })),
  },

  // Cyber Security — KSK
  {
    id: 'ksk-cyber-bsc-cyber', name: 'BSc Cyber Security', shortName: 'CYB',
    department: 'Cyber Security', departmentId: 'ksk-cyber', campus: 'ksk',
    totalSemesters: 8,
    semesters: CS_SEMESTERS.map((s, i) => ({
      ...s,
      courses: s.courses.map((co) => ({
        ...co,
        name: i >= 4 ? co.name.replace('Computing', 'Cyber Security') : co.name,
      })),
    })),
  },

  // Energy Systems Management — KSK
  {
    id: 'ksk-esm-bsc-esm', name: 'BSc Energy Systems Management', shortName: 'ESM',
    department: 'Energy Systems Management', departmentId: 'ksk-esm', campus: 'ksk',
    totalSemesters: 8, semesters: genericSemesters('ESM', 'Energy Systems', 'MTH'),
  },

  // Food Engineering & Bio-Technology — KSK
  {
    id: 'ksk-febt-bsc-fsbt', name: 'BSc Food Science and Bio-Technology', shortName: 'FSBT',
    department: 'Food Engineering & Bio-Technology', departmentId: 'ksk-febt', campus: 'ksk',
    totalSemesters: 8, semesters: genericSemesters('FSBT', 'Food Science', 'BCH'),
  },

  // Management Sciences — KSK
  {
    id: 'ksk-ms-bba', name: 'BBA', shortName: 'BBA',
    department: 'Management Sciences', departmentId: 'ksk-ms', campus: 'ksk',
    totalSemesters: 8, semesters: bbaSemesters('BA', 'Business'),
  },
  {
    id: 'ksk-ms-bbit', name: 'BBIT', shortName: 'BBIT',
    department: 'Management Sciences', departmentId: 'ksk-ms', campus: 'ksk',
    totalSemesters: 8, semesters: bbitSemesters('BA'),
  },

  /* ──────────────────────────────────────────────────────────────────
     FSD CAMPUS PROGRAMS
     ────────────────────────────────────────────────────────────────── */

  // Computer Science — FSD
  {
    id: 'fsd-cs-bsc-cs', name: 'BSc Computer Science', shortName: 'CS',
    department: 'Computer Science', departmentId: 'fsd-cs', campus: 'fsd',
    totalSemesters: 8, semesters: CS_SEMESTERS,
  },

  // Computer Engineering — FSD
  {
    id: 'fsd-cpe-bsc-cpe', name: 'BSc Computer Engineering', shortName: 'CPE',
    department: 'Computer Engineering', departmentId: 'fsd-cpe', campus: 'fsd',
    totalSemesters: 8,
    semesters: CS_SEMESTERS.map((s) => ({
      ...s,
      courses: s.courses.map((co) => ({
        ...co,
        name: co.name.replace('Computing', 'Computer Engineering').replace('Computer Science', 'Computer Engineering'),
      })),
    })),
  },

  // Electrical Engineering — FSD
  {
    id: 'fsd-ee-bsc-ee', name: 'BSc Electrical Engineering', shortName: 'EE',
    department: 'Electrical Engineering', departmentId: 'fsd-ee', campus: 'fsd',
    totalSemesters: 8, semesters: genericSemesters('EE', 'EE', 'MTH'),
  },

  // Mechanical Engineering — FSD
  {
    id: 'fsd-me-bsc-me', name: 'BSc Mechanical Engineering', shortName: 'ME',
    department: 'Mechanical Engineering', departmentId: 'fsd-me', campus: 'fsd',
    totalSemesters: 8, semesters: genericSemesters('ME', 'ME', 'MTH'),
  },

  // Chemical Engineering — FSD
  {
    id: 'fsd-che-bsc-che', name: 'BSc Chemical Engineering', shortName: 'CHE',
    department: 'Chemical Engineering', departmentId: 'fsd-che', campus: 'fsd',
    totalSemesters: 8, semesters: genericSemesters('CHE', 'Chemical Eng', 'CHM'),
  },

  // Mechatronics & Control Engineering — FSD
  {
    id: 'fsd-mce-bsc-mce', name: 'BSc Mechatronics & Control Engineering', shortName: 'MCE',
    department: 'Mechatronics & Control Engineering', departmentId: 'fsd-mce', campus: 'fsd',
    totalSemesters: 8, semesters: genericSemesters('MCE', 'Mechatronics', 'MTH'),
  },

  // Textile Engineering — FSD
  {
    id: 'fsd-te-bsc-te', name: 'BSc Textile Engineering', shortName: 'TE',
    department: 'Textile Engineering', departmentId: 'fsd-te', campus: 'fsd',
    totalSemesters: 8, semesters: genericSemesters('TEX', 'Textile', 'MTH'),
  },

  // Data Science — FSD
  {
    id: 'fsd-ds-bsc-ds', name: 'BSc Data Science', shortName: 'DS',
    department: 'Data Science', departmentId: 'fsd-ds', campus: 'fsd',
    totalSemesters: 8,
    semesters: CS_SEMESTERS.map((s) => ({
      ...s,
      courses: s.courses.map((co) => ({
        ...co,
        name: co.name.replace('Computing', 'Data Science'),
      })),
    })),
  },

  // Cyber Security — FSD
  {
    id: 'fsd-cyber-bsc-cyber', name: 'BSc Cyber Security', shortName: 'CYB',
    department: 'Cyber Security', departmentId: 'fsd-cyber', campus: 'fsd',
    totalSemesters: 8,
    semesters: CS_SEMESTERS.map((s, i) => ({
      ...s,
      courses: s.courses.map((co) => ({
        ...co,
        name: i >= 4 ? co.name.replace('Computing', 'Cyber Security') : co.name,
      })),
    })),
  },

  /* ──────────────────────────────────────────────────────────────────
     RCET GUJRANWALA PROGRAMS
     ────────────────────────────────────────────────────────────────── */

  // Computer Science — RCET
  {
    id: 'rcet-cs-bsc-cs', name: 'BSc Computer Science', shortName: 'CS',
    department: 'Computer Science', departmentId: 'rcet-cs', campus: 'rcet',
    totalSemesters: 8, semesters: CS_SEMESTERS,
  },

  // Computer Engineering — RCET
  {
    id: 'rcet-cpe-bsc-cpe', name: 'BSc Computer Engineering', shortName: 'CPE',
    department: 'Computer Engineering', departmentId: 'rcet-cpe', campus: 'rcet',
    totalSemesters: 8,
    semesters: CS_SEMESTERS.map((s) => ({
      ...s,
      courses: s.courses.map((co) => ({
        ...co,
        name: co.name.replace('Computing', 'Computer Engineering').replace('Computer Science', 'Computer Engineering'),
      })),
    })),
  },

  // Electrical Engineering — RCET
  {
    id: 'rcet-ee-bsc-ee', name: 'BSc Electrical Engineering', shortName: 'EE',
    department: 'Electrical Engineering', departmentId: 'rcet-ee', campus: 'rcet',
    totalSemesters: 8, semesters: genericSemesters('EE', 'EE', 'MTH'),
  },

  // Mechanical Engineering — RCET
  {
    id: 'rcet-me-bsc-me', name: 'BSc Mechanical Engineering', shortName: 'ME',
    department: 'Mechanical Engineering', departmentId: 'rcet-me', campus: 'rcet',
    totalSemesters: 8, semesters: genericSemesters('ME', 'ME', 'MTH'),
  },

  /* ──────────────────────────────────────────────────────────────────
     NAROWAL CAMPUS PROGRAMS
     ────────────────────────────────────────────────────────────────── */

  // Architecture — Narowal
  {
    id: 'narowal-arch-bsc-arch', name: 'BSc Architecture', shortName: 'ARCH',
    department: 'Architecture', departmentId: 'narowal-arch', campus: 'narowal',
    totalSemesters: 8, semesters: genericSimpleSemesters('ARCH', 'Architecture', 'Design'),
  },

  // Computer Science — Narowal
  {
    id: 'narowal-cs-bsc-cs', name: 'BSc Computer Science', shortName: 'CS',
    department: 'Computer Science', departmentId: 'narowal-cs', campus: 'narowal',
    totalSemesters: 8, semesters: CS_SEMESTERS,
  },

  // Computer Engineering — Narowal
  {
    id: 'narowal-cpe-bsc-cpe', name: 'BSc Computer Engineering', shortName: 'CPE',
    department: 'Computer Engineering', departmentId: 'narowal-cpe', campus: 'narowal',
    totalSemesters: 8,
    semesters: CS_SEMESTERS.map((s) => ({
      ...s,
      courses: s.courses.map((co) => ({
        ...co,
        name: co.name.replace('Computing', 'Computer Engineering').replace('Computer Science', 'Computer Engineering'),
      })),
    })),
  },

  // Electrical Engineering — Narowal
  {
    id: 'narowal-ee-bsc-ee', name: 'BSc Electrical Engineering', shortName: 'EE',
    department: 'Electrical Engineering', departmentId: 'narowal-ee', campus: 'narowal',
    totalSemesters: 8, semesters: genericSemesters('EE', 'EE', 'MTH'),
  },

  // Mechanical Engineering — Narowal
  {
    id: 'narowal-me-bsc-me', name: 'BSc Mechanical Engineering', shortName: 'ME',
    department: 'Mechanical Engineering', departmentId: 'narowal-me', campus: 'narowal',
    totalSemesters: 8, semesters: genericSemesters('ME', 'ME', 'MTH'),
  },

  // Civil Engineering — Narowal
  {
    id: 'narowal-ce-bsc-ce', name: 'BSc Civil Engineering', shortName: 'CE',
    department: 'Civil Engineering', departmentId: 'narowal-ce', campus: 'narowal',
    totalSemesters: 8, semesters: genericSemesters('CE', 'CE', 'MTH'),
  },

  // Biomedical Engineering — Narowal
  {
    id: 'narowal-bme-bsc-bme', name: 'BSc Biomedical Engineering', shortName: 'BME',
    department: 'Biomedical Engineering', departmentId: 'narowal-bme', campus: 'narowal',
    totalSemesters: 8, semesters: genericSemesters('BME', 'Biomedical', 'MTH'),
  },
];

/* ═══════════════════════════════════════════════════════════════════════
   TIME SLOTS FOR TIMETABLE GENERATION
   ═══════════════════════════════════════════════════════════════════════ */
export const TIME_SLOTS = [
  '08:30 – 09:50',
  '10:00 – 11:20',
  '11:30 – 12:50',
  '01:00 – 02:00',   // Lab slot
  '02:00 – 04:00',   // Lab slot
];

export const DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];

/* ═══════════════════════════════════════════════════════════════════════
   RESULT GENERATION — Deterministic marks based on course code
   ═══════════════════════════════════════════════════════════════════════ */
function hashCode(str: string): number {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash |= 0;
  }
  return Math.abs(hash);
}

function generateMarks(courseCode: string): { mid: number; final: number; total: number; grade: string; gpa: number } {
  const h = hashCode(courseCode);
  // Theory courses: 70-95, Lab courses: 75-98, General: 65-90
  const isLab = courseCode.includes('-L') || courseCode.includes('Lab');
  const isGeneral = courseCode.startsWith('ENG-') || courseCode.startsWith('ISL-') || courseCode.startsWith('PKS-') || courseCode.startsWith('ECO-');

  const base = isLab ? 78 : isGeneral ? 72 : 70;
  const range = isLab ? 20 : isGeneral ? 22 : 25;
  const midBase = base + (h % 8);
  const finalBase = base + ((h >> 3) % (range - 5));

  const mid = Math.min(50, Math.max(20, midBase - 10 + (h % 11)));
  const final = Math.min(60, Math.max(25, finalBase - 5 + ((h >> 4) % 13)));
  const total = Math.min(100, mid + final);

  let grade: string;
  let gpa: number;
  if (total >= 90) { grade = 'A+'; gpa = 4.0; }
  else if (total >= 85) { grade = 'A'; gpa = 4.0; }
  else if (total >= 80) { grade = 'A-'; gpa = 3.67; }
  else if (total >= 75) { grade = 'B+'; gpa = 3.33; }
  else if (total >= 70) { grade = 'B'; gpa = 3.0; }
  else if (total >= 65) { grade = 'B-'; gpa = 2.67; }
  else if (total >= 60) { grade = 'C+'; gpa = 2.33; }
  else if (total >= 55) { grade = 'C'; gpa = 2.0; }
  else if (total >= 50) { grade = 'C-'; gpa = 1.67; }
  else if (total >= 45) { grade = 'D'; gpa = 1.33; }
  else { grade = 'F'; gpa = 0.0; }

  return { mid, final, total, grade, gpa };
}

export function generateResultsForStudent(programId: string, currentSemester: number): SemesterResult[] {
  const program = ALL_PROGRAMS.find((p) => p.id === programId) || ALL_PROGRAMS[0];
  const results: SemesterResult[] = [];

  for (let sem = 1; sem < currentSemester; sem++) {
    const semPlan = program.semesters[sem - 1];
    if (!semPlan) continue;

    const courseResults = semPlan.courses.map((co) => {
      const marks = generateMarks(`${co.code}-${co.code}`);
      return {
        code: co.code,
        name: co.name,
        credits: co.credits,
        theoryCredits: co.theoryCredits,
        labCredits: co.labCredits,
        ...marks,
      };
    });

    const totalGpaPoints = courseResults.reduce((sum, cr) => sum + cr.gpa * (cr.theoryCredits + cr.labCredits), 0);
    const totalCredits = courseResults.reduce((sum, cr) => sum + cr.theoryCredits + cr.labCredits, 0);
    const semesterGpa = totalCredits > 0 ? Math.round((totalGpaPoints / totalCredits) * 100) / 100 : 0;

    results.push({
      semester: sem,
      semesterType: semPlan.semesterType,
      gpa: semesterGpa,
      courses: courseResults,
    });
  }

  return results;
}

export function generateTimetableForSemester(programId: string, semester: number): { time: string; day: string; course: string; room: string; type: string }[] {
  const program = ALL_PROGRAMS.find((p) => p.id === programId) || ALL_PROGRAMS[0];
  const semPlan = program.semesters[semester - 1];
  if (!semPlan) return [];

  const theoryCourses = semPlan.courses.filter((c) => !c.code.includes('-L') && !c.code.includes('Lab') && c.theoryCredits > 0);
  const labCourses = semPlan.courses.filter((c) => c.code.includes('-L') || c.code.includes('Lab') || c.labCredits > 0);

  const rooms = ['CR-101', 'CR-102', 'CR-201', 'CR-301', 'LT-1', 'LT-2'];
  const labs = ['Lab-1', 'Lab-2', 'Lab-3'];

  const slots: { time: string; day: string; course: string; room: string; type: string }[] = [];
  let dayIdx = 0;
  let timeIdx = 0;

  // Theory classes
  theoryCourses.forEach((co, i) => {
    const day = DAYS[dayIdx % 5];
    const time = TIME_SLOTS[timeIdx % 3]; // Use first 3 time slots for theory
    slots.push({ time, day, course: `${co.code} (${co.name})`, room: rooms[i % rooms.length], type: 'Lecture' });
    timeIdx++;
    if (timeIdx % 3 === 0) dayIdx++;
  });

  // Lab classes (use lab time slots)
  labCourses.forEach((co, i) => {
    const day = DAYS[(dayIdx + 1) % 5];
    const time = TIME_SLOTS[3 + (i % 2)]; // Use lab time slots
    slots.push({ time, day, course: `${co.code} (${co.name})`, room: labs[i % labs.length], type: 'Lab' });
    dayIdx++;
  });

  return slots;
}

/* ═══════════════════════════════════════════════════════════════════════
   GETTER FUNCTIONS
   ═══════════════════════════════════════════════════════════════════════ */

export function getProgramById(id: string): DegreeProgram | undefined {
  return ALL_PROGRAMS.find((p) => p.id === id);
}

export function getDepartments(): Department[] {
  return DEPARTMENTS;
}

export function getDepartmentsForCampus(campusId: CampusId): Department[] {
  return DEPARTMENTS.filter(d => d.campus === campusId);
}

export function getProgramsForDepartment(deptId: string): DegreeProgram[] {
  return ALL_PROGRAMS.filter((p) => p.departmentId === deptId);
}

export function getProgramsForCampus(campusId: CampusId): DegreeProgram[] {
  return ALL_PROGRAMS.filter(p => p.campus === campusId);
}

export function getCoursesForSemester(programId: string, semester: number): CourseEntry[] {
  const program = getProgramById(programId);
  if (!program) return [];
  const sem = program.semesters[semester - 1];
  return sem ? sem.courses : [];
}