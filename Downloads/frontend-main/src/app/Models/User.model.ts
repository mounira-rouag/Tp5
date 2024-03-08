export interface User {
    firstname: string;
    lastname: string;
    username: string;
    email: string;
    password: string;
    roles: string[]; // Assuming roles are strings
    siteid: string; // Assuming siteid is a string
  }