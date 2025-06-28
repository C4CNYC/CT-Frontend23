import { Stack } from '@mui/material'

import { IAuthor } from '@/redux/services/interfaces/author.interface'

import AuthorsCard from './AuthorsCard'

interface IAuthorsListProps {
  authors: IAuthor[]
  moduleId: string
}
export default function AuthorsList({ authors, moduleId }: IAuthorsListProps): React.ReactElement {
  return (
    <Stack gap={2}>
      {authors.map((author, i) => {
        return (
          <AuthorsCard
            key={author.id}
            author={author}
            moduleId={moduleId}
          />
        )
      })}
    </Stack>
  )
}
