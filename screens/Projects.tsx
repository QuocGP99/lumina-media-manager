
import React from 'react';
/* Replace FileZip with Archive as it's the correct exported member in lucide-react */
import { ArrowLeft, Plus, MoreHorizontal, Calendar, Briefcase, ChevronRight, Archive, ExternalLink, Filter } from 'lucide-react';
import { Project } from '../types';

interface Props {
  projects: Project[];
  onBack: () => void;
}

const Projects: React.FC<Props> = ({ projects, onBack }) => {
  return (
    <div className="flex-1 flex flex-col bg-[#0f1115]">
      <header className="h-16 border-b border-[#2a2f3b] flex items-center px-6 gap-4">
        <button onClick={onBack} className="p-2 hover:bg-[#21252b] rounded-full transition-all">
          <ArrowLeft className="w-5 h-5" />
        </button>
        <h2 className="font-bold text-lg">Project Workflow</h2>
        <div className="ml-auto flex items-center gap-3">
          <button className="flex items-center gap-2 bg-[#21252b] border border-[#2a2f3b] text-[#9a9fa8] px-4 py-2 rounded-lg text-xs font-medium hover:text-white transition-all">
            <Filter className="w-4 h-4" /> Filter
          </button>
          <button className="flex items-center gap-2 bg-[#00bcd4] hover:bg-[#00acc1] text-white px-4 py-2 rounded-lg font-bold text-xs transition-all shadow-lg active:scale-95">
            <Plus className="w-4 h-4" /> New Project
          </button>
        </div>
      </header>

      <div className="flex-1 overflow-y-auto p-8">
        <div className="max-w-6xl mx-auto space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <WorkflowStage label="Draft" count={projects.filter(p => p.status === 'Draft').length} />
            <WorkflowStage label="Select" count={projects.filter(p => p.status === 'Select').length} color="text-yellow-500" />
            <WorkflowStage label="Retouch" count={projects.filter(p => p.status === 'Retouch').length} color="text-blue-500" />
            <WorkflowStage label="Delivered" count={projects.filter(p => p.status === 'Delivered').length} color="text-green-500" />
          </div>

          <div className="bg-[#1a1d23] border border-[#2a2f3b] rounded-2xl overflow-hidden">
            <table className="w-full text-left">
              <thead className="bg-[#21252b] border-b border-[#2a2f3b]">
                <tr>
                  <th className="px-6 py-4 text-[10px] font-bold text-[#5a5f6b] uppercase tracking-widest">Project Name</th>
                  <th className="px-6 py-4 text-[10px] font-bold text-[#5a5f6b] uppercase tracking-widest">Status</th>
                  <th className="px-6 py-4 text-[10px] font-bold text-[#5a5f6b] uppercase tracking-widest">Assets</th>
                  <th className="px-6 py-4 text-[10px] font-bold text-[#5a5f6b] uppercase tracking-widest">Last Modified</th>
                  <th className="px-6 py-4 text-[10px] font-bold text-[#5a5f6b] uppercase tracking-widest text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#2a2f3b]">
                {projects.map(project => (
                  <tr key={project.id} className="hover:bg-[#21252b]/50 group transition-colors">
                    <td className="px-6 py-4">
                       <div className="flex items-center gap-3">
                          <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                            project.status === 'Delivered' ? 'bg-green-500/10 text-green-500' : 
                            project.status === 'Retouch' ? 'bg-blue-500/10 text-blue-500' : 'bg-[#3a3f4b] text-[#9a9fa8]'
                          }`}>
                            <Briefcase className="w-4 h-4" />
                          </div>
                          <div>
                            <p className="text-sm font-bold text-white group-hover:text-[#00bcd4] transition-colors">{project.name}</p>
                            <p className="text-[10px] text-[#5a5f6b]">ID: {project.id}</p>
                          </div>
                       </div>
                    </td>
                    <td className="px-6 py-4">
                       <StatusBadge status={project.status} />
                    </td>
                    <td className="px-6 py-4 text-xs text-[#9a9fa8] font-medium">{project.itemCount} items</td>
                    <td className="px-6 py-4 text-xs text-[#9a9fa8] flex items-center gap-2"><Calendar className="w-3.5 h-3.5" /> {project.lastModified}</td>
                    <td className="px-6 py-4 text-right">
                       <div className="flex items-center justify-end gap-2">
                          <button className="p-2 hover:bg-[#3a3f4b] rounded-lg transition-all text-[#9a9fa8] hover:text-[#00bcd4]"><Archive className="w-4 h-4" /></button>
                          <button className="p-2 hover:bg-[#3a3f4b] rounded-lg transition-all text-[#9a9fa8] hover:text-white"><ExternalLink className="w-4 h-4" /></button>
                          <button className="p-2 hover:bg-[#3a3f4b] rounded-lg transition-all text-[#9a9fa8]"><MoreHorizontal className="w-4 h-4" /></button>
                       </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

const WorkflowStage: React.FC<{ label: string, count: number, color?: string }> = ({ label, count, color = "text-white" }) => (
  <div className="bg-[#1a1d23] border border-[#2a2f3b] rounded-2xl p-6 flex items-center justify-between">
    <div>
      <h4 className="text-[10px] font-bold text-[#5a5f6b] uppercase tracking-widest mb-1">{label}</h4>
      <p className={`text-2xl font-bold ${color}`}>{count}</p>
    </div>
    <ChevronRight className="w-5 h-5 text-[#2a2f3b]" />
  </div>
);

const StatusBadge: React.FC<{ status: string }> = ({ status }) => {
  const styles: Record<string, string> = {
    'Draft': 'bg-gray-500/10 text-gray-400 border-gray-500/20',
    'Select': 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20',
    'Retouch': 'bg-blue-500/10 text-blue-500 border-blue-500/20',
    'Delivered': 'bg-green-500/10 text-green-500 border-green-500/20',
  };
  return (
    <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold border ${styles[status]}`}>
      {status}
    </span>
  );
};

export default Projects;
