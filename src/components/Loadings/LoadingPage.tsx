import React from 'react';

import TransparentBackground from '@/ui/TransParenteBackground';

import IconSirene from '../../../public/images/IconSirene';

const LoadingPage = ({ pending }: { pending: boolean }) => {
  return (
    <>
      {pending ? (
        <TransparentBackground>
          <IconSirene />
        </TransparentBackground>
      ) : null}
    </>
  );
};

export default LoadingPage;
