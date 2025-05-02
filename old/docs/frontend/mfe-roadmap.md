Every MFE would need the ability to
 - styles
 - common configuration ie.,
	- routes, redirects & sidebar
	- environments
	- util functions
	- rbac
	- axios config
 - reusable components
 - hooks
 - testing setup 

container-mfe
 - Universal Wrapper Components
	- Navbar
	- Topbar
	- Sidebar
	- Footer

auth-mfe ( Contains Auth module ie., ) 
 - Functionalities for Org Selector,Login Screen
 - UI & API Services
 
services-mfe ( Contains Every modules in the 360 portal )
 - Functionalities include the presented UI with there API Services
	


Authentication

Step 1 (Org Selector)
- Feature type
	- critical
- Screen Info
	- We need to provide the org id to goto login
- Feedback
	- Show toast message if the creds are wrong
	- If the creds are right redirect to login screen
- Accessible Roles
	- All
- Estimated time to delivery
	- 2 + 1 Days	
- Ownership
	- Rakshith
- Wireframe/Design
	- Approved/Hold/Need to Approve 
- API's 
	- available


CHW Screens
==============
1.onboard & update a chw in a single ui
- Screen Info
	- stepper form 
- Feedback
	- Show success toast message if onboarding is successfull
	- Show error message in toaster
- Accessible Roles
	- All

2.see list of available chws by facility
- Screen Info
	- a datatable in which fm can search,sort, filter chw
	- pagination (previous-page,next-page,see current page)
- Feedback
	- None	
- Accessible Roles
	- All

3 track
- Screen Info
	- chw performance by some date range
	- attendance
- Feedback
	- None	
- Accessible Roles
	- All
	


======
Form builder
Performance monitoring
Task management
Doctor management
Training management
Facility management






























































































































































































































































































































































































































































































































































