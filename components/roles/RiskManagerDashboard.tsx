"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
    BarChart3,
    TrendingDown,
    AlertOctagon,
    Activity,
    Settings2,
    ShieldAlert,
    Target,
    Zap,
    Scale,
    Filter,
    Download
} from 'lucide-react';
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    AreaChart,
    Area,
    PieChart,
    Pie,
    Cell
} from 'recharts';

const portfolioData = [
    { name: 'Jan', defaults: 1.2, performance: 94 },
    { name: 'Feb', defaults: 1.4, performance: 95 },
    { name: 'Mar', defaults: 1.1, performance: 97 },
    { name: 'Apr', defaults: 0.9, performance: 98 },
    { name: 'May', defaults: 1.0, performance: 96 },
    { name: 'Jun', defaults: 0.8, performance: 99 },
];

const segmentRisk = [
    { name: 'Salary < 50k', value: 45, color: '#f59e0b' },
    { name: 'Salary 50k-1L', value: 35, color: '#10b981' },
    { name: 'Salary > 1L', value: 20, color: '#4f46e5' },
];

export function RiskManagerDashboard() {
    return (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-3xl font-bold tracking-tight">Risk & Analytics Control</h2>
                    <p className="text-slate-500">Portfolio oversight, fraud monitoring, and model governance.</p>
                </div>
                <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                        <Download className="h-4 w-4 mr-2" /> Export Reports
                    </Button>
                    <Button size="sm">
                        <Settings2 className="h-4 w-4 mr-2" /> Adjust Thresholds
                    </Button>
                </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <Card className="bg-slate-900 text-slate-50 shadow-xl border-none">
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-sm font-medium">Portfolio Default Rate</CardTitle>
                        <TrendingDown className="h-4 w-4 text-green-400" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-3xl font-extrabold text-green-400">0.82%</div>
                        <p className="text-xs text-slate-400 mt-1">-0.14% from previous Qtr</p>
                    </CardContent>
                </Card>
                <Card className="hover:shadow-md transition-shadow">
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-sm font-medium">Model AUC (ROC)</CardTitle>
                        <Target className="h-4 w-4 text-primary" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">0.964</div>
                        <p className="text-xs text-slate-500 mt-1">High predictive accuracy</p>
                    </CardContent>
                </Card>
                <Card className="hover:shadow-md transition-shadow">
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-sm font-medium">Fraud Detection Rate</CardTitle>
                        <ShieldAlert className="h-4 w-4 text-red-500" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">92.1%</div>
                        <p className="text-xs text-slate-500 mt-1">True positive recall</p>
                    </CardContent>
                </Card>
                <Card className="hover:shadow-md transition-shadow">
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-sm font-medium">Bias/Fairness Index</CardTitle>
                        <Scale className="h-4 w-4 text-blue-500" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">0.98</div>
                        <p className="text-xs text-slate-500 mt-1">Negligible demographic parity gap</p>
                    </CardContent>
                </Card>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
                <Card className="col-span-4">
                    <CardHeader>
                        <div className="flex items-center justify-between">
                            <CardTitle>Default Rate Trends</CardTitle>
                            <Badge variant="outline">Last 6 Months</Badge>
                        </div>
                        <CardDescription>Visualizing portfolio performance over time.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="h-[300px]">
                            <ResponsiveContainer width="100%" height="100%">
                                <AreaChart data={portfolioData}>
                                    <defs>
                                        <linearGradient id="colorDef" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor="#ef4444" stopOpacity={0.1} />
                                            <stop offset="95%" stopColor="#ef4444" stopOpacity={0} />
                                        </linearGradient>
                                    </defs>
                                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                                    <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12 }} />
                                    <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12 }} />
                                    <Tooltip />
                                    <Area type="monotone" dataKey="defaults" stroke="#ef4444" strokeWidth={3} fillOpacity={1} fill="url(#colorDef)" />
                                </AreaChart>
                            </ResponsiveContainer>
                        </div>
                    </CardContent>
                </Card>
                <Card className="col-span-3">
                    <CardHeader>
                        <CardTitle>Risk by Segment</CardTitle>
                        <CardDescription>Concentration of defaults by income group.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="h-[250px]">
                            <ResponsiveContainer width="100%" height="100%">
                                <PieChart>
                                    <Pie
                                        data={segmentRisk}
                                        cx="50%"
                                        cy="50%"
                                        innerRadius={60}
                                        outerRadius={80}
                                        paddingAngle={5}
                                        dataKey="value"
                                    >
                                        {segmentRisk.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={entry.color} />
                                        ))}
                                    </Pie>
                                    <Tooltip />
                                </PieChart>
                            </ResponsiveContainer>
                        </div>
                        <div className="mt-4 space-y-2">
                            {segmentRisk.map((item) => (
                                <div key={item.name} className="flex items-center justify-between text-xs">
                                    <div className="flex items-center gap-2">
                                        <div className="w-2 h-2 rounded-full" style={{ backgroundColor: item.color }} />
                                        <span className="text-slate-600">{item.name}</span>
                                    </div>
                                    <span className="font-bold">{item.value}%</span>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            </div>

            <div className="grid gap-4 md:grid-cols-1">
                <Card>
                    <CardHeader className="border-b pb-4">
                        <div className="flex items-center justify-between">
                            <div>
                                <CardTitle className="flex items-center gap-2">
                                    <ShieldAlert className="h-5 w-5 text-red-500" /> Fraud Pattern Alerts
                                </CardTitle>
                                <CardDescription>Detection of coordinated synthetic identity attempts.</CardDescription>
                            </div>
                            <Button size="sm" variant="destructive">Freeze All Suspicious Sessions</Button>
                        </div>
                    </CardHeader>
                    <CardContent className="pt-6">
                        <div className="space-y-4">
                            {[
                                { title: 'Address Clustering Detected', impact: 'High', description: '12 applications from identical lat/long within 1 hour.', color: 'bg-red-50 border-red-200 text-red-700' },
                                { title: 'Synthetic ID Signal', impact: 'Medium', description: 'PAN verification failures increased by 40% for segment B.', color: 'bg-yellow-50 border-yellow-200 text-yellow-700' },
                                { title: 'Velocity Check Triggered', impact: 'Low', description: 'Higher than normal withdrawal patterns in Sector 4.', color: 'bg-blue-50 border-blue-200 text-blue-700' },
                            ].map((alert, i) => (
                                <div key={i} className={`p-4 rounded-xl border ${alert.color} flex justify-between items-start`}>
                                    <div>
                                        <div className="flex items-center gap-2 mb-1">
                                            <span className="font-bold text-sm tracking-tight">{alert.title}</span>
                                            <Badge variant="outline" className="text-[10px] h-4 uppercase">{alert.impact} Impact</Badge>
                                        </div>
                                        <p className="text-xs opacity-80">{alert.description}</p>
                                    </div>
                                    <Button variant="ghost" size="sm" className="h-8 hover:bg-white/20">Review</Button>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
