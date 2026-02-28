import EventCard from './EventCard'

export default function EventTimeline({ events }) {
  return (
    <div className="relative">
      {/* Glow line */}
      <div className="absolute left-[1.75rem] top-0 bottom-0 w-px bg-gradient-to-b from-neon-amber/30 via-neon-amber/10 to-transparent hidden md:block" />

      <div className="space-y-8">
        {events.map((event) => (
          <EventCard key={event.id} event={event} />
        ))}
      </div>
    </div>
  )
}
