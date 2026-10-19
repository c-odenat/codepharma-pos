import dotenv from "dotenv";
import express, { NextFunction, Request, Response } from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { currencyCatalog, roleCatalog, RoleKey, Permission } from "@codepharma/shared";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;
const JWT_SECRET = process.env.JWT_SECRET || "dev-secret";
const DEPLOYMENT_MODE = (process.env.DEPLOYMENT_MODE || "standalone") as
  | "standalone"
  | "terminal"
  | "server";

app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

// Very small in-memory store; replace with database
const seedPassword = bcrypt.hashSync("admin", 10);

type User = {
  id: string;
  username: string;
  role: RoleKey;
  passwordHash: string;
  outlet?: string;
  terminalId?: string;
};

const users: User[] = [
  { id: "1", username: "admin", role: "admin", passwordHash: seedPassword },
  { id: "2", username: "cashier", role: "cashier", passwordHash: seedPassword },
  { id: "3", username: "pharmacist", role: "pharmacist", passwordHash: seedPassword }
];

function signToken(user: User) {
  return jwt.sign(
    {
      sub: user.id,
      username: user.username,
      role: user.role
    },
    JWT_SECRET,
    { expiresIn: "12h" }
  );
}

function getRolePermissions(role: RoleKey): Permission[] {
  return roleCatalog.find((r) => r.key === role)?.permissions ?? [];
}

function authRequired(required?: Permission[]) {
  return (req: Request, res: Response, next: NextFunction) => {
    const auth = req.headers.authorization;
    if (!auth?.startsWith("Bearer ")) {
      return res.status(401).json({ message: "Missing token" });
    }
    const token = auth.slice(7);
    try {
      const payload = jwt.verify(token, JWT_SECRET) as { sub: string; role: RoleKey; username: string };
      (req as any).user = payload;
      if (required && required.length > 0) {
        const perms = getRolePermissions(payload.role);
        const allowed = required.every((p) => perms.includes(p));
        if (!allowed) {
          return res.status(403).json({ message: "Insufficient permissions" });
        }
      }
      return next();
    } catch (err) {
      return res.status(401).json({ message: "Invalid token" });
    }
  };
}

app.get("/health", (_req, res) => {
  res.json({ status: "ok", mode: DEPLOYMENT_MODE });
});

app.get("/catalog/currencies", (_req, res) => {
  res.json(currencyCatalog);
});

app.get("/catalog/roles", (_req, res) => {
  res.json(roleCatalog);
});

app.post("/auth/login", (req, res) => {
  const { username, password } = req.body as { username?: string; password?: string };
  if (!username || !password) {
    return res.status(400).json({ message: "username and password are required" });
  }
  const user = users.find((u) => u.username === username);
  if (!user || !bcrypt.compareSync(password, user.passwordHash)) {
    return res.status(401).json({ message: "Invalid credentials" });
  }
  const token = signToken(user);
  const permissions = getRolePermissions(user.role);
  res.json({ token, role: user.role, permissions });
});

app.get("/users", authRequired(["manage_users"]), (_req, res) => {
  const sanitized = users.map(({ passwordHash, ...rest }) => rest);
  res.json(sanitized);
});

app.post("/users", authRequired(["manage_users"]), (req, res) => {
  const { username, role, password } = req.body as { username?: string; role?: RoleKey; password?: string };
  if (!username || !role || !password) {
    return res.status(400).json({ message: "username, role, and password are required" });
  }
  if (!roleCatalog.find((r) => r.key === role)) {
    return res.status(400).json({ message: "Unknown role" });
  }
  if (users.some((u) => u.username === username)) {
    return res.status(409).json({ message: "User already exists" });
  }
  const newUser: User = {
    id: (users.length + 1).toString(),
    username,
    role,
    passwordHash: bcrypt.hashSync(password, 10)
  };
  users.push(newUser);
  const { passwordHash, ...safeUser } = newUser;
  res.status(201).json(safeUser);
});

app.listen(PORT, () => {
  console.log(`API listening on http://localhost:${PORT} in ${DEPLOYMENT_MODE} mode`);
});
