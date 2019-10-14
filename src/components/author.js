import React from 'react';
import { StaticQuery, graphql } from 'gatsby';
import Image from 'gatsby-image';
import styled from 'styled-components';
import { rhythm } from '../utils/typography';

function Author(props) {
	return (
		<StaticQuery
			query={bioQuery}
			render={(data) => {
				const { author } = data.site.siteMetadata;
				return (
					<Container>
						<Image
							fixed={data.avatar.childImageSharp.fixed}
							alt={author}
							style={{
								marginRight: rhythm(1 / 2),
								marginBottom: 0,
								minWidth: 50,
								borderRadius: `100%`
							}}
							imgStyle={{
								borderRadius: `50%`
							}}
						/>
						<div style={{ fontSize: '16px' }}>
							<p style={{ margin: 0, color: 'black' }}>{data.site.siteMetadata.author}</p>
							<p style={{ color: 'gray', fontSize: '14px' }}>
								{props.date} • {props.readingTime} ★
							</p>
						</div>
					</Container>
				);
			}}
		/>
	);
}

const bioQuery = graphql`
	query AuthorQuery {
		avatar: file(absolutePath: { regex: "/profile-pic.jpg/" }) {
			childImageSharp {
				fixed(width: 50, height: 50) {
					...GatsbyImageSharpFixed
				}
			}
		}
		site {
			siteMetadata {
				author
				social {
					twitter
				}
			}
		}
	}
`;

const Container = styled.div`display: flex;`;

export default Author;
