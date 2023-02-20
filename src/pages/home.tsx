import CardModule from "src/components/card-module";
import UserSection from "src/components/user-section";

export default function Home() {
  return (
    <>
      <UserSection />
      <CardModule lesson={""} course={""} module={""} />
    </>
  );
}
