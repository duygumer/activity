import { useState } from "react";
import CreateEventForm from "@/components/event/CreateEventForm";
import EventCard from "@/components/event/EventCard";

interface Event {
  id: string;
  title: string;
  location: string;
  date: string;
  time: string;
  currentParticipants: number;
  maxParticipants?: number;
  description?: string;
  creatorName: string;
  isJoined?: boolean;
}

export default function FeedScreen() {
  const [events, setEvents] = useState<Event[]>([
    {
      id: "1",
      title: "Halı Saha Maçı",
      location: "Fethiye",
      date: "2026-01-25",
      time: "21:00",
      description:
        "Salı günü Fethiye bölgesinde harika bir halı saha maçı yapıyoruz. Seviye fark etmiyor, herkes hoş geldin!",
      currentParticipants: 7,
      maxParticipants: 10,
      creatorName: "Ahmet K.",
      isJoined: false,
    },
    {
      id: "2",
      title: "Hafta Sonu Trekking",
      location: "Muğla Dağları",
      date: "2026-01-26",
      time: "08:00",
      description:
        "Muğla dağlarında unutulmaz bir trekking deneyimi. Doğayı severler için harika bir gün olacak.",
      currentParticipants: 12,
      maxParticipants: 15,
      creatorName: "Ayşe Y.",
      isJoined: true,
    },
    {
      id: "3",
      title: "Açık Hava Konseri",
      location: "Bodrum Kültür Merkezi",
      date: "2026-01-27",
      time: "19:00",
      currentParticipants: 156,
      creatorName: "Organizatörler",
      isJoined: false,
    },
  ]);

  const handleCreateEvent = (formData: any) => {
    const newEvent: Event = {
      id: Date.now().toString(),
      ...formData,
      currentParticipants: 1,
      creatorName: "Sen",
      isJoined: true,
    };
    setEvents([newEvent, ...events]);
  };

  const handleJoinEvent = (eventId: string) => {
    setEvents(
      events.map((event) =>
        event.id === eventId
          ? {
              ...event,
              currentParticipants: event.currentParticipants + 1,
              isJoined: true,
            }
          : event,
      ),
    );
  };

  const handleLeaveEvent = (eventId: string) => {
    setEvents(
      events.map((event) =>
        event.id === eventId
          ? {
              ...event,
              currentParticipants: event.currentParticipants - 1,
              isJoined: false,
            }
          : event,
      ),
    );
  };

  return (
    <div className="flex">
      {/* Sidebar */}
      <div className="w-64 bg-gray-50 border-r border-gray-200 p-6 hidden lg:block h-screen overflow-y-auto">
        <div className="space-y-8">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-gradient-to-br from-violet-600 to-purple-600 rounded-xl flex items-center justify-center">
              <svg
                className="w-6 h-6 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
            </div>
            <span className="text-xl font-bold text-gray-900">Activity</span>
          </div>

          {/* Menu */}
          <nav className="space-y-3">
            <a
              href="/"
              className="flex items-center gap-3 px-4 py-2 rounded-lg bg-violet-50 text-violet-600 font-medium"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
              </svg>
              Akış
            </a>
            <a
              href="/events"
              className="flex items-center gap-3 px-4 py-2 rounded-lg text-gray-700 hover:bg-gray-100"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z"></path>
                <path
                  fillRule="evenodd"
                  d="M4 5a2 2 0 012-2 1 1 0 000-2H2a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2V5a2 2 0 00-2-2h-2.5a1 1 0 00-1 1v2H5V5z"
                  clipRule="evenodd"
                ></path>
              </svg>
              Etkinlikler
            </a>
            <a
              href="/my-events"
              className="flex items-center gap-3 px-4 py-2 rounded-lg text-gray-700 hover:bg-gray-100"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path d="M2 5a2 2 0 012-2h12a2 2 0 012 2v10a2 2 0 01-2 2H4a2 2 0 01-2-2V5z"></path>
              </svg>
              Etkinliklerim
            </a>
            <a
              href="/profile"
              className="flex items-center gap-3 px-4 py-2 rounded-lg text-gray-700 hover:bg-gray-100"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                  clipRule="evenodd"
                ></path>
              </svg>
              Profil
            </a>
          </nav>

          {/* Stats */}
          <div className="border-t pt-6 space-y-4">
            <div>
              <div className="text-2xl font-bold text-gray-900">1.2K</div>
              <div className="text-sm text-gray-500">Aktif Kullanıcı</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-gray-900">342</div>
              <div className="text-sm text-gray-500">Günlük Etkinlik</div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Feed */}
      <div className="flex-1 max-w-2xl mx-auto p-4 md:p-8">
        {/* Create Event Form */}
        <CreateEventForm onSubmit={handleCreateEvent} />

        {/* Events Feed */}
        <div>
          {events.map((event) => (
            <EventCard
              key={event.id}
              {...event}
              onJoin={() => handleJoinEvent(event.id)}
              onLeave={() => handleLeaveEvent(event.id)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
