# Application Title: A Description

This application allows the owner (user) to add their restaurant for the other people to see their menu and the customer can review their restaurant by commenting, like their restaurant.

## Setup Steps
##### Front end
1. [Fork and clone](https://github.com/truongphan97gl/restaurant-client/) this repository.
2. Run `npm install` to install all dependencies
3. Use `npm start` to spin up the server.
##### Back end
1. [Fork and clone](https://github.com/truongphan97gl/restaurant-api) this repository.
2. Run `npm install` to install all dependencies
3. Ensure that you have nodemon installed by running `npm install -g nodemon.`
4. Use `npm run server` to spin up the server.

## Important Links 

- [Other Repo](https://github.com/truongphan97gl/restaurant-api)
- [Deployed API]((https://shrouded-stream-88197.herokuapp.com/))
- [Deployed Client](https://truongphan97gl.github.io/restaurant-client/#/)
### User Stories

- As a user I want to sign in/up 
- As a user I want to Create a new restaurant, comment
- As a user I want to Read multiple restaurant, comment
- As a user I want to Read a single restaurant
- As a user I want to Update a restaurant I own
- As a user I want to Delete a comment I own

### Technologies Used

- jQuery
- React
- CSS
- Bootstrap
- Javascript

### Catalog of Routes

Verb         |	URI Pattern  
------------ | ------------- 
GET | /restaurants 
GET | /restaurants/:id 
POST | /restaurants 
PATCH | /restaurants/:id 
DELETE | /restaurants/:id

Verb         |	URI Pattern  
------------ | ------------- 
GET | /coments 
GET | /comments/:id 
POST | /comments 
PATCH | /comments/:id 
DELETE | /comments/:id

### Unsolved Problems

- Multiple like and unlike
- Having tag for the restarant
- Having a real menu with price and name of the foods.

Images
App Screenshot:

![](https://i.imgur.com/MXOHreX.png)
![](https://i.imgur.com/yROfzZC.png)

----

#### Wireframe:
![wireframe](https://i.imgur.com/4zUzXMO.png)
![wireframe](https://i.imgur.com/yBpuD9P.png)

---

#### ERD:

![ERD](https://i.imgur.com/FCdfOTc.png)

### Problem solving

  1. Create a todo-list for every feature that need to complete.
2. Using console logs to debug the problem.
3. Search google and find the relevant information about the problem.
4. Try to solve it.
5. If Work, move on.
6. If Not, find google or try to ask instructor to help.

### PLANNING

### Planning
1.  Create User Stories
2.  Create Wire Frames
3.  Create ERD



##Client

### API
1.   Create my resource and end points
2.   Test my resource's end points with curl scripts
3.   Add the relationship to a User
4.   Add User ownership to resource controller

### Client

1.   Sign Up (curl then web app)
2.   Sign In (curl then web app)
3.   Change Password (curl then web app)
4.   Sign Out (curl then web page)
5.   All API calls have success or failure messages
6.   Create resource (curl then web app)
7.   Get all of their owned resources (curl then web app)
8.   Delete single resource (curl then web app)
9.   Update single resource (curl then web app)

### Final Touches
1.   README
2.   Troubleshoot/Debug
3.   Style