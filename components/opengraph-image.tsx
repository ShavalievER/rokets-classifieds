import { ImageResponse } from 'next/og';
import { join } from 'path';
import { readFile } from 'fs/promises';
import { existsSync } from 'fs';

export type Props = {
  title?: string;
};

export default async function OpengraphImage(
  props?: Props
): Promise<ImageResponse> {
  const { title } = {
    ...{
      title: process.env.SITE_NAME
    },
    ...props
  };

  const file = await readFile(join(process.cwd(), './fonts/Inter-Bold.ttf'));
  const font = Uint8Array.from(file).buffer;

  // Try to load custom logo if it exists
  let logoDataUrl: string | null = null;
  const logoSvgPath = join(process.cwd(), './public/rokets-logo.svg');
  const logoPngPath = join(process.cwd(), './public/rokets-logo.png');
  
  try {
    if (existsSync(logoSvgPath)) {
      const logoFile = await readFile(logoSvgPath);
      const logoBase64 = logoFile.toString('base64');
      logoDataUrl = `data:image/svg+xml;base64,${logoBase64}`;
    } else if (existsSync(logoPngPath)) {
      const logoFile = await readFile(logoPngPath);
      const logoBase64 = logoFile.toString('base64');
      logoDataUrl = `data:image/png;base64,${logoBase64}`;
    }
  } catch (error) {
    // If logo file can't be read, use fallback
    console.error('Error loading logo:', error);
  }

  return new ImageResponse(
    (
      <div tw="flex h-full w-full flex-col items-center justify-center bg-black">
        <div tw="flex flex-none items-center justify-center border border-neutral-700 h-[160px] w-[160px] rounded-3xl">
          {logoDataUrl ? (
            <img
              src={logoDataUrl}
              alt="Rokets logo"
              width="64"
              height="64"
              tw="object-contain"
            />
          ) : (
            // Fallback inline SVG logo
            <svg width="64" height="58" viewBox="0 0 24 28" fill="white">
              <path d="M12 2L8 10L8 18L12 24L16 18L16 10L12 2Z" />
              <path d="M12 2L10 6L12 10L14 6L12 2Z" />
              <path d="M8 10L4 14L6 16L8 14L8 10Z" />
              <path d="M16 10L16 14L18 16L20 14L16 10Z" />
              <circle cx="12" cy="14" r="1.5" fill="black" />
              <path d="M10 18L12 22L14 18L12 20L10 18Z" />
            </svg>
          )}
        </div>
        <p tw="mt-12 text-6xl font-bold text-white">{title}</p>
      </div>
    ),
    {
      width: 1200,
      height: 630,
      fonts: [
        {
          name: 'Inter',
          data: font,
          style: 'normal',
          weight: 700
        }
      ]
    }
  );
}
