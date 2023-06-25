import { PATH_PAGE } from "@routes/paths";
import { globalCodePanelAtom } from "@sections/code-panel/atoms/global-code-panel.atom";
import { useAtom } from "jotai";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useGetChallangesQuery } from "src/redux/services/student/challenges-student";

export default function Index(): React.ReactElement | null {
  const { push, query } = useRouter();
  const [, setGlobalCodePanel] = useAtom(globalCodePanelAtom);

  const { data } = useGetChallangesQuery(
    { id: query.id as string },
    { skip: !query.id }
  );
  const onOpenLesson = (lessonId: string, unitId: string): void => {
    setGlobalCodePanel((prev) => ({
      ...prev,
      courseId: query.id as string,
    }));
    push(
      `/${PATH_PAGE.codePanel.workSpace(
        query.id as string
      )}/${unitId}/${lessonId}`
    );
  };

  useEffect(() => {
    if (!data) return;

    onOpenLesson(data.units[0].lessons[0].id, data.units[0].id);
  }, [data]);

  return null;
}
