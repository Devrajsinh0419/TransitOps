import React from 'react';
import { AppLogo } from '../common/AppLogo';
import { AppTitle } from '../common/AppTitle';

export function AuthLogo() {
  return (
    <div className="flex items-center gap-3 justify-center select-none">
      <AppLogo collapsed={true} className="h-10 w-10 text-primary" />
      <AppTitle size="lg" />
    </div>
  );
}

export default AuthLogo;


