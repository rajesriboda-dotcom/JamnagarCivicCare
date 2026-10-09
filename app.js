// Jamnagar Civic Care (JMC) - Official Portal Application Script
// Bilingual, Citizen Grievance Redressal, Live Tracking, Water Schedule, Property Tax, Authentication & Officer Dashboard

// Sample initial complaints repository in localStorage
const INITIAL_COMPLAINTS = [
  {
    id: "JMC-2026-W04-1082",
    name: "Ramesh Patel",
    phone: "9825012345",
    ward: "4",
    wardName: "Patel Colony & Vikas Gruh Road",
    category: "water",
    categoryLabel: "Water Supply (પાણી પુરવઠો)",
    subcategory: "Pipeline Leakage causing water loss",
    urgency: "High",
    address: "Near Patel Colony Street No. 9, Opp. Sharda School",
    description: "Main underground drinking water pipeline has burst since morning, flooding the street and reducing pressure to households.",
    createdAt: "07 Oct 2026, 08:30 AM",
    status: "in_progress", // assigned -> in_progress -> resolved
    slaHours: 24,
    officer: {
      name: "Er. K. M. Jadeja",
      designation: "Assistant City Engineer (Water Works)",
      contact: "0288-2550231 (Ext. 204)"
    },
    timeline: [
      { title: "Complaint Registered", date: "07 Oct 2026, 08:30 AM", desc: "Logged via JMC Civic Care Online Portal. SMS sent.", status: "completed" },
      { title: "Assigned to Ward Engineer", date: "07 Oct 2026, 09:15 AM", desc: "Forwarded to Ward No. 4 Water Works Unit", status: "completed" },
      { title: "Field Team Dispatched", date: "07 Oct 2026, 11:00 AM", desc: "Repair vehicle GJ-10-GA-4412 on site. Valve isolated.", status: "current" },
      { title: "Resolution & Pressure Testing", date: "Estimated 08 Oct, 04:00 PM", desc: "Pipeline welding & pressure restoration in progress", status: "pending" }
    ],
    feedback: null
  },
  {
    id: "JMC-2026-W09-2914",
    name: "Meenaben Vaghela",
    phone: "9426899881",
    ward: "9",
    wardName: "Digvijay Plot & Khambhalia Gate",
    category: "streetlight",
    categoryLabel: "Street Lighting (સ્ટ્રીટ લાઈટ)",
    subcategory: "Street Light Not Working",
    urgency: "Normal",
    address: "Digvijay Plot Corner, Street 49, Jamnagar",
    description: "Three consecutive LED streetlights are off for past 3 nights, dark corner prone to accidents.",
    createdAt: "06 Oct 2026, 07:15 PM",
    status: "resolved",
    slaHours: 48,
    officer: {
      name: "Shri V. R. Gohil",
      designation: "Supervisor (Electrical Dept, JMC)",
      contact: "0288-2550231 (Ext. 118)"
    },
    timeline: [
      { title: "Complaint Registered", date: "06 Oct 2026, 07:15 PM", desc: "Registered via Civic Care App", status: "completed" },
      { title: "Assigned to Electrical Dept", date: "07 Oct 2026, 08:30 AM", desc: "Task allocated to Sector 3 maintenance squad", status: "completed" },
      { title: "LED Fixture Replaced", date: "07 Oct 2026, 03:45 PM", desc: "Faulty driver & 2 LED heads repaired & energized", status: "completed" },
      { title: "Verified & Resolved", date: "07 Oct 2026, 07:30 PM", desc: "Citizen confirmation recorded. Ticket closed.", status: "completed" }
    ],
    feedback: { rating: 5, comment: "Fixed quickly the very next evening! Thank you JMC team." }
  },
  {
    id: "JMC-2026-W02-8371",
    name: "Amitbhai Trivedi",
    phone: "9909011223",
    ward: "2",
    wardName: "Gulabnagar & Bedi Port Road",
    category: "sanitation",
    categoryLabel: "Solid Waste & Sanitation (સફાઈ / કચરો)",
    subcategory: "Garbage Container Overflow",
    urgency: "Critical",
    address: "Gulabnagar Overbridge vicinity, near Ring Road junction",
    description: "Secondary garbage collection point is overflowing onto the main transit road, creating health hazard.",
    createdAt: "08 Oct 2026, 09:10 AM",
    status: "assigned",
    slaHours: 12,
    officer: {
      name: "Dr. P. J. Solanki",
      designation: "Chief Sanitary Inspector, JMC",
      contact: "0288-2550231 (Ext. 302)"
    },
    timeline: [
      { title: "Complaint Registered", date: "08 Oct 2026, 09:10 AM", desc: "Logged with photo attachment", status: "completed" },
      { title: "Assigned to Sanitation Wing", date: "08 Oct 2026, 09:40 AM", desc: "Sanitary Sub-Inspector Ward 2 notified", status: "current" },
      { title: "Compactor Truck Deputed", date: "Pending", desc: "Mechanical refuse collector route scheduled", status: "pending" },
      { title: "Disinfected & Cleaned", date: "Estimated 08 Oct, 02:00 PM", desc: "Final verification pending", status: "pending" }
    ],
    feedback: null
  }
];

// Initial Accounts Repository (Citizen & Admin)
const INITIAL_USERS = [
  {
    id: "CITIZEN-001",
    name: "Ramesh Patel",
    phone: "9825012345",
    email: "ramesh.patel@example.com",
    password: "citizen123",
    role: "citizen",
    ward: "4",
    wardName: "Patel Colony & Vikas Gruh Road",
    address: "Near Patel Colony Street No. 9, Opp. Sharda School, Jamnagar"
  },
  {
    id: "JMC-OFF-104",
    name: "Pruthvi (JMC Super Admin)",
    phone: "0288-2550231",
    email: "pruthvi77@gmail.com",
    password: "pruthvi@123",
    role: "admin",
    designation: "Assistant City Engineer / Central Control Room Officer",
    ward: "All Wards",
    address: "JMC Headquarters, Lal Bungalow Circle, Jamnagar"
  }
];

// Department catalog (8 Municipal Wings)
const DEPARTMENTS = [
  {
    id: "water",
    title: "Water Supply",
    titleGu: "પાણી પુરવઠો",
    icon: "droplets",
    desc: "Pipeline leakages, low water pressure, contaminated water, valve breakdown, illegal connection.",
    sla: "24 to 48 Hours",
    subcategories: [
      "Pipeline Leakage / બર્સ્ટ પાઇપલાઇન",
      "Low Pressure or No Water / ઓછા દબાણે પાણી",
      "Contaminated or Odorous Water / ગંદુ કે દુર્ગંધયુક્ત પાણી",
      "Illegal Water Connection / અનધિકૃત જોડાણ",
      "Damaged Valve / વોલ્વ ખરાબ થયેલ"
    ]
  },
  {
    id: "streetlight",
    title: "Street Lighting",
    titleGu: "સ્ટ્રીટ લાઈટ",
    icon: "sun",
    desc: "Defective LED lights, hanging electric cables, damaged poles, daytime light burning.",
    sla: "24 Hours",
    subcategories: [
      "Street Light Not Working / સ્ટ્રીટ લાઈટ બંધ છે",
      "Daytime Light Burning / દિવસે ચાલુ રહેતી લાઈટ",
      "Dangerous / Leaning Pole / નમેલો કે જોખમી થાંભલો",
      "Loose Electric Wire / ખુલ્લા વાયર",
      "Dark Spot / New Pole Request / નવો થાંભલો જરૂરી"
    ]
  },
  {
    id: "sanitation",
    title: "Solid Waste & Sanitation",
    titleGu: "સ્વચ્છતા અને ઘન કચરો",
    icon: "trash-2",
    desc: "Garbage collection, overflowing dustbins, dead animals, door-to-door tipping van issues.",
    sla: "12 to 24 Hours",
    subcategories: [
      "Door-to-Door Van Missed / ઘરેથી કચરો લેતી ગાડી ન આવવી",
      "Overflowing Community Bin / જાહેર કચરાપેટી ઓવરફ્લો",
      "Street Sweeping Not Done / શેરી સફાઈ ન થવી",
      "Dead Animal Removal / મૃત પશુ નિકાલ",
      "Open Debris / Construction Waste / કચરો અને કાટમાળ"
    ]
  },
  {
    id: "drainage",
    title: "Drainage & Sewerage",
    titleGu: "ગટર અને વરસાદી નાળા",
    icon: "truck",
    desc: "Blocked gutters, open manholes, sewage overflow, chamber slab collapse, storm drains.",
    sla: "12 to 36 Hours",
    subcategories: [
      "Missing / Broken Manhole Cover / ગટરનું ઢાંકણું તૂટેલું",
      "Sewer Line Choking / ગટર બ્લોક હોવી",
      "Sewage Overflow on Road / રસ્તા પર ગટરનું પાણી",
      "Storm Water Drain Clogged / વરસાદી નાળું ભરાયેલું",
      "Chamber Cleaning Required / ચેમ્બર સફાઈ"
    ]
  },
  {
    id: "roads",
    title: "Roads & Civil Works",
    titleGu: "રસ્તા અને ખાડા સમારકામ",
    icon: "activity",
    desc: "Dangerous potholes, broken road dividers, damaged speed breakers, footpath repairs.",
    sla: "48 to 72 Hours",
    subcategories: [
      "Pothole Repair Needed / રસ્તા પર ખાડા",
      "Damaged Speed Breaker / સ્પીડ બ્રેકર તૂટેલ",
      "Caved-in Road Surface / રસ્તો બેસી ગયેલ હોવો",
      "Broken Footpath / Paver Blocks / ફૂટપાથ તૂટેલ હોવી",
      "Damaged Central Divider / ડિવાઈડર નુકસાન"
    ]
  },
  {
    id: "health",
    title: "Public Health & Malaria",
    titleGu: "આરોગ્ય અને મચ્છર નિયંત્રણ",
    icon: "shield-alert",
    desc: "Mosquito fogging, insecticide spraying, stray animal menace, unhygienic food stalls.",
    sla: "24 Hours",
    subcategories: [
      "Mosquito Fogging Required / ધુમાડો (ફોગિંગ) કરવો",
      "Insecticide Spraying / દવાનો છંટકાવ",
      "Stray Cattle / Dog Menace / રખડતા ઢોર / શ્વાન",
      "Unhygienic Food Stall / અસ્વચ્છ ખાદ્ય સામગ્રી",
      "Stagnant Dirty Water Ponding / ભરાયેલ ગંદુ પાણી"
    ]
  },
  {
    id: "garden",
    title: "Gardens & Tree Trimming",
    titleGu: "બગીચા અને વૃક્ષ છાંટણી",
    icon: "trees",
    desc: "Dangerous fallen branches, overgrown trees blocking visibility, Lakhota Lake park upkeep.",
    sla: "48 Hours",
    subcategories: [
      "Overhanging Dangerous Tree Branch / જોખમી ઝાડની ડાળી",
      "Fallen Tree on Road / રસ્તા પર પડેલ વૃક્ષ",
      "Public Garden Maintenance / પબ્લિક ગાર્ડન સુવિધા",
      "Illegal Tree Cutting Report / ગેરકાયદેસર ઝાડ કાપણી"
    ]
  },
  {
    id: "certificates",
    title: "Civic Certificates & Tax",
    titleGu: "પ્રમાણપત્ર અને પ્રોપર્ટી ટેક્સ",
    icon: "file-check",
    desc: "Birth/Death certificates, property tax assessment receipts, shop establishment license.",
    sla: "Instant to 3 Days",
    subcategories: [
      "Birth Certificate Query / જન્મ પ્રમાણપત્ર",
      "Death Certificate Query / મરણ પ્રમાણપત્ર",
      "Property Tax Payment Assistance / ટેક્સ બિલ સહાય",
      "Trade License / Gumastadhara / ગુમાસ્તા લાઈસન્સ"
    ]
  }
];

