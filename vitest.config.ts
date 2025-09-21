import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
  plugins: [react(), tsconfigPaths()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './vitest.setup.ts',
    server: {
      deps: {
        inline: ['next-intl'],
      },
    },
    coverage: {
      provider: 'v8',
      ignoreEmptyLines: true,
      thresholds: {
        statements: 50,
        branches: 50,
        functions: 50,
        lines: 50,
      },
      include: ['src/**/*.{js,jsx,ts,tsx}'],
      // exclude: [
      //   "src/**/*.test.{js,jsx,ts,tsx}",
      //   "src/**/*.spec.{js,jsx,ts,tsx}",
      //   "src/index.{js,jsx,ts,tsx}",
      //   "src/setupTests.{js,ts}",
      //   "src/**/*.d.ts",
      // ],
    },
  },
});
