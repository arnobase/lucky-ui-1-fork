import Header from "../components/Header"
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import toc from "@jsdevtools/rehype-toc"
import rehypeSlug from 'rehype-slug'
import rehypeRaw from 'rehype-raw'
import mdDoc from '../wiki/doc.md'

export default function Wiki() {

  return (
    <div>
      <Header />
      <div className="markdown-body px-6">
        <ReactMarkdown 
          children={mdDoc}
          remarkPlugins={[remarkGfm]}
          rehypePlugins={[rehypeSlug,toc,rehypeRaw]}
        ></ReactMarkdown>
      </div>
    </div>
  );
}
