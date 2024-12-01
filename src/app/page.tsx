"use client";

import { useEffect, useState } from "react";

export default function Home() {
  const [users, setUsers] = useState([]);
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    fetch("/api/v1/users")
      .then((res) => res.json())
      .then((data) => setUsers(data));
    setMounted(true);
  }, []);
  return <>{mounted && JSON.stringify(users)}</>;
}
