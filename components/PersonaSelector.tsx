'use client';

interface Persona {
  id: string;
  name: string;
  emoji: string;
  description: string;
}

interface PersonaSelectorProps {
  selectedPersona: string;
  onPersonaChange: (persona: string) => void;
}

const personas: Persona[] = [
  { 
    id: 'default', 
    name: 'General Assistant', 
    emoji: '🤖', 
    description: 'General purpose assistant for all your questions' 
  },
  { 
    id: 'career-coach', 
    name: 'Career Coach', 
    emoji: '💼', 
    description: 'Get career guidance and professional advice' 
  },
  { 
    id: 'event-planner', 
    name: 'Event Planner', 
    emoji: '🎉', 
    description: 'Plan your events and celebrations' 
  },
  { 
    id: 'interviewer', 
    name: 'Interviewer', 
    emoji: '📝', 
    description: 'Practice interview questions and techniques' 
  },
  { 
    id: 'health-expert', 
    name: 'Health Expert', 
    emoji: '❤️', 
    description: 'Get health and wellness advice' 
  },
];

export default function PersonaSelector({ selectedPersona, onPersonaChange }: PersonaSelectorProps) {
  return (
    <div className="w-full">
      <label className="block text-sm font-medium text-gray-700 mb-2">
        Select Chat Mode:
      </label>
      <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
        {personas.map((persona) => (
          <button
            key={persona.id}
            onClick={() => onPersonaChange(persona.id)}
            className={`p-3 rounded-lg border transition-all text-left ${
              selectedPersona === persona.id
                ? 'border-blue-500 bg-blue-50 ring-2 ring-blue-200'
                : 'border-gray-200 bg-white hover:bg-gray-50'
            }`}
          >
            <div className="flex items-center mb-1">
              <span className="text-xl mr-2">{persona.emoji}</span>
              <span className="font-medium text-sm">{persona.name}</span>
            </div>
            <p className="text-xs text-gray-600">{persona.description}</p>
          </button>
        ))}
      </div>
    </div>
  );
}