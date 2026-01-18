interface EventCardProps {
  id: string;
  title: string;
  location: string;
  date: string;
  time: string;
  currentParticipants: number;
  maxParticipants?: number;
  description?: string;
  creatorName: string;
  creatorAvatar?: string;
  onJoin?: () => void;
  onLeave?: () => void;
  isJoined?: boolean;
}

export default function EventCard({
  id,
  title,
  location,
  date,
  time,
  currentParticipants,
  maxParticipants,
  description,
  creatorName,
  creatorAvatar,
  onJoin,
  onLeave,
  isJoined,
}: EventCardProps) {
  const isFull = maxParticipants && currentParticipants >= maxParticipants;

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6 mb-6">
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-violet-600 to-purple-600 rounded-full flex-shrink-0"></div>
          <div>
            <div className="font-medium text-gray-900">{creatorName}</div>
            <div className="text-sm text-gray-500">Etkinlik oluşturdu</div>
          </div>
        </div>
      </div>

      {/* Event Info */}
      <div className="mb-4">
        <h3 className="text-xl font-semibold text-gray-900 mb-3">{title}</h3>
        {description && <p className="text-gray-600 mb-4">{description}</p>}
      </div>

      {/* Details Grid */}
      <div className="grid grid-cols-2 gap-4 mb-4 py-4 border-t border-b border-gray-100">
        <div>
          <div className="text-sm text-gray-500">Tarih & Saat</div>
          <div className="font-medium text-gray-900">{date}</div>
          <div className="text-sm text-gray-600">{time}</div>
        </div>
        <div>
          <div className="text-sm text-gray-500">Konum</div>
          <div className="font-medium text-gray-900">{location}</div>
        </div>
      </div>

      {/* Participants */}
      <div className="flex items-center justify-between mb-4">
        <div>
          <div className="text-sm text-gray-500">Katılımcılar</div>
          <div className="font-medium text-gray-900">
            {currentParticipants}
            {maxParticipants && `/${maxParticipants}`}
          </div>
        </div>
        {isFull && (
          <div className="px-3 py-1 bg-red-50 border border-red-200 rounded-full text-xs font-medium text-red-600">
            Dolu
          </div>
        )}
      </div>

      {/* Actions */}
      <div className="flex gap-3">
        {isJoined ? (
          <button
            onClick={onLeave}
            className="flex-1 px-4 py-2 border border-red-200 text-red-600 rounded-lg hover:bg-red-50 font-medium"
          >
            Ayrıl
          </button>
        ) : (
          <button
            onClick={onJoin}
            disabled={isFull}
            className="flex-1 px-4 py-2 bg-gradient-to-r from-violet-600 to-purple-600 text-white rounded-lg hover:from-violet-700 hover:to-purple-700 font-medium disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isFull ? "Dolu" : "Katıl"}
          </button>
        )}
        <button className="px-4 py-2 border border-gray-200 text-gray-700 rounded-lg hover:bg-gray-50">
          Detay
        </button>
      </div>
    </div>
  );
}
