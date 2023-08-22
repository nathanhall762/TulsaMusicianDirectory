# Tulsa Musician Directory: Design Documents
## 1. Writeups of the design
### 1.1 What are you going to build and how does it fit the theme?

We are building the "Tulsa Musician Directory", a web application that provides a centralized platform for showcasing local musicians with audio content, music links, and social media handles. This platform fits the theme of 'outside' by providing a tool for Tulsans who want to get out of the house and listen to live music. It also fits the theme of 'outside' by providing a platform for local musicians to get their music out to the public.

### 1.2 What tools will you use?

Frontend: ReactJS for building the user interface, along with React Router for navigation.
Backend: Firebase Firestore for database storage and Firebase Storage for storing musician images and related media.
Styling: CSS modules for component-specific styling.
Authentication: Firebase Authentication for user registration and login.
Version Control: Git and GitHub for source code management and collaboration.

### 1.3 How long do you expect to spend on the development of each part?

Frontend Development: 5 days
   Set up React environment: 0.5 days
   Develop individual components: 3 days
   Integrate components and finalize UI: 1.5 days

Backend Development: 3 days
   Set up Firebase and integrate with React: 1 day
   Implement database CRUD operations: 1 day
   Implement authentication and authorization: 1 day

Styling and Responsiveness: 2 days
   Style individual components: 1 day
   Ensure responsiveness and cross-browser compatibility: 1 day

Testing and Debugging: 2 days
   Unit testing of components: 1 day
   Integration testing and bug fixing: 1 day

Total Estimated Development Time: 12 days

## Firebase Firestore Operations Documentation
Collections

- musicians: Stores all musician profiles.
- users: Stores registered users and their roles (if any).

Operations on musicians Collection

- Fetch all musician profiles
   Method:
   ```getDocs(collection(db, 'musicians'))```
- Fetch a specific musician's profile by name
   Method:
   ```doc(collection(db, 'musicians'), musicianName)```
   
   Usage: Use this to retrieve a specific musician's data based on their name.
- Add a new musician profile
   Method:
   ```setDoc(doc(collection(db, 'musicians')), musicianData)```
- Update a specific musician's profile
   Method: 
   ```updateDoc(doc(collection(db, 'musicians'), musicianName), updatedData)```
- Delete a specific musician's profile
   Method:
   ```deleteDoc(doc(collection(db, 'musicians'), musicianName))```

Firebase Authentication Operations

- Register a new user
   Method: 
   Firebase Authentication's ```createUserWithEmailAndPassword(email, password)```
- Log in an existing user
   Method: 
   Firebase Authentication's ```signInWithEmailAndPassword(email, password)```
- Log out the current user
   Method: 
   Firebase Authentication's ```signOut()```

## UML Diagram
![UML Diagram](./UML.png)
