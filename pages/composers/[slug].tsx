import Head from 'next/head'
import { GetStaticProps, GetStaticPaths } from 'next'
import Container from '../../components/container'
import MoreStories from '../../components/more-stories'
import HeroPost from '../../components/hero-post'
import Intro from '../../components/intro'
import Layout from '../../components/layout'
import { getSingleComposer, getAllComposers } from '../../lib/api'
import { CMS_NAME } from '../../lib/constants'
import Link from 'next/link';
import Product from '../../components/product';

export default function Index({ composer, preview }) {
 

  return (
    <Layout preview={preview}>
      <Head>
      <title>{`Morton Music ${composer.name}`}</title>

      </Head>
      <Container>
        <h1 className="text-7xl font-bold">{composer.name}</h1>
        <div className="mb-8 [&>*]:text-purple-500" dangerouslySetInnerHTML={{__html: composer.description}} />


        <ul>
        {composer.pieces.nodes.map((piece) => <li key={piece.id}><Link href={`/catalogue/${piece.slug}`}>{piece.title}</Link></li>)}        
        </ul>
      </Container>
    </Layout>
  )
}




export const getStaticProps: GetStaticProps = async ({ preview = false, params }) => {
  const { slug } = params;
  const id = Array.isArray(slug) ? slug[0] : slug
  const composer = await getSingleComposer(id)

  if (!composer) {
    return {
      notFound: true
    }
  }

  return {
    props: { composer, preview },
    revalidate: 10,
  }
}

export const getStaticPaths: GetStaticPaths = async () => {
    const allPosts = await getAllComposers()
  
    return {
      paths: allPosts.nodes.map((composer) => `/composers/${composer.slug}`) || [],
      fallback: false,
    }
  }
