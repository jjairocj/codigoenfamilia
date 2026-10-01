"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import confetti from "canvas-confetti";
import { sound } from "@/lib/sound";

interface ChildUser {
  id: string;
  alias: string;
  level: string;
  avatar: string;
}

interface FamilyUser {
  id: string;
  email: string;
  familyName: string;
  child: ChildUser;
}

interface PassportContextType {
  user: FamilyUser | null;
  stamps: string[];
  isLoaded: boolean;
  toggleStamp: (code: string) => Promise<boolean>;
  isCompleted: (code: string) => boolean;
  getLevelProgress: (level: string) => { completed: number; total: number; pct: number };
  loginUser: (data: FamilyUser) => Promise<void>;
  logoutUser: () => void;
}

const PassportContext = createContext<PassportContextType | null>(null);

const LEVEL_TOTALS: Record<string, number> = {
  semillas: 16,
  exploradores: 20,
  inventores: 24,
  creadores: 24,
};

export function PassportProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<FamilyUser | null>(null);
  const [stamps, setStamps] = useState<string[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load from local storage or cloud
  useEffect(() => {
    try {
      const savedUser = localStorage.getItem("cef_family_user");
      if (savedUser) {
        const parsed = JSON.parse(savedUser);
        setUser(parsed);
      }

      const savedStamps = localStorage.getItem("cef_guest_stamps");
      if (savedStamps) {
        setStamps(JSON.parse(savedStamps));
      }
    } catch {}
    setIsLoaded(true);
  }, []);

  const toggleStamp = async (rawCode: string): Promise<boolean> => {
    const code = rawCode.toUpperCase();
    const willBeCompleted = !stamps.includes(code);

    sound.playWoodClick();

    if (willBeCompleted) {
      sound.playStampFanfare();
      try {
        confetti({
          particleCount: 50,
          spread: 60,
          origin: { y: 0.7 },
          colors: ["#86efac", "#fde047", "#bae6fd", "#fed7aa"],
        });
      } catch {}
    }

    const updated = willBeCompleted
      ? [...stamps, code]
      : stamps.filter((s) => s !== code);

    setStamps(updated);
    localStorage.setItem("cef_guest_stamps", JSON.stringify(updated));

    if (user && user.child?.id) {
      try {
        await fetch("/api/stamps/toggle", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            childId: user.child.id,
            missionCode: code,
          }),
        });
      } catch (e) {
        console.error("Cloud toggle error:", e);
      }
    }

    return willBeCompleted;
  };

  const isCompleted = (rawCode: string) => {
    return stamps.includes(rawCode.toUpperCase());
  };

  const getLevelProgress = (level: string) => {
    const prefix = level[0].toUpperCase(); // S, E, I, C
    const completed = stamps.filter((s) => s.startsWith(prefix)).length;
    const total = LEVEL_TOTALS[level.toLowerCase()] || 20;
    const pct = Math.min(100, Math.round((completed / total) * 100));
    return { completed, total, pct };
  };

  const loginUser = async (userData: FamilyUser) => {
    setUser(userData);
    localStorage.setItem("cef_family_user", JSON.stringify(userData));

    // Sync guest stamps to user cloud profile
    if (userData.child?.id) {
      try {
        const res = await fetch("/api/stamps/sync", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            childId: userData.child.id,
            localStamps: stamps,
          }),
        });
        const data = await res.json();
        if (data.stamps) {
          setStamps(data.stamps);
          localStorage.setItem("cef_guest_stamps", JSON.stringify(data.stamps));
        }
      } catch (e) {
        console.error("Sync error on login:", e);
      }
    }
  };

  const logoutUser = () => {
    setUser(null);
    localStorage.removeItem("cef_family_user");
  };

  return (
    <PassportContext.Provider
      value={{
        user,
        stamps,
        isLoaded,
        toggleStamp,
        isCompleted,
        getLevelProgress,
        loginUser,
        logoutUser,
      }}
    >
      {children}
    </PassportContext.Provider>
  );
}

export function usePassport() {
  const ctx = useContext(PassportContext);
  if (!ctx) throw new Error("usePassport must be used within PassportProvider");
  return ctx;
}
