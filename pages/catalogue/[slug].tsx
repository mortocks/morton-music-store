import Head from 'next/head'
import { GetStaticProps, GetStaticPaths } from 'next'
import Container from '../../components/container'
import MoreStories from '../../components/more-stories'
import HeroPost from '../../components/hero-post'
import Intro from '../../components/intro'
import Layout from '../../components/layout'
import { getAllPostsForHome } from '../../lib/api'
import { CMS_NAME } from '../../lib/constants'
import Link from 'next/link';
import Product from '../../components/product';

export default function Index({ post, preview }) {
 
    const product = {
        ...post,
        name: post.title,
        price: 100
    }
  return (
    <Layout preview={preview}>
      <Head>
        <title>{`Morton Music ${post.title}`}</title>
      </Head>

      <Container>
        <Link className="-mb-4 block" href={`/composers/${post.composers.nodes[0].slug}`}>{post.composers.nodes[0].name}</Link>
        <h1 className="text-7xl font-bold">{post.title}</h1>
        <div className="mb-4">Voicing {post.voicing.nodes.map(v => 
          <Link className="rounded-full bg-purple-300 text-purple-700 p-1 px-2 text-sm" key={v.slug} href={`/voicing/${v.slug}`}>
            {v.name}
          </Link>)}
        </div>
        <div className="text-lg [&>*]:mb-4" dangerouslySetInnerHTML={{__html: post.content }} />
        <Product product={product} />
      </Container>
    </Layout>
  )
}




export const getStaticProps: GetStaticProps = async ({ preview = false, params }) => {
  const allPosts = await getAllPostsForHome(preview)
  const { slug } = params;

  const post = allPosts.nodes.find(p => p.slug === slug)
  if (!post) {
    return {
      notFound: true
    }
  }

  return {
    props: { post, preview },
    revalidate: 10,
  }
}

export const getStaticPaths: GetStaticPaths = async () => {
    const allPosts = await getAllPostsForHome(false)
  
    return {
      paths: allPosts.nodes.map((piece) => `/catalogue/${piece.slug}`) || [],
      fallback: false,
    }
  }
