import { useState } from 'react';

export default function (defaults) {
  const [values, setValues] = useState(defaults);

  function updateValue(e) {
    let { value, type, name } = e.target;
    if (type === 'number') {
      value = parseInt(value);
    }
    setValues({
      ...values,
      [name]: value,
    });
  }

  return { values, updateValue };
}
