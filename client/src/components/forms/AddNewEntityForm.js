import FormKit from './FormKit'
import { Legend } from './FormKit/styled-components'
import { addNewEntity } from '../../redux/entitySlice'
import { useDispatch, useSelector } from 'react-redux'

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
  const subentities = useSelector((state) => state.entityReducer.subentities)

  return (
    <FormMeta
      initialValues={initialValues}
      onSubmit={(values, { setSubmitting }) => {
        dispatch(addNewEntity(values)).finally(() => setSubmitting(false))
      }}
    >
      <Form>
        <Legend>{`Add new ${title}`}</Legend>
        {fields.map(({ type, container, field, title, options, source }, i) => {
          let newOptions
          if (source?.entity) {
            newOptions = [...subentities[source.entity]].map((subentity) => {
              const text = source.fields.reduce((acc, field) => {
                return `${acc} ${subentity[field]}`
              }, '')
              return [subentity.id, text]
            })
          } else {
            newOptions = options
          }

          return (
            <TextField
              container={container}
              label={title}
              name={field}
              type={type}
              options={newOptions}
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
