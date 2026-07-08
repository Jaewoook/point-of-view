/**
 * External modules
 */
import { Link } from "gatsby";
import { FaGithub } from "react-icons/fa";

/**
 * Internal modules
 */
import { useSiteMetadata } from "@/hooks/useSiteMetadata";

export const Footer = () => {
  const siteMetadata = useSiteMetadata();

  return (
    <footer className="container flex flex-row py-8 px-3 max-sm:px-0 mx-auto space-x-4 max-sm:justify-center text-zinc-800 dark:text-zinc-200">
      <p>{siteMetadata?.year} {siteMetadata?.author}</p>
      <span> | </span>
      <a className="inline-flex items-center" rel="noreferrer" target="_blank" href={siteMetadata?.githubUrl ?? ""}>
        <FaGithub className="mr-1" />
        GitHub
      </a>
      <span> | </span>
      <Link className="inline-flex items-center" to="/about">
        About
      </Link>
    </footer>
  );
};
