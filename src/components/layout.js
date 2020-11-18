import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import Navbar from "./navbar/Navbar"
import NavBottom from "./NavBottom"

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
          </li>
        </ul>
      </div>
       <NavBottom />
    </>
  )
}

export default Layout
