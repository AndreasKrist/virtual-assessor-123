/* Define all questions here */

// Biodata questions
export const biodataQuestions = [
  {
    id: "fullName",
    label: "Full Name",
    type: "text",
    required: true,
  },
  {
    id: "email",
    label: "Email Address",
    type: "email",
    required: true,
  },
  {
    id: "phone",
    label: "Phone Number",
    type: "tel",
    required: false,
  },
  {
    id: "ageGroup",
    label: "Age Group",
    type: "select",
    options: ["18-24", "25-34", "35-44", "45-54", "55+"],
    required: false,
  }
];

// General IT questions
export const generalQuestions = [
  {
    id: "generalQ1",
    text: "Do you know how to power up/down and operate a desktop computer or laptop?",
    courseRecommendation: "Computer Basics 101",
    category: "basics"
  },
  {
    id: "generalQ2",
    text: "Can you use a web browser (e.g., Chrome, Edge, Firefox) to access websites or search for information online?",
    courseRecommendation: "Web Browsing Fundamentals",
    category: "basics" 
  },
  {
    id: "generalQ3",
    text: "Do you know how to connect to Wi-Fi or a wired internet connection?",
    courseRecommendation: "Internet Connectivity Basics",
    category: "connectivity"
  },
  {
    id: "generalQ4",
    text: "Can you use email to send, receive, and reply to messages (e.g., Outlook, Gmail)?",
    courseRecommendation: "Email Communication Essentials",
    category: "communication"
  },
  {
    id: "generalQ5",
    text: "Are you comfortable creating and saving documents using Microsoft Word, Google Docs, or a similar word processor?",
    courseRecommendation: "Office Productivity Fundamentals",
    category: "productivity"
  },
  {
    id: "generalQ6",
    text: "Do you know how to copy and paste text or files on a computer?",
    courseRecommendation: "Computer Basics 101",
    category: "basics"
  },
  {
    id: "generalQ7",
    text: "Can you use a USB drive or external storage device to transfer files?",
    courseRecommendation: "File Management Essentials",
    category: "fileManagement"
  },
  {
    id: "generalQ8",
    text: "Do you know how to install basic software (e.g., Zoom, Microsoft Office) using instructions or a setup file?",
    courseRecommendation: "Software Installation and Management",
    category: "software"
  },
  {
    id: "generalQ9",
    text: "Can you adjust simple computer settings like screen brightness, volume, or changing a desktop background?",
    courseRecommendation: "Computer Configuration Basics",
    category: "configuration"
  },
  {
    id: "generalQ10",
    text: "Do you know how to restart a frozen application or reboot your computer when it's not responding?",
    courseRecommendation: "Troubleshooting Computer Problems",
    category: "troubleshooting"
  }
];

// Network Admin questions
export const networkAdminQuestions = [
  {
    id: "networkQ1",
    text: "Do you know what Internet is and what is used for?",
    courseRecommendation: "Introduction to Internet Technologies",
    category: "internet"
  },
  {
    id: "networkQ2",
    text: "Do you know the difference between a wired (Ethernet) and wireless (Wi-Fi) connection?",
    courseRecommendation: "Networking Fundamentals: Connectivity Types",
    category: "connectivity"
  },
  {
    id: "networkQ3",
    text: "Have you ever connected a device to a Wi-Fi network using a password?",
    courseRecommendation: "Wi-Fi Network Configuration Basics",
    category: "connectivity"
  },
  {
    id: "networkQ4",
    text: "Do you know how to check if a device is connected to the internet?",
    courseRecommendation: "Network Troubleshooting Basics",
    category: "troubleshooting"
  },
  {
    id: "networkQ5",
    text: "Have you ever restarted a modem or router to fix a network issue?",
    courseRecommendation: "Network Hardware Management",
    category: "hardware"
  },
  {
    id: "networkQ6",
    text: "Do you know what an IP address is?",
    courseRecommendation: "IP Addressing and Subnetting",
    category: "networking"
  },
  {
    id: "networkQ7",
    text: "Can you find your IP address on your computer or phone?",
    courseRecommendation: "Network Configuration Essentials",
    category: "configuration"
  },
  {
    id: "networkQ8",
    text: "Do you know what a router does in a network?",
    courseRecommendation: "Network Hardware Fundamentals",
    category: "hardware"
  },
  {
    id: "networkQ9",
    text: "Have you ever used the ping command to test if a website is reachable?",
    courseRecommendation: "Network Diagnostics and Troubleshooting",
    category: "troubleshooting"
  },
  {
    id: "networkQ10",
    text: "Do you understand what subnetting is and why it's used in networking?",
    courseRecommendation: "Advanced IP Addressing and Subnetting",
    category: "networking"
  }
];

