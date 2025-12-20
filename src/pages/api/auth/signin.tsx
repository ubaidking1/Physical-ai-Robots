
import React from 'react';
import Layout from '@theme/Layout';
import BrowserOnly from '@docusaurus/BrowserOnly';

function SignInForm() {
  // This form will only be rendered on the client
  return (
    <div>
      <h1>Sign In</h1>
      <p>This is the sign-in page. The form will be rendered on the client.</p>
      {/* In a real app, you would have your sign-in form here */}
    </div>
  );
}

export default function SignInPage() {
  return (
    <Layout title="Sign In">
      <BrowserOnly>
        {() => <SignInForm />}
      </BrowserOnly>
    </Layout>
  );
}
