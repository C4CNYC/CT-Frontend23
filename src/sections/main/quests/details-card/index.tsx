import { Stack } from '@mui/material'

import { IClass } from '@/redux/interfaces/class.interface'
import { BaseResponseInterface } from '@/utils/baseResponse.interface'

import AboutTribe from './AboutTribe'
import GeneralInfo from './GeneralInfo'

interface IDetailsTabProps {
  classData: IClass & BaseResponseInterface
  activeTab: boolean
}

export default function DetailsTab({ classData, activeTab }: IDetailsTabProps): React.ReactElement {
  return (
    <>
      {/* <Card
        sx={{
          mb: 3,
          height: 280,
          position: "relative",
        }}
      >
        <ProfileCover
          name={classData.name}
          cover={classData.cover ?? ""}
          avatar={classData.avatar ?? ""}
        />
      </Card> */}
      <Stack gap={2}>
        <GeneralInfo activeTab={activeTab} />
        <AboutTribe
          description={classData.description ?? ''}
          city={classData?.school?.city ?? ''}
          country={classData?.school?.country ?? ''}
          createdAt={classData.createdAt}
          schoolName={classData?.school?.name ?? ''}
        />
      </Stack>
    </>
  )
}
