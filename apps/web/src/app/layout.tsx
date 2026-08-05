// ‌‍‌‌‍‌‍‍‌‌‍‍‌‍‌‍‍‍‌‌‍‍‍‌‌‍‌‍‍‌‌‍‌‍‍‌‍‌‌‍‍‌‌‌‍‍‌‌‍‌‌‍‌‍‌‍‌‌‍‌
// Skales v6.0.0 — BSL 1.1 — Mario Simic
// ‌‍‌‌‍‌‍‍‌‌‍‍‌‍‌‍‍‍‌‌‍‍‍‌‌‍‌‍‍‌‌‍‌‍‍‌‍‌‌‍‍‌‌‌‍‍‌‌‍‌‌‍‌‍‌‍‌‌‍‌
import './globals.css';
import { ThemeProvider } from '@/components/providers/theme-provider';
import AppShell from '@/components/app-shell';
import { NotificationManager } from '@/components/system/notification-manager';
import { ErrorBoundary } from '@/components/error-boundary';

export const metadata = {
    title: 'Skales - Your AI Buddy',
    description: 'Your personal autonomous AI assistant. Simple. Smart. Private.',
    icons: {
        icon: [
            { url: '/favicon.ico', type: 'image/x-icon' },
        ],
        shortcut: '/favicon.ico',
    },
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en" suppressHydrationWarning>
            <head>
                {/* Blocking theme script: runs before body renders to prevent flash */}
                <script dangerouslySetInnerHTML={{ __html: `
                    (function() {
                        try {
                            var stored = localStorage.getItem('theme');
                            var theme = stored === 'light' ? 'light' : stored === 'dark' ? 'dark' : 'dark';
                            if (!stored) {
                                var prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
                                theme = prefersDark ? 'dark' : 'light';
                            }
                            document.documentElement.classList.remove('light', 'dark');
                            document.documentElement.classList.add(theme);
                        } catch(e) {
                            document.documentElement.classList.add('dark');
                        }
                    })();
                ` }} />
                {/* Outdated-source notice: a fixed strip so it cannot be scrolled
                    away or dismissed. The shell is offset by exactly the strip
                    height so nothing ends up underneath it, and the strip grows
                    at the widths where the sentence wraps. `body ` raises the
                    specificity above globals.css regardless of injection order. */}
                <style dangerouslySetInnerHTML={{ __html: `
                    :root { --outdated-notice-height: 34px; }
                    @media (max-width: 900px) { :root { --outdated-notice-height: 56px; } }
                    @media (max-width: 430px) { :root { --outdated-notice-height: 74px; } }
                    .outdated-source-notice {
                        position: fixed; top: 0; left: 0; right: 0; z-index: 60;
                        height: var(--outdated-notice-height); overflow: hidden;
                        display: flex; flex-wrap: wrap;
                        align-items: center; align-content: center; justify-content: center;
                        gap: 4px 8px; padding: 0 12px;
                        background: #3f2d05; color: #fde68a;
                        border-bottom: 1px solid #715214;
                        font-size: 13px; line-height: 1.3; text-align: center;
                    }
                    .outdated-source-notice a { color: #ffffff; text-decoration: underline; }
                    body .app-shell {
                        margin-top: var(--outdated-notice-height);
                        height: calc(100vh - var(--outdated-notice-height));
                        height: calc(100dvh - var(--outdated-notice-height));
                    }
                    body .sidebar { top: var(--outdated-notice-height); }
                    body .main-content {
                        height: calc(100vh - var(--outdated-notice-height));
                        height: calc(100dvh - var(--outdated-notice-height));
                    }
                ` }} />
            </head>
            <body suppressHydrationWarning>
                <div className="outdated-source-notice" role="note">
                    <span>
                        This source snapshot (v7, version 7.1.0) reflects Skales as of March 2026 and is no longer updated.
                        Skales continues as binary releases only.
                    </span>
                    <a href="https://github.com/skalesapp/skales/releases" target="_blank" rel="noreferrer">
                        Get the current release
                    </a>
                </div>
                {/* Skip-to-main: visible only on keyboard focus (Tab from address bar) */}
                <a href="#main-content" className="skip-to-main">
                    Skip to main content
                </a>
                <ThemeProvider
                    attribute="class"
                    defaultTheme="dark"
                    enableSystem
                    disableTransitionOnChange
                >
                    <ErrorBoundary>
                        <AppShell>
                            <NotificationManager />
                            {children}
                        </AppShell>
                    </ErrorBoundary>
                </ThemeProvider>
            </body>
        </html>
    );
}
