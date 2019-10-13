import React from "react"
import { Link } from "gatsby"
import Image from "gatsby-image"
import Layout from "../components/layout"
import SEO from "../components/seo"
import Button from "../components/button"
import logo from "../images/under-contruction.jpg"

class IndexPage extends React.Component {
  render() {
  return (
      <Layout location={this.props.location}>
        <img style={{ margin: 0 }}
          src={logo}
          alt="Under construction" />
        <p><a href="https://www.freepik.com/free-photos-vectors/template">Template vector created by freepik - www.freepik.com</a></p>
        <Link to="/blog/">
          <Button marginTop="35px">Go to Blog</Button>
        </Link>
      </Layout>
    )
  }
}


export default IndexPage
