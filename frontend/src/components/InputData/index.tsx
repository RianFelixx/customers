import { InputProps } from '../../types';

function InputData({ type, nameLabel, nameRef}: InputProps) {
  return (
    <>
      <label className="font-medium text-white">{nameLabel}:</label>
      <input
        className="w-full mb-5 p-2 rounded"
        type={ type }
        placeholder={ `Enter ${nameLabel}`}
        ref={ nameRef }
      />
    </>
  );
}

export default InputData;
