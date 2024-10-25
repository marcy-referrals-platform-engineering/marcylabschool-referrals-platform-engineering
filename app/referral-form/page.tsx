'use client';
import { useState, useEffect } from 'react';

export default function page() {
  
  const handleSubmit  = async (e: any) => {
    event?.preventDefault();
  }
  return (
    <form onSubmit={handleSubmit}>
        <div >
            <label htmlFor='name'>Full Name:</label>
            <input type='text' id='name' name='name' required />
        </div>

    </form>
  );
}