// Ward Directory Info for Jamnagar (16 Administrative Wards)
const WARDS_DATA = [
  { ward: 1, name: "Bedi & Old Port Area", corporator: "Jitendrasinh Jadeja", officer: "H. B. Rathod (9825102001)", office: "Bedi Sub-Ward Office" },
  { ward: 2, name: "Gulabnagar & Navagam Ghed", corporator: "Manishaben Parmar", officer: "P. R. Dave (9825102002)", office: "Gulabnagar Civic Centre" },
  { ward: 3, name: "Shankar Tekri & Khodiyar Colony", corporator: "Kamleshbhai Solanki", officer: "D. K. Joshi (9825102003)", office: "Shankar Tekri Ward Hub" },
  { ward: 4, name: "Patel Colony & Vikas Gruh", corporator: "Alkeshbhai Goswami", officer: "Er. K. M. Jadeja (9825102004)", office: "Patel Colony Civic Center" },
  { ward: 5, name: "Sumair Club & Valkeshwari Nagari", corporator: "Geetaben Makwana", officer: "S. N. Bhatt (9825102005)", office: "Town Hall Zone Office" },
  { ward: 6, name: "Panchvati & Saru Section Road", corporator: "Dharmendrasinh Vala", officer: "R. A. Vaja (9825102006)", office: "Saru Section Civic Hub" },
  { ward: 7, name: "Oshwal Colony & Amber Cinema Area", corporator: "Bhavnaben Patel", officer: "V. T. Chauhan (9825102007)", office: "Amber Zone Office" },
  { ward: 8, name: "Chandi Bazaar & Darbargadh", corporator: "Kishorbhai Chawda", officer: "M. N. Shah (9825102008)", office: "Old Heritage City Hall" },
  { ward: 9, name: "Digvijay Plot (1 to 60)", corporator: "Maheshbhai Trivedi", officer: "Shri V. R. Gohil (9825102009)", office: "Digvijay Plot Ward Office" },
  { ward: 10, name: "Lalpur Bypass & Kamdar Colony", corporator: "Rekhaben Rabari", officer: "T. C. Pandya (9825102010)", office: "Lalpur Bypass Civic Hub" },
  { ward: 11, name: "Ranjit Sagar Road & Swaminarayan", corporator: "Jayendrasinh Jhala", officer: "B. M. Raval (9825102011)", office: "Ranjit Sagar Sub Office" },
  { ward: 12, name: "Lal Bungalow & Courts Campus", corporator: "Nileshbhai Kansara", officer: "N. J. Mehta (9825102012)", office: "JMC Central Building Zone" },
  { ward: 13, name: "Hapa Industrial & Marketing Yard", corporator: "Pravinbhai Khetani", officer: "A. S. Zala (9825102013)", office: "Hapa Market Yard Wing" },
  { ward: 14, name: "Ravapar & Jamnagar Rural Belt", corporator: "Kashmira Ben Jadeja", officer: "C. H. Varu (9825102014)", office: "East Zone Civic Office" },
  { ward: 15, name: "Subhash Bridge & Aerodrome Road", corporator: "Hareshbhai Dodiya", officer: "G. L. Makwana (9825102015)", office: "Airforce Road Civic Wing" },
  { ward: 16, name: "Vibhapar & Theba Bypass", corporator: "Urmilaben Bhatt", officer: "K. S. Gohil (9825102016)", office: "Vibhapar Sub-Ward Office" }
];

// Water Distribution Timetable Data for Jamnagar (Ward 1 to 16)
const WATER_SCHEDULE_DATA = [
  { ward: 1, area: "Bedi & Port Colony", morning: "06:00 AM - 07:15 AM", evening: "Alternate Days", source: "Ranjit Sagar Dam", status: "Normal Pressure", incharge: "Er. M. Patel (9825102021)" },
  { ward: 2, area: "Gulabnagar & Navagam", morning: "06:15 AM - 07:30 AM", evening: "05:00 PM - 06:00 PM", source: "Sasoi Dam Feeder", status: "Normal Pressure", incharge: "Er. K. Vyas (9825102022)" },
  { ward: 3, area: "Shankar Tekri & Khodiyar", morning: "06:45 AM - 08:00 AM", evening: "Alternate Days", source: "Ranjit Sagar Dam", status: "High Pressure", incharge: "Er. D. Joshi (9825102023)" },
  { ward: 4, area: "Patel Colony (All Streets)", morning: "07:00 AM - 08:30 AM", evening: "05:30 PM - 06:30 PM", source: "Narmada Canal Grid", status: "Maintenance Scheduled", incharge: "Er. K. M. Jadeja (9825102004)" },
  { ward: 5, area: "Sumair Club & Valkeshwari", morning: "06:30 AM - 07:45 AM", evening: "06:00 PM - 07:00 PM", source: "Sasoi Dam Feeder", status: "Normal Pressure", incharge: "Er. R. Bhatt (9825102025)" },
  { ward: 6, area: "Panchvati & Saru Section", morning: "07:15 AM - 08:30 AM", evening: "Alternate Days", source: "Ranjit Sagar Dam", status: "Normal Pressure", incharge: "Er. P. Vala (9825102026)" },
  { ward: 7, area: "Oshwal Colony & Amber Area", morning: "07:30 AM - 08:45 AM", evening: "05:45 PM - 06:45 PM", source: "Narmada Canal Grid", status: "Normal Pressure", incharge: "Er. H. Dave (9825102027)" },
  { ward: 8, area: "Chandi Bazaar & Darbargadh", morning: "05:45 AM - 07:00 AM", evening: "05:00 PM - 06:00 PM", source: "Old City Gravity Tank", status: "Normal Pressure", incharge: "Er. S. Shah (9825102028)" },
  { ward: 9, area: "Digvijay Plot (1 to 60)", morning: "08:00 AM - 09:30 AM", evening: "Alternate Days", source: "Sasoi Dam Feeder", status: "Normal Pressure", incharge: "Er. T. Trivedi (9825102029)" },
  { ward: 10, area: "Lalpur Bypass & Kamdar Colony", morning: "06:15 AM - 07:30 AM", evening: "06:15 PM - 07:15 PM", source: "Narmada Canal Grid", status: "High Pressure", incharge: "Er. A. Rabari (9825102030)" },
  { ward: 11, area: "Ranjit Sagar Road", morning: "06:00 AM - 07:30 AM", evening: "Alternate Days", source: "Ranjit Sagar Direct", status: "Normal Pressure", incharge: "Er. V. Jhala (9825102031)" },
  { ward: 12, area: "Lal Bungalow & Courts", morning: "07:00 AM - 08:15 AM", evening: "05:30 PM - 06:30 PM", source: "Sasoi Dam Feeder", status: "Normal Pressure", incharge: "Er. N. Mehta (9825102032)" },
  { ward: 13, area: "Hapa Industrial Area", morning: "08:15 AM - 09:45 AM", evening: "06:00 PM - 07:30 PM", source: "Narmada Canal Grid", status: "Normal Pressure", incharge: "Er. D. Zala (9825102033)" },
  { ward: 14, area: "Ravapar Belt", morning: "06:30 AM - 07:45 AM", evening: "Alternate Days", source: "Ranjit Sagar Dam", status: "Normal Pressure", incharge: "Er. K. Jadeja (9825102034)" },
  { ward: 15, area: "Aerodrome & Subhash Bridge", morning: "07:15 AM - 08:30 AM", evening: "05:15 PM - 06:15 PM", source: "Airforce Feeder Line", status: "Normal Pressure", incharge: "Er. C. Dodiya (9825102035)" },
  { ward: 16, area: "Vibhapar & Theba Bypass", morning: "06:00 AM - 07:15 AM", evening: "Alternate Days", source: "Sasoi Dam Feeder", status: "Normal Pressure", incharge: "Er. G. Gohil (9825102036)" }
];

// App State
let currentLanguage = 'en'; // 'en' or 'gu'
let complaints = [];
let users = [];
let currentUser = null;
let pendingAuthAction = null; // Stores action like { action: 'openComplaintModal', category: 'water' }
let attachedPhotoDataUrl = null;
let isOfficerMode = false;

// Initialize when DOM is ready
document.addEventListener("DOMContentLoaded", () => {
  loadUsers();
  loadCurrentUser();
  loadComplaints();
  renderAuthUI();
  renderDepartments();
  renderWardDirectory(WARDS_DATA);
  renderWaterSchedule(WATER_SCHEDULE_DATA);
  renderMyComplaints();
  populateDropdowns();
  setupEventListeners();
  calculatePropertyTax();
  updateLiveStats();

  // Create Lucide Icons
  if (window.lucide) {
    window.lucide.createIcons();
  }
});

// Load users repository from localStorage
function loadUsers() {
  const saved = localStorage.getItem("jmc_users");
  if (saved) {
    try {
      users = JSON.parse(saved);
      // Ensure admin account always has pruthvi77@gmail.com / pruthvi@123
      let adminUser = users.find(u => u.role === 'admin');
      if (adminUser) {
        adminUser.email = "pruthvi77@gmail.com";
        adminUser.password = "pruthvi@123";
        adminUser.name = "Pruthvi (JMC Super Admin)";
      } else {
        users.push(INITIAL_USERS[1]);
      }
      localStorage.setItem("jmc_users", JSON.stringify(users));
    } catch (e) {
      users = INITIAL_USERS;
      localStorage.setItem("jmc_users", JSON.stringify(users));
    }
  } else {
    users = INITIAL_USERS;
    localStorage.setItem("jmc_users", JSON.stringify(users));
  }
}

function saveUsers() {
  localStorage.setItem("jmc_users", JSON.stringify(users));
}

// Load current authenticated user from localStorage
function loadCurrentUser() {
  const saved = localStorage.getItem("jmc_current_user");
  if (saved) {
    try {
      currentUser = JSON.parse(saved);
      if (currentUser && currentUser.role === 'admin') {
        currentUser.email = "pruthvi77@gmail.com";
        currentUser.password = "pruthvi@123";
        currentUser.name = "Pruthvi (JMC Super Admin)";
        localStorage.setItem("jmc_current_user", JSON.stringify(currentUser));
      }
    } catch (e) {
      currentUser = null;
    }
  } else {
    currentUser = null;
  }
}

function setCurrentUser(user) {
  currentUser = user;
  if (user) {
    localStorage.setItem("jmc_current_user", JSON.stringify(user));
  } else {
    localStorage.removeItem("jmc_current_user");
  }
  renderAuthUI();
  renderMyComplaints();
}

function handleLogout() {
  const wasAdmin = currentUser && currentUser.role === 'admin';
  setCurrentUser(null);
  if (wasAdmin && isOfficerMode) {
    toggleOfficerDashboard();
  }
  showToast("You have been signed out safely.", "info");
}

// Render Authentication UI in Header (Desktop and Mobile)
function renderAuthUI() {
  const desktopContainer = document.getElementById("authNavContainer");
  const mobileContainer = document.getElementById("mobileAuthNavContainer");

  let desktopHtml = '';
  let mobileHtml = '';

  if (!currentUser) {
    // Guest: Show Login / Register CTA
    desktopHtml = `
      <button onclick="openAuthModal('citizen_login')" class="px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-blue-50 text-blue-950 font-bold text-xs flex items-center gap-1.5 border border-slate-300 hover:border-blue-400 transition-all shadow-xs">
        <i data-lucide="user" class="w-3.5 h-3.5 text-blue-800"></i>
        <span>Sign In / Register</span>
      </button>
    `;

    mobileHtml = `
      <button onclick="toggleMobileNav(); openAuthModal('citizen_login');" class="w-full py-2.5 px-3 rounded-xl bg-blue-900 text-white font-bold text-xs flex items-center justify-center gap-2">
        <i data-lucide="user" class="w-4 h-4 text-amber-300"></i>
        <span>Sign In / Register Citizen Account</span>
      </button>
    `;
  } else if (currentUser.role === 'citizen') {
    // Citizen Logged In
    const initial = (currentUser.name || 'C').charAt(0).toUpperCase();
    desktopHtml = `
      <div class="flex items-center gap-2 bg-blue-50/90 border border-blue-200/90 px-3 py-1 rounded-xl shadow-xs">
        <div class="w-7 h-7 rounded-full bg-blue-900 text-amber-300 font-extrabold text-xs flex items-center justify-center">
          ${initial}
        </div>
        <div class="text-left leading-tight">
          <span class="text-xs font-bold text-slate-900 block max-w-[120px] truncate" title="${currentUser.name}">${currentUser.name}</span>
          <span class="text-[10px] text-blue-800 font-medium">Ward ${currentUser.ward || 'JMC'} Citizen</span>
        </div>
        <button onclick="handleLogout()" title="Sign Out" class="ml-1 text-slate-400 hover:text-rose-600 p-1 transition-colors">
          <i data-lucide="log-out" class="w-3.5 h-3.5"></i>
        </button>
      </div>
    `;

    mobileHtml = `
      <div class="flex items-center justify-between bg-blue-50 p-2.5 rounded-xl border border-blue-200">
        <div class="flex items-center gap-2.5">
          <div class="w-8 h-8 rounded-full bg-blue-900 text-amber-300 font-bold text-xs flex items-center justify-center">
            ${initial}
          </div>
          <div>
            <strong class="text-xs text-slate-900 block">${currentUser.name}</strong>
            <span class="text-[11px] text-blue-800">Ward ${currentUser.ward} Citizen</span>
          </div>
        </div>
        <button onclick="handleLogout()" class="px-2.5 py-1 text-xs font-bold text-rose-700 bg-white border border-rose-200 rounded-lg">
          Sign Out
        </button>
      </div>
    `;
  } else if (currentUser.role === 'admin') {
    // Admin / Municipal Officer Logged In
    desktopHtml = `
      <div class="flex items-center gap-2 bg-amber-50/90 border border-amber-300 px-3 py-1 rounded-xl shadow-xs">
        <span class="px-1.5 py-0.5 rounded bg-amber-600 text-white text-[9px] font-black uppercase tracking-wider">ADMIN</span>
        <div class="text-left leading-tight">
          <span class="text-xs font-bold text-slate-900 block max-w-[130px] truncate" title="${currentUser.name}">${currentUser.name}</span>
          <span class="text-[10px] text-amber-900 font-medium">Control Desk</span>
        </div>
        <button onclick="handleLogout()" title="Sign Out" class="ml-1 text-slate-400 hover:text-rose-600 p-1 transition-colors">
          <i data-lucide="log-out" class="w-3.5 h-3.5"></i>
        </button>
      </div>
    `;

    mobileHtml = `
      <div class="flex items-center justify-between bg-amber-50 p-2.5 rounded-xl border border-amber-200">
        <div class="flex items-center gap-2.5">
          <span class="px-2 py-0.5 rounded bg-amber-600 text-white text-[10px] font-bold">ADMIN</span>
          <div>
            <strong class="text-xs text-slate-900 block">${currentUser.name}</strong>
            <span class="text-[11px] text-amber-900">JMC Control Room</span>
          </div>
        </div>
        <button onclick="handleLogout()" class="px-2.5 py-1 text-xs font-bold text-rose-700 bg-white border border-rose-200 rounded-lg">
          Sign Out
        </button>
      </div>
    `;
  }

  if (desktopContainer) desktopContainer.innerHTML = desktopHtml;
  if (mobileContainer) mobileContainer.innerHTML = mobileHtml;

  if (window.lucide) window.lucide.createIcons();
}

