import Quill from 'quill'
import 'quill/dist/quill.bubble.css'
import { useRef, useEffect, useState } from 'react';
import { FaBold, FaItalic, FaUnderline, FaStrikethrough, FaListOl, FaListUl, FaIndent, FaOutdent, FaQuoteRight, FaCode, FaLink, FaImage } from 'react-icons/fa';
import { DropDownTrigger, DropDownItem, DropDownMenu, Button } from '@/components/ui';
import { ThemeStore } from '@/api/store/themeStore';
import { useContentStore } from '@/api/store/contentStore';
import { shallow } from 'zustand/shallow';

const EditorBlock = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className='py-10 mb-5 px-4 w-2/3 h-0.9 flex flex-col items-center '>{children}</div>
  )
}

const TitleInputBlock = ({ setTitle }: { setTitle: (title: string) => void }) => {
  return (
    <input
      className='text-4xl outline-none border-none border-b-1 border-gray-300 mb-8 w-full bg-transparent'
      placeholder='Enter Your Title'
      onChange={(e) => setTitle(e.target.value)}
    />
  )
}

const DocWrapper = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className='doc-wrapper w-full h-full text-sm'>{children}</div>
  )
}

const Toolbar = ({ quill }: { quill: Quill | null }) => {
  const theme = ThemeStore(state => state.theme);
  const buttonClass = `text-sm font-normal w-24 border-0 border-none shadow-none hover:shadow-none ${theme === 'light' ? 'bg-white-100' : 'bg-dark-600'}`;
  const buttonStyle = {
    fontSize: '0.875rem',
    lineHeight: '1.25rem',
  }

  const [formatState, setFormatState] = useState({
    bold: false,
    italic: false,
    underline: false,
    strike: false,
    listOrdered: false,
    listBullet: false,
    blockquote: false,
    'code-block': false,
  });

  const applyFormat = (format: string, value: any = true) => {
    console.log(formatState)
    if (quill) {
      const currentFormat = quill.getFormat();

      if (format === 'header') {
        quill.format(format, value);
        return;
      }

      if (currentFormat[format]) {
        quill.format(format, false);
        setFormatState(prev => ({ ...prev, [format]: false }));
      } else {
        quill.format(format, value);
        setFormatState(prev => ({ ...prev, [format]: true }));
      }
    }
  }

  return (
    <div className={`custom-toolbar ${theme === 'light' ? 'bg-white-900' : 'bg-dark-600'} z-10 relative`}>
      <DropDownMenu isTheme={false} className=''>
        <DropDownTrigger>
          <Button className={buttonClass} style={{ fontWeight: 'bold' }}>Format <span className='text-sm'>▼</span></Button>
        </DropDownTrigger>
        <DropDownItem>
          <Button className={buttonClass} onClick={() => { applyFormat('header', 1) }} style={buttonStyle}>Heading 1</Button>
        </DropDownItem>
        <DropDownItem>
          <Button className={buttonClass} onClick={() => { applyFormat('header', 2) }} style={buttonStyle}>Heading 2</Button>
        </DropDownItem>
        <DropDownItem>
          <Button className={buttonClass} onClick={() => { applyFormat('header', 3) }} style={buttonStyle}>Heading 3</Button>
        </DropDownItem>
        <DropDownItem>
          <Button className={buttonClass} onClick={() => { applyFormat('header', 4) }} style={buttonStyle}>Heading 4</Button>
        </DropDownItem>
        <DropDownItem>
          <Button className={buttonClass} onClick={() => { applyFormat('header', false) }} style={buttonStyle}>Normal</Button>
        </DropDownItem>
      </DropDownMenu>
      <button className={`ql-bold ${formatState.bold ? 'bg-pure-white/20 rounded-[5px]' : ''}`} onClick={() => applyFormat('bold')}><FaBold /></button>
      <button className={`ql-italic ${formatState.italic ? 'bg-pure-white/20 rounded-[5px]' : ''}`} onClick={() => applyFormat('italic')}><FaItalic /></button>
      <button className={`ql-underline ${formatState.underline ? 'bg-pure-white/20 rounded-[5px]' : ''}`} onClick={() => applyFormat('underline')}><FaUnderline /></button>
      <button className={`ql-strike ${formatState.strike ? 'bg-pure-white/20 rounded-[5px]' : ''}`} onClick={() => applyFormat('strike')}><FaStrikethrough /></button>
      <button className={`ql-list ${formatState.listOrdered ? 'bg-pure-white/20 rounded-[5px]' : ''}`} value="ordered" onClick={() => applyFormat('list', 'ordered')}><FaListOl /></button>
      <button className={`ql-list ${formatState.listBullet ? 'bg-pure-white/20 rounded-[5px]' : ''}`} value="bullet" onClick={() => applyFormat('list', 'bullet')}><FaListUl /></button>
      <button className={`ql-indent`} value="-1" onClick={() => applyFormat('indent', -1)}><FaOutdent /></button>
      <button className={`ql-indent`} value="+1" onClick={() => applyFormat('indent', 1)}><FaIndent /></button>
      <button className={`ql-blockquote ${formatState.blockquote ? 'bg-pure-white/20 rounded-[5px]' : ''}`} onClick={() => applyFormat('blockquote')}><FaQuoteRight /></button>
      <button className={`ql-code-block ${formatState['code-block'] ? 'bg-pure-white/20 rounded-[5px]' : ''}`} onClick={() => applyFormat('code-block')}><FaCode /></button>
      <button className="ql-link" onClick={() => applyFormat('link', true)}><FaLink /></button>
      <button className="ql-image" onClick={() => applyFormat('image', true)}><FaImage /></button>
    </div>
  );
};

