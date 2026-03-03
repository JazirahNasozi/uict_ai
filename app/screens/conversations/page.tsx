import React from 'react';
import MobilePreview from '../../components/MobilePreview';

export default function Page() {
  return (
    <MobilePreview title="Conversation Logs">
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        <div style={{ padding: 12, borderRadius: 12, background: '#fff', boxShadow: '0 6px 18px rgba(0,0,0,0.04)' }}>
          <div style={{ fontWeight: 700 }}>Logs</div>
          <div style={{ marginTop: 8 }}>
            <div style={{ fontSize: 13, color: '#666' }}>Live activity</div>
            <div style={{ marginTop: 8, padding: 10, borderRadius: 8, background: '#f5f8ff' }}>Can you explain the double-slit experiment?</div>
          </div>
        </div>

        <div style={{ padding: 12, borderRadius: 12, background: '#fff' }}>
          <div style={{ fontSize: 13, color: '#666' }}>Previous sessions</div>
          <div style={{ marginTop: 8 }}>Session — AI Assistant</div>
        </div>
      </div>
    </MobilePreview>
  );
}
