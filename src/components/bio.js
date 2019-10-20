/**
 * Bio component that queries for data
 * with Gatsby's StaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/static-query/
 */

import React from 'react';
import { StaticQuery, graphql } from 'gatsby';
import Image from 'gatsby-image';
import styled from '@emotion/styled';

import { rhythm } from '../utils/typography';

function Bio() {
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
						<div>
							<p style={{ margin: 0, fontFamily:'bold' }}>{data.site.siteMetadata.author}</p>
							<p style={{ margin: 0, fontSize: '16px', color: 'black' }}>{data.site.siteMetadata.bio}</p>
							<TwitterIcon style={{color: '#666'}} siteMetadata={data.site.siteMetadata}/>
							<GitHubIcon style={{color: '#666'}} siteMetadata={data.site.siteMetadata}/>
						</div>
					</Container>
				);
			}}
		/>
	);
}

const TwitterIcon = (props) => {
	const href = `https://twitter.com/${props.siteMetadata.social.twitter}`
	return (
		<span style={{marginRight: '8px'}}>
	<a href={href} style={{color:'#666', textDecoration:'none'}} className="icon-img" target="_blank" rel="noopener noreferrer">
		<svg
			xmlns="http://www.w3.org/2000/svg"
			viewBox="0 0 612 612"
			role="img"
			aria-labelledby="a9dex8z02uoolclvb1wk9q6wtg4ya02e"
			className="icon-img"
		>
			<title id="a9dex8z02uoolclvb1wk9q6wtg4ya02e">twitter logo</title>
			<path d="M612 116.258c-22.525 9.98-46.694 16.75-72.088 19.772 25.93-15.527 45.777-40.155 55.184-69.41-24.322 14.378-51.17 24.82-79.775 30.48-22.906-24.438-55.49-39.66-91.63-39.66-69.333 0-125.55 56.218-125.55 125.514 0 9.828 1.11 19.427 3.25 28.606-104.325-5.24-196.834-55.223-258.75-131.174-10.822 18.51-16.98 40.078-16.98 63.1 0 43.56 22.182 81.994 55.836 104.48-20.575-.688-39.926-6.348-56.867-15.756v1.568c0 60.806 43.29 111.554 100.692 123.104-10.517 2.83-21.607 4.398-33.08 4.398-8.107 0-15.947-.803-23.634-2.333 15.985 49.907 62.336 86.2 117.253 87.194-42.946 33.655-97.098 53.656-155.915 53.656-10.134 0-20.116-.612-29.944-1.72 55.568 35.68 121.537 56.484 192.44 56.484 230.947 0 357.187-191.29 357.187-357.188l-.42-16.253C573.87 163.525 595.21 141.42 612 116.257z" />
		</svg>{props.siteMetadata.social.twitter}
	</a>
	</span>
	)
}

const GitHubIcon = (props) => {
	const href = `https://github.com/${props.siteMetadata.social.github}`
	return (
		<span style={{marginRight: '4px', color:'#666'}}>
		<a style={{color:'#666', textDecoration:'none'}} className="icon-img" href={href} target="_blank" rel="noopener noreferrer">
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width="438.549"
			height="438.549"
			viewBox="0 0 438.549 438.549"
			role="img"
			aria-labelledby="a9vwm93v5hbmj6knvgl66vbg39xustxg"
			className="icon-img"
		>
			<title id="a9vwm93v5hbmj6knvgl66vbg39xustxg">github logo</title>
			<path d="M409.132 114.573c-19.608-33.596-46.205-60.194-79.798-79.8C295.736 15.166 259.057 5.365 219.27 5.365c-39.78 0-76.47 9.804-110.062 29.408-33.596 19.605-60.192 46.204-79.8 79.8C9.803 148.168 0 184.853 0 224.63c0 47.78 13.94 90.745 41.827 128.906 27.884 38.164 63.906 64.572 108.063 79.227 5.14.954 8.945.283 11.42-1.996 2.474-2.282 3.71-5.14 3.71-8.562 0-.57-.05-5.708-.144-15.417-.098-9.71-.144-18.18-.144-25.406l-6.567 1.136c-4.187.767-9.47 1.092-15.846 1-6.375-.09-12.992-.757-19.843-2-6.854-1.23-13.23-4.085-19.13-8.558-5.898-4.473-10.085-10.328-12.56-17.556l-2.855-6.57c-1.903-4.374-4.9-9.233-8.992-14.56-4.093-5.33-8.232-8.944-12.42-10.847l-1.998-1.43c-1.332-.952-2.568-2.1-3.71-3.43-1.143-1.33-1.998-2.663-2.57-3.997-.57-1.335-.097-2.43 1.428-3.29 1.525-.858 4.28-1.275 8.28-1.275l5.708.853c3.807.763 8.516 3.042 14.133 6.85 5.615 3.807 10.23 8.755 13.847 14.843 4.38 7.807 9.657 13.755 15.846 17.848 6.184 4.093 12.42 6.136 18.7 6.136 6.28 0 11.703-.476 16.273-1.423 4.565-.95 8.848-2.382 12.847-4.284 1.713-12.758 6.377-22.56 13.988-29.41-10.847-1.14-20.6-2.857-29.263-5.14-8.658-2.286-17.605-5.996-26.835-11.14-9.235-5.137-16.896-11.516-22.985-19.126-6.09-7.614-11.088-17.61-14.987-29.98-3.9-12.373-5.852-26.647-5.852-42.825 0-23.035 7.52-42.637 22.557-58.817-7.044-17.318-6.38-36.732 1.997-58.24 5.52-1.715 13.706-.428 24.554 3.853 10.85 4.284 18.794 7.953 23.84 10.995 5.046 3.04 9.09 5.618 12.135 7.708 17.706-4.947 35.977-7.42 54.82-7.42s37.116 2.473 54.822 7.42l10.85-6.85c7.418-4.57 16.18-8.757 26.26-12.564 10.09-3.806 17.803-4.854 23.135-3.14 8.562 21.51 9.325 40.923 2.28 58.24 15.035 16.18 22.558 35.788 22.558 58.818 0 16.178-1.958 30.497-5.853 42.966-3.9 12.47-8.94 22.457-15.125 29.98-6.19 7.52-13.9 13.85-23.13 18.985-9.233 5.14-18.183 8.85-26.84 11.135-8.663 2.286-18.416 4.004-29.264 5.146 9.894 8.563 14.842 22.078 14.842 40.54v60.237c0 3.422 1.19 6.28 3.572 8.562 2.38 2.278 6.136 2.95 11.276 1.994 44.163-14.653 80.185-41.062 108.068-79.226 27.88-38.16 41.826-81.126 41.826-128.906-.01-39.77-9.818-76.454-29.414-110.05z" />
		</svg>
		{props.siteMetadata.social.github}
	</a>
	</span>
	)
}

const bioQuery = graphql`
	query BioQuery {
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
					github
				}
				bio
			}
		}
	}
`

const Container = styled.div`display: flex;`;

export default Bio;
