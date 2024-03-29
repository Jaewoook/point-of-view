/**
 * External modules
 */
import styled from "styled-components";
import { typography } from "styled-system";
import tw from "twin.macro";

/**
 * Type modules
 */
import type { TypographyProps } from "styled-system";

export const Anchor = styled.a<TypographyProps>`
  text-decoration: none;
  ${tw`border-b border-b-zinc-500 border-opacity-40 text-zinc-500 dark:text-zinc-400 transition-all`}

  &:hover {
    ${tw`border-opacity-100 border-b-zinc-800 text-zinc-800 dark:text-zinc-200`}
  }

  ${typography}
`;
