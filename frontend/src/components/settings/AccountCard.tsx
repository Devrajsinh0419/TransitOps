'use client';

import React from 'react';
import { Button } from '../ui/Button';
import { ShieldAlert, Laptop, Smartphone, Key, History } from 'lucide-react';
import { toast } from 'sonner';

export function AccountCard() {
  const [email, setEmail] = React.useState('sjenkins@transitops.com');
  const [username, setUsername] = React.useState('sjenkins_ops');
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const handleUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      toast.success('Account credentials updated');
    }, 600);
  };

  const devices = [
    { type: 'Desktop', name: 'MacBook Pro - Chrome (Houston, TX)', status: 'Active Now', current: true, icon: Laptop },
    { type: 'Mobile', name: 'iPhone 15 - Safari (Austin, TX)', status: 'Last active: 2 hours ago', current: false, icon: Smartphone },
  ];

  const loginHistory = [
    { ip: '192.168.1.102', location: 'Houston, TX', date: 'July 12, 2026 - 11:42 AM', status: 'Success' },
    { ip: '192.168.1.150', location: 'Austin, TX', date: 'July 11, 2026 - 04:18 PM', status: 'Success' },
    { ip: '10.0.4.12', location: 'Dallas, TX', date: 'July 09, 2026 - 08:31 AM', status: 'Blocked (Failed attempt)' },
  ];

  return (
    <div className="space-y-6 select-none text-left">
      {/* Credentials form */}
      <form onSubmit={handleUpdate} className="p-6 border border-border/50 bg-card rounded-2xl shadow-sm space-y-4">
        <h3 className="text-xs font-black uppercase tracking-wider text-foreground pb-2 border-b border-border/30 flex items-center gap-1.5">
          <Key className="h-4 w-4 text-primary" />
          Sign-in Credentials
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1.5 text-xs">
            <label className="font-bold text-muted-foreground uppercase text-[10px]">Email Address</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="h-10 w-full rounded-lg border border-border/60 bg-muted/10 px-3 font-semibold text-foreground focus:border-primary focus:outline-none"
            />
          </div>

          <div className="space-y-1.5 text-xs">
            <label className="font-bold text-muted-foreground uppercase text-[10px]">Username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="h-10 w-full rounded-lg border border-border/60 bg-muted/10 px-3 font-semibold text-foreground focus:border-primary focus:outline-none"
            />
          </div>
        </div>

        <div className="flex justify-end pt-2">
          <Button
            type="submit"
            isLoading={isSubmitting}
            className="h-9 text-xs font-extrabold bg-primary hover:bg-primary/95 text-primary-foreground rounded-lg px-4"
          >
            Update Credentials
          </Button>
        </div>
      </form>

      {/* Connected devices */}
      <div className="p-6 border border-border/50 bg-card rounded-2xl shadow-sm space-y-4">
        <h3 className="text-xs font-black uppercase tracking-wider text-foreground pb-2 border-b border-border/30 flex items-center gap-1.5">
          <Laptop className="h-4 w-4 text-primary" />
          Active Login Sessions
        </h3>

        <div className="space-y-3">
          {devices.map((device, idx) => (
            <div key={idx} className="flex justify-between items-center text-xs py-1 border-b border-border/10 last:border-0">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-muted rounded-lg">
                  <device.icon className="h-4 w-4 text-muted-foreground" />
                </div>
                <div>
                  <div className="font-bold text-foreground">{device.name}</div>
                  <div className="text-[9px] text-muted-foreground">{device.type} session</div>
                </div>
              </div>
              <div className="text-right">
                <span className={`text-[10px] font-black uppercase ${device.current ? 'text-emerald-500' : 'text-muted-foreground/60'}`}>
                  {device.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Login activity log */}
      <div className="p-6 border border-border/50 bg-card rounded-2xl shadow-sm space-y-4">
        <h3 className="text-xs font-black uppercase tracking-wider text-foreground pb-2 border-b border-border/30 flex items-center gap-1.5">
          <History className="h-4 w-4 text-primary" />
          Audit Trail Log
        </h3>

        <div className="space-y-3">
          {loginHistory.map((log, idx) => (
            <div key={idx} className="flex justify-between items-center text-xs py-1 border-b border-border/10 last:border-0">
              <div>
                <div className="font-bold text-foreground">{log.ip}</div>
                <div className="text-[9px] text-muted-foreground">{log.location} • {log.date}</div>
              </div>
              <div>
                <span
                  className={`text-[9px] font-extrabold px-2.5 py-0.5 rounded-full border ${
                    log.status.includes('Success')
                      ? 'bg-emerald-500/5 border-emerald-500/20 text-emerald-500'
                      : 'bg-rose-500/5 border-rose-500/20 text-rose-500'
                  }`}
                >
                  {log.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default AccountCard;
