import React from 'react';
import Link from 'next/link';
import MobilePreview from '../../components/MobilePreview';

export default function Page() {
  return (
    <MobilePreview title="Create Account">
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        <h3>Create Account</h3>
        <div style={{ display: 'flex', gap: 8 }}>
          <button style={{ flex: 1, padding: 12, borderRadius: 8, border: '1px solid #ffdca4', background: '#fff' }}>Student</button>
          <button style={{ flex: 1, padding: 12, borderRadius: 8, border: '1px solid #e6eef8', background: '#fff' }}>Lecturer</button>
        </div>
        <input placeholder="Full name" style={{ padding: 12, borderRadius: 8, border: '1px solid #eef2f7' }} />
        <input placeholder="Official email" style={{ padding: 12, borderRadius: 8, border: '1px solid #eef2f7' }} />
        <input placeholder="Student number" style={{ padding: 12, borderRadius: 8, border: '1px solid #eef2f7' }} />
        <input placeholder="Password" type="password" style={{ padding: 12, borderRadius: 8, border: '1px solid #eef2f7' }} />
        <button style={{ background: '#ff9f1a', color: '#fff', padding: 12, borderRadius: 8, border: 'none' }}>Get Started</button>
        <div style={{ textAlign: 'center', fontSize: 13 }}>
          <Link href="/screens/login">Already have an account? Sign in</Link>
        </div>
      </div>
    </MobilePreview>
  );
}
