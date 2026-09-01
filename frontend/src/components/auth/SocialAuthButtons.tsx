import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { authService } from '../../services/authService';

interface SocialAuthButtonsProps {
  actionLabel?: 'continue' | 'register';
}

export const SocialAuthButtons: React.FC<SocialAuthButtonsProps> = ({ actionLabel = 'continue' }) => {
  const { setUser, setCurrentScreen, showToast } = useAuth();
  const [loadingProvider, setLoadingProvider] = React.useState<string | null>(null);

  const handleSocial = async (provider: 'google' | 'apple' | 'github' | 'microsoft') => {
    try {
      setLoadingProvider(provider);
      showToast(`Connecting to ${provider.toUpperCase()} SSO...`, undefined, 'info');
      const user = await authService.loginWithSocial(provider);
      setUser(user);
      setCurrentScreen('dashboard');
      showToast(`Authenticated via ${provider.toUpperCase()}`, `Welcome to KrishiFlow, ${user.name}!`, 'success');
    } catch {
      showToast('Authentication failed', 'Could not authenticate with provider', 'error');
    } finally {
      setLoadingProvider(null);
    }
  };

  return (
    <div className="space-y-4">
      {/* Divider */}
      <div className="relative my-4">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-slate-800" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-slate-900 px-3 text-slate-500 font-medium tracking-wider">
            Or {actionLabel} with
          </span>
        </div>
      </div>

      {/* Grid of 4 Social Buttons */}
      <div className="grid grid-cols-4 gap-2.5">
        <button
          type="button"
          onClick={() => handleSocial('google')}
          disabled={!!loadingProvider}
          className="flex items-center justify-center py-2.5 px-3 bg-slate-800/80 hover:bg-slate-700/80 border border-slate-700/60 rounded-xl transition-all hover:border-slate-600 hover:scale-105 active:scale-95 disabled:opacity-50"
          title="Google"
        >
          <svg className="w-4 h-4" viewBox="0 0 24 24">
            <path fill="#EA4335" d="M12 5c1.6 0 3 .6 4.1 1.7l3.1-3.1C17.3 1.8 14.8 1 12 1 7.5 1 3.7 3.6 1.9 7.3l3.7 2.9C6.5 7.3 9 5 12 5z" />
            <path fill="#4285F4" d="M23.5 12.3c0-.8-.1-1.6-.2-2.3H12v4.5h6.5c-.3 1.5-1.1 2.8-2.4 3.7l3.7 2.9c2.2-2 3.7-5 3.7-8.8z" />
            <path fill="#FBBC05" d="M5.6 14.8c-.2-.7-.4-1.5-.4-2.8s.2-2.1.4-2.8L1.9 6.3C.7 8.7 0 10.3 0 12s.7 3.3 1.9 5.7l3.7-2.9z" />
            <path fill="#34A853" d="M12 23c3.2 0 6-1.1 8-3l-3.7-2.9c-1.1.7-2.5 1.2-4.3 1.2-3 0-5.5-2.3-6.4-5.2L1.9 16C3.7 20.4 7.5 23 12 23z" />
          </svg>
        </button>

        <button
          type="button"
          onClick={() => handleSocial('apple')}
          disabled={!!loadingProvider}
          className="flex items-center justify-center py-2.5 px-3 bg-slate-800/80 hover:bg-slate-700/80 border border-slate-700/60 rounded-xl transition-all hover:border-slate-600 hover:scale-105 active:scale-95 disabled:opacity-50"
          title="Apple"
        >
          <svg className="w-4 h-4 text-white fill-current" viewBox="0 0 170 170">
            <path d="M150.37 130.25c-2.45 5.66-5.35 10.87-8.71 15.66-4.58 6.53-8.33 11.05-11.22 13.56-4.48 4.12-9.28 6.23-14.42 6.35-3.69 0-8.14-1.05-13.32-3.18-5.19-2.12-9.97-3.17-14.34-3.17-4.58 0-9.49 1.05-14.74 3.17-5.26 2.13-9.5 3.24-12.74 3.35-4.35.13-9.16-1.9-14.42-6.08-3.69-3.08-7.7-7.92-12.03-14.5-5.99-9.16-10.74-19.8-14.25-31.91-3.51-12.12-5.26-23.75-5.26-34.91 0-13.62 3.37-25.04 10.11-34.25 6.74-9.2 15.22-13.9 25.43-14.11 4.79 0 10.08 1.25 15.88 3.75 5.79 2.5 9.74 3.8 11.83 3.91 1.74-.11 5.89-1.47 12.44-4.08 6.55-2.61 12.16-3.75 16.83-3.41 12.39.75 22.25 5.41 29.58 13.98-10.79 6.53-16.08 15.55-15.88 27.06.22 9.04 3.69 16.65 10.42 22.84 6.73 6.19 14.65 9.68 23.75 10.48-2.62 7.84-5.69 15.42-9.22 22.75zM119.22 31.81c0-7.39 2.67-14.24 8.01-20.55 5.34-6.31 11.88-10.43 19.63-12.36.98 7.39-1.25 14.35-6.69 20.89-5.44 6.53-12.08 10.37-19.92 11.51-.33-1.42-.51-2.92-.51-4.49z" />
          </svg>
        </button>

        <button
          type="button"
          onClick={() => handleSocial('github')}
          disabled={!!loadingProvider}
          className="flex items-center justify-center py-2.5 px-3 bg-slate-800/80 hover:bg-slate-700/80 border border-slate-700/60 rounded-xl transition-all hover:border-slate-600 hover:scale-105 active:scale-95 disabled:opacity-50"
          title="GitHub"
        >
          <svg className="w-4 h-4 text-white fill-current" viewBox="0 0 24 24">
            <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
          </svg>
        </button>

        <button
          type="button"
          onClick={() => handleSocial('microsoft')}
          disabled={!!loadingProvider}
          className="flex items-center justify-center py-2.5 px-3 bg-slate-800/80 hover:bg-slate-700/80 border border-slate-700/60 rounded-xl transition-all hover:border-slate-600 hover:scale-105 active:scale-95 disabled:opacity-50"
          title="Microsoft"
        >
          <svg className="w-4 h-4" viewBox="0 0 23 23">
            <path fill="#f35325" d="M1 1h10v10H1z" />
            <path fill="#81bc06" d="M12 1h10v10H12z" />
            <path fill="#05a6f0" d="M1 12h10v10H1z" />
            <path fill="#ffba08" d="M12 12h10v10H12z" />
          </svg>
        </button>
      </div>
    </div>
  );
};
