import React from 'react';
import { render } from '@testing-library/react';
import App from './App';

describe('App', () => {
  it('should be true', () => {
    const foo = true;
    expect(foo).toBe(true);
  });
  it('should be false', () => {
    const foo = false;
    expect(foo).toBe(false);
  });
});