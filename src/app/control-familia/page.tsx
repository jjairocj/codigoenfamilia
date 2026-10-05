"use client";

import React, { useState, useEffect } from "react";
import {
  ShieldCheck, Lock, Unlock, Users, MessageSquare, BarChart3,
  Trash2, CheckCircle2, Clock, RefreshCw, Search, ExternalLink,
  Mail, AlertCircle, Sparkles, Filter, ChevronRight, Compass,
  Laptop, Globe, ArrowLeft, LogOut
} from "lucide-react";
import Link from "next/link";

interface StatsData {
  totalFamilies: number;
  totalChildren: number;
  totalStamps: number;
  totalVisits: number;
  recentVisits7d: number;
  pendingTickets: number;
  resolvedTickets: number;
  levelCounts: Record<string, number>;
  topPages: { path: string; count: number }[];
}

interface UserData {
  id: string;
  email: string;
  familyName: string;
  createdAt: string;
  children: {
    id: string;
    alias: string;
    currentLevel: string;
    avatar: string;
    stamps: { missionCode: string }[];
  }[];
}

interface TicketData {
  id: string;
  familyName: string;
  email: string;
  category: string;
  missionId: string | null;
  message: string;
  currentUrl: string | null;
  deviceInfo: string | null;
  status: string;
  createdAt: string;
}

