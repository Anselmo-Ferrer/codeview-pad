'use client'

import { useEffect, useState } from 'react'

export default function Page() {
  const [userId, setUserId] = useState<string | null>(null)
  const [posts, setPosts] = useState<any[]>([])

  const [email, setEmail] = useState<string>('Unifor.anselmo@gmail.com')
  const [password, setPassword] = useState<string>('123456')

  useEffect(() => {
    const loginAndFetch = async () => {
      try {
        // Faz login
        const loginRes = await fetch('/api/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, password }),
        })
        const loginData = await loginRes.json()

        if (loginData.error) {
          console.error('Login error:', loginData.error)
          return
        }

        const token = loginData.access_token
        const user = loginData.user
        setUserId(user.id)

        // Busca dados do usuário usando token
        const userRes = await fetch('/api/getUserData', {
          method: 'GET',
          headers: { Authorization: `Bearer ${token}` },
        })
        const userData = await userRes.json()

        if (userData.error) {
          console.error('Fetch user data error:', userData.error)
          return
        }

        console.log(userData)
      } catch (err) {
        console.error('Unexpected error:', err)
      }
    }

    loginAndFetch()
  }, [])

  return (
    <div>
      <p>Usuário ID: {userId}</p>
      <ul>
        {posts.map((p: any) => (
          <li key={p.id}>{p.title}</li>
        ))}
      </ul>
    </div>
  )
}