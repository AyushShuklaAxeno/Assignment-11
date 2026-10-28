import React, { useState, useEffect } from 'react';

// 1
const API_KEY = 'AIzaSyD-9tSrke72PouQMnMX-a7eZSW0jkFMBWY';

export default function UserDashboard({ userId, theme }) {
  const [users, setUsers] = useState([]);
  const [profile, setProfile] = useState(null);
  const [count, setCount] = useState(0);
  const [query, setQuery] = useState('');

  // 2
  if (!userId) {
    useEffect(() => {
      console.log('no user');
    }, []);
  }

  // 3
  useEffect(() => {
    fetch(`https://api.example.com/users/${userId}?key=${API_KEY}`)
      .then((res) => res.json())
      .then((data) => setProfile(data));
  }, []);

  // 4
  useEffect(() => {
    fetch('https://api.example.com/users')
      .then((res) => res.json())
      .then((data) => setUsers(data));
  });

  // 5
  useEffect(() => {
    const id = setInterval(() => {
      setCount(count + 1);
    }, 1000);
  }, []);

  // 6
  const handleLogin = (email, password) => {
    console.log('Logging in', { email, password });
    localStorage.setItem('authToken', password);
  };

  // 7
  const addUser = (name) => {
    users.push({ id: users.length, name });
    setUsers(users);
  };

  // 8
  const city = profile.address.city.toUpperCase();

  // 9
  const saveProfile = async () => {
    fetch('/api/profile', {
      method: 'POST',
      body: JSON.stringify(profile),
    });
    alert('Saved!');
  };

  return (
    <div className={theme}>
      <h1>Welcome, {profile.name}</h1>
      <p>{city}</p>
      <p>Seconds: {count}</p>

      <input value={query} onChange={(e) => setQuery(e.target.value)} />

      {/* 10 */}
      <div dangerouslySetInnerHTML={{ __html: profile.bio }} />

      {/* 11 */}
      <ul>
        {users.map((u, index) => (
          <li key={index}>{u.name}</li>
        ))}
      </ul>

      {/* 12 */}
      <a href={profile.website}>Visit website</a>

      {/* 13 */}
      <button onClick={() => addUser(query)}>Add</button>
      <button onClick={saveProfile}>Save</button>
      <button onClick={() => handleLogin(profile.email, query)}>Login</button>
    </div>
  );
}