// Open and Close Unified Authentication Modal
function openAuthModal(tab = 'citizen_login', noticeMsg = '') {
  const modal = document.getElementById("authModal");
  if (!modal) return;

  const noticeBanner = document.getElementById("authNoticeBanner");
  const noticeText = document.getElementById("authNoticeText");

  if (noticeMsg && noticeBanner && noticeText) {
    noticeText.innerText = noticeMsg;
    noticeBanner.classList.remove("hidden");
  } else if (noticeBanner) {
    noticeBanner.classList.add("hidden");
  }

  switchAuthTab(tab);
  modal.classList.remove("hidden");
  document.body.style.overflow = "hidden";
  if (window.lucide) window.lucide.createIcons();
}

function closeAuthModal() {
  const modal = document.getElementById("authModal");
  if (modal) {
    modal.classList.add("hidden");
    document.body.style.overflow = "auto";
  }
}

// Switch Tabs inside Auth Modal
function switchAuthTab(tab) {
  const tabBtnCitizen = document.getElementById("tabBtnCitizenLogin");
  const tabBtnRegister = document.getElementById("tabBtnRegister");
  const tabBtnAdmin = document.getElementById("tabBtnAdminLogin");

  const paneCitizen = document.getElementById("authPaneCitizenLogin");
  const paneRegister = document.getElementById("authPaneRegister");
  const paneAdmin = document.getElementById("authPaneAdminLogin");

  const title = document.getElementById("authModalTitle");

  // Reset tab active states
  [tabBtnCitizen, tabBtnRegister, tabBtnAdmin].forEach(btn => {
    if (btn) btn.classList.remove("active", "text-white");
  });

  // Hide all panes
  if (paneCitizen) paneCitizen.classList.add("hidden");
  if (paneRegister) paneRegister.classList.add("hidden");
  if (paneAdmin) paneAdmin.classList.add("hidden");

  if (tab === 'citizen_login') {
    if (tabBtnCitizen) tabBtnCitizen.classList.add("active");
    if (paneCitizen) paneCitizen.classList.remove("hidden");
    if (title) title.innerText = "Citizen Sign In";
  } else if (tab === 'register') {
    if (tabBtnRegister) tabBtnRegister.classList.add("active");
    if (paneRegister) paneRegister.classList.remove("hidden");
    if (title) title.innerText = "Create Citizen Account";
  } else if (tab === 'admin_login') {
    if (tabBtnAdmin) tabBtnAdmin.classList.add("active");
    if (paneAdmin) paneAdmin.classList.remove("hidden");
    if (title) title.innerText = "Municipal Officer Authentication";
  }

  if (window.lucide) window.lucide.createIcons();
}

// 1-Click Quick Fill Demo Buttons
function quickFillCitizenLogin() {
  const idInput = document.getElementById("citizenLoginIdentifier");
  const passInput = document.getElementById("citizenLoginPassword");
  if (idInput) idInput.value = "9825012345";
  if (passInput) passInput.value = "citizen123";
}

function quickFillAdminLogin() {
  const idInput = document.getElementById("adminLoginIdentifier");
  const passInput = document.getElementById("adminLoginPassword");
  if (idInput) idInput.value = "pruthvi77@gmail.com";
  if (passInput) passInput.value = "pruthvi@123";
}

// Citizen Login Handler
function handleCitizenLogin(e) {
  e.preventDefault();
  const identifier = document.getElementById("citizenLoginIdentifier").value.trim().toLowerCase();
  const password = document.getElementById("citizenLoginPassword").value;

  const found = users.find(u => 
    u.role === 'citizen' && 
    (u.phone === identifier || u.email.toLowerCase() === identifier) && 
    u.password === password
  );

  if (found) {
    setCurrentUser(found);
    closeAuthModal();
    showToast(`Welcome back, ${found.name}! Citizen account authenticated.`, "success");

    // Execute pending action if any
    if (pendingAuthAction && pendingAuthAction.action === 'openComplaintModal') {
      const cat = pendingAuthAction.category;
      pendingAuthAction = null;
      openComplaintModal(cat);
    }
  } else {
    showToast("Invalid mobile/email or password for citizen account.", "error");
  }
}

// Citizen Register (Create Account) Handler
function handleCitizenRegister(e) {
  e.preventDefault();
  const name = document.getElementById("regFullName").value.trim();
  const phone = document.getElementById("regMobile").value.trim();
  const email = document.getElementById("regEmail").value.trim();
  const ward = document.getElementById("regWard").value;
  const address = document.getElementById("regAddress").value.trim();
  const password = document.getElementById("regPassword").value;
  const confirmPassword = document.getElementById("regConfirmPassword").value;

  if (!name || !phone || !ward || !address || !password) {
    showToast("Please fill all required registration fields.", "error");
    return;
  }

  if (phone.length !== 10) {
    showToast("Please enter a valid 10-digit mobile number.", "error");
    return;
  }

  if (password !== confirmPassword) {
    showToast("Passwords do not match. Please verify.", "error");
    return;
  }

  if (password.length < 6) {
    showToast("Password must be at least 6 characters.", "error");
    return;
  }

  // Check if mobile already exists
  const existing = users.find(u => u.phone === phone);
  if (existing) {
    showToast("An account with this mobile number already exists. Please log in.", "error");
    switchAuthTab('citizen_login');
    document.getElementById("citizenLoginIdentifier").value = phone;
    return;
  }

  const wardObj = WARDS_DATA.find(w => w.ward == ward) || { name: `Ward ${ward}` };
  const newCitizen = {
    id: `CITIZEN-${Date.now().toString().slice(-4)}`,
    name: name,
    phone: phone,
    email: email || `${phone}@jmc.citizen.in`,
    password: password,
    role: "citizen",
    ward: ward,
    wardName: wardObj.name,
    address: address
  };

  users.push(newCitizen);
  saveUsers();
  setCurrentUser(newCitizen);
  closeAuthModal();
  document.getElementById("citizenRegisterForm").reset();

  showToast(`Account created successfully! Welcome to Jamnagar Civic Care, ${name}.`, "success");

  // Execute pending action if any
  if (pendingAuthAction && pendingAuthAction.action === 'openComplaintModal') {
    const cat = pendingAuthAction.category;
    pendingAuthAction = null;
    openComplaintModal(cat);
  }
}

// Admin / Municipal Officer Login Handler
function handleAdminLogin(e) {
  e.preventDefault();
  const identifier = document.getElementById("adminLoginIdentifier").value.trim().toLowerCase();
  const password = document.getElementById("adminLoginPassword").value;

  const found = users.find(u => 
    u.role === 'admin' && 
    (u.email.toLowerCase() === identifier || u.id.toLowerCase() === identifier) && 
    u.password === password
  );

  if (found) {
    setCurrentUser(found);
    closeAuthModal();
    showToast(`Officer authenticated: ${found.name}. Access granted to JMC Control Room.`, "success");

    // Automatically open officer dashboard
    if (!isOfficerMode) {
      toggleOfficerDashboard();
    }
  } else {
    showToast("Invalid officer employee ID or security PIN.", "error");
  }
}

// Load complaints from localStorage
function loadComplaints() {
  const saved = localStorage.getItem("jmc_civic_complaints");
  if (saved) {
    try {
      complaints = JSON.parse(saved);
    } catch (e) {
      complaints = INITIAL_COMPLAINTS;
    }
  } else {
    complaints = INITIAL_COMPLAINTS;
    localStorage.setItem("jmc_civic_complaints", JSON.stringify(complaints));
  }
}

// Save complaints to localStorage
function saveComplaints() {
  localStorage.setItem("jmc_civic_complaints", JSON.stringify(complaints));
  updateLiveStats();
  renderMyComplaints();
  if (isOfficerMode) {
    renderOfficerTickets();
  }
}

// Update Header Statistics
function updateLiveStats() {
  const total = complaints.length + 8450;
  const resolvedCount = complaints.filter(c => c.status === 'resolved').length;
  const resolvedPercent = Math.min(99.4, (98.2 + (resolvedCount * 0.1))).toFixed(1);

  const totalEl = document.getElementById("statTotalComplaints");
  const resolvedEl = document.getElementById("statResolvedPercent");
  const timeEl = document.getElementById("statAvgResolutionTime");

  if (totalEl) totalEl.innerText = total.toLocaleString('en-IN');
  if (resolvedEl) resolvedEl.innerText = `${resolvedPercent}%`;
  if (timeEl) timeEl.innerText = "28.5 Hrs";
}

// Populate Wards and Department options in dropdowns
function populateDropdowns() {
  // Property Tax Ward Select
  const taxWardSelect = document.getElementById("taxWardSelect");
  if (taxWardSelect) {
    taxWardSelect.innerHTML = "";
    WARDS_DATA.forEach(w => {
      const opt = document.createElement("option");
      opt.value = w.ward;
      opt.innerText = `Ward ${w.ward}: ${w.name}`;
      taxWardSelect.appendChild(opt);
    });
  }

  // Register Form Ward Select
  const regWard = document.getElementById("regWard");
  if (regWard && regWard.children.length <= 1) {
    WARDS_DATA.forEach(w => {
      const opt = document.createElement("option");
      opt.value = w.ward;
      opt.innerText = `Ward ${w.ward}: ${w.name}`;
      regWard.appendChild(opt);
    });
  }

  // Officer Dashboard Ward Filter
  const officerWardFilter = document.getElementById("officerWardFilter");
  if (officerWardFilter) {
    officerWardFilter.innerHTML = '<option value="all">All Wards (1 to 16)</option>';
    WARDS_DATA.forEach(w => {
      const opt = document.createElement("option");
      opt.value = w.ward;
      opt.innerText = `Ward ${w.ward} - ${w.name}`;
      officerWardFilter.appendChild(opt);
    });
  }

  // Officer Dashboard Department Filter
  const officerDeptFilter = document.getElementById("officerDeptFilter");
  if (officerDeptFilter) {
    officerDeptFilter.innerHTML = '<option value="all">All Departments</option>';
    DEPARTMENTS.forEach(d => {
      const opt = document.createElement("option");
      opt.value = d.id;
      opt.innerText = d.title;
      officerDeptFilter.appendChild(opt);
    });
  }
}

