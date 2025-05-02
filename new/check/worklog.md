Joining: 26th Oct, 2025
Designation: Frontend Exective

## October

- User Management
- RFQ Module
- Auth UI enhancements
- Rate Analysis
- Misc
  - Formpanel changes
  - google map broken links

---

# User management with RBAC mechanism

restrict user access at 3 different levels for now

- sidebar
- routes
- component level / feature toggle

### Pointers to keep in mind

- User has only 1 active Profile at a given time
- A single Profile can have 1 or multiple roles attached
- A Role has module based permissions

### User Flow

User logs into web app & he should have a active profile.
Based on the profile ie's `union of permission mapping` of roles [role1,role2] the entire web app should work.
A single role would contain Feature modules
A single feature module would contain permissions - CREATE - READONLY - EDIT - DELETE - EXPORT - SHARE

Functionality developed

- create & update functionality in feature modules, roles , profiles
- Create User screen to seamlessly onboard him
- UI for Role mapping under a active profile

---

# Compliance Module (Frontend & API Integration)

Task: Development of UI & API Integration for Compliance Module

1. Enhanced UI Flow

- Designed and implemented an enhanced user interface (UI) flow for the Compliance Module.
- Improved navigation and overall user experience by refining the visual hierarchy and interaction patterns.

2. Simplified Existing Solution

- Analyzed the current implementation and identified key areas of complexity.
- Refactored and streamlined the existing solution to simplify workflows and reduce user effort.

4. Creation of UI for Different Compliance Types

- Developed dedicated UI screens for managing different compliance types.
  - Woodkraft Compliance: Designed specific UI elements to handle Woodkraft-related compliance data.
  - Subcontractor Compliance: Created UI elements for managing subcontractor compliance requirements.
  - One-time Compliance: Implemented UI to handle one-time compliance cases and requirements.

5. UI for Task Tracking

- Developed a UI component to trace upcoming, pending, and completed compliance tasks.
- Incorporated data tracking for each task, displaying relevant information (such as due dates, status, and assigned to) while performing the task.

6. API Integration & Critical Information Handling

- Integrated APIs to support the capture of critical compliance-related information.
  - Milestone Information: Integrated functionality to capture and display milestone data.
  - Customer Information: Built the API integration to allow customer data management related to compliance tasks.
  - Woodkraft Site Compliance: Integrated Woodkraft site-specific compliance data into the UI.
  - Subcontractor Information: Implemented API integration to fetch and manage subcontractor compliance details.

7. Update and Disable Functionality

- Implemented update and disable functionalities for compliance information, ensuring that users could modify or disable compliance data as needed.
- Ensured smooth interaction between the UI and API, enabling real-time updates and handling various use cases for data modification.

## Summary of Key Achievements:

- Developed a new, intuitive UI flow for the Compliance Module.
- Simplified complex workflows and improved usability for end-users.
- Successfully integrated multiple APIs to manage and update critical compliance information.
- Implemented robust features for task tracking and information management, including milestones, customer, and subcontractor data.

## Challenges

- Understanding Business Requirements with stakeholders for the key requirements for the Compliance Module.

---

# Auth UI Enhancements and Code Refactoring (Frontend & Refactoring)

1. Simplified UI Navigation Between Login Options

- Passcode & Password Login Options:
  - Redesigned and simplified the user interface navigation for login, allowing users to easily toggle between passcode and password-based login.
  - Ensured seamless transitions and consistency across login states, improving the overall user experience.

2. Code Refactoring for Readability & Performance

- Improved Code Structure:
  - Refactored existing authentication code to enhance readability, making it easier for future developers to understand and extend.
  - Applied best practices to reduce redundant code, improving maintainability and efficiency.
- Performance Enhancements:
  - Optimized authentication logic for faster load times and smoother transitions between UI elements.
  - Ensured minimal API call overhead and improved data handling for login actions.

## Summary of Key Achievements:

- Simplified and streamlined the UI for passcode and password login options, making the authentication process more intuitive.
- Refactored code to improve both readability and performance, ensuring better maintainability and a more responsive UI.

---

# RFQ & BOQ Module Development

1. RFQ Module Enhancements

