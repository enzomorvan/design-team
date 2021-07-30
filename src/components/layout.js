import * as React from "react"

const Layout = ({ title, children }) => {

  return (
    <div className="p-4 md:p-10 max-w-screen-2xl mx-auto">
      <header className="mt-4 md:mt-12">
        <h1 className="text-4xl md:text-6xl mb-3">Design Team Dot Blog</h1>
        <div className="md:flex justify-between mb-3">
          <p className="md:text-xl mb-2">
            Articles from prominent design teams
          </p>
          <nav className="mb-3 text-sm md:text-base">
            <a href="/rss.xml">RSS</a>
            <a href="">Coffee</a>
            <a href="mailto:rob@robedwards.org">Email</a>
          </nav>
        </div>
        <div className="h-3 md:h-6 bg-black w-full mb-3 md:mb-6"></div>
      </header>
      <main>{children}</main>
    </div>
  )
}

export default Layout
