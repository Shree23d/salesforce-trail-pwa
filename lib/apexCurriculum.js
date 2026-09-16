/**
 * Comprehensive 27-Section Apex Curriculum
 * Modeled after complete professional Salesforce Developer courses.
 */

export const APEX_MODULES = [
  {
    id: 'module-foundations',
    name: 'Module 1: Apex Foundations',
    range: 'Sections 1 - 9',
    badge: 'Beginner',
    sections: [1, 2, 3, 4, 5, 6, 7, 8, 9]
  },
  {
    id: 'module-oops-data',
    name: 'Module 2: OOP & Data Layer',
    range: 'Sections 10 - 13',
    badge: 'Intermediate',
    sections: [10, 11, 12, 13]
  },
  {
    id: 'module-triggers-async',
    name: 'Module 3: Triggers & Asynchronous',
    range: 'Sections 14 - 17',
    badge: 'Advanced',
    sections: [14, 15, 16, 17]
  },
  {
    id: 'module-integrations',
    name: 'Module 4: Integrations & REST APIs',
    range: 'Sections 18 - 24',
    badge: 'Integration Specialist',
    sections: [18, 19, 20, 21, 22, 23, 24]
  },
  {
    id: 'module-architecture',
    name: 'Module 5: APIs, Metadata & Architecture',
    range: 'Sections 25 - 27',
    badge: 'Architect',
    sections: [25, 26, 27]
  }
];

