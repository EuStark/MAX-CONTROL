export default {
  content: ["./src/**/*.{js,jsx}"],
  theme: { extend: {
    colors: {
      border: "hsl(var(--border))", input: "hsl(var(--input))", ring: "hsl(var(--ring))",
      background: "hsl(var(--background))", foreground: "hsl(var(--foreground))",
      primary: { DEFAULT: "hsl(var(--primary))", foreground: "hsl(var(--primary-foreground))" },
      muted: { DEFAULT: "hsl(var(--muted))", foreground: "hsl(var(--muted-foreground))" },
      accent: { DEFAULT: "hsl(var(--accent))", foreground: "hsl(var(--accent-foreground))" },
      popover: { DEFAULT: "hsl(var(--card))", foreground: "hsl(var(--foreground))" },
      card: { DEFAULT: "hsl(var(--card))", foreground: "hsl(var(--foreground))" },
    },
    boxShadow: {
      neu: "7px 7px 15px var(--sh-d), -7px -7px 15px var(--sh-l)",
      "neu-sm": "4px 4px 9px var(--sh-d), -4px -4px 9px var(--sh-l)",
      "neu-in": "inset 4px 4px 9px var(--sh-d), inset -4px -4px 9px var(--sh-l)",
      "neu-in-sm": "inset 2px 2px 5px var(--sh-d), inset -2px -2px 5px var(--sh-l)",
    },
    borderRadius: { lg: "var(--radius)", md: "calc(var(--radius) - 2px)", sm: "calc(var(--radius) - 4px)" },
  } },
};
