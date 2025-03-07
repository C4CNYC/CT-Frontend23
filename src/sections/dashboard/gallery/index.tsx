import React from 'react'

import { IGallery } from '@root/src/redux/interfaces/gallery.interface'

import { GalleryDrawerProvider } from './context/gallery-drawer-context'
import GalleryItem from './gallery-item'

type Props = {
  projects: IGallery[]
}

function ProjectsList({ projects }: Props) {
  return (
    <GalleryDrawerProvider projects={projects}>
      {projects.map((p) => (
        <GalleryItem
          key={p.id}
          project={p}
        />
      ))}
    </GalleryDrawerProvider>
  )
}

export default ProjectsList