// Cybersecurity questions
export const cybersecurityQuestions = [
  {
    id: "cyberQ1",
    text: "Do you understand the importance of passwords?",
    courseRecommendation: "Password Security Best Practices",
    category: "security"
  },
  {
    id: "cyberQ2",
    text: "Have you ever been concerned about someone accessing your accounts without permission?",
    courseRecommendation: "Account Security and Protection",
    category: "security"
  },
  {
    id: "cyberQ3",
    text: "Do you understand why using public Wi-Fi can be risky?",
    courseRecommendation: "Network Security Fundamentals",
    category: "security"
  },
  {
    id: "cyberQ4",
    text: "Do you know what cyber security means?",
    courseRecommendation: "Introduction to Cybersecurity",
    category: "security"
  },
  {
    id: "cyberQ5",
    text: "Have you ever heard one of these (Phishing, Malware)?",
    courseRecommendation: "Common Cyber Threats and Attacks",
    category: "threats"
  },
  {
    id: "cyberQ6",
    text: "Have you heard of encryption?",
    courseRecommendation: "Data Encryption Fundamentals",
    category: "encryption"
  },
  {
    id: "cyberQ7",
    text: "Do you know what multifactor authentication means?",
    courseRecommendation: "Authentication Methods and Security",
    category: "authentication"
  },
  {
    id: "cyberQ8",
    text: "Do you know what a secure website looks like in your browser?",
    courseRecommendation: "Web Security Indicators",
    category: "webSecurity"
  },
  {
    id: "cyberQ9",
    text: "Are you familiar with what DNS is?",
    courseRecommendation: "DNS and Network Security",
    category: "networking"
  },
  {
    id: "cyberQ10",
    text: "Are you familiar with what an \"endpoint\" refers to in cybersecurity?",
    courseRecommendation: "Endpoint Security Fundamentals",
    category: "endpointSecurity"
  }
];

// Map role to questions set
export const roleQuestions = {
  "networkAdmin": networkAdminQuestions,
  "cybersecurity": cybersecurityQuestions
};

