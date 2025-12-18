
import React, { useState, useEffect } from "react";
import { useRive, useStateMachineInput, Layout, Fit, Alignment } from "@rive-app/react-canvas";
import "./LoginForm.css";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const STATE_MACHINE_NAME = "Login Machine";
  const INPUT_Name = "isChecking";
  const INPUT_HandsUp = "isHandsUp";
  const INPUT_Look = "numLook";
  const INPUT_Success = "trigSuccess";
  const INPUT_Fail = "trigFail";

  const { rive, RiveComponent } = useRive({
    src: "/teddy.riv",
    autoplay: true,
    stateMachines: STATE_MACHINE_NAME,
    layout: new Layout({
      fit: Fit.Cover,
      alignment: Alignment.Center,
    }),
  });

  const isCheckingInput = useStateMachineInput(rive, STATE_MACHINE_NAME, INPUT_Name);
  const isHandsUpInput = useStateMachineInput(rive, STATE_MACHINE_NAME, INPUT_HandsUp);
  const numLookInput = useStateMachineInput(rive, STATE_MACHINE_NAME, INPUT_Look);
  const trigSuccessInput = useStateMachineInput(rive, STATE_MACHINE_NAME, INPUT_Success);
  const trigFailInput = useStateMachineInput(rive, STATE_MACHINE_NAME, INPUT_Fail);

  // Effect to handle "Looking" animation based on email length
  useEffect(() => {
    if (numLookInput && email) {
      // Map email length to a percentage (0-100) or directly to character count
      // Teddy usually looks from 0 to 100 on the X axis generally.
      // Let's assume input length * multiplier.
      numLookInput.value = email.length * 5;
    }
  }, [email, numLookInput]);

  const handleEmailFocus = () => {
    if (isCheckingInput) isCheckingInput.value = true;
  };

  const handleEmailBlur = () => {
    if (isCheckingInput) isCheckingInput.value = false;
  };

  const handlePasswordFocus = () => {
    if (isHandsUpInput) isHandsUpInput.value = true;
  };

  const handlePasswordBlur = () => {
    if (isHandsUpInput) isHandsUpInput.value = false;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email && password.length > 5) {
      if (trigSuccessInput) trigSuccessInput.fire();
    } else {
      if (trigFailInput) trigFailInput.fire();
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="rive-container">
          <RiveComponent />
        </div>

        <form className="login-form" onSubmit={handleSubmit}>
          <h2>Welcome Back</h2>

          <div className="input-group">
            <span className="input-icon">✉️</span>
            <input
              type="text"
              placeholder="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onFocus={handleEmailFocus}
              onBlur={handleEmailBlur}
            />
          </div>

          <div className="input-group">
            <span className="input-icon">🔒</span>
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onFocus={handlePasswordFocus}
              onBlur={handlePasswordBlur}
            />
          </div>

          <button type="submit" className="login-button">
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
}
