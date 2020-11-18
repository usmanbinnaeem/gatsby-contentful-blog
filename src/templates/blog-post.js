import React from "react"
import { Link, graphql } from "gatsby"
import firebase from "gatsby-plugin-firebase"
import Bio from "../components/bio"
import Layout from "../components/layout"
import SEO from "../components/seo"
import Box from "@material-ui/core/Box"
import Grid from "@material-ui/core/Grid"
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos"
import Button from "@material-ui/core/Button"
import { useSelector } from "react-redux"
import { store, setLoggedIn } from "../redux/store"

const BlogPostTemplate = ({ data, location }) => {
  // const [loggedIn, setLoggedIn] = useState(false)
  const loggedIn = useSelector(state => state.login)

  const Login = async () => {
    var provider = new firebase.auth.GoogleAuthProvider()
    await firebase
      .auth()
      .signInWithPopup(provider)
      .then(function (result) {})
      .catch(function (error) {
        var errorMessage = error.message
        return errorMessage
      })
    // setLoggedIn(true)
    store.dispatch(setLoggedIn(true))
  }

  const post = data.contentfulBlogPost

  return (
    <Layout location={location}>
      <Grid container>
        <Grid item xs={12} sm={9}>
          <Box color="success.contrastText">
            <SEO
              title={post.title}
              description={post.subTitle || post.subTitle}
            />

            <article
              className="blog-post"
              itemScope
              itemType="http://schema.org/Article"
            >
              <Link to="/">
                <Button startIcon={<ArrowBackIosIcon />}>Go Back</Button>
              </Link>
              <header>
                <h1 itemProp="headline">{post.title}</h1>
                <p>{post.date}</p>
              </header>

              <p>{post.date}</p>
              {loggedIn ? (
                <>
                  <section
                    dangerouslySetInnerHTML={{
                      __html: post.content.childContentfulRichText.html,
                    }}
                    itemProp="articleBody"
                  />
                </>
              ) : (
                <>
                  <h3 style={{ color: "red" }}>
                    First you need to login to read this article
                  </h3>
                  <Button
                    variant="outlined"
                    className="log-btnn"
                    onClick={() => Login()}
                  >
                    Login
                  </Button>
                </>
              )}

              <hr />
            </article>
          </Box>
        </Grid>
        <Grid item xs={12} sm={3}>
          <Box color="success.contrastText">
            {loggedIn ? (
              <Bio
                author={post.author}
                skill={post.skills}
                bio={post.bio.bio}
                profile={post.authorImage.fixed.src}
              />
            ) : null}
          </Box>
        </Grid>
      </Grid>
    </Layout>
  )
}

export default BlogPostTemplate

export const pageQuery = graphql`
  query BlogPostBySlug($slug: String!) {
    site {
      siteMetadata {
        title
      }
    }
    contentfulBlogPost(slug: { eq: $slug }) {
      title
      skills
      bio {
        bio
      }
      authorImage {
        fixed(width: 100) {
          src
        }
      }
      subTitle
      author
      slug
      content {
        childContentfulRichText {
          html
        }
      }
    }
  }
`
