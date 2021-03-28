import FormKit from './FormKit'
import { Legend } from './FormKit/styled-components'
import { addNewEntity } from '../../redux/entitySlice'
import { useDispatch } from 'react-redux'

const { FormMeta, Form, TextField, SubmitButton } = FormKit

const createInitalValues = (fields) => {
  const entries = fields.map((field) => {
    let initial = field?.initialValue
    if (!initial) {
      initial = field?.container === 'multiselect' ? [] : ''
    }

    return [field.field, initial]
  })

  return Object.fromEntries(entries)
}

const AddNewEntityForm = ({ title, fields }) => {
  const dispatch = useDispatch()
  const initialValues = createInitalValues(fields)

  return (
    <FormMeta
      initialValues={initialValues}
      onSubmit={(values, { setSubmitting }) => {
        dispatch(addNewEntity(values)).finally(() => setSubmitting(false))
      }}
    >
      <Form>
        <Legend>{`Add new ${title}`}</Legend>
        {fields.map(({ type, container, field, title, options }, i) => {
          return (
            <TextField
              container={container}
              label={title}
              name={field}
              type={type}
              options={options}
              key={i}
            />
          )
        })}
        <SubmitButton text="Add new" />
      </Form>
    </FormMeta>
  )
}

export default AddNewEntityForm
