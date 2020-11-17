import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import Navbar from "./navbar/Navbar"

const Layout = ({ children }) => {
  const data = useStaticQuery(graphql`
    query title1 {
      allContentfulBlogName {
        edges {
          node {
            title
          }
        }
      }
    }
  `)

  return (
    <>
      <Navbar />
      <div className="global-wrapper">
        <ul>
          <li>
            <header className="global-header">
              <h1 className="main-heading">
                {data.allContentfulBlogName.edges[0].node.title}
              </h1>
            </header>
            <main>{children}</main>
            <footer>
              © {new Date().getFullYear()}, Built with
              {` `}
              <a href="https://www.gatsbyjs.com">Gatsby</a>
            </footer>
          </li>
        </ul>
      </div>
    </>
  )
}

export default Layout
