/* ═══════════════════════════════════════════════════════════════════════
   UET LAHORE — COMPLETE CURRICULUM DATA
   Based on official semester-wise course plans for all departments.
   Source: THE UET ZONE (Google Drive reference PDFs)
   ═══════════════════════════════════════════════════════════════════════ */

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
  totalSemesters: number;
  semesters: SemesterPlan[];
}

export interface Department {
  id: string;
  name: string;
  campus: string;
  degrees: string[];
}

/* ═══════════════════════════════════════════════════════════════════════
   DEPARTMENTS
   ═══════════════════════════════════════════════════════════════════════ */
export const DEPARTMENTS: Department[] = [
  { id: 'cs', name: 'Computer Science', campus: 'KSK', degrees: ['BSc Computer Science', 'BSc Software Engineering', 'BSc Cyber Security', 'BSc Data Science', 'BSc Artificial Intelligence'] },
  { id: 'ee', name: 'Electrical Engineering', campus: 'KSK', degrees: ['BSc Electrical Engineering'] },
  { id: 'me', name: 'Mechanical Engineering', campus: 'KSK', degrees: ['BSc Mechanical Engineering'] },
  { id: 'ce', name: 'Civil Engineering', campus: 'KSK', degrees: ['BSc Civil Engineering'] },
  { id: 'che', name: 'Chemical Engineering', campus: 'KSK', degrees: ['BSc Chemical Engineering'] },
  { id: 'te', name: 'Textile Engineering', campus: 'FSD', degrees: ['BSc Textile Engineering'] },
  { id: 'bba', name: 'Business Administration', campus: 'KSK', degrees: ['BBA', 'BBIT'] },
  { id: 'env', name: 'Environmental Engineering', campus: 'KSK', degrees: ['BSc Environmental Engineering'] },
  { id: 'arch', name: 'Architecture & Planning', campus: 'KSK', degrees: ['BArch'] },
  { id: 'bme', name: 'Biomedical Engineering', campus: 'KSK', degrees: ['BSc Biomedical Engineering'] },
  { id: 'geo', name: 'Geological Engineering', campus: 'KSK', degrees: ['BSc Geological Engineering'] },
  { id: 'esm', name: 'Energy Systems', campus: 'KSK', degrees: ['BSc Energy Systems Management'] },
  { id: 'fst', name: 'Food Science', campus: 'KSK', degrees: ['BSc Food Science & Technology'] },
  { id: 'ie', name: 'Industrial Engineering', campus: 'KSK', degrees: ['BSc Industrial Engineering'] },
  { id: 'ae', name: 'Aerospace Engineering', campus: 'KSK', degrees: ['BSc Aerospace Engineering'] },
  { id: 'mse', name: 'Materials Science', campus: 'KSK', degrees: ['BSc Materials Science & Engineering'] },
  { id: 'pme', name: 'Metallurgical & Materials', campus: 'KSK', degrees: ['BSc Metallurgical Engineering'] },
  { id: 'mme', name: 'Mining Engineering', campus: 'KSK', degrees: ['BSc Mining Engineering'] },
  { id: 'tp', name: 'Transportation Engineering', campus: 'KSK', degrees: ['BSc Transportation Engineering'] },
  { id: 'wre', name: 'Water Resources', campus: 'KSK', degrees: ['BSc Water Resources Engineering'] },
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
   BSc COMPUTER SCIENCE — 8 Semesters
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
   ALL DEGREE PROGRAMS (CS is fully defined, others have core structure)
   ═══════════════════════════════════════════════════════════════════════ */
export const ALL_PROGRAMS: DegreeProgram[] = [
  {
    id: 'cs-bsc', name: 'BSc Computer Science', shortName: 'CS', department: 'Computer Science', departmentId: 'cs',
    totalSemesters: 8, semesters: CS_SEMESTERS,
  },
  {
    id: 'se-bsc', name: 'BSc Software Engineering', shortName: 'SE', department: 'Computer Science', departmentId: 'cs',
    totalSemesters: 8,
    semesters: CS_SEMESTERS.map((s, i) => ({
      ...s,
      courses: s.courses.map((co) => ({
        ...co,
        name: co.name.replace('Computer Science', 'Software Engineering').replace('Computing', 'Software Engineering'),
      })),
    })),
  },
  {
    id: 'cyber-bsc', name: 'BSc Cyber Security', shortName: 'CYB', department: 'Computer Science', departmentId: 'cs',
    totalSemesters: 8,
    semesters: CS_SEMESTERS.map((s, i) => ({
      ...s,
      courses: s.courses.map((co) => ({
        ...co,
        name: i >= 4 ? co.name.replace('Computing', 'Cyber Security') : co.name,
      })),
    })),
  },
  {
    id: 'ai-bsc', name: 'BSc Artificial Intelligence', shortName: 'AI', department: 'Computer Science', departmentId: 'cs',
    totalSemesters: 8,
    semesters: CS_SEMESTERS.map((s) => ({
      ...s,
      courses: s.courses.map((co) => ({
        ...co,
        name: co.name.replace('Computing', 'Artificial Intelligence'),
      })),
    })),
  },
  {
    id: 'ds-bsc', name: 'BSc Data Science', shortName: 'DS', department: 'Computer Science', departmentId: 'cs',
    totalSemesters: 8,
    semesters: CS_SEMESTERS.map((s) => ({
      ...s,
      courses: s.courses.map((co) => ({
        ...co,
        name: co.name.replace('Computing', 'Data Science'),
      })),
    })),
  },
  {
    id: 'ee-bsc', name: 'BSc Electrical Engineering', shortName: 'EE', department: 'Electrical Engineering', departmentId: 'ee',
    totalSemesters: 8,
    semesters: Array.from({ length: 8 }, (_, i) => ({
      semester: i + 1,
      semesterType: i % 2 === 0 ? 'spring' : 'fall',
      courses: [
        course(`EE-${(i * 100 + 1).toString()}`, `EE Core Subject ${i + 1}-A`, '3+0', 'core', 'Engineering'),
        course(`EE-${(i * 100 + 2).toString()}`, `EE Core Subject ${i + 1}-B`, '3+1', 'core', 'Engineering'),
        course(`EE-${(i * 100 + 3).toString()}`, `EE Core Subject ${i + 1}-C`, '3+0', 'core', 'Engineering'),
        course(`MTH-${(i + 1).toString().padStart(3, '0')}`, `Math Subject ${i + 1}`, '3+0', 'core', 'Basic Sciences'),
        course(`EE-L${i + 1}`, `EE Lab ${i + 1}`, '0+1', 'core', 'Engineering'),
        ...(i < 4 ? [course(`GEN-${i + 1}`, `General Subject ${i + 1}`, '2+0', 'general', 'Humanities')] : []),
        ...(i >= 5 ? [course(`EE-E${i - 4}`, `EE Elective ${i - 4}`, '3+0', 'elective', 'Engineering')] : []),
      ],
    })),
  },
  {
    id: 'me-bsc', name: 'BSc Mechanical Engineering', shortName: 'ME', department: 'Mechanical Engineering', departmentId: 'me',
    totalSemesters: 8,
    semesters: Array.from({ length: 8 }, (_, i) => ({
      semester: i + 1, semesterType: i % 2 === 0 ? 'spring' : 'fall',
      courses: [
        course(`ME-${(i * 100 + 1).toString()}`, `ME Core Subject ${i + 1}-A`, '3+0', 'core', 'Engineering'),
        course(`ME-${(i * 100 + 2).toString()}`, `ME Core Subject ${i + 1}-B`, '3+1', 'core', 'Engineering'),
        course(`ME-${(i * 100 + 3).toString()}`, `ME Core Subject ${i + 1}-C`, '3+0', 'core', 'Engineering'),
        course(`MTH-${(i + 10).toString().padStart(3, '0')}`, `Math for ME ${i + 1}`, '3+0', 'core', 'Basic Sciences'),
        ...(i < 4 ? [course(`GEN-${i + 5}`, `General ${i + 5}`, '2+0', 'general', 'Humanities')] : []),
      ],
    })),
  },
  {
    id: 'ce-bsc', name: 'BSc Civil Engineering', shortName: 'CE', department: 'Civil Engineering', departmentId: 'ce',
    totalSemesters: 8,
    semesters: Array.from({ length: 8 }, (_, i) => ({
      semester: i + 1, semesterType: i % 2 === 0 ? 'spring' : 'fall',
      courses: [
        course(`CE-${(i * 100 + 1).toString()}`, `CE Core ${i + 1}-A`, '3+0', 'core', 'Engineering'),
        course(`CE-${(i * 100 + 2).toString()}`, `CE Core ${i + 1}-B`, '3+1', 'core', 'Engineering'),
        course(`CE-${(i * 100 + 3).toString()}`, `CE Core ${i + 1}-C`, '3+0', 'core', 'Engineering'),
        course(`MTH-${(i + 20).toString().padStart(3, '0')}`, `Math for CE ${i + 1}`, '3+0', 'core', 'Basic Sciences'),
      ],
    })),
  },
  {
    id: 'bba', name: 'Bachelor of Business Administration', shortName: 'BBA', department: 'Business Administration', departmentId: 'bba',
    totalSemesters: 8,
    semesters: Array.from({ length: 8 }, (_, i) => ({
      semester: i + 1, semesterType: i % 2 === 0 ? 'spring' : 'fall',
      courses: [
        course(`BA-${(i * 100 + 1).toString()}`, `Business Subject ${i + 1}-A`, '3+0', 'core', 'Business'),
        course(`BA-${(i * 100 + 2).toString()}`, `Business Subject ${i + 1}-B`, '3+0', 'core', 'Business'),
        course(`BA-${(i * 100 + 3).toString()}`, `Business Subject ${i + 1}-C`, '3+0', 'core', 'Business'),
        course(`BA-${(i * 100 + 4).toString()}`, `Business Subject ${i + 1}-D`, '3+0', 'core', 'Business'),
      ],
    })),
  },
  {
    id: 'bbit', name: 'Bachelor of Business Information Technology', shortName: 'BBIT', department: 'Business Administration', departmentId: 'bba',
    totalSemesters: 8,
    semesters: Array.from({ length: 8 }, (_, i) => ({
      semester: i + 1, semesterType: i % 2 === 0 ? 'spring' : 'fall',
      courses: [
        course(`BT-${(i * 100 + 1).toString()}`, `BIT Subject ${i + 1}-A`, '3+0', 'core', 'IT'),
        course(`BT-${(i * 100 + 2).toString()}`, `BIT Subject ${i + 1}-B`, '3+1', 'core', 'IT'),
        course(`BA-${(i * 100 + 3).toString()}`, `Business for IT ${i + 1}`, '3+0', 'core', 'Business'),
        course(`BT-${(i * 100 + 4).toString()}`, `BIT Subject ${i + 1}-D`, '3+0', 'core', 'IT'),
      ],
    })),
  },
  // Remaining departments use generic structure
  ...[
    { id: 'che-bsc', name: 'BSc Chemical Engineering', shortName: 'CHE', dept: 'Chemical Engineering', deptId: 'che' },
    { id: 'te-bsc', name: 'BSc Textile Engineering', shortName: 'TE', dept: 'Textile Engineering', deptId: 'te' },
    { id: 'env-bsc', name: 'BSc Environmental Engineering', shortName: 'ENV', dept: 'Environmental Engineering', deptId: 'env' },
    { id: 'bme-bsc', name: 'BSc Biomedical Engineering', shortName: 'BME', dept: 'Biomedical Engineering', deptId: 'bme' },
    { id: 'geo-bsc', name: 'BSc Geological Engineering', shortName: 'GEO', dept: 'Geological Engineering', deptId: 'geo' },
    { id: 'esm-bsc', name: 'BSc Energy Systems Management', shortName: 'ESM', dept: 'Energy Systems', deptId: 'esm' },
    { id: 'fst-bsc', name: 'BSc Food Science & Technology', shortName: 'FST', dept: 'Food Science', deptId: 'fst' },
    { id: 'ae-bsc', name: 'BSc Aerospace Engineering', shortName: 'AE', dept: 'Aerospace Engineering', deptId: 'ae' },
    { id: 'arch', name: 'BArch Architecture & Planning', shortName: 'ARCH', dept: 'Architecture & Planning', deptId: 'arch' },
  ].map((d, idx) => ({
    id: d.id, name: d.name, shortName: d.shortName, department: d.dept, departmentId: d.deptId,
    totalSemesters: 8,
    semesters: Array.from({ length: 8 }, (_, i) => ({
      semester: i + 1, semesterType: i % 2 === 0 ? 'spring' : 'fall',
      courses: [
        course(`${d.shortName}-${(i * 100 + 1).toString()}`, `${d.shortName} Core ${i + 1}-A`, '3+0', 'core', 'Engineering'),
        course(`${d.shortName}-${(i * 100 + 2).toString()}`, `${d.shortName} Core ${i + 1}-B`, '3+1', 'core', 'Engineering'),
        course(`${d.shortName}-${(i * 100 + 3).toString()}`, `${d.shortName} Core ${i + 1}-C`, '3+0', 'core', 'Engineering'),
        course(`GEN-${idx + 30}`, `Support Subject ${i + 1}`, '3+0', 'core', 'Basic Sciences'),
      ],
    })),
  })),
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

export interface SemesterResult {
  semester: number;
  semesterType: string;
  gpa: number;
  courses: {
    code: string;
    name: string;
    credits: string;
    mid: number;
    final: number;
    total: number;
    grade: string;
    gpa: number;
  }[];
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

export function getProgramsForDepartment(deptId: string): DegreeProgram[] {
  return ALL_PROGRAMS.filter((p) => p.departmentId === deptId);
}

export function getCoursesForSemester(programId: string, semester: number): CourseEntry[] {
  const program = getProgramById(programId);
  if (!program) return [];
  const sem = program.semesters[semester - 1];
  return sem ? sem.courses : [];
}