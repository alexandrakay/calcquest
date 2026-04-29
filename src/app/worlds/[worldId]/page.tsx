import { notFound } from 'next/navigation';

import { WorldDetailClient } from '@/components/worlds/WorldDetailClient';
import { courseWorldById } from '@/data/courseMap';

export default async function WorldDetailPage({
  params,
}: {
  params: Promise<{ worldId: string }>;
}) {
  const { worldId } = await params;
  const world = courseWorldById[worldId];

  if (!world) {
    notFound();
  }

  return <WorldDetailClient world={world} />;
}
