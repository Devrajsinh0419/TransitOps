import React from 'react';

export function RequiredIndicator() {
  return (
    <span className="text-destructive font-bold ml-0.5 select-none" aria-hidden="true">
      *
    </span>
  );
}

export default RequiredIndicator;
