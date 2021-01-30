import React from "react";
import gfm from "remark-gfm";
import ReactMarkdown from "react-markdown";

export type MarkdownProps = {
  body: string;
};

export const Markdown: React.FC<MarkdownProps> = ({ body }) => {
  return (
    <ReactMarkdown plugins={[gfm]} renderers={{ link: LinkRenderer }}>
      {body}
    </ReactMarkdown>
  );
};

type LinkRendererProps = {
  href: string;
};

const LinkRenderer: React.FC<LinkRendererProps> = (props) => {
  return (
    <a href={props.href} target="_blank">
      {props.children}
    </a>
  );
};
