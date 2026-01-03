import { useState, useEffect } from "react";
import { useLocation, Link } from "wouter";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Pencil, Trash2, Plus, LogOut, X, Save } from "lucide-react";
import type { TourDate, Testimonial } from "@shared/schema";

export default function AdminDashboard() {
  const [, setLocation] = useLocation();
  const [activeTab, setActiveTab] = useState<"tour" | "content" | "testimonials">("tour");
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
            onClick={() => setActiveTab("tour")}
            className={`py-4 text-sm font-bold uppercase tracking-widest border-b-2 transition-colors ${
              activeTab === "tour" ? "border-primary text-primary" : "border-transparent hover:text-primary"
            }`}
            data-testid="tab-tour"
          >
            Tour Dates
          </button>
          <button
            onClick={() => setActiveTab("content")}
            className={`py-4 text-sm font-bold uppercase tracking-widest border-b-2 transition-colors ${
              activeTab === "content" ? "border-primary text-primary" : "border-transparent hover:text-primary"
            }`}
            data-testid="tab-content"
          >
            Page Content
          </button>
          <button
            onClick={() => setActiveTab("testimonials")}
            className={`py-4 text-sm font-bold uppercase tracking-widest border-b-2 transition-colors ${
              activeTab === "testimonials" ? "border-primary text-primary" : "border-transparent hover:text-primary"
            }`}
            data-testid="tab-testimonials"
          >
            Testimonials
          </button>
        </div>
      </nav>

      <main className="p-6 max-w-6xl mx-auto">
        {activeTab === "tour" && <TourDatesManager />}
        {activeTab === "content" && <ContentManager />}
        {activeTab === "testimonials" && <TestimonialsManager />}
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

function ContentManager() {
  const queryClient = useQueryClient();
  const [selectedPage, setSelectedPage] = useState<string | null>(null);
  const [content, setContent] = useState("");

  const pages = [
    { key: "home_hero", label: "Home - Hero Section" },
    { key: "home_intro", label: "Home - Introduction" },
    { key: "book_description", label: "Book - Description" },
    { key: "book_endorsements", label: "Book - Endorsements" },
    { key: "tour_intro", label: "Tour - Introduction" },
    { key: "speaking_intro", label: "Speaking - Introduction" },
    { key: "speaking_talks", label: "Speaking - Signature Talks" },
    { key: "consulting_intro", label: "Consulting - Introduction" },
    { key: "consulting_testimonials", label: "Consulting - Testimonials" },
    { key: "about_bio", label: "About - Biography" },
    { key: "privacy_policy", label: "Privacy Policy" },
    { key: "acknowledgement", label: "Acknowledgement / Land & Lineage" },
  ];

  const { data: pageContent } = useQuery({
    queryKey: ["page-content", selectedPage],
    queryFn: async () => {
      if (!selectedPage) return null;
      const res = await fetch(`/api/content/${selectedPage}`);
      return res.json();
    },
    enabled: !!selectedPage,
  });

  useEffect(() => {
    if (pageContent?.content) {
      setContent(pageContent.content);
    } else {
      setContent("");
    }
  }, [pageContent]);

  const updateMutation = useMutation({
    mutationFn: async () => {
      const res = await fetch(`/api/content/${selectedPage}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content }),
        credentials: "include",
      });
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["page-content"] });
      queryClient.invalidateQueries({ queryKey: ["page-content-multiple"] });
      alert("Content saved successfully!");
    },
  });

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-serif">Page Content</h2>
      
      <div className="grid md:grid-cols-3 gap-6">
        <div className="space-y-2">
          <h3 className="font-bold text-sm uppercase tracking-widest text-muted-foreground">Select Page Section</h3>
          <div className="space-y-1">
            {pages.map((page) => (
              <button
                key={page.key}
                onClick={() => setSelectedPage(page.key)}
                className={`w-full text-left px-4 py-2 text-sm transition-colors ${
                  selectedPage === page.key ? "bg-primary text-white" : "hover:bg-muted"
                }`}
                data-testid={`button-page-${page.key}`}
              >
                {page.label}
              </button>
            ))}
          </div>
        </div>

        <div className="md:col-span-2">
          {selectedPage ? (
            <div className="space-y-4">
              <h3 className="font-bold">{pages.find(p => p.key === selectedPage)?.label}</h3>
              <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className="w-full h-96 bg-white border border-border px-4 py-2 font-mono text-sm"
                placeholder="Enter content here... Use plain text or basic formatting."
                data-testid="textarea-content"
              />
              <button
                onClick={() => updateMutation.mutate()}
                disabled={updateMutation.isPending}
                className="flex items-center gap-2 bg-primary text-white px-4 py-2 text-sm font-bold uppercase tracking-widest hover:bg-black transition-colors disabled:opacity-50"
                data-testid="button-save-content"
              >
                <Save className="w-4 h-4" /> {updateMutation.isPending ? "Saving..." : "Save Content"}
              </button>
            </div>
          ) : (
            <p className="text-muted-foreground py-8 text-center">Select a page section to edit its content.</p>
          )}
        </div>
      </div>
    </div>
  );
}

const PLACEMENT_OPTIONS = [
  { value: "home", label: "Home Page" },
  { value: "book", label: "Book Page" },
  { value: "consulting", label: "Consulting Page" },
];

function TestimonialsManager() {
  const queryClient = useQueryClient();
  const [editingId, setEditingId] = useState<number | null>(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    title: "",
    quote: "",
    placement: [] as string[],
    sortOrder: 0,
  });

  const { data: testimonials = [], isLoading } = useQuery<Testimonial[]>({
    queryKey: ["testimonials"],
    queryFn: async () => {
      const res = await fetch("/api/testimonials", { credentials: "include" });
      return res.json();
    },
  });

  const createMutation = useMutation({
    mutationFn: async (data: typeof formData) => {
      const res = await fetch("/api/testimonials", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
        credentials: "include",
      });
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["testimonials"] });
      setShowAddForm(false);
      resetForm();
    },
  });

  const updateMutation = useMutation({
    mutationFn: async ({ id, data }: { id: number; data: typeof formData }) => {
      const res = await fetch(`/api/testimonials/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
        credentials: "include",
      });
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["testimonials"] });
      setEditingId(null);
      resetForm();
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: number) => {
      await fetch(`/api/testimonials/${id}`, { method: "DELETE", credentials: "include" });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["testimonials"] });
    },
  });

  const resetForm = () => {
    setFormData({ name: "", title: "", quote: "", placement: [], sortOrder: 0 });
  };

  const startEdit = (testimonial: Testimonial) => {
    setEditingId(testimonial.id);
    setFormData({
      name: testimonial.name,
      title: testimonial.title || "",
      quote: testimonial.quote,
      placement: testimonial.placement,
      sortOrder: testimonial.sortOrder || 0,
    });
  };

  const togglePlacement = (value: string) => {
    setFormData((prev) => ({
      ...prev,
      placement: prev.placement.includes(value)
        ? prev.placement.filter((p) => p !== value)
        : [...prev.placement, value],
    }));
  };

  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-serif">Testimonials</h2>
        <button
          onClick={() => setShowAddForm(true)}
          className="flex items-center gap-2 bg-primary text-white px-4 py-2 text-sm font-bold uppercase tracking-widest hover:bg-black transition-colors"
          data-testid="button-add-testimonial"
        >
          <Plus className="w-4 h-4" /> Add Testimonial
        </button>
      </div>

      {(showAddForm || editingId) && (
        <div className="bg-muted p-6 space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="font-bold">{editingId ? "Edit Testimonial" : "Add New Testimonial"}</h3>
            <button onClick={() => { setShowAddForm(false); setEditingId(null); resetForm(); }}>
              <X className="w-5 h-5" />
            </button>
          </div>
          <div className="grid gap-4">
            <input
              placeholder="Name *"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="bg-white border border-border px-4 py-2"
              data-testid="input-testimonial-name"
            />
            <input
              placeholder="Title/Role (e.g., 'Author, Speaker')"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="bg-white border border-border px-4 py-2"
              data-testid="input-testimonial-title"
            />
            <textarea
              placeholder="Quote *"
              value={formData.quote}
              onChange={(e) => setFormData({ ...formData, quote: e.target.value })}
              className="bg-white border border-border px-4 py-2 h-32"
              data-testid="input-testimonial-quote"
            />
            <div>
              <p className="text-sm font-bold mb-2">Display on Pages:</p>
              <div className="flex gap-4">
                {PLACEMENT_OPTIONS.map((option) => (
                  <label key={option.value} className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.placement.includes(option.value)}
                      onChange={() => togglePlacement(option.value)}
                      className="w-4 h-4"
                      data-testid={`checkbox-placement-${option.value}`}
                    />
                    <span className="text-sm">{option.label}</span>
                  </label>
                ))}
              </div>
            </div>
            <input
              type="number"
              placeholder="Sort Order (lower = first)"
              value={formData.sortOrder}
              onChange={(e) => setFormData({ ...formData, sortOrder: parseInt(e.target.value) || 0 })}
              className="bg-white border border-border px-4 py-2 w-48"
              data-testid="input-testimonial-sort"
            />
          </div>
          <button
            onClick={() => editingId ? updateMutation.mutate({ id: editingId, data: formData }) : createMutation.mutate(formData)}
            disabled={!formData.name || !formData.quote || formData.placement.length === 0}
            className="bg-primary text-white px-6 py-2 text-sm font-bold uppercase tracking-widest hover:bg-black transition-colors disabled:opacity-50"
            data-testid="button-save-testimonial"
          >
            {editingId ? "Update" : "Add"} Testimonial
          </button>
        </div>
      )}

      <div className="space-y-2">
        {testimonials.map((testimonial) => (
          <div key={testimonial.id} className="p-4 border border-border">
            <div className="flex justify-between items-start">
              <div className="flex-1">
                <p className="font-bold">{testimonial.name}</p>
                {testimonial.title && <p className="text-sm text-muted-foreground">{testimonial.title}</p>}
                <p className="text-sm mt-2 italic">"{testimonial.quote}"</p>
                <div className="flex gap-2 mt-2">
                  {testimonial.placement.map((p) => (
                    <span key={p} className="bg-muted px-2 py-1 text-xs uppercase tracking-widest">
                      {PLACEMENT_OPTIONS.find((o) => o.value === p)?.label || p}
                    </span>
                  ))}
                </div>
              </div>
              <div className="flex gap-2">
                <button onClick={() => startEdit(testimonial)} className="p-2 hover:text-primary" data-testid={`button-edit-testimonial-${testimonial.id}`}>
                  <Pencil className="w-4 h-4" />
                </button>
                <button onClick={() => deleteMutation.mutate(testimonial.id)} className="p-2 hover:text-red-600" data-testid={`button-delete-testimonial-${testimonial.id}`}>
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
        {testimonials.length === 0 && (
          <p className="text-muted-foreground text-center py-8">No testimonials yet. Add your first one above.</p>
        )}
      </div>
    </div>
  );
}

