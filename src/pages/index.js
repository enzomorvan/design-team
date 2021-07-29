import * as React from "react"
import { graphql } from "gatsby"

import Layout from "../components/layout"
import Seo from "../components/seo"

import Url from 'url-parse'

const getDomainName = (link) => { 
  const parser = new Url(link)

  if (parser.hostname === 'medium.com')
    return `${parser.hostname}/${parser.pathname.split('/')[1]}`
    
  return parser.hostname
}

const getThumbnail = (image) => {
  const parser = new Url(image)

  parser.set('query', {
    w: 400
  })

  if(parser.hostname === "miro.medium.com") {
    const path = parser.pathname.split('/')
    if(path[1] === 'max') {
      path[2] = 400
      parser.set('pathname', path.join('/'))
    }
  }
  return parser.toString()
}


const BlogIndex = ({ data, location }) => {
  const siteTitle = data.site.siteMetadata?.title || `Design Team Blog`
  const posts = data.allMongodbDesignteamPosts.nodes

  if (posts.length === 0) {
    return (
      <Layout location={location} title={siteTitle}>
        <Seo />
        <p>
          No blog posts found.
        </p>
      </Layout>
    )
  }

  return (
    <Layout location={location} title={siteTitle}>
      <Seo />
      <div className="grid gap-2 grid-cols-1 sm:grid-cols-2 md:grid-cols-4">
        {posts.map(post => {
            const title = post.title
            const image = post.image
            return (
              <div key={post.link} className="rounded-sm w-full h-full p-3 flex items-center justify-center border border-gray-400 border-dashed">
                <article
                  className="w-full h-full flex flex-col space-y-1"
                  itemScope
                  itemType="http://schema.org/Article"
                >

                  <div className="w-full">
                    <img src={getThumbnail(image)} alt="" />
                  </div>
                  <header className="w-full text-base font-semibold">
                    {title}
                  </header>
                  <section className="w-full text-sm">
                    <div dangerouslySetInnerHTML={{__html: post.description}} />
                  </section>
                  <footer className="flex justify-between text-xs">
                    <a className="underline" href={post.link}>
                      {getDomainName(post.link)}
                    </a>
                    <div className="">
                      {new Date(post.date).toLocaleDateString()}
                    </div>
                  </footer>
                </article>
              </div>
            )
          })}

      </div>
    </Layout>
  )
}

export default BlogIndex

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
    allMongodbDesignteamPosts(sort: {order: DESC, fields: date}) {
      nodes {
        title
        link
        description
        date
        image
      }
    }
  }
`
