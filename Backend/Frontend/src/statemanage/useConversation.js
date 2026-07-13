import { create } from "zustand";  //Its job is to create a global store.

const useConversation = create((set) => ({
  selectedConversation: null,   //Stores the currently selected user/chat.
  setSelectedConversation: (selectedConversation) =>
    set({ selectedConversation }),
  messages: [],   //Stores all messages for the selected conversation.
  setMessage : (messages) => set({ messages }),
}));
export default useConversation;