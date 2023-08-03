import React, { useReducer ,useEffect} from "react";
/**
 * Estado inicial del formulario.
 * @typedef {{
 *    entrenador:{
 *      nombre: string,
 *      apellido: string,
 *      email: string
 *    },
 *    pokemon: {
 *      nombrePokemon: string,
 *      tipoPokemon: string,
 *      elementoPokemon: string,
 *      alturaPokemon: string,
 *      edadPokemon: string
 *   }
 * }} formularioState
 */
import PropTypes from "prop-types";
const initialState = {
  entrenador: {
    nombre: "",
    apellido: "",
    email: "",
  },
  pokemon: {
    nombrePokemon: "",
    tipoPokemon: "",
    elementoPokemon: "",
    alturaPokemon: "",
    edadPokemon: "",
  },
};



/**
 * 
 * @description OPCIONAL, SOLO SI CUANDO SE INICIALIZA EL USEDREDUCER SE QUIERE QUE TENGA VALORES 
 * POR DEFECTO DISTINTOS A LOS QUE SE DEFINEN EN EL ESTADO INICIAL
 */
const initialStateWithValues = (state) => {
  console.log('Se actualiza el estado original1')
 return{
    ...state,
    entrenador: {
      ...state.entrenador,
      nombre: "Ash",
    }

 }
} 
/**
 * Función reductora para el estado del formulario que actualiza el estado en base a la acción.
 *
 * @param {initialState} state
 * @param {{
 *    type: string,
 *   payload: {
 *    [string]: string,
 * }} action}
 *
 * @returns {initialState}
 */
const reducer = (state, action) => {
  console.log(action)
  switch (action.type) {
    case "ACTUALIZAR_ENTRENADOR":
      return {
        ...state,
        entrenador: {
          ...state.entrenador,
          ...action.payload,
        },
      };
    case "ACTUALIZAR_POKEMON":
      return {
        ...state,
        pokemon: {
          ...state.pokemon,
          ...action.payload,
        },
      };
    default:
      return state;
  }
};



/**
 * @type {React.Context<FormularioContextValue>}
 * @description Contexto que proporciona información sobre el usuario.
 */
export const ContextoFormulario = React.createContext();

/**
 * Proveedor de contexto para el formulario.
 * @typedef {Object} FormularioContextValue
 * @property {Object} formulario - El estado del formulario.
 * @property {(type: string, valorInput: { campo: string, valor: string }) => void} handleInputBlur - Función para manejar el evento onBlur de los inputs del formulario.
 */


/**
 * Proveedor personalizado para manejar el estado de un formulario usando useReducer.
 * @param {Object} props - Las propiedades del componente.
 * @param {React.ReactNode} props.children - Los componentes hijos envueltos por este proveedor.
 * @returns {FormularioContextValue} - El valor del contexto del formulario que contiene el estado del formulario y la función para manejar el evento onBlur.
 */
const ProviderFormulario = ({ children }) => {
  //Mas arriba les deje un ejemplo de como se puede inicializar el
  // useReducer con valores por defecto distintos al initialState
  //El JSdoc del Provider y el Context  tomenlo como referencia pero son mas avanzados, se los deje por si quisieran
  //ahondar mas en el tema
  const [formulario, dispatch] = useReducer(reducer, initialState);

/**
 * Función que recibe los parametros del formulario y dispara la acción de actualización.
 * @typedef {function} handleInputBlur
 * @param {String} type - El tipo de acción (por ejemplo, "ACTUALIZAR_ENTRENADOR" o "ACTUALIZAR_POKEMON").
 * @param {{
 *    campo: string,
 *    valor: string,
 * }} valorInput - Los datos de entrada para la actualización del formulario.
 */
  const handleInputBlur = (type, valorInput) => {
    const { campo, valor } = valorInput;
    dispatch({
      type,
      payload: {
        [campo]: valor,
      },
    });
  };
  useEffect(() => {
   console.log(formulario)
  }, [formulario])
  
//Validacion de los props que recibe el la funcion handleInputBlur
  handleInputBlur.propTypes = PropTypes.shape({
      campo: PropTypes.string.isRequired,
      valor: PropTypes.string.isRequired,
    }).isRequired

  return (
    <ContextoFormulario.Provider
      value={{
        formulario,
        handleInputBlur,
      }}
    >
      {children}
    </ContextoFormulario.Provider>
  );
};

export default ProviderFormulario;