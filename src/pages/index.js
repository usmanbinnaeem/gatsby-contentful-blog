import React from "react"
import { Link, graphql } from "gatsby"
import Layout from "../components/layout"
import SEO from "../components/seo"
import MailChimpForm from "../components/MailChimpForm"
import Box from "@material-ui/core/Box"
import Grid from "@material-ui/core/Grid"

const BlogIndex = ({ data, location }) => {
  const siteTitle = data.site.siteMetadata?.title || `Title`
  const posts = data.allContentfulBlogPost.edges

  if (posts.length === 0) {
    return (
      <Layout location={location} title={siteTitle}>
        <SEO title="All posts" />
        <p>
          No blog posts found. Add markdown posts to "content/blog" (or the
          directory you specified for the "gatsby-source-filesystem" plugin in
          gatsby-config.js).
        </p>
      </Layout>
    )
  }

  return (
    <Layout location={location} title={siteTitle}>
      <Grid container>
        <Grid item xs={12} sm={9}>
          <Box color="success.contrastText">
            <SEO title="All posts" />
            <ol style={{ listStyle: `none` }}>
              {data.allContentfulBlogPost.edges.map(edge => {
                const title = edge.node.title || edge.node.slug

                return (
                  <li key={edge.node.slug}>
                    <article
                      className="post-list-item"
                      itemScope
                      itemType="http://schema.org/Article"
                    >
                      <header>
                        <h2>
                          <Link to={edge.node.slug} itemProp="url">
                            <span itemProp="headline">{title}</span>
                          </Link>
                        </h2>
                        <small>{edge.node.date}</small>
                      </header>
                      <section>
                        <p>{edge.node.subTitle}</p>
                      </section>
                    </article>
                  </li>
                )
              })}
            </ol>
          </Box>
        </Grid>
        <Grid item xs={12} sm={3}>
          <Box color="success.contrastText">
            <MailChimpForm />
          </Box>
        </Grid>
      </Grid>
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
    allContentfulBlogPost {
      edges {
        node {
          slug
          title
          subTitle
          author
          date(formatString: "MMMM DD, YYYY")
          content {
            childContentfulRichText {
              html
            }
          }
        }
      }
    }
  }
`
