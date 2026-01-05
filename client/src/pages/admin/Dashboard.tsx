import { useState, useEffect } from "react";
import { useLocation, Link } from "wouter";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Pencil, Trash2, Plus, LogOut, X, Save } from "lucide-react";
import type { TourDate } from "@shared/schema";

export default function AdminDashboard() {
  const [, setLocation] = useLocation();
  const queryClient = useQueryClient();

  const { data: authData, isLoading: authLoading } = useQuery({
    queryKey: ["admin-check"],
    queryFn: async () => {
      const res = await fetch("/api/admin/check", { credentials: "include" });
      return res.json();
    },
  });

  useEffect(() => {
    if (!authLoading && !authData?.isAdmin) {
      setLocation("/admin/login");
    }
  }, [authData, authLoading, setLocation]);

  const logoutMutation = useMutation({
    mutationFn: async () => {
      await fetch("/api/admin/logout", { method: "POST", credentials: "include" });
    },
    onSuccess: () => {
      setLocation("/admin/login");
    },
  });

  if (authLoading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  if (!authData?.isAdmin) {
    return null;
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="bg-secondary text-secondary-foreground px-6 py-4 flex justify-between items-center">
        <h1 className="text-xl font-bold">Admin Dashboard</h1>
        <div className="flex items-center gap-4">
          <Link href="/" className="text-sm hover:text-primary transition-colors">
            View Site
          </Link>
          <button
            onClick={() => logoutMutation.mutate()}
            className="flex items-center gap-2 text-sm hover:text-primary transition-colors"
            data-testid="button-logout"
          >
            <LogOut className="w-4 h-4" /> Logout
          </button>
        </div>
      </header>

      <nav className="border-b border-border px-6">
        <div className="flex gap-6">
          <button
            className="py-4 text-sm font-bold uppercase tracking-widest border-b-2 border-primary text-primary"
            data-testid="tab-tour"
          >
            Tour Dates
          </button>
        </div>
      </nav>

      <main className="p-6 max-w-6xl mx-auto">
        <TourDatesManager />
      </main>
    </div>
  );
}

function TourDatesManager() {
  const queryClient = useQueryClient();
  const [editingId, setEditingId] = useState<number | null>(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [formData, setFormData] = useState({
    city: "",
    state: "",
    venue: "",
    date: "",
    time: "",
    rsvpLink: "",
    description: "",
  });

  const { data: tourDates = [], isLoading } = useQuery<TourDate[]>({
    queryKey: ["tour-dates"],
    queryFn: async () => {
      const res = await fetch("/api/tour-dates");
      return res.json();
    },
  });

  const createMutation = useMutation({
    mutationFn: async (data: typeof formData) => {
      const res = await fetch("/api/tour-dates", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
        credentials: "include",
      });
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tour-dates"] });
      setShowAddForm(false);
      resetForm();
    },
  });

  const updateMutation = useMutation({
    mutationFn: async ({ id, data }: { id: number; data: typeof formData }) => {
      const res = await fetch(`/api/tour-dates/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
        credentials: "include",
      });
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tour-dates"] });
      setEditingId(null);
      resetForm();
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: number) => {
      await fetch(`/api/tour-dates/${id}`, { method: "DELETE", credentials: "include" });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tour-dates"] });
    },
  });

  const resetForm = () => {
    setFormData({ city: "", state: "", venue: "", date: "", time: "", rsvpLink: "", description: "" });
  };

  const startEdit = (tour: TourDate) => {
    setEditingId(tour.id);
    setFormData({
      city: tour.city,
      state: tour.state || "",
      venue: tour.venue || "",
      date: tour.date,
      time: tour.time || "",
      rsvpLink: tour.rsvpLink || "",
      description: tour.description || "",
    });
  };

  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-serif">Tour Dates</h2>
        <button
          onClick={() => setShowAddForm(true)}
          className="flex items-center gap-2 bg-primary text-white px-4 py-2 text-sm font-bold uppercase tracking-widest hover:bg-black transition-colors"
          data-testid="button-add-tour"
        >
          <Plus className="w-4 h-4" /> Add Event
        </button>
      </div>

      {(showAddForm || editingId) && (
        <div className="bg-muted p-6 space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="font-bold">{editingId ? "Edit Event" : "Add New Event"}</h3>
            <button onClick={() => { setShowAddForm(false); setEditingId(null); resetForm(); }}>
              <X className="w-5 h-5" />
            </button>
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            <input
              placeholder="City *"
              value={formData.city}
              onChange={(e) => setFormData({ ...formData, city: e.target.value })}
              className="bg-white border border-border px-4 py-2"
              data-testid="input-tour-city"
            />
            <input
              placeholder="State"
              value={formData.state}
              onChange={(e) => setFormData({ ...formData, state: e.target.value })}
              className="bg-white border border-border px-4 py-2"
              data-testid="input-tour-state"
            />
            <input
              placeholder="Venue"
              value={formData.venue}
              onChange={(e) => setFormData({ ...formData, venue: e.target.value })}
              className="bg-white border border-border px-4 py-2"
              data-testid="input-tour-venue"
            />
            <input
              placeholder="Date * (e.g., March 15, 2026)"
              value={formData.date}
              onChange={(e) => setFormData({ ...formData, date: e.target.value })}
              className="bg-white border border-border px-4 py-2"
              data-testid="input-tour-date"
            />
            <input
              placeholder="Time (e.g., 7:00 PM)"
              value={formData.time}
              onChange={(e) => setFormData({ ...formData, time: e.target.value })}
              className="bg-white border border-border px-4 py-2"
              data-testid="input-tour-time"
            />
            <input
              placeholder="RSVP Link"
              value={formData.rsvpLink}
              onChange={(e) => setFormData({ ...formData, rsvpLink: e.target.value })}
              className="bg-white border border-border px-4 py-2"
              data-testid="input-tour-rsvp"
            />
          </div>
          <textarea
            placeholder="Description"
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            className="w-full bg-white border border-border px-4 py-2"
            rows={3}
            data-testid="input-tour-description"
          />
          <button
            onClick={() => {
              if (editingId) {
                updateMutation.mutate({ id: editingId, data: formData });
              } else {
                createMutation.mutate(formData);
              }
            }}
            disabled={!formData.city || !formData.date}
            className="flex items-center gap-2 bg-primary text-white px-4 py-2 text-sm font-bold uppercase tracking-widest hover:bg-black transition-colors disabled:opacity-50"
            data-testid="button-save-tour"
          >
            <Save className="w-4 h-4" /> Save
          </button>
        </div>
      )}

      <div className="space-y-2">
        {tourDates.map((tour) => (
          <div key={tour.id} className="flex justify-between items-center p-4 border border-border">
            <div>
              <p className="font-bold">{tour.city}{tour.state ? `, ${tour.state}` : ""}</p>
              <p className="text-sm text-muted-foreground">{tour.date} {tour.time && `at ${tour.time}`}</p>
              {tour.venue && <p className="text-sm text-muted-foreground">{tour.venue}</p>}
            </div>
            <div className="flex gap-2">
              <button onClick={() => startEdit(tour)} className="p-2 hover:text-primary" data-testid={`button-edit-tour-${tour.id}`}>
                <Pencil className="w-4 h-4" />
              </button>
              <button onClick={() => deleteMutation.mutate(tour.id)} className="p-2 hover:text-red-600" data-testid={`button-delete-tour-${tour.id}`}>
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
        {tourDates.length === 0 && (
          <p className="text-muted-foreground text-center py-8">No tour dates yet. Add your first event above.</p>
        )}
      </div>
    </div>
  );
}
