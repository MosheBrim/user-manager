# User Management System

A simple and efficient user management system built with React, Redux, and MUI.

## Features

### **Frontend**
- **Login Page**: 
  - Secure login form for accessing the system.
  - Error messages for invalid inputs.
  
- **User Dashboard**:
  - Displays a dynamic table of users with options to:
    - Edit user details (name, email, etc.).
    - Delete users from the system.
  - Add new users via a popup form.
  
- **Responsive Layout**:
  - Displays the logged-in user's name in the header.
  - Includes a logout button for exiting the system.
  - Fully responsive design for mobile and desktop.

### **Additional Features**
- **State Management**: Powered by Redux Toolkit for predictable state handling.
- **Styling**: Utilizes Material-UI (MUI) for a modern and professional look.
- **Error Handling**: User-friendly error messages and feedback for all actions.

## Technologies Used

- **Frontend**: React, Redux, Material-UI (MUI)
- **State Management**: Redux Toolkit
- **Styling**: Material-UI for consistent design.

## How to Run

1. Clone the repository:
   ```bash
   git clone https://github.com/MosheBrim/user-manager.git
   cd user-manager
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the application:
   ```bash
   npm start
   ```

4. Open your browser and go to `http://localhost:3000`.

## Project Structure

- `src/components`: Reusable UI components.
- `src/redux`: State management logic with Redux Toolkit.
- `src/pages`: Main application pages (Login, Dashboard).

## Future Improvements

- Add role-based access control (e.g., Admin vs Regular User).
- Implement unit and integration tests.
- Add support for exporting user data (e.g., CSV or Excel).
- Enhance accessibility features for better usability.

---
Thank you for using the User Management System! Feel free to reach out with any questions or suggestions.
