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
      // props: {
      //   name: 'name',
      //   type: 'text',
      // },
    },
    {
      title: 'date',
      field: 'date',
      container: 'input',
      type: 'date',
      // props: {
      //   name: 'date',
      //   type: 'date',
      // },
    },
    {
      title: 'authors',
      field: 'authors',
      container: 'multiselect',
      // props: {
      //   ,
      //   multiple: 'multiple',
      // },
      options: [1, 2, 3, 4],
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
