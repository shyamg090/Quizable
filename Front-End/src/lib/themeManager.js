// Theme color schemes - define different color palettes for different quiz themes
export const colorSchemes = {
  football: {
    name: "Football Theme",
    colors: {
      background: "120 25% 22%", // Deep green
      primary: "25 100% 49%", // Orange
      primaryGlow: "25 100% 60%",
      secondary: "60 78% 70%", // Soft yellow
      success: "85 54% 51%", // Vibrant green
      destructive: "0 83% 61%", // Red
      warning: "60 100% 97%",
      bright: "48 100% 88%",
      accentBright: "27 100% 70%",
      muted: "120 20% 30%",
      border: "120 20% 40%",
      input: "120 20% 30%",
      ring: "25 100% 60%"
    }
  },
  anime: {
    name: "Anime Theme",
    colors: {
      background: "300 25% 22%", // Deep purple
      primary: "320 100% 60%", // Pink
      primaryGlow: "320 100% 70%",
      secondary: "280 78% 70%", // Soft purple
      success: "85 54% 51%", // Vibrant green
      destructive: "0 83% 61%", // Red
      warning: "60 100% 97%",
      bright: "300 100% 88%",
      accentBright: "320 100% 70%",
      muted: "300 20% 30%",
      border: "300 20% 40%",
      input: "300 20% 30%",
      ring: "320 100% 60%"
    }
  },
  science: {
    name: "Science Theme",
    colors: {
      background: "200 25% 22%", // Deep blue
      primary: "200 100% 60%", // Cyan blue
      primaryGlow: "200 100% 70%",
      secondary: "180 78% 70%", // Soft cyan
      success: "85 54% 51%", // Vibrant green
      destructive: "0 83% 61%", // Red
      warning: "60 100% 97%",
      bright: "200 100% 88%",
      accentBright: "200 100% 70%",
      muted: "200 20% 30%",
      border: "200 20% 40%",
      input: "200 20% 30%",
      ring: "200 100% 60%"
    }
  },
  history: {
    name: "History Theme",
    colors: {
      background: "30 25% 22%", // Deep brown
      primary: "30 100% 50%", // Orange-brown
      primaryGlow: "30 100% 60%",
      secondary: "45 78% 70%", // Soft gold
      success: "85 54% 51%", // Vibrant green
      destructive: "0 83% 61%", // Red
      warning: "60 100% 97%",
      bright: "30 100% 88%",
      accentBright: "30 100% 70%",
      muted: "30 20% 30%",
      border: "30 20% 40%",
      input: "30 20% 30%",
      ring: "30 100% 60%"
    }
  },
  gaming: {
    name: "Gaming Theme",
    colors: {
      background: "240 25% 22%", // Deep indigo
      primary: "240 100% 60%", // Purple-blue
      primaryGlow: "240 100% 70%",
      secondary: "260 78% 70%", // Soft purple
      success: "85 54% 51%", // Vibrant green
      destructive: "0 83% 61%", // Red
      warning: "60 100% 97%",
      bright: "240 100% 88%",
      accentBright: "240 100% 70%",
      muted: "240 20% 30%",
      border: "240 20% 40%",
      input: "240 20% 30%",
      ring: "240 100% 60%"
    }
  },
  general: {
    name: "General Knowledge Theme",
    colors: {
      background: "220 25% 22%", // Deep slate
      primary: "220 100% 60%", // Blue-gray
      primaryGlow: "220 100% 70%",
      secondary: "200 78% 70%", // Soft blue
      success: "85 54% 51%", // Vibrant green
      destructive: "0 83% 61%", // Red
      warning: "60 100% 97%",
      bright: "220 100% 88%",
      accentBright: "220 100% 70%",
      muted: "220 20% 30%",
      border: "220 20% 40%",
      input: "220 20% 30%",
      ring: "220 100% 60%"
    }
  }
};

// Apply a color scheme to the document root
export const applyColorScheme = (schemeName) => {
  const scheme = colorSchemes[schemeName];
  if (!scheme) return;

  const root = document.documentElement;
  const colors = scheme.colors;

  // Apply all color variables
  root.style.setProperty('--background', colors.background);
  root.style.setProperty('--primary', colors.primary);
  root.style.setProperty('--primary-glow', colors.primaryGlow);
  root.style.setProperty('--secondary', colors.secondary);
  root.style.setProperty('--success', colors.success);
  root.style.setProperty('--destructive', colors.destructive);
  root.style.setProperty('--warning', colors.warning);
  root.style.setProperty('--bright', colors.bright);
  root.style.setProperty('--accent-bright', colors.accentBright);
  root.style.setProperty('--muted', colors.muted);
  root.style.setProperty('--border', colors.border);
  root.style.setProperty('--input', colors.input);
  root.style.setProperty('--ring', colors.ring);

  // Additional computed colors for enhanced theming
  root.style.setProperty('--foreground', '0 0% 98%');
  root.style.setProperty('--card', `${colors.background}`);
  root.style.setProperty('--card-foreground', '0 0% 98%');
  root.style.setProperty('--popover', `${colors.background}`);
  root.style.setProperty('--popover-foreground', '0 0% 98%');
  root.style.setProperty('--primary-foreground', '0 0% 9%');
  root.style.setProperty('--secondary-foreground', '0 0% 9%');
  root.style.setProperty('--muted-foreground', '0 0% 63.9%');
  root.style.setProperty('--accent', `${colors.primary}`);
  root.style.setProperty('--accent-foreground', '0 0% 9%');

  // Shadow effects with theme colors
  root.style.setProperty('--shadow-glow', `0 0 30px hsl(${colors.primary} / 0.3)`);
  root.style.setProperty('--shadow-success-glow', `0 0 30px hsl(${colors.success} / 0.4)`);
  root.style.setProperty('--shadow-destructive-glow', `0 0 30px hsl(${colors.destructive} / 0.4)`);
};

// Get theme name from quiz data and map to color scheme
export const getColorSchemeFromTheme = (themeName) => {
  const themeMap = {
    'Football IQ': 'football',
    'Anime Quiz': 'anime',
    'Science Quiz': 'science',
    'History Quiz': 'history',
    'Gaming Quiz': 'gaming',
    'General Knowledge': 'general'
  };
  
  return themeMap[themeName] || 'football'; // Default to football theme
};

// Initialize theme based on current quiz theme
export const initializeTheme = (themeData) => {
  const colorScheme = getColorSchemeFromTheme(themeData?.name);
  applyColorScheme(colorScheme);
};