import clsx from 'clsx';
import LogoIcon from './icons/logo';

export default function LogoSquare({ size }: { size?: 'sm' | undefined }) {
  // Rectangular area for logo, без рамки и собственного фона.
  // Фон наследуется от шапки/футера
  const containerClasses = clsx('flex flex-none items-center justify-center overflow-hidden', {
    'h-[48px] w-[160px]': !size, // шапка - нормальный размер
    'h-[36px] w-[120px]': size === 'sm' // футер - немного меньше
  });

  return (
    <div className={containerClasses}>
      <LogoIcon className="h-full w-auto object-contain" />
    </div>
  );
}