// Render Civic Departments
function renderDepartments(filterCategory = 'all') {
  const container = document.getElementById("departmentCardsContainer");
  if (!container) return;

  container.innerHTML = "";

  const list = filterCategory === 'all' 
    ? DEPARTMENTS 
    : DEPARTMENTS.filter(d => d.id === filterCategory);

  list.forEach(dept => {
    const card = document.createElement("div");
    card.className = "civic-card bg-white p-6 rounded-2xl shadow-sm hover:shadow-md transition-all flex flex-col justify-between border border-slate-200 group";
    
    card.innerHTML = `
      <div>
        <div class="flex items-center justify-between mb-4">
          <div class="w-12 h-12 rounded-xl bg-blue-50 text-blue-900 flex items-center justify-center border border-blue-100 group-hover:bg-blue-900 group-hover:text-white transition-all shadow-sm">
            <i data-lucide="${dept.icon}" class="w-6 h-6"></i>
          </div>
          <span class="inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
            <i data-lucide="clock" class="w-3.5 h-3.5"></i> SLA: ${dept.sla}
          </span>
        </div>
        <h3 class="text-lg font-bold text-slate-800 group-hover:text-blue-900 transition-colors">
          ${currentLanguage === 'gu' ? dept.titleGu : dept.title}
        </h3>
        <p class="text-xs text-slate-500 font-medium mt-0.5">
          ${currentLanguage === 'gu' ? dept.title : dept.titleGu}
        </p>
        <p class="text-sm text-slate-600 mt-2.5 line-clamp-2 leading-relaxed">
          ${dept.desc}
        </p>
      </div>

      <div class="pt-5 mt-5 border-t border-slate-100 flex items-center justify-between">
        <button onclick="openComplaintModal('${dept.id}')" class="inline-flex items-center gap-1.5 text-xs font-semibold text-blue-900 hover:text-blue-800 bg-blue-50 hover:bg-blue-100 px-3.5 py-1.5 rounded-xl transition-colors border border-blue-200">
          <span>${currentLanguage === 'gu' ? 'ફરિયાદ નોંધાવો' : 'Report Issue'}</span>
          <i data-lucide="arrow-right" class="w-3.5 h-3.5"></i>
        </button>
        <button onclick="showQuickDepartmentInfo('${dept.id}')" class="text-xs text-slate-400 hover:text-slate-600 flex items-center gap-1">
          <i data-lucide="info" class="w-3.5 h-3.5"></i> Details
        </button>
      </div>
    `;
    container.appendChild(card);
  });

  if (window.lucide) {
    window.lucide.createIcons();
  }
}

// Render Ward Directory
function renderWardDirectory(wards) {
  const listEl = document.getElementById("wardListContainer");
  if (!listEl) return;

  listEl.innerHTML = "";
  if (wards.length === 0) {
    listEl.innerHTML = `
      <div class="col-span-full text-center py-8 text-slate-400">
        <i data-lucide="search-x" class="w-10 h-10 mx-auto mb-2 text-slate-300"></i>
        <p>No ward or area matching your search in Jamnagar.</p>
      </div>
    `;
    if (window.lucide) window.lucide.createIcons();
    return;
  }

  wards.forEach(w => {
    const item = document.createElement("div");
    item.className = "bg-white p-4 rounded-2xl border border-slate-200 hover:border-blue-300 shadow-sm transition-all";
    item.innerHTML = `
      <div class="flex items-start justify-between">
        <div class="flex items-center gap-2.5">
          <div class="w-8 h-8 rounded-xl bg-blue-900 text-white flex items-center justify-center font-bold text-sm shadow-sm">
            ${w.ward}
          </div>
          <div>
            <h4 class="font-bold text-slate-800 text-sm">Ward ${w.ward}: ${w.name}</h4>
            <p class="text-[11px] text-slate-500">${w.office}</p>
          </div>
        </div>
      </div>
      <div class="mt-3 pt-3 border-t border-slate-100 text-xs space-y-1.5">
        <div class="flex items-center justify-between text-slate-600">
          <span class="text-slate-400">Corporator:</span>
          <span class="font-semibold text-slate-700">${w.corporator}</span>
        </div>
        <div class="flex items-center justify-between text-slate-600">
          <span class="text-slate-400">Ward Officer:</span>
          <span class="font-semibold text-blue-900">${w.officer}</span>
        </div>
      </div>
    `;
    listEl.appendChild(item);
  });

  if (window.lucide) {
    window.lucide.createIcons();
  }
}

// Render Water Distribution Schedule
function renderWaterSchedule(list) {
  const container = document.getElementById("waterScheduleContainer");
  if (!container) return;

  container.innerHTML = "";
  if (list.length === 0) {
    container.innerHTML = `
      <div class="col-span-full text-center py-8 text-slate-400">
        <p>No matching water supply zone found.</p>
      </div>
    `;
    return;
  }

  list.forEach(item => {
    const card = document.createElement("div");
    card.className = "bg-white p-5 rounded-2xl border border-sky-200/80 shadow-sm hover:shadow-md transition-all";
    
    let statusClass = "bg-emerald-50 text-emerald-700 border-emerald-200";
    if (item.status.includes("Maintenance")) {
      statusClass = "bg-amber-50 text-amber-700 border-amber-200";
    }

    card.innerHTML = `
      <div class="flex items-center justify-between mb-3">
        <span class="text-xs font-mono font-bold px-2 py-0.5 rounded bg-sky-100 text-sky-800">Ward ${item.ward}</span>
        <span class="text-[11px] font-semibold px-2 py-0.5 rounded-full border ${statusClass}">${item.status}</span>
      </div>
      <h4 class="font-bold text-slate-800 text-sm mb-1">${item.area}</h4>
      <div class="text-xs space-y-1 text-slate-600 mt-2">
        <div class="flex items-center justify-between">
          <span class="text-slate-400">Morning Slot:</span>
          <strong class="text-sky-900">${item.morning}</strong>
        </div>
        <div class="flex items-center justify-between">
          <span class="text-slate-400">Evening Slot:</span>
          <span>${item.evening}</span>
        </div>
        <div class="flex items-center justify-between">
          <span class="text-slate-400">Reservoir:</span>
          <span class="font-medium text-slate-700">${item.source}</span>
        </div>
      </div>
      <div class="mt-3 pt-2.5 border-t border-slate-100 text-[11px] text-slate-500 flex items-center justify-between">
        <span>Water Inspector:</span>
        <strong class="text-blue-900">${item.incharge}</strong>
      </div>
    `;
    container.appendChild(card);
  });
}

// Render "My Complaints" history table/cards with Authentication Gate
function renderMyComplaints() {
  const container = document.getElementById("myComplaintsListContainer");
  if (!container) return;

  // Case 1: Guest (Not Logged In) -> Prompt to Login or Create Account
  if (!currentUser) {
    container.innerHTML = `
      <div class="p-8 sm:p-10 text-center bg-slate-50 border border-dashed border-slate-300 rounded-2xl m-4">
        <div class="w-12 h-12 rounded-full bg-blue-100 text-blue-900 flex items-center justify-center mx-auto mb-3">
          <i data-lucide="lock" class="w-6 h-6"></i>
        </div>
        <h4 class="font-bold text-slate-800 text-base">Citizen Authentication Required</h4>
        <p class="text-xs text-slate-600 mt-1 max-w-md mx-auto leading-relaxed">
          Please sign in with your mobile number or create a citizen account to access your personalized grievance dashboard and track real-time redressals.
        </p>
        <div class="mt-5 flex flex-wrap justify-center gap-3">
          <button onclick="openAuthModal('citizen_login', 'Please sign in to view your grievance history.')" class="px-5 py-2.5 bg-blue-900 hover:bg-blue-800 text-white font-bold text-xs rounded-xl shadow-md transition-all flex items-center gap-1.5">
            <i data-lucide="log-in" class="w-3.5 h-3.5"></i> Citizen Sign In
          </button>
          <button onclick="openAuthModal('register', 'Create an account to track all your municipal grievances.')" class="px-5 py-2.5 bg-white hover:bg-slate-100 text-slate-800 font-bold text-xs rounded-xl border border-slate-300 transition-all flex items-center gap-1.5">
            <i data-lucide="user-plus" class="w-3.5 h-3.5 text-blue-900"></i> Create Account
          </button>
        </div>
      </div>
    `;
    if (window.lucide) window.lucide.createIcons();
    return;
  }

  // Case 2: Logged in as Admin / Officer -> Show Administrative Notice
  if (currentUser.role === 'admin') {
    container.innerHTML = `
      <div class="p-6 sm:p-8 bg-amber-50/70 border border-amber-200 rounded-2xl m-4 text-center sm:text-left flex flex-col sm:flex-row items-center justify-between gap-4">
        <div class="flex items-center gap-3.5">
          <div class="w-12 h-12 rounded-2xl bg-amber-500/20 text-amber-800 flex items-center justify-center flex-shrink-0">
            <i data-lucide="shield-check" class="w-6 h-6"></i>
          </div>
          <div>
            <h4 class="font-bold text-amber-950 text-sm">Administrative Account: ${currentUser.name}</h4>
            <p class="text-xs text-amber-800 mt-0.5">You have municipal officer clearance. To inspect and update tickets across all 16 wards, access the Control Room desk.</p>
          </div>
        </div>
        <button onclick="toggleOfficerDashboard()" class="px-5 py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs rounded-xl shadow-md flex items-center gap-2 flex-shrink-0">
          <i data-lucide="layout-dashboard" class="w-3.5 h-3.5 text-amber-400"></i> Open Staff Portal
        </button>
      </div>
    `;
    if (window.lucide) window.lucide.createIcons();
    return;
  }

  // Case 3: Logged in as Citizen -> Show only this citizen's complaints
  const userComplaints = complaints.filter(c => 
    c.phone === currentUser.phone || 
    (c.name && c.name.toLowerCase() === currentUser.name.toLowerCase())
  );

  if (userComplaints.length === 0) {
    container.innerHTML = `
      <div class="p-8 text-center text-slate-400">
        <i data-lucide="file-question" class="w-10 h-10 mx-auto mb-2 text-slate-300"></i>
        <h4 class="font-bold text-slate-700 text-sm">No Grievances Lodged Yet</h4>
        <p class="text-xs text-slate-500 mt-0.5">You haven't filed any municipal complaints under mobile number ${currentUser.phone}.</p>
        <button onclick="openComplaintModal()" class="mt-3 px-4 py-2 bg-blue-900 text-white text-xs font-bold rounded-xl shadow-sm hover:bg-blue-800">
          Register New Grievance
        </button>
      </div>
    `;
    if (window.lucide) window.lucide.createIcons();
    return;
  }

  let html = `
    <div class="overflow-x-auto">
      <table class="w-full text-left text-xs text-slate-600">
        <thead class="bg-slate-50 text-slate-700 font-bold border-b border-slate-200">
          <tr>
            <th class="p-3.5">Ticket Reference</th>
            <th class="p-3.5">Department & Issue</th>
            <th class="p-3.5">Ward Jurisdiction</th>
            <th class="p-3.5">Submission Date</th>
            <th class="p-3.5">Resolution Status</th>
            <th class="p-3.5 text-right">Actions</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-slate-100">
  `;

  userComplaints.forEach(item => {
    let statusBadge = '';
    if (item.status === 'resolved') {
      statusBadge = '<span class="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold bg-emerald-100 text-emerald-800 border border-emerald-300">● Resolved</span>';
    } else if (item.status === 'in_progress') {
      statusBadge = '<span class="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold bg-blue-100 text-blue-800 border border-blue-300">● In Progress</span>';
    } else {
      statusBadge = '<span class="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold bg-amber-100 text-amber-800 border border-amber-300">● Assigned</span>';
    }

    html += `
      <tr class="hover:bg-slate-50/80 transition-colors">
        <td class="p-3.5 font-mono font-bold text-blue-950">${item.id}</td>
        <td class="p-3.5">
          <strong class="text-slate-800 block">${item.subcategory}</strong>
          <span class="text-slate-400 text-[11px]">${item.categoryLabel}</span>
        </td>
        <td class="p-3.5">Ward ${item.ward} (${item.wardName})</td>
        <td class="p-3.5 text-slate-500">${item.createdAt}</td>
        <td class="p-3.5">${statusBadge}</td>
        <td class="p-3.5 text-right space-x-1">
          <button onclick="trackTicket('${item.id}'); document.getElementById('track').scrollIntoView({behavior:'smooth'});" class="px-2.5 py-1 rounded-lg bg-blue-50 text-blue-900 hover:bg-blue-100 font-semibold border border-blue-200">
            Track
          </button>
          <button onclick="showSuccessReceipt(complaints.find(c => c.id === '${item.id}'))" class="px-2 py-1 rounded-lg bg-slate-100 text-slate-700 hover:bg-slate-200" title="Receipt">
            Slip
          </button>
        </td>
      </tr>
    `;
  });

  html += `
        </tbody>
      </table>
    </div>
  `;

  container.innerHTML = html;
  if (window.lucide) window.lucide.createIcons();
}

