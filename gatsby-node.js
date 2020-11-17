const path = require(`path`)

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions

  // Define a template for blog post
  const blogPost = path.resolve(`./src/templates/blog-post.js`)

  const result = await graphql(
    `
      {
        allContentfulBlogPost {
          edges {
            node {
              author
              bio {
                bio
              }
              content {
                childContentfulRichText {
                  html
                }
              }
              slug
              skills
              subTitle
              title
              authorImage {
                fixed(width: 100) {
                  src
                }
              }
              date(formatString: "DD MMMM YYYY")
            }
          }
        }
        allContentfulBlogName {
          edges {
            node {
              title
            }
          }
        }
      }
    `
  )

  const posts = result.data.allContentfulBlogPost.edges

  if (posts.length > 0) {
    posts.forEach((post, index) => {
      createPage({
        path: post.node.slug,
        component: blogPost,
        context: {
          slug: post.node.slug,
        },
      })
    })
  }
}
