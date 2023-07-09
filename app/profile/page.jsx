'use client'

import React, { useEffect, useState } from 'react'

import Profile from '@components/Profile'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'

const MyProfile = () => {
  const { data: session } = useSession()
  const router = useRouter()

  const [posts, setPosts] = useState([])

  useEffect(() => {
    const fetchPosts = async () => {
      const res = await fetch(`/api/users/${session?.user.id}/posts`)
      // const res = await fetch(`/api/prompt`)
      const data = await res.json()

      setPosts(data)
    }

    if (session?.user.id) fetchPosts()
    fetchPosts()
  }, [])

  const handleEdit = (post) => {
    router.push(`/update-prompt?id=${post._id}`)
  }
  const handleDelete = async (post) => {
    const hasConfirmed = confirm('Are you sure you want to delete it!')

    if (hasConfirmed) {
      try {
        await fetch(`/api/prompt/${post._id.toString()}, {
          method:"DELETE"
        }`)

        const filteredPosts = posts.filter((p) => p._id !== post._ids)

        setPosts(filteredPosts)
      } catch (error) {
        console.log(error)
      }
    }
  }

  return (
    <Profile
      name='My'
      desc='welcome to your personalized profile page'
      data={posts}
      handleEdit={handleEdit}
      handleDelete={handleDelete}
    />
  )
}

export default MyProfile
