import React, { useState } from 'react';
import { 
  Cloud, 
  Check, 
  Copy, 
  ExternalLink, 
  Terminal, 
  Database, 
  Server, 
  Globe, 
  Sparkles,
  ShieldCheck
} from 'lucide-react';

export const CloudDeployModal: React.FC = () => {
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const copyToClipboard = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Header */}
      <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-slate-800">
        <div className="flex items-center space-x-2">
          <Globe className="h-5 w-5 text-cyan-400" />
          <span className="text-xs uppercase font-extrabold tracking-wider text-cyan-400 font-mono">
            Cloud Deployment Center
          </span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white mt-1">
          Deploy KrishiFlow on the Web (100% Free Cloud Stack)
        </h1>
        <p className="text-slate-400 text-xs sm:text-sm mt-1 max-w-3xl">
          Follow these 3 simple steps to host your frontend PWA on Vercel and your Python OR-Tools FastAPI backend on Render with MongoDB Atlas & Upstash Redis.
        </p>
      </div>

      {/* 3 Step Interactive Walkthrough */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Step 1: Database & Redis */}
        <div className="glass-panel p-6 rounded-3xl border border-slate-800 space-y-4">
          <div className="flex items-center justify-between">
            <span className="h-8 w-8 rounded-xl bg-emerald-500/20 text-emerald-400 font-bold flex items-center justify-center text-sm border border-emerald-500/30">
              1
            </span>
            <Database className="h-5 w-5 text-emerald-400" />
          </div>

          <h3 className="text-base font-bold text-white">Database & Redis (Free)</h3>
          <p className="text-xs text-slate-400 leading-relaxed">
            Create free cloud database instances with 1-click:
          </p>

          <div className="space-y-2 pt-2">
            <a
              href="https://www.mongodb.com/cloud/atlas"
              target="_blank"
              rel="noreferrer"
              className="p-3 rounded-xl bg-slate-900/90 border border-slate-800 hover:border-emerald-500/40 text-xs font-semibold text-slate-200 flex items-center justify-between transition-colors block"
            >
              <span>MongoDB Atlas (Free M0)</span>
              <ExternalLink className="h-3.5 w-3.5 text-slate-400" />
            </a>

            <a
              href="https://upstash.com/"
              target="_blank"
              rel="noreferrer"
              className="p-3 rounded-xl bg-slate-900/90 border border-slate-800 hover:border-emerald-500/40 text-xs font-semibold text-slate-200 flex items-center justify-between transition-colors block"
            >
              <span>Upstash Serverless Redis</span>
              <ExternalLink className="h-3.5 w-3.5 text-slate-400" />
            </a>
          </div>
        </div>

        {/* Step 2: Backend on Render */}
        <div className="glass-panel p-6 rounded-3xl border border-slate-800 space-y-4">
          <div className="flex items-center justify-between">
            <span className="h-8 w-8 rounded-xl bg-cyan-500/20 text-cyan-400 font-bold flex items-center justify-center text-sm border border-cyan-500/30">
              2
            </span>
            <Server className="h-5 w-5 text-cyan-400" />
          </div>

          <h3 className="text-base font-bold text-white">Backend on Render / Railway</h3>
          <p className="text-xs text-slate-400 leading-relaxed">
            Deploy the FastAPI + Google OR-Tools backend directly from your GitHub repo:
          </p>

          <div className="p-3 rounded-xl bg-slate-950 font-mono text-[11px] text-slate-300 border border-slate-800 space-y-1">
            <div className="text-slate-500"># Render Build Command</div>
            <div className="text-cyan-300">pip install -r requirements.txt</div>
            <div className="text-slate-500 pt-1"># Start Command</div>
            <div className="text-cyan-300">uvicorn main:app --host 0.0.0.0 --port $PORT</div>
          </div>

          <a
            href="https://render.com/"
            target="_blank"
            rel="noreferrer"
            className="p-3 rounded-xl bg-cyan-950/40 border border-cyan-500/40 text-xs font-bold text-cyan-300 flex items-center justify-between transition-colors block text-center"
          >
            <span>Open Render Dashboard</span>
            <ExternalLink className="h-3.5 w-3.5" />
          </a>
        </div>

        {/* Step 3: Frontend on Vercel */}
        <div className="glass-panel p-6 rounded-3xl border border-slate-800 space-y-4">
          <div className="flex items-center justify-between">
            <span className="h-8 w-8 rounded-xl bg-amber-500/20 text-amber-400 font-bold flex items-center justify-center text-sm border border-amber-500/30">
              3
            </span>
            <Globe className="h-5 w-5 text-amber-400" />
          </div>

          <h3 className="text-base font-bold text-white">Frontend PWA on Vercel</h3>
          <p className="text-xs text-slate-400 leading-relaxed">
            Deploy the React PWA frontend on Vercel in 30 seconds with global CDN and SSL:
          </p>

          <div className="p-3 rounded-xl bg-slate-950 font-mono text-[11px] text-slate-300 border border-slate-800 space-y-1">
            <div className="text-slate-500"># Set Environment Variable</div>
            <div className="text-amber-300">VITE_API_URL=https://your-backend.onrender.com/api</div>
          </div>

          <a
            href="https://vercel.com/new"
            target="_blank"
            rel="noreferrer"
            className="p-3 rounded-xl bg-amber-950/40 border border-amber-500/40 text-xs font-bold text-amber-300 flex items-center justify-between transition-colors block text-center"
          >
            <span>Deploy to Vercel</span>
            <ExternalLink className="h-3.5 w-3.5" />
          </a>
        </div>

      </div>

      {/* Environment Config Snippet */}
      <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-slate-800 space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Terminal className="h-5 w-5 text-emerald-400" />
            <h3 className="text-base font-bold text-white">Backend .env Configuration (Copy Ready)</h3>
          </div>
          <button
            onClick={() => copyToClipboard(`MONGODB_URI=mongodb+srv://<user>:<pwd>@cluster0.mongodb.net/\nUPSTASH_REDIS_URL=rediss://default:xxxxx@xxxxx.upstash.io:6379\nPORT=8000`, 'env')}
            className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-bold text-slate-200 flex items-center space-x-1.5"
          >
            {copiedKey === 'env' ? <Check className="h-3.5 w-3.5 text-emerald-400" /> : <Copy className="h-3.5 w-3.5" />}
            <span>{copiedKey === 'env' ? 'Copied!' : 'Copy Variables'}</span>
          </button>
        </div>

        <pre className="p-4 rounded-2xl bg-slate-950 text-slate-300 font-mono text-xs overflow-x-auto border border-slate-800">
{`# 1. MongoDB Atlas URI (Free M0 Tier)
MONGODB_URI=mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/krishiflow_db

# 2. Upstash Serverless Redis (For Atomic Distributed Locks)
UPSTASH_REDIS_URL=rediss://default:xxxxxx@xxxxxx.upstash.io:6379

# 3. Optional Live Twilio / WhatsApp Cloud API credentials
TWILIO_ACCOUNT_SID=
TWILIO_AUTH_TOKEN=
TWILIO_FROM_NUMBER=+1234567890
WHATSAPP_TOKEN=
WHATSAPP_PHONE_NUMBER_ID=`}
        </pre>
      </div>

    </div>
  );
};
