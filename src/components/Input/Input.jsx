import React, { useContext, useEffect, useRef, useState } from "react";
import { ContextoFormulario } from "../../context/ContextoFormulario";
import PropTypes from "prop-types";
/**
 * Componente que maneja los inputs del formulario.
 *
 * @param {{
 *    name: string,
 *    label: string,
 *    type: string,
 *    isPokemon: boolean,
 *    shouldFocus: boolean,
 * }} props
 * @returns
 */
const Input = ({
  name,
  label,
  type = "text",
  shouldFocus = false,
  isPokemon = false,
}) => {
  const ref = useRef();

  const { handleInputBlur, formulario } = useContext(ContextoFormulario);

  const [value, setValue] = useState(formulario[name] || "");

  /**
   * Función que se ejecuta al cambiar el valor del input.
   *
   * @param {Event} e
   */
  const onChange = (e) => setValue(e.target.value);

  /**
   * Función que se ejecuta al perder el foco del input.
   *
   * @param {Event} e
   */
  const onBlur = (e) => {
    e.preventDefault();

    handleInputBlur(
      isPokemon ? "ACTUALIZAR_POKEMON" : "ACTUALIZAR_ENTRENADOR",
      {
        campo: name,
        valor: value,
      }
    );
  };

  useEffect(() => {
    if (ref.current && shouldFocus) {
      ref.current.focus();
    }
  }, [shouldFocus]);

  return (
    <div className="input-contenedor">
      <label htmlFor={name}>{label}</label>
      <input
        type={type}
        value={value}
        id={name}
        onChange={onChange}
        onBlur={onBlur}
        ref={ref}
      />
    </div>
  );
};


Input.propTypes ={
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  type: PropTypes.string,
  isPokemon :PropTypes.bool,
  shouldFocus: PropTypes.bool,

}

export default Input;
