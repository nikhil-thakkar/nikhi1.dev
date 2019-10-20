import React from "react"
import { Link } from "gatsby"
import Layout from "../components/layout"
import Button from "../components/button"
import logo from "../images/undraw-under-construction.svg"

class IndexPage extends React.Component {
  render() {
  return (
      <Layout location={this.props.location}>
        <img style={{ margin: 0 }}
          src={logo}
          alt="Under construction" />
        <p>Design Sprint</p>
        <Link to="/blog/">
          <Button marginTop="35px">Go to Blog</Button>
        </Link>
      </Layout>
    )
  }
}


export default IndexPage
