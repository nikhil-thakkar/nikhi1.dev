import React from "react"
import styled from "@emotion/styled"

const Tags = props => {
    return (<React.Fragment>
            {Object.keys(props.tags).map((key, index) => (
                <TagWrapper key={key}>#{props.tags[key]}</TagWrapper>
            ))}
    </React.Fragment>)
}

const TagWrapper = styled.div`
    display: inline-block;
    text-align: center;
    box-sizing: border-box;
    background-color: lightgray;
    padding: 4px 4px 4px 8px;
    margin: 2px 4px 24px 4px;
    font-size: 14px;
`

export default Tags