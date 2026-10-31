import { useEffect } from 'react'

// Sets the page <title> and meta description for each route.
export function useSeo(title, description) {
  useEffect(() => {
    document.title = title ? `${title} · GLBCRI` : 'GLBCRI · GL Bajaj Centre for Research and Incubation'
    if (description) {
      let tag = document.querySelector('meta[name="description"]')
      if (!tag) {
        tag = document.createElement('meta')
        tag.name = 'description'
        document.head.appendChild(tag)
      }
      tag.content = description
    }
  }, [title, description])
}
