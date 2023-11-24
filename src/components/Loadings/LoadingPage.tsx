import React from 'react';

import TransparentBackground from '@/ui/TransParenteBackground';

import IconLoading from '../../../public/images/IconLoading';
import IconSirene from '../../../public/images/IconSirene';
import Logo from '../../../public/images/Logo';

const LoadingPage = ({ pending }: { pending: boolean }) => {
  return (
    <>
      {pending ? (
        <TransparentBackground>
          <span className="flex flex-col items-center gap-2">
            <Logo />
            <IconLoading />
            Carregando...
          </span>
        </TransparentBackground>
      ) : null}
    </>
  );
};

export default LoadingPage;
