import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PROJECTS, getNeighbours } from "@/data/projects";
import ProjectDetail from "@/components/projects/ProjectDetail";
import JsonLd from "@/components/seo/JsonLd";
import {
  breadcrumbSchema,
  projectCreativeWorkSchema,
} from "@/lib/jsonld";

type RouteParams = { slug: string };

export function generateStaticParams() {
  return PROJECTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<RouteParams>;
}): Promise<Metadata> {
  const { slug } = await params;
  const neighbours = getNeighbours(slug);
  if (!neighbours) return {};
  const project = PROJECTS[neighbours.index];

  const title = `${project.name} — ${project.category}`;
  const description =
    project.intro ?? project.description ?? `${project.name} by Infravue.`;
  const canonical = `/projects/${slug}`;
  const ogImage = project.image;

  return {
    title,
    description,
    alternates: { canonical },
    openGraph: {
      title,
      description,
      url: canonical,
      type: "article",
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: `${project.name} — ${project.category} interior by Infravue`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage],
    },
  };
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<RouteParams>;
}) {
  const { slug } = await params;
  const neighbours = getNeighbours(slug);
  if (!neighbours) notFound();

  const project = PROJECTS[neighbours.index];

  const breadcrumbs = breadcrumbSchema([
    { name: "Home", path: "/" },
    { name: "Projects", path: "/#projects" },
    { name: project.name, path: `/projects/${slug}` },
  ]);

  const creativeWork = projectCreativeWorkSchema({
    slug,
    name: project.name,
    category: project.category,
    intro: project.intro,
    description: project.description,
    image: project.image,
    year: project.year,
    location: project.location,
    area: project.area,
  });

  return (
    <>
      <JsonLd data={[breadcrumbs, creativeWork]} />
      <ProjectDetail
        project={project}
        index={neighbours.index}
        total={neighbours.total}
        prevSlug={neighbours.prev.slug}
        nextSlug={neighbours.next.slug}
      />
    </>
  );
}
