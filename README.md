# Players Collection
Full-stack application to store and manage players collection using Spring Boot 3 and Angular 17

## Summary

Inspired by football card collections, the application allows users to filter desired content through various categories such as teams or positions. This content is secured using login authentication. Users must register beforehand to access the collection.

## Steps to run the project

### Using docker
`$docker compose up -d --build`

### Locally

#### Springboot 
- Steps to run the backend:
 
    1 - Navigated to the correspondent path `/backend`
  
    2 - Download the requested dependencies: `mvn install`
  
    3 - Run the project: `mvn spring-boot:run`

- The backend project is located at PORT 8080 (http://localhost:8080)

#### H2 Database
- The database used is an in-memory one provided by Spring Boot. It was chosen for its simplicity and adaptability to any project. However, it is not intended for use in a production environment. 

- DB configuraton at `application.properties` although the user and the password are the default ones.

- Steps to run the database 

    1 - Browse to http://localhost:8080/h2-console
  
    2 - Execut th efollowing command to add recieps: `RUNSCRIPT FROM 'src/main/resources/sql/players.sql';`

#### Angular 
- Steps to run the frontend project (Execute the following commands after the previous sections)

    1 - Located at the correspondent path `/frontend`

    2 - Download the requested dependencies: `npm install`
  
    3 - Run the project: `ng serve`
  
    4 - Browse to `http://localhost:4200`
