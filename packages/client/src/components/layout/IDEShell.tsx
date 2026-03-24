import { useState, useEffect } from 'react';
import TopBar from './TopBar';
import StatusBar from './StatusBar';
import PanelLayout from './PanelLayout';
import { useFileStore } from '@/stores/fileStore';
import { useEditorStore } from '@/stores/editorStore';

export default function IDEShell() {
  const [layout, setLayout] = useState<'editor' | 'split' | 'preview'>('split');
  const initialize = useFileStore((s) => s.initialize);
  const initialized = useFileStore((s) => s.initialized);
  const files = useFileStore((s) => s.files);
  const addFile = useEditorStore((s) => s.addFile);
  const openFiles = useEditorStore((s) => s.openFiles);
  const [hasAutoOpened, setHasAutoOpened] = useState(false);

  useEffect(() => {
    initialize();
  }, [initialize]);

  useEffect(() => {
    if (initialized && !hasAutoOpened) {
      if (Object.keys(openFiles).length === 0 && files['index.html']) {
        addFile('index.html', files['index.html'], 'html');
      }
      setHasAutoOpened(true);
    }
  }, [initialized, hasAutoOpened, files, openFiles, addFile]);

  if (!initialized) {
    return (
      <div className="h-screen flex items-center justify-center bg-background">
        <div className="text-muted-foreground animate-pulse font-mono text-sm">Initializing workspace...</div>
      </div>
    );
  }

  return (
    <div className="h-screen flex flex-col bg-background overflow-hidden">
      <TopBar layout={layout} onLayoutChange={setLayout} />
      <PanelLayout layout={layout} />
      <StatusBar />
    </div>
  );
}
