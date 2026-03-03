import React from 'react';
import MobilePreview from '../../components/MobilePreview';

export default function Page() {
  return (
    <MobilePreview title="AI Assistant">
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ width: 84, height: 84, borderRadius: 8, background: '#0f1724', color: '#fff', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700 }}>UICT</div>
        </div>
        <div style={{ padding: 12, borderRadius: 12, background: '#fff', boxShadow: '0 6px 18px rgba(0,0,0,0.04)' }}>
          <div style={{ fontWeight: 700 }}>How can I help you today?</div>
          <div style={{ marginTop: 8, fontSize: 13, color: '#666' }}>Ask about admissions, courses, or campus services.</div>
        </div>

        <div style={{ marginTop: 8 }}>
          <div style={{ padding: 12, borderRadius: 12, background: '#e6fff0' }}>Hello! IPv4 and IPv6 are the two most commonly used Internet Protocol versions.</div>
        </div>
      </div>
    </MobilePreview>
  );
}
