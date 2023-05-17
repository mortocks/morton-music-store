import Head from 'next/head'
import { GetStaticProps } from 'next'
import Container from '../components/container'
import MoreStories from '../components/more-stories'
import HeroPost from '../components/hero-post'
import Intro from '../components/intro'
import Layout from '../components/layout'
import { getAllPostsForHome } from '../lib/api'
import { CMS_NAME } from '../lib/constants'
import Link from 'next/link';

export default function Index({ allPosts: { nodes }, preview }) {
 

  return (
    <Layout preview={preview}>
      <Head>
        <title>Morton Music: Catalogue</title>
      </Head>
      <Container>
        
        <ul>
        {nodes.map((piece) => <li key={piece.id}><Link href={`catalogue/${piece.slug}`}>{piece.title}</Link></li>)}        
        </ul>
      </Container>
    </Layout>
  )
}

export const getStaticProps: GetStaticProps = async ({ preview = false }) => {
  const allPosts = await getAllPostsForHome(preview)
  return {
    props: { allPosts, preview },
    revalidate: 10,
  }
}
