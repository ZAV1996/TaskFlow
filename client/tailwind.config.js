/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "selector",
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "rgba(var(--primary))",
          dark: "rgba(var(--primary-dark))",
          light: "rgba(var(--primary-light))"
        },
        accent: {
          DEFAULT: "rgba(var(--accent))",
          dark: "rgba(var(--accent-dark))",
          light: "rgba(var(--accent-light))"
        },
        background: {
          DEFAULT: "rgba(var(--background))",
          secondary: "rgba(var(--background-secondary))",
          tertiary: "rgba(var(--background-tertiary))"
        },
        text: {
          DEFAULT: "rgba(var(--text-primary))",
          secondary: "rgba(var(--text-secondary))",
          on_primary: "rgba(var(--text-on-primary))",
          on_accent: "rgba(var(--text-on-accent))",
        },
        error: {
          DEFAULT: "rgba(var(--error))",
          dark: "rgba(var(--error-dark))"
        },
        success: "rgba(var(--success))",
        warning: "rgba(var(--warning))",
        disabled: "rgba(var(--disabled))",
        border: {
          DEFAULT: "rgba(var(--border))",
          light: "rgba(var(--border-light))"
        },





        // gradientFrom: "var(--bg-gradient-from)",
        // gradientTo: "var(--bg-gradient-to)",
        // border: "hsl(var(--border))",
        // input: "hsl(var(--input))",
        // ring: "hsl(var(--ring))",
        // background: "hsl(var(--background))",
        //foreground: "hsl(var(--foreground))",
        // primary: {
        //   DEFAULT: "hsl(var(--primary))",
        //   foreground: "hsl(var(--primary-foreground))",
        // },
        // secondary: {
        //   DEFAULT: "hsl(var(--secondary))",
        //   foreground: "hsl(var(--secondary-foreground))",
        // },
        // destructive: {
        //   DEFAULT: "hsl(var(--destructive))",
        //   foreground: "hsl(var(--destructive-foreground))",
        // },
        // muted: {
        //   DEFAULT: "hsl(var(--muted))",
        //   foreground: "hsl(var(--muted-foreground))",
        // },
        // accent: {
        //   DEFAULT: "hsl(var(--accent))",
        //   foreground: "hsl(var(--accent-foreground))",
        // },
        // popover: {
        //   DEFAULT: "hsl(var(--popover))",
        //   foreground: "hsl(var(--popover-foreground))",
        // },
        // card: {
        //   DEFAULT: "hsl(var(--card))",
        //   foreground: "hsl(var(--card-foreground))",
        // },
        // sidebar: {
        //   DEFAULT: 'hsl(var(--sidebar-background))',
        //   foreground: 'hsl(var(--sidebar-foreground))',
        //   primary: 'hsl(var(--sidebar-primary))',
        //   'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
        //   accent: 'hsl(var(--sidebar-accent))',
        //   'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
        //   border: 'hsl(var(--sidebar-border))',
        //   ring: 'hsl(var(--sidebar-ring))',
        // },
        // header: {
        //   DEFAULT: "hsl(var(--header-background))"
        // }
      },
      borderRadius: {
        lg: `var(--radius)`,
        md: `calc(var(--radius) - 2px)`,
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
      boxShadow: {
        base: 'rgba(60, 64, 67, .3) 0 1px 2px 0, rgba(60, 64, 67, .15) 0 2px 6px 2px;'
      }
    },
  },
  plugins: [],
}