// Setup Event Listeners
function setupEventListeners() {
  // Language Switcher
  const langToggleBtn = document.getElementById("langToggleBtn");
  if (langToggleBtn) {
    langToggleBtn.addEventListener("click", () => {
      currentLanguage = currentLanguage === 'en' ? 'gu' : 'en';
      const label = document.getElementById("langLabel");
      if (label) {
        label.innerText = currentLanguage === 'en' ? 'ગુજરાતી' : 'English';
      }
      applyLanguageTranslations();
      renderDepartments();
    });
  }

  // Grievance Form Category change updates subcategories
  const catSelect = document.getElementById("complaintCategory");
  if (catSelect) {
    catSelect.addEventListener("change", (e) => {
      populateSubcategories(e.target.value);
    });
  }

  // Track Form
  const trackForm = document.getElementById("trackGrievanceForm");
  if (trackForm) {
    trackForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const input = document.getElementById("trackTicketInput").value.trim();
      trackTicket(input);
    });
  }

  // Hero Quick Track Form
  const heroTrackForm = document.getElementById("heroTrackForm");
  if (heroTrackForm) {
    heroTrackForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const input = document.getElementById("heroTicketInput").value.trim();
      quickFillTrack(input);
    });
  }

  // Ward search filter
  const wardSearch = document.getElementById("wardSearchInput");
  if (wardSearch) {
    wardSearch.addEventListener("input", (e) => {
      const q = e.target.value.toLowerCase();
      const filtered = WARDS_DATA.filter(w => 
        w.name.toLowerCase().includes(q) ||
        w.ward.toString().includes(q) ||
        w.corporator.toLowerCase().includes(q) ||
        w.office.toLowerCase().includes(q)
      );
      renderWardDirectory(filtered);
    });
  }

  // Water ward search filter
  const waterSearch = document.getElementById("waterWardSearchInput");
  if (waterSearch) {
    waterSearch.addEventListener("input", (e) => {
      const q = e.target.value.toLowerCase();
      const filtered = WATER_SCHEDULE_DATA.filter(w => 
        w.area.toLowerCase().includes(q) ||
        w.ward.toString().includes(q) ||
        w.source.toLowerCase().includes(q) ||
        w.incharge.toLowerCase().includes(q)
      );
      renderWaterSchedule(filtered);
    });
  }

  // Grievance Registration Form Submit
  const newComplaintForm = document.getElementById("newComplaintForm");
  if (newComplaintForm) {
    newComplaintForm.addEventListener("submit", handleComplaintSubmit);
  }

  // Authentication Forms Submit Listeners
  const citizenLoginForm = document.getElementById("citizenLoginForm");
  if (citizenLoginForm) citizenLoginForm.addEventListener("submit", handleCitizenLogin);

  const citizenRegisterForm = document.getElementById("citizenRegisterForm");
  if (citizenRegisterForm) citizenRegisterForm.addEventListener("submit", handleCitizenRegister);

  const adminLoginForm = document.getElementById("adminLoginForm");
  if (adminLoginForm) adminLoginForm.addEventListener("submit", handleAdminLogin);

  // Department Filter tabs
  const deptFilterButtons = document.querySelectorAll(".dept-filter-btn");
  deptFilterButtons.forEach(btn => {
    btn.addEventListener("click", (e) => {
      deptFilterButtons.forEach(b => b.classList.remove("bg-blue-900", "text-white", "active"));
      btn.classList.add("bg-blue-900", "text-white", "active");
      const category = btn.getAttribute("data-category");
      renderDepartments(category);
    });
  });

  // GPS auto locate simulation
  const gpsBtn = document.getElementById("gpsAutoDetectBtn");
  if (gpsBtn) {
    gpsBtn.addEventListener("click", () => {
      gpsBtn.innerHTML = `<i data-lucide="loader-2" class="w-4 h-4 animate-spin"></i> Detecting...`;
      if (window.lucide) window.lucide.createIcons();
      setTimeout(() => {
        const sampleAreas = [
          "Near Lal Bungalow, Opp. District Court, Jamnagar (GPS: 22.4707° N, 70.0577° E)",
          "Near Patel Colony Street 8, Jamnagar (GPS: 22.4632° N, 70.0610° E)",
          "Digvijay Plot Main Road, Jamnagar (GPS: 22.4589° N, 70.0712° E)",
          "Near Lakhota Lake Circle, Town Hall Road (GPS: 22.4721° N, 70.0632° E)"
        ];
        const chosen = sampleAreas[Math.floor(Math.random() * sampleAreas.length)];
        const addrField = document.getElementById("complaintAddress");
        if (addrField) addrField.value = chosen;
        gpsBtn.innerHTML = `<i data-lucide="check" class="w-4 h-4 text-emerald-600"></i> Location Detected`;
        showToast("GPS Location Pinpointed: Jamnagar Municipal limits", "success");
        if (window.lucide) window.lucide.createIcons();
      }, 600);
    });
  }

  // Photo upload trigger with FileReader preview
  const photoInput = document.getElementById("complaintPhoto");
  const photoPreview = document.getElementById("photoUploadPreview");
  if (photoInput && photoPreview) {
    photoInput.addEventListener("change", (e) => {
      if (e.target.files && e.target.files[0]) {
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.onload = (event) => {
          attachedPhotoDataUrl = event.target.result;
          photoPreview.classList.remove("hidden");
          photoPreview.innerHTML = `
            <div class="flex items-center gap-3 bg-emerald-50 p-2.5 rounded-xl border border-emerald-200">
              <img src="${attachedPhotoDataUrl}" class="w-14 h-14 object-cover rounded-lg border border-emerald-300">
              <div class="text-left">
                <span class="font-bold text-xs text-emerald-800 block">Photo Attached</span>
                <span class="text-[11px] text-slate-500">${file.name} (${(file.size / 1024).toFixed(1)} KB)</span>
              </div>
            </div>
          `;
          if (window.lucide) window.lucide.createIcons();
        };
        reader.readAsDataURL(file);
      }
    });
  }

  // Escalation form submission
  const escForm = document.getElementById("escalationForm");
  if (escForm) {
    escForm.addEventListener("submit", handleEscalationSubmit);
  }

  // Feedback form submission
  const fbForm = document.getElementById("feedbackForm");
  if (fbForm) {
    fbForm.addEventListener("submit", handleFeedbackSubmit);
  }

  // Officer Update form submission
  const offForm = document.getElementById("officerUpdateForm");
  if (offForm) {
    offForm.addEventListener("submit", handleOfficerUpdateSubmit);
  }

  // Officer Filter changes
  const offWardFilter = document.getElementById("officerWardFilter");
  const offStatusFilter = document.getElementById("officerStatusFilter");
  const offDeptFilter = document.getElementById("officerDeptFilter");

  if (offWardFilter) offWardFilter.addEventListener("change", renderOfficerTickets);
  if (offStatusFilter) offStatusFilter.addEventListener("change", renderOfficerTickets);
  if (offDeptFilter) offDeptFilter.addEventListener("change", renderOfficerTickets);
}

// Quick Fill Track helper
function quickFillTrack(ticketId) {
  const trackSection = document.getElementById("track");
  const trackInput = document.getElementById("trackTicketInput");
  if (trackInput) trackInput.value = ticketId;
  if (trackSection) trackSection.scrollIntoView({ behavior: 'smooth' });
  trackTicket(ticketId);
}

// Translations dictionary
const TRANSLATIONS = {
  en: {
    govHeader: "Government of Gujarat | Jamnagar Municipal Corporation",
    brandTitle: "JAMNAGAR",
    brandBadge: "CIVIC CARE",
    brandSubtitle: "Jamnagar Municipal Corporation (JMC)",
    navServices: "Civic Services",
    navTrack: "Track Grievance",
    navMyComplaints: "My Grievances",
    navWater: "Water Schedule",
    navTax: "Property Tax",
    navWards: "16 Wards",
    navHelplines: "Helplines",
    btnRegister: "Register Grievance",
    announcementBadge: "Announcement",
    tagline: "Official Citizen Grievance Redressal & Civic Portal",
    heroTitle: "Smart Civic Care for a Vibrant Jamnagar",
    heroDesc: "Direct civic service portal by Jamnagar Municipal Corporation (JMC). Register grievances, track water, streetlights, sanitation, roads, and civic requests in real-time.",
    btnTrack: "Track Complaint",
    btnTaxCalc: "Property Tax Calc",
    btnTrackNow: "Track Now",
    servicesBadge: "Municipal Service Catalog",
    servicesHeading: "Citizen Care Services & Departments",
    servicesSub: "Select a civic category to register issues or check service standards (SLA)",
    trackTitle: "Track Your Grievance Status",
    trackSub: "Check live assignment, field engineer updates, photos, and expected resolution SLA.",
    btnTrackProgress: "Track Progress",
    myGrievancesTitle: "My Lodged Grievances",
    myGrievancesSub: "All complaints submitted from this browser session with current status and instant actions.",
    wardsTitle: "Jamnagar Municipal Ward Directory",
    wardsSub: "Search your local ward corporator and ward engineer for direct field assistance across all 16 wards.",
    helplinesTitle: "Jamnagar Municipal Emergency Helplines",
    helplinesSub: "Reach our dedicated round-the-clock emergency desks for rapid field mobilization",
    modalRegTitle: "Register Civic Grievance"
  },
  gu: {
    govHeader: "ગુજરાત સરકાર | જામનગર મહાનગર સેવા સદન",
    brandTitle: "જામનગર",
    brandBadge: "સિવિક કેર",
    brandSubtitle: "જામનગર મહાનગરપાલિકા (JMC)",
    navServices: "નાગરિક સેવાઓ",
    navTrack: "ફરિયાદ ટ્રેકિંગ",
    navMyComplaints: "મારી ફરિયાદો",
    navWater: "પાણીનું ટાઈમટેબલ",
    navTax: "પ્રોપર્ટી ટેક્સ",
    navWards: "૧૬ વોર્ડ ડિરેક્ટરી",
    navHelplines: "હેલ્પલાઈન",
    btnRegister: "ફરિયાદ નોંધાવો",
    announcementBadge: "જાહેરાત",
    tagline: "સત્તાવાર નાગરિક ફરિયાદ નિવારણ અને સિવિક સેવા પોર્ટલ",
    heroTitle: "સ્વચ્છ અને સુંદર જામનગર માટે સ્માર્ટ નાગરિક સેવા",
    heroDesc: "જામનગર મહાનગરપાલિકાનું અધિકૃત સિવિક પોર્ટલ. પાણી પુરવઠો, સ્ટ્રીટ લાઈટ, સફાઈ, ગટર, રસ્તા અને તમામ નાગરિક સેવાઓની ત્વરિત ફરિયાદ અને લાઈવ ટ્રેકિંગ.",
    btnTrack: "સ્થિતિ તપાસો",
    btnTaxCalc: "ટેક્સ ગણતરી",
    btnTrackNow: "હમણાં ટ્રેક કરો",
    servicesBadge: "મ્યુનિસિપલ સેવા યાદી",
    servicesHeading: "નાગરિક સુવિધા અને સેવા વિભાગો",
    servicesSub: "ફરિયાદ નોંધાવવા અથવા સેવા ધોરણો (SLA) જાણવા માટે સંબંધિત વિભાગ પસંદ કરો",
    trackTitle: "તમારી ફરિયાદની સ્થિતિ તપાસો",
    trackSub: "વોર્ડ એન્જિનિયર, ફીલ્ડ ટીમની કામગીરી અને અંદાજિત સમયનું લાઈવ ટ્રેકિંગ જુઓ.",
    btnTrackProgress: "પ્રગતિ તપાસો",
    myGrievancesTitle: "મારી નોંધાયેલ ફરિયાદો",
    myGrievancesSub: "આ બ્રાઉઝર પરથી નોંધાવેલી તમામ ફરિયાદોની વિગત અને ત્વરિત કાર્યવાહી.",
    wardsTitle: "જામનગર મહાનગર ૧૬ વોર્ડ ડિરેક્ટરી",
    wardsSub: "તમારા વિસ્તારના નગરસેવક (કોર્પોરેટર) અને વોર્ડ એન્જિનિયરની સીધી માહિતી મેળવો.",
    helplinesTitle: "જામનગર મહાનગરપાલિકા ઈમરજન્સી હેલ્પલાઈન",
    helplinesSub: "તાત્કાલિક રાહત અને મ્યુનિસિપલ સહાય માટે ૨૪ કલાક કાર્યરત કંટ્રોલ રૂમ સંપર્ક કરો",
    modalRegTitle: "નાગરિક ફરિયાદ નોંધાવો"
  }
};

