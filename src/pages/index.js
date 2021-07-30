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
          No posts found
        </p>
      </Layout>
    )
  }

  return (
    <Layout location={location} title={siteTitle}>
      <Seo />
      <p className="text-sm md:text-base mb-6">
        <span className="font-semibold">Articles from:</span>
        <br /> <a href="https://airbnb.design/">Airbnb</a>,{" "}
        <a href="https://asanadesign.medium.com/">Asana</a>,{" "}
        <a href="https://medium.com/designing-atlassian">Atlassian</a>,{" "}
        <a href="https://medium.com/dropbox-design">Dropbox</a>,{" "}
        <a href="https://medium.com/etsy-design">Etsy</a>,{" "}
        <a href="https://medium.com/facebook-design">Facebook</a>,{" "}
        <a href="https://figma.com/blog/">Figma</a>,{" "}
        <a href="https://design.google/library/">Google</a>,{" "}
        <a href="https://invisionapp.com/inside-design/">Invision</a>,{" "}
        <a href="https://design.lyft.com/">Lyft</a>,{" "}
        <a href="https://medium.design/">Medium</a>,{" "}
        <a href="https://medium.com/mozilla-opendesign">Mozilla</a>,{" "}
        <a href="https://medium.com/netflix-design">Netflix</a>,{" "}
        <a href="https://medium.com/salesforce-ux">Salesforce</a>,{" "}
        <a href="https://ux.shopify.com/">Shopify</a>,{" "}
        <a href="https://slack.design/articles/">Slack</a>,{" "}
        <a href="https://medium.com/@SpotifyDesign">Spotify</a>,{" "}
        <a href="https://medium.com/twitter-design-research">Twitter</a>,{" "}
        <a href="https://medium.com/uber-design">Uber</a>,{" "}
        <a
          target="_blank"
          href="mailto:rob@robedwards.org?subject=Missing%20blog%20on%20designteam.blog&body=Hi%20Rob%2C%0D%0A%0D%0ALove%20the%20site%2C%20love%20you.%20However%2C%20I%20think%20you%20need%20to%20add%3A%20%5BSUGGESTION%20HERE%5D.%0D%0A%0D%0AThanks%20for%20the%20resource%2C%20you%20really%20didn't%20have%20to.%0D%0A%0D%0ABest%2C%0D%0A%0D%0AKind%20stranger."
          className="underline"
        >
          who's missing?
        </a>
      </p>

      <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
        {posts.map(post => {
          const title = post.title
          const image = post.image
          return (
            <div key={post.link}>
              <a href={post.link}>
                <article
                  className="w-full h-full flex flex-col"
                  itemScope
                  itemType="http://schema.org/Article"
                >
                  <div className="w-full bg-gray-100 mb-4">
                    <img
                      src={getThumbnail(image)}
                      alt=""
                      className="object-cover h-48 block w-full"
                    />
                  </div>
                  <header className="flex mb-2 justify-between text-sm text-gray-500">
                    <div>{new Date(post.date).toLocaleDateString()}</div>
                    <div>{getDomainName(post.link)}</div>
                  </header>
                  <header className="w-full text-base md:text-lg mb-2 font-semibold">
                    {title}
                  </header>
                  <section className="w-full">
                    <p
                      dangerouslySetInnerHTML={{ __html: post.description }}
                    />
                  </section>
                </article>
              </a>
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
