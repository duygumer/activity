import { useState } from "react";

interface CreateEventFormProps {
  onSubmit?: (data: any) => void;
}

export default function CreateEventForm({ onSubmit }: CreateEventFormProps) {
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    location: "",
    date: "",
    time: "",
    description: "",
    maxParticipants: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit?.(formData);
    setFormData({
      title: "",
      location: "",
      date: "",
      time: "",
      description: "",
      maxParticipants: "",
    });
    setShowForm(false);
  };

  if (!showForm) {
    return (
      <div className="bg-white rounded-xl border border-gray-200 p-6 mb-6">
        <div className="flex gap-4">
          <div className="w-12 h-12 bg-gradient-to-br from-violet-600 to-purple-600 rounded-full flex-shrink-0"></div>
          <button
            onClick={() => setShowForm(true)}
            className="flex-1 text-left px-4 py-3 bg-gray-50 rounded-full text-gray-500 hover:bg-gray-100"
          >
            Ne planlıyorsun?
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6 mb-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">
        Etkinlik Oluştur
      </h3>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Başlık
          </label>
          <input
            type="text"
            required
            value={formData.title}
            onChange={(e) =>
              setFormData({ ...formData, title: e.target.value })
            }
            placeholder="Etkinliğin adı"
            className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Tarih
            </label>
            <input
              type="date"
              required
              value={formData.date}
              onChange={(e) =>
                setFormData({ ...formData, date: e.target.value })
              }
              className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Saat
            </label>
            <input
              type="time"
              required
              value={formData.time}
              onChange={(e) =>
                setFormData({ ...formData, time: e.target.value })
              }
              className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Konum
          </label>
          <input
            type="text"
            required
            value={formData.location}
            onChange={(e) =>
              setFormData({ ...formData, location: e.target.value })
            }
            placeholder="Nerede yapılacak?"
            className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Katılımcı Limiti
          </label>
          <input
            type="number"
            value={formData.maxParticipants}
            onChange={(e) =>
              setFormData({ ...formData, maxParticipants: e.target.value })
            }
            placeholder="Maksimum katılımcı sayısı (opsiyonel)"
            className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Açıklama
          </label>
          <textarea
            value={formData.description}
            onChange={(e) =>
              setFormData({ ...formData, description: e.target.value })
            }
            placeholder="Etkinlik hakkında bilgi ver"
            rows={3}
            className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500"
          />
        </div>

        <div className="flex gap-3">
          <button
            type="submit"
            className="flex-1 px-4 py-2 bg-gradient-to-r from-violet-600 to-purple-600 text-white rounded-lg hover:from-violet-700 hover:to-purple-700 font-medium"
          >
            Oluştur
          </button>
          <button
            type="button"
            onClick={() => setShowForm(false)}
            className="flex-1 px-4 py-2 border border-gray-200 text-gray-700 rounded-lg hover:bg-gray-50 font-medium"
          >
            İptal
          </button>
        </div>
      </form>
    </div>
  );
}
