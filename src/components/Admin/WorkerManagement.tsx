/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { 
  Users, 
  DollarSign, 
  CheckCircle2, 
  Clock, 
  MoreVertical,
  ChevronRight,
  TrendingUp,
  TrendingDown
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { GlassCard } from '../Shared/GlassCard';
import { 
  PieChart, 
  Pie, 
  Cell, 
  ResponsiveContainer, 
  Tooltip, 
  Legend,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid
} from 'recharts';

export const WorkerManagement: React.FC = () => {
  const { workers } = useApp();

  const totalSalary = workers.reduce((acc, curr) => acc + curr.salary, 0);
  const paidCount = workers.filter(w => w.status === 'Paid').length;
  const pendingCount = workers.filter(w => w.status === 'Pending').length;

  const pieData = [
    { name: 'Paid', value: paidCount },
    { name: 'Pending', value: pendingCount }
  ];

  const salaryData = workers.map(w => ({
    name: w.name.split(' ')[0],
    salary: w.salary
  }));

  const COLORS = ['#10b981', '#f43f5e'];

  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
      {/* Salary Breakdown Chart */}
      <div className="bg-white rounded-2xl shadow-sm border border-zinc-100 p-6 h-[400px] flex flex-col">
        <div className="mb-6">
          <h3 className="text-lg font-bold text-zinc-900">Worker Salary Breakdown</h3>
          <p className="text-sm text-zinc-500">Monthly compensation by individual</p>
        </div>
        <div className="flex-1">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={salaryData} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" horizontal={false} />
              <XAxis type="number" stroke="#a1a1aa" fontSize={10} tickLine={false} axisLine={false} />
              <YAxis dataKey="name" type="category" stroke="#a1a1aa" fontSize={10} width={60} tickLine={false} axisLine={false} />
              <Tooltip 
                cursor={{ fill: '#f8fafc' }}
                contentStyle={{ backgroundColor: '#fff', border: '1px solid #f0f0f0', borderRadius: '12px', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
              />
              <Bar dataKey="salary" fill="#6366f1" radius={[0, 4, 4, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Paid vs Pending Pie Chart */}
      <div className="bg-white rounded-2xl shadow-sm border border-zinc-100 p-6 h-[400px] flex flex-col">
        <div className="mb-6">
          <h3 className="text-lg font-bold text-zinc-900">Salary Payment Status</h3>
          <p className="text-sm text-zinc-500">Current month payroll distribution</p>
        </div>
        <div className="flex-1">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                innerRadius={70}
                outerRadius={100}
                paddingAngle={8}
                dataKey="value"
              >
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip 
                contentStyle={{ backgroundColor: '#fff', border: '1px solid #f0f0f0', borderRadius: '12px', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
              />
              <Legend verticalAlign="bottom" align="center" iconType="circle" layout="horizontal" />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Worker List */}
      <div className="bg-white rounded-2xl shadow-sm border border-zinc-100 p-6 h-[400px] flex flex-col">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-lg font-bold text-zinc-900">Staff Management</h3>
            <p className="text-sm text-zinc-500">Active personnel and status</p>
          </div>
          <span className="rounded-full bg-indigo-50 px-3 py-1 text-[10px] font-black text-indigo-600 uppercase tracking-widest border border-indigo-100">
            {workers.length} Total Staff
          </span>
        </div>
        <div className="flex-1 space-y-3 overflow-y-auto pr-2 custom-scrollbar">
          {workers.map((worker) => (
            <div 
              key={worker.id}
              className="group flex items-center justify-between rounded-2xl border border-zinc-100 bg-zinc-50/30 p-4 transition-all hover:border-indigo-200 hover:bg-indigo-50/20"
            >
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white border border-zinc-100 text-zinc-400 shadow-sm">
                  <Users size={20} />
                </div>
                <div>
                  <p className="text-sm font-bold text-zinc-900">{worker.name}</p>
                  <p className="text-[10px] text-zinc-400 font-bold uppercase tracking-widest">{worker.role}</p>
                </div>
              </div>
              <div className="flex flex-col items-end">
                <p className="text-sm font-black text-zinc-900">₹{worker.salary.toLocaleString()}</p>
                <div className="flex items-center gap-1.5 mt-1">
                  {worker.status === 'Paid' ? (
                    <CheckCircle2 size={12} className="text-emerald-500" />
                  ) : (
                    <Clock size={12} className="text-rose-500" />
                  )}
                  <span className={cn(
                    "text-[10px] font-black uppercase tracking-widest",
                    worker.status === 'Paid' ? "text-emerald-600" : "text-rose-600"
                  )}>
                    {worker.status}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
        <button className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-indigo-600 py-3.5 text-sm font-black text-white transition-all hover:bg-indigo-700 active:scale-[0.98] shadow-lg shadow-indigo-600/20">
          Manage Payroll
          <ChevronRight size={16} />
        </button>
      </div>
    </div>
  );
};

function cn(...inputs: any[]) {
  return inputs.filter(Boolean).join(' ');
}
