import { Formik, Form, useField, useFormikContext } from 'formik'
import * as Styled from './styled-components'

const TextField = ({ label, type, container = 'input', options, ...props }) => {
  const [field, meta] = useField(props)

  let Select = null

  if (container === 'select' || container === 'multiselect') {
    Select = () => (
      <Styled.SelectInput {...field} {...props}>
        {options.map((o, i) => (
          <option key={`${i}-${o}`} value={o}>
            {o}
          </option>
        ))}
      </Styled.SelectInput>
    )
  }

  return (
    <Styled.FieldWrapper>
      <Styled.Label htmlFor={props.id || props.name}>{label}</Styled.Label>
      {container === 'input' && (
        <Styled.TextInput {...field} {...props} type={type ?? 'text'} />
      )}
      {container === 'textarea' && (
        <Styled.TextareaInput {...field} {...props} />
      )}
      {container === 'select' && <Select {...field} {...props} />}
      {container === 'multiselect' && <Select {...field} {...props} multiple />}
      {meta.touched && meta.error ? (
        <Styled.Error>{meta.error}</Styled.Error>
      ) : null}
    </Styled.FieldWrapper>
  )
}

const SubmitButton = ({ text, ...props }) => {
  const { isSubmitting, isValid } = useFormikContext()
  return (
    <Styled.Button type="submit" disabled={isSubmitting || !isValid}>
      {text}
    </Styled.Button>
  )
}

const FormKit = {
  TextField,
  FormMeta: Formik,
  Form: Styled.Form,
  Legend: Styled.Legend,
  SubmitButton,
}

export default FormKit