export const APEX_SECTIONS = [
  {
    sectionNumber: 1,
    id: 'section-1',
    title: 'Before We Begin the Development',
    subtitle: 'Cloud fundamentals & developer setup',
    topics: [
      'What is Salesforce, SAAS, PAAS and IAAS',
      'What is a Multi-Tenant Environment?',
      'Various Clouds in Salesforce (Sales, Service, Marketing, Commerce)',
      'How does Apex come into the picture?',
      'Creating a Free Salesforce Developer Account',
      'What is Developer Console and how to use it'
    ],
    summary: 'Foundational concepts of cloud computing, multi-tenancy architecture, and setting up your developer environment.'
  },
  {
    sectionNumber: 2,
    id: 'section-2',
    title: 'Introduction to Apex',
    subtitle: 'Core principles & execution models',
    topics: [
      'What is Apex and why is it strongly typed?',
      'Object-Oriented programming in the cloud',
      'Executing Anonymous Apex',
      'System.debug and reading execution logs'
    ],
    summary: 'Understand the syntax basics of Apex, how code runs on multitenant servers, and how to execute test snippets.'
  },
  {
    sectionNumber: 3,
    id: 'section-3',
    title: 'Primitive Data Types',
    subtitle: 'Variables, numbers, strings & dates',
    topics: [
      'String and String manipulation methods',
      'Integer, Long, Double, and Decimal (financial precision)',
      'Boolean and null defaults in Apex',
      'Date, Time, and DateTime methods',
      '15-character vs 18-character ID formats',
      'Blob (binary files) and generic Object type'
    ],
    summary: 'Master all scalar data types in Apex, how they differ from Java, and how to manipulate text and dates.'
  },
  {
    sectionNumber: 4,
    id: 'section-4',
    title: 'SObjects In Apex',
    subtitle: 'Working with database records in memory',
    topics: [
      'Standard sObjects (Account, Contact, Opportunity, Case)',
      'Custom sObjects (__c naming convention)',
      'Generic sObject type and type casting',
      'Dot notation vs sObject.get() and sObject.put()'
    ],
    summary: 'How Salesforce database tables seamlessly map into Apex memory as sObject variables.'
  },
  {
    sectionNumber: 5,
    id: 'section-5',
    title: 'Operators in Apex',
    subtitle: 'Expressions, logic & modern safe operators',
    topics: [
      'Arithmetic, Assignment and Relational operators',
      'Logical operators (AND, OR, NOT)',
      'Ternary operator (? :)',
      'Safe Navigation Operator (?.) to prevent NullPointerExceptions',
      'Null Coalescing Operator (??) for default fallbacks'
    ],
    summary: 'Write defensive, readable logic with standard operators plus modern null-safe operators.'
  },
  {
    sectionNumber: 6,
    id: 'section-6',
    title: 'Collections in Apex',
    subtitle: 'Lists, Sets, and Maps',
    topics: [
      'List<T>: Ordered, zero-indexed collections allowing duplicates',
      'Set<T>: Unordered collections of unique elements (ideal for IDs)',
      'Map<K, V>: Key-value pairs for instantaneous O(1) lookups',
      'Collection methods (size, isEmpty, contains, put, get, clear)'
    ],
    summary: 'The building blocks of bulkification. Learn when to use Lists, Sets, and Maps for scalable code.'
  },
  {
    sectionNumber: 7,
    id: 'section-7',
    title: 'Control Flow Statements',
    subtitle: 'Branching, conditionals & loops',
    topics: [
      'if, else if, else conditions',
      'switch on statements for values, sObjects, and enums',
      'Traditional for loops, while loops, and do-while loops',
      'Enhanced for-each loops',
      'SOQL for loops (processing records in batches of 200)'
    ],
    summary: 'Direct your program flow safely and learn how SOQL for loops prevent heap size limit crashes.'
  },
  {
    sectionNumber: 8,
    id: 'section-8',
    title: 'Building Blocks of Apex: Classes, Methods, and Objects',
    subtitle: 'Encapsulation, scopes & instantiation',
    topics: [
      'Creating classes and access modifiers (public, private, global)',
      'Method definitions, parameters, and return types',
      'Static vs Instance methods and variables',
      'Instantiating objects using the new keyword',
      'Method overloading'
    ],
    summary: 'Structure your code into reusable, modular classes and discover how static state persists across a transaction.'
  },
  {
    sectionNumber: 9,
    id: 'section-9',
    title: 'Fundamental Apex Concepts',
    subtitle: 'Constructors, chaining & wrapper classes',
    topics: [
      'What are Constructors and how they initialize objects',
      'Default vs parameterized constructors',
      'Constructor Chaining with this()',
      'Constructor Overloading',
      'Wrapper Classes for bundling sObjects and UI states'
    ],
    summary: 'Create custom initializers and write wrapper classes used extensively in LWC and integrations.'
  },
  {
    sectionNumber: 10,
    id: 'section-10',
    title: 'Keywords in Apex',
    subtitle: 'Special keywords & modifiers',
    topics: [
      'this and super keywords',
      'final keyword (constants and immutable variables)',
      'transient keyword (excluding variables from Visualforce view state)',
      'with sharing, without sharing, and inherited sharing',
      'virtual, abstract, and override keywords'
    ],
    summary: 'Understand the exact semantic rules of Apex keywords that control sharing, inheritance, and memory.'
  },
  {
    sectionNumber: 11,
    id: 'section-11',
    title: 'Core OOPS Concepts',
    subtitle: 'Object-Oriented Programming in Salesforce',
    topics: [
      'Encapsulation and data hiding with getters/setters',
      'Inheritance using virtual and abstract parent classes',
      'Polymorphism: method overriding vs overloading',
      'Apex Interfaces and contracts'
    ],
    summary: 'Apply enterprise Object-Oriented principles to design maintainable, decoupled Salesforce applications.'
  },
  {
    sectionNumber: 12,
    id: 'section-12',
    title: 'SOQL and SOSL in Apex',
    subtitle: 'Querying and searching the database',
    topics: [
      'SOQL syntax: SELECT, FROM, WHERE, ORDER BY, LIMIT, OFFSET',
      'Child-to-Parent relationship queries (Contact.Account.Name)',
      'Parent-to-Child relationship queries (SELECT Id, (SELECT Id FROM Contacts) FROM Account)',
      'Aggregate queries (COUNT, SUM, MIN, MAX, AVG) and GROUP BY',
      'SOSL search syntax: FIND {term} IN ALL FIELDS RETURNING Account, Contact'
    ],
    summary: 'Fetch data with high-performance SOQL queries and search across multiple objects using SOSL.'
  },
  {
    sectionNumber: 13,
    id: 'section-13',
    title: 'Data Manipulation Language (DML)',
    subtitle: 'Database writes & partial commits',
    topics: [
      'DML statements: insert, update, upsert, delete, undelete',
      'Standalone DML statements vs Database class methods',
      'Database.insert(records, false) for partial processing',
      'Database.SaveResult and handling save errors',
      'Transaction savepoints and rollbacks'
    ],
    summary: 'Insert, modify, and delete database records safely while handling partial failure scenarios.'
  },
  {
    sectionNumber: 14,
    id: 'section-14',
    title: 'Triggers in Apex',
    subtitle: 'Event-driven database triggers',
    topics: [
      'Trigger syntax: trigger AccountTrigger on Account (events)',
      'Before triggers (before insert, before update, before delete)',
      'After triggers (after insert, after update, after delete, after undelete)',
      'Context variables: Trigger.new, Trigger.old, Trigger.newMap, Trigger.oldMap',
      'Trigger boolean flags: Trigger.isExecuting, Trigger.isInsert, etc.'
    ],
    summary: 'Learn when and how triggers fire on record events and how to leverage context variables.'
  },
  {
    sectionNumber: 15,
    id: 'section-15',
    title: 'Trigger Practice Module',
    subtitle: 'Trigger handlers & bulkification patterns',
    topics: [
      'One Trigger Per Object design pattern',
      'Trigger Handler framework architecture',
      'Bulkification: avoiding SOQL and DML inside loops',
      'Preventing infinite trigger recursion using static Set<Id>',
      'Handling cross-object rollups and complex validations'
    ],
    summary: 'Build production-ready, bulkified trigger architectures following Salesforce best practices.'
  },
  {
    sectionNumber: 16,
    id: 'section-16',
    title: 'Asynchronous Apex',
    subtitle: 'Background jobs, batches & queues',
    topics: [
      '@future methods (limitations, callouts, primitive parameters)',
      'Queueable Apex (complex types, job chaining, AsyncApexJob ID)',
      'Batch Apex (Database.Batchable: start, execute, finish)',
      'Database.Stateful for maintaining state across batch chunks',
      'Schedulable Apex and CronTrigger expressions'
    ],
    summary: 'Execute long-running processes in the background with dedicated asynchronous governor limits.'
  },
  {
    sectionNumber: 17,
    id: 'section-17',
    title: 'Test Classes in Apex',
    subtitle: 'Unit testing & code quality',
    topics: [
      '@isTest annotation and test class structure',
      'Test.startTest() and Test.stopTest() (resetting governor limits)',
      '@TestSetup method for reusable mock data',
      'System.assert, Assert.areEqual, and Assert.isTrue',
      'System.runAs() for user persona testing',
      'Testing triggers, batch jobs, and 75% code coverage rule'
    ],
    summary: 'Write robust unit test classes that validate business logic and pass production deployment gates.'
  },
  {
    sectionNumber: 18,
    id: 'section-18',
    title: 'Integration Fundamentals and Terminology',
    subtitle: 'Protocols, endpoints & web concepts',
    topics: [
      'Client-Server architecture and HTTP protocol',
      'HTTP Methods: GET, POST, PUT, PATCH, DELETE',
      'HTTP Status Codes (200 OK, 201 Created, 400 Bad Request, 401 Unauthorized, 500 Server Error)',
      'JSON and XML payload structures',
      'Synchronous vs Asynchronous integration styles'
    ],
    summary: 'Understand the global networking concepts and terminology required before connecting Salesforce with other apps.'
  },
  {
    sectionNumber: 19,
    id: 'section-19',
    title: 'Integration Patterns',
    subtitle: 'Salesforce enterprise integration patterns',
    topics: [
      'Request and Reply pattern (synchronous)',
      'Fire and Forget pattern (Platform Events / Change Data Capture)',
      'Batch Data Synchronization (Bulk API 2.0 / ETL)',
      'Remote Call-In vs Remote Process Invocation',
      'UI Update Based on Data Changes'
    ],
    summary: 'Choose the right enterprise architectural pattern for any real-world integration challenge.'
  },
  {
    sectionNumber: 20,
    id: 'section-20',
    title: 'Authentication and Authorization in Detail',
    subtitle: 'OAuth 2.0 & API security',
    topics: [
      'Authentication vs Authorization',
      'Connected Apps in Salesforce',
      'OAuth 2.0 Authorization Code Flow (Web Server Flow)',
      'OAuth 2.0 JWT Bearer Token Flow for server-to-server integrations',
      'Named Credentials and External Credentials'
    ],
    summary: 'Securely authenticate third-party clients and manage credentials without hardcoding secrets.'
  },
  {
    sectionNumber: 21,
    id: 'section-21',
    title: 'Understanding REST Integration: Foundation',
    subtitle: 'Salesforce Standard REST API',
    topics: [
      'Salesforce Standard REST API resources (/services/data/vXX.X/)',
      'Querying records via REST (/query?q=...)',
      'Creating, updating, and deleting records via REST',
      'Using Postman with Salesforce REST APIs'
    ],
    summary: 'Interact with Salesforce database tables using standard out-of-the-box REST endpoints and Postman.'
  },
  {
    sectionNumber: 22,
    id: 'section-22',
    title: 'Lets Build Custom REST APIs',
    subtitle: 'Apex web services with @RestResource',
    topics: [
      '@RestResource(urlMapping=\'/v1/Accounts/*\') annotation',
      '@HttpGet, @HttpPost, @HttpPut, @HttpPatch, @HttpDelete',
      'RestContext.request and RestContext.response',
      'URL parameters and JSON request body parsing',
      'Error handling and custom HTTP status codes in Apex'
    ],
    summary: 'Write custom Apex classes that turn your Salesforce org into a custom REST web service API.'
  },
  {
    sectionNumber: 23,
    id: 'section-23',
    title: 'REST API Callouts',
    subtitle: 'Sending HTTP requests from Apex to external APIs',
    topics: [
      'Remote Site Settings vs Named Credentials',
      'Http, HttpRequest, and HttpResponse classes',
      'Setting headers, timeouts, and JSON bodies',
      'JSON.serialize() and JSON.deserialize()',
      'Mocking HTTP callouts in unit tests with HttpCalloutMock'
    ],
    summary: 'Reach out from Apex to call external third-party REST APIs and parse the JSON responses.'
  },
  {
    sectionNumber: 24,
    id: 'section-24',
    title: 'REST API Project: Salesforce and Gmail Integration',
    subtitle: 'Real-world end-to-end integration project',
    topics: [
      'Setting up Google Cloud Console and Gmail API credentials',
      'Configuring OAuth 2.0 Auth Provider and Named Credentials in Salesforce',
      'Building the Apex callout service to send emails via Gmail REST API',
      'Parsing Gmail API responses and logging email delivery status'
    ],
    summary: 'Hands-on project integrating Salesforce directly with Google Gmail API using Named Credentials.'
  },
  {
    sectionNumber: 25,
    id: 'section-25',
    title: 'Metadata API',
    subtitle: 'Automating schema and configuration deployment',
    topics: [
      'Data vs Metadata in Salesforce',
      'Metadata API vs Tooling API capabilities',
      'Using Apex Metadata API (Metadata namespace) to modify Custom Metadata and Page Layouts',
      'Deploying configuration changes programmatically'
    ],
    summary: 'Read and update Salesforce configuration, custom metadata, and layout definitions from Apex.'
  },
  {
    sectionNumber: 26,
    id: 'section-26',
    title: 'Tooling API',
    subtitle: 'Developer tooling, code inspection & symbol tables',
    topics: [
      'What is Tooling API and how Developer Console uses it',
      'Querying ApexClass, ApexTrigger, and ValidationRule objects',
      'Executing Anonymous Apex via Tooling REST endpoints',
      'Inspecting SymbolTables and code coverage percentages'
    ],
    summary: 'Inspect internal developer metadata, test results, and source code statistics via Tooling API.'
  },
  {
    sectionNumber: 27,
    id: 'section-27',
    title: 'SOLID Principles in Apex',
    subtitle: 'Clean architecture & enterprise design patterns',
    topics: [
      'Single Responsibility Principle (SRP): smaller, focused classes',
      'Open/Closed Principle (OCP): open for extension, closed for modification',
      'Liskov Substitution Principle (LSP): interface-driven polymorphism',
      'Interface Segregation Principle (ISP): lean, specialized interfaces',
      'Dependency Inversion Principle (DIP): dependency injection in Apex'
    ],
    summary: 'Elevate your code to Technical Architect standards by applying SOLID design principles.'
  }
];

