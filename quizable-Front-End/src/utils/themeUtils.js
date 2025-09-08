import { topics } from '../data/topics';
import { themeContent } from '../data/themecontent';

// Theme configurations for different topics
const themeConfigs = {
    football: {
        background: 'bg-gradient-to-br from-green-900 via-green-800 to-emerald-900',
        cardBg: 'bg-gradient-to-br from-green-800/30 to-emerald-700/20',
        primary: 'from-green-500 to-emerald-600',
        accent: 'text-green-400',
        border: 'border-green-500/30',
        quizBoard: {
            name: "QuizBoard Interactive Theme",
            colors: {
                background: "140 30% 12%", // Deep forest base for quiz focus
                primary: "28 92% 58%", // Energetic orange for interactive elements
                primaryGlow: "28 95% 68%", // Bright orange glow for highlights
                secondary: "50 88% 62%", // Golden yellow for secondary actions
                success: "125 55% 50%", // Victory green for correct answers
                destructive: "5 78% 58%", // Alert red for wrong answers
                warning: "48 95% 80%", // Soft warning cream
                bright: "28 98% 85%", // Bright text for readability
                accentBright: "28 85% 65%", // Accent for interactive feedback
                muted: "140 20% 22%", // Subtle background elements
                border: "140 25% 30%", // Border definition
                input: "140 20% 18%", // Input field backgrounds
                ring: "28 92% 58%", // Focus ring color
                // QuizBoard specific colors
                questionCard: "140 35% 15%", // Question card background
                optionButton: "140 28% 20%", // Option button default
                optionHover: "28 85% 55%", // Option button hover
                correctAnswer: "125 65% 45%", // Correct answer highlight
                wrongAnswer: "5 85% 55%", // Wrong answer highlight
                timerActive: "28 90% 60%", // Active timer color
                timerWarning: "15 90% 65%", // Timer warning color
                timerCritical: "5 85% 65%", // Timer critical color
                lifeline: "200 70% 55%", // Lifeline button color
                lifelineUsed: "140 15% 40%", // Used lifeline color
                progressBar: "28 85% 58%", // Progress bar fill
                progressBg: "140 20% 25%", // Progress bar background
                modalBg: "140 40% 10%", // Modal background
                modalBorder: "28 60% 45%", // Modal border
                scoreGood: "125 60% 50%", // Good score color
                scoreBad: "5 80% 60%", // Poor score color
                textPrimary: "28 95% 88%", // Primary text
                textSecondary: "140 40% 75%", // Secondary text
                textMuted: "140 20% 65%" // Muted text
            },
            // QuizBoard specific gradients
            gradients: {
                questionCard: "linear-gradient(135deg, hsl(140 35% 15%) 0%, hsl(140 30% 18%) 100%)",
                correctButton: "linear-gradient(135deg, hsl(125 65% 45%) 0%, hsl(125 70% 50%) 100%)",
                wrongButton: "linear-gradient(135deg, hsl(5 85% 55%) 0%, hsl(5 80% 60%) 100%)",
                primaryButton: "linear-gradient(135deg, hsl(28 92% 58%) 0%, hsl(28 88% 62%) 100%)",
                background: "linear-gradient(135deg, hsl(140 30% 12%) 0%, hsl(140 25% 15%) 100%)"
            },
            // Animation properties
            animations: {
                buttonHover: "transform: scale(1.02); transition: all 0.2s ease;",
                correctAnswer: "animation: pulse-green 0.6s ease-in-out;",
                wrongAnswer: "animation: shake 0.5s ease-in-out;",
                timerPulse: "animation: timer-pulse 1s ease-in-out infinite;",
                modalEnter: "animation: modal-enter 0.3s ease-out;",
                progressFill: "transition: width 0.5s ease-in-out;"
            },
            // Shadow effects
            shadows: {
                question: "0 8px 32px hsl(140 30% 8% / 0.4), 0 4px 16px hsl(28 50% 25% / 0.3)",
                button: "0 4px 16px hsl(28 70% 35% / 0.2), 0 2px 8px hsl(140 20% 15% / 0.3)",
                correctGlow: "0 0 20px hsl(125 65% 45% / 0.4), 0 0 40px hsl(125 65% 45% / 0.2)",
                wrongGlow: "0 0 20px hsl(5 85% 55% / 0.4), 0 0 40px hsl(5 85% 55% / 0.2)",
                modal: "0 20px 60px hsl(140 40% 8% / 0.6), 0 8px 32px hsl(140 30% 10% / 0.4)"
            }
        }
    },
    anime: {
        background: 'bg-gradient-to-br from-pink-900 via-purple-800 to-indigo-900',
        cardBg: 'bg-gradient-to-br from-pink-800/30 to-purple-700/20',
        primary: 'from-pink-500 to-purple-600',
        accent: 'text-pink-400',
        border: 'border-pink-500/30',
        quizBoard: {
            name: "Anime QuizBoard Theme",
            colors: {
                background: "280 45% 14%", // Deep magical purple base
                primary: "320 88% 65%", // Bright sakura pink for interactions
                primaryGlow: "320 92% 75%", // Enhanced pink glow
                secondary: "290 75% 68%", // Soft lavender for secondary elements
                success: "150 65% 52%", // Mint green for correct answers
                destructive: "355 85% 62%", // Coral red for wrong answers
                warning: "50 92% 85%", // Warm cream warning
                bright: "320 98% 90%", // Bright pink text
                accentBright: "320 88% 72%", // Accent for feedback
                muted: "280 35% 25%", // Subtle purple background
                border: "280 40% 32%", // Purple border
                input: "280 35% 20%", // Input backgrounds
                ring: "320 88% 65%", // Focus ring
                questionCard: "280 50% 16%", // Question card background
                optionButton: "280 40% 22%", // Option button default
                optionHover: "320 85% 60%", // Option hover
                correctAnswer: "150 70% 48%", // Correct highlight
                wrongAnswer: "355 90% 58%", // Wrong highlight
                timerActive: "320 85% 65%", // Active timer
                timerWarning: "25 90% 68%", // Timer warning
                timerCritical: "355 90% 65%", // Timer critical
                lifeline: "260 70% 60%", // Lifeline color
                lifelineUsed: "280 20% 40%", // Used lifeline
                progressBar: "320 85% 65%", // Progress fill
                progressBg: "280 25% 25%", // Progress background
                modalBg: "280 55% 12%", // Modal background
                modalBorder: "320 65% 50%", // Modal border
                scoreGood: "150 65% 52%", // Good score
                scoreBad: "355 85% 62%", // Poor score
                textPrimary: "320 95% 88%", // Primary text
                textSecondary: "280 50% 75%", // Secondary text
                textMuted: "280 30% 65%" // Muted text
            },
            gradients: {
                questionCard: "linear-gradient(135deg, hsl(280 50% 16%) 0%, hsl(280 45% 19%) 100%)",
                correctButton: "linear-gradient(135deg, hsl(150 70% 48%) 0%, hsl(150 75% 53%) 100%)",
                wrongButton: "linear-gradient(135deg, hsl(355 90% 58%) 0%, hsl(355 85% 63%) 100%)",
                primaryButton: "linear-gradient(135deg, hsl(320 88% 65%) 0%, hsl(320 85% 70%) 100%)",
                background: "linear-gradient(135deg, hsl(280 45% 14%) 0%, hsl(280 40% 17%) 100%)"
            },
            animations: {
                buttonHover: "transform: scale(1.02); transition: all 0.2s ease;",
                correctAnswer: "animation: pulse-mint 0.6s ease-in-out;",
                wrongAnswer: "animation: shake 0.5s ease-in-out;",
                timerPulse: "animation: sakura-pulse 1s ease-in-out infinite;",
                modalEnter: "animation: modal-enter 0.3s ease-out;",
                progressFill: "transition: width 0.5s ease-in-out;"
            },
            shadows: {
                question: "0 8px 32px hsl(280 45% 10% / 0.4), 0 4px 16px hsl(320 60% 30% / 0.3)",
                button: "0 4px 16px hsl(320 70% 40% / 0.2), 0 2px 8px hsl(280 30% 18% / 0.3)",
                correctGlow: "0 0 20px hsl(150 70% 48% / 0.4), 0 0 40px hsl(150 70% 48% / 0.2)",
                wrongGlow: "0 0 20px hsl(355 90% 58% / 0.4), 0 0 40px hsl(355 90% 58% / 0.2)",
                modal: "0 20px 60px hsl(280 55% 8% / 0.6), 0 8px 32px hsl(280 45% 12% / 0.4)"
            }
        }
    },
    science: {
        background: 'bg-gradient-to-br from-blue-900 via-cyan-800 to-teal-900',
        cardBg: 'bg-gradient-to-br from-blue-800/30 to-cyan-700/20',
        primary: 'from-blue-500 to-cyan-600',
        accent: 'text-blue-400',
        border: 'border-blue-500/30',
        quizBoard: {
            name: "Science QuizBoard Theme",
            colors: {
                background: "200 50% 14%", // Deep ocean blue base
                primary: "180 85% 58%", // Electric cyan for interactions
                primaryGlow: "180 90% 68%", // Bright cyan glow
                secondary: "200 65% 65%", // Sky blue for secondary elements
                success: "160 70% 50%", // Teal green for correct answers
                destructive: "10 88% 62%", // Bright orange-red for wrong answers
                warning: "55 88% 82%", // Light yellow warning
                bright: "180 98% 85%", // Bright cyan text
                accentBright: "180 85% 70%", // Accent for feedback
                muted: "200 40% 24%", // Subtle blue background
                border: "200 45% 32%", // Blue border
                input: "200 40% 18%", // Input backgrounds
                ring: "180 85% 58%", // Focus ring
                questionCard: "200 55% 16%", // Question card background
                optionButton: "200 45% 20%", // Option button default
                optionHover: "180 80% 55%", // Option hover
                correctAnswer: "160 75% 46%", // Correct highlight
                wrongAnswer: "10 92% 58%", // Wrong highlight
                timerActive: "180 85% 60%", // Active timer
                timerWarning: "35 88% 65%", // Timer warning
                timerCritical: "10 88% 65%", // Timer critical
                lifeline: "220 70% 60%", // Lifeline color
                lifelineUsed: "200 20% 40%", // Used lifeline
                progressBar: "180 85% 58%", // Progress fill
                progressBg: "200 30% 25%", // Progress background
                modalBg: "200 60% 12%", // Modal background
                modalBorder: "180 70% 50%", // Modal border
                scoreGood: "160 70% 50%", // Good score
                scoreBad: "10 88% 62%", // Poor score
                textPrimary: "180 95% 88%", // Primary text
                textSecondary: "200 55% 75%", // Secondary text
                textMuted: "200 35% 65%" // Muted text
            },
            gradients: {
                questionCard: "linear-gradient(135deg, hsl(200 55% 16%) 0%, hsl(200 50% 19%) 100%)",
                correctButton: "linear-gradient(135deg, hsl(160 75% 46%) 0%, hsl(160 80% 51%) 100%)",
                wrongButton: "linear-gradient(135deg, hsl(10 92% 58%) 0%, hsl(10 88% 63%) 100%)",
                primaryButton: "linear-gradient(135deg, hsl(180 85% 58%) 0%, hsl(180 82% 63%) 100%)",
                background: "linear-gradient(135deg, hsl(200 50% 14%) 0%, hsl(200 45% 17%) 100%)"
            },
            animations: {
                buttonHover: "transform: scale(1.02); transition: all 0.2s ease;",
                correctAnswer: "animation: pulse-teal 0.6s ease-in-out;",
                wrongAnswer: "animation: shake 0.5s ease-in-out;",
                timerPulse: "animation: electric-pulse 1s ease-in-out infinite;",
                modalEnter: "animation: modal-enter 0.3s ease-out;",
                progressFill: "transition: width 0.5s ease-in-out;"
            },
            shadows: {
                question: "0 8px 32px hsl(200 50% 10% / 0.4), 0 4px 16px hsl(180 60% 30% / 0.3)",
                button: "0 4px 16px hsl(180 70% 35% / 0.2), 0 2px 8px hsl(200 35% 18% / 0.3)",
                correctGlow: "0 0 20px hsl(160 75% 46% / 0.4), 0 0 40px hsl(160 75% 46% / 0.2)",
                wrongGlow: "0 0 20px hsl(10 92% 58% / 0.4), 0 0 40px hsl(10 92% 58% / 0.2)",
                modal: "0 20px 60px hsl(200 60% 8% / 0.6), 0 8px 32px hsl(200 50% 12% / 0.4)"
            }
        }
    },
    history: {
        background: 'bg-gradient-to-br from-amber-900 via-orange-800 to-red-900',
        cardBg: 'bg-gradient-to-br from-amber-800/30 to-red-700/20',
        primary: 'from-amber-500 to-red-600',
        accent: 'text-amber-400',
        border: 'border-amber-500/30',
        quizBoard: {
            name: "History QuizBoard Theme",
            colors: {
                background: "25 45% 16%", // Rich earthy brown base
                primary: "35 80% 55%", // Warm amber for interactions
                primaryGlow: "35 85% 65%", // Golden glow
                secondary: "45 75% 65%", // Golden sand for secondary elements
                success: "100 50% 48%", // Sage green for correct answers
                destructive: "5 75% 58%", // Terracotta red for wrong answers
                warning: "50 88% 82%", // Parchment warning
                bright: "35 92% 85%", // Light amber text
                accentBright: "35 80% 68%", // Accent for feedback
                muted: "25 35% 26%", // Subtle brown background
                border: "25 40% 34%", // Brown border
                input: "25 35% 20%", // Input backgrounds
                ring: "35 80% 55%", // Focus ring
                questionCard: "25 50% 18%", // Question card background
                optionButton: "25 40% 22%", // Option button default
                optionHover: "35 75% 52%", // Option hover
                correctAnswer: "100 55% 45%", // Correct highlight
                wrongAnswer: "5 80% 55%", // Wrong highlight
                timerActive: "35 80% 58%", // Active timer
                timerWarning: "45 85% 65%", // Timer warning
                timerCritical: "5 80% 65%", // Timer critical
                lifeline: "60 70% 55%", // Lifeline color
                lifelineUsed: "25 20% 38%", // Used lifeline
                progressBar: "35 80% 55%", // Progress fill
                progressBg: "25 25% 26%", // Progress background
                modalBg: "25 55% 14%", // Modal background
                modalBorder: "35 70% 48%", // Modal border
                scoreGood: "100 55% 48%", // Good score
                scoreBad: "5 75% 58%", // Poor score
                textPrimary: "35 92% 85%", // Primary text
                textSecondary: "25 50% 72%", // Secondary text
                textMuted: "25 35% 62%" // Muted text
            },
            gradients: {
                questionCard: "linear-gradient(135deg, hsl(25 50% 18%) 0%, hsl(25 45% 21%) 100%)",
                correctButton: "linear-gradient(135deg, hsl(100 55% 45%) 0%, hsl(100 60% 50%) 100%)",
                wrongButton: "linear-gradient(135deg, hsl(5 80% 55%) 0%, hsl(5 75% 60%) 100%)",
                primaryButton: "linear-gradient(135deg, hsl(35 80% 55%) 0%, hsl(35 78% 60%) 100%)",
                background: "linear-gradient(135deg, hsl(25 45% 16%) 0%, hsl(25 40% 19%) 100%)"
            },
            animations: {
                buttonHover: "transform: scale(1.02); transition: all 0.2s ease;",
                correctAnswer: "animation: pulse-sage 0.6s ease-in-out;",
                wrongAnswer: "animation: shake 0.5s ease-in-out;",
                timerPulse: "animation: amber-pulse 1s ease-in-out infinite;",
                modalEnter: "animation: modal-enter 0.3s ease-out;",
                progressFill: "transition: width 0.5s ease-in-out;"
            },
            shadows: {
                question: "0 8px 32px hsl(25 45% 12% / 0.4), 0 4px 16px hsl(35 60% 28% / 0.3)",
                button: "0 4px 16px hsl(35 70% 35% / 0.2), 0 2px 8px hsl(25 30% 20% / 0.3)",
                correctGlow: "0 0 20px hsl(100 55% 45% / 0.4), 0 0 40px hsl(100 55% 45% / 0.2)",
                wrongGlow: "0 0 20px hsl(5 80% 55% / 0.4), 0 0 40px hsl(5 80% 55% / 0.2)",
                modal: "0 20px 60px hsl(25 55% 10% / 0.6), 0 8px 32px hsl(25 45% 14% / 0.4)"
            }
        }
    },
    gaming: {
        background: 'bg-gradient-to-br from-indigo-900 via-purple-800 to-violet-900',
        cardBg: 'bg-gradient-to-br from-indigo-800/30 to-purple-700/20',
        primary: 'from-indigo-500 to-purple-600',
        accent: 'text-indigo-400',
        border: 'border-indigo-500/30',
        quizBoard: {
            name: "Gaming QuizBoard Theme",
            colors: {
                background: "260 50% 15%", // Deep electric purple base
                primary: "280 88% 65%", // Neon purple for interactions
                primaryGlow: "280 92% 75%", // Enhanced purple glow
                secondary: "250 75% 68%", // Electric blue for secondary elements
                success: "120 65% 52%", // Neon green for correct answers
                destructive: "340 85% 62%", // Hot pink for wrong answers
                warning: "60 88% 82%", // Electric yellow warning
                bright: "280 98% 88%", // Bright purple text
                accentBright: "280 88% 72%", // Accent for feedback
                muted: "260 40% 24%", // Subtle purple background
                border: "260 45% 32%", // Purple border
                input: "260 40% 18%", // Input backgrounds
                ring: "280 88% 65%", // Focus ring
                questionCard: "260 55% 16%", // Question card background
                optionButton: "260 45% 20%", // Option button default
                optionHover: "280 85% 60%", // Option hover
                correctAnswer: "120 70% 48%", // Correct highlight
                wrongAnswer: "340 90% 58%", // Wrong highlight
                timerActive: "280 85% 65%", // Active timer
                timerWarning: "45 88% 68%", // Timer warning
                timerCritical: "340 90% 65%", // Timer critical
                lifeline: "190 70% 60%", // Lifeline color
                lifelineUsed: "260 20% 40%", // Used lifeline
                progressBar: "280 85% 65%", // Progress fill
                progressBg: "260 30% 25%", // Progress background
                modalBg: "260 60% 12%", // Modal background
                modalBorder: "280 70% 50%", // Modal border
                scoreGood: "120 65% 52%", // Good score
                scoreBad: "340 85% 62%", // Poor score
                textPrimary: "280 95% 88%", // Primary text
                textSecondary: "260 55% 75%", // Secondary text
                textMuted: "260 35% 65%" // Muted text
            },
            gradients: {
                questionCard: "linear-gradient(135deg, hsl(260 55% 16%) 0%, hsl(260 50% 19%) 100%)",
                correctButton: "linear-gradient(135deg, hsl(120 70% 48%) 0%, hsl(120 75% 53%) 100%)",
                wrongButton: "linear-gradient(135deg, hsl(340 90% 58%) 0%, hsl(340 85% 63%) 100%)",
                primaryButton: "linear-gradient(135deg, hsl(280 88% 65%) 0%, hsl(280 85% 70%) 100%)",
                background: "linear-gradient(135deg, hsl(260 50% 15%) 0%, hsl(260 45% 18%) 100%)"
            },
            animations: {
                buttonHover: "transform: scale(1.02); transition: all 0.2s ease;",
                correctAnswer: "animation: pulse-neon 0.6s ease-in-out;",
                wrongAnswer: "animation: shake 0.5s ease-in-out;",
                timerPulse: "animation: neon-pulse 1s ease-in-out infinite;",
                modalEnter: "animation: modal-enter 0.3s ease-out;",
                progressFill: "transition: width 0.5s ease-in-out;"
            },
            shadows: {
                question: "0 8px 32px hsl(260 50% 10% / 0.4), 0 4px 16px hsl(280 60% 30% / 0.3)",
                button: "0 4px 16px hsl(280 70% 35% / 0.2), 0 2px 8px hsl(260 35% 18% / 0.3)",
                correctGlow: "0 0 20px hsl(120 70% 48% / 0.4), 0 0 40px hsl(120 70% 48% / 0.2)",
                wrongGlow: "0 0 20px hsl(340 90% 58% / 0.4), 0 0 40px hsl(340 90% 58% / 0.2)",
                modal: "0 20px 60px hsl(260 60% 8% / 0.6), 0 8px 32px hsl(260 50% 12% / 0.4)"
            }
        }
    },
    general: {
        background: 'bg-gradient-to-br from-slate-900 via-gray-800 to-zinc-900',
        cardBg: 'bg-gradient-to-br from-slate-800/30 to-gray-700/20',
        primary: 'from-slate-500 to-gray-600',
        accent: 'text-slate-400',
        border: 'border-slate-500/30',
        quizBoard: {
            name: "General Knowledge QuizBoard Theme",
            colors: {
                background: "210 40% 16%", // Sophisticated navy base
                primary: "210 75% 58%", // Professional blue for interactions
                primaryGlow: "210 80% 68%", // Blue glow
                secondary: "190 60% 65%", // Calm blue-gray for secondary elements
                success: "140 55% 50%", // Professional green for correct answers
                destructive: "355 75% 58%", // Refined red for wrong answers
                warning: "55 85% 82%", // Soft cream warning
                bright: "210 90% 85%", // Light blue text
                accentBright: "210 75% 72%", // Accent for feedback
                muted: "210 30% 26%", // Subtle navy background
                border: "210 35% 34%", // Navy border
                input: "210 30% 20%", // Input backgrounds
                ring: "210 75% 58%", // Focus ring
                questionCard: "210 45% 18%", // Question card background
                optionButton: "210 35% 22%", // Option button default
                optionHover: "210 70% 55%", // Option hover
                correctAnswer: "140 60% 48%", // Correct highlight
                wrongAnswer: "355 80% 55%", // Wrong highlight
                timerActive: "210 75% 60%", // Active timer
                timerWarning: "40 85% 65%", // Timer warning
                timerCritical: "355 80% 65%", // Timer critical
                lifeline: "180 65% 55%", // Lifeline color
                lifelineUsed: "210 20% 38%", // Used lifeline
                progressBar: "210 75% 58%", // Progress fill
                progressBg: "210 25% 26%", // Progress background
                modalBg: "210 50% 14%", // Modal background
                modalBorder: "210 65% 48%", // Modal border
                scoreGood: "140 60% 50%", // Good score
                scoreBad: "355 75% 58%", // Poor score
                textPrimary: "210 90% 85%", // Primary text
                textSecondary: "210 45% 72%", // Secondary text
                textMuted: "210 30% 62%" // Muted text
            },
            gradients: {
                questionCard: "linear-gradient(135deg, hsl(210 45% 18%) 0%, hsl(210 40% 21%) 100%)",
                correctButton: "linear-gradient(135deg, hsl(140 60% 48%) 0%, hsl(140 65% 53%) 100%)",
                wrongButton: "linear-gradient(135deg, hsl(355 80% 55%) 0%, hsl(355 75% 60%) 100%)",
                primaryButton: "linear-gradient(135deg, hsl(210 75% 58%) 0%, hsl(210 72% 63%) 100%)",
                background: "linear-gradient(135deg, hsl(210 40% 16%) 0%, hsl(210 35% 19%) 100%)"
            },
            animations: {
                buttonHover: "transform: scale(1.02); transition: all 0.2s ease;",
                correctAnswer: "animation: pulse-professional 0.6s ease-in-out;",
                wrongAnswer: "animation: shake 0.5s ease-in-out;",
                timerPulse: "animation: professional-pulse 1s ease-in-out infinite;",
                modalEnter: "animation: modal-enter 0.3s ease-out;",
                progressFill: "transition: width 0.5s ease-in-out;"
            },
            shadows: {
                question: "0 8px 32px hsl(210 40% 12% / 0.4), 0 4px 16px hsl(210 55% 28% / 0.3)",
                button: "0 4px 16px hsl(210 65% 35% / 0.2), 0 2px 8px hsl(210 25% 20% / 0.3)",
                correctGlow: "0 0 20px hsl(140 60% 48% / 0.4), 0 0 40px hsl(140 60% 48% / 0.2)",
                wrongGlow: "0 0 20px hsl(355 80% 55% / 0.4), 0 0 40px hsl(355 80% 55% / 0.2)",
                modal: "0 20px 60px hsl(210 50% 10% / 0.6), 0 8px 32px hsl(210 40% 14% / 0.4)"
            }
        }
    }
};

