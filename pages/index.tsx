import { GetStaticProps } from 'next';
import client from '../lib/contentful';

export const getStaticProps: GetStaticProps = async () => {
	const res = await client.getEntries({ content_type: 'blogPost' });
	return {
		props: {
			posts: res.items,
		},
	};
};

const HomePage = ({ posts }: { posts: any }) => {
	return (
		<div>
			<h1>My Blog</h1>
			<ul>
				{posts.map((post: any) => (
					<li key={post.sys.id}>{post.fields.title}</li>
				))}
			</ul>
		</div>
	);
};

export default HomePage;
