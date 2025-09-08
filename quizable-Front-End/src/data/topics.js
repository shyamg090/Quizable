import { Trophy, Zap, Beaker, History, Gamepad2, Brain } from 'lucide-react';

export const topics = [
    {
        id: 'football',
        name: 'Football IQ',
        subject: 'Football',
        emoji: '⚽',
        icon: Trophy,
        description: 'Test your football knowledge with questions about players, teams, and tournaments',
        colorScheme: 'football',
        gradient: 'bg-gradient-to-br from-green-600 to-orange-500',
        available: true
    },
    {
        id: 'anime',
        name: 'Anime Quiz',
        subject: 'Anime',
        emoji: '🎌',
        icon: Zap,
        description: 'Challenge yourself with questions about popular anime series and characters',
        colorScheme: 'anime',
        gradient: 'bg-gradient-to-br from-pink-500 to-purple-600',
        available: true // Will be implemented later
    },
    {
        id: 'history',
        name: 'History Quiz',
        subject: 'History',
        emoji: '🏛️',
        icon: History,
        description: 'Journey through time with questions about world history and civilizations',
        colorScheme: 'history',
        gradient: 'bg-gradient-to-br from-amber-600 to-red-500',
        available: true
    },
    {
        id: 'science',
        name: 'Science Quiz',
        subject: 'Science',
        emoji: '🧬',
        icon: Beaker,
        description: 'Explore your scientific knowledge across physics, chemistry, and biology',
        colorScheme: 'science',
        gradient: 'bg-gradient-to-br from-blue-500 to-cyan-400',
        available: false
    },
    {
        id: 'gaming',
        name: 'Gaming Quiz',
        subject: 'Gaming',
        emoji: '🎮',
        icon: Gamepad2,
        description: 'Test your gaming knowledge about video games, consoles, and gaming culture',
        colorScheme: 'gaming',
        gradient: 'bg-gradient-to-br from-indigo-500 to-purple-600',
        available: false
    },
    {
        id: 'general',
        name: 'General Knowledge',
        subject: 'General',
        emoji: '🧠',
        icon: Brain,
        description: 'Challenge yourself with questions across various topics and subjects',
        colorScheme: 'general',
        gradient: 'bg-gradient-to-br from-slate-600 to-slate-800',
        available: false
    }
]