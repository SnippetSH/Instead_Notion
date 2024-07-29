import { Input } from '@/4_shared/components/ui/input';
import { UserStore } from '@/5_api/store/UserStore';
import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import { ClassicEditor, Bold, Essentials, Italic, Mention, Paragraph, Undo } from 'ckeditor5';
import { SlashCommand } from 'ckeditor5-premium-features';

export default function CreatePage() {
  const userPer = UserStore((s) => s.permission);
  const navigate = useNavigate();
  if (userPer === 'unlogin') {
    return <div> Please Make a Account or Login First <button onClick={() => navigate('/')}>바봉</button> </div>
  }

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const editorRef = useRef<HTMLDivElement>(null);


  return (
    <div className='w-screen h-screen relative'>
      <h2 className='mt-20 mb-10 mx-20 text-2xl'> Create New Page </h2>
      <div className='flex justify-center'>
        <div className='w-2/3 flex flex-col items-center'>
          <Input type='text' placeholder='title' value={title} onChange={(e) => setTitle(e.target.value)} className='mb-5' />
          <CKEditor
            editor={ ClassicEditor }
            config={ {
              toolbar: {
                  items: [ 'undo', 'redo', '|', 'bold', 'italic' ],
              },
              plugins: [
                  Bold, Essentials, Italic, Mention, Paragraph, SlashCommand, Undo
              ],
              
              initialData: '<p>Hello from CKEditor 5 in React!</p>',
            }} />
        </div>
      </div>

      <button onClick={() => navigate('/')}>바봉</button>
    </div>
  )
}