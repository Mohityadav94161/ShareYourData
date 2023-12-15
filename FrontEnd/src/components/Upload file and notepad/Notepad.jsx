import {React,useState,useRef} from 'react';
import NotepadIcon from '../../assets/notepad.svg';
import NotepadCard from './NotepadCard';
import './notepad.css';

export const Notepad = ({Entereddata}) => {
    const [notepadData, setNotepadData] = useState({ name: '', data: '' });

    const onNoteSave = (name, data) => {
        console.log("2. direct console " ,name,data);
        setNotepadData({ name: name, data: data });
        console.log("3. direct console notepad " ,notepadData)
        Entereddata(notepadData);
    }
 
    const notepadRef = useRef();
    const handleDivClick = () => {
        notepadRef.current.click();
    };
    return (
        <div>
            <div className="notepad-card" onClick={handleDivClick} >
                <img className='notepadIcon' src={NotepadIcon}  alt="Notepad" />
                <p style={{ fontSize: "16px", margin: "0px" }}>Notepad</p>
            </div>
            <NotepadCard onNoteSave={onNoteSave} ref={notepadRef} />

        </div>
    )
}
