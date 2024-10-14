import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { db } from '../../config/Firebase';
import { doc, getDoc, collection, addDoc, query, where, getDocs, setDoc, updateDoc, deleteDoc } from 'firebase/firestore';
import styled from 'styled-components';
import Modal from 'react-modal';
import { FaPlus, FaEdit, FaTrash } from 'react-icons/fa';

Modal.setAppElement('#root');

const SessionHub = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [session, setSession] = useState(null);
    const [notes, setNotes] = useState([]);
    const [newNote, setNewNote] = useState({ text: '', userId: '' });
    const [isNoteModalOpen, setIsNoteModalOpen] = useState(false);
    const [modalIsOpen, setIsOpen] = useState(false);
    const [username, setUsername] = useState('');
    const [previousUsernames, setPreviousUsernames] = useState([]); // Nomes antigos
    const [isEditingUsername, setIsEditingUsername] = useState(false);
    const [isEditMode, setIsEditMode] = useState(false); // Estado para controle de edição
    const [editNoteId, setEditNoteId] = useState(null); // Armazena o ID da nota que está sendo editada

    useEffect(() => {
        const fetchSession = async () => {
            const docRef = doc(db, "sessions", id);
            const docSnap = await getDoc(docRef);
            if (docSnap.exists()) {
                setSession(docSnap.data());
                await fetchNotes(id);
                await checkForUserId();
            } else {
                console.log("No such document!");
                navigate("/");
            }
        };
        fetchSession();
    }, [id, navigate]);

    const fetchNotes = async (sessionId) => {
        const notesRef = collection(db, "notes");
        const q = query(notesRef, where("sessionId", "==", sessionId));
        const querySnapshot = await getDocs(q);
        const fetchedNotes = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setNotes(fetchedNotes);
    };

    const addNote = async () => {
        if (newNote.text) {
            if (isEditMode) {
                // Se estiver no modo de edição, atualizar a nota existente
                const noteRef = doc(db, "notes", editNoteId);
                await updateDoc(noteRef, {
                    text: newNote.text,
                    updatedAt: new Date()
                });
                setIsEditMode(false);
                setEditNoteId(null);
            } else {
                // Caso contrário, adicionar uma nova nota
                await addDoc(collection(db, "notes"), {
                    ...newNote,
                    userId: username,
                    sessionId: id,
                    createdAt: new Date()
                });
            }
            setNewNote({ text: '', userId: '' });
            await fetchNotes(id);
            closeNoteModal();
        }
    };

    const editNote = (noteId, noteText) => {
        setIsEditMode(true);
        setEditNoteId(noteId);
        setNewNote({ text: noteText, userId: username });
        openNoteModal();
    };

    const deleteNote = async (noteId) => {
        if (window.confirm("Tem certeza que deseja apagar esta anotação?")) {
            await deleteDoc(doc(db, "notes", noteId));
            await fetchNotes(id);
        }
    };

    const backToSessions = () => {
        navigate("/sessao");
    };

    const checkForUserId = async () => {
        const storedUserId = localStorage.getItem('userId');
        const storedPreviousUsernames = JSON.parse(localStorage.getItem('previousUsernames')) || [];
        if (!storedUserId) {
            openModal();
        } else {
            setUsername(storedUserId);
            setPreviousUsernames(storedPreviousUsernames); // Carregar nomes antigos
            setNewNote({ ...newNote, userId: storedUserId });
        }
    };

    const openModal = () => {
        setIsOpen(true);
        setIsEditingUsername(false);
    };

    const closeModal = () => {
        setIsOpen(false);
        setIsEditingUsername(false);
    };

    const saveUsername = async () => {
        if (username) {
            const userDocRef = doc(db, "users", username);
            await setDoc(userDocRef, { username });

            const storedPreviousUsernames = JSON.parse(localStorage.getItem('previousUsernames')) || [];
            storedPreviousUsernames.push(username); // Adicionar o nome atual à lista de nomes antigos
            localStorage.setItem('previousUsernames', JSON.stringify(storedPreviousUsernames));

            localStorage.setItem('userId', username);
            setPreviousUsernames(storedPreviousUsernames); // Atualizar o estado com os nomes antigos
            closeModal();
            setNewNote({ ...newNote, userId: username });
        }
    };

    const openNoteModal = () => {
        setIsNoteModalOpen(true);
    };

    const closeNoteModal = () => {
        setIsNoteModalOpen(false);
        setIsEditMode(false);
        setEditNoteId(null);
    };

    const editUsername = () => {
        setIsEditingUsername(true);
        openModal();
    };

    const canEditOrDelete = (noteUserId) => {
        return noteUserId === username || previousUsernames.includes(noteUserId); // Verificar se é o usuário atual ou um nome antigo
    };

    if (!session) return <LoadingContainer>Carregando...</LoadingContainer>;

    return (
        <SessionHubContainer>
            <Title>{session.name}</Title>
            <SessionId>ID da Sessão: {id}</SessionId>

            <NoteContainer>
                <NoteGrid>
                    {notes.map(note => (
                        <NoteCard key={note.id}>
                            <NoteHeader>ID do Usuário: {note.userId}</NoteHeader>
                            <NoteContent>{note.text}</NoteContent>
                            <NoteFooter>Data: {note.createdAt?.toDate().toLocaleString()}</NoteFooter>
                            {canEditOrDelete(note.userId) && ( // Mostrar botões de editar e apagar apenas para o autor ou nomes antigos
                                <NoteActions>
                                    <EditButton onClick={() => editNote(note.id, note.text)}>
                                        <FaEdit /> Editar
                                    </EditButton>
                                    <DeleteButton onClick={() => deleteNote(note.id)}>
                                        <FaTrash /> Apagar
                                    </DeleteButton>
                                </NoteActions>
                            )}
                        </NoteCard>
                    ))}
                </NoteGrid>
                <AddNoteButton onClick={openNoteModal}>
                    <FaPlus size={24} />
                </AddNoteButton>
            </NoteContainer>

            <Footer>
                <Button onClick={backToSessions}>Voltar</Button>
                <Button onClick={editUsername}>Alterar Nome</Button>
            </Footer>

            {/* Modal para adicionar nova anotação */}
            <Modal
                isOpen={isNoteModalOpen}
                onRequestClose={closeNoteModal}
                style={{
                    content: {
                        top: '50%',
                        left: '50%',
                        right: 'auto',
                        bottom: 'auto',
                        marginRight: '-50%',
                        transform: 'translate(-50%, -50%)',
                        padding: '40px',
                        width: '400px',
                        borderRadius: '10px',
                        backgroundColor: 'black',
                        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                    },
                }}
            >
                <ModalContent>
                    <ModalTitle>{isEditMode ? "Editar Anotação" : "Adicionar Nova Anotação"}</ModalTitle>
                    <ModalInput 
                        type="text" 
                        value={newNote.text} 
                        onChange={(e) => setNewNote({ ...newNote, text: e.target.value })} 
                        placeholder="Escreva sua anotação"
                    />
                    <ButtonGroup>
                        <Button onClick={addNote}>{isEditMode ? "Salvar Alterações" : "Salvar"}</Button>
                        <Button onClick={closeNoteModal}>Cancelar</Button>
                    </ButtonGroup>
                </ModalContent>
            </Modal>

            {/* Modal para editar nome de usuário */}
            <Modal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                style={{
                    content: {
                        top: '50%',
                        left: '50%',
                        right: 'auto',
                        bottom: 'auto',
                        marginRight: '-50%',
                        transform: 'translate(-50%, -50%)',
                        padding: '40px',
                        width: '400px',
                        borderRadius: '10px',
                        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                    },
                }}
            >
                <ModalContent>
                    <ModalTitle>{isEditingUsername ? "Alterar Nome de Usuário" : "Configurar Nome de Usuário"}</ModalTitle>
                    <ModalInput 
                        type="text" 
                        value={username} 
                        onChange={(e) => setUsername(e.target.value)} 
                        placeholder="Digite seu nome de usuário"
                    />
                    <ButtonGroup>
                        <Button onClick={saveUsername}>{isEditingUsername ? "Salvar Alterações" : "Salvar"}</Button>
                        <Button onClick={closeModal} style={{ backgroundColor: '#ccc' }}>Cancelar</Button>
                    </ButtonGroup>
                </ModalContent>
            </Modal>
        </SessionHubContainer>
    );
};