function applyLanguageTranslations() {
  const t = TRANSLATIONS[currentLanguage];
  document.querySelectorAll("[data-i18n]").forEach(el => {
    const key = el.getAttribute("data-i18n");
    if (t[key]) {
      el.innerText = t[key];
    }
  });
}

// Open New Complaint Modal (Requires Citizen Login)
function openComplaintModal(preselectedCategory = "") {
  // Enforce Citizen Authentication Requirement
  if (!currentUser) {
    pendingAuthAction = { action: 'openComplaintModal', category: preselectedCategory };
    openAuthModal('citizen_login', 'Citizen Login or Account Creation is required to file a municipal grievance.');
    return;
  }

  const modal = document.getElementById("newComplaintModal");
  if (!modal) return;

  // Pre-populate citizen information from authenticated profile
  const nameField = document.getElementById("citizenName");
  const phoneField = document.getElementById("citizenPhone");
  const wardField = document.getElementById("complaintWard");
  const addrField = document.getElementById("complaintAddress");

  if (nameField) nameField.value = currentUser.name || "";
  if (phoneField) phoneField.value = currentUser.phone || "";

  // Populate Departments
  const catSelect = document.getElementById("complaintCategory");
  if (catSelect) {
    catSelect.innerHTML = '<option value="">-- Select Civic Department --</option>';
    DEPARTMENTS.forEach(d => {
      const opt = document.createElement("option");
      opt.value = d.id;
      opt.innerText = `${d.title} (${d.titleGu})`;
      if (preselectedCategory && preselectedCategory === d.id) {
        opt.selected = true;
      }
      catSelect.appendChild(opt);
    });

    if (preselectedCategory) {
      populateSubcategories(preselectedCategory);
    } else {
      populateSubcategories("");
    }
  }

  // Populate Wards 1 to 16
  if (wardField && wardField.children.length <= 1) {
    WARDS_DATA.forEach(w => {
      const opt = document.createElement("option");
      opt.value = w.ward;
      opt.innerText = `Ward ${w.ward} - ${w.name}`;
      wardField.appendChild(opt);
    });
  }

  // Set user's ward and address if present
  if (wardField && currentUser.ward) {
    wardField.value = currentUser.ward;
  }
  if (addrField && currentUser.address && !addrField.value) {
    addrField.value = currentUser.address;
  }

  modal.classList.remove("hidden");
  document.body.style.overflow = "hidden";
  if (window.lucide) window.lucide.createIcons();
}

function closeComplaintModal() {
  const modal = document.getElementById("newComplaintModal");
  if (modal) {
    modal.classList.add("hidden");
    document.body.style.overflow = "auto";
  }
}

function populateSubcategories(catId) {
  const subSelect = document.getElementById("complaintSubcategory");
  if (!subSelect) return;

  subSelect.innerHTML = '<option value="">-- Select Specific Issue --</option>';
  const dept = DEPARTMENTS.find(d => d.id === catId);
  if (dept && dept.subcategories) {
    dept.subcategories.forEach(sub => {
      const opt = document.createElement("option");
      opt.value = sub;
      opt.innerText = sub;
      subSelect.appendChild(opt);
    });
  }
}

// Submit Complaint
function handleComplaintSubmit(e) {
  e.preventDefault();

  if (!currentUser) {
    showToast("Please sign in or create an account to submit your grievance.", "error");
    closeComplaintModal();
    openAuthModal('citizen_login');
    return;
  }

  const name = document.getElementById("citizenName").value.trim();
  const phone = document.getElementById("citizenPhone").value.trim();
  const ward = document.getElementById("complaintWard").value;
  const categoryId = document.getElementById("complaintCategory").value;
  const subcategory = document.getElementById("complaintSubcategory").value;
  const urgency = document.getElementById("complaintUrgency") ? document.getElementById("complaintUrgency").value : "Normal";
  const address = document.getElementById("complaintAddress").value.trim();
  const description = document.getElementById("complaintDesc").value.trim();

  if (!name || !phone || !ward || !categoryId || !subcategory || !address || !description) {
    showToast("Please fill all required fields correctly", "error");
    return;
  }

  if (phone.length < 10) {
    showToast("Please enter a valid 10-digit mobile number", "error");
    return;
  }

  const dept = DEPARTMENTS.find(d => d.id === categoryId);
  const wardObj = WARDS_DATA.find(w => w.ward == ward) || { name: `Ward ${ward}` };
  
  // Generate Official Ticket Number
  const random5 = Math.floor(10000 + Math.random() * 90000);
  const ticketId = `JMC-2026-W${ward.toString().padStart(2, '0')}-${random5}`;

  const now = new Date();
  const dateStr = now.toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' }) + ", " + 
                  now.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', hour12: true });

  const newTicket = {
    id: ticketId,
    citizenId: currentUser.id,
    name: name,
    phone: phone,
    ward: ward,
    wardName: wardObj.name,
    category: categoryId,
    categoryLabel: dept ? `${dept.title} (${dept.titleGu})` : categoryId,
    subcategory: subcategory,
    urgency: urgency,
    address: address,
    description: description,
    photo: attachedPhotoDataUrl,
    createdAt: dateStr,
    status: "assigned",
    slaHours: categoryId === 'sanitation' ? 12 : 24,
    officer: {
      name: wardObj.officer ? wardObj.officer.split('(')[0].trim() : "Ward Nodal Officer",
      designation: "Assistant Engineer (JMC)",
      contact: "0288-2550231"
    },
    timeline: [
      {
        title: "Complaint Registered",
        date: dateStr,
        desc: "Recorded in JMC Central Civic System. SMS confirmation dispatched.",
        status: "completed"
      },
      {
        title: "Assigned to Ward " + ward + " Cell",
        date: dateStr,
        desc: "Allocated to field supervisory squad for immediate inspection.",
        status: "current"
      },
      {
        title: "On-site Field Resolution",
        date: "Scheduled within 24 Hours",
        desc: "Maintenance team & vehicle assigned for rectification.",
        status: "pending"
      },
      {
        title: "Verification & Citizen Closure",
        date: "Pending Verification",
        desc: "Resolution photos uploaded & citizen feedback taken.",
        status: "pending"
      }
    ],
    feedback: null
  };

  complaints.unshift(newTicket);
  saveComplaints();

  // Reset form and close modal
  document.getElementById("newComplaintForm").reset();
  attachedPhotoDataUrl = null;
  const photoPreview = document.getElementById("photoUploadPreview");
  if (photoPreview) {
    photoPreview.innerHTML = "";
    photoPreview.classList.add("hidden");
  }

  closeComplaintModal();
  showSuccessReceipt(newTicket);
}

// Show Receipt Modal
function showSuccessReceipt(ticket) {
  const receiptModal = document.getElementById("receiptModal");
  if (!receiptModal) return;

  const content = document.getElementById("receiptContent");
  content.innerHTML = `
    <div id="printableReceipt" class="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm text-left">
      <!-- Header -->
      <div class="text-center pb-4 border-b border-slate-200">
        <div class="inline-flex items-center gap-2 mb-1">
          <div class="w-10 h-10 rounded-full bg-blue-900 text-white flex items-center justify-center font-black text-sm">JMC</div>
          <div class="text-left">
            <h4 class="font-extrabold text-blue-950 text-base leading-tight">JAMNAGAR MUNICIPAL CORPORATION</h4>
            <p class="text-xs text-amber-700 font-semibold">Civic Grievance Redressal Acknowledgement Slip</p>
          </div>
        </div>
      </div>

      <!-- Ticket Badge -->
      <div class="my-4 p-3 bg-amber-50 border border-amber-200 rounded-xl flex items-center justify-between">
        <div>
          <span class="text-xs text-amber-900 font-medium uppercase tracking-wider">Complaint Reference ID</span>
          <h3 class="text-xl font-mono font-bold text-blue-900 tracking-wide">${ticket.id}</h3>
        </div>
        <button onclick="navigator.clipboard.writeText('${ticket.id}'); showToast('Ticket ID copied to clipboard', 'info');" class="px-3 py-1.5 bg-white text-xs font-semibold text-slate-700 rounded-lg border border-amber-300 hover:bg-amber-100 flex items-center gap-1">
          <i data-lucide="copy" class="w-3.5 h-3.5"></i> Copy ID
        </button>
      </div>

      <!-- Details Grid -->
      <div class="grid grid-cols-2 gap-3 text-xs mb-4 text-slate-600">
        <div>
          <span class="text-slate-400 block">Citizen Name</span>
          <strong class="text-slate-800 text-sm">${ticket.name}</strong>
        </div>
        <div>
          <span class="text-slate-400 block">Mobile No</span>
          <strong class="text-slate-800 text-sm">+91 ${ticket.phone}</strong>
        </div>
        <div>
          <span class="text-slate-400 block">Ward Jurisdiction</span>
          <strong class="text-slate-800">Ward No. ${ticket.ward} (${ticket.wardName})</strong>
        </div>
        <div>
          <span class="text-slate-400 block">Service Department</span>
          <strong class="text-blue-900 font-semibold">${ticket.categoryLabel}</strong>
        </div>
        <div class="col-span-2">
          <span class="text-slate-400 block">Reported Issue</span>
          <strong class="text-slate-800">${ticket.subcategory}</strong>
        </div>
        <div class="col-span-2">
          <span class="text-slate-400 block">Location Landmark</span>
          <span class="text-slate-700">${ticket.address}</span>
        </div>
        <div>
          <span class="text-slate-400 block">Logged Timestamp</span>
          <span class="text-slate-700 font-medium">${ticket.createdAt}</span>
        </div>
        <div>
          <span class="text-slate-400 block">Standard Redressal SLA</span>
          <span class="text-emerald-700 font-semibold">${ticket.slaHours || 24} Hours Guaranteed</span>
        </div>
      </div>

      ${ticket.photo ? `
        <div class="my-3 p-2 bg-slate-50 rounded-xl border border-slate-200">
          <span class="text-[11px] text-slate-400 block mb-1">Attached Site Photograph:</span>
          <img src="${ticket.photo}" class="preview-thumb border border-slate-300">
        </div>
      ` : ''}

      <!-- Footer Note -->
      <div class="pt-3 border-t border-dashed border-slate-300 flex items-center justify-between text-xs text-slate-500">
        <span>Helpline: 1800-233-0131</span>
        <span>JMC Civic Care Portal</span>
      </div>
    </div>
  `;

  // Attach tracker button behavior
  const trackerBtn = document.getElementById("viewInTrackerBtn");
  if (trackerBtn) {
    trackerBtn.onclick = () => {
      closeReceiptModal();
      document.getElementById("track").scrollIntoView({ behavior: 'smooth' });
      document.getElementById("trackTicketInput").value = ticket.id;
      trackTicket(ticket.id);
    };
  }

  receiptModal.classList.remove("hidden");
  document.body.style.overflow = "hidden";
  if (window.lucide) window.lucide.createIcons();
}

function closeReceiptModal() {
  const receiptModal = document.getElementById("receiptModal");
  if (receiptModal) {
    receiptModal.classList.add("hidden");
    document.body.style.overflow = "auto";
  }
}

function printReceipt() {
  window.print();
}

