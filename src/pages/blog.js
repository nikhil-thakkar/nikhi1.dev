import React from 'react';
import { Link, graphql } from 'gatsby';

import Bio from '../components/bio';
import Layout from '../components/layout';
import SEO from '../components/seo';
import { rhythm } from '../utils/typography';
import Button from '../components/button';
import styled from '@emotion/styled';

const Card = styled.div`
	box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
	transition: 0.3s;
	border-radius: 5px;
	margin: 16px;
	padding: 8px 8px 8px 16px;
	&:hover {
		box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.2);
	}
`;

const Container = styled.div`
	display: grid;
	
	@media (max-width: 640px) {
		grid-template-columns: 1fr;
	}

	@media (min-width: 641px) and (max-width: 960px) {
		grid-template-columns: ${ props => {
			return props.posts == 1 ? 'max(400px)' : '1fr 1fr'
		}};
	}

	@media (min-width: 961px) {
		grid-template-columns: ${ props => {
			return props.posts > 2 ? '1fr 1fr 1fr' : 'repeat(auto-fill, min(400px))'
		}};
	}
`;

class Blog extends React.Component {
	render() {
		const { data, location } = this.props;
		const siteTitle = data.site.siteMetadata.title;
		let posts = data.allMarkdownRemark.edges;

		return (
			<Layout location={location} title={siteTitle}>
				<SEO title="All posts" />
				<Bio />
				<Container posts={posts.length}>
					{posts.map(({ node }) => {
						const title = node.frontmatter.title || node.fields.slug;
						return (
							<Card key={node.fields.slug}>
								<h3
									style={{
										marginBottom: rhythm(1 / 4)
									}}>
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
				</Container>
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
