import PageWrapper from '../components/PageWrapper'
import ContentForEntity from '../components/ContentForEntity'

const bookSchema = {
  title: 'book',
  fields: [
    {
      title: 'name',
      field: 'name',
      container: 'input',
      type: 'text',
    },
    {
      title: 'date',
      field: 'date',
      container: 'input',
      type: 'date',
    },
    {
      title: 'authors',
      field: 'authors',
      container: 'multiselect',
      source: {
        entity: 'author',
        fields: ['name', 'surname'],
      },
      options: [],
    },
  ],
}

function BooksPage(props) {
  return (
    <PageWrapper>
      <ContentForEntity entitySchema={bookSchema} />
    </PageWrapper>
  )
}

export default BooksPage
