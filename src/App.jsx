/** @format */

import React, { useState } from "react";
import "./App.css";

const App = () => {
  const [password, setPassword] = useState("");
  const [passwordLength, setPasswordLength] = useState(12);
  const [useSymbols, setUseSymbols] = useState(true);
  const [useNumbers, setUseNumbers] = useState(true);
  const [useLowerCase, setUseLowerCase] = useState(true);
  const [useUpperCase, setUseUpperCase] = useState(true);
  const [successMessage, setSuccessMessage] = useState("");

  const generatePassword = () => {
    let charset = "";
    let newPassword = "";

    if (useSymbols) charset += "!@#$%^&*()";
    if (useNumbers) charset += "0123456789";
    if (useLowerCase) charset += "abcdefghijklmnopqrstuvwxyz";
    if (useUpperCase) charset += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

    for (let i = 0; i < passwordLength; i++) {
      newPassword += charset.charAt(Math.floor(Math.random() * charset.length));
    }
    setPassword(newPassword);
  };

  const copyToClipboard = () => {
    const el = document.createElement("textarea");
    el.value = password;
    document.body.appendChild(el);
    el.select();
    navigator.clipboard.writeText(password);
    document.body.removeChild(el);
    setSuccessMessage("Password copied to clipboard!");
    setTimeout(() => setSuccessMessage(""), 2000);
  };

  return (
    <div className='container'>
      <h2 style={{ textAlign: "center", color: "blue" }}>
        Random Password Generator
      </h2>
      <div className='pwdlength'>
        <label>Password Length:</label>
        <input
          className='inputPwd'
          type='number'
          min='8'
          max='32'
          value={passwordLength}
          onChange={(e) => setPasswordLength(e.target.value)}
        />
      </div>
      <div className='optionsBox'>
        <label>
          <input
            type='checkbox'
            checked={useSymbols}
            onChange={() => setUseSymbols(!useSymbols)}
          />
          Symbols
        </label>
        <label>
          <input
            type='checkbox'
            checked={useNumbers}
            onChange={() => setUseNumbers(!useNumbers)}
          />
          Numbers
        </label>
        <label>
          <input
            type='checkbox'
            checked={useLowerCase}
            onChange={() => setUseLowerCase(!useLowerCase)}
          />
          LowerCase
        </label>
        <label>
          <input
            type='checkbox'
            checked={useUpperCase}
            onChange={() => setUseUpperCase(!useUpperCase)}
          />
          UpperCase
        </label>
      </div>
      <button className='generateBtn' onClick={generatePassword}>
        Generate
      </button>
      {password && (
        <div className='copyIt'>
          <label>Generated Password:</label>
          <input type='text' value={password} readOnly className='inputPwd' />
          <button className='copyBtn' onClick={() => copyToClipboard(password)}>
            Copy
          </button>
        </div>
      )}
      {successMessage && (
        <p
          style={{
            color: "green",
            textAlign: "center",
          }}
        >
          {successMessage}
        </p>
      )}
    </div>
  );
};

export default App;