- Kanban UI for RFQ Status:
  - Designed and developed a Kanban-style UI to help visualize leads in different RFQ (Request for Quotation) statuses.
  - Implemented functionality to easily see leads across various stages (e.g., New, Pending, Approved, Rejected).
  - Enhanced user experience by providing a quick, visual overview of RFQ progress.
- Go/No-Go Validator:
  - Created a Go/No-Go decision validator to evaluate clients based on their financial status.
  - Implemented logic to assess a client’s financial buildup and determine whether the RFQ should proceed or be declined based on pre-defined criteria.

2. BOQ Management

- BOQ List Management:
  - Implemented functionality to view and manage the list of Bill of Quantities (BOQ).
  - Developed features to display essential details about each BOQ, ensuring users can easily find the data they need.
- Download BOM & BOQ Templates:
  - Added the ability to download the existing Bill of Materials (BOM) associated with each BOQ.
  - Provided an option to download a standard BOQ template for consistency and easy data entry.
- BOQ Sharing via Email:
  - Developed a feature to share BOQ data with clients and internal team members directly via email.
  - Ensured seamless integration of email functionality, enabling easy distribution of BOQ-related documents and information.

3. BOQ to BOM Generation

- Rate Analysis by Two Methods:
  - Implemented functionality to perform rate analysis (RA) using two approaches:
    - Existing Template Selection: Users can choose from a pool of pre-built templates to perform rate analysis.
    - Custom RA from Scratch: Users can perform rate analysis from scratch without using any starter template, offering flexibility in calculations.

4. Rate Analysis Template Management

- Template Listing:
  - Developed a UI for users to view the list of all rate-analysis templates they have created.
  - Ensured users can easily search and filter templates for faster access.
- Template Creation:
  - Created functionality for users to build new rate-analysis templates by selecting products/items from the item master.
  - Simplified the process of selecting and adding products to templates for ease of use.
- Template Update:
  - Provided the ability to update existing rate-analysis templates, allowing users to make adjustments to product lists, rates, and other template details as needed.

5. Conversion Table Management

- Conversion Factor Management:
  - Developed a feature to manage conversion factors used in rate analysis.
  - Users can:
    - Create New Conversion Factors: Add new conversion factors to the system based on specific business requirements.
    - Update Existing Conversion Factors: Modify existing conversion factors, ensuring flexibility in applying accurate calculations.

## Summary of Key Achievements:

- Enhanced the RFQ module with a Kanban UI and Go/No-Go validator for improved lead management and client evaluation.
- Improved BOQ management by allowing easy viewing, downloading, and sharing of BOQ and BOM files.
- Developed a robust BOQ to BOM generation functionality with two methods for performing rate analysis.
- Streamlined rate-analysis template creation, management, and updates for more efficient financial analysis.
- Implemented a conversion table to handle conversion factors, allowing users to create and modify factors as needed for accurate calculations.

---

# Astrum Engineering – Mobile Responsive Web App

1. Home Page
      - Developed a responsive layout with a hero section, with footer and navbar layout
      - Developed a section for sector with active state highlighting and dynamic content changes
      - Ensured mobile responsive design, optimized text and images for various screen sizes.
      - Focused on maintaining a visually appealing, fast-loading hero image.
2. About Us Page
      - Created a page to present the company’s mission, vision, expertise and services
       made it responsive mobile adjustment for better user experience.

## Technologies Used:

- HTML5, CSS3, JavaScript
- TailwindCSS for grid layout and responsiveness
- Responsive Design Principles for mobile-first adaptation across all pages

---

# EHS Module (Frontend & API Integration)

1. Enhanced UI Flow, Simplified Existing Solution, Divided the EHS checklist into various different sections.

   - Training
   - Hr-Practices
   - Daily-Manpower
   - PPE Items
   - Incidents
   - EHS Daily Observations
   - Inspection - Work-Permits
   - Card-Issuance
   - Safety-Expenses
   - Registers-Records

2. API Integration & Critical Information Handling

- UI for capturing & updating the Project contact information

3. Creation of UI for Different Compliance Types

- Table view to see all the entries made
- A form componet to create a new entry of record or update an existing record
- A details section to view the detailed information of the record.