const adjustTooltipPosition = () => {
  const tooltip = document.querySelector('.ql-bubble .ql-tooltip') as HTMLElement;
  if (tooltip) {
    const rect = tooltip.getBoundingClientRect();
    const parentRect = tooltip.parentElement?.getBoundingClientRect();
    if (parentRect && rect.left < parentRect.left) {
      // console.log(parentRect.left, parentRect.right)
      tooltip.style.left = `${parentRect.left - 500}px`;
      // console.log(tooltip.style.left)
    }
  }
};

export const InputBlock = () => {
  const quillRef = useRef<HTMLDivElement>(null);
  const [quill, setQuill] = useState<Quill | null>(null);
  const { content, setContent, setTitle } = useContentStore(state => ({
    setTitle: state.setTitle,
    content: state.content,
    setContent: state.setContent
  }), shallow);

  useEffect(() => {
    if (quillRef.current && !quill) {
      const quillInstance = new Quill(quillRef.current, {
        theme: 'bubble',
        placeholder: 'Write Your Ideas Here...',
        modules: {
          toolbar: [
            [{ header: [1, 2, 3, 4, false] }],
            ['bold', 'italic', 'underline', 'strike'],
            [{ list: 'ordered' }, { list: 'bullet' }],
            [{ indent: '-1' }, { indent: '+1' }],
            ['blockquote', 'code-block', 'link', 'image'],
          ],
          clipboard: {
            matchVisual: false,
          }
        },
      });

      quillInstance.setContents([{ insert: '\n' }]);
      quillInstance.on('selection-change', () => adjustTooltipPosition());
      quillInstance.on('text-change', () => { 
        adjustTooltipPosition();
        setContent(quillInstance.root.innerHTML);
      });
      setQuill(quillInstance);     
    }
  }, [quillRef]);

  useEffect(() => {
    console.log(content)
  }, [content])

  return (
    <EditorBlock>
      <TitleInputBlock setTitle={setTitle} />
      <div className="relative w-full h-0.9">
        <Toolbar quill={quill} />
        <div className='relative w-full h-full overflow-y-hidden'>
          <DocWrapper>
            <div ref={quillRef} style={{ height: '100%' }} className='w-full h-full bg-transparent quill-editor custom-placeholder overflow-y-auto' />
          </DocWrapper>
        </div>
      </div>
    </EditorBlock>
  )
}