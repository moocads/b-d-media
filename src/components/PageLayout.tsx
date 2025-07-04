import {useTranslations} from 'next-intl';
import {ReactNode} from 'react';
import ExternalLink from './ExternalLink';

type Props = {
  children?: ReactNode;
  title: ReactNode;
};

export default function PageLayout({children, title}: Props) {
  const t = useTranslations('PageLayout');

  return (
    <div className="relative flex grow flex-col pt-36 pb-20 mt-[100px]">
      <div className="container relative flex grow flex-col px-4">
        <h1 className="text-3xl font-semibold leading-tight tracking-tight text-black md:text-5xl">
          {title}
        </h1>
        <div className="text-gray-400 md:text-lg">{children}</div>
      </div>
    </div>
  );
}
