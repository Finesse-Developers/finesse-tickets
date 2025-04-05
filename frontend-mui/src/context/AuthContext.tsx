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
  accessToken: string;
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
        // Parallelize the fetch calls
        const [userSessionRes, userRes] = await Promise.all([
          fetch(`http://localhost:6969/auth/check-session`, {
            credentials: "include",
          }),
          fetch(`http://localhost:6969/auth/me`, {
            credentials: "include",
          }),
        ]);

        // Check session validity and get user data
        if (userSessionRes.ok) {
          const userSession = await userSessionRes.json();
          if (userSession.accessToken && userRes.ok) {
            const data = await userRes.json();
            console.log(data);
            setUser(data);
            return;
          }
        }

        setUser(null);
      } catch (error) {
        console.error("Failed to check session", error);
        setUser(null);
        document.location.href = "/";
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
