import React from 'react';
import Link from 'next/link';
import MobilePreview from '../../components/MobilePreview';

export default function Page() {
  return (
    <MobilePreview title="Login">
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ width: 72, height: 72, borderRadius: 18, background: '#eaf6ee', margin: '0 auto' }}></div>
          <h2 style={{ margin: '12px 0 0' }}>UICT AI</h2>
          <p style={{ margin: 6, color: '#666', fontSize: 13 }}>Your assistant for learning and campus services</p>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          <input placeholder="Email address" style={{ padding: 12, borderRadius: 8, border: '1px solid #eef2f7' }} />
          <input placeholder="Password" type="password" style={{ padding: 12, borderRadius: 8, border: '1px solid #eef2f7' }} />
          <button style={{ background: '#2f7bfd', color: '#fff', padding: 12, borderRadius: 8, border: 'none' }}>Log in</button>
          <div style={{ textAlign: 'center', fontSize: 13 }}>
            <Link href="/screens/signup">Create an account</Link>
          </div>
        </div>
      </div>
    </MobilePreview>
  );
}
