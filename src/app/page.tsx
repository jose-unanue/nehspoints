"use client";

import { FormEvent, useState } from "react";

type Member = {
  id: number;
  name: string;
  points: number;
};

const initialMembers: Member[] = [
  { id: 1, name: "Avery Johnson", points: 420 },
  { id: 2, name: "Kai Patel", points: 380 },
  { id: 3, name: "Jordan Kim", points: 355 },
  { id: 4, name: "Emerson Lee", points: 300 },
  { id: 5, name: "Riley Gomez", points: 260 },
];

export default function Home() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [members, setMembers] = useState<Member[]>(initialMembers);

  const handleLogin = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!email.trim() || !password.trim()) {
      setError("Please enter your admin email and password.");
      return;
    }

    setError("");
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setEmail("");
    setPassword("");
  };

  const adjustPoints = (id: number, delta: number) => {
    setMembers((previousMembers) =>
      previousMembers
        .map((member) =>
          member.id === id
            ? { ...member, points: Math.max(0, member.points + delta) }
            : member
        )
        .sort((a, b) => b.points - a.points)
    );
  };

  const renderLogin = () => (
    <>
      <div className="mb-8 space-y-2 text-center">
        <h1 className="text-3xl font-semibold text-white drop-shadow-sm">
          Admin Login
        </h1>
        <p className="text-sm text-white/70">
          Access the NEHS points dashboard to manage and review member rankings.
        </p>
      </div>

      <form onSubmit={handleLogin} className="space-y-5">
        <div className="space-y-2">
          <label
            htmlFor="email"
            className="block text-sm font-medium text-white/80"
          >
            Email
          </label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            className="w-full rounded-2xl border border-white/20 bg-white/10 px-4 py-3 text-white shadow-inner outline-none transition focus:border-white/40 focus:bg-white/20"
            placeholder="you@example.com"
          />
        </div>

        <div className="space-y-2">
          <label
            htmlFor="password"
            className="block text-sm font-medium text-white/80"
          >
            Password
          </label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            className="w-full rounded-2xl border border-white/20 bg-white/10 px-4 py-3 text-white shadow-inner outline-none transition focus:border-white/40 focus:bg-white/20"
            placeholder="Enter your admin password"
          />
        </div>

        {error && (
          <p className="rounded-2xl border border-rose-400/40 bg-rose-500/10 px-4 py-3 text-sm text-rose-100">
            {error}
          </p>
        )}

        <button
          type="submit"
          className="w-full rounded-2xl bg-gradient-to-r from-sky-400 via-blue-500 to-indigo-500 px-4 py-3 text-sm font-semibold uppercase tracking-wide text-white shadow-lg shadow-blue-900/30 transition hover:from-sky-300 hover:via-blue-400 hover:to-indigo-400"
        >
          Enter Dashboard
        </button>
      </form>
    </>
  );

  const renderDashboard = () => (
    <div className="space-y-8">
      <div className="flex flex-col gap-4 text-center sm:flex-row sm:items-center sm:justify-between sm:text-left">
        <div>
          <h2 className="text-3xl font-semibold text-white drop-shadow-sm">
            Points Leaderboard
          </h2>
          <p className="text-sm text-white/70">
            Adjust member points instantly—every logged in user has admin rights.
          </p>
        </div>
        <button
          onClick={handleLogout}
          className="inline-flex items-center justify-center rounded-2xl border border-white/20 bg-white/10 px-4 py-2 text-sm font-medium text-white transition hover:border-white/40 hover:bg-white/20"
        >
          Log out
        </button>
      </div>

      <div className="space-y-4">
        {members.map((member, index) => (
          <div
            key={member.id}
            className="flex flex-col gap-4 rounded-3xl border border-white/10 bg-white/10 p-4 shadow-lg shadow-slate-900/30 backdrop-blur-xl transition hover:border-white/30 hover:bg-white/16 sm:flex-row sm:items-center sm:justify-between"
          >
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/20 text-lg font-semibold text-white">
                #{index + 1}
              </div>
              <div>
                <p className="text-lg font-semibold text-white">
                  {member.name}
                </p>
                <p className="text-sm text-white/70">{member.points} points</p>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <span className="rounded-2xl bg-slate-900/40 px-4 py-2 text-sm font-medium text-slate-100 shadow-inner">
                {member.points} pts
              </span>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => adjustPoints(member.id, -5)}
                  className="h-10 w-10 rounded-2xl border border-white/20 bg-gradient-to-br from-rose-500/60 to-rose-600/70 text-lg font-semibold text-white shadow-md shadow-rose-900/30 transition hover:from-rose-500 hover:to-rose-600"
                >
                  -5
                </button>
                <button
                  type="button"
                  onClick={() => adjustPoints(member.id, -1)}
                  className="h-10 w-10 rounded-2xl border border-white/20 bg-white/10 text-lg font-semibold text-white shadow-md transition hover:border-white/40 hover:bg-white/20"
                >
                  -1
                </button>
                <button
                  type="button"
                  onClick={() => adjustPoints(member.id, 1)}
                  className="h-10 w-10 rounded-2xl border border-white/20 bg-white/10 text-lg font-semibold text-white shadow-md transition hover:border-white/40 hover:bg-white/20"
                >
                  +1
                </button>
                <button
                  type="button"
                  onClick={() => adjustPoints(member.id, 5)}
                  className="h-10 w-10 rounded-2xl border border-white/20 bg-gradient-to-br from-emerald-400/70 to-emerald-500/70 text-lg font-semibold text-white shadow-md shadow-emerald-900/30 transition hover:from-emerald-400 hover:to-emerald-500"
                >
                  +5
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 p-6 text-slate-50">
      <div className="mx-auto flex w-full max-w-3xl items-center justify-center">
        <div className="w-full rounded-[2.75rem] border border-white/15 bg-white/10 p-10 shadow-2xl shadow-slate-900/40 backdrop-blur-2xl">
          {isAuthenticated ? renderDashboard() : renderLogin()}
        </div>
      </div>
    </div>
  );
}
