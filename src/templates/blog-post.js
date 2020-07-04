import React from 'react';
import { Link, graphql } from 'gatsby';

import Layout from '../components/layout';
import SEO from '../components/seo';
import Tags from '../components/tags';
import { rhythm } from '../utils/typography';
import Author from '../components/author';
import Bio from '../components/bio';
import { Disqus } from 'gatsby-plugin-disqus';

class BlogPostTemplate extends React.Component {
	render() {
		const { data, location } = this.props;
		const post = data.markdownRemark;
		const tags = data.markdownRemark.frontmatter.tags;
		const readingTime = data.markdownRemark.fields.readingTime.text;
		let disqusConfig = {
			url: `https://nikhi1.dev/${location.pathname}`
		};

		return (
			<React.Fragment>
				<Layout location={location} title={data.site.siteMetadata.title}>
					<div
						className={'article'}
						style={{
							marginLeft: `auto`,
							marginRight: `auto`,
							maxWidth: rhythm(28),
							padding: `${rhythm(0)} ${rhythm(3 / 4)}`
						}}
					>
						<SEO
							title={post.frontmatter.title}
							description={post.frontmatter.description || post.excerpt}
						/>
						<h1>{post.frontmatter.title}</h1>
						<Author date={post.frontmatter.date} readingTime={readingTime} />
						<Tags tags={{ ...tags }} />
						<div dangerouslySetInnerHTML={{ __html: post.html }} />
						<hr
							style={{
								marginBottom: rhythm(1)
							}}
						/>
						<Bio />
					</div>
					<Disqus
						config={disqusConfig}
						style={{
							marginLeft: `auto`,
							marginRight: `auto`,
							maxWidth: rhythm(28),
							padding: `${rhythm(1.5)} ${rhythm(3 / 4)}`
						}}
					/>
				</Layout>
			</React.Fragment>
		);
	}
}

export default BlogPostTemplate;

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
`;
