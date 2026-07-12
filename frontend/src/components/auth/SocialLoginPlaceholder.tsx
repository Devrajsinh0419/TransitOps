import React from 'react';
import { Button } from '../ui/Button';

// SVG Icons for Github and Google
const GithubIcon = () => (
  <svg className="h-4 w-4 fill-current shrink-0" viewBox="0 0 24 24">
    <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.87 1.52 2.34 1.07 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.92 0-1.11.38-2 1.03-2.71-.1-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02.79-.22 1.65-.33 2.5-.33.85 0 1.71.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.35.2 2.39.1 2.64.65.71 1.03 1.6 1.03 2.71 0 3.82-2.34 4.66-4.57 4.91.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0012 2z" />
  </svg>
);

const GoogleIcon = () => (
  <svg className="h-4 w-4 shrink-0" viewBox="0 0 24 24">
    <path fill="#EA4335" d="M12 5.04c1.67 0 3.17.57 4.35 1.7l3.25-3.25C17.63 1.72 15 1 12 1 7.37 1 3.4 3.66 1.48 7.56l3.85 3C6.25 7.6 8.91 5.04 12 5.04z" />
    <path fill="#4285F4" d="M23.49 12.27c0-.81-.07-1.59-.2-2.36H12v4.51h6.46c-.29 1.48-1.14 2.73-2.42 3.57v2.96h3.9c2.28-2.1 3.55-5.19 3.55-8.68z" />
    <path fill="#FBBC05" d="M5.33 14.56c-.24-.72-.37-1.49-.37-2.28s.13-1.56.37-2.28L1.48 7.01C.53 8.92 0 11.04 0 13.28s.53 4.36 1.48 6.27l3.85-2.99z" />
    <path fill="#34A853" d="M12 23c3.24 0 5.97-1.08 7.96-2.92l-3.9-2.96c-1.08.72-2.48 1.16-4.06 1.16-3.09 0-5.75-2.56-6.67-5.52l-3.85 3C3.4 20.34 7.37 23 12 23z" />
  </svg>
);

export function SocialLoginPlaceholder() {
  const handleSocialClick = (provider: string) => {
    // Simple redirect placeholder alert
    alert(`Social Login redirect to OAuth provider: ${provider}`);
  };

  return (
    <div className="space-y-4 select-none w-full">
      {/* Divider */}
      <div className="relative flex items-center justify-center my-4">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-border/80"></div>
        </div>
        <span className="relative bg-card px-3 text-[10px] font-bold text-muted-foreground uppercase tracking-widest leading-none">
          Or continue with
        </span>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <Button
          variant="outline"
          size="sm"
          onClick={() => handleSocialClick('github')}
          leftIcon={<GithubIcon />}
          className="cursor-pointer font-semibold text-xs border-border bg-transparent hover:bg-muted"
        >
          GitHub
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => handleSocialClick('google')}
          leftIcon={<GoogleIcon />}
          className="cursor-pointer font-semibold text-xs border-border bg-transparent hover:bg-muted"
        >
          Google
        </Button>
      </div>
    </div>
  );
}

export default SocialLoginPlaceholder;
