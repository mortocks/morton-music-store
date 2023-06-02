import Head from "next/head";
import { GetStaticProps, GetStaticPaths } from "next";
import Container from "../../components/container";
import MoreStories from "../../components/more-stories";
import HeroPost from "../../components/hero-post";
import Intro from "../../components/intro";
import Layout from "../../components/layout";
import { getAllPostsForHome } from "../../lib/api";
import { CMS_NAME } from "../../lib/constants";
import Link from "next/link";
import Product from "../../components/product";
import { ParsedUrlQuery } from "querystring";
import Image from "next/image";
import DefaultPoster from "../../assets/img/default-piece.jpg";

export default function Index({ post, preview }) {
  const product = post
    ? {
        ...post,
        name: post.title,
        price: 3.0,
        description: post.voicing.nodes[0]?.name || "",
      }
    : null;
  return (
    <Layout preview={preview}>
      <Head>{/* <title>{`Morton Music ${post.title}`}</title> */}</Head>

      {post && (
        <Container>
          <div className="grid grid-cols-3 gap-24 pt-12">
            <Image
              src={DefaultPoster}
              width={200}
              height={300}
              alt={`cover for ${post.title}`}
              className="mb-2 w-full hover:scale-105 transition-all"
            />

            <div className="col-span-2">
              <Link
                className="mb-0 block"
                href={`/composers/${post.composers.nodes[0].slug}`}
              >
                {post.composers.nodes[0].name}
              </Link>
              <h1 className="text-5xl font-bold">{post.title}</h1>

              <div className="mb-4">
                Voicing
                {post.voicing.nodes.map((v) => (
                  <Link
                    className="rounded-full bg-purple-300 text-purple-700 p-1 px-2 text-sm"
                    key={v.slug}
                    href={`/voicing/${v.slug}`}
                  >
                    {v.name}
                  </Link>
                ))}
              </div>

              <div className="">
                <div
                  className="text-lg [&>*]:mb-4 col-span-2"
                  dangerouslySetInnerHTML={{ __html: post.content }}
                />
                <div className="">
                  <Product product={product} />
                </div>
              </div>
            </div>
          </div>
        </Container>
      )}
    </Layout>
  );
}

interface IParams extends ParsedUrlQuery {
  slug: string[];
}

export const getStaticProps: GetStaticProps = async ({
  preview = false,
  params,
}) => {
  const allPosts = await getAllPostsForHome(preview);

  const { slug } = params;

  const isPagination = !isNaN(Number(slug[0]));
  console.log(slug);

  const post = allPosts.nodes.find((p) => p.slug === slug);
  if (!post && !isPagination) {
    return {
      notFound: true,
    };
  }

  if (isPagination) {
    return {
      props: { posts: allPosts, preview, isPagination },
    };
  }

  return {
    props: { post, preview, isPagination },
    revalidate: 10,
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const allPosts = await getAllPostsForHome(false);
  const PER_PAGE = 12;
  const totalPages = Math.ceil(allPosts.nodes.length / PER_PAGE);

  const slugPaths =
    allPosts.nodes.map((piece) => `/catalogue/${piece.slug}`) || [];
  const pagePaths = Array.from(Array(totalPages).keys()).map(
    (n) => `/catalogue/${n + 1}`
  );
  const paths = [...slugPaths, ...pagePaths];

  return {
    paths,
    fallback: false,
  };
};
