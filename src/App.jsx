import { useState } from "react";
import "./App.css";

// ─── Counter ────────────────────────────────────────────────────────────────
function Counter() {
  const [count, setCount] = useState(0);

  return (
    <section className="card">
      <h2 className="section-title">Counter</h2>
      <div className="counter-display">{count}</div>
      <div className="btn-group">
        <button className="btn btn-success" onClick={() => setCount((c) => c + 1)}>
          + Increment
        </button>
        <button className="btn btn-danger" onClick={() => setCount((c) => c - 1)}>
          − Decrement
        </button>
        <button className="btn btn-secondary" onClick={() => setCount(0)}>
          ↺ Reset
        </button>
      </div>
    </section>
  );
}

// ─── Todo ────────────────────────────────────────────────────────────────────
function TodoApp() {
  const [todos, setTodos] = useState([
    { id: 1, text: "Learn React", done: false },
    { id: 2, text: "Build something cool", done: false },
  ]);
  const [input, setInput] = useState("");

  const addTodo = () => {
    const trimmed = input.trim();
    if (!trimmed) return;
    setTodos((prev) => [...prev, { id: Date.now(), text: trimmed, done: false }]);
    setInput("");
  };

  const toggleTodo = (id) =>
    setTodos((prev) =>
      prev.map((t) => (t.id === id ? { ...t, done: !t.done } : t))
    );

  const deleteTodo = (id) =>
    setTodos((prev) => prev.filter((t) => t.id !== id));

  const handleKey = (e) => e.key === "Enter" && addTodo();

  return (
    <section className="card">
      <h2 className="section-title">Todo List</h2>
      <div className="todo-input-row">
        <input
          className="text-input"
          placeholder="Add a new task…"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKey}
        />
        <button className="btn btn-primary" onClick={addTodo}>
          Add
        </button>
      </div>

      {todos.length === 0 && (
        <p className="empty-msg">No tasks yet. Add one above!</p>
      )}

      <ul className="todo-list">
        {todos.map((todo) => (
          <li key={todo.id} className={`todo-item${todo.done ? " done" : ""}`}>
            <button
              className={`check-btn${todo.done ? " checked" : ""}`}
              onClick={() => toggleTodo(todo.id)}
              aria-label="Toggle complete"
            >
              {todo.done ? "✓" : ""}
            </button>
            <span className="todo-text">{todo.text}</span>
            <button
              className="delete-btn"
              onClick={() => deleteTodo(todo.id)}
              aria-label="Delete"
            >
              ✕
            </button>
          </li>
        ))}
      </ul>

      <p className="todo-summary">
        {todos.filter((t) => t.done).length} / {todos.length} completed
      </p>
    </section>
  );
}

// ─── Contact Form ─────────────────────────────────────────────────────────────
function ContactForm() {
  const empty = { name: "", email: "", message: "" };
  const [form, setForm] = useState(empty);
  const [submitted, setSubmitted] = useState(null);
  const [errors, setErrors] = useState({});

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = "Name is required.";
    if (!form.email.trim()) {
      e.email = "Email is required.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      e.email = "Enter a valid email address.";
    }
    if (!form.message.trim()) e.message = "Message is required.";
    return e;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const e2 = validate();
    if (Object.keys(e2).length) {
      setErrors(e2);
      return;
    }
    setSubmitted({ ...form, submittedAt: new Date().toLocaleString() });
    setForm(empty);
    setErrors({});
  };

  return (
    <section className="card">
      <h2 className="section-title">Contact Form</h2>
      <form className="contact-form" onSubmit={handleSubmit} noValidate>
        <div className="field">
          <label htmlFor="name">Name</label>
          <input
            id="name"
            name="name"
            className={`text-input${errors.name ? " input-error" : ""}`}
            placeholder="Your name"
            value={form.name}
            onChange={handleChange}
          />
          {errors.name && <span className="error-msg">{errors.name}</span>}
        </div>

        <div className="field">
          <label htmlFor="email">Email</label>
          <input
            id="email"
            name="email"
            type="email"
            className={`text-input${errors.email ? " input-error" : ""}`}
            placeholder="you@example.com"
            value={form.email}
            onChange={handleChange}
          />
          {errors.email && <span className="error-msg">{errors.email}</span>}
        </div>

        <div className="field">
          <label htmlFor="message">Message</label>
          <textarea
            id="message"
            name="message"
            className={`text-input textarea${errors.message ? " input-error" : ""}`}
            placeholder="Write your message…"
            rows={4}
            value={form.message}
            onChange={handleChange}
          />
          {errors.message && <span className="error-msg">{errors.message}</span>}
        </div>

        <button type="submit" className="btn btn-primary submit-btn">
          Send Message
        </button>
      </form>

      {submitted && (
        <div className="submitted-card">
          <h3>Message received!</h3>
          <p><strong>Name:</strong> {submitted.name}</p>
          <p><strong>Email:</strong> {submitted.email}</p>
          <p><strong>Message:</strong> {submitted.message}</p>
          <p className="submitted-time">Sent at {submitted.submittedAt}</p>
        </div>
      )}
    </section>
  );
}

// ─── App ──────────────────────────────────────────────────────────────────────
export default function App() {
  return (
    <div className="app">
      <header className="app-header">
        <h1>React Interactive Demo</h1>
        <p>Counter · Todo · Contact Form</p>
      </header>
      <main className="sections">
        <Counter />
        <TodoApp />
        <ContactForm />
      </main>
    </div>
  );
}
