import React, { useState } from 'react';
import { PlusCircle, Copy, Edit, Trash, FolderClosed, Check, X, Settings } from 'lucide-react';

function App() {
    const [selectedAI, setSelectedAI] = useState('ChatGPT');
    const [prompts, setPrompts] = useState([]);
    const [showAddPrompt, setShowAddPrompt] = useState(false);
    const [showAddAI, setShowAddAI] = useState(false);
    const [editingAI, setEditingAI] = useState(null);
    const [newPrompt, setNewPrompt] = useState({ title: '', content: '' });
    const [editingPrompt, setEditingPrompt] = useState(null);
    const [notification, setNotification] = useState(null);
    const [showAISettings, setShowAISettings] = useState(false);

    const availableColors = [
        { name: 'Smaragd', value: 'emerald' },
        { name: 'Violett', value: 'purple' },
        { name: 'Blau', value: 'blue' },
        { name: 'Rot', value: 'red' },
        { name: 'Orange', value: 'orange' },
        { name: 'Indigo', value: 'indigo' },
        { name: 'Pink', value: 'pink' },
        { name: 'Cyan', value: 'cyan' }
    ];

    const [aiTypes, setAiTypes] = useState([
        { id: 'ChatGPT', bgColor: 'bg-emerald-800', color: 'emerald' },
        { id: 'Claude', bgColor: 'bg-purple-800', color: 'purple' },
        { id: 'DALL-E', bgColor: 'bg-blue-800', color: 'blue' }
    ]);

    const [newAI, setNewAI] = useState({
        name: '',
        color: 'emerald'
    });

    const showNotification = (message, type = 'success') => {
        setNotification({ message, type });
        setTimeout(() => setNotification(null), 3000);
    };

    // AI Management Functions
    const handleAddAI = () => {
        if (newAI.name.trim()) {
            const newAIEntry = {
                id: newAI.name.trim(),
                bgColor: `bg-${newAI.color}-800`,
                color: newAI.color
            };

            setAiTypes([...aiTypes, newAIEntry]);
            setNewAI({ name: '', color: 'emerald' });
            setShowAddAI(false);
            showNotification('KI erfolgreich hinzugefügt');
        }
    };

    const handleEditAI = (ai) => {
        setEditingAI({
            ...ai,
            name: ai.id
        });
        setShowAISettings(true);
    };

    const handleUpdateAI = () => {
        const updatedAIs = aiTypes.map(ai =>
            ai.id === editingAI.id ? {
                id: editingAI.name,
                bgColor: `bg-${editingAI.color}-800`,
                color: editingAI.color
            } : ai
        );
        setAiTypes(updatedAIs);
        setEditingAI(null);
        setShowAISettings(false);
        showNotification('KI erfolgreich aktualisiert');
    };

    const handleDeleteAI = (aiId) => {
        if (aiTypes.length <= 1) {
            showNotification('Es muss mindestens eine KI vorhanden sein', 'error');
            return;
        }

        if (window.confirm('Möchten Sie diese KI wirklich löschen? Alle zugehörigen Prompts werden ebenfalls gelöscht.')) {
            const updatedAIs = aiTypes.filter(ai => ai.id !== aiId);
            setAiTypes(updatedAIs);
            setPrompts(prompts.filter(prompt => prompt.aiType !== aiId));
            if (selectedAI === aiId) {
                setSelectedAI(updatedAIs[0].id);
            }
            showNotification('KI erfolgreich gelöscht');
        }
    };

    // Prompt Management Functions
    const handleAddPrompt = () => {
        if (newPrompt.title && newPrompt.content) {
            const prompt = {
                id: Date.now(),
                ...newPrompt,
                aiType: selectedAI
            };
            setPrompts([...prompts, prompt]);
            setNewPrompt({ title: '', content: '' });
            setShowAddPrompt(false);
            showNotification('Prompt erfolgreich hinzugefügt');
        }
    };

    const handleEditPrompt = (prompt) => {
        setEditingPrompt(prompt);
        setShowAddPrompt(true);
    };

    const handleUpdatePrompt = () => {
        setPrompts(prompts.map(p =>
            p.id === editingPrompt.id ? editingPrompt : p
        ));
        setEditingPrompt(null);
        setShowAddPrompt(false);
        showNotification('Prompt erfolgreich aktualisiert');
    };

    const handleCopyPrompt = async (content) => {
        try {
            await navigator.clipboard.writeText(content);
            showNotification('Prompt in die Zwischenablage kopiert');
        } catch (err) {
            showNotification('Fehler beim Kopieren', 'error');
        }
    };

    const handleDeletePrompt = (id) => {
        if (window.confirm('Möchten Sie diesen Prompt wirklich löschen?')) {
            setPrompts(prompts.filter(p => p.id !== id));
            showNotification('Prompt erfolgreich gelöscht');
        }
    };

    return (
        <div className="min-h-screen bg-[#0f172a]">
            {/* Notification */}
            {notification && (
                <div className={`fixed top-4 right-4 z-50 p-4 rounded-lg shadow-lg flex items-center space-x-2 ${
                    notification.type === 'success' ? 'bg-green-600' : 'bg-red-600'
                } text-white transition-all duration-500`}>
                    {notification.type === 'success' ? (
                        <Check className="w-5 h-5" />
                    ) : (
                        <X className="w-5 h-5" />
                    )}
                    <span>{notification.message}</span>
                </div>
            )}

            <header className="bg-[#1e293b] p-4 border-b border-gray-800">
                <h1 className="text-2xl font-bold text-white">Holy's AI Prompts</h1>
            </header>

            <div className="flex">
                {/* Sidebar */}
                <aside className="w-64 bg-[#1e293b] min-h-[calc(100vh-64px)] p-4 border-r border-gray-800">
                    {aiTypes.map((ai) => (
                        <div key={ai.id} className="group relative mb-2">
                            <button
                                onClick={() => setSelectedAI(ai.id)}
                                className={`w-full flex items-center px-4 py-2 rounded-md transition-colors ${
                                    selectedAI === ai.id ? ai.bgColor : 'bg-transparent hover:bg-gray-800'
                                } text-white`}
                            >
                                <FolderClosed className="w-5 h-5 mr-2" />
                                {ai.id}
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        handleEditAI(ai);
                                    }}
                                    className="absolute right-2 opacity-0 group-hover:opacity-100 transition-opacity"
                                >
                                    <Settings className="w-4 h-4 text-gray-400 hover:text-white" />
                                </button>
                            </button>
                        </div>
                    ))}

                    {showAddAI ? (
                        <div className="mt-4 p-4 bg-gray-800 rounded-md">
                            <input
                                type="text"
                                value={newAI.name}
                                onChange={(e) => setNewAI({ ...newAI, name: e.target.value })}
                                placeholder="Name der neuen KI"
                                className="w-full mb-2 p-2 bg-[#0f172a] text-white rounded-md border border-gray-700"
                            />
                            <select
                                value={newAI.color}
                                onChange={(e) => setNewAI({ ...newAI, color: e.target.value })}
                                className="w-full mb-2 p-2 bg-[#0f172a] text-white rounded-md border border-gray-700"
                            >
                                {availableColors.map(color => (
                                    <option key={color.value} value={color.value}>
                                        {color.name}
                                    </option>
                                ))}
                            </select>
                            <div className="flex space-x-2">
                                <button
                                    onClick={handleAddAI}
                                    className="flex-1 px-3 py-1 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                                >
                                    Hinzufügen
                                </button>
                                <button
                                    onClick={() => setShowAddAI(false)}
                                    className="flex-1 px-3 py-1 bg-gray-700 text-white rounded-md hover:bg-gray-600"
                                >
                                    Abbrechen
                                </button>
                            </div>
                        </div>
                    ) : (
                        <button
                            onClick={() => setShowAddAI(true)}
                            className="w-full flex items-center px-4 py-2 text-gray-400 hover:text-white transition-colors mt-4"
                        >
                            <PlusCircle className="w-5 h-5 mr-2" />
                            Neue KI hinzufügen
                        </button>
                    )}
                </aside>

                {/* AI Settings Modal */}
                {showAISettings && editingAI && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                        <div className="bg-[#1e293b] rounded-lg p-6 w-96">
                            <h3 className="text-xl font-bold text-white mb-4">KI Einstellungen</h3>
                            <input
                                type="text"
                                value={editingAI.name}
                                onChange={(e) => setEditingAI({ ...editingAI, name: e.target.value })}
                                className="w-full mb-4 p-2 bg-[#0f172a] text-white rounded-md border border-gray-700"
                            />
                            <select
                                value={editingAI.color}
                                onChange={(e) => setEditingAI({ ...editingAI, color: e.target.value })}
                                className="w-full mb-4 p-2 bg-[#0f172a] text-white rounded-md border border-gray-700"
                            >
                                {availableColors.map(color => (
                                    <option key={color.value} value={color.value}>
                                        {color.name}
                                    </option>
                                ))}
                            </select>
                            <div className="flex justify-between">
                                <button
                                    onClick={() => handleDeleteAI(editingAI.id)}
                                    className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
                                >
                                    Löschen
                                </button>
                                <div className="space-x-2">
                                    <button
                                        onClick={() => {
                                            setEditingAI(null);
                                            setShowAISettings(false);
                                        }}
                                        className="px-4 py-2 bg-gray-700 text-white rounded-md hover:bg-gray-600"
                                    >
                                        Abbrechen
                                    </button>
                                    <button
                                        onClick={handleUpdateAI}
                                        className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                                    >
                                        Speichern
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* Main Content */}
                <main className="flex-1 p-6">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-xl font-bold text-white">{selectedAI} Prompts</h2>
                        <button
                            onClick={() => {
                                setEditingPrompt(null);
                                setShowAddPrompt(true);
                            }}
                            className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                        >
                            <PlusCircle className="w-5 h-5 mr-2" />
                            Neuer Prompt
                        </button>
                    </div>

                    {/* Add/Edit Prompt Form */}
                    {showAddPrompt && (
                        <div className="bg-[#1e293b] rounded-lg p-6 mb-6 border border-gray-800">
                            <input
                                type="text"
                                placeholder="Titel"
                                value={editingPrompt ? editingPrompt.title : newPrompt.title}
                                onChange={(e) => editingPrompt
                                    ? setEditingPrompt({...editingPrompt, title: e.target.value})
                                    : setNewPrompt({...newPrompt, title: e.target.value})
                                }
                                className="w-full mb-4 p-2 bg-[#0f172a] text-white rounded-md border border-gray-700"
                            />
                            <textarea
                                placeholder="Prompt Text"
                                value={editingPrompt ? editingPrompt.content : newPrompt.content}
                                onChange={(e) => editingPrompt
                                    ? setEditingPrompt({...editingPrompt, content: e.target.value})
                                    : setNewPrompt({...newPrompt, content: e.target.value})
                                }
                                className="w-full h-32 mb-4 p-2 bg-[#0f172a] text-white rounded-md border border-gray-700"
                            />
                            <div className="flex justify-end space-x-2">
                                <button
                                    onClick={() => {
                                        setEditingPrompt(null);
                                        setShowAddPrompt(false);
                                        setNewPrompt({ title: '', content: '' });
                                    }}
                                    className="px-4 py-2 bg-gray-700 text-white rounded-md hover:bg-gray-600"
                                >
                                    Abbrechen
                                </button>
                                <button
                                    onClick={editingPrompt ? handleUpdatePrompt : handleAddPrompt}
                                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                                >
                                    {editingPrompt ? 'Aktualisieren' : 'Hinzufügen'}
                                </button>
                            </div>
                        </div>
                    )}

                    {/* Prompts List */}
                    <div className="space-y-4">
                        {prompts
                            .filter(prompt => prompt.aiType === selectedAI)
                            .map(prompt => (
                                <div key={prompt.id} className="bg-[#1e293b] rounded-lg p-4 border border-gray-800">
                                    <div className="flex justify-between items-start mb-2">
                                        <h3 className="text-lg font-medium text-white">{prompt.title}</h3>
                                        <div className="flex space-x-2">
                                            <button
                                                onClick={() => handleCopyPrompt(prompt.content)}
                                                className="text-gray-400 hover:text-blue-400 transition-colors"
                                                title="Kopieren"
                                            >
                                                <Copy className="w-5 h-5" />
                                            </button>
                                            <button
                                                onClick={() => handleEditPrompt(prompt)}
                                                className="text-gray-400 hover:text-yellow-400 transition-colors"
                                                title="Bearbeiten"
                                            >
                                                <Edit className="w-5 h-5" />
                                            </button>
                                            <button
                                                onClick={() => handleDeletePrompt(prompt.id)}
                                                className="text-gray-400 hover:text-red-400 transition-colors"
                                                title="Löschen"
                                            >
                                                <Trash className="w-5 h-5" />
                                            </button>
                                        </div>
                                    </div>
                                    <p className="text-gray-300 whitespace-pre-wrap">{prompt.content}</p>
                                </div>
                            ))}
                    </div>
                </main>
            </div>
        </div>
    );
}

export default App;