/**
 * Implement Gatsby's Browser APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/browser-apis/
 */

// You can delete this file if you're not using it

/**
 * External modules
 */
import React from "react";
import { RecoilRoot } from "recoil";
// import "prismjs/plugins/line-numbers/prism-line-numbers.css";

/**
 * Internal modules
 */
import "./src/styles/global.css";
import "./src/styles/syntax-highlight.css";
import Layout from "./src/components/Layout";

/**
 * Type modules
 */
import type { GatsbyBrowser } from "gatsby";

export const wrapPageElement: GatsbyBrowser["wrapPageElement"] = ({ element, props }) => {
  return (
    <RecoilRoot>
      <Layout {...props}>
        {element}
      </Layout>
    </RecoilRoot>
  );
};
