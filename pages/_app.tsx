import "@/styles/Global.scss";
import "@/utils/aws/Amplify";
import type { AppProps } from "next/app";

import { Amplify } from "aws-amplify";
import awsExports from "../src/aws-exports";

Amplify.configure({
  ...awsExports,
});

export default function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}
