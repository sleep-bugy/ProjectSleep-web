import React, { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import { Bold, Italic, List, Link as LinkIcon, Code, Eye, Edit2, Heading } from 'lucide-react';

interface MarkdownEditorProps {
  value: string;
  onChange: (value: string) => void;
}

export const MarkdownEditor: React.FC<MarkdownEditorProps> = ({ value = '', onChange }) => {
  const [activeTab, setActiveTab] = useState<'write' | 'preview'>('write');

  const insertFormat = (startTag: string, endTag: string = '') => {
    const textarea = document.getElementById('markdown-editor-textarea') as HTMLTextAreaElement;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const text = textarea.value;
    const before = text.substring(0, start);
    const selection = text.substring(start, end);
    const after = text.substring(end);

    const newValue = `${before}${startTag}${selection}${endTag}${after}`;
    onChange(newValue);
    
    // Restore focus and try to keep selection logical
    setTimeout(() => {
        textarea.focus();
        // If we wrapped text, select the wrapped text. If insertion point, cursor after start tag.
        const newCursorPos = start + startTag.length + selection.length;
        textarea.setSelectionRange(newCursorPos, newCursorPos);
    }, 0);
  };

  return (
    <div className="border border-slate-200 dark:border-slate-600 rounded-lg overflow-hidden bg-white dark:bg-slate-700 transition-colors">
        {/* Toolbar */}
        <div className="flex items-center justify-between px-2 py-2 border-b border-slate-200 dark:border-slate-600 bg-slate-50 dark:bg-slate-800">
            <div className="flex items-center gap-1 overflow-x-auto scrollbar-hide">
               <button 
                 type="button" 
                 onClick={() => setActiveTab('write')} 
                 className={`flex items-center gap-2 px-3 py-1.5 rounded text-sm font-medium transition-colors ${activeTab === 'write' ? 'bg-white dark:bg-slate-600 text-project-primary shadow-sm' : 'text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700'}`}
               >
                 <Edit2 size={14} /> Write
               </button>
               <button 
                 type="button" 
                 onClick={() => setActiveTab('preview')} 
                 className={`flex items-center gap-2 px-3 py-1.5 rounded text-sm font-medium transition-colors ${activeTab === 'preview' ? 'bg-white dark:bg-slate-600 text-project-primary shadow-sm' : 'text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700'}`}
               >
                 <Eye size={14} /> Preview
               </button>
               
               <div className="w-px h-4 bg-slate-300 dark:bg-slate-600 mx-2"></div>
               
               <button type="button" onClick={() => insertFormat('# ')} className="p-1.5 text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-white hover:bg-slate-200 dark:hover:bg-slate-600 rounded transition-colors" title="Heading"><Heading size={16} /></button>
               <button type="button" onClick={() => insertFormat('**', '**')} className="p-1.5 text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-white hover:bg-slate-200 dark:hover:bg-slate-600 rounded transition-colors" title="Bold"><Bold size={16} /></button>
               <button type="button" onClick={() => insertFormat('_', '_')} className="p-1.5 text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-white hover:bg-slate-200 dark:hover:bg-slate-600 rounded transition-colors" title="Italic"><Italic size={16} /></button>
               <button type="button" onClick={() => insertFormat('- ')} className="p-1.5 text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-white hover:bg-slate-200 dark:hover:bg-slate-600 rounded transition-colors" title="List"><List size={16} /></button>
               <button type="button" onClick={() => insertFormat('[', '](url)')} className="p-1.5 text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-white hover:bg-slate-200 dark:hover:bg-slate-600 rounded transition-colors" title="Link"><LinkIcon size={16} /></button>
               <button type="button" onClick={() => insertFormat('`', '`')} className="p-1.5 text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-white hover:bg-slate-200 dark:hover:bg-slate-600 rounded transition-colors" title="Code"><Code size={16} /></button>
            </div>
        </div>

        {/* Content */}
        <div className="relative min-h-[300px]">
            {activeTab === 'write' ? (
                <textarea
                    id="markdown-editor-textarea"
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    className="w-full h-[300px] p-4 bg-white dark:bg-slate-700 text-slate-800 dark:text-white resize-y focus:outline-none font-mono text-sm"
                    placeholder="# Release v2.0&#10;- Fixed critical bugs&#10;- Added new features..."
                />
            ) : (
                <div className="w-full h-[300px] p-4 overflow-y-auto bg-white dark:bg-slate-700 text-slate-800 dark:text-slate-200 prose dark:prose-invert max-w-none prose-sm">
                    {value ? <ReactMarkdown>{value}</ReactMarkdown> : <p className="text-slate-400 italic">Nothing to preview</p>}
                </div>
            )}
        </div>
    </div>
  );
};