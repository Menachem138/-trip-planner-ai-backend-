# Trip Planner AI

This project is an exact replica of the Trip Planner AI website, including both the frontend and backend. The application allows users to create and optimize travel itineraries with ease.

## Frontend

The frontend is built using React.js, Tailwind CSS, React Router, and Redux for state management.

## Backend

The backend is built using Node.js with Express.js, MongoDB for the database, JWT for authentication, and Swagger for API documentation.

## Features

1. **User Authentication:**
   - Sign up, Login, Password Reset
2. **Trip Creation:**
   - Create new trips, Add/Edit/Delete activities
3. **AI Integration:**
   - Route optimization, Activity recommendations
4. **Collaboration:**
   - Share trips with friends, Real-time updates
5. **External APIs:**
   - Integrate with external travel services (e.g., Booking, Hostelworld)

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/Menachem138/-trip-planner-ai-backend-.git
   cd trip-planner-ai
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   Create a `.env` file in the root directory and add the following variables:
   ```env
   JWT_SECRET=your_jwt_secret_key
   MONGO_URI=your_mongodb_connection_string
   BOOKING_API_KEY=your_booking_api_key
   ```

4. Start the development server:
   ```bash
   npm start
   ```

## Usage

- Open [http://localhost:3000](http://localhost:3000) to view the application in your browser.
- The page will reload when you make changes.
- You may also see any lint errors in the console.

## API Documentation

The API documentation is available at [http://localhost:5000/api-docs](http://localhost:5000/api-docs) when the backend server is running.

## Deployment

### Frontend

The frontend is deployed using [Netlify](https://www.netlify.com/).

### Backend

The backend is deployed using [Heroku](https://www.heroku.com/) or a similar service.

## Contributing

1. Fork the repository.
2. Create a new branch (`git checkout -b feature-branch`).
3. Make your changes.
4. Commit your changes (`git commit -m 'Add some feature'`).
5. Push to the branch (`git push origin feature-branch`).
6. Open a pull request.

## License

This project is licensed under the MIT License.