/**
 * Get complete theme data for a topic ID
 * @param {string} topicId - The topic ID from localStorage
 * @returns {object} Complete theme object with content and styles
 */
export const getThemeByTopicId = (topicId) => {
    // Find the topic
    const topic = topics.find(t => t.id === topicId);
    if (!topic) {
        // Fallback to general theme
        return {
            topic: null,
            content: themeContent.general,
            styles: themeConfigs.general,
            isValid: false
        };
    }

    // Get theme content and styles
    const content = themeContent[topic.colorScheme] || themeContent.general;
    const styles = themeConfigs[topic.colorScheme] || themeConfigs.general;

    return {
        topic,
        content,
        styles,
        isValid: true
    };
};

/**
 * Get theme styles only for a topic ID
 * @param {string} topicId - The topic ID from localStorage
 * @returns {object} Theme styles object
 */
export const getThemeStyles = (topicId) => {
    const theme = getThemeByTopicId(topicId);
    return theme.styles;
};

/**
 * Get theme content only for a topic ID
 * @param {string} topicId - The topic ID from localStorage
 * @returns {object} Theme content object
 */
export const getThemeContent = (topicId) => {
    const theme = getThemeByTopicId(topicId);
    return theme.content;
};

/**
 * Get QuizBoard-specific theme for a topic ID
 * @param {string} topicId - The topic ID from localStorage
 * @returns {object} QuizBoard theme object with colors, gradients, animations, and shadows
 */
