"use client";

import dynamic from "next/dynamic";

const ModelLoader = dynamic(() => import("./ModelLoader"), {
  ssr: false,
});

export function ModelLoaderWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  return <ModelLoader>{children}</ModelLoader>;
}
