import { LazyMotion, m } from "framer-motion";

// ----------------------------------------------------------------------

// eslint-disable-next-line import/extensions
const loadFeatures = async () =>
  await import("./features.js").then((res) => res.default);

interface Props {
  children: React.ReactNode;
}

export function MotionLazyContainer({
  children,
}: Props): React.ReactElement | null {
  return (
    <LazyMotion strict features={loadFeatures}>
      <m.div style={{ height: "100%" }}> {children} </m.div>
    </LazyMotion>
  );
}