export const getQuizBoardTheme = (topicId) => {
    const theme = getThemeByTopicId(topicId);
    return theme.styles.quizBoard || themeConfigs.general.quizBoard;
};

/**
 * Apply QuizBoard theme colors to CSS custom properties
 * @param {string} topicId - The topic ID from localStorage
 */
export const applyQuizBoardColorScheme = (topicId) => {
    const quizBoardTheme = getQuizBoardTheme(topicId);
    const root = document.documentElement;
    
    // Add transition for smooth color changes
    root.style.transition = 'all 0.3s ease';
    
    // Apply all QuizBoard-specific color variables
    const colors = quizBoardTheme.colors;
    
    // Core color system
    root.style.setProperty('--qb-background', colors.background);
    root.style.setProperty('--qb-primary', colors.primary);
    root.style.setProperty('--qb-primary-glow', colors.primaryGlow);
    root.style.setProperty('--qb-secondary', colors.secondary);
    root.style.setProperty('--qb-success', colors.success);
    root.style.setProperty('--qb-destructive', colors.destructive);
    root.style.setProperty('--qb-warning', colors.warning);
    root.style.setProperty('--qb-bright', colors.bright);
    root.style.setProperty('--qb-accent-bright', colors.accentBright);
    root.style.setProperty('--qb-muted', colors.muted);
    root.style.setProperty('--qb-border', colors.border);
    root.style.setProperty('--qb-input', colors.input);
    root.style.setProperty('--qb-ring', colors.ring);
    
    // QuizBoard-specific colors
    root.style.setProperty('--qb-question-card', colors.questionCard);
    root.style.setProperty('--qb-option-button', colors.optionButton);
    root.style.setProperty('--qb-option-hover', colors.optionHover);
    root.style.setProperty('--qb-correct-answer', colors.correctAnswer);
    root.style.setProperty('--qb-wrong-answer', colors.wrongAnswer);
    root.style.setProperty('--qb-timer-active', colors.timerActive);
    root.style.setProperty('--qb-timer-warning', colors.timerWarning);
    root.style.setProperty('--qb-timer-critical', colors.timerCritical);
    root.style.setProperty('--qb-lifeline', colors.lifeline);
    root.style.setProperty('--qb-lifeline-used', colors.lifelineUsed);
    root.style.setProperty('--qb-progress-bar', colors.progressBar);
    root.style.setProperty('--qb-progress-bg', colors.progressBg);
    root.style.setProperty('--qb-modal-bg', colors.modalBg);
    root.style.setProperty('--qb-modal-border', colors.modalBorder);
    root.style.setProperty('--qb-score-good', colors.scoreGood);
    root.style.setProperty('--qb-score-bad', colors.scoreBad);
    root.style.setProperty('--qb-text-primary', colors.textPrimary);
    root.style.setProperty('--qb-text-secondary', colors.textSecondary);
    root.style.setProperty('--qb-text-muted', colors.textMuted);
    
    // Apply gradients
    const gradients = quizBoardTheme.gradients;
    root.style.setProperty('--qb-gradient-question-card', gradients.questionCard);
    root.style.setProperty('--qb-gradient-correct-button', gradients.correctButton);
    root.style.setProperty('--qb-gradient-wrong-button', gradients.wrongButton);
    root.style.setProperty('--qb-gradient-primary-button', gradients.primaryButton);
    root.style.setProperty('--qb-gradient-background', gradients.background);
    
    // Apply shadow effects
    const shadows = quizBoardTheme.shadows;
    root.style.setProperty('--qb-shadow-question', shadows.question);
    root.style.setProperty('--qb-shadow-button', shadows.button);
    root.style.setProperty('--qb-shadow-correct-glow', shadows.correctGlow);
    root.style.setProperty('--qb-shadow-wrong-glow', shadows.wrongGlow);
    root.style.setProperty('--qb-shadow-modal', shadows.modal);
};

