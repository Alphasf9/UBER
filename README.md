# UBER-CLONE-main

An Uber Clone application built using the **MERN stack (MongoDB, Express.js, React.js, Node.js)**. The project is currently in the **building phase**, with plans to incorporate microservices in the future.

## Features (In Progress)

### Current State:
- **User Authentication:** Login and Signup functionality.
- **Basic UI/UX:** Responsive design for the user login page inspired by Uber.
- **React Router:** Navigation between pages.
- **State Management:** Using React hooks to manage component state.

### Planned Features:
- **Ride Booking System:**
  - Book a ride based on location.
  - Live tracking of driver and ride progress.
- **Driver Module:**
  - Separate login and dashboard for drivers.
  - Availability toggle for drivers.
- **Admin Panel:**
  - View all rides.
  - Manage users and drivers.
- **Payment Integration:** Secure payment system.
- **Microservices Architecture:** Decouple major functionalities into independently deployable services.

## Tech Stack

### Frontend:
- React.js with Tailwind CSS for styling.
- React Router for navigation.

### Backend:
- Node.js with Express.js.
- MongoDB as the database.

### Future Integrations:
- **Microservices:**
  - User service for authentication and profile management.
  - Ride service for handling ride-related operations.
  - Payment service for secure transactions.
- **Docker** for containerization.
- **Kubernetes** for orchestration.
- **RabbitMQ/Kafka** for message brokering between microservices.

## Project Structure
```
UBER-CLONE-main/
├── Backend/        # Backend code (Node.js, Express.js)
├── Frontend/       # Frontend code (React.js)
├── config/         # Configuration files (DB, environment variables)
└── README.md       # Project documentation
```

## Repository
GitHub: [UBER-CLONE-main](https://github.com/Alphasf9/UBER.git)

## Getting Started

### Prerequisites:
- Node.js (v14+)
- MongoDB (local or cloud instance)
- npm or yarn

### Setup Instructions:

1. **Clone the Repository:**
   ```bash
   git clone https://github.com/Alphasf9/UBER.git
   cd UBER-CLONE-main
   ```

2. **Install Dependencies:**
   ```bash
   cd Backend
   npm install
   cd ../Frontend
   npm install
   ```

3. **Setup Environment Variables:**
   Create a `.env` file in the `Backend/` folder with the following content:
   ```env
   DB_CONNECT=<your-mongodb-connection-string>
   JWT_SECRET=<your-jwt-secret>
   PORT=3000
   ```
   

4. **Run the Application:**
   - Start the backend server:
     ```bash
     cd Backend
     npx nodemon
     ```
   - Start the frontend server:
     ```bash
     cd Frontend
     npm run dev
     ```

5. **Open in Browser:**
   Visit `http://localhost:5173` to view the application.



## Contributing
Contributions are welcome! Please follow these steps:
1. Fork the repository.
2. Create a new branch: `git checkout -b feature/your-feature-name`.
3. Commit your changes: `git commit -m 'Add some feature'`.
4. Push to the branch: `git push origin feature/your-feature-name`.
5. Submit a pull request.

## License
This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Contact
For any questions or suggestions, feel free to reach out:
- Email: your.email@example.com
- GitHub: [Alphasf9](https://github.com/Alphasf9)

