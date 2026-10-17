import type { Metadata, Viewport } from 'next';
import { Montserrat } from 'next/font/google';
import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { site } from '@/lib/site.config';

const montserrat = Montserrat({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-montserrat',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} — ${site.tagline}`,
    template: `%s — ${site.name}`,
  },
  description: site.description,
  applicationName: site.name,
  keywords: [
    'transaction trust',
    'secure transaction workflows',
    'escrow technology',
    'fraud prevention',
    'FinTech infrastructure',
    'cybersecurity',
  ],
  // Social preview image. Deliberately an ABSOLUTE URL pointing into
  // public/brand/ — Next file routes (app/opengraph-image.*) get
  // basePath auto-applied AND joined to metadataBase, which double-
  // prefixes on GitHub Pages (/Holsera/Holsera/...). Explicit absolute
  // URLs bypass that entirely.
  openGraph: {
    type: 'website',
    siteName: site.name,
    title: `${site.name} — ${site.tagline}`,
    description: site.description,
    url: site.url,
    locale: 'en_US',
    images: [
      {
        url: `${site.url}/brand/opengraph-image.png`,
        width: 1200,
        height: 630,
        alt: `${site.name} — ${site.tagline}`,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: `${site.name} — ${site.tagline}`,
    description: site.description,
    images: [`${site.url}/brand/opengraph-image.png`],
  },
  robots: { index: true, follow: true },
  icons: {
    icon: [
      {
        url: `${process.env.NEXT_PUBLIC_BASE_PATH ?? ''}/icon.png`,
        sizes: '512x512',
        type: 'image/png',
      },
    ],
  },
};

export const viewport: Viewport = {
  themeColor: site.themeColor,
  colorScheme: 'dark light',
};

/**
 * Applies the saved theme BEFORE first paint (no flash) and marks the
 * document as JS-capable so scroll-reveal content only hides when the
 * observer can bring it back.
 */
const themeScript = `(function(){var d=document.documentElement;try{var t=localStorage.getItem('holsera-theme');d.setAttribute('data-theme',t==='light'?'light':'dark');}catch(e){d.setAttribute('data-theme','dark');}d.classList.add('js');})();`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" data-theme="dark" className={montserrat.variable} suppressHydrationWarning>
      <body>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
        <a className="skip-link" href="#main">
          Skip to main content
        </a>

        <div className="stage-strip">
          <div className="container stage-strip__inner">
            <span className="badge badge--in-development">{site.stage.badge}</span>
            <span>{site.stage.note}</span>
          </div>
        </div>

        <Header />
        <main id="main">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
