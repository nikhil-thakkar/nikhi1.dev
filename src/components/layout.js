import React from "react"
import { Link } from "gatsby"
import styled from "@emotion/styled"

import { rhythm, scale } from "../utils/typography" 
import Header from "./header"

class Layout extends React.Component {
  render() {
    const { location, title, children } = this.props
    const rootPath = `${__PATH_PREFIX__}/`
    const blogPath = `${__PATH_PREFIX__}/blog/`
    
    
    return (
      <Wrapper>
        <div>
          <Header {...this.props}/>
          <main>{children}</main>
        </div>
        <Footer>
          © {new Date().getFullYear()}, Built with 	<span style={{fontSize: '15px', margin: 0}}>❤️</span>
          <a href="https://www.gatsbyjs.org">Gatsby</a>
        </Footer>
      </Wrapper>
    )
  }
}

const Wrapper = styled.div`
  min-height: 100vh;
  display: flex;
  flex-flow: column wrap;
`

const Footer = styled.footer`
  text-align: center;
  margin: 24px;
  align-self: center;
`

export default Layout
