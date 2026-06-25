import React from 'react'
import VideoEditing from './VideoEditing'

// Static meta title and description
export const metadata = {
  title: 'CloudFlux Tech - Video Editing',
  description: 'This is a static meta description for my website homepage. Explore our services and features.',
}
const page = () => {
  return (
    <div>
   <VideoEditing/>
    </div>
  )
}

export default page