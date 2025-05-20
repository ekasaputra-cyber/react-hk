
import  AnimatedWrapper  from './motion-provider';
import type { Metadata } from 'next';
import { Poppins } from 'next/font/google';
import './globals.css';
import Script from 'next/script';

const poppins = Poppins({ 
  weight: ['400', '600', '700'],
  subsets: ['latin'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'HI KIDS OFFICIAL',
  description: 'Dapatkan perawatan medis terbaik untuk anak-anak Anda. Dokter anak berpengalaman siap memberikan layanan kesehatan dengan pendekatan yang ramah dan profesional.',
  openGraph: {
    title: 'HI KIDS OFFICIAL',
    description: 'Dapatkan perawatan medis terbaik untuk anak-anak Anda. Dokter anak berpengalaman siap memberikan layanan kesehatan dengan pendekatan yang ramah dan profesional.',
    url: '', // Add your actual URL here
    siteName: 'HI KIDS OFFICIAL', // Consistent with title
    locale: 'id_ID',
    type: 'website',
    images: [ // Add OpenGraph images if available
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'HI KIDS OFFICIAL',
      },
    ],
  },
  twitter: { // Add Twitter card metadata if needed
    card: 'summary_large_image',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="id">
      <head>
        <link rel="icon" href="/favicon.ico" type="image/x-icon" sizes="any" />
        <link 
          rel="stylesheet" 
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.7.1/css/all.min.css" 
          integrity="sha512-5Hs3dF2AEPkpNAR7UiOHba+lRSJNeM2ECkwxUIxC1Q/FLycGTbNapWXB4tP889k5T5Ju8fs4b1P5z/iB4nMfSQ==" 
          crossOrigin="anonymous" 
          referrerPolicy="no-referrer" 
        />
        {/* Removed duplicate Poppins font loading */}
      </head>
      <body className={`bg-white ${poppins.className}`}>
        <AnimatedWrapper>
          <div className="container-fluid">
            {children}
          </div>
        </AnimatedWrapper>

        {/* Scripts */}
        <Script 
          src="https://code.jquery.com/jquery-3.6.0.min.js" 
          strategy="beforeInteractive"
          integrity="sha256-/xUj+3OJU5yExlq6GSYGSHk7tPXikynS7ogEvDej/m4=" 
          crossOrigin="anonymous"
        />

        <Script id="navbar-script" strategy="afterInteractive">
          {`
            document.addEventListener('DOMContentLoaded', () => {
              const navbar = document.getElementById('navbar');
              const menuButton = document.getElementById('menu-button');
              const offcanvas = document.getElementById('offcanvas');
              const closeButton = document.getElementById('close-button');
              const offcanvasContent = document.getElementById('offcanvas-content');
              const navbarLinks = navbar?.getElementsByTagName('a') || [];
              const navbarbtn = document.getElementById('menu-button');

              if (!navbar || !menuButton || !offcanvas || !closeButton || !offcanvasContent || !navbarbtn) return;

              // Show offcanvas on mobile
              menuButton.addEventListener('click', () => {
                offcanvas.classList.remove('hidden');
                offcanvas.setAttribute('aria-hidden', 'false');
                setTimeout(() => {
                  offcanvasContent.classList.remove('translate-x-full');
                }, 10);
              });

              // Close offcanvas on mobile
              closeButton.addEventListener('click', () => {
                offcanvasContent.classList.add('translate-x-full');
                offcanvas.setAttribute('aria-hidden', 'true');
                setTimeout(() => {
                  offcanvas.classList.add('hidden');
                }, 300);
              });

              // Close when clicking outside
              offcanvas.addEventListener('click', (e) => {
                if (e.target === offcanvas) {
                  closeButton.click();
                }
              });

              // Scroll effect
              window.addEventListener('scroll', () => {
                const shouldAddBg = window.scrollY > 10;
                navbar.classList.toggle('bg-teal-500', shouldAddBg);
                navbar.classList.toggle('shadow-lg', shouldAddBg);
                navbar.classList.toggle('bg-transparent', !shouldAddBg);
                
                // Keep text white in all states
                Array.from(navbarLinks).forEach(link => {
                  link.classList.toggle('text-white', true);
                });
                
                if (navbarbtn) {
                  navbarbtn.classList.toggle('text-white', true);
                }
              });

              // Smooth scroll
              document.querySelectorAll('a[href^="#"]').forEach(anchor => {
                anchor.addEventListener('click', function (e) {
                  e.preventDefault();
                  const targetId = this.getAttribute('href');
                  const targetElement = document.querySelector(targetId);
                  
                  if (targetElement) {
                    targetElement.scrollIntoView({
                      behavior: 'smooth',
                      block: 'start'
                    });
                    
                    // Update URL without page jump
                    if (history.pushState) {
                      history.pushState(null, '', targetId);
                    } else {
                      location.hash = targetId;
                    }
                  }
                });
              });
            });
          `}
        </Script>
      </body>
    </html>
  );
}