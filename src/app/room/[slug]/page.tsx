"use client";

import { useEffect } from "react";

export default function App({ params }: { params: { slug: string } }) {
  useEffect(() => {
    console.log("params = ", params);
  }, [params]);

  return <div>ini page</div>;
}
