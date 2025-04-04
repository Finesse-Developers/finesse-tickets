import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

type AuthUserType = {
  discordId: string;
  username: string;
  avatar: string | null;
};

interface AuthContextType {
  user: AuthUserType | null;
  login: (user: AuthUserType) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<AuthUserType | null>(null);

  // Check session on mount
  useEffect(() => {
    const checkSession = async () => {
      try {
        const res = await fetch(`http://localhost:6969/auth/check-session`, {
          credentials: "include",
        });
        if (res.ok) {
          const userData = await res.json();
          console.log(userData);
          setUser(userData);
        }
      } catch (error) {
        console.error("Failed to check session", error);
      }
    };
    checkSession();
  }, []);

  const login = (userData: AuthUserType) => {
    setUser(userData);
  };

  const logout = async () => {
    try {
      const res = await fetch(`http://localhost:6969/auth/logout`, {
        method: "post",
        credentials: "include",
      });

      if (res.ok) setUser(null);
      document.location.href = "/";
    } catch (error) {
      console.error("Logout failed", error);
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