// Track Grievance
function trackTicket(ticketId) {
  const resultContainer = document.getElementById("trackResultContainer");
  if (!resultContainer) return;

  if (!ticketId) {
    showToast("Please enter a Complaint Reference ID", "error");
    return;
  }

  const cleanId = ticketId.trim().toUpperCase();
  const found = complaints.find(c => c.id.toUpperCase() === cleanId);

  if (!found) {
    resultContainer.innerHTML = `
      <div class="bg-amber-50 border border-amber-200 rounded-2xl p-6 text-center animate-fadeIn">
        <div class="w-12 h-12 bg-amber-100 text-amber-700 rounded-full flex items-center justify-center mx-auto mb-3">
          <i data-lucide="alert-circle" class="w-6 h-6"></i>
        </div>
        <h4 class="font-bold text-slate-800 text-base">Complaint Reference Not Found</h4>
        <p class="text-sm text-slate-600 mt-1 max-w-md mx-auto">
          We could not locate any grievance matching ID <span class="font-mono font-bold text-blue-900">${cleanId}</span>. Please verify the ticket or try sample tickets.
        </p>
        <div class="mt-4 flex flex-wrap justify-center gap-2">
          <button onclick="trackTicket('JMC-2026-W04-1082')" class="text-xs bg-white text-blue-900 border border-blue-200 px-3 py-1 rounded-lg hover:bg-blue-50 font-mono">
            Try: JMC-2026-W04-1082 (Water)
          </button>
          <button onclick="trackTicket('JMC-2026-W09-2914')" class="text-xs bg-white text-blue-900 border border-blue-200 px-3 py-1 rounded-lg hover:bg-blue-50 font-mono">
            Try: JMC-2026-W09-2914 (Streetlight)
          </button>
        </div>
      </div>
    `;
    if (window.lucide) window.lucide.createIcons();
    return;
  }

  // Render Status Timeline
  let statusBadge = '';
  if (found.status === 'resolved') {
    statusBadge = '<span class="px-3 py-1 bg-emerald-100 text-emerald-800 rounded-full font-semibold text-xs border border-emerald-300 flex items-center gap-1.5"><i data-lucide="check-circle" class="w-3.5 h-3.5 text-emerald-600"></i> Redressed & Resolved</span>';
  } else if (found.status === 'in_progress') {
    statusBadge = '<span class="px-3 py-1 bg-blue-100 text-blue-800 rounded-full font-semibold text-xs border border-blue-300 flex items-center gap-1.5"><i data-lucide="activity" class="w-3.5 h-3.5 text-blue-600"></i> Work In Progress</span>';
  } else {
    statusBadge = '<span class="px-3 py-1 bg-amber-100 text-amber-800 rounded-full font-semibold text-xs border border-amber-300 flex items-center gap-1.5"><i data-lucide="clock" class="w-3.5 h-3.5 text-amber-600"></i> Officer Assigned</span>';
  }

  const timelineHtml = found.timeline.map((item) => {
    let iconClass = "bg-slate-200 text-slate-500 border-slate-300";
    let textClass = "text-slate-500";
    let iconName = "clock";

    if (item.status === 'completed') {
      iconClass = "bg-emerald-600 text-white border-emerald-600";
      textClass = "text-emerald-900";
      iconName = "check";
    } else if (item.status === 'current') {
      iconClass = "bg-blue-600 text-white border-blue-600 animate-pulse";
      textClass = "text-blue-900";
      iconName = "activity";
    }

    return `
      <div class="timeline-step ${item.status === 'completed' ? 'completed' : ''} flex gap-4 pb-6 last:pb-0">
        <div class="w-10 h-10 rounded-full flex-shrink-0 flex items-center justify-center border-2 ${iconClass} z-10 bg-white shadow-sm">
          <i data-lucide="${iconName}" class="w-4 h-4"></i>
        </div>
        <div class="flex-grow pt-1">
          <div class="flex items-center justify-between flex-wrap gap-1">
            <h5 class="font-bold text-sm ${textClass}">${item.title}</h5>
            <span class="text-xs text-slate-400 font-medium">${item.date}</span>
          </div>
          <p class="text-xs text-slate-600 mt-1">${item.desc}</p>
        </div>
      </div>
    `;
  }).join('');

  resultContainer.innerHTML = `
    <div class="bg-white rounded-2xl border border-slate-200 shadow-md p-6 sm:p-8 animate-fadeIn">
      <!-- Header -->
      <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-slate-100">
        <div>
          <div class="flex items-center gap-3">
            <span class="text-xs font-mono font-semibold px-2.5 py-1 bg-slate-100 text-slate-800 rounded-md border border-slate-200">
              ${found.id}
            </span>
            ${statusBadge}
          </div>
          <h3 class="text-lg font-bold text-slate-900 mt-2">${found.subcategory}</h3>
          <p class="text-xs text-slate-500 font-medium flex items-center gap-1.5 mt-0.5">
            <i data-lucide="map-pin" class="w-3.5 h-3.5 text-slate-400"></i>
            Ward ${found.ward}: ${found.address}
          </p>
        </div>
        <div class="flex items-center gap-2">
          <button onclick="showSuccessReceipt(complaints.find(c => c.id === '${found.id}'))" class="px-3.5 py-2 text-xs font-semibold text-blue-900 bg-blue-50 hover:bg-blue-100 rounded-xl border border-blue-200 flex items-center gap-1.5">
            <i data-lucide="file-text" class="w-3.5 h-3.5"></i> Acknowledgement Slip
          </button>
        </div>
      </div>

      <!-- Grievance Info Summary -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4 my-6 bg-slate-50 p-4 rounded-xl border border-slate-200">
        <div>
          <span class="text-xs text-slate-400 block font-medium">Citizen Details</span>
          <p class="text-xs font-bold text-slate-800">${found.name}</p>
          <span class="text-xs text-slate-500">Contact: +91 ${found.phone.slice(0, 5)}*****</span>
        </div>
        <div>
          <span class="text-xs text-slate-400 block font-medium">Department Assigned</span>
          <p class="text-xs font-bold text-blue-900">${found.categoryLabel}</p>
          <span class="text-xs text-emerald-600 font-semibold">Standard SLA: ${found.slaHours || 24} Hours</span>
        </div>
        <div>
          <span class="text-xs text-slate-400 block font-medium">Assigned Officer</span>
          <p class="text-xs font-bold text-slate-800">${found.officer ? found.officer.name : 'Ward Nodal Officer'}</p>
          <span class="text-xs text-slate-500">${found.officer ? found.officer.designation : 'JMC Officer'}</span>
        </div>
      </div>

      ${found.photo ? `
        <div class="mb-6 p-3 bg-slate-50 rounded-xl border border-slate-200">
          <span class="text-xs font-bold text-slate-600 block mb-2">Citizen Uploaded Incident Photo:</span>
          <img src="${found.photo}" class="preview-thumb border border-slate-300">
        </div>
      ` : ''}

      <!-- Timeline Title -->
      <div class="mb-4">
        <h4 class="text-sm font-bold text-slate-800 flex items-center gap-2">
          <i data-lucide="git-commit" class="w-4 h-4 text-blue-700"></i> Real-time Action Timeline
        </h4>
      </div>

      <!-- Action Timeline -->
      <div class="pl-2 border-l-0">
        ${timelineHtml}
      </div>

      ${found.feedback ? `
        <div class="mt-6 p-4 rounded-xl bg-amber-50/70 border border-amber-200">
          <div class="flex items-center justify-between mb-1">
            <span class="text-xs font-bold text-amber-900">Citizen Satisfaction Feedback</span>
            <span class="text-amber-500 font-bold">★ ${found.feedback.rating} / 5</span>
          </div>
          <p class="text-xs text-slate-700 italic">"${found.feedback.comment}"</p>
        </div>
      ` : ''}

      <!-- Action Bar -->
      <div class="mt-6 pt-5 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3 text-xs">
        <span class="text-slate-500">Need urgent help? Call JMC Control Room at <strong>0288-2550231</strong></span>
        <div class="flex items-center gap-2">
          ${found.status === 'resolved' && !found.feedback ? `
            <button onclick="openFeedbackModal('${found.id}')" class="px-3.5 py-1.5 bg-amber-50 text-amber-800 border border-amber-300 hover:bg-amber-100 rounded-lg font-semibold flex items-center gap-1.5">
              <i data-lucide="star" class="w-3.5 h-3.5 text-amber-600"></i> Rate Resolution
            </button>
          ` : ''}
          <button onclick="openEscalationModal('${found.id}')" class="px-3.5 py-1.5 bg-white text-slate-700 border border-slate-300 hover:bg-slate-50 rounded-lg font-semibold flex items-center gap-1.5">
            <i data-lucide="shield-alert" class="w-3.5 h-3.5 text-amber-600"></i> Escalate to Commissioner
          </button>
        </div>
      </div>
    </div>
  `;

  if (window.lucide) {
    window.lucide.createIcons();
  }
}

// Quick Department Detail modal
function showQuickDepartmentInfo(deptId) {
  const dept = DEPARTMENTS.find(d => d.id === deptId);
  if (!dept) return;

  const modal = document.getElementById("infoModal");
  if (!modal) return;

  const title = document.getElementById("infoModalTitle");
  const body = document.getElementById("infoModalBody");

  title.innerText = `${dept.title} (${dept.titleGu})`;
  body.innerHTML = `
    <div class="space-y-4 text-sm text-slate-600">
      <div class="p-4 bg-blue-50 border border-blue-200 rounded-xl">
        <h5 class="font-bold text-blue-900 mb-1">Standard Citizen Charter SLA</h5>
        <p class="text-xs text-blue-800">Target Resolution Time: <strong>${dept.sla}</strong></p>
      </div>
      <div>
        <h5 class="font-bold text-slate-800 mb-2">Scope of Services & Common Issues:</h5>
        <ul class="list-disc pl-5 space-y-1 text-xs">
          ${dept.subcategories.map(s => `<li>${s}</li>`).join('')}
        </ul>
      </div>
      <div class="p-3 bg-slate-50 rounded-lg border border-slate-200 text-xs">
        <strong>Direct Department Helpline:</strong> 0288-2550231 (Ext. 104) | Jamnagar Municipal Corporation
      </div>
      <div class="pt-2 text-right">
        <button onclick="closeInfoModal(); openComplaintModal('${dept.id}');" class="px-4 py-2 bg-blue-900 text-white rounded-xl text-xs font-bold hover:bg-blue-800">
          File Complaint for this Department
        </button>
      </div>
    </div>
  `;

  modal.classList.remove("hidden");
  document.body.style.overflow = "hidden";
}

function closeInfoModal() {
  const modal = document.getElementById("infoModal");
  if (modal) {
    modal.classList.add("hidden");
    document.body.style.overflow = "auto";
  }
}

// Escalation Modal Logic
function openEscalationModal(ticketId) {
  const modal = document.getElementById("escalationModal");
  const input = document.getElementById("escalateTicketId");
  if (modal && input) {
    input.value = ticketId;
    modal.classList.remove("hidden");
    document.body.style.overflow = "hidden";
  }
}

function closeEscalationModal() {
  const modal = document.getElementById("escalationModal");
  if (modal) {
    modal.classList.add("hidden");
    document.body.style.overflow = "auto";
  }
}

function handleEscalationSubmit(e) {
  e.preventDefault();
  const ticketId = document.getElementById("escalateTicketId").value;
  
  closeEscalationModal();
  showToast(`Ticket ${ticketId} escalated to Municipal Commissioner office. Escalation Ref: ESC-${Math.floor(1000 + Math.random() * 9000)}`, "success");
}

// Feedback Modal Logic
function openFeedbackModal(ticketId) {
  const modal = document.getElementById("feedbackModal");
  const input = document.getElementById("feedbackTicketId");
  if (modal && input) {
    input.value = ticketId;
    setFeedbackRating(5);
    modal.classList.remove("hidden");
    document.body.style.overflow = "hidden";
  }
}

function closeFeedbackModal() {
  const modal = document.getElementById("feedbackModal");
  if (modal) {
    modal.classList.add("hidden");
    document.body.style.overflow = "auto";
  }
}

function setFeedbackRating(stars) {
  const ratingInput = document.getElementById("feedbackRatingValue");
  if (ratingInput) ratingInput.value = stars;
  
  const starButtons = document.querySelectorAll(".star-btn");
  starButtons.forEach((btn, index) => {
    if (index < stars) {
      btn.classList.add("active");
    } else {
      btn.classList.remove("active");
    }
  });
}

function handleFeedbackSubmit(e) {
  e.preventDefault();
  const ticketId = document.getElementById("feedbackTicketId").value;
  const rating = parseInt(document.getElementById("feedbackRatingValue").value) || 5;
  const comment = document.getElementById("feedbackComment").value.trim() || "Resolution confirmed by citizen.";

  const ticket = complaints.find(c => c.id === ticketId);
  if (ticket) {
    ticket.feedback = { rating, comment };
    saveComplaints();
    closeFeedbackModal();
    showToast("Thank you! Your feedback has been recorded.", "success");
    trackTicket(ticketId);
  }
}

