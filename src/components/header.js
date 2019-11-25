import React from "react"
import styled from '@emotion/styled'

const HeaderWrapper = styled.header`
    position: sticky;
    padding: 16px;
    background-color: black;
    width: 100%;
    margin: 0;
    top: 0;
    color: white;
    z-index: 999;
    
    @media (min-width: 992px) {
        padding-left: 240px;
        transition: all 0.5s ease-out;
    }

    @media (max-width: 991px) {
        padding-left: 16px;
        transition: all 0.5s ease-in;
    }
`
const Header = (props) => (
    <HeaderWrapper>{props.title}</HeaderWrapper>
)

export default Header