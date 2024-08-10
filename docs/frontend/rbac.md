RBAC at many level
- Component level
- Feature level (toggle feature)
- Sidebar level

===

get the logged in user's
- role and org plan
  ex: FM

- access to the modules as well as its sub modules based on the current org plan 
  ex: CHW Module , Track CHW Attendance

- his abilities and
  ex: Read


====

Sidebar level
	- static items
	- dynamic items based on some special toggle feature which is specific to the facility / Org
		ex: Analytics

Component level ( Show and hide )
	- we would need a inhouse custom component like <Can /> ( from @casl/ability )
	- base on the logged in user role 

Feature level
	-Based on their access to specific modules ex: doctor module is not visible for fm

------------------
RBAC for custom roles 

1 Create a user group/cohart ex: operations group
2 Attach a policy to that group ex: operations policy

Operations access terms / policy
*And the terms like this,
 CHW Module
	- CHW Profile
		[Y]Create [Y]Read [N]Update [N]Delete

	- Track CHW Attendance
		[N]Create [Y]Read [N]Update [N]Delete

3 Add a user to a operations group ex: user rahul,rakshith is added to the group

* By default user inherits the abilites/properties of the cohert he is added to



Create a Policy
1 Show all modules and select the modules which needs to be added to a cohart
 Ex 1 CHW Module
	- CHW Profile		
	- Track CHW Attendance	



	




https://downloadly.ir/elearning/video-tutorials/cypress-end-to-end-testing-getting-started/