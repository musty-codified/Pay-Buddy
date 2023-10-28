# pay-buddy-backend-services
The backend api for a finance management application that uses MySQL as the database.
The application enable users to send and receive money and pay bills securely and seamlessly

`Built with Spring Boot, secured with Spring Security (JWT), documented with Swagger (API),
containerized with Docker, deployed on Heroku.`

## Technology ##
Following tools and libraries were used during the development of the API :
- **Java 11** 
- **Spring Boot** 
- **Build Tool: Maven**
- **MySQL** 
- **Swagger**
- **JWT**
- **Docker**

### Authentication and Authorization
Uses Spring Security with JWT for stateless authentication and authorization.

### Deployment
The application can be deployed on any Java Servlet container, or docker containers.

## Running the server locally ##
* **Clone the repository:** git clone https://github.com/musty-codified/Pay-Buddy.git
* **Build the project using maven:** mvn clean install 
* **Run the application:** mvn spring-boot:run


## Running the server in a Docker Container ##
* Simply download the [Docker compose file](https://github.com/musty-codified/Pay-Buddy/blob/main/pay-buddy-backend-services/pay-buddy/docker-compose.yml)
* You can edit the file to your custom configurations
* Then navigate to where the file is located on your terminal and run 'docker compose up'
* Voilà! once the image downloads are completed and the application is running, you can then visit http://localhost:8080/swagger-ui/index.html to access the end points


### Support
For any issues or queries, please raise a ticket on the GitHub repository or email me on ilemonamustapha@@gmail.com.








