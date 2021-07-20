import * as React from "react"

const Layout = ({ title, children }) => {

  return (
    <div className="min-h-screen flex flex-col items-center p-2">
      <header className="p-20 flex items-center justify-center">
        <h1 className="text-center text-2xl font-semibold">Design Team</h1>
      </header>
      <main className="max-w-screen-lg">{children}</main>
    </div>
  )
}

export default Layout
