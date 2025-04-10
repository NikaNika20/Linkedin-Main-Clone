'use client'

import { useState, useEffect } from 'react'
import Navbar from './components/Navbar'

interface Post {
  id: number
  user: string
  content: string
  comments: string[]
  likes: string[]
  media: string | null
}

interface User {
  firstName: string
  lastName: string
  username: string
  jobTitle: string
  location: string
  profilePic: string | null
}

interface Friend {
  username: string
  name: string
}

const Home = () => {
  const [posts, setPosts] = useState<Post[]>([])
  const [newPost, setNewPost] = useState<string>('')
  const [newPostMedia, setNewPostMedia] = useState<File | null>(null)
  const [user, setUser] = useState<User | null>(null)
  const [friends, setFriends] = useState<Friend[]>([])

  useEffect(() => {
    const storedPosts = JSON.parse(localStorage.getItem('posts') || '[]')
    setPosts(storedPosts)
  }, [])

  useEffect(() => {
    if (posts.length > 0) {
      localStorage.setItem('posts', JSON.stringify(posts))
    }
  }, [posts])

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user') || '{}')
    setUser(storedUser)
  }, [])

  useEffect(() => {
    const storedFriends = JSON.parse(localStorage.getItem('friends') || '[]')
    setFriends(storedFriends)
  }, [])

  const handleAddPost = () => {
    const newPostData = {
      id: posts.length + 1,
      user: `${user?.firstName} ${user?.lastName}`,
      content: newPost,
      comments: [],
      likes: [],
      media: newPostMedia ? URL.createObjectURL(newPostMedia) : null,
    }

    setPosts([...posts, newPostData])
    setNewPost('')
    setNewPostMedia(null)
  }

  const handleAddFriend = (friendUsername: string, friendName: string) => {
    const newFriends = [...friends, { username: friendUsername, name: friendName }]
    setFriends(newFriends)
    localStorage.setItem('friends', JSON.stringify(newFriends))
  }

  const handleEditPost = (id: number) => {
    const editedPost = prompt('Edit your post:')
    if (editedPost) {
      const updatedPosts = posts.map(post =>
        post.id === id ? { ...post, content: editedPost } : post
      )
      setPosts(updatedPosts)
    }
  }

  const handleDeletePost = (id: number) => {
    const updatedPosts = posts.filter(post => post.id !== id)
    setPosts(updatedPosts)
    localStorage.setItem('posts', JSON.stringify(updatedPosts))
  }

  const handleAddComment = (postId: number, comment: string) => {
    const updatedPosts = posts.map(post =>
      post.id === postId ? { ...post, comments: [...post.comments, comment] } : post
    )
    setPosts(updatedPosts)
  }

  const handleLikePost = (postId: number) => {
    const updatedPosts = posts.map(post => {
      if (post.id === postId) {
        const userIndex = post.likes.indexOf(user?.username || '')
        if (userIndex !== -1) {
          post.likes.splice(userIndex, 1)
        } else {
          post.likes.push(user?.username || '')
        }
      }
      return post
    })
    setPosts(updatedPosts)
  }

  const handleMediaChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setNewPostMedia(e.target.files[0])
    }
  }

  return (
    <div className="flex flex-col gap-8 min-h-screen items-center sm:items-start">
      <Navbar />
      <div className="flex w-full justify-between p-4 gap-8">
        <div className="w-1/4 bg-gray-100 p-4 flex flex-col items-center rounded-md shadow">
          <img
            src={user?.profilePic || '/default-profile.jpg'}
            alt="Profile"
            className="w-20 h-20 rounded-full"
          />
          <h2 className="mt-2 text-xl">{`${user?.firstName} ${user?.lastName}`}</h2>
          <p className="text-sm">{user?.username}</p>
          <p>{user?.jobTitle}</p>
          <p>{user?.location}</p>
          <button
            onClick={() => handleAddFriend('friend_username', 'Friend Name')}
            className="mt-2 bg-blue-500 text-white py-2 px-4 rounded-md"
          >
            Add Friend
          </button>
        </div>

        <div className="w-1/2 p-4">
          <div className="mb-4">
            <textarea
              value={newPost}
              onChange={(e) => setNewPost(e.target.value)}
              placeholder="Write a new post..."
              className="w-full p-2 border rounded-md"
            />
            <input
              type="file"
              onChange={handleMediaChange}
              accept="image/*,video/*"
              className="mt-2 p-2 border rounded-md"
              key={newPostMedia ? newPostMedia.name : undefined}
            />
            <button
              onClick={handleAddPost}
              className="mt-2 w-full bg-blue-500 text-white py-2 rounded-md"
            >
              Post
            </button>
          </div>

          <div>
            {posts.map((post) => (
              <div key={post.id} className="mb-6 p-4 border rounded-md bg-white shadow-sm">
                <div className="flex justify-between items-center">
                  <span className="font-semibold">{post.user}</span>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleEditPost(post.id)}
                      className="text-blue-500 hover:text-blue-700"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDeletePost(post.id)}
                      className="text-red-500 hover:text-red-700"
                    >
                      Delete
                    </button>
                  </div>
                </div>

                <p className="mt-2">{post.content}</p>

                {post.media && (
                  <div className="mt-4">
                    {post.media.endsWith('.mp4') ? (
                      <video controls className="w-full">
                        <source src={post.media} type="video/mp4" />
                      </video>
                    ) : (
                      <img src={post.media} alt="Post Media" className="w-full rounded" />
                    )}
                  </div>
                )}

                <div className="mt-2">
                  <button
                    onClick={() => handleLikePost(post.id)}
                    className="text-blue-500"
                  >
                    Like ({post.likes.length})
                  </button>
                </div>

                <div className="mt-4">
                  <input
                    type="text"
                    placeholder="Add a comment"
                    className="w-full p-2 border rounded-md"
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        const input = e.target as HTMLInputElement
                        handleAddComment(post.id, input.value)
                        input.value = ''
                      }
                    }}
                  />
                  <div className="mt-2">
                    {post.comments.map((comment, index) => (
                      <p key={index} className="text-sm text-gray-600">
                        {comment}
                      </p>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="w-1/4 bg-gray-100 p-4 rounded-md shadow">
          <h2 className="text-xl mb-4">Advertisements</h2>
          <div className="bg-blue-500 text-white p-4 mb-4">Ad 1</div>
          <div className="bg-green-500 text-white p-4 mb-4">Ad 2</div>
          <div className="bg-red-500 text-white p-4">Ad 3</div>
        </div>
      </div>
    </div>
  )
}

export default Home
