import React from "react"
import { Link, graphql } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"
import Tags from "../components/tags"
import { rhythm } from "../utils/typography"
import Author from "../components/author"
import Bio from "../components/bio"
import Header from '../components/header'

class BlogPostTemplate extends React.Component {
  render() {
    const {data, location} = this.props
    const post = data.markdownRemark
    const tags = data.markdownRemark.frontmatter.tags
    const readingTime = data.markdownRemark.fields.readingTime.text
    const { previous, next } = this.props.pageContext
    
    return (
      <React.Fragment>
      <Header title={data.site.siteMetadata.title}/>
      <Layout location={location} className={'article'}>
        <SEO
          title={post.frontmatter.title}
          description={post.frontmatter.description || post.excerpt}
        />
        <h1>{post.frontmatter.title}</h1>
        <Author date={post.frontmatter.date} readingTime={readingTime}/>
        <Tags tags={{...tags}}/>
        <div dangerouslySetInnerHTML={{ __html: post.html }} />
        <hr
          style={{
            marginBottom: rhythm(1),
          }}
        />
        <Bio />
        <ul
          style={{
            display: `flex`,
            flexWrap: `wrap`,
            justifyContent: `space-between`,
            listStyle: `none`,
            padding: 0,
          }}
        >
          <li>
            {previous && (
              <Link to={`blog${previous.fields.slug}`} rel="prev">
                ← {previous.frontmatter.title}
              </Link>
            )}
          </li>
          <li>
            {next && (
              <Link to={`blog${next.fields.slug}`} rel="next">
                {next.frontmatter.title} →
              </Link>
            )}
          </li>
        </ul>
      </Layout>
      </React.Fragment>
    )
  }
}

export default BlogPostTemplate

export const pageQuery = graphql`
  query BlogPostBySlug($slug: String!) {
    site {
      siteMetadata {
        title
        author
      }
    }
    markdownRemark(fields: { slug: { eq: $slug } }) {
      id
      excerpt(pruneLength: 160)
      html
      frontmatter {
        title
        date(formatString: "MMM DD, YYYY")
        description
        tags
      }
      fields {
        slug
        readingTime {
          text
        }
      }
    }
  }
`
