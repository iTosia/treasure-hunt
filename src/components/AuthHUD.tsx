'use client';

import React from 'react';
import {
  SignInButton,
  UserButton,
  Show
} from '@clerk/nextjs';

const AuthHUD: React.FC = () => {
  return (
    <div className="auth-hud-container">
      <Show when="signed-out">
        <div className="auth-prompt">
          <span className="auth-label">Want to rank globally?</span>
          <SignInButton mode="modal">
            <button className="auth-btn">Sign In</button>
          </SignInButton>
        </div>
      </Show>
      <Show when="signed-in">
        <div className="auth-user">
          <UserButton />
        </div>
      </Show>
    </div>
  );
};

export default AuthHUD;
