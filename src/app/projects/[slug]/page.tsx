import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PROJECTS, getNeighbours } from "@/data/projects";
import ProjectDetail from "@/components/projects/ProjectDetail";

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

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: [{ url: project.image }],
      type: "article",
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

  return (
    <ProjectDetail
      project={project}
      index={neighbours.index}
      total={neighbours.total}
      prevSlug={neighbours.prev.slug}
      nextSlug={neighbours.next.slug}
    />
  );
}
