import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

interface CounterState {
    token: string;
    setToken: (value: string) => void;
    removeToken: () => void;
}

const useCounterStore = create<CounterState>()(
    persist(
        (set) => ({
            token: "",
            setToken: (value: string) => set({ token: value }),
            removeToken: () => set({ token: "" }),
        }),
        {
            name: "auth-storage", // Nome da chave no localStorage
            storage: createJSONStorage(() => localStorage), // Usando createJSONStorage
        }
    )
);

export default useCounterStore;
