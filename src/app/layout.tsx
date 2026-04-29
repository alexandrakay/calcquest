import type { Metadata } from 'next';

import { AppProviders } from '@/components/providers/AppProviders';
import { AppShell } from '@/components/navigation/AppShell';

export const metadata: Metadata = {
  title: 'CalcQuest',
  description: 'Learn calculus by playing, building, debugging, and leveling up.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <AppProviders>
          <div
            style={{
              minHeight: '100vh',
              background:
                'radial-gradient(circle at top left, rgba(90,242,201,0.13), transparent 30%), radial-gradient(circle at top right, rgba(255,181,77,0.12), transparent 24%), linear-gradient(180deg, #08111f 0%, #060b14 100%)',
            }}
          >
            <AppShell />
            {children}
          </div>
        </AppProviders>
      </body>
    </html>
  );
}
