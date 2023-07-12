import { GetServerSideProps } from "next";
import { ReactNode } from "react";

import axios from "axios";
// @ts-expect-error dont see react-html-parser
import ReactHtmlParser from "react-html-parser";

import { Typography } from "@mui/material";

import GuestGuard from "src/auth/GuestGuard";
import { IGallery } from "src/redux/interfaces/gallary.interface";

interface Props {
  data?: IGallery;
  error?: string;
}

export default function GallaryPublic({
  data,
  error,
}: Props): React.ReactElement {
  const commentsRemove = (code: ReactNode[]): ReactNode[] => {
    return code.filter((el) => !(typeof el === "string"));
  };

  if (error) {
    return (
      <GuestGuard>
        <Typography variant="h4" sx={{ textAlign: "center", mt: 4 }}>
          {error}
        </Typography>
      </GuestGuard>
    );
  }
  return (
    <GuestGuard>
      {data && data.language === "html" ? (
        commentsRemove(ReactHtmlParser(JSON.parse(data.body).body.code))
      ) : (
        <Typography variant="h4" sx={{ textAlign: "center", mt: 4 }}>
          Language is not supported
        </Typography>
      )}
    </GuestGuard>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  try {
    const { data } = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/student/public/project/${params?.id}`,
      { headers: { "X-Tenant-Id": "codetribe" } }
    );
    return { props: { data } };
  } catch (error: any) {
    return {
      props: {
        error,
      },
    };
  }
};
