import Head from "next/head";
import { GetStaticProps } from "next";
import Container from "../../components/container";
import MoreStories from "../../components/more-stories";
import HeroPost from "../../components/hero-post";
import Intro from "../../components/intro";
import Layout from "../../components/layout";
import { getAllPostsForHome } from "../../lib/api";
import { CMS_NAME } from "../../lib/constants";
import Link from "next/link";
import PieceRow from "../../components/pieceRow";

export default function Index({ allPosts: { nodes }, preview }) {
  return (
    <Layout preview={preview}>
      <Head>
        <title>Morton Music: Catalogue</title>
      </Head>

      <div>
        <div className="py-20 flex items-center justify-center">
          <h1 className="text-5xl font-serif ">Catalogue</h1>
        </div>
      </div>

      <div className="bg-white">
        <Container>
          <div className="py-8">
            <ul>
              {nodes.map((piece) => (
                <PieceRow
                  key={piece.slug}
                  slug={`/catalogue/${piece.slug}`}
                  title={piece.title}
                  sku={piece.sku}
                  description={piece.content}
                  composer={
                    <Link href={`/composers/${piece.composers.nodes[0].slug}`}>
                      {piece.composers.nodes[0].name}
                    </Link>
                  }
                  voicing={piece.voicing.nodes.map((n) => (
                    <Link key={n.slug} href={`/voicing/${n.slug}`}>
                      {n.name}
                    </Link>
                  ))}
                />
              ))}
            </ul>
          </div>
        </Container>
      </div>
    </Layout>
  );
}

export const getStaticProps: GetStaticProps = async ({ preview = false }) => {
  const allPosts = await getAllPostsForHome(preview);
  console.log(allPosts.nodes.length);

  return {
    props: { allPosts, preview },
    revalidate: 10,
  };
};
