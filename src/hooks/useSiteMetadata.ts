import { graphql, useStaticQuery } from "gatsby";

const query = graphql`
  query GetSiteMetadata {
    site {
      siteMetadata {
        author
        year
        siteUrl
        githubUrl
        portfolioUrl
        title
        description
      }
    }
  }
`;

export const useSiteMetadata = () => {
  return useStaticQuery<Queries.GetSiteMetadataQuery>(query).site?.siteMetadata;
};
