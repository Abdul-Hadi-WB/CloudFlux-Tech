import React from 'react'
import Home from './(pages)/home/Home'

// Static meta title and description
export const metadata = {
  title: 'Home - CloudFlux Tech',
  description: 'This is a static meta description for my website homepage. Explore our services and features.',
}
const page = () => {
  return (
    <div>
<Home/>
    </div>
  )
}

export default page