// Course catalog with detailed information
export const courseCatalog = {
  "Computer Basics 101": {
    title: "Computer Basics 101",
    description: "Learn the fundamentals of operating computers, from power functions to basic navigation.",
    duration: "4 weeks",
    difficulty: "Beginner",
    topics: ["Computer Hardware", "Operating Systems", "File Management", "Basic Troubleshooting"]
  },
  "Web Browsing Fundamentals": {
    title: "Web Browsing Fundamentals",
    description: "Learn how to effectively use web browsers to search for information and navigate the internet.",
    duration: "2 weeks",
    difficulty: "Beginner",
    topics: ["Browser Navigation", "Search Techniques", "Bookmarks", "Browser Security"]
  },
  "Internet Connectivity Basics": {
    title: "Internet Connectivity Basics",
    description: "Understand different types of internet connections and how to troubleshoot connectivity issues.",
    duration: "3 weeks",
    difficulty: "Beginner",
    topics: ["Wi-Fi Setup", "Network Types", "Connection Troubleshooting", "Basic Network Settings"]
  },
  "Email Communication Essentials": {
    title: "Email Communication Essentials",
    description: "Master the skills needed for effective email communication in personal and professional settings.",
    duration: "2 weeks",
    difficulty: "Beginner",
    topics: ["Email Composition", "Attachments", "Email Organization", "Email Security"]
  },
  "Office Productivity Fundamentals": {
    title: "Office Productivity Fundamentals",
    description: "Learn to use basic office software applications for creating documents, spreadsheets, and presentations.",
    duration: "6 weeks",
    difficulty: "Beginner",
    topics: ["Word Processing", "Spreadsheets", "Presentations", "File Management"]
  },
  "File Management Essentials": {
    title: "File Management Essentials",
    description: "Learn how to organize, transfer, and back up your digital files effectively.",
    duration: "3 weeks",
    difficulty: "Beginner",
    topics: ["File Organization", "Storage Devices", "Backup Methods", "Cloud Storage"]
  },
  "Software Installation and Management": {
    title: "Software Installation and Management",
    description: "Learn how to safely download, install, update, and remove software on your computer.",
    duration: "3 weeks",
    difficulty: "Beginner",
    topics: ["Software Sources", "Installation Procedures", "Updates", "Uninstallation"]
  },
  "Computer Configuration Basics": {
    title: "Computer Configuration Basics",
    description: "Learn how to customize and configure basic computer settings for optimal performance and usability.",
    duration: "3 weeks",
    difficulty: "Beginner",
    topics: ["System Settings", "Personalization", "Basic Hardware Settings", "User Accounts"]
  },
  "Troubleshooting Computer Problems": {
    title: "Troubleshooting Computer Problems",
    description: "Develop the skills to diagnose and solve common computer issues independently.",
    duration: "4 weeks",
    difficulty: "Beginner-Intermediate",
    topics: ["Problem Diagnosis", "System Restart Methods", "Error Messages", "Resource Management"]
  },
  "Introduction to Internet Technologies": {
    title: "Introduction to Internet Technologies",
    description: "Understand how the internet works and the technologies that make it possible.",
    duration: "5 weeks",
    difficulty: "Beginner",
    topics: ["Internet History", "Web Protocols", "Internet Infrastructure", "Web Services"]
  },
  "Networking Fundamentals: Connectivity Types": {
    title: "Networking Fundamentals: Connectivity Types",
    description: "Learn about different network connection types and when to use each one.",
    duration: "4 weeks",
    difficulty: "Beginner-Intermediate",
    topics: ["Ethernet", "Wi-Fi", "Bluetooth", "Cellular Networks"]
  },
  "Wi-Fi Network Configuration Basics": {
    title: "Wi-Fi Network Configuration Basics",
    description: "Learn how to set up and secure wireless networks for home or small office use.",
    duration: "3 weeks",
    difficulty: "Beginner-Intermediate",
    topics: ["Wi-Fi Standards", "Router Setup", "Security Settings", "Troubleshooting"]
  },
  "Network Troubleshooting Basics": {
    title: "Network Troubleshooting Basics",
    description: "Learn essential skills to diagnose and fix common network connectivity issues.",
    duration: "4 weeks",
    difficulty: "Intermediate",
    topics: ["Connectivity Testing", "Network Diagnostics", "Common Issues", "Troubleshooting Tools"]
  },
  "Network Hardware Management": {
    title: "Network Hardware Management",
    description: "Understand how to effectively manage and maintain network hardware devices.",
    duration: "5 weeks",
    difficulty: "Intermediate",
    topics: ["Routers", "Switches", "Access Points", "Network Printers"]
  },
  "IP Addressing and Subnetting": {
    title: "IP Addressing and Subnetting",
    description: "Master the concepts of IP addressing and how to implement subnetting in networks.",
    duration: "6 weeks",
    difficulty: "Intermediate",
    topics: ["IPv4 Addressing", "Subnet Masks", "CIDR Notation", "Subnet Calculations"]
  },
  "Network Configuration Essentials": {
    title: "Network Configuration Essentials",
    description: "Learn the fundamental configurations needed for setting up and managing networks.",
    duration: "5 weeks",
    difficulty: "Intermediate",
    topics: ["IP Configuration", "DNS Settings", "DHCP", "Network Adapters"]
  },
  "Network Hardware Fundamentals": {
    title: "Network Hardware Fundamentals",
    description: "Understand the core hardware components that make up modern computer networks.",
    duration: "4 weeks",
    difficulty: "Beginner-Intermediate",
    topics: ["Routers", "Switches", "Modems", "Network Interface Cards"]
  },
  "Network Diagnostics and Troubleshooting": {
    title: "Network Diagnostics and Troubleshooting",
    description: "Learn how to diagnose and resolve common network issues using industry-standard tools.",
    duration: "5 weeks",
    difficulty: "Intermediate",
    topics: ["Diagnostic Tools", "Command Line Utilities", "Network Monitoring", "Problem Resolution"]
  },
  "Advanced IP Addressing and Subnetting": {
    title: "Advanced IP Addressing and Subnetting",
    description: "Deepen your understanding of IP addressing schemes and subnetting for complex networks.",
    duration: "6 weeks",
    difficulty: "Intermediate-Advanced",
    topics: ["VLSM", "IPv6", "Route Summarization", "Addressing Design"]
  },
  "Introduction to Cybersecurity": {
    title: "Introduction to Cybersecurity",
    description: "Understand the core concepts of cybersecurity and why it's important in today's digital world.",
    duration: "6 weeks",
    difficulty: "Beginner",
    topics: ["Security Principles", "Common Threats", "Basic Protection Methods", "Security Mindset"]
  },
  "Password Security Best Practices": {
    title: "Password Security Best Practices",
    description: "Learn how to create strong passwords and manage them securely.",
    duration: "3 weeks",
    difficulty: "Beginner",
    topics: ["Password Creation", "Password Management Tools", "Multi-Factor Authentication", "Security Policies"]
  },
  "Account Security and Protection": {
    title: "Account Security and Protection",
    description: "Learn techniques to protect your online accounts from unauthorized access and attacks.",
    duration: "4 weeks",
    difficulty: "Beginner",
    topics: ["Access Control", "Account Recovery", "Security Questions", "Login Monitoring"]
  },
  "Network Security Fundamentals": {
    title: "Network Security Fundamentals",
    description: "Understand the basic principles and practices of securing network communications.",
    duration: "5 weeks",
    difficulty: "Intermediate",
    topics: ["Secure Networks", "Firewalls", "VPNs", "Wireless Security"]
  },
  "Common Cyber Threats and Attacks": {
    title: "Common Cyber Threats and Attacks",
    description: "Understand the most common threats in cybersecurity and how they work.",
    duration: "5 weeks",
    difficulty: "Beginner-Intermediate",
    topics: ["Phishing", "Malware", "Social Engineering", "Ransomware", "Data Breaches"]
  },
  "Data Encryption Fundamentals": {
    title: "Data Encryption Fundamentals",
    description: "Learn the basics of encryption and how it protects your data.",
    duration: "4 weeks",
    difficulty: "Intermediate",
    topics: ["Encryption Concepts", "Symmetric vs Asymmetric", "TLS/SSL", "Encryption Applications"]
  },
  "Authentication Methods and Security": {
    title: "Authentication Methods and Security",
    description: "Explore various authentication methods and how to implement them securely.",
    duration: "4 weeks",
    difficulty: "Intermediate",
    topics: ["Password Authentication", "Multi-factor Authentication", "Biometrics", "Single Sign-On"]
  },
  "Web Security Indicators": {
    title: "Web Security Indicators",
    description: "Learn how to identify secure websites and understand the indicators that browsers use to communicate security information.",
    duration: "3 weeks",
    difficulty: "Beginner",
    topics: ["HTTPS", "SSL Certificates", "Security Icons", "Browser Security Features"]
  },
  "DNS and Network Security": {
    title: "DNS and Network Security",
    description: "Understand DNS and its role in network security.",
    duration: "4 weeks",
    difficulty: "Intermediate",
    topics: ["DNS Fundamentals", "DNS Security Extensions", "DNS Attacks", "Secure DNS Configuration"]
  },
  "Endpoint Security Fundamentals": {
    title: "Endpoint Security Fundamentals",
    description: "Learn how to secure endpoints in your network from cyber threats.",
    duration: "5 weeks",
    difficulty: "Intermediate",
    topics: ["Endpoint Protection", "Antivirus Solutions", "Device Management", "Security Policies"]
  }
};