export default function AdminControlPage() {
  const [pin, setPin] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authError, setAuthError] = useState<string | null>(null);
  const [authLoading, setAuthLoading] = useState(false);

  // Dashboard state
  const [activeTab, setActiveTab] = useState<"stats" | "tickets" | "users">("stats");
  const [loading, setLoading] = useState(false);
  const [stats, setStats] = useState<StatsData | null>(null);
  const [users, setUsers] = useState<UserData[]>([]);
  const [tickets, setTickets] = useState<TicketData[]>([]);

  // Filters & search
  const [userSearch, setUserSearch] = useState("");
  const [ticketFilter, setTicketFilter] = useState<"todos" | "pendiente" | "resuelto">("todos");
  const [userToDelete, setUserToDelete] = useState<UserData | null>(null);
  const [actionLoading, setActionLoading] = useState(false);
  const [excludeMyVisits, setExcludeMyVisits] = useState(true);

  // Check saved session PIN & exclusion flag
  useEffect(() => {
    try {
      const isDeviceExcluded = localStorage.getItem("cef_admin_device") !== "false";
      setExcludeMyVisits(isDeviceExcluded);
    } catch {}
    const savedPin = sessionStorage.getItem("cef_admin_pin");
    if (savedPin) {
      validatePin(savedPin);
    }
  }, []);

  const toggleExcludeDevice = () => {
    try {
      const next = !excludeMyVisits;
      localStorage.setItem("cef_admin_device", next ? "true" : "false");
      setExcludeMyVisits(next);
    } catch {}
  };

  const validatePin = async (inputPin: string) => {
    setAuthLoading(true);
    setAuthError(null);
    try {
      const res = await fetch("/api/admin/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ pin: inputPin }),
      });
      const data = await res.json();
      if (res.ok && data.authorized) {
        setIsAuthenticated(true);
        sessionStorage.setItem("cef_admin_pin", inputPin);
        try {
          localStorage.setItem("cef_admin_device", "true");
          setExcludeMyVisits(true);
        } catch {}
        loadDashboardData(inputPin);
      } else {
        setAuthError(data.error || "PIN incorrecto");
        sessionStorage.removeItem("cef_admin_pin");
      }
    } catch {
      setAuthError("Error de conexión con el servidor");
    } finally {
      setAuthLoading(false);
    }
  };

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!pin.trim()) return;
    validatePin(pin.trim());
  };

  const handleLogout = () => {
    sessionStorage.removeItem("cef_admin_pin");
    setIsAuthenticated(false);
    setPin("");
  };

  const loadDashboardData = async (currentPin?: string) => {
    const activePin = currentPin || sessionStorage.getItem("cef_admin_pin");
    if (!activePin) return;

    setLoading(true);
    try {
      const headers = { "x-admin-pin": activePin };

      const [resStats, resUsers, resTickets] = await Promise.all([
        fetch("/api/admin/stats", { headers }),
        fetch("/api/admin/users", { headers }),
        fetch("/api/admin/tickets", { headers }),
      ]);

      if (resStats.ok) {
        const d = await resStats.json();
        setStats(d.stats);
      }
      if (resUsers.ok) {
        const d = await resUsers.json();
        setUsers(d.users || []);
      }
      if (resTickets.ok) {
        const d = await resTickets.json();
        setTickets(d.tickets || []);
      }
    } catch (err) {
      console.error("Error al cargar datos del panel:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleToggleTicketStatus = async (ticketId: string, currentStatus: string) => {
    const activePin = sessionStorage.getItem("cef_admin_pin");
    if (!activePin) return;

    const newStatus = currentStatus === "resuelto" ? "pendiente" : "resuelto";
    try {
      const res = await fetch("/api/admin/tickets", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          "x-admin-pin": activePin,
        },
        body: JSON.stringify({ id: ticketId, status: newStatus }),
      });
      if (res.ok) {
        setTickets((prev) =>
          prev.map((t) => (t.id === ticketId ? { ...t, status: newStatus } : t))
        );
        if (stats) {
          setStats({
            ...stats,
            pendingTickets: newStatus === "resuelto" ? stats.pendingTickets - 1 : stats.pendingTickets + 1,
            resolvedTickets: newStatus === "resuelto" ? stats.resolvedTickets + 1 : stats.resolvedTickets - 1,
          });
        }
      }
    } catch (err) {
      console.error("Error al actualizar ticket:", err);
    }
  };

  const handleDeleteTicket = async (ticketId: string) => {
    if (!confirm("¿Estás seguro de eliminar este ticket de forma permanente?")) return;
    const activePin = sessionStorage.getItem("cef_admin_pin");
    if (!activePin) return;

    try {
      const res = await fetch("/api/admin/tickets", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "x-admin-pin": activePin,
        },
        body: JSON.stringify({ id: ticketId }),
      });
      if (res.ok) {
        setTickets((prev) => prev.filter((t) => t.id !== ticketId));
      }
    } catch (err) {
      console.error("Error al eliminar ticket:", err);
    }
  };

  const handleDeleteUser = async () => {
    if (!userToDelete) return;
    const activePin = sessionStorage.getItem("cef_admin_pin");
    if (!activePin) return;

    setActionLoading(true);
    try {
      const res = await fetch("/api/admin/users", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "x-admin-pin": activePin,
        },
        body: JSON.stringify({ id: userToDelete.id }),
      });
      if (res.ok) {
        setUsers((prev) => prev.filter((u) => u.id !== userToDelete.id));
        setUserToDelete(null);
        if (stats) {
          setStats({
            ...stats,
            totalFamilies: Math.max(0, stats.totalFamilies - 1),
            totalChildren: Math.max(0, stats.totalChildren - userToDelete.children.length),
          });
        }
      } else {
        alert("Error al eliminar el usuario");
      }
    } catch (err) {
      console.error("Error al borrar usuario:", err);
    } finally {
      setActionLoading(false);
    }
  };

  // Filtrado de usuarios
  const filteredUsers = users.filter((u) => {
    const q = userSearch.toLowerCase().trim();
    return (
      u.email.toLowerCase().includes(q) ||
      u.familyName.toLowerCase().includes(q) ||
      u.children.some((c) => c.alias.toLowerCase().includes(q))
    );
  });

  // Filtrado de tickets
  const filteredTickets = tickets.filter((t) => {
    if (ticketFilter === "pendiente") return t.status === "pendiente";
    if (ticketFilter === "resuelto") return t.status === "resuelto";
    return true;
  });

  // 1. PANTALLA DE DESBLOQUEO / PIN GATE
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center p-4">
        <div className="w-full max-w-md bg-slate-800/90 border border-slate-700/80 rounded-3xl p-6 sm:p-8 shadow-2xl text-center space-y-6">
          
          <div className="w-16 h-16 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-400 flex items-center justify-center mx-auto text-3xl shadow-sm">
            <Lock className="w-8 h-8" />
          </div>

          <div>
            <h1 className="font-fun text-xl sm:text-2xl font-bold text-white tracking-wide">
              Centro de Control Privado
            </h1>
            <p className="text-xs sm:text-sm text-slate-400 mt-1 font-sans">
              Acceso restringido para administración y soporte de Código en Familia
            </p>
          </div>

          <form onSubmit={handleLoginSubmit} className="space-y-4">
            <div>
              <input
                type="password"
                required
                autoFocus
                placeholder="Ingresa el PIN de administrador..."
                value={pin}
                onChange={(e) => setPin(e.target.value)}
                className="w-full px-4 py-3 rounded-2xl border border-slate-600 bg-slate-950 text-white font-mono text-center tracking-widest text-lg focus:outline-hidden focus:ring-2 focus:ring-amber-400 shadow-inner"
              />
            </div>

            {authError && (
              <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs font-sans flex items-center justify-center gap-2">
                <AlertCircle className="w-4 h-4 text-rose-400 shrink-0" />
                <span>{authError}</span>
              </div>
            )}

            <button
              type="submit"
              disabled={authLoading}
              className="w-full py-3 rounded-2xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-amber-950 font-bold text-sm shadow-lg shadow-amber-500/20 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
            >
              {authLoading ? (
                <span>Validando acceso...</span>
              ) : (
                <>
                  <Unlock className="w-4 h-4" />
                  <span>Desbloquear Panel</span>
                </>
              )}
            </button>
          </form>

          <div className="pt-2">
            <Link
              href="/"
              className="text-xs text-slate-500 hover:text-slate-300 flex items-center justify-center gap-1 transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Volver a la página principal</span>
            </Link>
          </div>

        </div>
      </div>
    );
  }

  // 2. PANEL DE ADMINISTRACIÓN PRINCIPAL
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans pb-16">
      
      {/* Top Header Bar */}
      <header className="border-b border-slate-800 bg-slate-900/90 backdrop-blur-md sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
          
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-amber-500/20 border border-amber-500/40 text-amber-400 flex items-center justify-center font-bold text-lg shadow-xs">
              🛡️
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-fun text-sm sm:text-base font-bold text-white">
                  Centro de Control
                </span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 font-semibold">
                  En Vivo
                </span>
              </div>
              <span className="text-[11px] text-slate-400 font-mono block">
                codigoenfamilia.org · Administración Privada
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={toggleExcludeDevice}
              className={`hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-xs font-mono transition-colors cursor-pointer ${
                excludeMyVisits
                  ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-300 hover:bg-emerald-500/20"
                  : "bg-slate-800 border-slate-700 text-slate-400 hover:text-slate-200"
              }`}
              title="Haz clic para alternar la exclusión de tus visitas en las estadísticas"
            >
              <span className={`w-2 h-2 rounded-full ${excludeMyVisits ? "bg-emerald-400 animate-pulse" : "bg-slate-500"}`}></span>
              <span>{excludeMyVisits ? "Tus visitas están excluidas" : "Tus visitas se cuentan"}</span>
            </button>

            <button
              onClick={() => loadDashboardData()}
              disabled={loading}
              className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors flex items-center gap-1.5 text-xs font-mono cursor-pointer"
              title="Actualizar datos"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${loading ? "animate-spin text-amber-400" : ""}`} />
              <span className="hidden sm:inline">Refrescar</span>
            </button>

            <button
              onClick={handleLogout}
              className="px-3 py-1.5 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 text-rose-300 border border-rose-500/30 text-xs font-mono font-medium flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Cerrar Sesión</span>
            </button>
          </div>

        </div>

        {/* Tab Navigation */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex gap-2 border-t border-slate-800/80 pt-1">
          {[
            { id: "stats", label: "Estadísticas de Uso", icon: BarChart3, count: null },
            { id: "tickets", label: "Tickets de Soporte", icon: MessageSquare, count: stats?.pendingTickets || 0 },
            { id: "users", label: "Familias & Estudiantes", icon: Users, count: stats?.totalFamilies || 0 },
          ].map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center gap-2 px-4 py-2.5 border-b-2 font-mono text-xs font-medium transition-colors cursor-pointer ${
                  activeTab === tab.id
                    ? "border-amber-400 text-amber-400 bg-amber-500/5"
                    : "border-transparent text-slate-400 hover:text-white"
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{tab.label}</span>
                {tab.count !== null && tab.count > 0 && (
                  <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-bold ${
                    tab.id === "tickets" ? "bg-amber-500 text-slate-950" : "bg-slate-800 text-slate-300"
                  }`}>
                    {tab.count}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </header>

      {/* Main Content Area */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">

        {/* TAB 1: ESTADÍSTICAS & ANALYTICS ANÓNIMO */}
        {activeTab === "stats" && (
          <div className="space-y-8 animate-in fade-in duration-150">
            
            {/* KPI Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              
              <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 shadow-xl space-y-2">
                <div className="flex items-center justify-between text-slate-400 text-xs font-mono">
                  <span>Total Familias</span>
                  <Users className="w-4 h-4 text-cyan-400" />
                </div>
                <div className="text-3xl font-extrabold text-white font-mono">
                  {stats?.totalFamilies ?? 0}
                </div>
                <p className="text-[11px] text-slate-500 font-sans">
                  Cuentas de hogar registradas en PostgreSQL
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 shadow-xl space-y-2">
                <div className="flex items-center justify-between text-slate-400 text-xs font-mono">
                  <span>Total Niños</span>
                  <Sparkles className="w-4 h-4 text-emerald-400" />
                </div>
                <div className="text-3xl font-extrabold text-white font-mono">
                  {stats?.totalChildren ?? 0}
                </div>
                <p className="text-[11px] text-slate-500 font-sans">
                  Perfiles individuales de exploradores creados
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 shadow-xl space-y-2">
                <div className="flex items-center justify-between text-slate-400 text-xs font-mono">
                  <span>Estampas Ganadas</span>
                  <CheckCircle2 className="w-4 h-4 text-amber-400" />
                </div>
                <div className="text-3xl font-extrabold text-white font-mono">
                  {stats?.totalStamps ?? 0}
                </div>
                <p className="text-[11px] text-slate-500 font-sans">
                  Misiones completadas y selladas en pasaporte
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 shadow-xl space-y-2">
                <div className="flex items-center justify-between text-slate-400 text-xs font-mono">
                  <span>Visitas Anónimas</span>
                  <Globe className="w-4 h-4 text-purple-400" />
                </div>
                <div className="text-3xl font-extrabold text-white font-mono">
                  {stats?.totalVisits ?? 0}
                </div>
                <p className="text-[11px] text-purple-400 font-mono">
                  +{stats?.recentVisits7d ?? 0} en los últimos 7 días
                </p>
              </div>

            </div>

            {/* Niveles y Top Páginas */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              
              {/* Desglose por Nivel de Explorador */}
              <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 shadow-xl space-y-5">
                <h3 className="font-fun text-base font-bold text-white flex items-center gap-2">
                  <span>🌱</span> Distribución por Nivel de Aprendizaje
                </h3>
                
                <div className="space-y-4 font-mono text-xs">
                  {[
                    { id: "semillas", label: "Semillas (4-6 años)", color: "bg-emerald-500", count: stats?.levelCounts.semillas ?? 0 },
                    { id: "exploradores", label: "Exploradores (7-9 años)", color: "bg-cyan-500", count: stats?.levelCounts.exploradores ?? 0 },
                    { id: "inventores", label: "Inventores (10-12 años)", color: "bg-amber-500", count: stats?.levelCounts.inventores ?? 0 },
                    { id: "creadores", label: "Creadores (13-15 años)", color: "bg-purple-500", count: stats?.levelCounts.creadores ?? 0 },
                  ].map((lvl) => {
                    const total = stats?.totalChildren || 1;
                    const pct = Math.round((lvl.count / total) * 100);
                    return (
                      <div key={lvl.id} className="space-y-1.5">
                        <div className="flex justify-between text-slate-300 font-medium">
                          <span>{lvl.label}</span>
                          <span className="text-slate-400">{lvl.count} niños ({pct}%)</span>
                        </div>
                        <div className="w-full h-2 rounded-full bg-slate-800 overflow-hidden">
                          <div
                            className={`h-full ${lvl.color} transition-all duration-500`}
                            style={{ width: `${pct}%` }}
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Secciones y Páginas más consultadas */}
              <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 shadow-xl space-y-5">
                <h3 className="font-fun text-base font-bold text-white flex items-center gap-2">
                  <BarChart3 className="w-4 h-4 text-amber-400" />
                  <span>Secciones más Visitadas (Muestra Anónima)</span>
                </h3>

                <div className="space-y-2.5 font-mono text-xs">
                  {stats?.topPages && stats.topPages.length > 0 ? (
                    stats.topPages.slice(0, 7).map((p, idx) => (
                      <div
                        key={idx}
                        className="flex items-center justify-between p-2.5 rounded-xl bg-slate-800/50 border border-slate-800 hover:border-slate-700 transition-colors"
                      >
                        <div className="flex items-center gap-2 truncate pr-2">
                          <span className="w-5 h-5 rounded-md bg-slate-800 text-slate-400 flex items-center justify-center text-[10px] font-bold">
                            {idx + 1}
                          </span>
                          <span className="text-slate-200 truncate">{p.path}</span>
                        </div>
                        <span className="px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-300 font-bold shrink-0">
                          {p.count} visitas
                        </span>
                      </div>
                    ))
                  ) : (
                    <div className="text-xs text-slate-500 italic py-4 text-center">
                      Registrando primeras visitas anónimas de la plataforma...
                    </div>
                  )}
                </div>
              </div>

            </div>

          </div>
        )}

        {/* TAB 2: TICKETS DE SOPORTE & FEEDBACK */}
        {activeTab === "tickets" && (
          <div className="space-y-6 animate-in fade-in duration-150">
            
            {/* Toolbar & Filters */}
            <div className="flex flex-wrap items-center justify-between gap-4 p-4 rounded-2xl bg-slate-900 border border-slate-800">
              <div className="flex items-center gap-2 text-xs font-mono">
                <Filter className="w-4 h-4 text-slate-400" />
                <span>Filtrar por:</span>
                {(
                  [
                    { id: "todos", label: "Todos", count: tickets.length },
                    { id: "pendiente", label: "Pendientes", count: stats?.pendingTickets || 0 },
                    { id: "resuelto", label: "Resueltos", count: stats?.resolvedTickets || 0 },
                  ] as const
                ).map((f) => (
                  <button
                    key={f.id}
                    onClick={() => setTicketFilter(f.id)}
                    className={`px-3 py-1.5 rounded-xl transition-all cursor-pointer ${
                      ticketFilter === f.id
                        ? "bg-amber-400 text-slate-950 font-bold"
                        : "bg-slate-800 text-slate-400 hover:text-white"
                    }`}
                  >
                    {f.label} ({f.count})
                  </button>
                ))}
              </div>

              <div className="text-xs font-mono text-slate-400">
                Total en bandeja: <strong className="text-white">{filteredTickets.length}</strong>
              </div>
            </div>

            {/* Ticket Cards List */}
            {filteredTickets.length === 0 ? (
              <div className="p-12 text-center rounded-3xl bg-slate-900/60 border border-slate-800 space-y-3">
                <div className="text-3xl">🎉</div>
                <h4 className="font-fun text-lg font-bold text-white">
                  No hay tickets en esta categoría
                </h4>
                <p className="text-xs text-slate-400 font-sans">
                  Cuando las familias dejen dudas o reporten problemas desde la web, aparecerán aquí.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-4">
                {filteredTickets.map((ticket) => {
                  const isResolved = ticket.status === "resuelto";
                  const catLabels: Record<string, { label: string; icon: string; color: string }> = {
                    duda_mision: { label: "Duda en Misión", icon: "🧩", color: "text-cyan-400 bg-cyan-950/60 border-cyan-800" },
                    error_tecnico: { label: "Error / Bug", icon: "🐛", color: "text-rose-400 bg-rose-950/60 border-rose-800" },
                    sugerencia: { label: "Sugerencia", icon: "💡", color: "text-amber-400 bg-amber-950/60 border-amber-800" },
                    otro: { label: "Otra Consulta", icon: "❓", color: "text-purple-400 bg-purple-950/60 border-purple-800" },
                  };
                  const badge = catLabels[ticket.category] || { label: ticket.category, icon: "💌", color: "text-slate-300 bg-slate-800 border-slate-700" };

                  return (
                    <div
                      key={ticket.id}
                      className={`p-6 rounded-2xl border transition-all ${
                        isResolved
                          ? "bg-slate-900/50 border-slate-800/80 opacity-75"
                          : "bg-slate-900 border-slate-700 shadow-xl"
                      }`}
                    >
                      <div className="flex flex-wrap items-start justify-between gap-3 mb-4">
                        <div className="flex flex-wrap items-center gap-2">
                          <span className={`px-2.5 py-1 rounded-full text-xs font-mono font-bold border flex items-center gap-1.5 ${badge.color}`}>
                            <span>{badge.icon}</span>
                            <span>{badge.label}</span>
                          </span>

                          <span className={`px-2.5 py-1 rounded-full text-xs font-mono font-bold flex items-center gap-1 ${
                            isResolved
                              ? "bg-emerald-950/60 text-emerald-400 border border-emerald-800"
                              : "bg-amber-950/60 text-amber-400 border border-amber-800 animate-pulse"
                          }`}>
                            {isResolved ? <CheckCircle2 className="w-3.5 h-3.5" /> : <Clock className="w-3.5 h-3.5" />}
                            <span>{isResolved ? "Resuelto" : "Pendiente de Atención"}</span>
                          </span>

                          <span className="text-xs text-slate-500 font-mono">
                            {new Date(ticket.createdAt).toLocaleString("es-CO")}
                          </span>
                        </div>

                        {/* Acciones */}
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => handleToggleTicketStatus(ticket.id, ticket.status)}
                            className={`px-3 py-1.5 rounded-xl text-xs font-mono font-bold transition-all cursor-pointer ${
                              isResolved
                                ? "bg-slate-800 text-slate-400 hover:text-white"
                                : "bg-emerald-600 hover:bg-emerald-500 text-white shadow-md"
                            }`}
                          >
                            {isResolved ? "Marcar Pendiente" : "✓ Marcar Resuelto"}
                          </button>

                          <button
                            onClick={() => handleDeleteTicket(ticket.id)}
                            className="p-1.5 rounded-xl bg-slate-800 hover:bg-rose-900/60 text-slate-400 hover:text-rose-300 transition-colors cursor-pointer"
                            title="Eliminar ticket"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>

                      {/* Remitente y Contacto */}
                      <div className="flex flex-wrap items-center gap-3 pb-3 mb-3 border-b border-slate-800 text-xs font-mono">
                        <div className="flex items-center gap-1.5 text-white font-bold">
                          <span className="text-base">🏡</span>
                          <span>{ticket.familyName}</span>
                        </div>

                        <a
                          href={`mailto:${ticket.email}?subject=Respuesta de soporte de Código en Familia`}
                          className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-cyan-300 transition-colors"
                          title="Responder por correo"
                        >
                          <Mail className="w-3.5 h-3.5" />
                          <span>{ticket.email}</span>
                          <ExternalLink className="w-3 h-3 ml-0.5 opacity-60" />
                        </a>
                      </div>

                      {/* Mensaje */}
                      <p className="text-sm text-slate-200 leading-relaxed font-sans mb-4 whitespace-pre-wrap">
                        {ticket.message}
                      </p>

                      {/* Metadatos técnicos de contexto */}
                      <div className="pt-3 border-t border-slate-800/80 flex flex-wrap items-center gap-4 text-[11px] font-mono text-slate-400">
                        {ticket.missionId && (
                          <div className="flex items-center gap-1.5 text-cyan-400">
                            <Compass className="w-3.5 h-3.5" />
                            <Link href={`/misiones/${ticket.missionId}`} target="_blank" className="hover:underline flex items-center gap-1">
                              <span>Misión: {ticket.missionId}</span>
                              <ExternalLink className="w-3 h-3" />
                            </Link>
                          </div>
                        )}

                        {ticket.deviceInfo && (
                          <div className="flex items-center gap-1 text-slate-500">
                            <Laptop className="w-3.5 h-3.5" />
                            <span className="truncate max-w-xs">{ticket.deviceInfo}</span>
                          </div>
                        )}
                      </div>

                    </div>
                  );
                })}
              </div>
            )}

          </div>
        )}

        {/* TAB 3: GESTIÓN DE USUARIOS / FAMILIAS */}
        {activeTab === "users" && (
          <div className="space-y-6 animate-in fade-in duration-150">
            
            {/* Buscador de usuarios */}
            <div className="flex items-center justify-between gap-4 p-4 rounded-2xl bg-slate-900 border border-slate-800">
              <div className="relative flex-1 max-w-md">
                <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Buscar por correo, familia o explorador..."
                  value={userSearch}
                  onChange={(e) => setUserSearch(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 rounded-xl bg-slate-950 border border-slate-700 text-xs font-mono text-white placeholder-slate-500 focus:outline-hidden focus:ring-2 focus:ring-amber-400"
                />
              </div>

              <div className="text-xs font-mono text-slate-400">
                Familias registradas: <strong className="text-white">{users.length}</strong>
              </div>
            </div>

            {/* Tabla de Usuarios */}
            {filteredUsers.length === 0 ? (
              <div className="p-12 text-center rounded-3xl bg-slate-900/60 border border-slate-800 space-y-2">
                <div className="text-3xl">🔍</div>
                <h4 className="font-fun text-lg font-bold text-white">No se encontraron familias</h4>
                <p className="text-xs text-slate-400 font-sans">
                  {userSearch ? "Intenta con otro término de búsqueda." : "Aún no hay familias registradas en el sistema."}
                </p>
              </div>
            ) : (
              <div className="rounded-2xl border border-slate-800 bg-slate-900 overflow-hidden shadow-xl">
                <div className="overflow-x-auto">
                  <table className="w-full text-left font-mono text-xs border-collapse">
                    <thead>
                      <tr className="border-b border-slate-800 bg-slate-950/60 text-slate-400 uppercase text-[11px]">
                        <th className="py-3 px-4">Familia / Hogar</th>
                        <th className="py-3 px-4">Correo Electrónico</th>
                        <th className="py-3 px-4">Exploradores (Niños)</th>
                        <th className="py-3 px-4">Estampas Ganadas</th>
                        <th className="py-3 px-4">Fecha Registro</th>
                        <th className="py-3 px-4 text-right">Acciones</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800/60">
                      {filteredUsers.map((u) => {
                        const totalStamps = u.children.reduce((acc, c) => acc + (c.stamps?.length || 0), 0);
                        return (
                          <tr key={u.id} className="hover:bg-slate-800/40 transition-colors">
                            <td className="py-3.5 px-4 font-bold text-white font-fun text-sm">
                              {u.familyName}
                            </td>
                            <td className="py-3.5 px-4 text-slate-300">
                              <a href={`mailto:${u.email}`} className="hover:text-cyan-400 transition-colors">
                                {u.email}
                              </a>
                            </td>
                            <td className="py-3.5 px-4">
                              <div className="flex flex-wrap gap-1.5">
                                {u.children.map((c) => (
                                  <span
                                    key={c.id}
                                    className="px-2 py-0.5 rounded-lg bg-slate-800 border border-slate-700 text-slate-300 text-[11px] flex items-center gap-1"
                                  >
                                    <span>{c.avatar}</span>
                                    <span>{c.alias}</span>
                                    <span className="text-[9px] uppercase text-amber-400 font-bold">({c.currentLevel})</span>
                                  </span>
                                ))}
                              </div>
                            </td>
                            <td className="py-3.5 px-4 font-bold text-emerald-400">
                              {totalStamps} misiones
                            </td>
                            <td className="py-3.5 px-4 text-slate-400 text-[11px]">
                              {new Date(u.createdAt).toLocaleDateString("es-CO")}
                            </td>
                            <td className="py-3.5 px-4 text-right">
                              <button
                                onClick={() => setUserToDelete(u)}
                                className="px-2.5 py-1.5 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 text-rose-300 border border-rose-500/30 text-xs font-mono font-medium transition-colors cursor-pointer flex items-center gap-1 ml-auto"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                                <span>Eliminar</span>
                              </button>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

          </div>
        )}

      </main>

      {/* MODAL DE CONFIRMACIÓN PARA BORRAR USUARIO */}
      {userToDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-xs">
          <div className="w-full max-w-md bg-slate-900 border border-slate-700 rounded-3xl p-6 shadow-2xl space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-rose-500/10 border border-rose-500/30 text-rose-400 flex items-center justify-center text-2xl mx-auto">
              ⚠️
            </div>
            <div className="text-center space-y-1.5">
              <h3 className="font-fun text-lg font-bold text-white">
                ¿Eliminar esta cuenta familiar?
              </h3>
              <p className="text-xs text-slate-400 font-sans leading-relaxed">
                Estás a punto de eliminar a <strong className="text-white">{userToDelete.familyName}</strong> ({userToDelete.email}). Se borrarán todos los perfiles de sus niños y sus estampas ganadas. Esta acción no se puede deshacer.
              </p>
            </div>

            <div className="flex items-center gap-3 pt-2">
              <button
                onClick={() => setUserToDelete(null)}
                disabled={actionLoading}
                className="flex-1 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-mono font-bold transition-colors cursor-pointer"
              >
                Cancelar
              </button>
              <button
                onClick={handleDeleteUser}
                disabled={actionLoading}
                className="flex-1 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-500 text-white text-xs font-mono font-bold shadow-md shadow-rose-600/30 transition-all cursor-pointer disabled:opacity-50"
              >
                {actionLoading ? "Eliminando..." : "Sí, Eliminar"}
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
