import { Panel, PanelGroup, PanelResizeHandle } from 'react-resizable-panels';
import Sidebar from './Sidebar';
import MultiFileEditor from '@/components/editor/MultiFileEditor';
import LivePreview from '@/components/preview/LivePreview';
import AIChatPanel from '@/components/ai/AIChatPanel';

interface PanelLayoutProps {
  layout: 'editor' | 'split' | 'preview';
}

function ResizeHandle({ direction = 'vertical' }: { direction?: 'vertical' | 'horizontal' }) {
  return (
    <PanelResizeHandle
      className={`group relative ${direction === 'vertical' ? 'w-1 hover:w-1.5' : 'h-1 hover:h-1.5'} bg-border/50 hover:bg-primary/30 transition-all`}
    >
      <div className={`absolute ${direction === 'vertical' ? 'inset-y-0 -left-0.5 -right-0.5' : 'inset-x-0 -top-0.5 -bottom-0.5'}`} />
    </PanelResizeHandle>
  );
}

export default function PanelLayout({ layout }: PanelLayoutProps) {
  return (
    <PanelGroup direction="horizontal" className="flex-1 min-h-0">
      {/* Left: Sidebar */}
      <Panel defaultSize={18} minSize={10} maxSize={25} collapsible>
        <Sidebar />
      </Panel>

      <ResizeHandle direction="vertical" />

      {/* Center: Editor + Preview */}
      <Panel defaultSize={52} minSize={30} className="flex flex-col overflow-hidden">
        {layout === 'editor' && <MultiFileEditor />}
        {layout === 'preview' && <LivePreview />}
        {layout === 'split' && (
          <PanelGroup direction="horizontal">
            <Panel defaultSize={50}>
              <MultiFileEditor />
            </Panel>
            <ResizeHandle direction="vertical" />
            <Panel defaultSize={50}>
              <LivePreview />
            </Panel>
          </PanelGroup>
        )}
      </Panel>

      <ResizeHandle direction="vertical" />

      {/* Right: AI Chat */}
      <Panel defaultSize={30} minSize={20} maxSize={40} collapsible>
        <AIChatPanel />
      </Panel>
    </PanelGroup>
  );
}
