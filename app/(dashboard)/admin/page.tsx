"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart, Bar, PieChart, Pie, Cell, ResponsiveContainer, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

const anomalyData = [
    { name: 'Mon', count: 4 },
    { name: 'Tue', count: 7 },
    { name: 'Wed', count: 2 },
    { name: 'Thu', count: 12 },
    { name: 'Fri', count: 5 },
    { name: 'Sat', count: 3 },
    { name: 'Sun', count: 1 },
];

const decisionData = [
    { name: 'Approved', value: 540, color: '#10b981' },
    { name: 'Rejected', value: 120, color: '#ef4444' },
    { name: 'Manual Review', value: 45, color: '#f59e0b' },
];

const recentFlags = [
    { id: 'TXN-9821', type: 'Velocity Check', severity: 'High', status: 'Blocked', timestamp: '10:42 AM' },
    { id: 'TXN-9822', type: 'IP Mismatch', severity: 'Medium', status: 'Review', timestamp: '10:45 AM' },
    { id: 'TXN-9823', type: 'Pattern Match', severity: 'Low', status: 'Cleared', timestamp: '11:01 AM' },
    { id: 'TXN-9824', type: 'Device ID', severity: 'Critical', status: 'Blocked', timestamp: '11:15 AM' },
];

export default function AdminPage() {
    return (
        <div className="space-y-6 animate-in fade-in zoom-in duration-500">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">System Administration</h1>
                    <p className="text-slate-500">ML Model Monitoring & Fraud Analytics Dashboard.</p>
                </div>
                <div className="flex gap-2">
                    <Badge variant="outline" className="text-green-600 border-green-200 bg-green-50">System Healthy</Badge>
                    <Badge variant="outline" className="text-blue-600 border-blue-200 bg-blue-50">v2.4.1</Badge>
                </div>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                <Card>
                    <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium">Model Latency</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">45ms</div>
                        <p className="text-xs text-slate-500">-12ms vs yesterday</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium">Throughput</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">120 req/s</div>
                        <p className="text-xs text-slate-500">+5% vs peak hour</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium">Drift Detected</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-green-600">0.02%</div>
                        <p className="text-xs text-slate-500">Below threshold (2.0%)</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium">False Positives</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-yellow-600">1.4%</div>
                        <p className="text-xs text-slate-500">Within acceptable range</p>
                    </CardContent>
                </Card>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
                {/* Charts */}
                <Card className="shadow-sm">
                    <CardHeader>
                        <CardTitle>Fraud Detection Trends</CardTitle>
                        <CardDescription>Anomalies flagged over the last 7 days.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <ResponsiveContainer width="100%" height={300}>
                            <BarChart data={anomalyData}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                                <XAxis dataKey="name" fontSize={12} tickLine={false} axisLine={false} />
                                <YAxis fontSize={12} tickLine={false} axisLine={false} />
                                <Tooltip cursor={{ fill: 'transparent' }} />
                                <Bar dataKey="count" fill="#ef4444" radius={[4, 4, 0, 0]} barSize={30} />
                            </BarChart>
                        </ResponsiveContainer>
                    </CardContent>
                </Card>

                <Card className="shadow-sm">
                    <CardHeader>
                        <CardTitle>Decision Outcomes</CardTitle>
                        <CardDescription>Distribution of automated decisions.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <ResponsiveContainer width="100%" height={300}>
                            <PieChart>
                                <Pie
                                    data={decisionData}
                                    cx="50%"
                                    cy="50%"
                                    innerRadius={60}
                                    outerRadius={80}
                                    paddingAngle={5}
                                    dataKey="value"
                                >
                                    {decisionData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={entry.color} />
                                    ))}
                                </Pie>
                                <Tooltip />
                            </PieChart>
                        </ResponsiveContainer>
                        <div className="flex justify-center gap-4 text-xs text-slate-500 mt-2">
                            {decisionData.map((item) => (
                                <div key={item.name} className="flex items-center gap-1">
                                    <div className="w-2 h-2 rounded-full" style={{ backgroundColor: item.color }} />
                                    {item.name}
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            </div>

            <Card className="shadow-sm">
                <CardHeader>
                    <CardTitle>Recent Fraud Alerts</CardTitle>
                    <CardDescription>Latest flagged transactions requiring attention.</CardDescription>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Alert ID</TableHead>
                                <TableHead>Type</TableHead>
                                <TableHead>Severity</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead>Time</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {recentFlags.map((flag) => (
                                <TableRow key={flag.id}>
                                    <TableCell className="font-medium">{flag.id}</TableCell>
                                    <TableCell>{flag.type}</TableCell>
                                    <TableCell>
                                        <Badge variant="outline" className={
                                            flag.severity === 'Critical' ? 'bg-red-50 text-red-700 border-red-200' :
                                                flag.severity === 'High' ? 'bg-orange-50 text-orange-700 border-orange-200' :
                                                    flag.severity === 'Medium' ? 'bg-yellow-50 text-yellow-700 border-yellow-200' :
                                                        'bg-slate-50 text-slate-700 border-slate-200'
                                        }>
                                            {flag.severity}
                                        </Badge>
                                    </TableCell>
                                    <TableCell>{flag.status}</TableCell>
                                    <TableCell className="text-slate-500">{flag.timestamp}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </div>
    );
}
