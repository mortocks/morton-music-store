import Head from 'next/head'
import { GetStaticProps } from 'next'
import Container from '../components/container'
import MoreStories from '../components/more-stories'
import HeroPost from '../components/hero-post'
import Intro from '../components/intro'
import Layout from '../components/layout'
import { getAllPostsForHome } from '../lib/api'
import { CMS_NAME } from '../lib/constants'

export default function Index({ allPosts: { nodes }, preview }) {
 

  return (
    <Layout preview={preview}>
      <Head>
        <title>{`Morton music`}</title>
      </Head>
      <Container>
       {JSON.stringify(nodes)}
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
