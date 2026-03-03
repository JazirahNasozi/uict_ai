import React from 'react';
import MobilePreview from '../../components/MobilePreview';

export default function Page() {
  return (
    <MobilePreview title="User Management">
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        <input placeholder="Search by name or email..." style={{ padding: 10, borderRadius: 8, border: '1px solid #eef2f7' }} />
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {['John Mukasa', 'Sarah Namazzi', 'Robert Okello', 'Alice Kyo'].map((n) => (
            <div key={n} style={{ display: 'flex', justifyContent: 'space-between', padding: 12, borderRadius: 10, background: '#fff', boxShadow: '0 4px 12px rgba(0,0,0,0.04)' }}>
              <div>
                <div style={{ fontWeight: 700 }}>{n}</div>
                <div style={{ fontSize: 12, color: '#666' }}>user@domain.ac.ug</div>
              </div>
              <div style={{ fontSize: 12, color: '#1da86a', alignSelf: 'center' }}>Active</div>
            </div>
          ))}
        </div>
        <div style={{ textAlign: 'center', marginTop: 8 }}>
          <button style={{ padding: 10, borderRadius: 8, background: '#111827', color: '#fff', border: 'none' }}>Add New User</button>
        </div>
      </div>
    </MobilePreview>
  );
}
