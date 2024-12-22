
import users from './config/users.json';

interface User {
  email: string;
  password: string;
}


export const findUser = (email: string): User | undefined => {
  return users.find((user) => user.email === email);
};


export const registerUser = (email: string, password: string): string => {
  const userExists = findUser(email);
  if (userExists) {
    return "User already exists!";
  }

 
  users.push({ email, password });
  return "Registration successful!";
};

// Simulate user login
export const loginUser = (email: string, password: string): string => {
  // Hardcoded users for testing
  const users = [
    { email: "user1@example.com", password: "password1" },
    { email: "user2@example.com", password: "password2" }
  ];

  // Check if user exists
  const user = users.find((user) => user.email === email && user.password === password);

  if (user) {
    return "Login successful!";
  } else {
    return "Invalid email or password.";
  }
};