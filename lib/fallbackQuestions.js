/**
 * Fallback Salesforce MCQ Question Bank
 * Provides authentic certification-grade questions whenever the Gemini API key
 * is missing, rate-limited, or while developing offline.
 */

export const FALLBACK_QUESTIONS = {
  "Security & Access": {
    "Beginner": [
      {
        id: 1,
        question: "An administrator needs to restrict access to a custom object so that only the record owner and users above them in the role hierarchy can view records. What Organization-Wide Default (OWD) setting should be applied?",
        options: ["Public Read/Write", "Public Read Only", "Private", "Controlled by Parent"],
        correct_index: 2,
        explanation_correct: "Setting OWD to Private restricts baseline record visibility strictly to record owners and users above them in the role hierarchy.\nPublic OWD settings would grant read or edit permissions to all internal users regardless of ownership.",
        explanation_wrong: "Public Read/Write or Public Read Only grants organization-wide access to all users.\nControlled by Parent is only valid for child objects in Master-Detail relationships."
      },
      {
        id: 2,
        question: "Which feature should an administrator use to grant temporary 'Modify All' object permissions to a specific contractor without changing their profile?",
        options: ["Custom Profile", "Permission Set", "Sharing Rule", "Role Hierarchy"],
        correct_index: 1,
        explanation_correct: "Permission Sets extend user entitlements additively without altering the user's underlying Profile.\nThis aligns with the Salesforce security principle of 'Least Privilege' via granular assignments.",
        explanation_wrong: "Modifying Profiles impacts all assigned users instead of an isolated contractor.\nSharing Rules grant record-level access, not object-level permissions like Modify All."
      },
      {
        id: 3,
        question: "A user is unable to see the 'Annual Revenue' field on the Account record page even though it has a populated value. What is the most likely cause?",
        options: ["Account OWD is Private", "The user's Role lacks read access", "Field-Level Security (FLS) is hidden for the user's profile", "The user does not own the account"],
        correct_index: 2,
        explanation_correct: "Field-Level Security (FLS) directly controls visibility of individual fields and overrides page layouts.\nIf FLS is unchecked, the field remains invisible across all views, reports, and search.",
        explanation_wrong: "OWD and Roles govern record-level access rather than specific field visibility.\nRecord ownership determines edit/delete access, not individual field visibility."
      },
      {
        id: 4,
        question: "What happens to record access when 'Grant Access Using Hierarchies' is unchecked on a custom object with a Private OWD?",
        options: ["Only System Administrators can see the records", "Managers in the role hierarchy automatically lose inherited visibility to records owned by subordinates", "All users in the org gain read-only access", "The object converts to public read/write"],
        correct_index: 1,
        explanation_correct: "Disabling hierarchy access prevents the role hierarchy from rolling record visibility up to managers.\nOnly the record owner, manual shares, and criteria-based sharing rules can grant access.",
        explanation_wrong: "Hierarchy sharing does not change OWD to public or strip System Administrator system permissions.\nIt specifically severs upward visibility through managerial roles."
      },
      {
        id: 5,
        question: "Which sharing tool allows an admin to automatically share records owned by the 'US Sales' role with the 'Marketing' Public Group?",
        options: ["Owner-Based Sharing Rule", "Criteria-Based Sharing Rule", "Apex Managed Sharing", "Manual Sharing"],
        correct_index: 0,
        explanation_correct: "Owner-based sharing rules evaluate who owns the record (Role, Group, or Queue) to grant access to target groups.\nThis is the standard declarative method for inter-departmental visibility.",
        explanation_wrong: "Criteria-based rules evaluate field values (e.g., Country = 'USA') rather than record ownership.\nApex sharing is reserved for programmatic, complex non-declarative needs."
      },
      {
        id: 6,
        question: "Where does an administrator configure IP Login Ranges to restrict login attempts to corporate networks?",
        options: ["Company Information", "Profile Settings", "Session Settings", "Permission Set Groups"],
        correct_index: 1,
        explanation_correct: "Profile-level IP Ranges strictly block logins originating outside the specified IP ranges.\nUnlike Org-level Trusted IPs (which send an SMS/Email 2FA challenge), Profile IPs deny access outright.",
        explanation_wrong: "Company Information stores organizational licenses and storage limits.\nNetwork/Session settings configure org-wide trusted IP boundaries that require identity verification rather than outright blocking."
      },
      {
        id: 7,
        question: "Which statement is true regarding Permission Set Groups?",
        options: ["They replace the need for a user Profile completely", "They bundle multiple Permission Sets together for single-assignment simplicity and include a Muting feature", "They can only contain standard Salesforce permission sets", "They automatically change a user's Role Hierarchy"],
        correct_index: 1,
        explanation_correct: "Permission Set Groups bundle related permission sets and allow Muting Permission Sets to silence specific capabilities.\nThis dramatically simplifies persona-based access governance.",
        explanation_wrong: "Every active user in Salesforce still requires an underlying base Profile.\nThey support both custom and standard permission sets and do not modify the Role Hierarchy."
      }
    ],
    "Intermediate": [
      {
        id: 1,
        question: "Universal Containers has a Private OWD on Opportunities. A sales manager needs temporary read access granted to a specialist on 3 specific deals. What is the best declarative method?",
        options: ["Change Opportunity OWD to Public Read Only", "Opportunity Teams / Manual Sharing", "Criteria-Based Sharing Rule", "Create a new Profile for the specialist"],
        correct_index: 1,
        explanation_correct: "Opportunity Teams and Manual Sharing allow record owners to quickly share individual records with specific teammates.\nThis provides targeted record access without loosening org-wide security defaults.",
        explanation_wrong: "Changing OWD compromises security across the entire enterprise.\nCriteria-based rules cannot easily target an ad-hoc list of 3 specific deals."
      },
      {
        id: 2,
        question: "An admin creates a Criteria-Based Sharing Rule on Leads where Status = 'Qualified'. What limitation must the admin keep in mind?",
        options: ["Criteria-based sharing cannot share records with Public Groups", "Criteria-based sharing cannot use encrypted fields or certain long text area fields in criteria", "Records cannot be shared with Roles and Subordinates", "Only 1 criteria-based sharing rule can exist per object"],
        correct_index: 1,
        explanation_correct: "Salesforce prevents encrypted text, long text areas, and formula fields referencing other objects from being used in criteria.\nStandard deterministic fields must be used to ensure index evaluation performance.",
        explanation_wrong: "Criteria-based sharing fully supports Public Groups, Roles, and Subordinates.\nObjects support up to 50 criteria-based sharing rules per object."
      },
      {
        id: 3,
        question: "A company wants to prevent users from editing Closed-Won Opportunities unless they have a 'Bypass Validation' custom permission. How should this be implemented?",
        options: ["Assign a read-only profile upon stage change", "Use a Validation Rule referencing $Permission.Bypass_Validation", "Remove the Edit button from the Opportunity Page Layout", "Write an Apex Trigger without exception handling"],
        correct_index: 1,
        explanation_correct: "Referencing `$Permission.Bypass_Validation` in a Validation Rule provides declarative, bypassable enforcement.\nThis avoids hardcoding profile names and adheres to modern permission-based architecture.",
        explanation_wrong: "Removing the Edit button fails to protect API, Flow, or inline list view edits.\nChanging profiles upon stage updates is brittle and creates severe administrative overhead."
      },
      {
        id: 4,
        question: "What occurs if a user is assigned two Permission Sets where Permission Set A grants 'View All' on Cases and Permission Set B does not specify Case permissions?",
        options: ["Access is denied because permissions must be unanimous", "The user receives 'View All' access on Cases because permissions are additive", "The user cannot log in due to conflicting permission profiles", "Salesforce displays an error during assignment"],
        correct_index: 1,
        explanation_correct: "Permission sets are strictly additive in Salesforce (Union of permissions).\nGranting access in one permission set overrides absence of permissions in another.",
        explanation_wrong: "Salesforce permission sets do not use restrictive/negative logic unless inside a Muting Permission Set.\nUnanimous permission rules do not exist in the standard permission model."
      },
      {
        id: 5,
        question: "Which feature should be used to restrict record access based on territory alignment and revenue thresholds across multi-tiered regional sales teams?",
        options: ["Enterprise Territory Management (ETM)", "Account Teams only", "Manual Sharing", "Apex Sharing with Scheduled Jobs"],
        correct_index: 0,
        explanation_correct: "Enterprise Territory Management provides structured multidimensional territory models and automated rule-based account sharing.\nIt operates in parallel with the role hierarchy specifically for sales routing.",
        explanation_wrong: "Account Teams lack automated hierarchical territory modeling across regional sales matrices.\nManual sharing is unmaintainable at enterprise scale."
      },
      {
        id: 6,
        question: "When configuring a Muting Permission Set in a Permission Set Group, what happens to permissions granted to the user by their Profile?",
        options: ["The Muting Permission Set overrides and revokes Profile permissions", "The Profile permissions remain active; Muting only silences permissions within that specific Permission Set Group", "The user loses all permissions across the entire org", "The Muting permission causes a compile error"],
        correct_index: 1,
        explanation_correct: "Muting Permission Sets exclusively mute permissions within their parent Permission Set Group.\nThey cannot override or diminish permissions granted by base Profiles or other standalone Permission Sets.",
        explanation_wrong: "A Muting Permission Set has scoped authority limited to its containing group.\nIt never suppresses broader permissions inherited from the user's base Profile."
      },
      {
        id: 7,
        question: "If an OWD is set to Public Read Only, what is the minimum level of access an Administrator can grant via a Sharing Rule?",
        options: ["Private", "Read Only", "Read/Write", "Full Access (Owner)"],
        correct_index: 2,
        explanation_correct: "Sharing Rules can only open up access beyond the baseline OWD, never restrict it.\nSince OWD is already Read Only, the lowest upgrade possible via a Sharing Rule is Read/Write.",
        explanation_wrong: "Sharing rules cannot make access more restrictive than the OWD (cannot set to Private).\nFull Access (transfer/delete) is reserved for record owners and administrators."
      }
    ],
    "Tricky Scenario": [
      {
        id: 1,
        question: "A developer writes an Apex class declared as 'public without sharing class CaseHandler'. A standard user runs this code via a Screen Flow. The code queries Cases where OWD is Private. What records will be returned?",
        options: ["Only Cases owned by the standard user", "Zero cases because standard users cannot execute Apex", "All Cases matching the query criteria regardless of ownership or sharing rules", "Only Cases explicitly shared via manual sharing"],
        correct_index: 2,
        explanation_correct: "The `without sharing` keyword explicitly instructs the Apex runtime to ignore record-level sharing rules and OWD.\nThe query executes in system mode, returning all matching records regardless of the running user's access.",
        explanation_wrong: "`without sharing` does NOT enforce user record visibility; that is the role of `with sharing`.\nObject and FLS permissions are also bypassed unless `WITH USER_MODE` or `Security.stripInaccessible` is invoked."
      },
      {
        id: 2,
        question: "An org has Account OWD set to Private. User A owns Account X. User B has 'Read' on Accounts via Profile and is granted 'Read/Write' on Account X via a Criteria Sharing Rule. Can User B delete Account X?",
        options: ["Yes, because User B has Read/Write access", "No, because deleting a record requires Full Access (Record Owner, Hierarchy above owner, or 'Modify All')", "Yes, if User B is above User A in the role hierarchy", "Yes, because Sharing Rules grant delete permissions"],
        correct_index: 1,
        explanation_correct: "Deleting records in Salesforce requires 'Full Access', which is restricted to the Record Owner, their superiors in the Role Hierarchy, or users with Modify All.\nSharing rules can only grant Read Only or Read/Write access, never Delete.",
        explanation_wrong: "Read/Write sharing never includes Delete capabilities.\nSharing rules do not grant Full Access under any declarative scenario."
      },
      {
        id: 3,
        question: "A company enables 'Manual Sharing' on a custom object with Private OWD. A record owner manually shares Record 101 with User C. The record owner is then changed to User D. What happens to User C's access?",
        options: ["User C retains access indefinitely", "User C loses access because manual shares are purged upon record ownership transfer", "User C becomes the new record owner", "Salesforce blocks ownership transfer until manual shares are revoked"],
        correct_index: 1,
        explanation_correct: "When record ownership changes, Salesforce automatically purges all manual shares created on the record.\nTo persist access across ownership changes, automated sharing rules or Apex Managed Sharing with custom RowCause must be used.",
        explanation_wrong: "Manual shares do not survive ownership reassignment.\nSalesforce does not block reassignment; it simply drops transient manual shares."
      },
      {
        id: 4,
        question: "In an org with OWD Private on Contacts and 'Controlled by Parent', what occurs if an Account has no assigned parent and the Contact is created without an Account?",
        options: ["Contacts cannot exist without an Account in Salesforce", "The Contact becomes Private and visible only to the Contact owner and System Admin", "The Contact inherits Public Read/Write default access", "An unhandled exception crashes the page"],
        correct_index: 1,
        explanation_correct: "When a Contact is created without an Account in a standard Salesforce org, it becomes a Private Contact.\nOnly the Contact owner and users with 'View All / Modify All' on Contacts can view it, bypassing Account sharing completely.",
        explanation_wrong: "Salesforce allows orphaned business contacts unless blocked by custom validation or required lookups.\nIt does not open up to Public Read/Write; it defaults to strict private isolation."
      },
      {
        id: 5,
        question: "A junior admin attempts to create a Criteria-Based Sharing Rule to share Opportunities based on a custom Formula field that evaluates Account.AnnualRevenue > 1,000,000. Why is the field not selectable?",
        options: ["Formula fields can never be created on Opportunity", "Formula fields that reference fields on another object (cross-object formulas) cannot be used in sharing criteria", "Annual Revenue is an encrypted currency field", "The admin lacks Customize Application permission"],
        correct_index: 1,
        explanation_correct: "Salesforce explicitly blocks cross-object formula fields from Criteria-Based Sharing Rules because dynamic calculation would require recalculating sharing on every parent update.\nTo achieve this, populate a direct field via Record-Triggered Flow or Apex.",
        explanation_wrong: "Standard formula fields are supported if they do not traverse cross-object relationships.\nFormula fields are freely creatable on Opportunity by administrators."
      },
      {
        id: 6,
        question: "A user is assigned a Profile with 'Read' on Accounts and a Permission Set with 'Edit' on Accounts. In the Opportunity page layout, Account Name is marked as 'Read Only'. Can the user edit the Account Name via the standard REST API?",
        options: ["No, because Page Layouts apply globally to API integrations", "Yes, because Page Layouts only affect the browser UI, and the user holds object-level Edit permissions", "No, because the profile has Read Only access", "Only if the user owns the Opportunity"],
        correct_index: 1,
        explanation_correct: "Page layout field properties ('Read Only' / 'Required') are strictly presentation-layer rules in the browser UI.\nThey do not restrict API calls, Apex updates, or Data Loader imports; only Field-Level Security (FLS) enforces API restrictions.",
        explanation_wrong: "Page Layout restrictions do not apply to API endpoints or server operations.\nThe additive permission set successfully unlocks object and FLS edit access."
      },
      {
        id: 7,
        question: "How does Apex Managed Sharing ensure that sharing records are NOT deleted when a record's owner changes?",
        options: ["By setting the RowCause to 'Owner'", "By setting a custom RowCause defined on the Custom Object Sharing Reason", "By running code in 'without sharing' mode", "By deactivating the Role Hierarchy"],
        correct_index: 1,
        explanation_correct: "Apex Managed Sharing records using a custom `RowCause` are protected and preserved during ownership reassignment.\nStandard manual shares with `RowCause = Manual` are automatically purged by the database engine.",
        explanation_wrong: "Standard `RowCause = Manual` or `Owner` shares are destroyed during ownership reassignment.\n`without sharing` affects query execution context, not database share persistence."
      }
    ]
  },
  "Data Modeling": {
    "Beginner": [
      {
        id: 1,
        question: "What type of relationship must be created between two custom objects to enable Roll-Up Summary fields on the parent object?",
        options: ["Lookup Relationship", "Master-Detail Relationship", "External Lookup Relationship", "Hierarchical Relationship"],
        correct_index: 1,
        explanation_correct: "Roll-Up Summary fields calculate COUNT, SUM, MIN, and MAX exclusively across Master-Detail relationships.\nThe parent (master) tightly controls child records and aggregates their data automatically.",
        explanation_wrong: "Standard Lookup relationships do not support native declarative Roll-Up Summary fields.\nExternal Lookups link to external data sources and do not support rollups."
      },
      {
        id: 2,
        question: "What happens to the child records when a parent record in a Master-Detail relationship is deleted?",
        options: ["Child records are orphaned with blank parent lookups", "Child records are automatically deleted (cascade delete)", "Salesforce prevents deletion with an error", "Child records transfer to the System Administrator"],
        correct_index: 1,
        explanation_correct: "In a Master-Detail relationship, child records cannot exist without a parent.\nDeleting the master cascades down and deletes all associated child records automatically into the Recycle Bin.",
        explanation_wrong: "Orphaning child records is characteristic of Lookup relationships with 'Clear the value of this field'.\nCascade deletion is the fundamental architectural behavior of Master-Detail."
      },
      {
        id: 3,
        question: "Which field type should an administrator use to link an Account to another Account to represent a parent-subsidiary corporate hierarchy?",
        options: ["Master-Detail Relationship", "Lookup Relationship (Self-Lookup)", "Hierarchical Relationship", "External Lookup Relationship"],
        correct_index: 1,
        explanation_correct: "A standard Lookup field pointing back to the same object (Self-Lookup) creates hierarchical parent-child structures like Account hierarchies.\nThis allows flexible navigation without enforcing cascade deletion.",
        explanation_wrong: "Hierarchical relationships are a specialized relationship type available only on the User object.\nMaster-detail self-relationships are not permitted on the Account object."
      },
      {
        id: 4,
        question: "How can an administrator implement a Many-to-Many relationship between 'Job Candidates' and 'Job Postings'?",
        options: ["Create a Master-Detail relationship on Candidates pointing to Postings", "Create a Junction Object with two Master-Detail relationships pointing to both objects", "Create a Multi-Select Picklist field", "Use Salesforce Connect"],
        correct_index: 1,
        explanation_correct: "A Junction Object containing two Master-Detail relationships models Many-to-Many relationships.\nEach record in the junction object represents a unique association (e.g., 'Job Application').",
        explanation_wrong: "A single Master-Detail only creates a One-to-Many hierarchy.\nMulti-select picklists cannot store related data, activities, or relational attributes."
      },
      {
        id: 5,
        question: "What is the maximum number of Master-Detail relationships a custom object can have?",
        options: ["1", "2", "5", "Unlimited"],
        correct_index: 1,
        explanation_correct: "A custom object can have a maximum of 2 Master-Detail relationships.\nThis is a strict Salesforce platform limit, commonly utilized when forming a Many-to-Many junction object.",
        explanation_wrong: "Custom objects support up to 40 total relationships, but only up to 2 can be Master-Detail.\nAll remaining relationships must be standard Lookups."
      },
      {
        id: 6,
        question: "An administrator wants to convert an existing Lookup relationship into a Master-Detail relationship. What must be true first?",
        options: ["The child object must have zero records", "All existing child records must have a populated value in the Lookup field", "The parent object must have a Roll-Up Summary field already defined", "The parent object must be standard"],
        correct_index: 1,
        explanation_correct: "Because Master-Detail relationships require every detail record to have a master, converting from a Lookup requires 100% of existing records to have that field populated.\nIf any record has a NULL value, the conversion will fail.",
        explanation_wrong: "The child object does NOT need to be empty; existing records just cannot have blank parent fields.\nRoll-up summaries can only be created after the Master-Detail relationship is established."
      },
      {
        id: 7,
        question: "Which feature provides a visual, drag-and-drop schema canvas to view and create custom objects, fields, and relationships?",
        options: ["Object Manager", "Schema Builder", "Process Builder", "Lightning App Builder"],
        correct_index: 1,
        explanation_correct: "Schema Builder provides an interactive graphical visualization of an org's data model.\nIt allows administrators to create objects, fields, and relationships on an interactive canvas.",
        explanation_wrong: "Object Manager is a list-based configuration console rather than a visual ERD canvas.\nLightning App Builder designs user interface pages and components."
      }
    ],
    "Intermediate": [
      {
        id: 1,
        question: "Universal Containers needs to calculate the total invoice amount on an Account from a custom Invoice object linked via a standard Lookup relationship. How should this be accomplished declaratively?",
        options: ["Create a standard Roll-Up Summary field on Account", "Use a Record-Triggered Flow to calculate the sum and update a currency field on Account", "Use an Auto-Number field with a formula", "Export and re-import data daily with Data Loader"],
        correct_index: 1,
        explanation_correct: "Since standard Roll-Up Summary fields are unsupported on Lookup relationships, a Record-Triggered Flow on create/update/delete of Invoices is the recommended modern declarative solution.\nIt maintains real-time rollups without requiring Apex code or converting relationships.",
        explanation_wrong: "Native Roll-Up Summary fields cannot be created across standard Lookup relationships.\nDaily manual exports do not provide real-time calculation."
      },
      {
        id: 2,
        question: "In a Master-Detail relationship where Object B is the detail of Object A, who determines the ownership and sharing of Object B records?",
        options: ["The creator of Object B", "The Master record on Object A (the Detail record has no Owner field)", "System Administrators exclusively", "The Role Hierarchy of Object B"],
        correct_index: 1,
        explanation_correct: "Detail records in a Master-Detail relationship inherit security, sharing, and ownership directly from their master record.\nDetail records do not even have an 'Owner' field on their schema.",
        explanation_wrong: "Detail records cannot possess independent ownership or dedicated sharing rules.\nTheir access is completely controlled by the parent record."
      },
      {
        id: 3,
        question: "A company has reached the limit of 40 Roll-Up Summary fields on the Opportunity object. What is the best architect-approved alternative?",
        options: ["Convert Opportunities to custom objects", "Use DLRS (Declarative Lookup Rollup Summaries) or Record-Triggered Flows", "Create 10 more with a customer support case", "Use Workflow Rules"],
        correct_index: 1,
        explanation_correct: "Using Record-Triggered Flows or open-source tools like DLRS allows developers and architects to bypass the native 40 roll-up summary limit.\nFlows execute efficiently on DML operations without altering underlying object architectures.",
        explanation_wrong: "Salesforce hard limits cannot be bypassed by converting standard Opportunity objects.\nWorkflow Rules are legacy and do not support cross-record calculations."
      },
      {
        id: 4,
        question: "What is an External Object in Salesforce Data Modeling?",
        options: ["A custom object exported to Amazon S3", "An object created via Salesforce Connect that maps to data residing outside Salesforce without storing it in database storage", "A sandbox copy of production data", "A standard object visible only to Community users"],
        correct_index: 1,
        explanation_correct: "External Objects (names ending in `__x`) map directly to external data sources (OData, REST) in real-time via Salesforce Connect.\nThey allow querying external tables without consuming Salesforce data storage limits.",
        explanation_wrong: "External Objects are not S3 backups or sandbox copies.\nThey are live database abstractions for external OData/web endpoints."
      },
      {
        id: 5,
        question: "What is the primary difference between a Lookup Relationship and an External Lookup Relationship?",
        options: ["External Lookups can only be created by Developers via VS Code", "External Lookups link a standard or custom object to an External Object (`__x`)", "Lookup relationships cannot be indexed", "External Lookups support cascade delete"],
        correct_index: 1,
        explanation_correct: "An External Lookup relationship links a standard/custom Salesforce object to an External Object (`__x`) using the external record's 18-character ID.\nIt bridges cloud storage data with internal Salesforce records.",
        explanation_wrong: "External Lookups can be configured declaratively in the UI.\nThey do not support cascade delete across external third-party systems."
      },
      {
        id: 6,
        question: "When creating a custom field, which data type allows administrators to track changes in state over time and store historical values?",
        options: ["Text Area (Long)", "Set Field History Tracking on the object", "Formula Field", "Roll-Up Summary"],
        correct_index: 1,
        explanation_correct: "Enabling Field History Tracking allows Salesforce to record the prior value, new value, user, and timestamp for up to 20 fields per object (or 60 with Shield).\nThis data is stored in the object's `History` table.",
        explanation_wrong: "Formula fields calculate dynamically and do not store past values.\nText Area fields cannot track temporal deltas automatically."
      },
      {
        id: 7,
        question: "Under what condition can a child record in a Master-Detail relationship be reparented to a different Master record?",
        options: ["Reparenting is impossible under all circumstances in Master-Detail", "If the 'Allow reparenting' checkbox is enabled in the Master-Detail relationship definition", "Only by using the Data Loader with System Admin credentials", "Only via an asynchronous Apex Batch job"],
        correct_index: 1,
        explanation_correct: "By default, child records are permanently bound to their initial master, but checking 'Allow reparenting' on the field settings allows users to reassign the child to a different parent.\nThis provides flexibility when organizations restructure accounts or projects.",
        explanation_wrong: "Reparenting is fully supported when the declarative flag is toggled.\nData Loader and Apex are still bound by this schema rule and fail if reparenting is disabled."
      }
    ],
    "Tricky Scenario": [
      {
        id: 1,
        question: "In a Many-to-Many junction object linking Candidate and Position, what determines the color, icon, and primary detail page association of the junction record?",
        options: ["Whichever relationship was created first (the Primary Master)", "The object with the most records", "The Candidate object always takes precedence", "The user's default app settings"],
        correct_index: 0,
        explanation_correct: "The first Master-Detail relationship created on a junction object is designated as the Primary Master.\nThe junction record inherits its UI theme, tab style, color, and standard report type primary object from this first relationship.",
        explanation_wrong: "Record count or alphabetical order has no bearing on primary relationship designation.\nIt is strictly determined by the chronological creation order of the relationship fields."
      },
      {
        id: 2,
        question: "An org has 2 million Account records. A developer plans to create a Lookup field from a custom Transaction object to Account. Why might this cause 'Data Skew' issues if 500,000 Transactions link to one single Account?",
        options: ["Lookup fields cannot store more than 10,000 records", "Lookup Data Skew causes severe record locking issues on the parent Account during concurrent Transaction inserts and updates", "Salesforce automatically converts the relationship to Master-Detail", "The transactions will automatically delete after 30 days"],
        correct_index: 1,
        explanation_correct: "Lookup Data Skew occurs when more than 10,000 child records point to a single parent record.\nDuring concurrent DML operations, Salesforce locks the parent record to maintain relational integrity, resulting in severe lock contention (UNABLE_TO_LOCK_ROW).",
        explanation_wrong: "Lookup fields have no fixed record count ceiling.\nSalesforce never automatically converts relationships or purges records due to volume."
      },
      {
        id: 3,
        question: "A developer attempts to delete a custom object that has an existing Master-Detail relationship as the master. The detail object has zero records. Why does the delete operation fail?",
        options: ["Custom objects can never be deleted once deployed", "Custom objects cannot be deleted if they are on the Master side of a Master-Detail relationship or referenced by a Roll-up Summary", "A Salesforce Support ticket is mandatory to delete custom objects", "The developer must first delete the Recycle Bin"],
        correct_index: 1,
        explanation_correct: "Salesforce blocks deletion of any custom object that acts as the Master in a Master-Detail relationship, even if no child records exist.\nYou must first delete or reparent the Master-Detail relationship field on the child object.",
        explanation_wrong: "Custom objects can be deleted once relational dependencies are removed.\nSalesforce Support is not required for custom object deletion."
      },
      {
        id: 4,
        question: "What happens when an admin attempts to change a Master-Detail relationship to a Lookup relationship on an object that currently has Roll-Up Summary fields defined on the Master?",
        options: ["The Roll-Up Summary fields convert to Formula fields", "Salesforce prevents the conversion until all Roll-Up Summary fields on the master object are deleted", "The child records are automatically purged", "The master object is locked for 24 hours"],
        correct_index: 1,
        explanation_correct: "Because Roll-Up Summary fields require a Master-Detail relationship to calculate, you cannot convert the relationship to a Lookup until all dependent Roll-Up Summary fields are deleted.\nSalesforce displays a strict schema dependency error.",
        explanation_wrong: "Roll-Up Summary fields cannot convert automatically to formulas.\nRecords are not deleted; schema conversion is blocked until dependencies are cleared."
      },
      {
        id: 5,
        question: "A company requires soft deletion and self-referential relationships on an Asset object. An admin considers Master-Detail. Why is a self-referential Master-Detail relationship prohibited?",
        options: ["Master-Detail relationships cannot be created on custom objects", "A Master-Detail relationship cannot be created between an object and itself (no self Master-Detail)", "Asset does not support relationships", "Self-lookups require Salesforce CPQ"],
        correct_index: 1,
        explanation_correct: "Salesforce strictly prohibits an object from having a Master-Detail relationship with itself because cascade delete and rollup logic would trigger infinite circular dependencies.\nOnly standard Lookup relationships can be self-referential.",
        explanation_wrong: "Master-Detail is supported on custom objects, but self-referencing is architecturally blocked.\nCPQ is not required for standard relational architecture."
      },
      {
        id: 6,
        question: "Which type of Big Object index allows asynchronous querying of billions of records using SOQL in Salesforce?",
        options: ["Standard B-Tree Index", "Custom Index comprising up to 5 fields defining the composite primary key", "Full-Text Search Index", "External ID Index"],
        correct_index: 1,
        explanation_correct: "Big Objects use a custom index composed of 1 to 5 fields that acts as the composite primary key and determines the physical sort order in the underlying HBase store.\nSOQL queries against Big Objects must strictly filter using the index fields from left to right.",
        explanation_wrong: "Big Objects do not use traditional relational B-Tree indexes.\nQueries cannot scan non-indexed fields synchronously without Async SOQL."
      },
      {
        id: 7,
        question: "What is the impact of deleting a parent record in a Lookup relationship when the relationship is configured with 'Don't allow deletion of the lookup record that's part of a lookup relationship'?",
        options: ["The parent record is deleted and child records are deleted", "The deletion of the parent record is blocked with an error if any child records reference it", "The child record field is set to NULL", "The parent is archived in Big Objects"],
        correct_index: 1,
        explanation_correct: "This configuration acts as a declarative foreign key constraint (`RESTRICT`).\nSalesforce blocks deletion of the parent record until all dependent child lookups are either reassigned or deleted.",
        explanation_wrong: "Cascade delete only occurs in Master-Detail or specific standard relationships.\nSetting the field to NULL only occurs with the 'Clear the value of this field' setting."
      }
    ]
  },
  "Process Automation": {
    "Beginner": [
      {
        id: 1,
        question: "Which automation tool is recommended by Salesforce for all new record-triggered declarative business logic?",
        options: ["Workflow Rules", "Process Builder", "Record-Triggered Flow", "Apex Triggers exclusively"],
        correct_index: 2,
        explanation_correct: "Salesforce has officially retired Workflow Rules and Process Builder in favor of Flow.\nRecord-Triggered Flows provide unified, high-performance declarative automation with before-save and after-save capabilities.",
        explanation_wrong: "Workflow Rules and Process Builder are legacy tools and no longer support new creation.\nApex is reserved for scenarios exceeding Flow capabilities."
      },
      {
        id: 2,
        question: "When should an administrator choose a 'Fast Field Updates' (Before-Save) Record-Triggered Flow over an 'Actions and Related Records' (After-Save) Flow?",
        options: ["When sending an email alert to a customer", "When updating fields on the same record that triggered the Flow", "When creating a related Task or Contact", "When making an outbound HTTP callout"],
        correct_index: 1,
        explanation_correct: "Fast Field Updates run in the 'Before-Save' phase (prior to database commit) and update the triggering record up to 10x faster without firing additional DML events.\nThey replace legacy before-save Apex triggers for same-record field calculations.",
        explanation_wrong: "Creating related records or sending emails requires the record ID, which is only committed in After-Save.\nCallouts and related DML cannot occur in before-save execution."
      },
      {
        id: 3,
        question: "Which Flow element is used to present an interactive wizard with input forms for internal users to complete on a Lightning page?",
        options: ["Screen Flow", "Auto-launched Flow", "Platform Event-Triggered Flow", "Schedule-Triggered Flow"],
        correct_index: 0,
        explanation_correct: "Screen Flows provide a visual interface for guided user interactions, forms, and step-by-step wizards.\nThey can be placed on Lightning record pages, utility bars, and Experience Cloud sites.",
        explanation_wrong: "Auto-launched, Platform Event, and Schedule Flows execute in the background without UI screens.\nOnly Screen Flows render user input elements."
      },
      {
        id: 4,
        question: "How can an administrator schedule a Flow to run every Monday at 6:00 AM to review pending invoices?",
        options: ["Create a Screen Flow with a Wait element", "Create a Schedule-Triggered Flow configured with weekly recurrence", "Use an Approval Process with a time trigger", "Run Data Loader from Windows Task Scheduler"],
        correct_index: 1,
        explanation_correct: "Schedule-Triggered Flows run automatically at specified times and recurring frequencies (Once, Daily, Weekly) across a batch of matching records.\nThey eliminate the need for scheduled Apex batches in standard declarative scenarios.",
        explanation_wrong: "Screen Flows cannot run on a headless schedule.\nApproval Processes require record submission rather than cron-style time initiation."
      },
      {
        id: 5,
        question: "What happens when a record enters an Approval Process in Salesforce?",
        options: ["The record is permanently converted to read-only for all users including System Admins", "The record is locked from editing to prevent changes while pending approval (unless configured for admin edits)", "The record is duplicated into a queue", "All associated Tasks are deleted"],
        correct_index: 1,
        explanation_correct: "Salesforce locks the record to maintain data integrity during the approval lifecycle.\nAdministrators can configure whether only System Admins or both Admins and the assigned approver can edit locked records.",
        explanation_wrong: "System Administrators can always be granted rights to edit locked records.\nRecords are never duplicated or destroyed during approval routing."
      },
      {
        id: 6,
        question: "Which element in Flow Builder allows branching logic based on defined conditions?",
        options: ["Assignment Element", "Decision Element", "Loop Element", "Get Records Element"],
        correct_index: 1,
        explanation_correct: "The Decision element evaluates criteria across outcomes to route flow execution down different logical paths.\nIt behaves identically to an IF / ELSE IF / ELSE construct in programming.",
        explanation_wrong: "Assignment elements set variable values.\nGet Records queries the database and Loop elements iterate over collections."
      },
      {
        id: 7,
        question: "In Flow Builder, what variable represents the record that triggered the Record-Triggered Flow?",
        options: ["$Record", "$CurrentRecord", "$Trigger.new", "$Record_Prior"],
        correct_index: 0,
        explanation_correct: "`$Record` is the global variable storing the values of the record that launched the Flow.\n`$Record__Prior` stores the values prior to the edit.",
        explanation_wrong: "`$Trigger.new` is the syntax in Apex triggers, not Flow Builder.\n`$CurrentRecord` is not a valid standard Flow global variable."
      }
    ],
    "Intermediate": [
      {
        id: 1,
        question: "A Flow needs to process 200 Contact records and update their Mailing City. What is the Salesforce best practice for performing this update inside the Flow?",
        options: ["Place an 'Update Records' element inside the Loop element to update each Contact one at a time", "Use an Assignment element inside the Loop to add updated Contacts to a Collection Variable, then use a single 'Update Records' element outside the Loop", "Call an email alert inside the loop", "Create 200 separate Flows"],
        correct_index: 1,
        explanation_correct: "Bulkification in Flow requires batching: modify records inside the loop and assign them to a record collection, then perform ONE DML operation outside the loop.\nPlacing DML or Get Records elements inside loops violates governor limits (150 DML statements per transaction).",
        explanation_wrong: "Placing DML elements inside loops exhausts SOQL and DML governor limits.\nFlows must be bulkified exactly like Apex."
      },
      {
        id: 2,
        question: "What is the purpose of `$Record__Prior` in a Record-Triggered Flow?",
        options: ["It queries the Recycle Bin for deleted records", "It accesses the field values of the triggering record immediately before the transaction occurred", "It stores the previous version of the Flow layout", "It references the previous record in a loop"],
        correct_index: 1,
        explanation_correct: "`$Record__Prior` allows developers to compare prior values with new values (e.g., verifying if Stage changed from 'Prospecting' to 'Closed Won').\nThis enables granular entry criteria and change-detection logic.",
        explanation_wrong: "It does not query the Recycle Bin or reference loop indices.\nIt is the Flow equivalent to `Trigger.old` in Apex."
      },
      {
        id: 3,
        question: "An administrator needs to execute an external REST API callout to a credit rating bureau from a Flow when an Opportunity closes. Which approach is valid?",
        options: ["Call the API directly from a Before-Save Flow", "Use an After-Save Flow with an Asynchronous Path or call an Invocable Apex Action with callout capabilities", "Use a Workflow Outbound Message on create only", "Embed an iframe in a Screen Flow"],
        correct_index: 1,
        explanation_correct: "Callouts cannot occur synchronously within the main DML transaction if uncommitted database work exists.\nUsing Flow Asynchronous Paths or Invocable Apex with `(callout=true)` decouples the HTTP call into a separate asynchronous transaction.",
        explanation_wrong: "Before-Save flows cannot perform callouts or external actions.\nOutbound messages do not support REST JSON payload manipulation."
      },
      {
        id: 4,
        question: "What feature in Flow Builder allows administrators to define the exact execution sequence when multiple Record-Triggered Flows exist on the same object for the same trigger event?",
        options: ["Flow Trigger Explorer / Flow Order (1 to 2,000)", "Process Order property on the Custom Object", "Apex Trigger Execution Matrix", "Naming the Flows alphabetically"],
        correct_index: 0,
        explanation_correct: "Flow Trigger Explorer and the 'Trigger Order' property (integer 1 to 2,000) allow administrators to explicitly control which Record-Triggered Flows run first, second, and third.\nThis resolves race conditions across multiple declarative automations.",
        explanation_wrong: "Alphabetical naming does not guarantee deterministic order of execution.\nCustom objects do not possess a Process Order setting."
      },
      {
        id: 5,
        question: "When should an administrator check 'Run in System Context with Sharing - Enforces Record-Level Access' on a Screen Flow?",
        options: ["When users need to bypass all validation rules", "When users need to see fields or perform actions based on their assigned role sharing, but need object/FLS permissions elevated", "To convert the Flow into a batch job", "To enable multi-currency support"],
        correct_index: 1,
        explanation_correct: "Running in 'System Context with Sharing' respects record-level sharing (users only see records they are allowed to see) while granting system-level access to object and field permissions that the user's profile may lack.\nThis allows standard users to complete structured administrative forms safely.",
        explanation_wrong: "Validation rules still execute regardless of execution context.\nIt does not convert flows to batch jobs."
      },
      {
        id: 6,
        question: "An administrator needs to debug a Record-Triggered Flow as a specific user with the 'Sales Rep' profile. What capability does Flow Builder provide?",
        options: ["The admin must log in as the sales rep using Login-As", "Flow Builder provides a 'Debug as Another User' feature in the Debug console", "Flows cannot be debugged without deploying to production", "Exporting logs to VS Code is mandatory"],
        correct_index: 1,
        explanation_correct: "Flow Builder includes a native 'Run flow as another user' checkbox in the Debug dialog.\nThis allows administrators to simulate execution under another user's exact profile, permissions, and sharing rules without switching sessions.",
        explanation_wrong: "Logging in via Login-As is not required when using the Flow Debugger.\nFlows should be tested and debugged in Sandboxes before deployment."
      },
      {
        id: 7,
        question: "What is a Subflow in Salesforce automation architecture?",
        options: ["A Flow that is deprecated and replaced", "A reusable Auto-launched or Screen Flow called from another parent Flow using the Subflow element", "A Flow running inside an external server", "An Apex class containing SOQL"],
        correct_index: 1,
        explanation_correct: "Subflows promote DRY (Don't Repeat Yourself) architecture by allowing common processes (like error logging or address formatting) to be written once and invoked by multiple parent Flows.\nVariables are passed seamlessly between parent and child flows.",
        explanation_wrong: "Subflows are not deprecated flows or external server processes.\nThey are standard modular building blocks within Flow Builder."
      }
    ],
    "Tricky Scenario": [
      {
        id: 1,
        question: "In the Salesforce Order of Execution, when do After-Save Record-Triggered Flows execute relative to Apex 'after update' triggers and Workflow Rules?",
        options: ["Before Apex after update triggers", "After Apex after update triggers, but before Workflow field updates", "After Workflow field updates and their re-triggers", "At the very beginning before validation rules"],
        correct_index: 1,
        explanation_correct: "According to the Salesforce Order of Execution: System validation -> Before triggers -> Before Flows -> Custom validation -> After triggers -> After Flows -> Workflow Rules.\nAfter-Save flows execute immediately after Apex after triggers.",
        explanation_wrong: "Before triggers execute prior to database write.\nWorkflow rules execute after the primary trigger and flow cycles."
      },
      {
        id: 2,
        question: "An administrator designs a Record-Triggered Flow on Case with a Scheduled Path set to run 2 hours after Case Creation. What happens if the Case is deleted 30 minutes after creation?",
        options: ["The Scheduled Path still executes and causes a null pointer exception", "Salesforce automatically removes the pending action from the Time-Based Workflow / Scheduled Jobs queue", "The deleted Case is automatically restored from the Recycle Bin", "The Flow converts to an immediate path"],
        correct_index: 1,
        explanation_correct: "When a record is deleted, all pending time-delayed actions (Time-Based Workflows, Scheduled Paths in Flow) associated with that record are automatically deleted from the queue.\nSalesforce does not attempt execution on deleted records.",
        explanation_wrong: "Pending scheduled actions do not persist or execute on purged records.\nRecords are not restored automatically."
      },
      {
        id: 3,
        question: "A Flow encounters an unhandled fault during a DML element. What happens to database changes made earlier in the same transaction by previous elements in that Flow?",
        options: ["All changes made earlier in the transaction are rolled back unless a Fault Connector catches the exception", "All previous database changes remain committed", "Only the failed record is rolled back; all others commit", "The entire Salesforce database enters read-only mode"],
        correct_index: 0,
        explanation_correct: "Salesforce transactions are atomic (all-or-nothing). If an unhandled fault occurs, the entire transaction rolls back to the initial state, undoing prior DML.\nImplementing Fault Connectors allows graceful handling and custom logging without transaction crash.",
        explanation_wrong: "Partial commits do not occur on unhandled runtime exceptions.\nOnly explicit `Database.insert(records, false)` in Apex permits partial commits."
      },
      {
        id: 4,
        question: "Why does invoking a standard 'Get Records' element on Opportunity inside a loop iterating 150 times fail at runtime?",
        options: ["Loops cannot iterate more than 50 times", "It triggers the governor limit: 'System.LimitException: Too many SOQL queries: 101'", "Opportunity records cannot be queried in loops", "Get Records only returns 1 record"],
        correct_index: 1,
        explanation_correct: "Salesforce enforces a strict governor limit of 100 synchronous SOQL queries per transaction.\nCalling 'Get Records' inside a loop consumes 1 SOQL query per iteration, crashing the Flow at iteration 101.",
        explanation_wrong: "Loops can iterate thousands of elements in memory.\nThe failure is caused by query limits, not loop capacity."
      },
      {
        id: 5,
        question: "A developer wants to prevent infinite recursion when an After-Save Flow on Contact updates the parent Account, which in turn triggers a Flow that updates the Contact. How is this prevented?",
        options: ["Salesforce automatically terminates flows after 1 run", "Add strict entry criteria so the Flow only fires when specific field values change (ISCHANGED or conditions)", "Deactivate all Account automations", "Use Screen Flows instead of Record-Triggered Flows"],
        correct_index: 1,
        explanation_correct: "Defining granular entry criteria (e.g. 'Only when a record is updated to meet the condition requirements' or checking `$Record.Field != $Record__Prior.Field`) prevents recursive firing.\nWithout entry filters, cyclic updates crash the transaction with max depth recursion limits.",
        explanation_wrong: "Salesforce permits multiple recursive re-triggers up to system recursion thresholds before aborting.\nDeactivating business logic compromises application requirements."
      },
      {
        id: 6,
        question: "In an Approval Process, what happens if an assigned Approver has delegate approvers enabled?",
        options: ["Only the delegated approver can approve the request", "Both the assigned approver and their delegated approver can approve or reject the request", "The approval is automatically rejected", "The request is routed to the System Administrator"],
        correct_index: 1,
        explanation_correct: "Delegated approvers share authority with the primary approver.\nEither individual can review, approve, or reject the pending record.",
        explanation_wrong: "The primary approver does not lose their approval authority when a delegate is specified.\nDelegation adds an alternate approver rather than replacing the primary."
      },
      {
        id: 7,
        question: "Which Flow trigger type can be launched directly in response to a Salesforce CDC (Change Data Capture) event?",
        options: ["Schedule-Triggered Flow", "Platform Event-Triggered Flow", "Record-Triggered Flow", "Autolaunched Flow"],
        correct_index: 1,
        explanation_correct: "Change Data Capture publishes platform events (e.g., `AccountChangeEvent`) when records are created, updated, or deleted.\nPlatform Event-Triggered Flows subscribe to these events to execute decoupled, asynchronous background logic.",
        explanation_wrong: "Record-Triggered Flows handle standard database DML, not CDC event message buses directly.\nSchedule-Triggered Flows run on clock schedules."
      }
    ]
  },
  "Apex & Architecture": {
    "Beginner": [
      {
        id: 1,
        question: "What is the primary purpose of writing unit tests in Salesforce Apex?",
        options: ["To test the speed of the user's internet connection", "To validate code functionality and satisfy the mandatory 75% code coverage requirement before deploying to Production", "To generate automated documentation", "To bypass governor limits"],
        correct_index: 1,
        explanation_correct: "Salesforce mandates a minimum of 75% overall Apex code coverage with passing assertions to deploy to a Production environment.\nTests ensure reliability, prevent regressions, and validate business requirements.",
        explanation_wrong: "Unit tests do not measure internet latency or bypass governor limits.\nIn fact, unit tests enforce strict governor limits during test execution."
      },
      {
        id: 2,
        question: "Which annotation is required above an Apex method to allow it to be called from a Salesforce Flow?",
        options: ["@AuraEnabled", "@InvocableMethod", "@TestSetup", "@RemoteAction"],
        correct_index: 1,
        explanation_correct: "The `@InvocableMethod` annotation exposes an Apex static method to Flow Builder and Process Automation.\nIt allows passing inputs and receiving outputs between declarative flows and custom code.",
        explanation_wrong: "`@AuraEnabled` exposes Apex to Lightning Web Components (LWC).\n`@TestSetup` prepares common test records in unit test classes."
      },
      {
        id: 3,
        question: "What is the consequence of placing a SOQL query inside a `for` loop in Apex?",
        options: ["The code compiles faster", "The code is at risk of hitting the governor limit of 100 SOQL queries per synchronous transaction", "Salesforce converts the query into a cached list", "The loop terminates after one execution"],
        correct_index: 1,
        explanation_correct: "SOQL inside loops is an anti-pattern that violates bulkification best practices.\nIf the loop iterates more than 100 times, Salesforce throws `System.LimitException: Too many SOQL queries: 101` and halts execution.",
        explanation_wrong: "Queries are not cached automatically when nested in loops.\nThe compiler does not prevent deployment, but runtime execution will fail."
      },
      {
        id: 4,
        question: "Which context variable in an Apex trigger contains the newly submitted versions of records during an `insert` or `update` event?",
        options: ["Trigger.old", "Trigger.new", "Trigger.oldMap", "Trigger.target"],
        correct_index: 1,
        explanation_correct: "`Trigger.new` returns a list of the new versions of the sObject records.\nIn an `insert` trigger, records are only present in `Trigger.new` (since no prior version exists).",
        explanation_wrong: "`Trigger.old` contains prior versions of records and is only available in update and delete triggers.\n`Trigger.target` is not a valid Apex trigger context variable."
      },
      {
        id: 5,
        question: "What does the `static` keyword mean when applied to an Apex variable or method?",
        options: ["The variable can never be reassigned", "The variable or method is associated with the class itself rather than an instance of the class and persists throughout the execution transaction", "The code runs in JavaScript", "The method runs on a scheduled timer"],
        correct_index: 1,
        explanation_correct: "Static members belong to the class level and share state across the entire execution context.\nThey are frequently used for transaction caches and recursion control flags.",
        explanation_wrong: "Constants that cannot be reassigned use the `final` keyword, not `static`.\nApex runs on Salesforce JVM/servers, not client-side JavaScript."
      },
      {
        id: 6,
        question: "What type of exception is thrown when an Apex query expected to return one record (`[SELECT Id FROM Account WHERE ...]`) finds zero records?",
        options: ["NullPointerException", "QueryException: List has no rows for assignment to SObject", "LimitException", "DmlException"],
        correct_index: 1,
        explanation_correct: "Assigning a SOQL query directly to a single sObject variable throws a `QueryException` if 0 rows or more than 1 row are returned.\nBest practice is to assign queries to a `List<sObject>` and check `.isEmpty()`.",
        explanation_wrong: "NullPointerExceptions occur when attempting to dereference a null reference.\nDmlException occurs when insert/update operations fail validation."
      },
      {
        id: 7,
        question: "Which interface should an Apex class implement to execute asynchronous batches processing millions of records?",
        options: ["Schedulable", "Database.Batchable<sObject>", "Queueable", "Comparable"],
        correct_index: 1,
        explanation_correct: "`Database.Batchable` breaks massive datasets into chunks (default 200 records) with independent governor limits across `start()`, `execute()`, and `finish()` methods.\nIt is the industry-standard design pattern for high-volume data processing.",
        explanation_wrong: "`Schedulable` runs jobs at clock intervals but does not chunk high-volume datasets by default.\n`Queueable` is best for smaller chained asynchronous transactions."
      }
    ],
    "Intermediate": [
      {
        id: 1,
        question: "Why should developers use a 'One Trigger Per Object' architectural design pattern with a Trigger Handler class?",
        options: ["Salesforce permits only 1 trigger file per org", "Multiple triggers on the same object have non-deterministic execution order, creating unpredictable bugs and race conditions", "Trigger handlers run faster than triggers", "To eliminate the need for unit tests"],
        correct_index: 1,
        explanation_correct: "Salesforce does not guarantee the execution order of multiple triggers on the same object.\nA Trigger Handler pattern consolidates logic into a single trigger that delegates to structured handler methods, guaranteeing controlled sequence.",
        explanation_wrong: "Salesforce permits multiple trigger files, but doing so violates architecture best practices.\nHandlers require comprehensive unit testing like all Apex classes."
      },
      {
        id: 2,
        question: "What is the primary advantage of Queueable Apex over `@future` asynchronous methods?",
        options: ["Queueable methods execute synchronously", "Queueable Apex supports complex object types (non-primitives), job chaining, and returns an AsyncApexJob ID for monitoring", "Queueable methods have no governor limits", "Queueable methods can run without test classes"],
        correct_index: 1,
        explanation_correct: "Queueable Apex overcomes `@future` limitations by accepting complex data types, sObjects, and allowing jobs to chain another job in `execute()`.\nIt also returns a Job ID from `System.enqueueJob()` to track progress.",
        explanation_wrong: "`@future` only accepts primitive types and cannot chain secondary future calls.\nBoth asynchronous frameworks are subject to governor limits."
      },
      {
        id: 3,
        question: "How does the `with sharing` keyword in an Apex class enforce security?",
        options: ["It enforces Field-Level Security and Object CRUD permissions", "It enforces the record-level sharing rules and OWD of the current running user", "It prevents other classes from calling this class", "It automatically encrypts the source code"],
        correct_index: 1,
        explanation_correct: "`with sharing` ensures that SOQL queries and record access respect the running user's OWD, role hierarchy, and sharing rules.\nIt does NOT enforce FLS or CRUD, which require `WITH USER_MODE` or `Security.stripInaccessible`.",
        explanation_wrong: "FLS and CRUD are not enforced by `with sharing`; that is a classic certification trap.\nIt does not restrict class-to-class invocations."
      },
      {
        id: 4,
        question: "What is the purpose of the `@TestSetup` method in an Apex test class?",
        options: ["It executes before every individual `@isTest` method, rolling back after each", "It executes once before any test methods run, creating common test data accessible in a read-only snapshot by all test methods in the class", "It deploys mock data directly to production", "It triggers email alerts upon test failure"],
        correct_index: 1,
        explanation_correct: "`@TestSetup` creates baseline test records once for the entire test class.\nEach test method receives a fresh rollback snapshot of this data, cutting overall test suite execution time significantly.",
        explanation_wrong: "It runs once per test class execution, not repeatedly before each method.\nTest records are completely isolated and never written to production tables."
      },
      {
        id: 5,
        question: "When writing Apex, how should a developer prevent DML errors on invalid records while still allowing valid records in the same list to be inserted?",
        options: ["Use `insert recordList;` with a try-catch block", "Use `Database.insert(recordList, false);` with allOrNone set to false", "Run the code in an anonymous window", "Wrap each record in a while loop"],
        correct_index: 1,
        explanation_correct: "Setting `allOrNone = false` in `Database.insert()` enables partial processing: valid records commit while failed records return error messages in `Database.SaveResult[]`.\nStandard `insert recordList;` fails the entire batch if a single record fails.",
        explanation_wrong: "Standard `insert recordList;` is an all-or-nothing operation regardless of try-catch.\nPartial success requires the Database methods."
      },
      {
        id: 6,
        question: "What is the maximum CPU timeout limit for synchronous Apex transactions?",
        options: ["5 seconds", "10 seconds", "60 seconds", "120 seconds"],
        correct_index: 1,
        explanation_correct: "Synchronous Apex has a hard governor limit of 10,000 milliseconds (10 seconds) of CPU time.\nAsynchronous Apex (Batch, Queueable, Scheduled) is granted an extended limit of 60 seconds.",
        explanation_wrong: "5 seconds is the maximum timeout for individual external HTTP callouts unless extended.\n60 seconds is the asynchronous limit."
      },
      {
        id: 7,
        question: "Which method should be used to simulate HTTP Callout responses in Apex unit tests without contacting actual external endpoints?",
        options: ["Test.setMock(HttpCalloutMock.class, new YourMockClass());", "Test.startTest();", "Database.rollback();", "System.runAs();"],
        correct_index: 0,
        explanation_correct: "Apex unit tests cannot make live web service callouts.\nImplementing `HttpCalloutMock` and registering it via `Test.setMock()` instructs the runtime to return simulated HTTP response payloads and status codes.",
        explanation_wrong: "`Test.startTest()` resets governor limits for the test execution block.\n`System.runAs()` tests execution context under specific user personas."
      }
    ],
    "Tricky Scenario": [
      {
        id: 1,
        question: "In an `after update` trigger, a developer modifies a field on `Trigger.new[0]` and calls `update Trigger.new;`. What error occurs?",
        options: ["The update succeeds silently", "System.FinalException: SObject row does not allow errors", "System.FinalException: Record is read-only in after update trigger context", "The database enters a dead lock"],
        correct_index: 2,
        explanation_correct: "Records in `Trigger.new` and `Trigger.old` are strictly read-only in `after` triggers.\nDirect field modifications must happen in `before` triggers, or a new sObject instance with the record ID must be instantiated and updated.",
        explanation_wrong: "`Trigger.new` is not mutable in after update triggers.\nModifications without creating a cloned instance throw a runtime FinalException."
      },
      {
        id: 2,
        question: "A developer executes SOQL: `[SELECT Id, Name FROM Account WITH USER_MODE]`. What is the behavior if the running user lacks Field-Level Security 'Read' on Account.Name?",
        options: ["The query returns Account records with Name as null", "The query throws a `System.SecurityException` indicating field read access is denied", "The query runs in System Mode automatically", "The query returns 0 records"],
        correct_index: 1,
        explanation_correct: "The `WITH USER_MODE` SOQL clause enforces both CRUD (object-level) and FLS (field-level) security.\nIf any requested field violates the running user's read permissions, the engine throws a `System.SecurityException` immediately.",
        explanation_wrong: "Unlike `Security.stripInaccessible`, `WITH USER_MODE` does not silently nullify inaccessible fields; it aborts execution with an exception.\nIt does not fall back to system mode."
      },
      {
        id: 3,
        question: "What is the governor limit for total heap size in a synchronous Apex transaction versus an asynchronous transaction?",
        options: ["3 MB synchronous / 6 MB asynchronous", "6 MB synchronous / 12 MB asynchronous", "12 MB synchronous / 36 MB asynchronous", "50 MB across both"],
        correct_index: 1,
        explanation_correct: "The synchronous Apex heap size limit is 6 MB, whereas asynchronous transactions (Batch, Queueable) double the allocation to 12 MB.\nExceeding this memory threshold throws `System.LimitException: Apex heap size too large`.",
        explanation_wrong: "Allocations of 3 MB or 50 MB do not match standard Salesforce heap specifications.\nGovernor limits are strictly enforced by the multitenant kernel."
      },
      {
        id: 4,
        question: "Why does calling an `@future(callout=true)` method from an Apex trigger sometimes result in 'System.CalloutException: You have uncommitted work pending'?",
        options: ["Because triggers cannot invoke future methods", "The error actually occurs when a synchronous callout is attempted after DML in the same transaction, whereas future methods decouple the callout into a separate transaction", "Future methods cannot use JSON", "Triggers can only make SOAP callouts"],
        correct_index: 1,
        explanation_correct: "The 'uncommitted work pending' error occurs when synchronous code attempts an HTTP callout while uncommitted DML exists in the same transaction.\nMoving the callout into an `@future(callout=true)` or Queueable job resolves the error because it executes in an independent, fresh transaction.",
        explanation_wrong: "Future methods are specifically designed to be called from triggers to defer work.\nJSON is fully supported across all Apex HTTP clients."
      },
      {
        id: 5,
        question: "In a Batch Apex job, what is the effect of implementing `Database.Stateful` on the batch class?",
        options: ["It enforces with-sharing across all batch slices", "It preserves instance member variable state across multiple execute() batch iterations instead of resetting for each chunk", "It forces the batch size to 1", "It converts the job to a Queueable"],
        correct_index: 1,
        explanation_correct: "By default, member variables reset between batch chunks. Implementing `Database.Stateful` retains instance variable state (e.g., maintaining running totals, counting errors, or tracking IDs) across all `execute()` transactions until `finish()`.\nStatic variables still reset between executions.",
        explanation_wrong: "`Database.Stateful` does not restrict batch size or convert to Queueable.\nIt exclusively controls memory persistence across transaction boundaries."
      },
      {
        id: 6,
        question: "An architect observes frequent 'UNABLE_TO_LOCK_ROW' errors during high-volume automated data loads into an object with Master-Detail relationships. What is causing this?",
        options: ["Parent Account records are locked whenever child records are inserted or updated to recompute rollups and maintain relational integrity", "The CSV file encoding is incorrect", "The Data Loader batch size is too small (e.g. 1)", "Custom fields cannot be updated in parallel"],
        correct_index: 0,
        explanation_correct: "Salesforce locks the parent master record during child record inserts and updates to recalculate Roll-Up Summary fields and ensure referential consistency.\nSorting data files by Parent ID minimizes cross-thread parent record lock contention.",
        explanation_wrong: "File encoding or custom fields do not cause row locks.\nReducing batch size or sorting by parent ID mitigates lock contention rather than causing it."
      },
      {
        id: 7,
        question: "What happens if an unhandled exception occurs inside the `execute()` method of Batch 4 out of 10 in a Batch Apex job?",
        options: ["The entire batch job is terminated and previous batches 1-3 roll back", "Batch 4 rolls back, but batches 1-3 remain committed and batches 5-10 continue executing", "All records in the entire database are locked", "The Salesforce instance restarts"],
        correct_index: 1,
        explanation_correct: "Each chunk in a Batchable class executes in an isolated transaction.\nIf Batch 4 fails, its specific transaction rolls back, but previously committed batches remain intact and subsequent batches continue to process.",
        explanation_wrong: "Batch Apex does not roll back previously committed execution chunks.\nBatches 5-10 will proceed unless explicitly aborted in code."
      }
    ]
  }
};
