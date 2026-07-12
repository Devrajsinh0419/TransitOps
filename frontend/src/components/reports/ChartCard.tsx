'use client';

import React from 'react';
import {
  ResponsiveContainer,
  LineChart,
  Line,
  BarChart,
  Bar,
  AreaChart,
  Area,
  PieChart,
  Pie,
  Cell,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from 'recharts';
import { Maximize2, Download, Info } from 'lucide-react';
import { Button } from '../ui/Button';

interface ChartCardProps {
  title: string;
  type: 'line' | 'bar' | 'area' | 'stacked-bar' | 'pie' | 'donut' | 'radar' | 'horizontal-bar';
  data: any[];
  dataKeys: string[];
  colors?: string[];
  description?: string;
}

export function ChartCard({
  title,
  type,
  data,
  dataKeys,
  colors = ['#6366f1', '#10b981', '#3b82f6', '#f59e0b', '#ef4444'],
  description,
}: ChartCardProps) {
  const [mounted, setMounted] = React.useState(false);
  const [isFullscreen, setIsFullscreen] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  const handleDownload = () => {
    const jsonString = `data:text/json;charset=utf-8,${encodeURIComponent(JSON.stringify(data, null, 2))}`;
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', jsonString);
    downloadAnchor.setAttribute('download', `${title.toLowerCase().replace(/\s+/g, '_')}_dataset.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    document.body.removeChild(downloadAnchor);
  };

  if (!mounted) {
    return (
      <div className="h-72 border border-border/50 bg-card rounded-2xl flex items-center justify-center text-xs font-semibold text-muted-foreground animate-pulse">
        Initializing interactive chart component...
      </div>
    );
  }

  const renderChart = () => {
    const mainKey = dataKeys[0];
    const secondaryKey = dataKeys[1];

    switch (type) {
      case 'line':
        return (
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
            <XAxis dataKey="name" stroke="#94a3b8" fontSize={9} tickLine={false} />
            <YAxis stroke="#94a3b8" fontSize={9} tickLine={false} />
            <Tooltip contentStyle={{ fontSize: '10px', borderRadius: '8px', border: '1px solid #e2e8f0' }} />
            <Legend wrapperStyle={{ fontSize: '10px' }} />
            <Line type="monotone" dataKey={mainKey} stroke={colors[0]} strokeWidth={2.5} activeDot={{ r: 6 }} />
            {secondaryKey && <Line type="monotone" dataKey={secondaryKey} stroke={colors[1]} strokeWidth={2.5} />}
          </LineChart>
        );

      case 'bar':
        return (
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
            <XAxis dataKey="name" stroke="#94a3b8" fontSize={9} tickLine={false} />
            <YAxis stroke="#94a3b8" fontSize={9} tickLine={false} />
            <Tooltip contentStyle={{ fontSize: '10px', borderRadius: '8px', border: '1px solid #e2e8f0' }} />
            <Legend wrapperStyle={{ fontSize: '10px' }} />
            <Bar dataKey={mainKey} fill={colors[0]} radius={[4, 4, 0, 0]} />
            {secondaryKey && <Bar dataKey={secondaryKey} fill={colors[1]} radius={[4, 4, 0, 0]} />}
          </BarChart>
        );

      case 'area':
        return (
          <AreaChart data={data}>
            <defs>
              <linearGradient id={`grad-${mainKey}`} x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={colors[0]} stopOpacity={0.25} />
                <stop offset="95%" stopColor={colors[0]} stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
            <XAxis dataKey="name" stroke="#94a3b8" fontSize={9} tickLine={false} />
            <YAxis stroke="#94a3b8" fontSize={9} tickLine={false} />
            <Tooltip contentStyle={{ fontSize: '10px', borderRadius: '8px', border: '1px solid #e2e8f0' }} />
            <Legend wrapperStyle={{ fontSize: '10px' }} />
            <Area type="monotone" dataKey={mainKey} stroke={colors[0]} strokeWidth={2} fillOpacity={1} fill={`url(#grad-${mainKey})`} />
          </AreaChart>
        );

      case 'stacked-bar':
        return (
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
            <XAxis dataKey="name" stroke="#94a3b8" fontSize={9} tickLine={false} />
            <YAxis stroke="#94a3b8" fontSize={9} tickLine={false} />
            <Tooltip contentStyle={{ fontSize: '10px', borderRadius: '8px', border: '1px solid #e2e8f0' }} />
            <Legend wrapperStyle={{ fontSize: '10px' }} />
            <Bar dataKey={mainKey} stackId="a" fill={colors[0]} />
            {secondaryKey && <Bar dataKey={secondaryKey} stackId="a" fill={colors[1]} />}
          </BarChart>
        );

      case 'pie':
      case 'donut':
        const innerRad = type === 'donut' ? 45 : 0;
        return (
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={innerRad}
              outerRadius={70}
              paddingAngle={4}
              dataKey="value"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
              ))}
            </Pie>
            <Tooltip contentStyle={{ fontSize: '10px', borderRadius: '8px' }} />
            <Legend wrapperStyle={{ fontSize: '9px' }} layout="horizontal" align="center" verticalAlign="bottom" />
          </PieChart>
        );

      case 'radar':
        return (
          <RadarChart cx="50%" cy="50%" outerRadius="70%" data={data}>
            <PolarGrid stroke="#e2e8f0" />
            <PolarAngleAxis dataKey="name" stroke="#94a3b8" fontSize={9} />
            <PolarRadiusAxis stroke="#94a3b8" fontSize={8} />
            <Radar name={mainKey} dataKey="value" stroke={colors[0]} fill={colors[0]} fillOpacity={0.25} />
            <Tooltip contentStyle={{ fontSize: '10px', borderRadius: '8px' }} />
          </RadarChart>
        );

      case 'horizontal-bar':
        return (
          <BarChart layout="vertical" data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" horizontal={false} />
            <XAxis type="number" stroke="#94a3b8" fontSize={9} tickLine={false} />
            <YAxis type="category" dataKey="name" stroke="#94a3b8" fontSize={9} tickLine={false} width={80} />
            <Tooltip contentStyle={{ fontSize: '10px', borderRadius: '8px' }} />
            <Bar dataKey="value" fill={colors[0]} radius={[0, 4, 4, 0]} />
          </BarChart>
        );

      default:
        return null;
    }
  };

  const layoutClasses = isFullscreen
    ? 'fixed inset-4 z-50 bg-card border border-border rounded-2xl p-8 flex flex-col justify-between shadow-2xl'
    : 'p-5 bg-card border border-border/50 rounded-2xl shadow-sm space-y-4';

  return (
    <div className={`${layoutClasses} select-none text-left`}>
      <div className="flex items-center justify-between">
        <div className="space-y-0.5">
          <h3 className="text-xs font-black text-foreground uppercase tracking-wider flex items-center gap-1.5">
            {title}
            {description && (
              <span className="group relative cursor-pointer text-muted-foreground/60 hover:text-foreground">
                <Info className="h-3.5 w-3.5" />
                <span className="absolute left-6 bottom-0 hidden group-hover:block bg-foreground text-background text-[8px] p-2 rounded-lg max-w-xs z-50 whitespace-normal leading-normal font-semibold">
                  {description}
                </span>
              </span>
            )}
          </h3>
        </div>

        <div className="flex items-center gap-1.5">
          <Button
            variant="ghost"
            size="sm"
            onClick={handleDownload}
            className="h-8 w-8 text-muted-foreground hover:text-foreground hover:bg-muted p-0 rounded-lg flex items-center justify-center"
            title="Download CSV"
          >
            <Download className="h-3.5 w-3.5" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsFullscreen(!isFullscreen)}
            className="h-8 w-8 text-muted-foreground hover:text-foreground hover:bg-muted p-0 rounded-lg flex items-center justify-center"
            title="Fullscreen Mode"
          >
            <Maximize2 className="h-3.5 w-3.5" />
          </Button>
        </div>
      </div>

      <div className={`${isFullscreen ? 'h-[75vh]' : 'h-64'} w-full mt-2`}>
        <ResponsiveContainer width="100%" height="100%">
          {renderChart() as any}
        </ResponsiveContainer>
      </div>

      {isFullscreen && (
        <div className="flex justify-end pt-4 border-t border-border/20">
          <Button variant="outline" size="sm" onClick={() => setIsFullscreen(false)} className="h-9 rounded-lg">
            Close Fullscreen
          </Button>
        </div>
      )}
    </div>
  );
}

export default ChartCard;
