import { type FC, type ReactNode } from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from '@dnd-kit/utilities';

interface SortableProps {
  id: string
  children: ReactNode
}

const SortableItem: FC<SortableProps> = ({ children, id }) => {
  const {
    attributes,
    listeners,
    isDragging,
    transition,
    transform,
    setNodeRef,
  } = useSortable({ id })
  return (
    <div
      style={{
        transition,
        transform: CSS.Translate.toString(transform),
        zIndex: isDragging ? 1250 : 1200
      }}
      ref={setNodeRef}
      {...attributes}
      {...listeners}
    >
      {children}
    </div>
  )
}

export default SortableItem;
