import { CodeResultView } from "@components/code-result-view";
import RealTimeCodeEditor from "@components/real-time-code-editor";
import { Box, Stack } from "@mui/system";
import { useRouter } from "next/router";
import { memo, useState } from "react";
import { io } from "socket.io-client";
import { useAuthContext } from "src/auth/useAuthContext";

const socket = io(process.env.NEXT_PUBLIC_CODE_STREAM_API ?? "", { path: "/" });

const CodeSpace = (): React.ReactElement | null => {
  const { query } = useRouter();
  const { user } = useAuthContext();

  const [code, setCode] = useState("");

  return (
    <Stack direction="row">
      <Box flex="1">
        <RealTimeCodeEditor
          roomId={query.id as string}
          colabCursonId={user?.email}
          connectionType="create"
          colabCursonText={`${user?.first_name} ${user?.last_name?.[0]}`}
          socket={socket}
          onChangeCode={(code) => { setCode(code) }}
        />
      </Box>
      <Box borderLeft="1px solid rgb(255, 255, 255)" flex="1">
        <CodeResultView code={code} language={"html"} />
      </Box>
    </Stack>
  );
}

export default memo(CodeSpace);
