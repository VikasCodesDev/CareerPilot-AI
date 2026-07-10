import { AuthUser, ProfileMetadata } from "../types";
import { SignupInput } from "../schemas";

// In-memory mock user store to support simulated DB persistence
const MOCK_USERS_KEY = "cp_mock_users";

// Default seed users
const SEED_USERS: AuthUser[] = [
  {
    id: "user-vikas",
    name: "Vikas DEV",
    email: "vikas@dev.com",
    image: null,
    role: "user",
    metadata: {
      completedOnboarding: true,
      careerGoal: "Full Stack Internship in 6 months",
      targetRole: "Full Stack Engineer",
      experienceLevel: "entry",
      skills: ["React", "Next.js", "TypeScript", "Node.js", "Tailwind CSS"],
    },
    createdAt: new Date().toISOString(),
  },
  {
    id: "user-guest",
    name: "Guest User",
    email: "guest@careerpilot.ai",
    image: null,
    role: "user",
    metadata: {
      completedOnboarding: false,
      skills: [],
    },
    createdAt: new Date().toISOString(),
  },
];

// Helper to get client-side mock database
function getMockUsers(): AuthUser[] {
  if (typeof window === "undefined") {
    return SEED_USERS;
  }
  
  try {
    const raw = localStorage.getItem(MOCK_USERS_KEY);
    if (!raw) {
      localStorage.setItem(MOCK_USERS_KEY, JSON.stringify(SEED_USERS));
      return SEED_USERS;
    }
    return JSON.parse(raw);
  } catch {
    return SEED_USERS;
  }
}

function saveMockUsers(users: AuthUser[]) {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(MOCK_USERS_KEY, JSON.stringify(users));
  } catch (e) {
    console.error("Failed to save mock users to localStorage", e);
  }
}

export class AuthService {
  /**
   * Find user by email (mock)
   */
  static async getUserByEmail(email: string): Promise<AuthUser | null> {
    const users = getMockUsers();
    const user = users.find(u => u.email?.toLowerCase() === email.toLowerCase());
    return user || null;
  }

  /**
   * Find user by id (mock)
   */
  static async getUserById(id: string): Promise<AuthUser | null> {
    const users = getMockUsers();
    const user = users.find(u => u.id === id);
    return user || null;
  }

  /**
   * Register a new user (mock validation and storage)
   */
  static async registerUser(data: SignupInput): Promise<AuthUser> {
    const existing = await this.getUserByEmail(data.email);
    if (existing) {
      throw new Error("A user with this email already exists");
    }

    const newUser: AuthUser = {
      id: `user-${Math.random().toString(36).substr(2, 9)}`,
      name: data.name,
      email: data.email,
      image: null,
      role: "user",
      metadata: {
        completedOnboarding: false,
        careerGoal: data.careerGoal || "",
        skills: [],
      },
      createdAt: new Date().toISOString(),
    };

    const users = getMockUsers();
    users.push(newUser);
    saveMockUsers(users);

    return newUser;
  }

  /**
   * Mock verify email (simulating success)
   */
  static async verifyCode(email: string, code: string): Promise<boolean> {
    // Standard mock verification code matches any 6 digit code for demo flows
    if (code.length === 6 && /^[0-9]+$/.test(code)) {
      return true;
    }
    return false;
  }

  /**
   * Mock forgot password code send
   */
  static async sendResetLink(email: string): Promise<boolean> {
    const user = await this.getUserByEmail(email);
    if (!user) {
      throw new Error("No account matches this email address.");
    }
    // Simulation of successful dispatch
    return true;
  }

  /**
   * Mock update onboarding info
   */
  static async updateOnboarding(userId: string, metadata: Partial<ProfileMetadata>): Promise<AuthUser> {
    const users = getMockUsers();
    const idx = users.findIndex(u => u.id === userId);
    if (idx === -1) {
      throw new Error("User not found");
    }

    users[idx].metadata = {
      ...users[idx].metadata,
      ...metadata,
    };
    saveMockUsers(users);
    return users[idx];
  }
}