// Property Tax Calculation
function calculatePropertyTax() {
  const area = parseFloat(document.getElementById("taxCarpetArea").value) || 850;
  const type = document.getElementById("taxPropertyType").value;
  const age = document.getElementById("taxAgeFactor").value;
  const occupancy = document.getElementById("taxOccupancy").value;

  // Municipal rate formula
  let baseRate = 2.2; // base rate per sq ft
  if (type === 'commercial') baseRate = 4.8;
  else if (type === 'industrial') baseRate = 3.6;
  else if (type === 'open_plot') baseRate = 1.2;

  // Age multiplier
  let ageMult = 1.0;
  if (age === 'medium') ageMult = 0.9;
  else if (age === 'old') ageMult = 0.8;

  // Occupancy multiplier
  let occMult = occupancy === 'tenanted' ? 1.2 : 1.0;

  const general = Math.round(area * baseRate * ageMult * occMult);
  const conservancy = Math.round(general * 0.22);
  const waterDrainage = Math.round(general * 0.35);
  const subtotal = general + conservancy + waterDrainage;
  const rebate = Math.round(subtotal * 0.10); // 10% early bird rebate
  const netDue = subtotal - rebate;

  document.getElementById("taxGeneral").innerText = `₹ ${general.toLocaleString('en-IN')}`;
  document.getElementById("taxConservancy").innerText = `₹ ${conservancy.toLocaleString('en-IN')}`;
  document.getElementById("taxWaterDrainage").innerText = `₹ ${waterDrainage.toLocaleString('en-IN')}`;
  document.getElementById("taxDiscount").innerText = `- ₹ ${rebate.toLocaleString('en-IN')}`;
  document.getElementById("taxTotalDue").innerText = `₹ ${netDue.toLocaleString('en-IN')}`;
}

// Simulate Tax Payment & Generate Receipt
function simulateTaxPayment() {
  const modal = document.getElementById("taxReceiptModal");
  if (!modal) return;

  const ward = document.getElementById("taxWardSelect").value;
  const type = document.getElementById("taxPropertyType").options[document.getElementById("taxPropertyType").selectedIndex].text;
  const area = document.getElementById("taxCarpetArea").value;
  const amount = document.getElementById("taxTotalDue").innerText;
  const txnId = `JMC-TXN-${Date.now().toString().slice(-8)}`;
  const tenementId = `04-${ward.padStart(2, '0')}-0${Math.floor(1000 + Math.random() * 9000)}-001`;

  const dateStr = new Date().toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' });

  const content = document.getElementById("taxReceiptContent");
  content.innerHTML = `
    <div id="printableTaxReceipt" class="bg-white p-6 rounded-2xl border border-slate-200 text-left">
      <div class="text-center pb-4 border-b border-slate-200">
        <h4 class="font-black text-blue-950 text-base leading-tight">JAMNAGAR MUNICIPAL CORPORATION</h4>
        <p class="text-xs text-amber-700 font-bold">Property Tax Assessment & e-Receipt (FY 2026-27)</p>
      </div>

      <div class="my-4 p-3 bg-emerald-50 border border-emerald-200 rounded-xl flex items-center justify-between">
        <div>
          <span class="text-xs text-emerald-800 font-medium">Transaction ID</span>
          <h4 class="text-sm font-mono font-bold text-emerald-950">${txnId}</h4>
        </div>
        <div class="text-right">
          <span class="text-xs text-emerald-800 font-medium">Paid Amount</span>
          <h4 class="text-lg font-mono font-bold text-emerald-700">${amount}</h4>
        </div>
      </div>

      <div class="grid grid-cols-2 gap-3 text-xs mb-4 text-slate-600">
        <div>
          <span class="text-slate-400 block">Tenement No.</span>
          <strong class="text-slate-900 font-mono">${tenementId}</strong>
        </div>
        <div>
          <span class="text-slate-400 block">Municipal Ward</span>
          <strong class="text-slate-800">Ward No. ${ward}</strong>
        </div>
        <div>
          <span class="text-slate-400 block">Property Category</span>
          <strong class="text-slate-800">${type}</strong>
        </div>
        <div>
          <span class="text-slate-400 block">Assessment Area</span>
          <strong class="text-slate-800">${area} Sq. Ft.</strong>
        </div>
        <div>
          <span class="text-slate-400 block">Payment Date</span>
          <span class="text-slate-700">${dateStr}</span>
        </div>
        <div>
          <span class="text-slate-400 block">Early Bird 10% Rebate</span>
          <span class="text-emerald-700 font-bold">Applied Successfully</span>
        </div>
      </div>

      <div class="pt-3 border-t border-dashed border-slate-300 flex items-center justify-between text-[11px] text-slate-400">
        <span>Payment Gateway: JMC Smart Treasury</span>
        <span>Status: SUCCESS</span>
      </div>
    </div>
  `;

  modal.classList.remove("hidden");
  document.body.style.overflow = "hidden";
  if (window.lucide) window.lucide.createIcons();
}

function closeTaxReceiptModal() {
  const modal = document.getElementById("taxReceiptModal");
  if (modal) {
    modal.classList.add("hidden");
    document.body.style.overflow = "auto";
  }
}

function printTaxReceipt() {
  window.print();
}

// Officer Dashboard Controls (Requires Admin Authentication)
function toggleOfficerDashboard() {
  // Enforce Admin / Officer Login Requirement
  if (!currentUser || currentUser.role !== 'admin') {
    openAuthModal('admin_login', 'Municipal Officer / Administrator authentication is required to access JMC Control Room.');
    return;
  }

  const section = document.getElementById("officerDashboardSection");
  const label = document.getElementById("officerModeLabel");
  if (!section) return;

  isOfficerMode = !isOfficerMode;
  if (isOfficerMode) {
    section.classList.remove("hidden");
    section.scrollIntoView({ behavior: 'smooth' });
    if (label) label.innerText = "Exit Staff Portal";
    renderOfficerTickets();
  } else {
    section.classList.add("hidden");
    if (label) label.innerText = "Staff Portal";
  }
}

function renderOfficerTickets() {
  const container = document.getElementById("officerTicketsTableContainer");
  if (!container) return;

  const wardFilter = document.getElementById("officerWardFilter").value;
  const statusFilter = document.getElementById("officerStatusFilter").value;
  const deptFilter = document.getElementById("officerDeptFilter").value;

  let filtered = complaints;
  if (wardFilter !== 'all') {
    filtered = filtered.filter(c => c.ward.toString() === wardFilter);
  }
  if (statusFilter !== 'all') {
    filtered = filtered.filter(c => c.status === statusFilter);
  }
  if (deptFilter !== 'all') {
    filtered = filtered.filter(c => c.category === deptFilter);
  }

  if (filtered.length === 0) {
    container.innerHTML = `
      <div class="p-8 text-center text-slate-400">
        <p>No tickets matching the selected filters.</p>
      </div>
    `;
    return;
  }

  let html = `
    <div class="overflow-x-auto">
      <table class="w-full text-left text-xs text-slate-300">
        <thead class="bg-slate-900 text-slate-200 font-bold border-b border-slate-700">
          <tr>
            <th class="p-3.5">Ticket ID</th>
            <th class="p-3.5">Citizen</th>
            <th class="p-3.5">Department</th>
            <th class="p-3.5">Ward</th>
            <th class="p-3.5">Urgency</th>
            <th class="p-3.5">Current Status</th>
            <th class="p-3.5 text-right">Officer Action</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-slate-700">
  `;

  filtered.forEach(ticket => {
    let statusBadge = '';
    if (ticket.status === 'resolved') {
      statusBadge = '<span class="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 font-semibold">Resolved</span>';
    } else if (ticket.status === 'in_progress') {
      statusBadge = '<span class="px-2 py-0.5 rounded bg-blue-500/20 text-blue-300 border border-blue-500/30 font-semibold">In Progress</span>';
    } else {
      statusBadge = '<span class="px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/30 font-semibold">Assigned</span>';
    }

    let urgencyBadge = ticket.urgency === 'Critical' 
      ? '<span class="text-rose-400 font-bold">Critical</span>' 
      : (ticket.urgency === 'High' ? '<span class="text-amber-400 font-bold">High</span>' : '<span class="text-slate-400">Normal</span>');

    html += `
      <tr class="hover:bg-slate-700/50 transition-colors">
        <td class="p-3.5 font-mono font-bold text-amber-400">${ticket.id}</td>
        <td class="p-3.5">
          <strong class="text-white block">${ticket.name}</strong>
          <span class="text-slate-400 text-[11px]">${ticket.phone}</span>
        </td>
        <td class="p-3.5">${ticket.categoryLabel}</td>
        <td class="p-3.5">Ward ${ticket.ward}</td>
        <td class="p-3.5">${urgencyBadge}</td>
        <td class="p-3.5">${statusBadge}</td>
        <td class="p-3.5 text-right">
          <button onclick="openOfficerUpdateModal('${ticket.id}')" class="px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-bold text-[11px]">
            Update Stage
          </button>
        </td>
      </tr>
    `;
  });

  html += `
        </tbody>
      </table>
    </div>
  `;

  container.innerHTML = html;
}

function openOfficerUpdateModal(ticketId) {
  const modal = document.getElementById("officerUpdateModal");
  const ticketInput = document.getElementById("officerTicketId");
  const displayInput = document.getElementById("officerDisplayTicketId");
  const statusSelect = document.getElementById("officerNewStatus");

  const ticket = complaints.find(c => c.id === ticketId);
  if (modal && ticket) {
    ticketInput.value = ticket.id;
    displayInput.value = `${ticket.id} - ${ticket.subcategory}`;
    statusSelect.value = ticket.status;
    modal.classList.remove("hidden");
    document.body.style.overflow = "hidden";
  }
}

function closeOfficerUpdateModal() {
  const modal = document.getElementById("officerUpdateModal");
  if (modal) {
    modal.classList.add("hidden");
    document.body.style.overflow = "auto";
  }
}

function handleOfficerUpdateSubmit(e) {
  e.preventDefault();
  const ticketId = document.getElementById("officerTicketId").value;
  const newStatus = document.getElementById("officerNewStatus").value;
  const remarks = document.getElementById("officerActionRemarks").value.trim();

  const ticket = complaints.find(c => c.id === ticketId);
  if (ticket) {
    ticket.status = newStatus;
    const nowStr = new Date().toLocaleDateString('en-IN', { day: '2-digit', month: 'short' }) + ", " + 
                   new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', hour12: true });

    let title = "Status Updated by Officer";
    if (newStatus === 'in_progress') title = "Field Team on Site / Work In Progress";
    else if (newStatus === 'resolved') title = "Work Completed & Verified";

    ticket.timeline.push({
      title: title,
      date: nowStr,
      desc: remarks || "Officer action logged.",
      status: "completed"
    });

    saveComplaints();
    closeOfficerUpdateModal();
    document.getElementById("officerActionRemarks").value = "";
    showToast(`Ticket ${ticketId} status updated to ${newStatus.toUpperCase()}`, "success");
    renderOfficerTickets();
  }
}

// Accessibility Helpers
function changeFontSize(size) {
  document.body.classList.remove("font-sm", "font-lg");
  if (size === 'sm') document.body.classList.add("font-sm");
  else if (size === 'lg') document.body.classList.add("font-lg");
}

function toggleHighContrast() {
  document.body.classList.toggle("high-contrast");
}

// Mobile navigation drawer toggle
function toggleMobileNav() {
  const menu = document.getElementById("mobileNavMenu");
  if (menu) menu.classList.toggle("hidden");
}

// Toast notification helper
function showToast(message, type = "info") {
  const toastContainer = document.getElementById("toastContainer");
  if (!toastContainer) return;

  const toast = document.createElement("div");
  let bgClass = "bg-slate-900 text-white border-slate-700";
  let icon = "info";

  if (type === "success") {
    bgClass = "bg-emerald-900 text-white border-emerald-700";
    icon = "check-circle";
  } else if (type === "error") {
    bgClass = "bg-rose-900 text-white border-rose-700";
    icon = "alert-circle";
  }

  toast.className = `flex items-center gap-2.5 px-4 py-3 rounded-xl shadow-xl text-xs font-semibold border ${bgClass} transition-all duration-300 transform translate-y-2 opacity-0 pointer-events-auto`;
  toast.innerHTML = `
    <i data-lucide="${icon}" class="w-4 h-4 flex-shrink-0"></i>
    <span>${message}</span>
  `;

  toastContainer.appendChild(toast);
  if (window.lucide) window.lucide.createIcons();

  // Animate in
  setTimeout(() => {
    toast.classList.remove("translate-y-2", "opacity-0");
  }, 10);

  // Remove
  setTimeout(() => {
    toast.classList.add("opacity-0", "translate-y-2");
    setTimeout(() => toast.remove(), 300);
  }, 3500);
}
