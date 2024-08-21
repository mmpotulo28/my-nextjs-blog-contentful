import { GetStaticPaths, GetStaticProps } from 'next';
import client from '../../lib/contentful';
import { ParsedUrlQuery } from 'querystring';

export const getStaticPaths: any = async () => {
	const res = await client.getEntries({ content_type: 'blogPost' });
	const paths = res.items.map((post) => ({
		params: { slug: post.fields.slug },
	}));
	return { paths, fallback: false };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
	const res = await client.getEntries({
		content_type: 'blogPost',
		'fields.slug': params?.slug,
	});
	return {
		props: {
			post: res.items[0],
		},
	};
};

const PostPage = ({ post }: { post: any }) => {
	return (
		<div>
			<h1>{post.fields.title}</h1>
			<p>{post.fields.content}</p>
		</div>
	);
};

export default PostPage;
