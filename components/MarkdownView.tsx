
import React from 'react';

interface MarkdownViewProps {
  content: string;
}

const MarkdownView: React.FC<MarkdownViewProps> = ({ content }) => {
  // Simple regex-based markdown renderer for basic needs
  // In a production app, use react-markdown or marked
  const renderLines = () => {
    return content.split('\n').map((line, idx) => {
      if (line.startsWith('# ')) return <h1 key={idx} className="text-3xl font-bold mt-6 mb-4">{line.replace('# ', '')}</h1>;
      if (line.startsWith('## ')) return <h2 key={idx} className="text-2xl font-bold mt-5 mb-3">{line.replace('## ', '')}</h2>;
      if (line.startsWith('### ')) return <h3 key={idx} className="text-xl font-bold mt-4 mb-2">{line.replace('### ', '')}</h3>;
      if (line.startsWith('- ')) return <li key={idx} className="ml-4 list-disc mb-1">{line.replace('- ', '')}</li>;
      if (line.startsWith('|')) return <div key={idx} className="font-mono text-sm bg-slate-50 p-2 border-x border-slate-200">{line}</div>;
      if (line.startsWith('`')) return <pre key={idx} className="bg-slate-900 text-slate-100 p-4 rounded-lg my-4 font-mono text-sm overflow-x-auto"><code>{line.replace(/`/g, '')}</code></pre>;
      if (line.trim() === '') return <br key={idx} />;
      
      // Inline formatting
      const formattedLine = line
        .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
        .replace(/`(.*?)`/g, '<code class="bg-slate-100 px-1 rounded text-pink-600">$1</code>');

      return <p key={idx} className="mb-3 text-slate-700 leading-relaxed" dangerouslySetInnerHTML={{ __html: formattedLine }} />;
    });
  };

  return (
    <div className="prose max-w-none">
      {renderLines()}
    </div>
  );
};

export default MarkdownView;
