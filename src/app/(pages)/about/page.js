import React from 'react'
import About from './About'

// Static meta title and description
export const metadata = {
  title: 'CloudFlux Tech - About Us',
  description: 'This is a static meta description for my website homepage. Explore our services and features.',
}
const page = () => {
  return (
    <div>
<About/>
    </div>
  )
}

export default page
