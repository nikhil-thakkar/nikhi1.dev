import React from 'react';
import { Link, graphql } from 'gatsby';

import Bio from '../components/bio';
import Layout from '../components/layout';
import SEO from '../components/seo';
import { rhythm } from '../utils/typography';
import Button from '../components/button';
import styled from '@emotion/styled'

const Card = styled.div`
box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
transition: 0.3s;
border-radius: 5px;
margin: 16px;
padding: 8px 16px 8px 16px;
&:hover {
  box-shadow: 0 8px 16px 0 rgba(0,0,0,0.2);
}
`

class Blog extends React.Component {
	render() {
		const { data, location } = this.props;
		const siteTitle = data.site.siteMetadata.title;
    let posts = data.allMarkdownRemark.edges;
    // for(let i =0; i< 10; i++) {
    //   posts.push(posts[0])
    // }

		return (
			<Layout location={location} title={siteTitle}>

					<SEO title="All posts" />
					<Bio />
					<div style={{display: 'grid', gridTemplateColumns: `repeat(auto-fit, minmax(320px, 1fr))`}}>
						{posts.map(({ node }) => {
							const title = node.frontmatter.title || node.fields.slug;
							return (
								<Card key={node.fields.slug}>
									<h3 style={{margin: '0px'}}
										style={{
											marginBottom: rhythm(1 / 4)
										}}
									>
										<Link style={{ boxShadow: `none` }} to={`blog${node.fields.slug}`}>
											{title}
										</Link>
									</h3>
									<small>{node.frontmatter.date}</small>
									<p
										dangerouslySetInnerHTML={{
											__html: node.frontmatter.description || node.excerpt
										}}
									/>
								</Card>
							);
						})}
					</div>
					<Link to="/">
						<Button marginTop="85px">Go Home</Button>
					</Link>
			</Layout>
		);
	}
}

export default Blog;

export const pageQuery = graphql`
	query {
		site {
			siteMetadata {
				title
			}
		}
		allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
			edges {
				node {
					excerpt
					fields {
						slug
					}
					frontmatter {
						date(formatString: "MMMM DD, YYYY")
						title
						description
					}
				}
			}
		}
	}
`;