export const APEX_SUBTOPIC_FALLBACKS = {
  'section-1': [
    {
      id: 1,
      question: "In cloud computing architecture, how is Salesforce primarily classified?",
      options: ["Pure IaaS (Infrastructure as a Service)", "SaaS (Software as a Service) and PaaS (Platform as a Service via Lightning/Force.com)", "On-Premise Enterprise ERP", "Hardware appliance"],
      correct_index: 1,
      explanation_correct: "Salesforce provides both SaaS (ready-to-use CRM apps like Sales and Service Cloud) and PaaS (the Force.com / Lightning platform where developers build custom apps using Apex and LWC).\nThis dual model allows enterprises to customize the application without managing underlying servers.",
      explanation_wrong: "Salesforce is not an IaaS provider like AWS EC2 or Google Cloud Compute Engine.\nIt is a managed cloud application (SaaS) and developer platform (PaaS)."
    },
    {
      id: 2,
      question: "What does 'Multi-Tenant Architecture' mean in the context of Salesforce?",
      options: ["Each customer has their own dedicated physical server in a data center", "Multiple customers (tenants) share common physical hardware, application servers, and database instances while keeping data strictly isolated", "Developers must write separate code for each user", "Data is stored on the user's local computer"],
      correct_index: 1,
      explanation_correct: "In multi-tenancy, multiple organizations share the same underlying computing resources and database infrastructure.\nSalesforce enforces strict Governor Limits to prevent any single tenant's runaway code from monopolizing shared server resources.",
      explanation_wrong: "Dedicated hardware represents single-tenant architecture, not multi-tenant cloud.\nData and metadata are securely partitioned using organization IDs."
    }
  ],
  'section-3': [
    {
      id: 1,
      question: "In Apex, what is the initial default value of an uninitialized Boolean variable: `Boolean isQualified;`?",
      options: ["false", "true", "null", "0"],
      correct_index: 2,
      explanation_correct: "In Apex, all uninitialized variables default to null, including Boolean and numeric primitives.\nAlways initialize booleans (e.g. `Boolean isQualified = false;`) to avoid NullPointerExceptions in if conditions.",
      explanation_wrong: "Unlike Java or C# where booleans default to false, Apex primitives always default to null.\nThere is no implicit conversion from 0 or false."
    },
    {
      id: 2,
      question: "Which Apex method should you use to calculate a future date 30 days from today?",
      options: ["Date.today() + 30;", "Date.today().addDays(30);", "DateTime.now().plusDays(30);", "Date.future(30);"],
      correct_index: 1,
      explanation_correct: "`Date.today().addDays(30)` is the official, type-safe Apex method to add days to a Date object.\nApex provides helper methods like addMonths() and addYears() on the Date primitive.",
      explanation_wrong: "Direct arithmetic addition (`+ 30`) on Date primitives causes an invalid operator compilation error.\nplusDays() is a Java syntax that does not exist in Apex."
    }
  ]
};
