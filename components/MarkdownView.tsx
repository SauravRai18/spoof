
import React from 'react';

interface MarkdownViewProps {
  content: string;
}

const MarkdownView: React.FC<MarkdownViewProps> = ({ content }) => {
  const renderLines = () => {
    return content.split('\n').map((line, idx) => {
      // Headers
      if (line.startsWith('# ')) return <h1 key={idx} className="text-4xl font-black text-slate-900 mt-12 mb-8 tracking-tighter leading-tight">{line.replace('# ', '')}</h1>;
      if (line.startsWith('## ')) return <h2 key={idx} className="text-2xl font-black text-slate-800 mt-10 mb-6 tracking-tight border-b border-slate-100 pb-2">{line.replace('## ', '')}</h2>;
      if (line.startsWith('### ')) return <h3 key={idx} className="text-xl font-bold text-slate-800 mt-8 mb-4">{line.replace('### ', '')}</h3>;
      
      // List items
      if (line.startsWith('- ')) return (
        <li key={idx} className="flex gap-3 mb-3 text-slate-600 font-medium">
          <span className="text-blue-500 font-black mt-1">•</span>
          <span>{line.replace('- ', '')}</span>
        </li>
      );
      
      // Table-like or special text
      if (line.startsWith('|')) return (
        <div key={idx} className="font-mono text-xs bg-slate-50 p-3 border-l-4 border-slate-200 text-slate-500 my-1 font-medium">{line}</div>
      );
      
      // Code blocks
      if (line.startsWith('`')) {
        const cleaned = line.replace(/`/g, '');
        if (cleaned.trim() === '') return null;
        return (
          <pre key={idx} className="bg-slate-900 text-blue-300 p-6 rounded-3xl my-8 font-mono text-sm overflow-x-auto shadow-2xl shadow-slate-200 border border-slate-800 leading-relaxed">
            <code>{cleaned}</code>
          </pre>
        );
      }
      
      if (line.trim() === '') return <div key={idx} className="h-4" />;
      
      // Inline formatting
      const formattedLine = line
        .replace(/\*\*(.*?)\*\*/g, '<strong class="text-slate-900 font-black">$1</strong>')
        .replace(/`(.*?)`/g, '<code class="bg-blue-50 text-blue-600 px-1.5 py-0.5 rounded-md font-mono text-sm font-bold border border-blue-100">$1</code>');

      return (
        <p key={idx} className="mb-5 text-slate-600 text-lg leading-relaxed font-medium" dangerouslySetInnerHTML={{ __html: formattedLine }} />
      );
    });
  };

  return (
    <div className="max-w-4xl mx-auto selection:bg-blue-100 selection:text-blue-900">
      <ul className="list-none p-0 m-0">
        {renderLines()}
      </ul>
    </div>
  );
};

export default MarkdownView;