const LoadingContainer = styled.div`
  text-align: center;
  font-size: 18px;
  margin-top: 100px;
`;

const SessionHubContainer = styled.div`
  padding: 20px;
  text-align: center;
  max-width: 800px;
  margin: 0 auto;
`;

const Title = styled.h1`
  font-size: 32px;
  margin-bottom: 10px;
`;

const SessionId = styled.div`
  font-size: 16px;
  color: #777;
  margin-bottom: 30px;
`;

const NoteContainer = styled.div`
  margin-top: 20px;
  position: relative;
`;

const NoteGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(100%, 1fr));
  gap: 15px;
`;

const NoteCard = styled.div`
  border: 1px solid #ccc;
  padding: 15px;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s;
`;

const NoteHeader = styled.h4`
  margin: 0;
  color: #666;
`;

const NoteContent = styled.p`
  margin: 10px 0;
  text-align: justify;
  color: white;
`;

const NoteFooter = styled.small`
  color: #888;
  margin: 0;
`;

const NoteActions = styled.div`
  margin-top: 10px;
  display: flex;
  justify-content: space-between;
`;

const EditButton = styled.button`
  background-color: white;
  border: none;
  color: black;
  padding: 5px 10px;
  border-radius: 4px;
  cursor: pointer;
  &:hover {
    background-color: #FF8C00;
  }
`;

const DeleteButton = styled.button`
  background-color: white;
  border: none;
  color: black;
  padding: 5px 10px;
  border-radius: 4px;
  cursor: pointer;
  &:hover {
    background-color: #FF6347;
  }
`;

const AddNoteButton = styled.button`
  background-color: #4CAF50;
  border: none;
  color: white;
  padding: 15px;
  border-radius: 50%;
  cursor: pointer;
  position: fixed;
  bottom: 20px;
  right: 20px;
  &:hover {
    background-color: #45a049;
  }
`;

const Footer = styled.div`
  margin-top: 40px;
  display: flex;
  justify-content: space-around;
`;

const Button = styled.button`
  padding: 10px 20px;
  background-color: white;
  color: black;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  &:hover {
    background-color: gray;
  }
`;

const ModalContent = styled.div`
  text-align: center;
`;

const ModalTitle = styled.h2`
  margin-bottom: 20px;
  color: white;
`;

const ModalInput = styled.textarea` // Alterado para textarea para permitir mais espaço
    width: 100%;
    max-width: 100%; // Limita a largura máxima
    min-height: 50vh; // Altura mínima para a entrada
    resize: vertical;
    background-color: black;
    color: white;
    padding: 10px;
    margin-bottom: 20px;
    border: 1px solid #ccc;
    border-radius: 4px;
    box-sizing: border-box;
`;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: space-between;
`;

export default SessionHub;