/**
 * Get CSS class names for QuizBoard styling based on topic
 * @param {string} topicId - The topic ID from localStorage
 * @returns {object} Object containing CSS class names for different QuizBoard elements
 */
export const getQuizBoardClasses = (topicId) => {
    const baseTheme = getThemeStyles(topicId);
    
    return {
        // Layout classes
        background: `${baseTheme.background} min-h-screen`,
        questionCard: `${baseTheme.cardBg} backdrop-blur-md border ${baseTheme.border} rounded-xl`,
        
        // Button classes
        optionButton: `bg-gradient-to-r ${baseTheme.primary} hover:scale-105 transition-all duration-200 text-white font-semibold rounded-lg`,
        correctButton: `bg-gradient-to-r from-green-500 to-green-600 text-white`,
        wrongButton: `bg-gradient-to-r from-red-500 to-red-600 text-white`,
        lifelineButton: `bg-gradient-to-r ${baseTheme.primary} hover:scale-105 transition-all duration-200 text-white`,
        
        // Text classes
        primaryText: `${baseTheme.accent} font-bold`,
        secondaryText: `text-gray-300`,
        mutedText: `text-gray-400`,
        
        // Timer classes
        timerActive: `${baseTheme.accent}`,
        timerWarning: `text-yellow-400`,
        timerCritical: `text-red-400`,
        
        // Progress classes
        progressBar: `bg-gradient-to-r ${baseTheme.primary}`,
        progressBg: `bg-gray-700`
    };
};

/**
 * Initialize QuizBoard theme on component mount
 * @param {string} topicId - The topic ID from localStorage
 */
export const initializeQuizBoardTheme = (topicId) => {
    // Apply color scheme to CSS custom properties
    requestAnimationFrame(() => {
        applyQuizBoardColorScheme(topicId);
    });
    
    // Return theme data for component use
    return getQuizBoardTheme(topicId);
};