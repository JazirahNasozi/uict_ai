import React from 'react';
import MobilePreview from '../../components/MobilePreview';

export default function Page() {
  return (
    <MobilePreview title="Admin Analytics">
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
          <div style={{ padding: 12, borderRadius: 12, background: '#fff', boxShadow: '0 6px 18px rgba(0,0,0,0.04)' }}>
            <div style={{ fontSize: 12, color: '#666' }}>Total Users</div>
            <div style={{ fontSize: 20, fontWeight: 700 }}>2,840</div>
          </div>
          <div style={{ padding: 12, borderRadius: 12, background: '#fff', boxShadow: '0 6px 18px rgba(0,0,0,0.04)' }}>
            <div style={{ fontSize: 12, color: '#666' }}>Lecturers</div>
            <div style={{ fontSize: 20, fontWeight: 700 }}>378</div>
          </div>
        </div>

        <div style={{ padding: 12, borderRadius: 12, background: '#fff', boxShadow: '0 6px 18px rgba(0,0,0,0.04)' }}>
          <div style={{ height: 180, background: 'linear-gradient(180deg,#eaf6ff,#fff)', borderRadius: 8 }} />
        </div>
      </div>
    </MobilePreview>
  );
}
