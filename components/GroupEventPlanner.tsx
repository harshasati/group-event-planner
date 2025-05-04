import { useState } from "react";
import { motion } from "framer-motion";

interface Event {
  id: number;
  title: string;
  date: string;
  time: string;
  location: string;
  rsvps: number;
}

export default function GroupEventPlanner() {
  const [events, setEvents] = useState<Event[]>([]);
  const [newEvent, setNewEvent] = useState({
    title: "",
    date: "",
    time: "",
    location: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewEvent({ ...newEvent, [e.target.name]: e.target.value });
  };

  const addEvent = () => {
    if (!newEvent.title || !newEvent.date || !newEvent.time || !newEvent.location) return;
    const newEntry: Event = {
      id: Date.now(),
      ...newEvent,
      rsvps: 0,
    };
    setEvents([...events, newEntry]);
    setNewEvent({ title: "", date: "", time: "", location: "" });
  };

  const rsvpToEvent = (id: number) => {
    setEvents(events.map(event => (
      event.id === id ? { ...event, rsvps: event.rsvps + 1 } : event
    )));
  };

  return (
    <div className="font-sans text-gray-800 min-h-screen bg-gradient-to-r from-pink-300 via-yellow-300 to-purple-400 flex flex-col">
      {/* Navbar */}
      <nav className="bg-gradient-to-r from-indigo-600 to-blue-500 p-6 flex justify-between items-center shadow-xl">
        <h1 className="text-3xl font-extrabold text-white">Event Planner</h1>
        <div className="space-x-6">
          <a href="#" className="text-lg text-white hover:text-yellow-300 transition duration-200">Home</a>
          <a href="#" className="text-lg text-white hover:text-yellow-300 transition duration-200">About</a>
          <a href="#" className="text-lg text-white hover:text-yellow-300 transition duration-200">Contact</a>
        </div>
      </nav>

      {/* Landing */}
      <header className="text-center py-16 px-6 bg-gradient-to-r from-pink-500 to-yellow-400">
        <h2 className="text-5xl font-semibold text-white mb-4">Plan and RSVP to Events Easily</h2>
        <p className="text-lg text-white">Collaborate, schedule, and confirm group events with ease.</p>
      </header>

      {/* Event Form */}
      <section className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-2xl mb-12">
        <h3 className="text-3xl font-semibold text-gray-800 mb-6">Add New Event</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <input
            type="text"
            name="title"
            placeholder="Event Title"
            value={newEvent.title}
            onChange={handleInputChange}
            className="border border-indigo-500 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 transition duration-200"
          />
          <input
            type="date"
            name="date"
            value={newEvent.date}
            onChange={handleInputChange}
            className="border border-indigo-500 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 transition duration-200"
          />
          <input
            type="time"
            name="time"
            value={newEvent.time}
            onChange={handleInputChange}
            className="border border-indigo-500 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 transition duration-200"
          />
          <input
            type="text"
            name="location"
            placeholder="Location"
            value={newEvent.location}
            onChange={handleInputChange}
            className="border border-indigo-500 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 transition duration-200"
          />
        </div>
        <button
          onClick={addEvent}
          className="mt-6 px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-600 text-white rounded-lg hover:from-pink-600 hover:to-purple-500 transition duration-300"
        >
          Add Event
        </button>
      </section>

      {/* Events List */}
      <section className="max-w-4xl mx-auto p-6">
        <h3 className="text-3xl font-semibold text-gray-800 mb-6">Upcoming Events</h3>
        {events.length === 0 ? (
          <p className="text-gray-500 text-xl">No events yet. Add one above!</p>
        ) : (
          <div className="space-y-6">
            {events.map(event => (
              <motion.div
                key={event.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-gradient-to-r from-yellow-400 to-pink-500 p-6 rounded-lg shadow-2xl hover:shadow-3xl transition duration-300"
              >
                <h4 className="text-2xl font-bold text-white">{event.title}</h4>
                <p className="text-sm text-white">
                  📅 {event.date} | 🕒 {event.time} | 📍 {event.location}
                </p>
                <div className="mt-4 flex justify-between items-center">
                  <p className="text-sm font-medium text-white">RSVPs: {event.rsvps}</p>
                  <button
                    onClick={() => rsvpToEvent(event.id)}
                    className="px-4 py-2 bg-gradient-to-r from-green-400 to-green-600 text-white rounded-lg hover:from-green-500 hover:to-green-700 transition duration-200 text-sm"
                  >
                    RSVP
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </section>

      {/* Footer */}
      <footer className="mt-auto bg-gradient-to-r from-pink-400 to-yellow-400 text-center p-4 text-sm text-white">
        © 2025 Group Event Planner. All rights reserved.
      </footer>
    </div>
  );
}
