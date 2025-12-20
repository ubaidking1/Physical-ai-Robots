
import React from 'react';
import Layout from '@theme/Layout';
import BrowserOnly from '@docusaurus/BrowserOnly';

function SignUpForm() {
  // This form will only be rendered on the client
  return (
    <div>
      <h1>Sign Up</h1>
      <p>This is the sign-up page. The form will be rendered on the client.</p>
      {/* In a real app, you would have your sign-up form here */}
    </div>
  );
}

export default function SignUpPage() {
  return (
    <Layout title="Sign Up">
      <BrowserOnly>
        {() => <SignUpForm />}
      </BrowserOnly>
    </Layout>
  );
}
