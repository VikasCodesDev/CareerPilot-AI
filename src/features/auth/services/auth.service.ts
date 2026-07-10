import { AuthUser, ProfileMetadata } from "../types";
import { SignupInput } from "../schemas";

const LOCAL_USERS_KEY = "cp_local_users";

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

function getLocalUsers(): AuthUser[] {
  if (typeof window === "undefined") {
    return SEED_USERS;
  }
  
  try {
    const raw = localStorage.getItem(LOCAL_USERS_KEY);
    if (!raw) {
      localStorage.setItem(LOCAL_USERS_KEY, JSON.stringify(SEED_USERS));
      return SEED_USERS;
    }
    return JSON.parse(raw);
  } catch {
    return SEED_USERS;
  }
}

function saveLocalUsers(users: AuthUser[]) {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(LOCAL_USERS_KEY, JSON.stringify(users));
  } catch {
    return;
  }
}

export class AuthService {
  /**
   * Find user by email
   */
  static async getUserByEmail(email: string): Promise<AuthUser | null> {
    const users = getLocalUsers();
    const user = users.find(u => u.email?.toLowerCase() === email.toLowerCase());
    return user || null;
  }

  /**
   * Find user by id
   */
  static async getUserById(id: string): Promise<AuthUser | null> {
    const users = getLocalUsers();
    const user = users.find(u => u.id === id);
    return user || null;
  }

  /**
   * Register a new user
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

    const users = getLocalUsers();
    users.push(newUser);
    saveLocalUsers(users);

    return newUser;
  }

  /**
   * Verify email confirmation code
   */
  static async verifyCode(email: string, code: string): Promise<boolean> {
    if (code.length === 6 && /^[0-9]+$/.test(code)) {
      return true;
    }
    return false;
  }

  /**
   * Send password reset link
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
   * Update onboarding info
   */
  static async updateOnboarding(userId: string, metadata: Partial<ProfileMetadata>): Promise<AuthUser> {
    const users = getLocalUsers();
    const idx = users.findIndex(u => u.id === userId);
    if (idx === -1) {
      throw new Error("User not found");
    }

    users[idx].metadata = {
      ...users[idx].metadata,
      ...metadata,
    };
    saveLocalUsers(users);
    return users[idx];
  }
}
