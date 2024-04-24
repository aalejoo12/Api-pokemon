import {create} from "zustand" 

const useStore = create((set)=>({

    modoOscuro: false,

    cambiarColor:() => set((state)=>({modoOscuro:!state.modoOscuro})),
    estiloClaro:{
        backgroundColor:"#FFCC01",
        color:"#000000"
    },
    estiloOscuro:{
    backgroundColor:"#03122E",
    color:"#ffffff"
    }


}))

export default useStore;