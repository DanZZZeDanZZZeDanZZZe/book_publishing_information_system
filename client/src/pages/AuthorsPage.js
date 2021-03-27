import PageWrapper from '../components/PageWrapper'
import ContentForEntity from '../components/ContentForEntity'

const authorSchema = {
  title: 'author',
  fields: [
    {
      title: 'name',
      field: 'name',
      container: 'input',
      type: 'text',
    },
    {
      title: 'surname',
      field: 'surname',
      container: 'input',
      type: 'text',
    },
    {
      title: 'patronymic',
      field: 'patronymic',
      container: 'input',
      type: 'text',
    },
    {
      title: 'date of birth',
      field: 'dateOfBirth',
      container: 'input',
      type: 'date',
    },
    {
      title: 'gender',
      field: 'gender',
      container: 'select',
      options: ['Male', 'Female', 'Other'],
    },
    {
      title: 'books',
      field: 'books',
      container: 'multiselect',
      options: [1, 2, 3, 4],
    },
  ],
}

function AuthorsPage(props) {
  return (
    <PageWrapper>
      <ContentForEntity entitySchema={authorSchema} />
    </PageWrapper>
  )
}

export default AuthorsPage
